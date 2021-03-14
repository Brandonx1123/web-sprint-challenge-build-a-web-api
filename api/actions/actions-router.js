// Write your "actions" router here!
const express = require("express");
const {
  validateAction,
  validateActionId,
} = require("../middleware/middleware");
const Actions = require("./actions-model");
const router = express.Router();

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.actions);
});

router.post("/", validateAction, (req, res, next) => {
  Actions.insert(req.body)
    .then((newAction) => {
      res.status(201).json(newAction);
    })
    .catch(next);
});

router.put("/:id", validateAction, validateActionId, (req, res, next) => {
  const id = req.params.id;
  const changes = req.body;

  Actions.update(id, changes)
    .then((updatedActions) => {
      res.status(200).json(updatedActions);
    })
    .catch(next);
});

router.delete("/:id", validateActionId, (req, res, next) => {
  Actions.remove(req.params.id)
    .then((deletedAction) => {
      res.status(203).json(deletedAction);
    })
    .catch(next);
});

// router.use((err, req, res, next) => {
//   // eslint-disable-line
//   res.status(500).json({
//     message: err.message,
//     stack: err.stack,
//     custom: "it is not working, try again",
//   });
// });

module.exports = router;
