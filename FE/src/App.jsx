import React from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import axios from "axios";
import { ErrorMessage } from "@hookform/error-message";
import Search from "./pages/Search";
import Update from "./pages/Update";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./utils/UserContext";
import { useMutation } from "react-query";
import { Box } from "@mui/material";

const loginUser = async (data) => {
  const response = await axios({
    url: "http://localhost:6060/api/middleware/authenticate",
    method: "POST",
    headers: {
      // authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    data: data,
  });

  return response.data;
};

const App = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const [userProfile, setUserProfile] = React.useState(null);
  const [error, setError] = React.useState(false);

  const { mutate } = useMutation(loginUser, {
    onSuccess: (data) => {
      setUserProfile(data);
      clearErrors("serverResponse");
      navigate("/search");
    },
    onError: () => {
      setError(true);
    },
  });

  /**
   * Bcrypt should be used during registration/login with database along with an exchange of JWTs. But for the sake of the code and project, I'll leave it out.
   * */

  const onSubmit = async (data) => {
    const { username, password } = data;
    mutate({ username, password });
  };

  return (
    <>
      {!userProfile ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
            />
            <input
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            <ErrorMessage
              errors={errors}
              name="username"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type} className="error">
                    {message}
                  </p>
                ))
              }
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type} className="error">
                    {message}
                  </p>
                ))
              }
            />
            {error && (
              <p className="error">Incorrect Username and/or Password</p>
            )}

            <button type="submit">LOGIN</button>
          </form>
        </Box>
      ) : (
        <>
          <UserContext.Provider value={userProfile}>
            <Routes>
              <Route path="/search" element={<Search />} />
              <Route path="/update" element={<Update />} />
            </Routes>
          </UserContext.Provider>
        </>
      )}
    </>
  );
};

export default App;
