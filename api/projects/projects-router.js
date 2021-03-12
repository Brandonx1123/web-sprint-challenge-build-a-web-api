// Write your "projects" router here!
const express = require("express");
const {
  validateProject,
  validateProjectId,
} = require("../middleware/middleware");
const Projects = require("./projects-model");
const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.actions);
});

router.post("/", validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch(next);
});

router.put("/:id", validateProject, validateProjectId, (req, res, next) => {
  const id = req.params.id;
  const changes = req.body;

  Projects.update(id, changes)
    .then((updatedProject) => {
      res.status(200).json(updatedProject);
    })
    .catch(next);
});

router.delete("/:id", validateProjectId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then((deletedProjects) => {
      res.status(200).json(deletedProjects);
    })
    .catch(next);
});

router.get("/:id/actions", validateProjectId, (req, res, next) => {
  const projectId = req.params.id;

  Projects.getProjectActions(projectId)
    .then((projectActions) => {
      res.status(200).json(projectActions);
    })
    .catch(next);
});

module.exports = router;
