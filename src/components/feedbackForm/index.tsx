import React from 'react';

import { IonText, IonTextarea, IonSelect, IonSelectOption, IonItem, IonItemDivider, IonButton} from '@ionic/react';

export interface TypeOptionInterface {
  value: string;
  text: string;
}

export interface FeedbackErrorProps {
  feedback_type: string;
  non_field_errors: string[];
  message: string;
}


export interface FeedbackFieldProps {
  feedback_type: string;
  message: string;  
}

export interface FeedbackFormProps extends FeedbackFieldProps {
  typeOptions: TypeOptionInterface[];
  onChangeType: (event: any) => void;
  onChangeMessage: (event: any) => void;
  errors: FeedbackErrorProps;
  onSubmit: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({typeOptions, feedback_type, onChangeType, message, onChangeMessage, errors, onSubmit}) => (
    <form onSubmit={(e) => {e.preventDefault(); onSubmit();}}>
      <p className="help is-danger">{errors.non_field_errors}</p>

      <IonItem>
        <IonSelect
	  value={feedback_type}
	  onIonChange={onChangeType}
	  interface="action-sheet"
	>
          {typeOptions.map(
            (option) => (
              <IonSelectOption value={option.value}>{option.text}</IonSelectOption>
            )
          )}
        </IonSelect>
        <p className="help is-danger">{errors.feedback_type}</p>	  
      </IonItem>

      <IonItem>
        <IonTextarea
          placeholder="Your message..."
          value={message}
          onIonChange={onChangeMessage}
	  rows={10}
        ></IonTextarea>
	<br/>
      </IonItem>
      <br />
      <div>
	<IonText color="danger">{errors.message}</IonText>
      </div>
      <div>
	<IonText>
	  If you need to embed attachments such as screenshots, please use an image uploader such as <b><a target="_blank" href="https://imgbb.com">imgbb</a></b> and copy the link here.	
	</IonText>
      </div>

      <br />
      
      <IonButton size="default" expand="block" onClick={onSubmit}>Send feedback</IonButton>
    </form>  
);

export default FeedbackForm;
