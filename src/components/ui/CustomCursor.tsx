import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'BUTTON' || target.tagName === 'A') {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-accent-primary rounded-full pointer-events-none z-[9999] 
                   mix-blend-difference hidden md:block"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    scale: isHovering ? 2 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 600,
                    damping: 30
                }}
            />

            {/* Cursor ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[9998] 
                   hidden md:block"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                }}
            />
        </>
    );
}
