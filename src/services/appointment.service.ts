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
import type { Appointment } from "../entities/Appointment.entity";
import { db } from "../firebase/firestore";

export const addAppointment = async (data: Appointment): Promise<DocumentReference> => {
  try {
    const docRef = await addDoc(collection(db, "appointments"), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return docRef;
  } catch (error) {
    console.error("Error adding appointment:", error);
    throw error;
  }
};

export const getAllAppointments = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "appointments"));

    const appointments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return appointments;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};

export const getAppointmentById = async (id: string) => {
  try {
    const docRef = doc(db, "appointments", id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return null;
  }
};

export const getAppointmentsByPatientId = async (patientId: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, "appointments"));
    const appointments = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }) as Appointment)
      .filter((appointment) => appointment.patientId === patientId);

    return appointments;
  } catch (error) {
    console.error("Error fetching appointments by patient:", error);
    return [];
  }
};

export const updateAppointment = async (id: string, data: Partial<Appointment>) => {
  try {
    const docRef = doc(db, "appointments", id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw error;
  }
};

export const deleteAppointment = async (id: string) => {
  try {
    const docRef = doc(db, "appointments", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw error;
  }
};
