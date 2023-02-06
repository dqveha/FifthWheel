import * as React from "react";
import { Link } from "react-router-dom";
import Form from "../components/Form";

export default function Search() {
  return (
    <>
      <h1>Search</h1>
      <Form formType={"search"} />
    </>
  );
}
