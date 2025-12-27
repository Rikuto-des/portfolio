import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ProjectDetail from "../pages/ProjectDetail";
import { Button } from "./ui/button";

const ProjectModal = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Close handler
    const handleClose = () => {
        navigate(-1);
    };

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">

                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
                />

                {/* Modal Content container */}
                <motion.div
                    layoutId={`project-container-${id}`}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-6xl h-full max-h-[90vh] bg-background/95 border border-primary/30 shadow-[0_0_50px_rgba(51,255,51,0.1)] overflow-hidden rounded-lg flex flex-col"
                >
                    {/* Close Button */}
                    <div className="absolute top-4 right-4 z-50">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleClose}
                            className="text-primary hover:bg-primary/20 hover:text-primary rounded-full w-10 h-10 border border-transparent hover:border-primary/50 transition-all"
                        >
                            <X size={20} />
                        </Button>
                    </div>

                    {/* Content Scroll Area */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {/* 
                   Render ProjectDetail but forcing a different layout if needed.
                   Since ProjectDetail handles logic to find project by useParam 'id', 
                   we can just render it. We might need to override some visible styles via CSS or props 
                   if we were passing props, but mostly the ProjectDetail page structure 
                   (container, padding) should fit reasonably well within this modal.
                   
                   Note: ProjectDetail normally has 'min-h-screen'. inside a height constrained div 
                   this is fine, it just scrolls.
                */}
                        <ProjectDetail isModal={true} />
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ProjectModal;
