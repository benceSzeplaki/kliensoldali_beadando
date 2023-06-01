import { useState } from "react";

export default function useForm( defaultValue ) {

    const [ data, setData ] = useState( defaultValue );

    const handleOnChange = ( event ) => {
        const { name, value } = event.target;
        setData( { ...data, [ name ]: value } );
    };

    return {
        handleOnChange: handleOnChange,
        data: data
    };
}
