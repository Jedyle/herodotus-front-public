import React, { useState } from 'react';
import { useIonViewWillEnter } from '@ionic/react';
import { Redirect } from 'react-router-dom';

import { dispatchLogin, getAuthData } from 'services/auth';

const PrivatePage: React.FC<any> = ({render, ...props}) => {

  const [isLogged, setIsLogged] = useState(true);
  
  useIonViewWillEnter(() => {
    getAuthData().then((value) => {
      if (value && value.token !== null && value.username !== null){
	dispatchLogin(value.token, value.username);
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
