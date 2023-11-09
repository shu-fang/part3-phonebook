const express = require("express");
const app = express();
app.use(express.static("dist"));

var morgan = require("morgan");
morgan.token("person", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(morgan(":person, :method :url - :response-time ms"));

const cors = require("cors");
app.use(cors());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.get("/info", (req, res) => {
  const date = new Date();
  const message = `<p>Phonebook has info for ${
    persons.length
  } people <br/><br/> ${date.toTimeString()} </p>`;
  res.send(message);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  res.send(persons.find((person) => person.id === Number(id)));
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id != Number(id));
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  if (!req.body || !req.body.name || !req.body.number) {
    return req.status(404).json({
      error: "content missing",
    });
  }

  if (persons.find((person) => person.name === req.body.name)) {
    return res.status(404).json({
      error: `${req.body.name} arleady exists in phonebook`,
    });
  }

  const body = req.body;

  const person = {
    id: Math.floor(Math.random() * 1000),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
