import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
    { value: 500, label: "Projects Completed", suffix: "+", gradient: "from-amber-500 to-orange-600" },
    { value: 15, label: "Years of Excellence", suffix: "+", gradient: "from-blue-500 to-cyan-600" },
    { value: 98, label: "Client Satisfaction", suffix: "%", gradient: "from-emerald-500 to-teal-600" },
    { value: 50, label: "Premium Brands", suffix: "+", gradient: "from-purple-500 to-pink-600" }
];

function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
    const ref = useRef(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: duration * 1000 });
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [motionValue, isInView, value]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
    }, [springValue]);

    return <span ref={ref}>{displayValue}</span>;
}

export default function Stats() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-12 sm:py-3xl lg:py-4xl bg-gradient-to-br from-bg-secondary via-surface to-bg-secondary relative overflow-hidden">
            {/* Animated gradient background */}
            <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                    background: [
                        'radial-gradient(circle at 0% 0%, rgba(220, 38, 38, 0.15) 0%, transparent 50%)',
                        'radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
                        'radial-gradient(circle at 0% 100%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
                        'radial-gradient(circle at 100% 0%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
                        'radial-gradient(circle at 0% 0%, rgba(220, 38, 38, 0.15) 0%, transparent 50%)',
                    ]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="relative group"
                        >
                            {/* Gradient glow on hover */}
                            <div className={`absolute -inset-4 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-premium rounded-2xl`} />

                            <div className="relative text-center">
                                <div className={`text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-3 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}>
                                    <Counter value={stat.value} />
                                    {stat.suffix}
                                </div>
                                <div className="text-small uppercase tracking-[0.2em] text-text-secondary font-medium">
                                    {stat.label}
                                </div>

                                {/* Decorative gradient line */}
                                <div className={`mt-4 h-1 w-16 mx-auto bg-gradient-to-r ${stat.gradient} rounded-full`} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
