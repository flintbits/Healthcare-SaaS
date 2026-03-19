import React from "react";

type TypographyElements =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "label";

type TypographyWeight = "light" | "normal" | "medium" | "bold";

type TypographySize = "text-base" | "text-sm" | "text-xs" | "text-[10px]";

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
    bold: "font-bold",
};

const sizeClasses: Record<TypographySize, string> = {
    "text-base": "text-base",
    "text-sm": "text-sm",
    "text-xs": "text-xs",
    "text-[10px]": "text-xxs",
};

export default function Typography({
    as: Component = "p",
    children,
    weight = "normal",
    size,
    className,
    style,
}: TypographyProps) {
    const classes = [
        "m-0",
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