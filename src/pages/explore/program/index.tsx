import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIonViewWillEnter, IonList, IonItem, IonLabel, IonIcon, IonText } from '@ionic/react';
import { checkmarkOutline, checkmarkSharp } from 'ionicons/icons';
import { getPrograms } from 'services/api';
import { displayProgramLink } from 'services/links';

import { ProgramInterface } from 'interfaces/lessons';

interface ProgramsExplorerProps {
    programs: Array<ProgramInterface> | null
}

const userEnrolledToProgram = (program: ProgramInterface) => (program.user_program !== null);

const ProgramsExplorer: React.FC<ProgramsExplorerProps> = ({ programs }) => {
    return programs && (
        <IonList>
            {programs.map((program: ProgramInterface) => (
                <IonItem
                    routerLink={displayProgramLink(program.slug)}
                    /* putting user_program in the key forces it to be refreshed when aer logs out */
                    key={program.slug + program.user_program}>
                    <IonIcon
                        slot="start"
                        ios={userEnrolledToProgram(program) ? checkmarkOutline : null}
                        md={userEnrolledToProgram(program) ? checkmarkSharp : null}
                    />
                    <IonLabel>{program.name}</IonLabel>
                </IonItem>
            ))}
        </IonList>
    )
}

const ExplorePrograms: React.FC = () => {

    const [programs, setPrograms] = useState([]);

    useIonViewWillEnter(() => {
        getPrograms().then((response: any) => {
            setPrograms(response.data);
        }).catch(() => { })
    })

    return (
        <>
            <ProgramsExplorer
                programs={programs}
            />
            <br />
            <div className="ion-text-center">
                <IonText>
                    <small>This app is currently in beta : any <Link to="/feedback">feedback</Link> is highly appreciated !</small>
                </IonText>
            </div>
        </>
    )
}

export default ExplorePrograms;

