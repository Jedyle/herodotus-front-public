import { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useIonViewWillEnter, useIonViewDidLeave, IonLoading, IonPage, IonContent, IonRow, IonCol, IonGrid, IonItem, IonInput, IonLabel, IonButton, IonText } from '@ionic/react';

import { register, getAuthData } from 'services/auth';
import { validateLesson } from 'services/api';
import { storeLogin, storeResetLesson } from 'services/authStore';

import './index.css';

interface Registration {
    email: string,
    username: string,
    password: string
}

const RegisterPage: React.FC = ({ lesson }) => {

    const history = useHistory();

    const blankRegistration: Registration = {
        email: "",
        username: "",
        password: "",
    };
    const [registration, setRegistration] = useState<Registration>(blankRegistration);

    const blankErrorsData: any = {
        non_field_errors: [],
        email: [],
        username: [],
        password1: [],
        password2: []
    };
    const [errors, setErrors] = useState(blankErrorsData);

    const [loading, setLoading] = useState(false);

    useIonViewWillEnter(() => {
        getAuthData().then((value) => {
            if (value.token !== null && value.username !== null) {
                storeLogin(value.token, value.username);
                history.push("/");
            }
        })
    });

    useIonViewDidLeave(() => {
        setRegistration(blankRegistration);
        setErrors(blankErrorsData);
    });

    const onRegister = (registration: Registration) => {
        setLoading(true);
        register(registration.email, registration.username, registration.password, registration.password).then(() => {
            // here, save information in tmp storage for first lesson

            if (lesson) {
                // means the user that just registered completed a lesson before
                validateLesson(lesson).catch((error: any) => { console.log(error) }).finally(() => {
                    storeResetLesson();
                    setLoading(false);
                    history.push("/");
                })
            }
            else {
                setLoading(false);
                history.push("/");
            }

        }).catch(error => {
            if (error.response.status == 400) {
                setErrors(error.response.data);
                setLoading(false);
            }
        })
    }

    return (
        <IonPage>
            <IonContent>
                <IonLoading
                    isOpen={loading}
                    message="Please wait..."
                />
                <IonGrid>
                    <IonRow color="primary" justify-content-center>
                        <IonCol className="ion-align-self-center" size-md="6" size-lg="5" size-xs="12">
                            <div className="ion-text-center">
                                <h3>Register</h3>
                            </div>
                            <div>
                                <IonText color="danger">
                                    {errors?.non_field_errors}
                                </IonText>

                                <IonItem>
                                    <IonText color="danger">
                                        {errors?.email}
                                    </IonText>
                                    <IonLabel
                                        position="stacked"
                                    >Email address</IonLabel>
                                    <IonInput
                                        name="email" type="text" required value={registration.email}
                                        inputmode="email"
                                        placeholder="Email address"
                                        onIonInput={
                                            (e) => {
                                                setRegistration({ ...Object.assign({}, registration), email: e.detail.value })
                                            }}></IonInput>
                                </IonItem>

                                <IonItem>
                                    <IonText color="danger">
                                        {errors?.username}
                                    </IonText>
                                    <IonLabel position="stacked">Username</IonLabel>
                                    <IonInput
                                        name="username" type="text" required value={registration.username}
                                        placeholder="Username"
                                        onIonInput={
                                            (e) => {
                                                setRegistration({ ...Object.assign({}, registration), username: e.detail.value })
                                            }}></IonInput>
                                </IonItem>

                                <IonItem>
                                    <IonText color="danger">
                                        {errors?.password1}
                                    </IonText>
                                    <IonLabel position="stacked">Password</IonLabel>
                                    <IonInput
                                        name="password" type="password"
                                        required value={registration.password}
                                        placeholder="Password"
                                        onIonInput={
                                            (e) => {
                                                setRegistration({ ...Object.assign({}, registration), password: e.detail.value })
                                            }}></IonInput>
                                </IonItem>


                            </div>
                            <div>
                                <IonButton
                                    size="default"
                                    expand="block"
                                    color="success"
                                    onClick={() => onRegister(registration)}
                                >Register</IonButton>
                            </div>
                            <p className="ion-text-center">
                                <IonText>
                                    <small>Already have an account ?</small>
                                </IonText>
                            </p>
                            <IonButton
                                size="default"
                                expand="block"
                                routerLink="/login"
                            >Login</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

const MapStateToProps = (state: any) => ({
    lesson: state.lesson.lesson
})

export default connect(MapStateToProps)(RegisterPage);
