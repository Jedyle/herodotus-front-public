import { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import queryString from 'query-string';

import { useIonViewWillEnter, useIonViewDidLeave, IonPage, IonContent, IonRow, IonCol, IonGrid, IonItem, IonInput, IonLabel, IonButton, IonText } from '@ionic/react';

import { login, getAuthData } from 'services/auth';
import { storeLogin } from 'services/authStore';

interface User {
    username: string,
    password: string
}

interface LoginPageProps {
    currentUser: string
}

const LoginPage: React.FC<LoginPageProps> = ({ currentUser }) => {

    const { search } = useLocation();
    const history = useHistory();

    const queryParams: any = queryString.parse(search);

    const blankUserData: User = {
        username: "",
        password: ""
    }

    const [user, setUser] = useState<User>(blankUserData)

    const blankErrorsData: any = {
        non_field_errors: [],
        username: [],
        password: []
    }

    const [errors, setErrors] = useState(blankErrorsData)

    const onLogin = (user: User) => {
        login(user.username, user.password).then(() => {
            history.push(queryParams['redirect'] || "/");
        }).catch(error => {
            if (error.response.status == 400) {
                setErrors(error.response.data);
            }
        })
    }

    useIonViewWillEnter(() => {
        getAuthData().then((value) => {
            if (value && value.token !== null && value.username !== null) {
                storeLogin(value.token, value.username);
                history.push(queryParams['redirect'] || "/");
            }
        })
    });

    useIonViewDidLeave(() => {
        setUser(blankUserData);
        setErrors(blankErrorsData);
    })


    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow color="primary" justify-content-center>
                        <IonCol className="ion-align-self-center" size-md="6" size-lg="5" size-xs="12">
                            <div className="ion-text-center">
                                <h1>Herodotus App</h1>
                                <hr />
                                <h3>Login</h3>
                            </div>
                            <div>
                                <IonText color="danger">
                                    {errors?.non_field_errors}
                                </IonText>
                                <IonItem>
                                    <IonText color="danger">
                                        <small>
                                            {errors?.username}
                                        </small>
                                    </IonText>
                                    <IonLabel position="floating">Username</IonLabel>
                                    <IonInput
                                        name="txt" type="text" placeholder="Username" required value={user.username}
                                        onIonInput={
                                            (e) => {
                                                setUser({ username: e.detail.value, password: user.password })
                                            }}></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonText color="danger">
                                        <small>
                                            {errors?.password}
                                        </small>
                                    </IonText>
                                    <IonLabel position="floating">Password</IonLabel>
                                    <IonInput
                                        name="password" type="password" placeholder="Password" required
                                        value={user.password}
                                        onIonInput={
                                            (e) => {
                                                setUser({ username: user.username, password: e.detail.value })
                                            }
                                        }
                                    ></IonInput>
                                </IonItem>
                                <IonText className="ion-text-end">
                                    <small>
                                        <p>
                                            <a
                                                href={`${import.meta.env.VITE_APP_API_URL}/reset_password/`}
                                                style={
                                                    {
                                                        textDecoration: "none",
                                                        color: "black"
                                                    }}
                                            >Forgot password ?</a>
                                        </p></small>
                                </IonText>
                            </div>
                            <div>
                                <IonButton
                                    size="default"
                                    expand="block"
                                    color="success"
                                    onClick={() => onLogin(user)}
                                >Login</IonButton>
                                <p className="ion-text-center">
                                    <IonText>
                                        <small>
                                            No account ?
                                        </small>
                                    </IonText>
                                </p>
                                <IonButton
                                    size="default"
                                    expand="block"
                                    routerLink="/register"
                                >Register</IonButton>
                                <p className="ion-text-center">
                                    <IonText>
                                        <small>Want to know more ?</small>
                                    </IonText>
                                </p>
                                <IonButton
                                    size="default"
                                    expand="block"
                                    routerLink="/about"
                                    color="medium"
                                >
                                    About this app
                                </IonButton>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

const MapStateToProps = (state: any) => ({
    currentUser: state.username
})

export default connect(MapStateToProps)(LoginPage);
