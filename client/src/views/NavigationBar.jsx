import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import useUserDetails from "../hooks/useUserDetails.js";

export function NavigationBar() {
    const {accessToken} = useUserDetails();

    return (
        <>
            <Menu pointing secondary>
                {accessToken ? (
                        <>
                            <Menu.Item
                                name='My Surveys'
                                as={NavLink}
                                to={"/surveys"}
                            />
                            <Menu.Item
                                name='Answers'
                                as={NavLink}
                                to={"/answers"}
                            />
                            <Menu.Item
                                name='Profile'
                                as={NavLink}
                                to={"/profile"}
                            />
                        </>

                ) : (
                    <Menu.Item
                        name='Surveys'
                        as={NavLink}
                        to={"/home"}
                    />
                )}
                <Menu.Menu position='right'>
                    {accessToken ? (
                        <Menu.Item
                            name='Log out'
                            as={NavLink}
                            to={"/logout"}
                        />
                    ) : (
                        <>
                            <Menu.Item
                                name='Register'
                                as={NavLink}
                                to={"/register"}
                            />
                            <Menu.Item
                                name='Log in'
                                as={NavLink}
                                to={"/login"}
                            />
                        </>
                    )}
                </Menu.Menu>
            </Menu>
        </>
    );
}