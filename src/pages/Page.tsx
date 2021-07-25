import { IonButtons, IonContent, IonHeader, IonMenuButton, IonBackButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

interface PageInterface {
  content: React.ReactNode,
  name: string
}

const Page: React.FC<PageInterface> = ({name, content}) => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
	  <IonButtons slot="end">
	    <IonBackButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>            
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
	{content}
      </IonContent>
    </IonPage>
  );
};

export default Page;
