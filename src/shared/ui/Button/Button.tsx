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
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium tracking-[-0.01em] transition-all duration-300 border backdrop-blur-xl cursor-pointer select-none whitespace-nowrap disabled:pointer-events-none disabled:opacity-50";

    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
        /* Linear + Swiss + Glass Primary */
        accent:
            "border-white/20 bg-white text-black shadow-[0_8px_30px_rgba(255,255,255,0.08)] hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]",

        /* Frosted Outline */
        outline:
            "border-white/15 bg-white/[0.04] text-white backdrop-blur-2xl hover:bg-white/[0.08] hover:border-white/25 hover:scale-[1.02] active:scale-[0.98]",

        /* Minimal Ghost */
        ghost:
            "border-transparent bg-transparent text-white/70 hover:bg-white/[0.05] hover:text-white hover:scale-[1.02] active:scale-[0.98]",
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
