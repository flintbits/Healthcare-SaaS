import { create } from "zustand";
import type { Patient } from "../entities/Patient.entity";
import { addPatient, getAllPatients, getPatientById } from "../services/patient.service";

type PatientStore = {
  patients: Patient[];
  selectedPatient: Patient | null;
  loading: boolean;

  fetchPatients: () => Promise<void>;
  fetchPatientById: (id: string) => Promise<void>;
  createPatient: (data: Patient) => Promise<void>;
};

export const usePatientStore = create<PatientStore>((set) => ({
  patients: [],
  selectedPatient: null,
  loading: false,

  fetchPatients: async () => {
    set({ loading: true });

    const list = await getAllPatients();

    set({
      patients: list as Patient[],
      loading: false,
    });
  },

  fetchPatientById: async (id) => {
    set({ loading: true });

    const patient = await getPatientById(id);

    set({
      selectedPatient: patient as Patient | null,
      loading: false,
    });
  },

  createPatient: async (data) => {
    set({ loading: true });

    await addPatient(data);

    const list = await getAllPatients();

    set({
      patients: list as Patient[],
      loading: false,
    });
  },
}));
