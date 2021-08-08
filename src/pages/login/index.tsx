import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import queryString from 'query-string';

import { IonPage, IonContent, IonRow, IonCol, IonGrid, IonItem, IonInput, IonButton, IonText} from '@ionic/react';

import { login } from '../../services/auth';

interface User {
  username: string,
  password: string
}

const LoginPage: React.FC = () => {
  
  const { search } = useLocation();
  const history = useHistory();

  const queryParams: any = queryString.parse(search);
  
  const [user, setUser] = useState<User>({
    username: "",
    password: ""
  })

  const [errors, setErrors] = useState({
    non_field_errors: [],
    username: [],
    password: []
  })

  const onLogin = (user: User) => {
    login(user.username, user.password).then(() => {
      history.replace(queryParams['redirect'] || "/");
    }).catch(error => {
      if (error.response.status == 400)
      {
	setErrors(error.response.data);
      }
    })
  }

  return (
    <IonPage>
      <IonContent>
	<IonGrid>
	  <IonRow color="primary" justify-content-center>
            <IonCol className="ion-align-self-center" size-md="6" size-lg="5" size-xs="12">
              <div className="ion-text-center">
		<h3>Login</h3>
              </div>
              <div>
		<IonText color="danger">
		  {errors?.non_field_errors}
		</IonText>
		<IonItem>
		  <IonText color="danger">
		    {errors?.username}
		  </IonText>
		  <IonInput
		    name="txt" type="text" placeholder="Username" required value={user.username}
		    onIonChange={
		    (e) => {
		      setUser({username: e.detail.value, password: user.password})
		    }}></IonInput>
		</IonItem>
		<IonItem>
		<IonText color="danger">
		  {errors?.password}
		</IonText>
		  <IonInput
		    name="password" type="password" placeholder="Password" required
		    value={user.password}
		    onIonChange={
		    (e) => {
		      setUser({username: user.username, password: e.detail.value})
		    }
		    }
		  ></IonInput>
		</IonItem>
              </div>
              <div>
		<IonButton
		  size="default"
		  expand="block"
		  onClick={() => onLogin(user)}
		>Login</IonButton>
              </div>
            </IonCol>
	  </IonRow>
	</IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default LoginPage;
