import { Alert, Box, Button, IconButton, Snackbar, SnackbarCloseReason, SnackbarOrigin } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes, { string } from 'prop-types';
import { EXceptionHandler } from "src/utils/exception-handler";
import useExceptionMessage from "../costum_hook/exception-hook";

function GlobaleException({
    disable = false,
    children,
}) {

    const [open, setOpen] = useState(false);
    const exceptionMessage = useExceptionMessage(); 

    const snackbarOrigin: SnackbarOrigin = {
        vertical: 'top',
        horizontal: 'center'
    };
    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        clearSnackBar();
    };


    useEffect(() => {
        setOpen(true);
    }, [exceptionMessage]);


    const clearSnackBar =() =>{
        children = null;
        setOpen(false);
        EXceptionHandler.setMessage(null);
    }

    return (
        <Box sx={{ width: 500 }} >
             {exceptionMessage && !disable &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={snackbarOrigin}>
                    <Alert
                        onClose={handleClose}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {exceptionMessage}
                    </Alert>
                </Snackbar> 
            }
        </Box>
    ) 
}

export default GlobaleException;

GlobaleException.propTypes = {
    disable: PropTypes.bool,
    children: PropTypes.node,
    message: PropTypes.string
}
