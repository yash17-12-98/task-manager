const express = require("express");
const Validator = require("./validator.js");
const app = express();
const port = 3000;
const fs = require("fs");
const taskData = require("./task.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const airTribeTask = taskData.tasks;

app.get("/", (req, res) => {
  return res.status(200).send("Welcome");
});

app.get("/tasks", (req, res) => {
  const body = taskData.tasks;
  return res.status(200).send(body);
});

app.get("/tasks/:id", (req, res) => {
  let task = airTribeTask.find((task) => task.id === parseInt(req.params.id));

  if (!task) {
    return res.status(404).send("No appropriate task found");
  }
  return res.status(200).send(task);
});

app.post("/tasks", (req, res) => {
  const taskDetail = req.body;

  if (Validator.validateTaskInfo(taskDetail).status == false) {
    return res.status(400).json(Validator.validateTaskInfo(taskDetail));
  }

  let taskDataModified = taskData;
  taskDetail.id = taskDataModified.tasks.length + 1;
  taskDataModified.tasks.push(taskDetail);

  fs.writeFile(
    "./task.json",
    JSON.stringify(taskDataModified),
    { encoding: "utf8", flag: "w" },
    (err) => {
      if (err) {
        return res
          .status(500)
          .send(
            "Something went wrong while writing the task to file, Please try again!"
          );
      } else {
        return res
          .status(201)
          .send("Task has been successfully validated and created");
      }
    }
  );
});

app.put("/tasks/:id", (req, res) => {
  const updatedTaskDetail = req.body;
  const taskId = parseInt(req.params.id);
  let task = airTribeTask.find((task) => task.id == taskId);

  if (!task) {
    return res.status(404).send("No appropriate task found");
  }

  task = updatedTaskDetail;
  task.id = taskId;

  if (Validator.validateTaskInfo(task).status == false) {
    return res.status(400).json(Validator.validateTaskInfo(task));
  }

  let taskDataModified = taskData;
  for (var i = 0; i < taskDataModified.tasks.length; i++) {
    if (taskDataModified.tasks[i].id === taskId) {
      taskDataModified.tasks[i] = updatedTaskDetail;
      break;
    }
  }
  fs.writeFile(
    "./task.json",
    JSON.stringify(taskDataModified),
    { encoding: "utf8", flag: "w" },
    (err) => {
      if (err) {
        return res
          .status(500)
          .send(
            "Something went wrong while writing the task to file, Please try again!"
          );
      } else {
        return res.status(200).send(task);
      }
    }
  );
});

app.delete("/tasks/:id", (req, res) => {
  let task = airTribeTask.find((task) => task.id == req.params.id);

  if (!task) {
    return res.status(404).send("No appropriate task found");
  }

  let taskDataModified = taskData;

  const index = taskDataModified.tasks.indexOf(task);

  taskDataModified.tasks.splice(index, 1);

  fs.writeFile(
    "./task.json",
    JSON.stringify(taskDataModified),
    { encoding: "utf8", flag: "w" },
    (err) => {
      if (err) {
        return res
          .status(500)
          .send(
            "Something went wrong while writing the task to file, Please try again!"
          );
      } else {
        return res.status(200).send("Task has been successfully deleted");
      }
    }
  );
});

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
