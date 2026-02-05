import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#f5b842]/30 disabled:opacity-50 disabled:pointer-events-none",
                    {
                        "bg-gradient-to-r from-[#f5b842] via-[#ffb385] to-[#f4978e] text-white hover:opacity-90 shadow-lg shadow-[#f5b842]/25":
                            variant === "primary",
                        "bg-[#fffdf8]/80 backdrop-blur-md border border-[#f5b842]/25 text-[#5d4e42] hover:bg-[#fff9f0]":
                            variant === "secondary",
                        "bg-transparent text-[#8b7355] hover:text-[#5d4e42] hover:bg-[#fff9f0]/50":
                            variant === "ghost",
                        "border border-[#f5b842]/40 text-[#f5b842] hover:bg-[#fff3d4]/40":
                            variant === "outline",
                        "h-8 px-4 text-sm": size === "sm",
                        "h-10 px-6 text-base": size === "md",
                        "h-12 px-8 text-lg": size === "lg",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button, cn };
