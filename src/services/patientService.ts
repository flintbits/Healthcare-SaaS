import {
  addDoc,
  collection,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/firestore";

export const addPatient = async (data: {
  name: string;
  age: number;
  gender: string;
  status: string;
  doctor: string;
}) => {
  await addDoc(collection(db, "patients"), {
    ...data,
    lastVisit: Timestamp.now(),
    createdAt: Timestamp.now(),
  });
};
