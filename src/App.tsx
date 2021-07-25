import { IonApp, IonRouterOutlet, IonSplitPane, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import ExplorePeriods from './pages/explore/periods';
import ExploreCategories from './pages/explore/categories';
import ExploreLessons from './pages/explore/lessons';
import LessonDisplay from './pages/explore/lessonDisplay';
import Profile from './pages/profile';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/page/explore" />
            </Route>
            <Route path="/page/explore" exact={true}>
	      <Page name="Periods" content={<ExplorePeriods/>}/>
            </Route>
            <Route path="/page/explore/periods/:periodSlug/categories" exact={true}>
	      <Page name="Categories" content={<ExploreCategories/>} />	      
	    </Route>
            <Route path="/page/explore/periods/:periodSlug/categories/:categorySlug/lessons" exact={true}>
	      <Page name="Lessons" content={<ExploreLessons/>} />	      
	    </Route>
            <Route path="/page/explore/periods/:periodSlug/categories/:categorySlug/lessons/:lessonSlug" exact={true}>
	      <Page name="Lesson" content={<LessonDisplay/>} />	      
	    </Route>	    	    
            <Route path="/page/profile" exact={true}>
	      <Page name="Profile" content={<Profile/>}/>
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
