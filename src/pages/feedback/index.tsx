import { useState } from 'react';
import { useIonAlert, useIonViewWillEnter } from '@ionic/react';
import { sendFeedback } from 'services/api';
import Page from 'pages/Page';
import FeedbackForm, { FeedbackFieldProps, FeedbackErrorProps } from 'components/feedbackForm';

const FeedbackPage: React.FC =  () => {

  const [present] = useIonAlert();
 
   const [fields, setFields] = useState<FeedbackFieldProps>({
    feedback_type: "bug",
    message: ""
   })

  const [errors, setErrors] = useState<FeedbackErrorProps>({
    non_field_errors: null,
    feedback_type: null,
    message: null
  })

  const onSubmit = () => {
    sendFeedback(fields).then(() => {
      present({
	message: "Your feedback has been submitted ! Thanks for helping us improving this app."
      });
      setFields({
	feedback_type: "bug",
	message: ""
      });
      setErrors({
	non_field_errors: null,
	feedback_type: null,
	message: null	
      })
    }).catch((error) => {
      if (error.response.status === 400){
	setErrors(error.response.data);
      }
    })
  }

  
  return (
    <Page
      key={"feedback"}
      name={"Feedback"}
      content={
	<div style={{margin: "20px"}}>
	  <h1>Give us feedback</h1>
	  <p>
	    Herodotus is still under construction, therefore we need your help ! Please feel free to send us any bug or idea that you might have to improve this app.	    
	  </p>
	  <FeedbackForm
	    typeOptions = {[
              {
		value: "bug",
		text: "Bug"
              },
              {
		value: "suggestion",
		text: "Feature idea"
              },
              {
		value: "other",
		text: "Something else"
              }
	    ]}
	    feedback_type={fields.feedback_type}
	    onChangeType={(e) => setFields({...fields, feedback_type: e.detail.value})}	
	    message={fields.message}
	    onChangeMessage={(e) => setFields({...fields, message: e.detail.value})}
	    errors = {errors}
	    onSubmit = {onSubmit}
	  
	  />
	</div>
      }
    />
  )
}

export default FeedbackPage;

