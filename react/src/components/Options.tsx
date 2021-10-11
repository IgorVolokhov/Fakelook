import CustomButton from "../models/CustomButton";
import CustomModal from "../models/CustomModal";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import AddPost from "./AddPost";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import { TextField } from "@material-ui/core";
import { Post } from "../classes/post";
import { Location } from "../classes/location";
import { refreshToken } from "../services/tokens";
const base = "https://localhost:3000";

interface Props {
  setRadius: any;
  setDates: any;
}

//Add data to array to choose with push
const Options = ({ setRadius, setDates }: Props) => {
  function moveToFeed() {
    window.location.href = base + "/feed";
  }
  function moveToFriends() {
    window.location.href = base + "/friends";
  }

  function moveToMyPosts() {
    window.location.href = base + "/myposts";
  }

  const [firstSelectedDate, setFirstSelectedDate] = useState<Date>(
    new Date(Date.now())
  );
  const [secondSelectedDate, setSecondSelectedDate] = useState<Date>(
    new Date(Date.now())
  );

  const firsthandleDateChange = async (date: Date | null) => {
    if (date === null) {
      return;
    }
    if (date.getTime() > secondSelectedDate.getTime()) {
      return;
    }
    await setFirstSelectedDate(date);
    setDates({ minDate: firstSelectedDate, maxDate: secondSelectedDate });
  };
  const secondhandleDateChange = async (date: Date | null) => {
    if (date === null) {
      return;
    }
    if (date.getTime() < firstSelectedDate.getTime()) {
      return;
    }
    await setSecondSelectedDate(date);
    setDates({ minDate: firstSelectedDate, maxDate: secondSelectedDate });
  };
  const [addPostModalOpen, setAddPostModalOpen] = useState(false);

  const closeModal = () => {
    setAddPostModalOpen(false);
  };
  const openModal = () => {
    setAddPostModalOpen(true);
  };

  return (
    <div>
      Options: my friends(button) manage posts (button) filter (options to
      filter)
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justifyContent="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="From"
            value={firstSelectedDate}
            onChange={firsthandleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="To"
            value={secondSelectedDate}
            onChange={secondhandleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      {/*add selection from meter to km */}
      <TextField
        label="Radious from you"
        onChange={(e: any) => setRadius(e.target.value)}
      />
      <div>
        {/*show my posts*/}
        <CustomButton text="Feed" onClick={moveToFeed} />
        <CustomButton
          title="myPostsBtn"
          text="My Posts"
          onClick={moveToMyPosts}
        />
        {/*add post */}
        <CustomButton
          title="addPostBtn"
          text="Add Post"
          onClick={() => {
            addPostModalOpen ? closeModal() : openModal();
          }}
        />
        {addPostModalOpen && (
          <CustomModal
            modalOpen={addPostModalOpen}
            handleClose={() => closeModal()}
            text={<AddPost closeModal={() => closeModal()}></AddPost>}
          />
        )}
        {/*manage friends and blocked users */}
        <CustomButton text="Friends" onClick={() => moveToFriends()} />{" "}
      </div>
    </div>
  );
};

export default Options;
