import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIonViewWillEnter, IonText } from '@ionic/react';
import { getPrograms } from 'services/api';
import { displayProgramLink } from 'services/links';
import AbstractExplorer from 'pages/explore/abstract';

const ExplorePrograms: React.FC =  () => {

  const [programs, setPrograms] = useState([]);
  
  useIonViewWillEnter(() => {
    getPrograms().then((response: any) => {
      setPrograms(response.data.map(
	(program: any) => ({...program, 'link': displayProgramLink(program.slug)})
      ));
    }).catch(() => {})
  })
  
  return (
    <>
      <AbstractExplorer
	elements={programs}
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

export default ExplorePrograms;

