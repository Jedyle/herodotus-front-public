import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useIonViewDidEnter, IonButton, IonGrid, IonCol, IonRow } from '@ionic/react';
import { LessonInterface, SlideInterface } from 'interfaces/lessons';
import { dice } from 'ionicons/icons';

interface LessonDisplayProps {
  lesson: LessonInterface
}

const slideOpts = {
  initialSlide: 0,
  speed: 400
};

const LessonDisplay: React.FC<LessonDisplayProps> = ({lesson}) => {
  const location = useLocation();

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const isBeginning = () => (currentSlide === 0);
  const isEnd = () => (currentSlide === lesson.slides.length - 1);
  
  const slidePrev = () => {
    if (!isBeginning()){
      setCurrentSlide(currentSlide - 1);
    }
  }

  const slideNext = () => {
    if (!isEnd()){
      setCurrentSlide(currentSlide + 1);
    }
  }  

  return (
    <div style={{height: "100%", display: "flex", flexDirection: "column", marginLeft: "10px", marginRight: "10px"}}>
      <div style={{flexGrow: 1, height: "100%", overflow: "scroll"}} dangerouslySetInnerHTML={{__html: lesson.slides[currentSlide].content}}></div>
      <IonGrid>
	<IonRow>
	  <IonCol size="6">
	    <IonButton expand="block"
		       disabled={isBeginning()}
		       onClick={slidePrev}
		       color="light">{"<"} Prev</IonButton>	    
	  </IonCol>
	  <IonCol size="6">
	    {isEnd() ?
	     <IonButton
	       color="success"
	       routerLink={`${location.pathname}/questions`}
	     >Review !</IonButton>   :
	     <IonButton expand="block"
			onClick={slideNext}
			color="primary">Next {">"}</IonButton>
	    
	    }
	  </IonCol>	  
	</IonRow>	
      </IonGrid>
    </div>
  )
}

export default LessonDisplay;


/*

*/
