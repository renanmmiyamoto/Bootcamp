const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateRepositorieId(req, res, next) {
  const { id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({ error: "Invalid repositorie ID." });
  }

  return next();
}

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  if (!title || !url || !techs) {
    return res
      .status(200)
      .json({ error: "Complete all fields to create repositorie." });
  }

  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repositorie);

  return res.json(repositorie);
});

app.put("/repositories/:id", validateRepositorieId, (req, res) => {
  const { title, url, techs } = req.body;
  const { id } = req.params;

  const repositorieIndex = repositories.findIndex((repo) => repo.id === id);
  if (repositorieIndex < 0) {
    return res.status(200).json({ error: "Repositorie not found." });
  }

  const repositorie = {
    ...repositories[repositorieIndex],
    title,
    url,
    techs,
  };

  repositories[repositorieIndex] = repositorie;

  return res.json(repositorie);
});

app.delete("/repositories/:id", validateRepositorieId, (req, res) => {
  const { id } = req.params;

  const repositorieIndex = repositories.findIndex((repo) => repo.id === id);
  repositories.splice(repositorieIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", validateRepositorieId, (req, res) => {
  const { id } = req.params;

  const repositorieIndex = repositories.findIndex((repo) => repo.id === id);
  repositories[repositorieIndex] = {
    ...repositories[repositorieIndex],
    likes: repositories[repositorieIndex].likes + 1,
  };

  return res.json(repositories[repositorieIndex]);
});

module.exports = app;
