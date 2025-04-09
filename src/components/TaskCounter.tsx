import React from 'react';
import { Typography } from '@mui/material';

interface TaskCounterProps {
    count: number;
}

const TaskCounter: React.FC<TaskCounterProps> = ({ count }) => {
    return (
        <Typography variant="body2" color="textSecondary">
            Осталось задач: {count}
        </Typography>
    );
};

export default TaskCounter;