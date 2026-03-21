import { create } from "zustand";
import type { Visit } from "../entities/Visit.entity";
import { addVisit, getVisits, getVisitsByPatientId } from "../services/visit.service";



type VisitStore = {
  visits: Visit[];
  loading: boolean;

  fetchVisitsByPatientId: (patientId: string) => Promise<void>;
  createVisit: (data: Omit<Visit, "id">) => Promise<void>;
  fetchVisits: () => Promise<void>
};

export const useVisitStore = create<VisitStore>((set) => ({
  visits: [],
  loading: false,

  fetchVisitsByPatientId: async (patientId) => {
    set({ loading: true });

    const list = await getVisitsByPatientId(patientId);

    set({
      visits: list as Visit[],
      loading: false,
    });
  },

  fetchVisits: async () => {
    try {
      set({ loading: true })
      const list = await getVisits()
      set({
        visits: list,
        loading: false,
      })
    } catch (e) {
      console.error(e)
      set({
        loading: false,
      })
    }
  },

  createVisit: async (data) => {
    set({ loading: true });

    await addVisit(data);

    const list = await getVisitsByPatientId(data.patientId);

    set({
      visits: list as Visit[],
      loading: false,
    });
  },
}));
