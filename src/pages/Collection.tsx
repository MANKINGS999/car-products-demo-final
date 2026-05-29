import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';


const collections = [
    {
        id: 1,
        title: "Nappa Leather Series",
        price: "₹45,000+",
        category: "Interior",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200",
        description: "Premium Italian Nappa leather seat covers with diamond stitching.",
        gradient: "from-amber-500/20 to-orange-500/20"
    },
    {
        id: 2,
        title: "Focal Audio Kit",
        price: "₹85,000+",
        category: "Audio",
        image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=1200",
        description: "High-fidelity component system with custom A-pillar fabrication.",
        gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
        id: 3,
        title: "Ceramic Shield Pro",
        price: "₹25,000+",
        category: "Detailing",
        image: "https://images.unsplash.com/photo-1605218427360-6961d902d338?w=1200",
        description: "5-year warranty ceramic coating with 9H hardness.",
        gradient: "from-emerald-500/20 to-teal-500/20"
    },
    {
        id: 4,
        title: "Ambient Lighting X",
        price: "₹18,000+",
        category: "Custom",
        image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1200",
        description: "Multi-zone RGB app-controlled ambient lighting system.",
        gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
        id: 5,
        title: "Alcantara Roof Liner",
        price: "₹35,000+",
        category: "Interior",
        image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200",
        description: "Genuine Alcantara roof lining with starlight headliner option.",
        gradient: "from-rose-500/20 to-red-500/20"
    },
    {
        id: 6,
        title: "Garware PPF Matte",
        price: "₹95,000+",
        category: "Detailing",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200",
        description: "Self-healing matte finish paint protection film.",
        gradient: "from-violet-500/20 to-indigo-500/20"
    }
];

const categories = ["All", "Interior", "Audio", "Detailing", "Custom"];

export default function Collection() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredCollections = activeCategory === "All"
        ? collections
        : collections.filter(item => item.category === activeCategory);

    return (
        <div className="pt-24 min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary relative overflow-hidden">
            {/* Animated gradient orbs */}
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-accent-primary/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 to-pink-500/10 rounded-full blur-3xl" />

            {/* Header */}
            <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <span className="text-small uppercase tracking-[0.2em] text-text-tertiary font-medium mb-4 block">
                        Curated Selection
                    </span>
                    <div className="flex justify-center mb-6">
                        <h1 className="text-display font-display font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                            Exclusive Collections
                        </h1>
                    </div>
                    <p className="text-body text-text-secondary max-w-2xl mx-auto font-light">
                        Discover our handpicked range of premium automotive enhancements, used in our bespoke projects.
                    </p>
                </motion.div>

                {/* Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-20 sticky top-24 z-30 bg-gradient-to-r from-bg-primary/90 via-surface/90 to-bg-primary/90 backdrop-blur-xl p-4 rounded-full border border-border-subtle w-fit mx-auto shadow-elevation-md">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full text-small font-medium transition-all duration-premium ${activeCategory === category
                                ? 'bg-gradient-to-r from-accent-primary to-purple-600 text-white shadow-glow-accent'
                                : 'text-text-secondary hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCollections.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                            className="group relative bg-gradient-to-br from-surface to-bg-secondary rounded-2xl overflow-hidden border border-border-subtle hover:border-border-medium transition-all duration-premium hover:shadow-elevation-md"
                        >
                            {/* Image */}
                            <div className="aspect-[4/5] overflow-hidden relative">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200";
                                    }}
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-premium`} />
                                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-premium">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-1 h-8 bg-gradient-to-b ${item.gradient.replace('/20', '')} rounded-full`} />
                                        <span className="text-small uppercase tracking-wider text-accent-primary font-medium">
                                            {item.category}
                                        </span>
                                    </div>
                                    <h3 className="text-h3 font-display font-bold text-white mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-body text-text-secondary font-light mb-4 line-clamp-2 group-hover:line-clamp-none transition-all">
                                        {item.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-premium delay-100">
                                        <span className="text-h4 font-display font-medium bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                            {item.price}
                                        </span>
                                        <MagneticButton className="w-12 h-12 rounded-full bg-gradient-to-r from-white to-purple-100 text-bg-primary flex items-center justify-center hover:from-accent-primary hover:to-purple-600 hover:text-white transition-all duration-premium shadow-elevation-sm">
                                            <ArrowUpRight size={20} />
                                        </MagneticButton>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
