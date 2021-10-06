import CustomButton from "../models/CustomButton";
import CustomModal from "../models/CustomModal";
import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import AddPost from "./AddPost";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import { TextField } from "@material-ui/core";
import { Post } from "../classes/post";
import { Location } from "../classes/location";
import { refreshToken } from "../services/tokens";
const base = "http://localhost:3000";

interface Props {
  addPost: any;
  setRadius:any
}
//TO DO axios
//Add data to array to choose with push
const Options = ({ addPost,setRadius }: Props) => {
  function moveToFeed() {
    window.location.href = base + "/feed";
  }

  const [firstSelectedDate, setFirstSelectedDate] = useState<Date>(
    new Date(Date.now())
  );
  const [secondSelectedDate, setSecondSelectedDate] = useState<Date>(
    new Date(Date.now())
  );
  const firsthandleDateChange = (date: Date | null) => {
    if (date === null) {
      return;
    }
    if (date.getTime() > secondSelectedDate.getTime()) {
      return;
    }
    setFirstSelectedDate(date);
  };
  const secondhandleDateChange = (date: Date | null) => {
    if (date === null) {
      return;
    }
    if (date.getTime() < firstSelectedDate.getTime()) {
      return;
    }
    setSecondSelectedDate(date);
  };
  const [addPostModalOpen, setAddPostModalOpen] = useState(false);

  const closeModal = () => {
    setAddPostModalOpen(false);
    addPost(new Post("1", new Location(34.34, 33.32), "some image"));
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
      <TextField label="Radious from you" onChange={(e:any) => setRadius(e.target.value)} />
      <div>
        {/*show my posts*/}
        <CustomButton text="Feed" onClick={moveToFeed} />
        <CustomButton title="myPostsBtn" text="My Posts" />
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
        <CustomButton text="Friends" />{" "}
      </div>
    </div>
  );
};

export default Options;
