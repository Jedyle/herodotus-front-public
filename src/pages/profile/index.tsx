import { useState } from 'react';
import { connect } from 'react-redux';
import { useIonAlert, IonGrid, IonRow, IonCol, IonText, IonLabel, IonButton, IonItem, IonInput} from '@ionic/react';

import { changePassword } from 'services/api';

interface ProfileProps {
  currentUser: string
}

const _Profile: React.FC<ProfileProps> = ({currentUser}) => {

  const [present] = useIonAlert();
  
  const [passwordChangeForm, setPasswordChangeForm] = useState<any>({
    old_password: "",
    new_password1: "",
    new_password2: "",
  })
  
  const [errors, setErrors] = useState<any>({
    non_field_errors: [],
    old_password: [],
    new_password1: [],
    new_password2: [],
  })

  const fields = [["old_password", "Old password"], ["new_password1", "New password"], ["new_password2", "Confirm new password"]];

  const onSubmit = () => {
    changePassword(passwordChangeForm.old_password, passwordChangeForm.new_password1, passwordChangeForm.new_password2).then(() => {
      present({
	message: "Your password has been updated !"
      });
      setPasswordChangeForm({
	old_password: "",
	new_password1: "",
	new_password2: "",
      });
      setErrors({
	non_field_errors: [],
	old_password: [],
	new_password1: [],
	new_password2: [],
      });
    }).catch((error) => {
      if (error.response.status === 400){
	setErrors(error.response.data)
      }
    })
  };
  
  return (
    <IonGrid>
      <IonRow color="primary" justify-content-center>
	<IonCol className="ion-align-self-center" size-md="6" size-lg="5" size-xs="12">
	  <IonText className="ion-text-center">
	    <h1>Hi, {currentUser}.</h1>
	  </IonText>
	  <hr/>
          <div className="ion-text-center">
	    <h4>Change your password</h4>
	    <br/>	    
          </div>
          <div>
	    <IonText color="danger">
	      {errors?.non_field_errors}
	    </IonText>
	    {fields.map((item) => {
	      const [field, name] = item;
	      return (
		<IonItem>
		  <IonText color="danger">
		    <small>
		      {errors[field]}
		    </small>
		  </IonText>
		  <IonLabel position="stacked">{name}</IonLabel>		  
		  <IonInput
		    name={field} type="password" required value={passwordChangeForm[field]}
		    onIonChange={
		    (e) => {
		      setPasswordChangeForm({...passwordChangeForm, [field]: e.detail.value})
		    }}></IonInput>
		</IonItem>      
	      );
	    })  
	    }
	  </div>
          <div>
	    <IonButton
	      size="default"
	      expand="block"
	      onClick={onSubmit}
	    >Validate</IonButton>
          </div>
	</IonCol>
      </IonRow>
    </IonGrid>

)};

const MapStateToProps = (state: any) => ({
  currentUser: state.username
})

export default connect(MapStateToProps)(_Profile);
