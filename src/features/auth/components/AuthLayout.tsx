import { useMemo } from 'react';
import { LoginFormSchema, SignupFormSchema } from '../Schema/auth.schema';
import styles from '../styles/AuthLayout.module.css';
import AuthForm from './AuthForm';

type AuthLayoutProps = {
  type: string
}

export default function AuthLayout({ type }: AuthLayoutProps) {
  const schema: any = useMemo(() => type === 'signup' ? SignupFormSchema : LoginFormSchema, [type])
  return (
    <section className={styles.auth}>
      <section className={styles.authContainer}>
        <AuthForm formType={type} schema={schema} key={type} />
      </section>
    </section>
  )
}
