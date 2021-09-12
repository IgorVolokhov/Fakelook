import CustomButton from "../models/CustomButton";

interface Props {
  addPost: any;
}

const Options = ({ addPost }: Props) => {
  return (
    <div>
      Options: my friends(button) manage posts (button) filter (options to
      filter)
      <div>
        {/*show my posts*/}
        <CustomButton text="My Posts" />
        {/*add post */}
        <CustomButton
          text="Add Post"
          onClick={() => {
            addPost();
          }}
        />
        {/*manage friends and blocked users */}
        <CustomButton text="Friends" />
      </div>
    </div>
  );
};

export default Options;
