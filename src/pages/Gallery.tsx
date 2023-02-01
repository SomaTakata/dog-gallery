import {
  IonCard,
  IonCol,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from "@ionic/react";
import { useEffect, useState } from "react";
import "./Gallery";

const Gallery: React.FC = () => {
  const [data, setData] = useState([]);
  const [breed, setBreed] = useState("chihuahua");
  useEffect(() => {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/8`)
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, [breed]);
  console.log(data);
  console.log(breed);

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      fetch(`https://dog.ceo/api/breed/${breed}/images/random/8`)
        .then((res) => res.json())
        .then((data) => setData(data.message));
      event.detail.complete();
    }, 2000);
  }

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle className="ion-text-center ">Dog Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true} className="ion-padding">
        <IonSelect
          placeholder="Select breed"
          onIonChange={(e) => setBreed(e.detail.value)}
        >
          <IonSelectOption value="chihuahua">チワワ</IonSelectOption>
          <IonSelectOption value="poodle">プードル</IonSelectOption>
          <IonSelectOption value="hound">猟犬</IonSelectOption>
          <IonSelectOption value="mix">混合犬</IonSelectOption>
          <IonSelectOption value="samoyed">サモエド</IonSelectOption>
          <IonSelectOption value="husky">オオカミ犬</IonSelectOption>
          <IonSelectOption value="waterdog">ウォータードッグ</IonSelectOption>
        </IonSelect>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {data.map((url: any) => {
          return (
            <IonRow key={url}>
              <IonCol>
                <IonCard>
                  <IonImg src={url}></IonImg>
                </IonCard>
              </IonCol>
            </IonRow>
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default Gallery;
