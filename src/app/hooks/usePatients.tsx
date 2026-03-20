import { addPatient } from "../../services/patientService";


export const usePatients = () => {

  const createPatient = async (data: any) => {
    await addPatient(data);
  };

  return {
    createPatient,
  };
};
