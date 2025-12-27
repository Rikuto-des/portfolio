import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Layers, Cpu, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";
import { useEffect } from "react";
import ReactMarkdown from 'react-markdown';

const ProjectDetail = ({ isModal = false }: { isModal?: boolean }) => {
    const { id } = useParams();
    const project = projects.find((p) => p.id === id);

    useEffect(() => {
        if (!isModal) {
            window.scrollTo(0, 0);
        }
    }, [isModal]);

    if (!project) {
        return (
            <div className={`flex items-center justify-center bg-background text-foreground ${isModal ? 'h-full' : 'min-h-screen'}`}>
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4">404: PROJECT_NOT_FOUND</h2>
                    <Link to="/">
                        <Button>Return to Base</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={`${isModal ? 'bg-transparent pb-10' : 'min-h-screen bg-background pt-24 pb-20'} font-mono selection:bg-primary selection:text-black`}>

            {/* Background Grid & Ambience - Only show if separate page */}
            {!isModal && (
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-grid opacity-20" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
                </div>
            )}

            <div className={`container mx-auto px-6 relative z-10 ${isModal ? 'pt-12' : ''}`}>

                {/* Navigation - Hide in modal */}
                {!isModal && (
                    <Link to="/" className="inline-flex items-center gap-2 text-primary/60 hover:text-primary mb-8 transition-colors group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="tracking-widest text-sm">BACK_TO_HQ</span>
                    </Link>
                )}

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <Badge variant="outline" className="border-primary text-primary font-mono rounded-none px-3 py-1 bg-primary/10 backdrop-blur-sm">
                            {project.category}
                        </Badge>
                        <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                        <span className="font-mono text-primary/60">{project.id.toUpperCase()}</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 text-primary leading-[0.9] drop-shadow-[0_0_10px_rgba(51,255,51,0.3)] uppercase">
                        {project.title.split(' ').map((word, i) => (
                            <span key={i} className="block">{word}</span>
                        ))}
                    </h1>

                    <div className="text-xl text-foreground/80 max-w-3xl leading-relaxed prose prose-invert prose-p:text-foreground/80 prose-headings:text-primary prose-strong:text-primary prose-a:text-primary prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:px-4">
                        <ReactMarkdown>{project.content || ""}</ReactMarkdown>
                    </div>
                </motion.div>

                {/* Main Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative w-full aspect-video rounded-none overflow-hidden mb-16 border-2 border-primary/30 shadow-[0_0_30px_rgba(0,0,0,0.5)] group"
                >
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    {/* Overlay Tech Lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(51,255,51,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(51,255,51,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay pointer-events-none" />
                </motion.div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Details Column */}
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-primary font-heading tracking-wider">
                                <Layers className="text-primary" />
                                KEY_FEATURES
                            </h3>
                            <ul className="grid sm:grid-cols-2 gap-4">
                                {project.features?.map((feature, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-3 p-4 bg-card/40 border border-primary/20 hover:border-primary/60 transition-colors backdrop-blur-sm"
                                    >
                                        <div className="w-1.5 h-1.5 mt-2 bg-primary rounded-none" />
                                        <span className="text-foreground/90 font-mono text-sm">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Gallery */}
                        <div>
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-primary font-heading tracking-wider">
                                <Cpu className="text-primary" />
                                VISUAL_LOGS
                            </h3>
                            <div className="grid gap-6">
                                {project.gallery?.map((img, i) => (
                                    <div key={i} className="relative rounded-sm overflow-hidden border border-primary/30 group bg-black">
                                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 pointer-events-none group-hover:opacity-0 transition-opacity" />
                                        <img
                                            src={img}
                                            alt={`Gallery ${i}`}
                                            className="w-full h-auto transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null; // Prevent infinite loop
                                                target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"; // Reliable fallback (Neon Nexus main img)
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="p-6 bg-card/60 backdrop-blur-md border border-primary/30 shadow-[0_0_20px_rgba(51,255,51,0.05)] sticky top-24">
                            <h3 className="font-mono text-sm text-primary mb-4 border-b border-primary/30 pb-2 tracking-[0.2em]">PROJECT_INFO</h3>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold flex items-center gap-2 mb-3 text-foreground font-mono text-sm">
                                        <Code size={16} className="text-primary" /> TECH_STACK
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map(t => (
                                            <Badge key={t} variant="secondary" className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-none font-mono text-xs">
                                                {t}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4">
                                    <Button className="w-full gap-2 rounded-none bg-primary text-black hover:bg-primary/90 font-bold border border-primary shadow-[0_0_10px_rgba(51,255,51,0.2)] hover:shadow-[0_0_20px_rgba(51,255,51,0.4)] transition-all" size="lg">
                                        <ExternalLink size={18} />
                                        LAUNCH_LIVE
                                    </Button>
                                    <Button variant="outline" className="w-full gap-2 rounded-none border-primary/50 text-primary hover:bg-primary/10 hover:text-primary font-mono uppercase tracking-wider">
                                        <Github size={18} />
                                        SOURCE_CODE
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ProjectDetail;
