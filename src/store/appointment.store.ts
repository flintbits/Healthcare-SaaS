import { create } from "zustand";
import type { Appointment } from "../entities/Appointment.entity";
import {
  addAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByPatientId,
  updateAppointment
} from "../services/appointment.service";

type AppointmentStore = {
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  loading: boolean;

  fetchAppointments: () => Promise<void>;
  fetchAppointmentById: (id: string) => Promise<void>;
  fetchAppointmentsByPatientId: (patientId: string) => Promise<void>;
  createAppointment: (data: Appointment) => Promise<void>;
  updateAppointment: (id: string, data: Partial<Appointment>) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
};

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  appointments: [],
  selectedAppointment: null,
  loading: false,

  fetchAppointments: async () => {
    set({ loading: true });

    const list = await getAllAppointments();

    set({
      appointments: list as Appointment[],
      loading: false,
    });
  },

  fetchAppointmentById: async (id) => {
    set({ loading: true });

    const appointment = await getAppointmentById(id);

    set({
      selectedAppointment: appointment as Appointment | null,
      loading: false,
    });
  },

  fetchAppointmentsByPatientId: async (patientId) => {
    set({ loading: true });

    const list = await getAppointmentsByPatientId(patientId);

    set({
      appointments: list as Appointment[],
      loading: false,
    });
  },

  createAppointment: async (data) => {
    set({ loading: true });

    await addAppointment(data);

    const list = await getAllAppointments();

    set({
      appointments: list as Appointment[],
      loading: false,
    });
  },

  updateAppointment: async (id, data) => {
    set({ loading: true });

    await updateAppointment(id, data);

    // Refetch the selected appointment if it's the one being updated
    const { selectedAppointment } = get();
    if (selectedAppointment?.id === id) {
      const appointment = await getAppointmentById(id);
      set({ selectedAppointment: appointment as Appointment | null });
    }

    set({ loading: false });
  },

  deleteAppointment: async (id) => {
    set({ loading: true });

    await deleteAppointment(id);

    // Remove from appointments list
    const { appointments } = get();
    const updatedAppointments = appointments.filter(a => a.id !== id);

    set({
      appointments: updatedAppointments,
      selectedAppointment: null, // Clear selected if deleted
      loading: false,
    });
  },
}));
