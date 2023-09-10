import React, { useState } from 'react';
import { useIonViewWillEnter } from '@ionic/react';
import { Redirect } from 'react-router-dom';

import { getAuthData } from 'services/auth';
import { storeLogin } from 'services/authStore';

const PrivatePage: React.FC<any> = ({ render, ...props }) => {

    const [isLogged, setIsLogged] = useState(true);

    useIonViewWillEnter(() => {
        getAuthData().then((value) => {
            if (value && value.token !== null && value.username !== null) {
                storeLogin(value.token, value.username);
                setIsLogged(true);
            }
            else {
                setIsLogged(false);
            }
        })
    });

    return (
        isLogged ?
            render(props) : <Redirect to="/login" />
    );
}


export default PrivatePage;
