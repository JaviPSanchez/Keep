import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogIn = () => {
  const [error, setError] = useState(null);
  const navitage = useNavigate();
  const { dispatch } = useAuthContext();

  const login = (email, password) => {
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        dispatch({ type: "LOGIN", payload: response.user });
        // console.log(response.user);
        navitage("/");
      })
      .catch((err) => setError(err.message));
  };
  return { error, login };
};
