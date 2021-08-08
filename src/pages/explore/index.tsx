import { useState } from 'react';
import { useIonViewWillEnter, IonList, IonItem, IonLabel, IonRouterLink } from '@ionic/react';
import { getPeriods } from '../../services/api';

interface PeriodInterface {
  id: number,
  name: string,
  slug: string
  order: number
}

const Explore: React.FC =  () => {
  
  const [periods, setPeriods] = useState([]);
  
  useIonViewWillEnter(() => {
    getPeriods().then((response: any) => {
      setPeriods(response.data)
    }).catch(() => {})
  })
  
  return (
    <div>Let's learn !
      <IonList>
	{periods.map((period: PeriodInterface) => (
	  <IonRouterLink href={`/page/explore/${period.slug}`}>
	    <IonItem>
	      <IonLabel>{period.name}</IonLabel>
	    </IonItem>
	  </IonRouterLink>
	))}
    </IonList>
    </div>
  )
}

export default Explore;

