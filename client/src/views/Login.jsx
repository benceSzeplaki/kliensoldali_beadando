import {Button} from "semantic-ui-react";

export function Login() {

    const onLogin = () => {
        localStorage.setItem("accessToken", "Bearer ...");
    }

    return (
        <>
            <Button onClick={() => onLogin()}>
                Log in
            </Button>
        </>
    );
}