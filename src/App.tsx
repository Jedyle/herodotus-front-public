import { useEffect } from 'react';
import { Provider, connect } from 'react-redux';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import Menu from 'components/Menu';
import Page from 'pages/Page';
import LoginPage from 'pages/login';
import AboutPage from 'pages/about';
import RegistrationPage from 'pages/register';
import { getAuthData } from 'services/auth';
import { store, LOGIN } from 'services/authStore';
import ExplorePeriods from 'pages/explore/periods';
import ExploreCategories from 'pages/explore/categories';
import ExploreLessons from 'pages/explore/lessons';
import LessonDisplay from 'pages/explore/lessonDisplay';
import Profile from 'pages/profile';
import ReviewLesson from 'pages/review/lesson';
import ValidatedLessons from 'pages/explore/validatedLessons';
import ReviewNewSession from 'pages/review/newSession';


import PrivateRoute from 'components/PrivateRoute';

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


interface AppRouterInterface {
  currentUser: string
}

const _AppRouter: React.FC<AppRouterInterface> = ({currentUser}) => {
  return (
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
	    <Route path="/about" exact={true}>
	      <AboutPage />
	    </Route>
            <Route path="/" exact={true}>
              <Redirect to="/page/explore" />	      
            </Route>
	    <Route path="/login" exact={true}>
	      <LoginPage />
	    </Route>
	    <Route path="/register" exact={true}>
	      <RegistrationPage />
	    </Route>	    
            <PrivateRoute path="/page/explore" exact={true}>
	      <Page name="Browse Lessons" content={<ExplorePeriods/>}/>
	    </PrivateRoute>
            <PrivateRoute path="/page/my-lessons" exact={true}>
	      <ValidatedLessons />
	    </PrivateRoute>
            <PrivateRoute
	      path="/page/explore/periods/:periodSlug/categories"
	      exact={true}
	      render={(props) => (
		<ExploreCategories key={props.match.url}/>	      	
	      )}
	    />
            <PrivateRoute
	      path="/page/explore/periods/:periodSlug/categories/:categorySlug/lessons"
	      exact={true}
	      render={(props) => (
		<ExploreLessons key={props.match.url}/>	      	
	      )}
	    />	   
            <PrivateRoute
	      path="/page/explore/lessons/:lessonSlug" exact={true}
	      render={(props) => (
		<LessonDisplay key={props.match.url}/>
	      )}
	    />
	    <PrivateRoute path="/page/new_session" exact={true}>
	      <ReviewNewSession />
	    </PrivateRoute>
            <PrivateRoute
	      path="/page/explore/lessons/:lessonSlug/questions"
	      exact={true}
	      render={(props) => (
		<ReviewLesson key={props.match.url}/>
	      )}
	    />
	    <PrivateRoute path="/page/profile" exact={true}>
	      {currentUser !== null ?
	       <Page name="Profile" content={<Profile/>}/> :
	       <Redirect to="/login" />
	      }	      
             </PrivateRoute>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>    
  )
}

const AppRouterMapState = (state: any) => ({
  currentUser: state.username 
});

const AppRouter = connect(AppRouterMapState)(_AppRouter)

const App: React.FC = () => {

  // init auth store with capacitor storage when the app is launched
  useEffect(() => {
    getAuthData().then((value) => {
      if (value){
	store.dispatch({
	  type: LOGIN,
	  token: value.token,
	  username: value.username
	})
      }
    })
  });
  
  return (
    <Provider store={store}>
      <IonApp>
	<AppRouter />
      </IonApp>      
    </Provider>
  );
};

export default App;
