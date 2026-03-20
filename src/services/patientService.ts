import {
  addDoc,
  collection,
  DocumentReference,
  getDocs,
  Timestamp
} from "firebase/firestore";
import type { Patient } from "../entities/Patient.entity";
import { db } from "../firebase/firestore";




export const addPatient = async (data: Patient): Promise<DocumentReference> => {
  try {
    const docRef = await addDoc(collection(db, "patients"), {
      ...data,
      createdAt: Timestamp.now(),
      lastVisit: Timestamp.now(),
    });

    return docRef;
  } catch (error) {
    console.error("Error adding patient:", error);
    throw error;
  }
};


export const getAllPatients = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "patients"));

    const patients = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return patients;
  } catch (error) {
    console.error("Error fetching patients:", error);
    return [];
  }
};
