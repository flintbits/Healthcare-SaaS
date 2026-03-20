import {
  addDoc,
  collection,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../firebase/firestore";

type AddPatientPayload = {
  name: string;
  age: number;
  gender: string;
  status: string;
  doctor: string;
};

export const addPatient = async (
  payload: AddPatientPayload
) => {
  await addDoc(collection(db, "patients"), {
    ...payload,
    createdAt: Timestamp.now(),
    lastVisit: Timestamp.now(),
  });
};
