import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIonViewWillEnter, IonText } from '@ionic/react';
import { getPeriods } from 'services/api';
import AbstractExplorer from 'pages/explore/abstract';

const ExplorePeriods: React.FC =  () => {

  const [periods, setPeriods] = useState([]);
  
  useIonViewWillEnter(() => {
    getPeriods().then((response: any) => {
      setPeriods(response.data.map(
	(period: any) => ({...period, 'link': `/page/explore/periods/${period.slug}/categories`})
      ));
    }).catch(() => {})
  })
  
  return (
    <>
      <AbstractExplorer
	elements={periods}
      />
      <br/>
      <div className="ion-text-center">
	<IonText>
	  <small>This app is currently in beta : any <Link to="/feedback">feedback</Link> is highly appreciated !</small>	
	</IonText>
      </div>
    </>
  )
}

export default ExplorePeriods;

