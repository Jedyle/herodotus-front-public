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

import { useLocation, useHistory } from 'react-router-dom';
import { searchOutline, searchSharp, personOutline, personSharp, bookOutline, bookSharp, logInOutline, logInSharp, logOutOutline, logOutSharp, informationCircleOutline, informationCircleSharp, helpCircleSharp, helpCircleOutline } from 'ionicons/icons';
import './Menu.css';

import { logout } from 'services/auth';

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
    {
        title: 'About',
        url: '/about',
        iosIcon: informationCircleOutline,
        mdIcon: informationCircleSharp,
        isPublic: true
    },
    {
        title: 'Feedback',
        url: '/feedback',
        iosIcon: helpCircleOutline,
        mdIcon: helpCircleSharp,
        isPublic: true
    },
];

interface MenuProps {
    currentUser: string
}

const Menu: React.FC<MenuProps> = ({ currentUser }) => {
    const location = useLocation();
    const history = useHistory();

    const userIsLoggedIn = !(currentUser === null || currentUser === undefined);

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="inbox-list">
                    <IonListHeader>Herodotus</IonListHeader>
                    <IonNote>Learn history, daily.</IonNote>
                    {appPages.map((appPage, index) => {
                        return ((appPage.isPublic || userIsLoggedIn) ?
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                                    <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                                    <IonLabel>{appPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle> : ""
                        );
                    })}
                    {userIsLoggedIn ?
                        <IonMenuToggle autoHide={false}>
                            <IonItem
                                button lines="none" detail={false}
                                onClick={() => { logout(); history.push("/login"); }}
                            >
                                <IonIcon slot="start" ios={logOutOutline} md={logOutSharp} />
                                <IonLabel>Logout</IonLabel>
                            </IonItem>
                        </IonMenuToggle> :
                        <IonMenuToggle key="login" autoHide={false}>
                            <IonItem className={location.pathname === "/login" ? 'selected' : ''} routerLink="/login" routerDirection="none" lines="none" detail={false}>
                                <IonIcon slot="start" ios={logInOutline} md={logInSharp} />
                                <IonLabel>Login</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    }
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

const MapStateToProps = (state: any) => ({
    currentUser: state.auth.username
})

export default connect(MapStateToProps)(Menu);
