const express = require("express");
const router = express.Router();
const TODO = require("../db/todo");

router.get("/getTodo", (req, res, next) => {
  TODO.find({ username: req.user.username })
    .then(data => res.json(data))
    .catch(next);
});

router.post("/addTodo", (req, res) => {
  const {
    username,
    text,
    projectId,
    projectName,
    complete,
    completeDate,
    order
  } = req.body;

  const newTODO = new TODO({
    username: username,
    text: text,
    projectId: projectId,
    projectName: projectName,
    complete: complete,
    completeDate: completeDate,
    order: order
  });

  newTODO.save((err, savedTODO) => {
    if (err) return res.json(err);
    return res.json(savedTODO);
  });
});

router.delete("/deleteTodo/:id", (req, res, next) => {
  TODO.findOneAndRemove({ _id: req.params.id })
    .then(data => res.json(data))
    .catch(next);
});

router.put("/completeTodo/:id", (req, res, next) => {
  const complete = req.body.complete;
  const completeDate = req.body.completeDate;
  TODO.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { complete: complete } },
    { $set: { completeDate: completeDate } }
  )
    .then(data => res.json(data))
    .catch(next);
});

router.delete("/moveTodoDelete/:projectId", (req, res, next) => {
  TODO.deleteMany({ projectId: req.params.projectId })
    .then(data => res.json(data))
    .catch(next);
});

router.post("/moveTodoAdd/:projectId", (req, res, next) => {
  const todos = req.body;
  TODO.insertMany(todos)
    .then(data => res.json(data))
    .catch(next);
});

module.exports = router;
