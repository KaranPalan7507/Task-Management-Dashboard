import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL =
  "https://my-json-server.typicode.com/KaranPalan7507/Task-Management-Dashboard/tasks";
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const { data } = await axios.get(URL);
  return data.slice(0, 20).map((task) => ({
    ...task,
    status: task.completed ? "Completed" : "To Do",
  }));
});
export const updateTaskStatus = createAsyncThunk(
  "tasks/updateTaskStatus",
  async (updatedTask) => {
    await axios.put(`${URL}/${updatedTask.id}`, updatedTask);
    return updatedTask;
  }
);
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (task) => {
  await axios.delete(`${URL}/${task.id}`, task);
  return task;
});

export const addTask = createAsyncThunk("tasks/addTask", async (data) => {
  const res = await axios.post(URL, data);
  console.log(res);
  return res.data;
});
const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    filter: "All",
    search: "",
    loading: false,
    error: null,
  },
  reducers: {
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) state.tasks[index] = action.payload;
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.id
        );
      });
  },
});

export const { updateTask, setFilter, setSearch } = tasksSlice.actions;
export default tasksSlice.reducer;
