import InfoBox from "../../components/InfoBox/InfoBox.tsx";
import {boxesFinoraMenu} from "../../data/BoxesFinoraMenu.ts";

const FinoraMenu = () => {
  return (
    <>
      {boxesFinoraMenu.map((box, index) => (
        <InfoBox
          key={index}
          title={box.title}
          text={box.text}
          speed={box.speed}
          buttons={box.buttons}
        />
      ))}
    </>
  );
};

export default FinoraMenu;