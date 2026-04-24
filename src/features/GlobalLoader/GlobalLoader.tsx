import { useRouterState } from "@tanstack/react-router"
import { usePatientStore } from "../../store/patient.store"
import { useVisitStore } from "../../store/visit.store"
import styles from "./GlobalLoader.module.css"

export function GlobalLoader() {
  const patientLoading = usePatientStore((s) => s.loading)
  const visitLoading = useVisitStore((s) => s.loading)

  const { isLoading, hasPendingMatches } = useRouterState({
    select: (s) => ({
      isLoading: s.isLoading,
      hasPendingMatches: s.matches.some(
        (match) => match.status === "pending"
      ),
    }),
    structuralSharing: true,
  })

  const loading =
    patientLoading ||
    visitLoading ||
    isLoading ||
    hasPendingMatches

  if (!loading) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.loader}>
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className={styles.circle}></span>
        ))}
      </div>

      <p className={styles.label}>Loading...</p>
    </div>
  )
}
