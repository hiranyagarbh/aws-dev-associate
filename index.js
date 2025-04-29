import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Pool } from "pg";
import dotenv from "dotenv"; // for env vars
dotenv.config(); // for env vars

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

const client = await pool.connect();

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "style.css"));
});

app.get("/app.js", (req, res) => {
  res.sendFile(path.join(__dirname, "app.js"));
});

// fetch a random question excluding previously answered
app.post("/question", async (req, res) => {
  const { exclude } = req.body;

  try {
    let queryText = "SELECT * FROM questions";
    const values = [];

    if (exclude && Array.isArray(exclude) && exclude.length > 0) {
      queryText += ` WHERE uuid NOT IN (${exclude.map((_, i) => `$${i + 1}`).join(", ")})`;
      values.push(...exclude);
    }

    queryText += " ORDER BY RANDOM() LIMIT 1";

    const result = await client.query(queryText, values);
    const question = result.rows[0];

    if (question) {
      res.json({
        uuid: question.uuid,
        question: question.question,
        choices: [
          question.option_a,
          question.option_b,
          question.option_c,
          question.option_d,
        ],
      });
    } else {
      res.status(404).send("No more new questions.");
    }
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).send("Internal Server Error");
  }
});

// submit selected answer
app.put("/submit", async (req, res) => {
  const { selected, questionUuid } = req.body;

  if (selected === undefined || questionUuid === undefined) {
    return res
      .status(400)
      .send("Missing required fields: selected or questionUuid.");
  }

  try {
    const insertResult = await client.query(
      "INSERT INTO answers (question_uuid, option, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *",
      [questionUuid, selected],
    );
    const answer = insertResult.rows[0];
    console.log("Answer submitted:", answer);
    res.status(200).send(answer);
  } catch (error) {
    console.error("Error submitting answer:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
