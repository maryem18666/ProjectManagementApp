const mongoose = require("mongoose");

const task1Schema = new mongoose.Schema({
  title: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  tasks: [task1Schema],
});

module.exports = mongoose.model("Project", projectSchema);
