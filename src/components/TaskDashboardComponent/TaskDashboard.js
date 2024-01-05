import { useState, useEffect } from 'react';
import TaskList from '../TaskListComponent/TaskList';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    fetch('mocks/mockTask.json')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const pendingTasks = tasks.filter((task) => task.status === 'pending');
  const inProgressTasks = tasks.filter((task) => task.status === 'in-progress');
  const completedTasks = tasks.filter((task) => task.status === 'completed');

  const addNewTask = (status) => {
    const newTask = {
      id: tasks.length + 1,
      title: `New Task ${tasks.length + 1}`,
      description: `Description for New Task ${tasks.length + 1}`,
      status,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleClick = (taskId) => (event) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedTaskId(null);
  };

  const moveTask = (taskId, newStatus) => {
    console.log('Moving Task ID:', taskId, 'To:', newStatus);
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
    handleClose();
  };

  return (
    <div className="task-dashboard">
      <div className="status-section">
        <div className="status-column">
          <h3>To Do</h3>
          <div className='status-box'>
            {pendingTasks.map((task) => (
              <Card key={task.id} elevation={2} sx={{ my: 2, minWidth: 275 }}>
                <CardContent>
                  <div className='card-box'>
                    <TaskList tasks={[task]} />
                    <div>
                      <Button
                        variant="contained"
                        className='action-btn'
                        onClick={handleClick(task.id)}
                        aria-controls={`task-menu-${task.id}`}
                        aria-haspopup="true"
                      >
                        Move to <KeyboardArrowDownIcon />
                      </Button>
                      <Menu
                        id={`task-menu-${task.id}`}
                        anchorEl={anchorEl}
                        open={selectedTaskId === task.id && Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => moveTask(task.id, 'in-progress')}>
                          Doing
                        </MenuItem>
                        <MenuItem onClick={() => moveTask(task.id, 'completed')}>
                          Done
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
                  <IconButton className="delete-btn" aria-label="delete" onClick={() => deleteTask(task.id)}>
                      <DeleteIcon />
                    </IconButton>
                </CardContent>
              </Card>
            ))}
            <IconButton className='add-btn' aria-label="add" onClick={() => addNewTask('pending')}>
              <AddIcon /> Add New Task
            </IconButton>
          </div>
        </div>
        <div className="status-column">
          <h3>Doing</h3>
          <div className='status-box'>
            {inProgressTasks.map((task) => (
              <Card key={task.id} elevation={2} sx={{ my: 2, minWidth: 275 }}>
                <CardContent>
                  <div className='card-box'>
                    <TaskList tasks={[task]} />
                    <div>
                      <Button
                        variant="contained"
                        className='action-btn'
                        onClick={handleClick(task.id)}
                        aria-controls={`task-menu-${task.id}`}
                        aria-haspopup="true"
                      >
                        Move to <KeyboardArrowDownIcon />
                      </Button>
                      <Menu
                        id={`task-menu-${task.id}`}
                        anchorEl={anchorEl}
                        open={selectedTaskId === task.id && Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => moveTask(task.id, 'pending')}>
                          To Do
                        </MenuItem>
                        <MenuItem onClick={() => moveTask(task.id, 'completed')}>
                          Done
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="status-column">
          <h3>Done</h3>
          <div className='status-box'>
            {completedTasks.map((task) => (
              <Card key={task.id} elevation={2} sx={{ my: 2, minWidth: 275 }}>
                <CardContent>
                  <div className='card-box'>
                    <TaskList tasks={[task]} />
                    <div>
                      <Button
                        variant="contained"
                        className='action-btn'
                        onClick={handleClick(task.id)}
                        aria-controls={`task-menu-${task.id}`}
                        aria-haspopup="true"
                      >
                        Move to <KeyboardArrowDownIcon />
                      </Button>
                      <Menu
                        id={`task-menu-${task.id}`}
                        anchorEl={anchorEl}
                        open={selectedTaskId === task.id && Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => moveTask(task.id, 'pending')}>
                          To Do
                        </MenuItem>
                        <MenuItem onClick={() => moveTask(task.id, 'in-progress')}>
                          Doing
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;