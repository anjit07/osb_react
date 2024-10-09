import { useState, useEffect } from 'react';
import { EXceptionHandler } from 'src/utils/exception-handler';

function useExceptionMessage() {
    
    const [message, setMessage] = useState(EXceptionHandler.getMessage());
    useEffect(() => {
        // Define a function to update the local state
        const updateMessage = () => {
            setMessage(EXceptionHandler.getMessage());
        };

        // Subscribe to EXceptionHandler when the component mounts
        EXceptionHandler.subscribe(updateMessage);

        // Unsubscribe when the component unmounts
        return () => {
            EXceptionHandler.unsubscribe(updateMessage);
        };
    }, []);

    return message;
}


export default useExceptionMessage;
