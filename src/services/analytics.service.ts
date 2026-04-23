import type { Appointment } from "../entities/Appointment.entity";
import type { Patient, PatientStatus } from "../entities/Patient.entity";
import type { Visit } from "../entities/Visit.entity";

export const getPatientStatusStats = (patients: Patient[]) => {
  const map: Record<PatientStatus, number> = {
    active: 0,
    critical: 0,
    discharged: 0,
    pending: 0,
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

export const getAppointmentStatusStats = (appointments: Appointment[]) => {
  const map: Record<string, number> = {
    scheduled: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  };

  appointments.forEach((a) => {
    map[a.status] = (map[a.status] || 0) + 1;
  });

  return {
    labels: Object.keys(map),
    values: Object.values(map),
  };
};

export const getMonthlyAppointments = (appointments: Appointment[]) => {
  const map: Record<string, number> = {};

  appointments.forEach((a) => {
    if (a.appointmentDate) {
      const date = new Date(a.appointmentDate);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      map[key] = (map[key] || 0) + 1;
    }
  });

  return {
    labels: Object.keys(map),
    values: Object.values(map),
  };
};
