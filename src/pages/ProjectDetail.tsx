import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Layers, Cpu, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";
import { useEffect } from "react";
import ReactMarkdown from 'react-markdown';

const ProjectDetail = () => {
    const { id } = useParams();
    const project = projects.find((p) => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
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
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-6">
                {/* Navigation */}
                <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    <span className="font-mono">BACK_TO_HQ</span>
                </Link>

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <Badge variant="outline" className="border-primary text-primary font-mono rounded-none px-3 py-1">
                            {project.category}
                        </Badge>
                        <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                        <span className="font-mono text-muted-foreground">{project.id.toUpperCase()}</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 text-foreground leading-[0.9]">
                        {project.title.split(' ').map((word, i) => (
                            <span key={i} className="block">{word}</span>
                        ))}
                    </h1>

                    <div className="text-xl text-muted-foreground max-w-2xl leading-relaxed prose prose-invert prose-p:text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground">
                        <ReactMarkdown>{project.content || ""}</ReactMarkdown>
                    </div>
                </motion.div>

                {/* Main Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative w-full aspect-video rounded-2xl overflow-hidden mb-16 border border-border shadow-[0_20px_50px_-20px_rgba(0,0,0,0.2)]"
                >
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay Tech Lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
                </motion.div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Details Column */}
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
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
                                        className="flex items-start gap-3 p-4 bg-white/50 border border-border rounded-lg backdrop-blur-sm"
                                    >
                                        <div className="w-1.5 h-1.5 mt-2 bg-secondary rounded-full" />
                                        <span className="text-foreground/80">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Gallery */}
                        <div>
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Cpu className="text-primary" />
                                VISUAL_LOGS
                            </h3>
                            <div className="grid gap-6">
                                {project.gallery?.map((img, i) => (
                                    <div key={i} className="relative rounded-xl overflow-hidden border border-border group">
                                        <img src={img} alt={`Gallery ${i}`} className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="p-6 bg-white border border-border rounded-xl shadow-lg sticky top-24">
                            <h3 className="font-mono text-sm text-muted-foreground mb-4 border-b border-border pb-2">PROJECT_INFO</h3>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold flex items-center gap-2 mb-2">
                                        <Code size={16} /> TECH_STACK
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map(t => (
                                            <Badge key={t} variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20 rounded-md">
                                                {t}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4">
                                    <Button className="w-full gap-2 rounded-none clip-path-button bg-primary hover:bg-primary/90 text-primary-foreground font-bold" size="lg">
                                        <ExternalLink size={18} />
                                        LAUNCH_LIVE
                                    </Button>
                                    <Button variant="outline" className="w-full gap-2 rounded-none border-foreground/20 hover:bg-foreground/5">
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
