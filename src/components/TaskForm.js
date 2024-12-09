import React, { useState } from "react";
import { TextField, Button, Select, MenuItem, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { addTask } from "../tasksSlice";

const TaskForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (title.trim()) {
      dispatch(
        addTask({
          id: Date.now(),
          title,
          description: description,
          status,
          creationDate: new Date().toISOString(),
        })
      );
      setTitle("");
      onClose();
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        label="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
      />
      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        fullWidth
      >
        <MenuItem value="To Do">To Do</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </Select>
      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add Task
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
