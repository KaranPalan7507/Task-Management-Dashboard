import DeleteIcon from "@mui/icons-material/Delete";
import { useDrag } from "react-dnd";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { deleteTask } from "../tasksSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: task,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const handleCardClick = () => {
    navigate(`/task/${task.id}`); // Navigate to the Task Detail page
  };
  return (
    <Card
      ref={drag}
      onClick={handleCardClick}
      sx={{
        marginBottom: 2,
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: "white",
      }}
    >
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        {task.description && (
          <Typography variant="body2">
            Description: {task.description}
          </Typography>
        )}

        <Typography variant="body2" color="textSecondary">
          Status: {task.status}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Created: {new Date(task.creationDate).toLocaleDateString()}
        </Typography>
        <IconButton
          size="small"
          onClick={() => dispatch(deleteTask(task))}
          sx={{ float: "right" }}
        >
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};
export default TaskItem;
