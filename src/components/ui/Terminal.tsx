import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Command, Minimize2, Maximize2, Sparkles } from 'lucide-react';

type CommandResult = {
    type: 'text' | 'error' | 'success' | 'system';
    content: string;
};

type HistoryItem = {
    command: string;
    result: CommandResult[];
};

const FILES = {
    'manifesto.txt': 'Design is not just what it looks like and feels like. Design is how it works.',
    'ideas.md': '1. Exploring new typography trends\n2. Mastering color theory\n3. Creating immersive experiences',
    'contact_card.json': '{\n  "email": "rikuto@example.com",\n  "role": "UI/UX Designer"\n}',
};

const COMMANDS = [
    { cmd: 'help', desc: 'Show available commands' },
    { cmd: 'whoami', desc: 'Display designer profile' },
    { cmd: 'ls', desc: 'List creative assets' },
    { cmd: 'cat [file]', desc: 'View content' },
    { cmd: 'clear', desc: 'Clear history' },
    { cmd: 'inspire', desc: 'Spark creativity' },
    { cmd: 'play', desc: 'Start "Creative Block Breaker"' },
];

const Terminal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [gameMode, setGameMode] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Toggle with Cmd/Ctrl+Shift+X
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'x') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
        if (isOpen && !isMinimized && !gameMode) {
            inputRef.current?.focus();
        }
    }, [history, isOpen, isMinimized, gameMode]);

    const handleCommand = (cmd: string) => {
        const trimmed = cmd.trim();
        if (!trimmed) return;

        if (gameMode) {
            return;
        }

        const args = trimmed.split(' ');
        const command = args[0].toLowerCase();
        const output: CommandResult[] = [];

        switch (command) {
            case 'help':
                output.push({ type: 'system', content: 'CREATIVE TOOLS:' });
                COMMANDS.forEach(c => {
                    output.push({ type: 'text', content: `  ${c.cmd.padEnd(12)} - ${c.desc}` });
                });
                break;
            case 'whoami':
                output.push({ type: 'success', content: 'Role: UI/UX Designer\nMission: Crafting Digital Experiences\nStatus: Creative Flow' });
                break;
            case 'ls':
                Object.keys(FILES).forEach(f => {
                    output.push({ type: 'text', content: f });
                });
                break;
            case 'clear':
                setHistory([]);
                setInput('');
                return;
            case 'cat':
                if (args[1] && FILES[args[1] as keyof typeof FILES]) {
                    output.push({ type: 'text', content: FILES[args[1] as keyof typeof FILES] });
                } else if (!args[1]) {
                    output.push({ type: 'error', content: 'Usage: cat [filename]' });
                } else {
                    output.push({ type: 'error', content: `File not found: ${args[1]}` });
                }
                break;
            case 'inspire':
                output.push({ type: 'success', content: 'IGNITING CREATIVE SPARK...' });
                output.push({ type: 'system', content: '[**********] 100% INSPIRED' });
                output.push({ type: 'success', content: 'READY TO CREATE SOMETHING AMAZING.' });
                break;
            case 'game':
            case 'play':
                setGameMode(true);
                output.push({ type: 'system', content: 'Starting Creative Block Breaker...' });
                break;
            default:
                output.push({ type: 'error', content: `Command not found: ${command}. Type 'help' for list.` });
        }

        setHistory(prev => [...prev, { command: trimmed, result: output }]);
        setInput('');
    };

    const closeTerminal = () => {
        setIsOpen(false);
        setGameMode(false);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{
                            opacity: 1,
                            scale: isMinimized ? 0.5 : 1,
                            y: isMinimized ? '40vh' : 0,
                            x: isMinimized ? '40vw' : 0
                        }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={`fixed ${isMinimized ? 'bottom-4 right-4 w-[300px]' : 'inset-0 md:inset-auto md:top-20 md:left-1/2 md:-translate-x-1/2 md:w-[800px] md:h-[600px]'} bg-black/90 border border-primary/50 shadow-[0_0_50px_rgba(var(--primary),0.2)] rounded-lg z-[9999] overflow-hidden flex flex-col font-mono text-sm md:text-base backdrop-blur-md`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-2 bg-primary/10 border-b border-primary/30 handle cursor-move">
                            <div className="flex items-center gap-2 text-primary">
                                <Command size={16} />
                                <span className="font-bold tracking-wider">CREATIVE_CONSOLE</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setIsMinimized(!isMinimized)} className="text-primary/50 hover:text-primary transition-colors">
                                    {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                                </button>
                                <button onClick={closeTerminal} className="text-primary/50 hover:text-red-500 transition-colors">
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-4 overflow-hidden relative">
                            {/* Grid Effect instead of Scanlines for cleaner look */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                            {gameMode ? (
                                <CyberDefenseGame onExit={() => setGameMode(false)} />
                            ) : (
                                <div className="h-full overflow-y-auto font-mono" ref={scrollRef}>
                                    <div className="space-y-4 pb-4">
                                        <div className="text-primary/50">
                                            Welcome to Creative Console.<br />
                                            Explore the hidden layer of design.<br />
                                            Type 'help' to reveal tools.<br />
                                            ----------------------------------------
                                        </div>

                                        {history.map((item, i) => (
                                            <div key={i} className="space-y-1">
                                                <div className="flex items-center gap-2 text-primary">
                                                    <span>➜</span>
                                                    <span className="text-white">{item.command}</span>
                                                </div>
                                                <div className="pl-6 space-y-1">
                                                    {item.result.map((res, j) => (
                                                        <div key={j} className={`${res.type === 'error' ? 'text-red-400' :
                                                            res.type === 'success' ? 'text-green-300' :
                                                                res.type === 'system' ? 'text-blue-300' :
                                                                    'text-primary/80'
                                                            } whitespace-pre-wrap`}>
                                                            {res.content}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Input Line */}
                                    <div className="flex items-center gap-2 text-primary pt-2">
                                        <span>➜</span>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') handleCommand(input);
                                            }}
                                            className="flex-1 bg-transparent border-none outline-none text-white caret-primary"
                                            autoFocus
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hint / Trigger Button */}
            <div
                onClick={() => setIsOpen(prev => !prev)}
                className="fixed bottom-4 right-4 z-50 group cursor-pointer"
            >
                <div className="bg-background/80 backdrop-blur-sm border border-border p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                    <Sparkles size={20} className="text-primary animate-pulse" />
                </div>
                <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground bg-background/90 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Secret Console (Cmd+Shift+X)
                </div>
            </div>
        </>
    );
};

// Mini Game Component
const CyberDefenseGame = ({ onExit }: { onExit: () => void }) => {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [words, setWords] = useState<{ id: number, text: string, x: number, y: number }[]>([]);
    const [input, setInput] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>();
    const lastSpawnTime = useRef<number>(0);

    // Designer-themed words
    const WORD_LIST = ['deadline', 'typo', 'pixel', 'clutter', 'noise', 'bland', 'mess', 'chaos', 'block', 'drift'];

    useEffect(() => {
        const gameLoop = (time: number) => {
            if (gameOver) return;

            // Spawn words
            if (time - lastSpawnTime.current > 2000 - Math.min(score * 10, 1500)) {
                const newWord = {
                    id: Date.now(),
                    text: WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)],
                    x: Math.random() * 80 + 10, // 10% to 90%
                    y: 0
                };
                setWords(prev => [...prev, newWord]);
                lastSpawnTime.current = time;
            }

            // Move words
            setWords(prev => {
                const next = prev.map(w => ({ ...w, y: w.y + 0.2 + (score * 0.01) })); // Speed increases with score

                // Check collision
                if (next.some(w => w.y > 90)) {
                    setGameOver(true);
                }
                return next;
            });

            requestRef.current = requestAnimationFrame(gameLoop);
        };

        requestRef.current = requestAnimationFrame(gameLoop);
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }, [score, gameOver]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInput(val);

        const matchIndex = words.findIndex(w => w.text === val);
        if (matchIndex !== -1) {
            // Hit!
            setWords(prev => prev.filter((_, i) => i !== matchIndex));
            setScore(s => s + 10);
            setInput('');

            // Hit effect (simplified)
            const flash = document.createElement('div');
            flash.className = 'absolute inset-0 bg-primary/20 pointer-events-none z-50';
            containerRef.current?.appendChild(flash);
            setTimeout(() => flash.remove(), 100);
        }
    };

    return (
        <div className="relative h-full w-full flex flex-col items-center justify-center font-mono" ref={containerRef}>
            <div className="absolute top-4 right-4 text-primary text-xl font-bold">SCORE: {score}</div>
            <button onClick={onExit} className="absolute top-4 left-4 text-red-500 border border-red-500 px-2 py-1 text-xs hover:bg-red-500/10">EXIT GAME</button>

            {gameOver ? (
                <div className="text-center space-y-4 bg-black/80 p-8 border border-red-500 rounded z-50">
                    <h2 className="text-4xl text-red-500 font-bold glitch-text">CREATIVE BLOCK</h2>
                    <p className="text-white">Final Score: {score}</p>
                    <button
                        onClick={() => {
                            setWords([]);
                            setScore(0);
                            setGameOver(false);
                            setInput('');
                            lastSpawnTime.current = 0;
                        }}
                        className="bg-red-500 hover:bg-red-600 text-black font-bold px-6 py-2 rounded"
                    >
                        RESTART FLOW
                    </button>
                </div>
            ) : (
                <>
                    {words.map(w => (
                        <div
                            key={w.id}
                            className="absolute text-primary font-bold transition-all duration-100"
                            style={{ left: `${w.x}%`, top: `${w.y}%` }}
                        >
                            {w.text}
                        </div>
                    ))}

                    <div className="absolute bottom-10 w-full max-w-md px-4">
                        <input
                            type="text"
                            value={input}
                            onChange={handleInput}
                            className="w-full bg-black/50 border-2 border-primary text-primary p-2 text-center text-xl outline-none uppercase placeholder-primary/30 rounded"
                            placeholder="BREAK THE BLOCK"
                            autoFocus
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Terminal;
