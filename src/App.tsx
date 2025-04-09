import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Tabs, Tab, Box } from '@mui/material';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskCounter from './components/TaskCounter';
import ClearCompleted from './components/ClearCompleted';
import { Task } from './types';
import './styles.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [tabValue, setTabValue] = useState(0);

  const tabs:string[] = ['Все', 'Активные', 'Завершенные']

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    if (text.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
        createdAt: Date.now()
      };
      setTasks([...tasks, newTask]);
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
        tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = () => {
    switch (tabValue) {
      case 1:
        return tasks.filter(task => !task.completed);
      case 2:
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  return (
      <Container maxWidth="sm" className="app-container">
        <Paper elevation={3} className="app-paper">
          <Typography variant="h4" align="center" gutterBottom>
            Список задач
          </Typography>

          <TaskInput onAddTask={addTask} />

          <Tabs
              value={tabValue}
              onChange={(_, newValue) => setTabValue(newValue)}
              centered className={'tabs'}
          >
            {tabs.map((tab, index) => (
                <Tab key={index} label={tab} />
            ))}
          </Tabs>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <TaskCounter count={tasks.filter(t => !t.completed).length} />
            <ClearCompleted onClear={clearCompleted} />
          </Box>

          <TaskList
              tasks={filteredTasks()}
              onToggle={toggleTask}
              onDelete={deleteTask}
          />
        </Paper>
      </Container>
  );
};

export default App;
