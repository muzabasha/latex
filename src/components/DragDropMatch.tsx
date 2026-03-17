"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle, CheckCircle, XCircle, RotateCcw, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface MatchPair {
    command: string;
    description: string;
}

interface DragDropMatchProps {
    title: string;
    pairs: MatchPair[];
    agriContext?: string;
}

export function DragDropMatch({ title, pairs, agriContext }: DragDropMatchProps) {
    const [shuffledDescs, setShuffledDescs] = useState(() =>
        [...pairs.map(p => p.description)].sort(() => Math.random() - 0.5)
    );
    const [matches, setMatches] = useState<Record<number, string>>({});
    const [selectedCmd, setSelectedCmd] = useState<number | null>(null);
    const [results, setResults] = useState<Record<number, boolean>>({});
    const [isChecked, setIsChecked] = useState(false);

    const handleCmdClick = (idx: number) => {
        if (isChecked) return;
        setSelectedCmd(idx);
    };

    const handleDescClick = (desc: string) => {
        if (isChecked || selectedCmd === null) return;
        setMatches(prev => ({ ...prev, [selectedCmd]: desc }));
        setSelectedCmd(null);
    };

    const removeMatch = (idx: number) => {
        if (isChecked) return;
        setMatches(prev => {
            const next = { ...prev };
            delete next[idx];
            return next;
        });
    };

    const checkAnswers = () => {
        const newResults: Record<number, boolean> = {};
        pairs.forEach((pair, idx) => {
            newResults[idx] = matches[idx] === pair.description;
        });
        setResults(newResults);
        setIsChecked(true);
        const allCorrect = Object.values(newResults).every(v => v);
        if (allCorrect) {
            confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
        }
    };

    const reset = () => {
        setMatches({});
        setResults({});
        setIsChecked(false);
        setSelectedCmd(null);
        setShuffledDescs([...pairs.map(p => p.description)].sort(() => Math.random() - 0.5));
    };

    const correctCount = Object.values(results).filter(Boolean).length;
    const usedDescs = new Set(Object.values(matches));

    return (
        <div className="bg-linear-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500 rounded-xl text-white">
                        <Shuffle className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">{title}</h3>
                        {agriContext && <p className="text-xs text-amber-700 italic">{agriContext}</p>}
                    </div>
                </div>
                <button onClick={reset} className="p-2 hover:bg-amber-200 rounded-lg transition-colors" title="Reset">
                    <RotateCcw className="w-4 h-4 text-amber-700" />
                </button>
            </div>

            <p className="text-sm text-amber-800 font-medium">
                Click a command, then click its matching description. Match all pairs correctly.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Commands Column */}
                <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">LaTeX Commands</p>
                    {pairs.map((pair, idx) => (
                        <button
                            key={idx}
                            onClick={() => matches[idx] ? removeMatch(idx) : handleCmdClick(idx)}
                            className={cn(
                                "w-full text-left p-4 rounded-xl border-2 transition-all font-mono text-sm",
                                selectedCmd === idx && "border-amber-500 bg-amber-100 scale-[1.02] shadow-md",
                                matches[idx] && !isChecked && "border-blue-300 bg-blue-50",
                                isChecked && results[idx] && "border-green-500 bg-green-50",
                                isChecked && !results[idx] && "border-red-400 bg-red-50",
                                !selectedCmd && !matches[idx] && !isChecked && "border-amber-200 bg-white hover:border-amber-400"
                            )}
                        >
                            <div className="flex items-center justify-between">
                                <code className="font-bold text-slate-800">{pair.command}</code>
                                {matches[idx] && (
                                    <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-sans font-bold">
                                        matched
                                    </span>
                                )}
                                {isChecked && (results[idx] ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-500" />)}
                            </div>
                            {matches[idx] && (
                                <p className="text-xs text-slate-500 mt-1 font-sans italic truncate">{matches[idx]}</p>
                            )}
                        </button>
                    ))}
                </div>

                {/* Descriptions Column */}
                <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">Descriptions</p>
                    {shuffledDescs.map((desc, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleDescClick(desc)}
                            disabled={usedDescs.has(desc) || selectedCmd === null}
                            className={cn(
                                "w-full text-left p-4 rounded-xl border-2 transition-all text-sm",
                                usedDescs.has(desc) && "opacity-40 cursor-not-allowed border-slate-200 bg-slate-50",
                                selectedCmd !== null && !usedDescs.has(desc) && "border-amber-300 bg-white hover:border-amber-500 hover:bg-amber-50 cursor-pointer",
                                selectedCmd === null && !usedDescs.has(desc) && "border-slate-200 bg-white"
                            )}
                        >
                            {desc}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between pt-4">
                {!isChecked ? (
                    <button
                        onClick={checkAnswers}
                        disabled={Object.keys(matches).length !== pairs.length}
                        className={cn(
                            "px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2",
                            Object.keys(matches).length === pairs.length
                                ? "bg-amber-500 text-white hover:bg-amber-600 shadow-lg"
                                : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        )}
                    >
                        <Zap className="w-4 h-4" /> Check Answers
                    </button>
                ) : (
                    <div className="flex items-center gap-4">
                        <span className={cn(
                            "text-sm font-bold px-4 py-2 rounded-full",
                            correctCount === pairs.length ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                        )}>
                            {correctCount}/{pairs.length} correct
                        </span>
                        <button onClick={reset} className="text-sm font-bold text-amber-600 hover:underline">Try Again</button>
                    </div>
                )}
                <span className="text-xs text-amber-600 font-medium">{Object.keys(matches).length}/{pairs.length} matched</span>
            </div>
        </div>
    );
}
