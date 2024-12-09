import AddTask from "./pages/AddTask";
import Dashboard from "./pages/Dashboard";
import TaskDetail from "./pages/TaskDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/task/:id" element={<TaskDetail />} />
          <Route path="/add-task" element={<AddTask />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
