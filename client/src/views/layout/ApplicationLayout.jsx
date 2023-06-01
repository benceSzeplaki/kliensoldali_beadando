import { NavigationBar } from "./components/NavigationBar.jsx";
import { Segment } from "semantic-ui-react";

export function ApplicationLayout({ children }) {
    return (
        <>
            <Segment style={{paddingLeft: "5em", paddingRight: "5em"}} basic>
                <NavigationBar/>
                {children}
            </Segment>
        </>
    );
}

