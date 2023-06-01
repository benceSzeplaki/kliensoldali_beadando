import {Button, Form, Grid, Header, Icon, Message, MessageContent, Segment} from "semantic-ui-react";
import useForm from "../../hook/useForm.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useRegisterMutation} from "./authApi.js";


export function Register() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-ZÁÉÍÓÖŐÚÜŰ][a-zA-ZÁÉÍÓÖŐÚÜŰáéíóöőúüű-]*$/;
    const [ authRegister ] = useRegisterMutation();

    const {data, handleOnChange} = useForm({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        firstname: {hasError: false, message: ""},
        lastname: {hasError: false, message: ""},
        email: {hasError: false, message: ""},
        password: {hasError: false, message: ""},
        confirmPassword: {hasError: false, message: ""}
    });

    const [hasRegisteredSuccessfully, setSuccessfulRegistration] = useState(false);
    const navigate = useNavigate();

    const submitForm = async () => {
        if (isFormValid()) {
            const registerRequest = {
                email: data.email,
                password: data.password,
                fullname: data.lastname + " " + data.firstname
            }
            try {
                const { data } = await authRegister(registerRequest).unwrap();
                console.log("Sikeres regisztráció!");
                console.log(JSON.stringify(data));
                setSuccessfulRegistration(true);
            } catch (error) {
                let currentErrors = errors;
                currentErrors.email.hasError = true;
                currentErrors.email.message = "Az e-mail cím már használatban van.";
                setErrors({...currentErrors});
            }
        }
    }

    const isFormValid = () => {
        let currentErrors = errors;
        let isFormValid = true;

        // Keresztnév
        if (data.firstname.trim().length === 0) {
            currentErrors.firstname.hasError = true;
            currentErrors.firstname.message = "A keresztnév megadása kötelező.";
            isFormValid = false;
        } else if (!nameRegex.test(data.firstname)) {
            currentErrors.firstname.hasError = true;
            currentErrors.firstname.message = "A keresztnév nagybetűvel kell kezdődjön " +
                "és nem tartalmazhat üres karaktert";
            isFormValid = false;
        } else {
            currentErrors.firstname.hasError = false;
        }

        // Vezetéknév
        if (data.lastname.trim().length === 0) {
            currentErrors.lastname.hasError = true;
            currentErrors.lastname.message = "A vezetéknév megadása kötelező.";
            isFormValid = false;
        } else if (!nameRegex.test(data.lastname)) {
            currentErrors.lastname.hasError = true;
            currentErrors.lastname.message = "A vezetéknév nagybetűvel kell kezdődjön " +
                "és nem tartalmazhat üres karaktert";
            isFormValid = false;
        } else {
            currentErrors.lastname.hasError = false;
        }

        // E-mail
        if (data.email.trim().length === 0) {
            currentErrors.email.hasError = true;
            currentErrors.email.message = "Az e-mail cím megadása kötelező.";
            isFormValid = false;
        } else if (!emailRegex.test(data.email)) {
            currentErrors.email.hasError = true;
            currentErrors.email.message = "A megadott e-mail cím nem megfelelő formátumú.";
            isFormValid = false;
        } else {
            currentErrors.email.hasError = false;
        }

        //Jelszó
        if (data.password.trim().length === 0) {
            currentErrors.password.hasError = true;
            currentErrors.password.message = "A jelszó megadása kötelező.";
            isFormValid = false;
        } else {
            currentErrors.password.hasError = false;
        }

        // Jelszó ismétlés
        if (data.password !== data.confirmPassword) {
            currentErrors.confirmPassword.hasError = true;
            currentErrors.confirmPassword.message = "A jelszó és a jelszómegerősítése mező értéke eltérő.";
            isFormValid = false;
        } else {
            currentErrors.confirmPassword.hasError = false;
        }

        setErrors({...currentErrors});
        return isFormValid;
    }

    return (
        <>
            <Header as={"h1"} content={"Regisztráció"} color={"blue"} attached={"top"}/>
            {hasRegisteredSuccessfully ? (
                <>
                    <Message positive attached>
                        <Message.Header>
                            Sikeres regisztráció!
                        </Message.Header>
                        <MessageContent>
                            A regisztráció sikeresen végbezajlott,
                            a továbbiakban a megadott adatokkal lehetséges bejelentkezned az oldalon.
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={16} textAlign={"center"} style={{marginTop: "2em"}}>
                                        <Button animated color={"green"} style={{marginTop: "1em"}}
                                                onClick={() => navigate("/login")}>
                                            <Button.Content visible>
                                                Tovább a bejelentkezéshez!
                                            </Button.Content>
                                            <Button.Content hidden>
                                                <Icon name={"sign-in"}/>
                                            </Button.Content>
                                        </Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </MessageContent>
                    </Message>
                </>
            ) : (
                <>
                    <Segment attached>
                        <Form>
                            <Grid columns={2}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Form.Input
                                            type={"text"}
                                            label={"Keresztnév"}
                                            icon={"user"}
                                            iconPosition={"left"}
                                            name={"firstname"}
                                            value={data.firstname}
                                            onChange={(event) => handleOnChange(event)}
                                            error={errors.firstname.hasError ?
                                                errors.firstname.message :
                                                errors.firstname.hasError
                                            }
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Form.Input
                                            type={"text"}
                                            label={"Vezetéknév"}
                                            icon={"user outline"}
                                            iconPosition={"left"}
                                            name={"lastname"}
                                            value={data.lastname}
                                            onChange={(event) => handleOnChange(event)}
                                            error={errors.lastname.hasError ?
                                                errors.lastname.message :
                                                errors.lastname.hasError
                                            }
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <Form.Input
                                            type={"text"}
                                            label={"E-mail cím"}
                                            icon={"at"}
                                            iconPosition={"left"}
                                            name={"email"}
                                            value={data.email}
                                            onChange={(event) => handleOnChange(event)}
                                            error={errors.email.hasError ?
                                                errors.email.message :
                                                errors.email.hasError
                                            }
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Form.Input
                                            type={"password"}
                                            label={"Jelszó"}
                                            icon={"key"}
                                            iconPosition={"left"}
                                            name={"password"}
                                            value={data.password}
                                            onChange={(event) => handleOnChange(event)}
                                            error={errors.password.hasError ?
                                                errors.password.message :
                                                errors.password.hasError
                                            }
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Form.Input
                                            type={"password"}
                                            label={"Jelszó megismétlése"}
                                            icon={"key"}
                                            iconPosition={"left"}
                                            name={"confirmPassword"}
                                            value={data.confirmPassword}
                                            onChange={(event) => handleOnChange(event)}
                                            error={errors.confirmPassword.hasError ?
                                                errors.confirmPassword.message :
                                                errors.confirmPassword.hasError
                                            }
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={16} textAlign={"center"}>
                                        <Button animated color={"blue"} style={{marginTop: "1em"}}
                                                onClick={() => submitForm()}>
                                            <Button.Content visible>
                                                Regisztrálás
                                            </Button.Content>
                                            <Button.Content hidden>
                                                <Icon name={"signup"}/>
                                            </Button.Content>
                                        </Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form>
                    </Segment>
                </>
            )}
        </>
    );
}