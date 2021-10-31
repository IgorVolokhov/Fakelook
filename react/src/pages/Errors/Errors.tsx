import React, { useEffect, useState } from "react";
import { getAllErrors, removeError } from "../../services/errors/errors.axios";
import "./Errors.css";

const Errors = () => {
  const [errors, setErrors] = useState<any[]>([]);

  const LoadErrors = async () => {
    const errors = await getAllErrors();

    if (errors) {
      console.log(errors, "ALL ERRORS!");
      setErrors(errors);
    }
  };

  const deleteError = async (errorId: number) => {
    await removeError(errorId);
    LoadErrors();
  }

  useEffect(() => {
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
              <td>{error.Info.originalError.message}</td>
              <td>{error.Time}</td>
              <td>
                <button onClick={() => deleteError(error.Error_Id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Errors;
