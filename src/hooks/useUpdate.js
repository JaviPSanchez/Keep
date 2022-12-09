import { useState } from "react";
import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

export const useUpdate = (pickCollection) => {
  const [error, setError] = useState(null);

  const updatedDocument = (id, update) =>
    setDoc(doc(db, pickCollection, id), { status: update }, { merge: true })
      .then(() => {
        console.log("Entire Document has been updated successfully");
      })
      .catch((err) => setError(err.message));

  return { updatedDocument, error };
};
