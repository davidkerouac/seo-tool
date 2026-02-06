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
                    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#c5e5ed]/50 disabled:opacity-50 disabled:pointer-events-none",
                    {
                        "bg-gradient-to-r from-[#c5e5ed] via-[#e8e0f0] to-[#f8e0dd] text-[#2d2d2d] hover:opacity-90 shadow-lg shadow-[#c5e5ed]/20":
                            variant === "primary",
                        "bg-white/80 backdrop-blur-md border border-[#e8e0f0]/50 text-[#2d2d2d] hover:bg-[#fafafa]":
                            variant === "secondary",
                        "bg-transparent text-[#6b6b6b] hover:text-[#2d2d2d] hover:bg-[#fafafa]/50":
                            variant === "ghost",
                        "border border-[#c5e5ed]/60 text-[#6b6b6b] hover:bg-[#f0f9fb]/50":
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
