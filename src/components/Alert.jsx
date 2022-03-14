import React, { useEffect } from "react";

const Alert = ({ alert, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  const { mssg, status } = alert;

  return <h1 className={`alert alert-${status}`}>{mssg} </h1>;
};

export default Alert;
