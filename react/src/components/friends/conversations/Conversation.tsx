import "./conversation.css";
import icon from "../../../Images/user-icon.jpg";

const Conversation = ({ conversation }: any) => {
  // conversation { members: [id, id ...], id: conversation_Id}

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
