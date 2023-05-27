import { useState, useEffect } from "react";

const getFromLocalStorage = (name, defaultValue) => {
    const valueInStroage = localStorage.getItem(name);
    return valueInStroage ? JSON.parse(valueInStroage) : defaultValue;
}

const useUserDetails = (name, defaultValue) => {
    const [detail, setDetail] = useState(getFromLocalStorage(name, defaultValue));

    useEffect(() => {
        if (detail !== undefined) {
            localStorage.setItem(name, JSON.stringify(detail));
        }
    }, [name, detail]);

    return [detail, setDetail];
};

export default useUserDetails;