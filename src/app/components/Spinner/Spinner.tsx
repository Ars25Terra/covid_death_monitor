import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spinner = () => {
    return (
        <Box sx={{ display: 'flex',
                   width: '100%',
                   height: '100%',
                   textAlign: 'center',
                   position: 'absolute',
                   justifyContent: 'center',
                   alignContent: 'center',
                   alignItems: 'center' }}>
            <CircularProgress />
        </Box>
    )
}

export default Spinner
