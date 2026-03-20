import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import { create } from "zustand";
import type { Patient } from "../entities/Patient.entity";
import { db } from "../firebase/firestore";


type PatientStore = {
  patients: Patient[];
  loading: boolean;

  fetchPatients: () => Promise<void>;
  createPatient: (data: Patient) => Promise<void>;
};

export const usePatientStore = create<PatientStore>((set) => ({
  patients: [],
  loading: false,

  fetchPatients: async () => {
    set({ loading: true });

    const snapshot = await getDocs(collection(db, "patients"));

    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Patient[];

    set({
      patients: list,
      loading: false,
    });
  },

  createPatient: async (data) => {
    set({ loading: true });

    await addDoc(collection(db, "patients"), {
      ...data,
      createdAt: Timestamp.now(),
    });

    const snapshot = await getDocs(collection(db, "patients"));

    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Patient[];

    set({
      patients: list,
      loading: false,
    });
  },
}));
