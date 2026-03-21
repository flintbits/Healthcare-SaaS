import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where
} from "firebase/firestore";
import type { Visit } from "../entities/Visit.entity";
import { db } from "../firebase/firestore";


type AddVisitPayload = {
  patientId: string;
  patientName: string;
  doctor: string;
  fee: number;
};


export const addVisit = async (payload: AddVisitPayload) => {
  const now = new Date();

  await addDoc(collection(db, "visits"), {
    ...payload,
    visitDate: Timestamp.now(),
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    createdAt: Timestamp.now(),
  });

  await updateDoc(doc(db, "patients", payload.patientId), {
    lastVisit: Timestamp.now(),
  });
};

export const getVisitsByPatientId = async (patientId: string) => {
  try {
    const q = query(
      collection(db, "visits"),
      where("patientId", "==", patientId)
    );

    const snapshot = await getDocs(q);

    const visits = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return visits;
  } catch (error) {
    console.error("Error fetching visits:", error);
    return [];
  }
};

export const getVisits = async () => {
  try {
    const q = query(collection(db, "visits"));

    const snapshot = await getDocs(q);

    const visits: Visit[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Visit, "id">),
    }))

    return visits
  } catch (error) {
    console.error("Error fetching visits:", error);
    return [];
  }
};
