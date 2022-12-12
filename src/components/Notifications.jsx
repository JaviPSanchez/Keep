import "./notifications.scss";
//Custom Hooks
import { useCollection } from "../hooks/useCollection";

const Notifs = (props) => {
  const { documents: notificaciones } = useCollection("notifications");
  return (
    <div className="container">
      {notificaciones.map((item) => item.content)}
    </div>
  );
};

export default Notifs;
