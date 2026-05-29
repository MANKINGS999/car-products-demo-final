import { motion } from 'framer-motion';

export default function TextReveal({ text, className = "" }: { text: string, className?: string }) {
    const words = text.split(' ');

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            style={{ overflow: 'hidden' }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`flex flex-wrap ${className}`}
        >
            {words.map((word, index) => (
                <motion.span
                    // @ts-ignore - Framer motion type mismatch with spring
                    variants={child}
                    key={index}
                    className="mr-2"
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}
