import "./message.css";
import icon from "../../../Images/user-icon.jpg";

const randomText = "some random text i do not know what to put here bla bla";
export default function Message({ message = randomText, own = false }: any) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="message-top">
        <img className="message-img" src={icon} alt="" />
        <p className="message-text">{message.text}</p>
      </div>
      <div className="message-bottom">{message.createdAt}</div>
    </div>
  );
}
