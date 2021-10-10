import "./conversation.css";
import icon from "../../../Images/user-icon.jpg";

const Conversation = ({ conversation }: any) => {
  // conversation { members: [id, id ...], id: conversation_Id}
  console.log("this is in conversation :", conversation);

  return (
    <>
      <div className="conversation">
        <img className="conversation-img" src={icon} />
        <span className="conversation-name">
          {conversation.Firstname}, {conversation.Lastname}
        </span>
      </div>
    </>
  );
};

export default Conversation;
