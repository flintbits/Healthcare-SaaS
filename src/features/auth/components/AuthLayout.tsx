import { useMemo } from "react";
import { LoginFormSchema, SignupFormSchema } from "../Schema/auth.schema";
import AuthForm from "./AuthForm";

type AuthLayoutProps = {
  type: string;
};

export default function AuthLayout({ type }: AuthLayoutProps) {
  const schema = useMemo(
    () => (type === "signup" ? SignupFormSchema : LoginFormSchema),
    [type]
  );

  const isLogin = type === "login";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070b] text-white">
      {/* background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_22%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[64px_64px]" />
      </div>

      <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 py-10 lg:grid-cols-[1fr_520px]">
        {/* LEFT SIDE */}
        <div className="hidden lg:block">
          <p className="text-xs uppercase tracking-[0.34em] text-white/45">
            Swiss Precision • Linear Simplicity
          </p>

          <h1 className="mt-6 text-7xl font-semibold leading-[0.92] tracking-[-0.05em]">
            {isLogin ? (
              <>
                Welcome
                <br />
                <span className="text-white/45">Back.</span>
              </>
            ) : (
              <>
                Create
                <br />
                Account.
              </>
            )}
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-white/60">
            {isLogin
              ? "Secure access to your healthcare workspace, analytics, records and operations."
              : "Start using the modern operating layer for healthcare teams, clinics and enterprise systems."}
          </p>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="w-full">
          <div className="rounded-[34px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-3xl sm:p-8">
            <AuthForm formType={type} schema={schema} key={type} />
          </div>
        </div>
      </section>
    </main>
  );
}
