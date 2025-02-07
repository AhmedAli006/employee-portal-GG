import React from "react";
import { CircularProgress } from "@mui/material";

const LoaderComponent = ({ loading }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backdropFilter:"blur(3px)",
        width:"100vw",
        height:"100vh",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex:999
      }}
    >
      <CircularProgress color="primary" />
    </div>
  );
};

export default LoaderComponent;
