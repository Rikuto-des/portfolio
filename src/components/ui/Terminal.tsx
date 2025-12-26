import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Command, Minimize2, Maximize2, Terminal as TerminalIcon } from 'lucide-react';

type CommandResult = {
    type: 'text' | 'error' | 'success' | 'system';
    content: string;
};

type HistoryItem = {
    command: string;
    result: CommandResult[];
};

const FILES = {
    'manifesto.txt': 'デザインは「どう見えるか」ではなく、「どう機能するか」だ。\nユーザーの無意識に触れる体験を創造する。',
    'ideas.md': '1. 新しいタイポグラフィの探求\n2. 色彩心理学の応用\n3. 没入感のあるインタラクション',
    'profile.json': '{\n  "名前": "Rikuto",\n  "役割": "UI/UXデザイナー",\n  "スキル": ["Design", "Code", "Art"]\n}',
};

const COMMANDS = [
    { cmd: 'help', desc: '利用可能なツール一覧を表示' },
    { cmd: 'whoami', desc: 'プロフィールを表示' },
    { cmd: 'ls', desc: '制作ノートやアイデアを表示' },
    { cmd: 'cat [file]', desc: 'ファイルの内容を閲覧' },
    { cmd: 'clear', desc: 'ログを消去' },
    { cmd: 'inspire', desc: 'クリエイティブな刺激を受ける' },
    { cmd: 'game', desc: '「ブロック崩し」を開始してリフレッシュ' },
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
                output.push({ type: 'system', content: '◆ CREATIVE TOOLS ◆' });
                COMMANDS.forEach(c => {
                    output.push({ type: 'text', content: `  ${c.cmd.padEnd(12)} : ${c.desc}` });
                });
                break;
            case 'whoami':
                output.push({ type: 'success', content: 'Role: UI/UX Designer\nMission: デジタル体験の革新\nStatus: クリエイティブフロー状態' });
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
                    output.push({ type: 'error', content: `ファイルが見つかりません: ${args[1]}` });
                }
                break;
            case 'inspire':
                output.push({ type: 'success', content: 'インスピレーションを収集しています...' });
                output.push({ type: 'system', content: '[✨✨✨✨✨✨✨✨✨✨] 100% 完了' });
                output.push({ type: 'success', content: '素晴らしいアイデアが降りてきました！' });
                break;
            case 'game':
            case 'play':
                setGameMode(true);
                output.push({ type: 'system', content: 'クリエイティブ・ブロック・ブレイカーを起動中...' });
                break;
            default:
                output.push({ type: 'error', content: `コマンドが見つかりません: ${command}。'help' で一覧を確認できます。` });
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
                        className={`fixed ${isMinimized ? 'bottom-4 right-4 w-[300px]' : 'inset-0 md:inset-auto md:top-20 md:left-1/2 md:-translate-x-1/2 md:w-[800px] md:h-[600px]'} bg-zinc-950/95 border border-primary/30 shadow-[0_0_50px_rgba(var(--primary),0.1)] rounded-xl z-[9999] overflow-hidden flex flex-col font-mono text-sm md:text-base backdrop-blur-xl`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10 handle cursor-move">
                            <div className="flex items-center gap-2 text-primary">
                                <Command size={18} />
                                <span className="font-bold tracking-wider text-xs md:text-sm">CREATIVE_CONSOLE</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setIsMinimized(!isMinimized)} className="text-white/50 hover:text-white transition-colors">
                                    {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                                </button>
                                <button onClick={closeTerminal} className="text-white/50 hover:text-red-400 transition-colors">
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 overflow-hidden relative">
                            {/* Grid Background */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                            {gameMode ? (
                                <CyberDefenseGame onExit={() => setGameMode(false)} />
                            ) : (
                                <div className="h-full overflow-y-auto font-mono scrollbar-hide" ref={scrollRef}>
                                    <div className="space-y-4 pb-4">
                                        <div className="text-primary/70 leading-relaxed">
                                            Welcome to Creative Console.<br />
                                            隠されたデザイン領域へようこそ。<br />
                                            'help' と入力してツールを表示してください。<br />
                                            ----------------------------------------
                                        </div>

                                        {history.map((item, i) => (
                                            <div key={i} className="space-y-2">
                                                <div className="flex items-center gap-2 text-primary">
                                                    <span>➜</span>
                                                    <span className="text-white font-medium">{item.command}</span>
                                                </div>
                                                <div className="pl-6 space-y-1">
                                                    {item.result.map((res, j) => (
                                                        <div key={j} className={`${res.type === 'error' ? 'text-red-400' :
                                                            res.type === 'success' ? 'text-emerald-400' :
                                                                res.type === 'system' ? 'text-blue-400' :
                                                                    'text-zinc-400'
                                                            } whitespace-pre-wrap leading-relaxed`}>
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
                                            className="flex-1 bg-transparent border-none outline-none text-white placeholder-zinc-700 caret-primary"
                                            placeholder="コマンドを入力..."
                                            autoFocus
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Float Button Trigger */}
            <div
                onClick={() => setIsOpen(prev => !prev)}
                className="fixed bottom-6 right-6 z-[80] group cursor-pointer"
            >
                <div className="bg-zinc-900/90 backdrop-blur border border-white/10 p-3 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group-hover:border-primary/50">
                    <TerminalIcon size={24} className="text-primary group-hover:animate-pulse" />
                </div>
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 text-xs font-medium text-white bg-zinc-900/90 px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-lg border border-white/10">
                    Open Console (Cmd+Shift+X)
                </div>
            </div>
        </>
    );
};

// --- Mini Game Logic ---

const CyberDefenseGame = ({ onExit }: { onExit: () => void }) => {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [words, setWords] = useState<{ id: number, text: string, x: number, y: number }[]>([]);
    const [input, setInput] = useState('');

    // Refs for stable access in game loop
    const stateRef = useRef({ score, gameOver, words });
    const containerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    const lastSpawnTimeRef = useRef<number>(0);

    const WORD_LIST = ['DEADLINE', 'TYPO', 'BUG', 'NOISE', 'ERROR', 'FIX', 'RUSH', 'TODO', 'LACK', 'NULL'];

    // Update ref when state changes
    useEffect(() => {
        stateRef.current = { score, gameOver, words };
    }, [score, gameOver, words]);

    useEffect(() => {
        lastTimeRef.current = performance.now();
        lastSpawnTimeRef.current = performance.now();

        const loop = (time: number) => {
            if (stateRef.current.gameOver) return;

            const delta = time - lastTimeRef.current;
            lastTimeRef.current = time;

            // Spawn logic
            const spawnInterval = Math.max(500, 2000 - (stateRef.current.score * 20));
            if (time - lastSpawnTimeRef.current > spawnInterval) {
                const newWord = {
                    id: Date.now(),
                    text: WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)],
                    x: 10 + Math.random() * 80, // 10% - 90%
                    y: 0
                };

                // Use functional update to ensure we don't need 'words' dependency
                setWords(prev => [...prev, newWord]);
                lastSpawnTimeRef.current = time;
            }

            // Move logic
            setWords(prev => {
                const speed = 0.05 + (stateRef.current.score * 0.002); // Base speed + difficulty
                const nextWords = prev.map(w => ({
                    ...w,
                    y: w.y + (speed * delta * 0.06) // Adjust for frame rate
                }));

                // Check collisions
                if (nextWords.some(w => w.y > 90)) {
                    setGameOver(true);
                }
                return nextWords;
            });

            requestRef.current = requestAnimationFrame(loop);
        };

        requestRef.current = requestAnimationFrame(loop);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []); // Empty dependency array ensures loop setup runs once

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.toUpperCase();
        setInput(val);

        const matchIndex = words.findIndex(w => w.text === val);
        if (matchIndex !== -1) {
            // Hit!
            const hitWord = words[matchIndex];
            setWords(prev => prev.filter((_, i) => i !== matchIndex));
            setScore(s => s + 10);
            setInput('');

            // Visual Effect
            if (containerRef.current) {
                const flash = document.createElement('div');
                flash.className = 'absolute w-full h-full bg-primary/20 pointer-events-none z-10 transition-opacity duration-300';
                flash.style.left = `${hitWord.x}%`;
                flash.style.top = `${hitWord.y}%`;
                flash.style.width = '100px';
                flash.style.height = '30px';
                flash.style.transform = 'translate(-50%, -50%)';

                containerRef.current.appendChild(flash);
                setTimeout(() => flash.remove(), 200);
            }
        }
    };

    return (
        <div className="relative h-full w-full flex flex-col items-center justify-center font-mono select-none" ref={containerRef}>
            <div className="absolute top-6 right-6 text-primary text-2xl font-bold tracking-widest drop-shadow-md">
                SCORE: {score}
            </div>

            <button
                onClick={onExit}
                className="absolute top-6 left-6 text-zinc-500 border border-zinc-700 px-3 py-1 text-xs rounded hover:bg-zinc-800 hover:text-white transition-colors"
            >
                EXIT GAME
            </button>

            {gameOver ? (
                <div className="relative z-50 text-center space-y-6 bg-zinc-900/95 p-10 border border-red-500/30 rounded-2xl shadow-2xl backdrop-blur-xl max-w-sm mx-4">
                    <h2 className="text-4xl text-red-500 font-bold tracking-tighter">CREATIVE BLOCK</h2>
                    <div className="space-y-2">
                        <p className="text-white/60 text-sm uppercase tracking-widest">Final Score</p>
                        <p className="text-6xl font-bold text-white">{score}</p>
                    </div>
                    <button
                        onClick={() => {
                            setWords([]);
                            setScore(0);
                            setGameOver(false);
                            setInput('');
                            lastTimeRef.current = performance.now();
                            lastSpawnTimeRef.current = performance.now();
                        }}
                        className="w-full bg-primary hover:bg-primary/90 text-black font-bold px-6 py-3 rounded-lg transition-transform active:scale-95"
                    >
                        RESTART CHALLENGE
                    </button>
                </div>
            ) : (
                <>
                    {words.map(w => (
                        <div
                            key={w.id}
                            className="absolute text-primary font-bold text-lg tracking-wider drop-shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                            style={{ left: `${w.x}%`, top: `${w.y}%`, transform: 'translateX(-50%)' }}
                        >
                            {w.text}
                        </div>
                    ))}

                    <div className="absolute bottom-12 w-full max-w-md px-6">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={handleInput}
                                className="w-full bg-black/40 border border-primary/30 text-primary p-4 text-center text-xl outline-none uppercase placeholder-primary/20 rounded-xl backdrop-blur focus:border-primary focus:bg-black/60 transition-all shadow-lg"
                                placeholder="TYPE TO BREAK"
                                autoFocus
                            />
                            <div className="absolute inset-0 rounded-xl bg-primary/5 pointer-events-none animate-pulse" />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Terminal;
