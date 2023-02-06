import * as React from "react";
import { Link } from "react-router-dom";
import Form from "../components/Form";

export default function Update() {
  return (
    <>
      <h1>Update</h1>
      <Form formType={"update"} />
    </>
  );
}
