import { usePatientStore } from "../../store/patient.store";
import { useVisitStore } from "../../store/visit.store";
import styles from "./GlobalLoader.module.css";

export function GlobalLoader() {
  const patientLoading = usePatientStore((s) => s.loading);
  const visitLoading = useVisitStore((s) => s.loading);

  const loading = patientLoading || visitLoading;

  console.log(loading)

  if (!loading) return null;


  return (
    <div className={styles.overlay}>
      <div className={styles.loader}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
    </div >
  );
}
