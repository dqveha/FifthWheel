import * as React from "react";
import { Link } from "react-router-dom";
import Form from "../components/Form";

export default function Update() {
  return (
    <>
      <h1>Update Automobile</h1>
      <Form formType={"update"} />
    </>
  );
}
