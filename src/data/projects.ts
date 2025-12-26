
export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    tech: string[];
    link?: string;
    fullDescription?: string;
    features?: string[];
    gallery?: string[];
}

export const projects: Project[] = [
    {
        id: "neon-nexus",
        title: "NEON NEXUS",
        category: "WEB APPLICATION",
        description: "A futuristic dashboard for monitoring cyber-physical systems.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
        tech: ["React", "Three.js", "WebGL"],
        fullDescription: "Neon Nexus is a state-of-the-art monitoring system designed for the next generation of smart cities. It aggregates data from thousands of IoT sensors and visualizes it in a real-time 3D environment.",
        features: [
            "Real-time 3D Data Visualization",
            "AI-driven Anomaly Detection",
            "Holographic UI Components",
            "Voice Command Interface"
        ],
        gallery: [
            "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=2574&auto=format&fit=crop"
        ]
    },
    {
        id: "aether-lens",
        title: "AETHER LENS",
        category: "AR EXPERIENCE",
        description: "Augmented reality interface for urban exploration and navigation.",
        image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2574&auto=format&fit=crop",
        tech: ["Unity", "C#", "AR Foundation"],
        fullDescription: "Aether Lens overlays digital information onto the physical world, creating a seamless blend of reality and data. Users can navigate cities, find hidden gems, and interact with virtual art installations.",
        features: [
            "Geolocation-based AR Markers",
            "Interactive 3D Wayfinding",
            "Social AR Sharing",
            "Cloud Anchor Persistence"
        ],
        gallery: [
            "https://images.unsplash.com/photo-1559131397-f94da358f7ca?q=80&w=2574&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop"
        ]
    },
    {
        id: "void-market",
        title: "VOID MARKET",
        category: "E-COMMERCE",
        description: "Decentralized marketplace with zero-knowledge proof authentication.",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop",
        tech: ["Next.js", "Solidity", "IPFS"],
        fullDescription: "Void Market represents the future of secure, anonymous online trading. Built on Ethereum with zk-SNARKs technology, it ensures complete privacy for both buyers and sellers while maintaining trustless security.",
        features: [
            "Zero-Knowledge Authentication",
            "Decentralized Escrow System",
            "Encrypted Messaging",
            "Multi-Currency Crypto Support"
        ],
        gallery: [
            "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2832&auto=format&fit=crop"
        ]
    },
    {
        id: "cyber-pulse",
        title: "CYBER PULSE",
        category: "AUDIO VISUALIZER",
        description: "Generative audio-reactive visualizer running in the browser.",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2670&auto=format&fit=crop",
        tech: ["WebAudio API", "Canvas 2D", "GLSL"],
        fullDescription: "Cyber Pulse transforms raw audio data into hypnotic visual experiences. Using advanced FFT analysis and custom shaders, it creates a synesthetic journey that reacts to every beat and frequency.",
        features: [
            "Real-time Frequency Analysis",
            "Custom Shader Pipelines",
            "Microphone Input Support",
            "VR Mode Compatibility"
        ],
        gallery: [
            "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2574&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop"
        ]
    }
];
