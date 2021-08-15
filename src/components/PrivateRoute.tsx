import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Route, RouteProps, Redirect, useHistory } from 'react-router-dom';

import { dispatchLogin, getAuthData } from '../services/auth';

const PrivateRoute: React.FC<RouteProps> = ({...routeProps}) => {

  const [isLogged, setIsLogged] = useState(true);
  
  useEffect(() => {
    getAuthData().then((value) => {
      if (value.token !== null && value.username !== null){
	dispatchLogin(value.token, value.username);
	setIsLogged(true);
      }
      else {
	setIsLogged(false);
      }
    })      
  }, []);
  
  return (isLogged ?
    <Route
      {...routeProps}
    / > : <Redirect to="/login" />
  );
}

export default PrivateRoute;
