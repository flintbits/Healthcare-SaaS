import type { Patient, PatientStatus } from "../entities/Patient.entity";
import type { Visit } from "../entities/Visit.entity";

export const getPatientStatusStats = (patients: Patient[]) => {
  const map: Record<PatientStatus, number> = {
    Active: 0,
    Inactive: 0,
    Critical: 0,
  };

  patients.forEach((p) => {
    map[p.status] = (map[p.status] || 0) + 1;
  });

  return {
    labels: Object.keys(map),
    values: Object.values(map),
  };
};


export const getMonthlyVisits = (visits: Visit[]) => {
  const map: Record<string, number> = {};

  visits.forEach((v) => {
    const key = `${v.year}-${String(v.month).padStart(2, "0")}`;
    map[key] = (map[key] || 0) + 1;
  });

  return {
    labels: Object.keys(map),
    values: Object.values(map),
  };
};

export const getMonthlyRevenue = (visits: Visit[]) => {
  const map: Record<string, number> = {};

  visits.forEach((v) => {
    const key = `${v.year}-${String(v.month).padStart(2, "0")}`;
    const fee = Number(v.fee ?? 0);
    map[key] = (map[key] || 0) + fee;
  });

  return {
    labels: Object.keys(map),
    values: Object.values(map),
  };
};
