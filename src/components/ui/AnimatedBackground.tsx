"use client";

// Sunny Monet-inspired background with warm, positive colors
// No heavy animations for performance

export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
            {/* Warm sunny cream base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#fffdf8] via-[#fff9f0] to-[#fff5e6]" />

            {/* Golden sunshine - top area */}
            <div
                className="absolute top-[-10%] left-[10%] w-[50vw] h-[40vw] rounded-full opacity-50"
                style={{
                    background: "radial-gradient(circle, rgba(255, 208, 106, 0.3) 0%, rgba(255, 243, 212, 0.15) 50%, transparent 70%)",
                }}
            />

            {/* Warm peach - top right */}
            <div
                className="absolute top-[5%] right-[-5%] w-[45vw] h-[40vw] rounded-full opacity-45"
                style={{
                    background: "radial-gradient(circle, rgba(255, 179, 133, 0.25) 0%, rgba(255, 212, 184, 0.12) 50%, transparent 70%)",
                }}
            />

            {/* Coral pink - center left */}
            <div
                className="absolute top-[40%] left-[-10%] w-[40vw] h-[35vw] rounded-full opacity-35"
                style={{
                    background: "radial-gradient(circle, rgba(244, 151, 142, 0.2) 0%, rgba(255, 196, 188, 0.1) 50%, transparent 70%)",
                }}
            />

            {/* Sunny sky blue - center right (small touch) */}
            <div
                className="absolute top-[30%] right-[5%] w-[30vw] h-[25vw] rounded-full opacity-30"
                style={{
                    background: "radial-gradient(circle, rgba(78, 184, 212, 0.15) 0%, rgba(212, 241, 249, 0.08) 50%, transparent 70%)",
                }}
            />

            {/* Golden warmth - bottom center */}
            <div
                className="absolute bottom-[-5%] left-[20%] w-[55vw] h-[40vw] rounded-full opacity-45"
                style={{
                    background: "radial-gradient(circle, rgba(245, 184, 66, 0.22) 0%, rgba(255, 243, 212, 0.12) 50%, transparent 70%)",
                }}
            />

            {/* Soft lavender - bottom right (balance) */}
            <div
                className="absolute bottom-[15%] right-[-5%] w-[35vw] h-[30vw] rounded-full opacity-25"
                style={{
                    background: "radial-gradient(circle, rgba(201, 168, 224, 0.15) 0%, rgba(226, 208, 240, 0.08) 50%, transparent 70%)",
                }}
            />

            {/* Warm light wash at top */}
            <div
                className="absolute top-0 left-0 w-full h-[35vh] animate-pulse-slow"
                style={{
                    background: "linear-gradient(to bottom, rgba(255, 243, 212, 0.5) 0%, transparent 100%)",
                }}
            />
        </div>
    );
}
