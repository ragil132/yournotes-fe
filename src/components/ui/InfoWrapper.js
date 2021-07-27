/* eslint-disable react/prop-types */
import React from "react";
import Message from "./Message";

const InfoWrapper = (props) => {
  const { status } = props;
  if (status !== null) {
    if (status === false) {
      return <Message type="error" text="Title harus diisi" />;
    }
    return <Message type="success" text="Data berhasil disimpan" />;
  }
  return <></>;
};

export default InfoWrapper;
