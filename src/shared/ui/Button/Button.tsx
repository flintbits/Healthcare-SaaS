import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "accent" | "outline" | "ghost";
};

export const Button: React.FC<ButtonProps> = ({
    variant = "accent",
    className = "",
    children,
    ...props
}) => {
    const base =
        "px-4 py-2 rounded-lg font-medium transition-colors duration-200 border";

    const variants: Record<typeof variant, string> = {
        accent:
            "bg-(--color-accent) text-white border border-accent hover:opacity-90 active:opacity-80",

        outline:
            "bg-transparent text-accent border-accent hover:bg-accent hover:text-white",

        ghost:
            "bg-transparent border-transparent text-accent hover:bg-accent/10",
    };

    return (
        <button
            className={`${base} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};