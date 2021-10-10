import React, { useEffect, useState } from "react";
import { getAllErrors, removeError } from "../../services/errors/errors.axios";

const Errors = () => {
  const [errors, setErrors] = useState<any[]>([]);

  useEffect(() => {
    const LoadErrors = async () => {
      const errors = await getAllErrors();
      if (errors) {
        setErrors(errors);
        console.log(errors);
      }
      console.log(errors, "HELLO ERRORS");
    };

    LoadErrors();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Error:</th>
            <th>Time:</th>
          </tr>
        </thead>
        <tbody>
          {errors.map((error) => (
            <tr>
                <td>{error.errorText}</td>
                <td>{error.time}</td>
                <button onClick={() => removeError(error.Error_Id)}>Delete</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Errors;
