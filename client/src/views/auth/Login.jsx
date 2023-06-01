import { Button } from "semantic-ui-react";

export function Login() {

    return (
        <>
            <Button onClick={() => console.log("Log in clicked :D")}>
                Log in
            </Button>
        </>
    );
}