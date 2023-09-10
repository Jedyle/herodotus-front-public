import React, { useState } from 'react';
import { useIonViewWillEnter, IonLoading, IonPage } from '@ionic/react';
import { Redirect } from 'react-router-dom';

import Page from 'pages/Page';
import { getAuthData } from 'services/auth';
import { storeLogin } from 'services/authStore';

const PrivatePage: React.FC<any> = ({ render, ...props }) => {

    const [loginState, setLoginState] = useState({ loading: true, loggedIn: false });

    useIonViewWillEnter(() => {
        getAuthData().then((value) => {
            if (value && value.token !== null && value.username !== null) {
                storeLogin(value.token, value.username);
                /* setIsLogged(true); */
                setLoginState({ loading: false, loggedIn: true });
            }
            else {
                /* setIsLogged(false); */
                setLoginState({ loading: false, loggedIn: false });
            }
        })
    });

    if (loginState.loading) {
        return <Page name="Loading" content={<div>Loading</div>} />
    }

    return (
        loginState.loggedIn ?
            <div>
                {JSON.stringify(loginState)}
                {render(props)}
            </div>
            :
            <Redirect to="/login" />
    );
}


export default PrivatePage;
