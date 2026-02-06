"use client";

// Dreamy soft pastel background - like morning mist
// Very light, airy gradients

export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
            {/* Near-white base */}
            <div className="absolute inset-0 bg-[#fefefe]" />

            {/* Soft cyan/aqua - left side (like the reference) */}
            <div
                className="absolute top-0 left-0 w-[40vw] h-full"
                style={{
                    background: "linear-gradient(to right, rgba(197, 229, 237, 0.4) 0%, rgba(197, 229, 237, 0.15) 50%, transparent 100%)",
                }}
            />

            {/* Very soft peach/pink - center to right */}
            <div
                className="absolute top-[20%] right-0 w-[60vw] h-[60vh]"
                style={{
                    background: "radial-gradient(ellipse at 70% 50%, rgba(250, 229, 220, 0.5) 0%, rgba(248, 224, 221, 0.25) 40%, transparent 70%)",
                }}
            />

            {/* Subtle lavender hint - top right corner */}
            <div
                className="absolute top-0 right-[10%] w-[35vw] h-[40vh]"
                style={{
                    background: "radial-gradient(ellipse at 50% 30%, rgba(232, 224, 240, 0.35) 0%, transparent 60%)",
                }}
            />

            {/* Very faint warm glow - bottom */}
            <div
                className="absolute bottom-0 left-[30%] w-[50vw] h-[40vh]"
                style={{
                    background: "radial-gradient(ellipse at 50% 80%, rgba(245, 232, 216, 0.3) 0%, transparent 60%)",
                }}
            />

            {/* Subtle cyan touch - bottom left */}
            <div
                className="absolute bottom-[10%] left-0 w-[30vw] h-[35vh]"
                style={{
                    background: "radial-gradient(ellipse at 20% 70%, rgba(197, 229, 237, 0.25) 0%, transparent 60%)",
                }}
            />
        </div>
    );
}
