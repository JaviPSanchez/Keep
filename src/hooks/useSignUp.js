import { useState } from "react";
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = (data) => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = (email, password) => {
    setError(null);

    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        // console.log(response.user);
        setDoc(doc(db, "users", response.user.uid), {
          ...data,
          uid: response.user.uid,
          timeStamp: serverTimestamp(),
        });
        dispatch({ type: "LOGIN", payload: response.user });
      })
      .catch((err) => setError(err.message));
  };

  return { error, signup };
};
