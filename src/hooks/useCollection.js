import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const useCollection = (pickCollection, _q) => {
  const [documents, setDocuments] = useState([]);

  //Set up query
  const q = useRef(_q).current;

  useEffect(() => {
    let ref = collection(db, pickCollection);

    if (q) {
      ref = query(ref, where(...q));
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.forEach((item) => {
        results.push({ id: item.id, ...item.data() });
      });
      setDocuments(results);
    });

    return () => unsub();
  }, [pickCollection, q]);

  return { documents };
};
