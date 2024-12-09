import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskStatus } from "../tasksSlice";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import TaskItem from "./TaskItem";

const Column = ({ status, tasks, onDrop }) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item) => onDrop(item, status),
  });

  return (
    <Paper
      ref={drop}
      sx={{ padding: 2, minHeight: 400, backgroundColor: "#f5f5f5" }}
    >
      <Typography variant="h6" gutterBottom>
        {status}
      </Typography>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </Paper>
  );
};
const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, filter } = useSelector((state) => state.tasks);

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) =>
          task.status?.toLowerCase().includes(filter?.toLowerCase())
        );

  const handleDrop = (item, status) => {
    if (item.status !== status) {
      dispatch(updateTaskStatus({ ...item, status }));
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container spacing={3}>
        {["To Do", "In Progress", "Completed"].map((status) => (
          <Grid item size="grow" key={status}>
            <Column
              status={status}
              tasks={filteredTasks.filter((task) => task.status === status)}
              onDrop={handleDrop}
            />
          </Grid>
        ))}
      </Grid>
    </DndProvider>
  );
};

export default TaskList;
