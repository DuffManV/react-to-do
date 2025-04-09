import React from 'react';
import { Button } from '@mui/material';

interface ClearCompletedProps {
    onClear: () => void;
}

const ClearCompleted: React.FC<ClearCompletedProps> = ({ onClear }) => {
    return (
        <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={onClear}
        >
            Очистить завершенные
        </Button>
    );
};

export default ClearCompleted;