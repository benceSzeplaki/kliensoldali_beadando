import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export function NavigationBar() {
    const accessToken  = false;

    return (
        <>
            <Menu pointing secondary>
                {accessToken ? (
                        <>
                            <Menu.Item
                                name='Kérdőíveim'
                                as={NavLink}
                                to={"/surveys"}
                            />
                            <Menu.Item
                                name='Válaszok'
                                as={NavLink}
                                to={"/answers"}
                            />
                            <Menu.Item
                                name='Profil'
                                as={NavLink}
                                to={"/profile"}
                            />
                        </>

                ) : (
                    <Menu.Item
                        name='Kérdőívek'
                        as={NavLink}
                        to={"/home"}
                    />
                )}
                <Menu.Menu position='right'>
                    {accessToken ? (
                        <Menu.Item
                            name='Kijelentkezés'
                            as={NavLink}
                            to={"/logout"}
                        />
                    ) : (
                        <>
                            <Menu.Item
                                name='Regisztrácio'
                                as={NavLink}
                                to={"/register"}
                            />
                            <Menu.Item
                                name='Bejelentkezés'
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