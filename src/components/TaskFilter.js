import React from "react";
import {
  ToggleButtonGroup,
  ToggleButton,
  Grid2,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSearch } from "../tasksSlice";

const TaskFilter = () => {
  const { filter, search } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  return (
    <Grid2 container spacing={2}>
      <Grid2 item size="1">
        <TextField
          label="Search"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
      </Grid2>
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(e, newFilter) => {
          dispatch(setFilter(newFilter));
        }}
        sx={{ marginBottom: 2 }}
      >
        <ToggleButton value="All">All</ToggleButton>
        <ToggleButton value="To Do">To Do</ToggleButton>
        <ToggleButton value="In Progress">In Progress</ToggleButton>
        <ToggleButton value="Completed">Completed</ToggleButton>
      </ToggleButtonGroup>
    </Grid2>
  );
};

export default TaskFilter;
