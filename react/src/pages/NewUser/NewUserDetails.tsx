import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { axiosUpdateUser,axiosUpdateUserobject } from "../../services/authentication/authentication.axios";

const NewUserDetails = () => {
    const SendDataToDB = (details:any) => {
        axiosUpdateUserobject(details).then((res:any) => {
            console.log(res)
            
        })
    }
  const [details, SetDetails] = useState<any>({
    firstname: "",
    lastname: "",
    age: "",
    address: "",
    place_Of_Work: "",
  });
  const handleSubmit =(event:Event) =>{
      console.log(details.firstname,details.lastname,details.age,details.address,details.place_Of_Work)
    event.preventDefault()
  }
  return (
    <div>
      <form onSubmit={(e:any) => handleSubmit(e)}>
        <p>
          First Name
          <TextField
            value={details.firstname}
            onChange={(e) => SetDetails({...details, firstname: e.target.value })}
          />
          Last Name
          <TextField
            value={details.lastname}
            onChange={(e) => SetDetails({ ...details,lastname: e.target.value })}
          />
        </p>
        <p>
          Age
          <TextField  value={details.age}
            onChange={(e) => SetDetails({ ...details,age: e.target.value })}/>
        </p>
        <p>
          Address
          <TextField  value={details.address}
            onChange={(e) => SetDetails({ ...details,address: e.target.value })} />
        </p>
        <p>
          Place of work
          <TextField  value={details.place_Of_Work}
            onChange={(e) => SetDetails({ ...details,place_Of_Work: e.target.value })}/>
        </p>
        <p>
            {
                console.log(details)
            }
          <Button type="submit" variant="contained" color="primary" onClick={() => SendDataToDB(details)}>
              Submit Details
          </Button>
        </p>
      </form>
    </div>
  );
};

export default NewUserDetails;
