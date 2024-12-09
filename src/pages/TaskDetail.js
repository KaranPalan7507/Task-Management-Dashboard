import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid2 } from "@mui/material";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = useSelector((state) =>
    state.tasks.tasks.find((task) => task.id.toString() === id)
  );

  if (!task) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h5">Task Not Found</Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        {task.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Status: {task.status}
      </Typography>
      {task.description && (
        <Typography variant="body1" gutterBottom>
          Description: {task.description}
        </Typography>
      )}
      <Typography variant="caption" gutterBottom>
        Created: {new Date(task.creationDate).toLocaleString()}
      </Typography>
      <Grid2>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ marginTop: 2 }}
        >
          Back to Dashboard
        </Button>
      </Grid2>
    </Box>
  );
};

export default TaskDetail;
