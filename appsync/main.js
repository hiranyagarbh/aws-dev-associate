import { Amplify, API, graphqlOperation } from "aws-amplify";
import config from "./aws-exports.js";
Amplify.configure(config);

const listTodos = `
  query ListTodos {
    listTodos {
      items {
        id
        name
        description
      }
    }
  }
`;

async function fetchTodos() {
  try {
    const todoData = await API.graphql(graphqlOperation(listTodos));
    const todos = todoData.data.listTodos.items;
    console.log("todos:", todos);
  } catch (err) {
    console.log("error fetching todos", err);
  }
}

fetchTodos();
