import { useState } from 'react';
import { useIonViewWillEnter } from '@ionic/react';
import { getAboutPage } from 'services/api';
import Page from 'pages/Page';

const AboutPage: React.FC = () => {

    const [article, setArticle] = useState<any>({});

    useIonViewWillEnter(() => {
        getAboutPage().then((response: any) => {
            setArticle(response.data)
        }).catch(() => { })

    })

    return (
        <Page
            key={"about"}
            name={"About"}
            content={
                <div style={{ margin: "20px" }}>
                    <h1>About this app</h1>
                    <div dangerouslySetInnerHTML={{ __html: article.article }} ></div>
                </div>
            }
        />
    )
}

export default AboutPage;
