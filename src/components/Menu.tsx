import { connect } from 'react-redux';

import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { searchOutline, searchSharp, personOutline, personSharp, bookOutline, bookSharp} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  isPublic: boolean;
}

const appPages: AppPage[] = [
  {
    title: 'Explore',
    url: '/page/explore',
    iosIcon: searchOutline,
    mdIcon: searchSharp,
    isPublic: true
  },
  {
    title: 'Review',
    url: '/page/new_session',
    iosIcon: bookOutline,
    mdIcon: bookSharp,
    isPublic: true
  },  
  {
    title: 'Profile',
    url: '/page/profile',
    iosIcon: personOutline,
    mdIcon: personSharp,
    isPublic: false
  },
];

interface MenuProps {
  currentUser: string
}

const _Menu: React.FC<MenuProps> = ({currentUser}) => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>History App</IonListHeader>
          <IonNote>Learn history, daily.</IonNote>
          {appPages.map((appPage, index) => {
            return ((appPage.isPublic || currentUser != null) ?
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle> : ""
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

const MapStateToProps = (state: any) => ({
  currentUser: state.username
})

export default connect(MapStateToProps)(_Menu);
