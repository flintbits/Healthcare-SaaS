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
                className="flex flex-col gap-1 w-full"
                style={style}
            >

                {label && (
                    <div className="flex justify-between items-baseline">
                        <label
                            htmlFor={id}
                            className="text-sm font-light text-gray-500"
                        >
                            {label}
                        </label>

                        {isPassword && (
                            <Typography as="p" weight="light" size="text-xs">
                                <Link
                                    to="/"
                                    className="text-(--color-accent) no-underline"
                                >
                                    Forgot Password?
                                </Link>
                            </Typography>
                        )}
                    </div>
                )}

                {/* Input container */}
                <div
                    className={[
                        "rounded-md",
                        error
                            ? "focus-within:ring-red-600/20"
                            : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    <div
                        className={[
                            "flex items-center rounded-md border bg-white px-3 focus-within:bg-(--color-accent)/10",
                            error ? "border-red-600" : "border-gray-400",
                            className,
                        ]
                            .filter(Boolean)
                            .join(" ")}
                    >
                        {LeftIcon && (
                            <LeftIcon className="w-4 h-4 mr-2 text-gray-400" />
                        )}

                        <input
                            ref={ref}
                            id={id}
                            className="flex-1 border-none outline-none py-2 bg-transparent text-sm font-light"
                            {...props}
                        />

                        {RightIcon && (
                            <RightIcon className="w-4 h-4 ml-2 text-gray-400" />
                        )}
                    </div>
                </div>

                {/* error text */}
                <Typography
                    as="p"
                    weight="light"
                    size="text-xs"
                    className={error ? "text-red-600" : ""}
                    style={{
                        visibility: error ? "visible" : "hidden",
                        minHeight: helperText ? 14 : 0
                    }}
                >
                    {helperText}
                </Typography>
            </section>
        );
    }
);
