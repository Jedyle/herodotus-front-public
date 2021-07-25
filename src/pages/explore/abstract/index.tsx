import { IonList, IonItem, IonLabel } from '@ionic/react';

interface ItemInterface {
  id: number,
  name: string,
  slug: string;
  order: number,
  link: string
}

interface AbstractExplorerInterface {
  elements: Array<ItemInterface>
}

const AbstractExplorer: React.FC<AbstractExplorerInterface> = ({elements}) => {
  return (
    <IonList>
      {elements.map((item: ItemInterface) => (
	<IonItem routerLink={item.link} key={item.order}>
	  <IonLabel>{item.name}</IonLabel>
	</IonItem>
      ))}
    </IonList>
  )
}

export default AbstractExplorer;
