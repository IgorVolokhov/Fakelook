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

interface Props {
  addPost: any;
}
//TO DO axios
//Add data to array to choose with push
const Options = ({ addPost }: Props) => {
  const [firstSelectedDate, setFirstSelectedDate] = useState<Date | null>(
    new Date(Date.now())
  );
  const [secondSelectedDate, setSecondSelectedDate] = useState<Date | null>(
    new Date(Date.now())
  );
  const firsthandleDateChange = (date: Date | null) => {
    setFirstSelectedDate(date);
  };
  const secondhandleDateChange = (date: Date | null) => {
    setSecondSelectedDate(date);
  };
  const [addPostModalOpen, setAddPostModalOpen] = useState(false);
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
      <TextField label="Radious from you" />
      <div>
        {/*show my posts*/}
        <CustomButton text="My Posts" />
        {/*add post */}
        <CustomButton
          text="Add Post"
          onClick={() => {
            addPostModalOpen
              ? setAddPostModalOpen(false)
              : setAddPostModalOpen(true);
          }}
        />
        {addPostModalOpen && (
          <CustomModal
            modalOpen={addPostModalOpen}
            handleClose={() => setAddPostModalOpen(false)}
            text={<AddPost id="1"></AddPost>}
          />
        )}
        {/*manage friends and blocked users */}
        <CustomButton text="Friends" />
      </div>
    </div>
  );
};

export default Options;
