import { create } from "zustand";
import type { Patient } from "../entities/Patient.entity";
import { addPatient, deletePatient, getAllPatients, getPatientById, updatePatient } from "../services/patient.service";

type PatientStore = {
  patients: Patient[];
  selectedPatient: Patient | null;
  loading: boolean;

  fetchPatients: () => Promise<void>;
  fetchPatientById: (id: string) => Promise<void>;
  createPatient: (data: Patient) => Promise<void>;
  updatePatient: (id: string, data: Partial<Patient>) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
};

export const usePatientStore = create<PatientStore>((set, get) => ({
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

  updatePatient: async (id, data) => {
    set({ loading: true });

    await updatePatient(id, data);

    // Refetch the selected patient
    const patient = await getPatientById(id);

    set({
      selectedPatient: patient as Patient | null,
      loading: false,
    });
  },

  deletePatient: async (id) => {
    set({ loading: true });

    await deletePatient(id);

    // Remove from patients list
    const { patients } = get();
    const updatedPatients = patients.filter(p => p.id !== id);

    set({
      patients: updatedPatients,
      selectedPatient: null, // Clear selected patient
      loading: false,
    });
  },
}));
