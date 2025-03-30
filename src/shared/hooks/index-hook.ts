import { SetStateAction, useState } from 'react';


export function useInput(initialValue = '') {
    const [value, setValue] = useState(initialValue);

    const handleChange = (text: string) => {
        setValue(text);
    };

    const handleSubmit = async () => {
        console.log("Input value:", value);
    };

    return {
        value,
        handleChange,
        handleSubmit
    };
}
