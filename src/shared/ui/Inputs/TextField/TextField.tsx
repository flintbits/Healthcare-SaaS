import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import React, { forwardRef } from "react";
import Typography from "../../Typography/Typography";

interface TextFieldProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    isPassword?: boolean;
    error?: boolean;
    helperText?: string;
    LeftIcon?: LucideIcon;
    RightIcon?: LucideIcon;
    className?: string;
    style?: React.CSSProperties;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    (
        {
            id,
            label,
            isPassword,
            error = false,
            helperText,
            LeftIcon,
            RightIcon,
            style,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <section
                className="flex w-full flex-col gap-2"
                style={style}
            >
                {/* label row */}
                {label && (
                    <div className="flex items-center justify-between gap-3">
                        <label
                            htmlFor={id}
                            className="text-sm font-medium tracking-[-0.01em] text-white/65"
                        >
                            {label}
                        </label>

                        {isPassword && (
                            <Typography as="p" weight="light" size="text-xs">
                                <Link
                                    to="/"
                                    className="no-underline text-white/45 transition hover:text-white"
                                >
                                    Forgot Password?
                                </Link>
                            </Typography>
                        )}
                    </div>
                )}

                {/* input shell */}
                <div
                    className={[
                        "group relative overflow-hidden rounded-2xl border backdrop-blur-2xl transition-all duration-300",
                        error
                            ? "border-red-400/50 bg-red-500/[0.04] focus-within:border-red-400"
                            : "border-white/10 bg-white/[0.04] hover:bg-white/[0.06] focus-within:border-white/20 focus-within:bg-white/[0.07]",
                        className,
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    {/* subtle inner glow */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" />

                    <div className="relative flex h-14 items-center px-4">
                        {LeftIcon && (
                            <LeftIcon className="mr-3 h-4 w-4 shrink-0 text-white/35 transition group-focus-within:text-white/70" />
                        )}

                        <input
                            ref={ref}
                            id={id}
                            className="flex-1 bg-transparent text-sm font-normal text-white placeholder:text-white/30 outline-none"
                            {...props}
                        />

                        {RightIcon && (
                            <RightIcon className="ml-3 h-4 w-4 shrink-0 text-white/35 transition group-focus-within:text-white/70" />
                        )}
                    </div>
                </div>

                {/* helper / error */}
                <Typography
                    as="p"
                    weight="light"
                    size="text-xs"
                    className={
                        error
                            ? "min-h-[16px] text-red-300"
                            : "min-h-[16px] text-white/35"
                    }
                >
                    {helperText || " "}
                </Typography>
            </section>
        );
    }
);
