import React from 'react';
import { List, ListItem, Checkbox, ListItemText, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Task } from '../types';

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
    if (tasks.length === 0) {
        return <div className={'no-tasks'}>Нет задач</div>;
    }

    return (
        <List>
            {tasks.map(task => (
                <ListItem
                    key={task.id}
                    secondaryAction={
                        <IconButton edge="end" onClick={() => onDelete(task.id)}>
                            <DeleteOutlineIcon />
                        </IconButton>
                    }
                >
                    <Checkbox
                        checked={task.completed}
                        onChange={() => onToggle(task.id)}
                        inputProps={{ 'aria-label': `Отметить задачу "${task.text}"` }}
                    />
                    <ListItemText
                        primary={task.text}
                        style={{
                            textDecoration: task.completed ? 'line-through' : 'none',
                            opacity: task.completed ? 0.7 : 1
                        }}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default TaskList;