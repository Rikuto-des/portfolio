import { useEffect, Suspense, lazy } from "react";
import Hero from "@/components/Hero"; // First view, keep eager load
import { useLocation } from "react-router-dom";
import { scrollToElement } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { FloatingNav } from "@/components/ui/FloatingNav";

// Lazy load heavy sections
const About = lazy(() => import("@/components/About"));
const Projects = lazy(() => import("@/components/Projects"));
const Contact = lazy(() => import("@/components/Contact"));

const SectionLoader = () => (
    <div className="w-full h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
);

const Home = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            setTimeout(() => {
                scrollToElement(hash, 80);
            }, 100);
        }
    }, [hash]);

    return (
        <main className="bg-background min-h-screen">
            <CustomCursor />
            <FloatingNav />
            <Hero />
            <Suspense fallback={<SectionLoader />}>
                <About />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
                <Projects />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
                <Contact />
            </Suspense>
        </main>
    );
};

export default Home;
