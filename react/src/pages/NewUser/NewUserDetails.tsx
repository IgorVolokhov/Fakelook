import { Button, TextField } from "@material-ui/core";
import { FieldAttributes, Form, Formik, useField } from "formik";
import schema from "../../validations/NewUser.validations";
import React, { useState } from "react";
import {
  axiosUpdateUser,
  axiosUpdateUserobject,
} from "../../services/authentication/authentication.axios";

const MyTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  type = "text",
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <>
      <TextField
        placeholder={placeholder}
        {...field}
        helperText={errorText}
        error={!!errorText}
        type={type}
      />
      <br />
    </>
  );
};

const NewUserDetails = () => {
  const SendDataToDB = (details: any) => {
    axiosUpdateUserobject(details).then((res: any) => {
      console.log(res);
      window.location.href = "/menu";
    });
  };
  const [details, SetDetails] = useState<any>({
    firstname: "",
    lastname: "",
    age: "",
    address: "",
    place_Of_Work: "",
  });
  const handleSubmit = (event: Event) => {
    console.log(
      details.firstname,
      details.lastname,
      details.age,
      details.address,
      details.place_Of_Work
    );
    event.preventDefault();
  };
  return (
    <div>
      <Formik
        validateOnChange={true}
        initialValues={{
          firstname: "",
          lastname: "",
          age: "",
          address: "",
          place_Of_Work: "",
        }}
        validationSchema={schema}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form onSubmit={(e: any) => handleSubmit(e)}>
            <p>
              First Name:{" "}
              <TextField
              name="firstname"
                value={details.firstname}
                onChange={(e) =>
                  SetDetails({ ...details, firstname: e.target.value })
                }
              />
              Last Name:{" "}
              <TextField
              name="lastname"
                value={details.lastname}
                onChange={(e) =>
                  SetDetails({ ...details, lastname: e.target.value })
                }
              />
            </p>
            <p>
              Age: Age
              <TextField
              name="age"
                value={details.age}
                onChange={(e) =>
                  SetDetails({ ...details, age: e.target.value })
                }
              />
            </p>
            <p>
              Address: Address
              <TextField
              name="address"
                value={details.address}
                onChange={(e) =>
                  SetDetails({ ...details, address: e.target.value })
                }
              />
            </p>
            <p>
              Place of work: Place of work
              <TextField
              name="place_Of_Work"
                value={details.place_Of_Work}
                onChange={(e) =>
                  SetDetails({ ...details, place_Of_Work: e.target.value })
                }
              />
            </p>
            <p>
              {console.log(details)}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => {
                  SendDataToDB(details);
                  window.location.href = "/menu";
                }}
              >
                Submit Details
              </Button>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewUserDetails;
