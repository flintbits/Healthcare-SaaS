import React from "react";

type TypographyElements =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "label"
    | "span";

type TypographyWeight = "light" | "normal" | "medium" | "bold";

type TypographySize =
    | "text-base"
    | "text-sm"
    | "text-xs"
    | "text-[10px]"
    | "text-lg"
    | "text-xl"
    | "text-2xl"
    | "text-4xl";

interface TypographyProps {
    as?: TypographyElements;
    children: React.ReactNode;
    weight?: TypographyWeight;
    size?: TypographySize;
    className?: string;
    style?: React.CSSProperties;
}

const weightClasses: Record<TypographyWeight, string> = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    bold: "font-semibold",
};

const sizeClasses: Record<TypographySize, string> = {
    "text-base": "text-base",
    "text-sm": "text-sm",
    "text-xs": "text-xs",
    "text-[10px]": "text-[10px]",
    "text-lg": "text-lg",
    "text-xl": "text-xl",
    "text-2xl": "text-2xl",
    "text-4xl": "text-4xl",
};

const elementDefaults: Record<TypographyElements, string> = {
    h1: "text-4xl md:text-5xl leading-[1] tracking-[-0.04em] text-white",
    h2: "text-3xl md:text-4xl leading-tight tracking-[-0.03em] text-white",
    h3: "text-2xl leading-tight tracking-[-0.02em] text-white",
    h4: "text-xl leading-tight text-white",
    h5: "text-lg leading-tight text-white",
    h6: "text-base leading-tight text-white",
    p: "text-base leading-7 text-white/60",
    label: "text-sm font-medium text-white/70",
    span: "text-sm text-white/70",
};

export default function Typography({
    as: Component = "p",
    children,
    weight = "normal",
    size,
    className = "",
    style,
}: TypographyProps) {
    const classes = [
        "m-0 antialiased",
        elementDefaults[Component],
        weightClasses[weight],
        size ? sizeClasses[size] : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <Component className={classes} style={style}>
            {children}
        </Component>
    );
}
