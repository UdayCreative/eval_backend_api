const express = require("express");

const { TodosModel } = require("../models/Todo.model");

const todos = express.Router();

todos.get("/", async (req, res) => {
  try {
    const notes = await TodosModel.find();
    res.send(notes);
  } catch (err) {
    console.log(err);
    res.send({ massage: "Something Went Wrong" });
  }
});

todos.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const new_user = new TodosModel(payload);
    await new_user.save();
    res.send({ massage: "Todo Created Successfully" });
  } catch (err) {
    console.log(err);
    res.send({ massage: "Something Went Wrong" });
  }
});

todos.patch("/update/:todosID", async (req, res) => {
  try {
    const payload = req.body;
    const todosID = req.params.todosID;
    const userID = req.body.userID;
    const todo = await TodosModel.findOne({ _id: todosID });
    if (userID !== todo.userID) {
      res.send("Not Authorised");
    } else {
      await TodosModel.findByIdAndUpdate({ _id: todosID }, payload);
      res.send({ massage: "Todo Updated Successfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ massage: "Something Went Wrong" });
  }
});

todos.delete("/delete/:todosID", async (req, res) => {
  try {
    const todosID = req.params.todosID;
    const userID = req.body.userID;
    const todo = await TodosModel.findOne({ _id: todosID });
    if (userID !== todo.userID) {
      res.send("Not Authorised");
    }
   else{
    await TodosModel.findByIdAndDelete({ _id: todosID });
    res.send({ massage: "Todo Deleted Successfully" });
   }
  } catch (err) {
    console.log(err);
    res.send({ massage: "Something Went Wrong" });
  }
});

module.exports = { todos };
