var data = {
  question: null,
  selected: null,
  choices: [],
  questionUuid: null,
  answered: [],

  fetchQuestion: function () {
    return m
      .request({
        method: "POST",
        url: "/question",
        headers: {
          "Content-Type": "application/json",
        },
        body: { exclude: data.answered },
      })
      .then(function (questionData) {
        data.question = questionData.question;
        data.choices = questionData.choices || [];
        data.questionUuid = questionData.uuid;
        data.selected = null;
      })
      .catch(function (err) {
        console.error("No more questions or error fetching question:", err);
        data.question = "No more questions available.";
        data.choices = [];
      });
  },

  submitAnswer: function () {
    console.log("Submitting:", {
      selected: data.selected,
      questionUuid: data.questionUuid,
    });

    m.request({
      method: "PUT",
      url: "/submit",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        selected: data.selected,
        questionUuid: data.questionUuid,
      },
    }).then(function (response) {
      console.log("Answer submitted", response);
      data.answered.push(data.questionUuid);
      data.fetchQuestion();
    });
  },
};

var Choice = {
  click: function (n) {
    return function () {
      data.selected = n;
    };
  },

  classes: function (n) {
    return data.selected === n ? "active" : "";
  },

  view: function (vnode) {
    var n = vnode.attrs.index;

    if (data.choices && data.choices[n]) {
      return m(
        ".choice",
        { class: Choice.classes(n), onclick: Choice.click(n) },
        m("span.l"),
        m("span.v", data.choices[n]),
      );
    } else {
      return m(".choice", "Loading...");
    }
  },
};

var App = {
  oninit: data.fetchQuestion,

  submit: function () {
    if (data.selected === null) {
      alert("Please select an answer!");
    } else {
      data.submitAnswer();
    }
  },

  view: function () {
    if (!data.question || data.choices.length === 0) {
      return m("main", m("p", data.question || "Loading..."));
    }

    return m("main", [
      m("h1", "AWS Developer Associate [DVA-C02]"),
      m("article", [
        m("h2", "Question:"),
        m(".question", data.question),
        m(Choice, { index: 0 }),
        m(Choice, { index: 1 }),
        m(Choice, { index: 2 }),
        m(Choice, { index: 3 }),
        m(".submit", m("button", { onclick: App.submit }, "Submit")),
      ]),
    ]);
  },
};

m.mount(document.body, App);
