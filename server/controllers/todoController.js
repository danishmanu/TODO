const Todo = require('../models/Task');

// Get all todos
exports.getTodos = async (req, res) => {
   try {
      const todos = await Todo.find();
      res.json(todos);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

// Create a new todo
exports.createTodo = async (req, res) => {
   const { task } = req.body;
   const newTodo = new Todo({
      task,
      completed: false,
   });
   try {
      const savedTodo = await newTodo.save();
      res.json(savedTodo);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
};

// Update a todo
exports.updateTodo = async (req, res) => {
   const { task, completed } = req.body;
   try {
      const updatedTodo = await Todo.findByIdAndUpdate(
         req.params.id,
         { task, completed },
         { new: true }
      );
      res.json(updatedTodo);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
   try {
      const todo = await Todo.findByIdAndDelete(req.params.id);
      res.json({ message: 'Todo deleted' });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};
