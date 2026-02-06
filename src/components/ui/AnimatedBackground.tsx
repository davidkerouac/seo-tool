"use client";

// Light airy pastel background - positive and uplifting
// Soft cyan-to-pink gradient like the reference image

export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
            {/* Light base gradient - cyan to pink */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(135deg, #e8f4f8 0%, #faf9fc 30%, #fef9f8 60%, #fdf5f8 100%)",
                }}
            />

            {/* Soft cyan/aqua - left side */}
            <div
                className="absolute top-0 left-0 w-[50vw] h-full"
                style={{
                    background: "linear-gradient(to right, rgba(200, 230, 245, 0.6) 0%, rgba(210, 235, 248, 0.3) 50%, transparent 100%)",
                }}
            />

            {/* Soft pink/rose - right side */}
            <div
                className="absolute top-0 right-0 w-[50vw] h-full"
                style={{
                    background: "linear-gradient(to left, rgba(255, 220, 230, 0.5) 0%, rgba(255, 230, 240, 0.25) 50%, transparent 100%)",
                }}
            />

            {/* Warm cream/yellow center glow */}
            <div
                className="absolute top-[20%] left-[30%] w-[40vw] h-[60vh]"
                style={{
                    background: "radial-gradient(ellipse at 50% 50%, rgba(255, 250, 230, 0.5) 0%, rgba(255, 245, 220, 0.2) 50%, transparent 70%)",
                }}
            />

            {/* Soft lavender hint - top right */}
            <div
                className="absolute top-0 right-[10%] w-[35vw] h-[40vh]"
                style={{
                    background: "radial-gradient(ellipse at 60% 30%, rgba(235, 225, 250, 0.4) 0%, transparent 60%)",
                }}
            />

            {/* Light peach - bottom center */}
            <div
                className="absolute bottom-0 left-[25%] w-[50vw] h-[40vh]"
                style={{
                    background: "radial-gradient(ellipse at 50% 80%, rgba(255, 235, 220, 0.4) 0%, transparent 60%)",
                }}
            />

            {/* Subtle mint - bottom left */}
            <div
                className="absolute bottom-[10%] left-0 w-[30vw] h-[35vh]"
                style={{
                    background: "radial-gradient(ellipse at 20% 70%, rgba(210, 245, 240, 0.35) 0%, transparent 55%)",
                }}
            />
        </div>
    );
}
