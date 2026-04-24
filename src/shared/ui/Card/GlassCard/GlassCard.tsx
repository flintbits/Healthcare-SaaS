import type { ReactNode } from "react";

export default function GlassCard({
  title,
  subtitle,
  icon,
  children,
  className = "",
  noBackground = false,
}: {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  noBackground?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/8 ${noBackground ? "bg-transparent" : "bg-white/3"} p-5 backdrop-blur-2xl ${className}`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
            {title}
          </p>

          {subtitle && (
            <p className="mt-2 text-sm text-white/55">
              {subtitle}
            </p>
          )}
        </div>

        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/70">
            {icon}
          </div>
        )}
      </div>

      {children}
    </div>
  );
}
