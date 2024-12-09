import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../tasksSlice";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";
import { CircularProgress, Container, Button, Box, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.tasks);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  const handleOpen = () => {
    navigate(`/add-task`);
  };
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box component="main-section" sx={{ m: 2 }}>
      <Container maxWidth="xl" sx={{ p: 2 }}>
        <Grid2 container spacing={2}>
          <TaskFilter />
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{ marginBottom: 2 }}
          >
            Add Task
          </Button>
        </Grid2>
        {loading ? <CircularProgress /> : <TaskList />}
      </Container>
    </Box>
  );
};

export default Dashboard;
