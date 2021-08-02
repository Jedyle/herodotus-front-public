import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIonViewWillEnter } from '@ionic/react';
import { getCategories, retrievePeriod } from '../../../services/api';
import AbstractExplorer from '../abstract';

import Page from '../../Page';

const ExploreCategories: React.FC =  () => {

  const obj: {periodSlug: string} = useParams();
  const periodSlug = obj['periodSlug'];
  const [ categories, setCategories ] = useState([]);
  const [ period, setPeriod ] = useState<any>({name: ""});
  
  useIonViewWillEnter(() => {
    getCategories(periodSlug).then((response: any) => {
      setCategories(response.data.map(
	(category: any) => ({...category, 'link': `/page/explore/periods/${periodSlug}/categories/${category.slug}/lessons`})
      ))
    })
    retrievePeriod(periodSlug).then((response: any) => {
      setPeriod(response.data);
    })
  })
  
  return (
    <Page
      name={period.name}
      content={	<AbstractExplorer elements={categories} />}
    />
  )
}

export default ExploreCategories;

