import { useState } from 'react';
import { useIonViewWillEnter } from '@ionic/react';
import { getPeriods } from '../../../services/api';
import AbstractExplorer from '../abstract';

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
    <AbstractExplorer
      elements={periods}
    />
  )
}

export default ExplorePeriods;

