import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface TaskInputProps {
    onAddTask: (text: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onAddTask(input);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                fullWidth
    variant="outlined"
    placeholder="Добавить новую задачу"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    InputProps={{
        endAdornment: (
            <InputAdornment position="end">
            <IconButton
                edge="end"
                color="primary"
                onClick={handleSubmit}
                disabled={!input.trim()}
                aria-label="Удалить задачу"
            >
        <AddCircleOutlineIcon />
        </IconButton>
        </InputAdornment>
    ),
    }}
    />
    </form>
    );
};

export default TaskInput;