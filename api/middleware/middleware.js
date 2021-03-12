const Actions = require("../actions/actions-model");
const Projects = require("../projects/projects-model");

const validateAction = async (req, res, next) => {
  const { project_id, description, notes } = req.body;
  try {
    if (!project_id || !description || !notes) {
      res.status(400).json({
        message:
          "Must have all fields of id(id of action),  project_id(Use 1 because that is only project id rn), description, notes",
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ message: `server is having an error: ${err}` });
  }
};

const validateActionId = async (req, res, next) => {
  try {
    const action = await Actions.getById(req.params.id);
    if (!action) {
      res.status(404).json({ message: "action not found" });
    } else {
      req.actions = action;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: `server is having an error: ${error}` });
  }
};

const validateProject = async (req, res, next) => {
  const { name, description } = req.body;

  try {
    if (!name || !description) {
      res
        .status(400)
        .json({ message: "Must contain all fields, name description" });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ message: `server is having an error: ${err}` });
  }
};

const validateProjectId = async (req, res, next) => {
  try {
    const project = await Projects.getById(req.params.id);
    if (!project) {
      res.status(404).json({ message: "action not found" });
    } else {
      req.projects = project;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: `server is having an error: ${error}` });
  }
};

module.exports = {
  validateAction,
  validateActionId,
  validateProject,
  validateProjectId,
};
