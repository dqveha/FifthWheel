import React from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import axios from "axios";
import { ErrorMessage } from "@hookform/error-message";
import Search from "./pages/Search";
import Update from "./pages/Update";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./utils/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevTools } from "react-query-devtools";

const queryClient = new QueryClient({});

const App = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const [userProfile, setUserProfile] = React.useState(null);

  /**
   * At this point, Bcrypt should be used. But for the sake of the code and project, I'll leave it out.
   * Also, there should be an exchange of a JWT to confirm authentication/authorization for the moment
   * as depicted on line 39.
   * */

  const loginUser = async (username, password) => {
    try {
      const response = await axios({
        url: "http://localhost:6060/api/middleware/authenticate",
        method: "POST",
        headers: {
          // authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        data: { username, password },
      });

      if (response.data.message === "Authenticated") {
        setUserProfile(response.data);
        clearErrors("serverResponse");
        navigate("/search", { replace: true });
      }
    } catch (err) {
      setError("serverResponse");
    }
  };

  const onSubmit = async (data) => {
    const { username, password } = data;
    try {
      await loginUser(username, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!userProfile ? (
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
          <ErrorMessage
            errors={errors}
            name="serverResponse"
            render={() => <p>Incorrect Username and/or Password</p>}
          />
          <button type="submit">LOGIN</button>
        </form>
      ) : (
        <>
          <QueryClientProvider client={queryClient}>
            <UserContext.Provider value={userProfile}>
              <Routes>
                <Route path="/search" element={<Search />} />
                <Route path="/update" element={<Update />} />
              </Routes>
            </UserContext.Provider>
            {/* <ReactQueryDevTools initialIsOpen={true} /> */}
          </QueryClientProvider>
        </>
      )}
    </>
  );
};

export default App;
