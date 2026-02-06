"use client";

// Warm dreamy pastel background with purple and warm tones
// Rich gradients blending lavender, peach, pink, and soft coral

export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
            {/* Warm white base with subtle gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(135deg, #fefefe 0%, #fdf9f7 50%, #faf8fc 100%)",
                }}
            />

            {/* Soft lavender/purple - top left */}
            <div
                className="absolute top-0 left-0 w-[50vw] h-[60vh]"
                style={{
                    background: "radial-gradient(ellipse at 20% 30%, rgba(216, 191, 231, 0.45) 0%, rgba(232, 224, 240, 0.25) 40%, transparent 70%)",
                }}
            />

            {/* Warm peach/coral - right side */}
            <div
                className="absolute top-[10%] right-0 w-[55vw] h-[70vh]"
                style={{
                    background: "radial-gradient(ellipse at 80% 40%, rgba(255, 218, 200, 0.5) 0%, rgba(250, 200, 180, 0.25) 40%, transparent 70%)",
                }}
            />

            {/* Soft pink - center */}
            <div
                className="absolute top-[30%] left-[25%] w-[50vw] h-[50vh]"
                style={{
                    background: "radial-gradient(ellipse at 50% 50%, rgba(255, 210, 220, 0.35) 0%, rgba(248, 200, 210, 0.15) 50%, transparent 70%)",
                }}
            />

            {/* Purple accent - top right */}
            <div
                className="absolute top-0 right-[5%] w-[40vw] h-[45vh]"
                style={{
                    background: "radial-gradient(ellipse at 70% 20%, rgba(200, 180, 220, 0.4) 0%, rgba(220, 200, 235, 0.2) 40%, transparent 65%)",
                }}
            />

            {/* Warm golden glow - bottom center */}
            <div
                className="absolute bottom-0 left-[20%] w-[60vw] h-[45vh]"
                style={{
                    background: "radial-gradient(ellipse at 50% 90%, rgba(255, 230, 200, 0.45) 0%, rgba(250, 220, 190, 0.2) 50%, transparent 70%)",
                }}
            />

            {/* Soft lilac - bottom left */}
            <div
                className="absolute bottom-[5%] left-0 w-[35vw] h-[40vh]"
                style={{
                    background: "radial-gradient(ellipse at 15% 80%, rgba(220, 200, 240, 0.35) 0%, transparent 60%)",
                }}
            />

            {/* Light coral touch - bottom right */}
            <div
                className="absolute bottom-[10%] right-[10%] w-[30vw] h-[35vh]"
                style={{
                    background: "radial-gradient(ellipse at 80% 70%, rgba(255, 200, 190, 0.3) 0%, transparent 55%)",
                }}
            />
        </div>
    );
}
