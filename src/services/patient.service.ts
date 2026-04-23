import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  Timestamp,
  updateDoc
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

export const getPatientById = async (id: string) => {
  try {
    const docRef = doc(db, "patients", id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  } catch (error) {
    console.error("Error fetching patient:", error);
    return null;
  }
};

export const updatePatient = async (id: string, data: Partial<Patient>) => {
  try {
    const docRef = doc(db, "patients", id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating patient:", error);
    throw error;
  }
};

export const deletePatient = async (id: string) => {
  try {
    const docRef = doc(db, "patients", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting patient:", error);
    throw error;
  }
};

