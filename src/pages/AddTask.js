import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import TaskForm from "../components/TaskForm";

const AddTask = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5">Add Task</Typography>
      <TaskForm onClose={() => navigate("/")} />
    </Box>
  );
};

export default AddTask;
