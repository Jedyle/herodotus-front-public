import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIonViewWillEnter } from '@ionic/react';
import { getCategories } from '../../../services/api';
import AbstractExplorer from '../abstract';

const ExploreCategories: React.FC =  () => {

  const obj: {periodSlug: string} = useParams();
  const periodSlug = obj['periodSlug'];
  const [ categories, setCategories ] = useState([]);
  
  useIonViewWillEnter(() => {
    getCategories(periodSlug).then((response: any) => {
      setCategories(response.data.map(
	(category: any) => ({...category, 'link': `/page/explore/periods/${periodSlug}/categories/${category.slug}/lessons`})
      ))
    })
  })
  
  return (
    <AbstractExplorer
    elements={categories}
    />
  )
}

export default ExploreCategories;

