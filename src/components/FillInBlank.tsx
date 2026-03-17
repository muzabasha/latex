"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, CheckCircle, XCircle, RotateCcw, Lightbulb, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface BlankExercise {
    id: number;
    prompt: string;
    codeTemplate: string;
    blanks: { placeholder: string; answer: string; hint: string }[];
    explanation: string;
    agriExample?: string;
}

interface FillInBlankProps {
    title: string;
    exercises: BlankExercise[];
}

export function FillInBlank({ title, exercises }: FillInBlankProps) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showHints, setShowHints] = useState<Record<string, boolean>>({});
    const [isChecked, setIsChecked] = useState(false);
    const [results, setResults] = useState<Record<string, boolean>>({});

    const current = exercises[currentIdx];

    const updateAnswer = (placeholder: string, value: string) => {
        setAnswers(prev => ({ ...prev, [placeholder]: value }));
    };

    const toggleHint = (placeholder: string) => {
        setShowHints(prev => ({ ...prev, [placeholder]: !prev[placeholder] }));
    };

    const checkAnswers = () => {
        const newResults: Record<string, boolean> = {};
        current.blanks.forEach(blank => {
            const userAns = (answers[blank.placeholder] || "").trim().toLowerCase();
            const correct = blank.answer.toLowerCase();
            newResults[blank.placeholder] = userAns === correct || userAns === correct.replace(/\\/g, "");
        });
        setResults(newResults);
        setIsChecked(true);
        if (Object.values(newResults).every(Boolean)) {
            confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 } });
        }
    };

    const nextExercise = () => {
        if (currentIdx < exercises.length - 1) {
            setCurrentIdx(currentIdx + 1);
            setAnswers({});
            setShowHints({});
            setIsChecked(false);
            setResults({});
        }
    };

    const reset = () => {
        setAnswers({});
        setShowHints({});
        setIsChecked(false);
        setResults({});
    };

    const renderCodeWithBlanks = () => {
        let code = current.codeTemplate;
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;

        current.blanks.forEach((blank, idx) => {
            const placeholderIdx = code.indexOf(blank.placeholder, lastIndex);
            if (placeholderIdx === -1) return;

            parts.push(
                <span key={`text-${idx}`} className="text-slate-400">{code.slice(lastIndex, placeholderIdx)}</span>
            );

            parts.push(
                <span key={`blank-${idx}`} className="inline-flex items-center mx-1">
                    <input
                        type="text"
                        value={answers[blank.placeholder] || ""}
                        onChange={(e) => updateAnswer(blank.placeholder, e.target.value)}
                        disabled={isChecked}
                        placeholder="???"
                        className={cn(
                            "w-32 px-2 py-1 rounded-md text-center font-mono text-sm border-2 outline-none transition-all",
                            isChecked && results[blank.placeholder] && "border-green-500 bg-green-900/30 text-green-300",
                            isChecked && !results[blank.placeholder] && "border-red-500 bg-red-900/30 text-red-300",
                            !isChecked && "border-amber-400 bg-amber-900/20 text-amber-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-400/30"
                        )}
                    />
                    <button
                        onClick={() => toggleHint(blank.placeholder)}
                        className="ml-1 p-1 hover:bg-white/10 rounded transition-colors"
                        title="Show hint"
                    >
                        <Lightbulb className="w-3 h-3 text-amber-400" />
                    </button>
                </span>
            );

            lastIndex = placeholderIdx + blank.placeholder.length;
        });

        parts.push(<span key="text-end" className="text-slate-400">{code.slice(lastIndex)}</span>);
        return parts;
    };

    const allFilled = current.blanks.every(b => (answers[b.placeholder] || "").trim().length > 0);
    const correctCount = Object.values(results).filter(Boolean).length;

    return (
        <div className="bg-linear-to-br from-violet-50 to-indigo-50 border-2 border-violet-200 rounded-3xl p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-violet-500 rounded-xl text-white">
                        <PenLine className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">{title}</h3>
                        <p className="text-xs text-violet-600">Exercise {currentIdx + 1} of {exercises.length}</p>
                    </div>
                </div>
                <button onClick={reset} className="p-2 hover:bg-violet-200 rounded-lg transition-colors">
                    <RotateCcw className="w-4 h-4 text-violet-700" />
                </button>
            </div>

            <p className="text-sm font-medium text-violet-900">{current.prompt}</p>

            {current.agriExample && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs text-green-800 italic">
                    🌾 Agriculture Context: {current.agriExample}
                </div>
            )}

            {/* Code with blanks */}
            <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap overflow-x-auto">
                {renderCodeWithBlanks()}
            </div>

            {/* Hints */}
            <AnimatePresence>
                {current.blanks.map((blank, idx) => (
                    showHints[blank.placeholder] && (
                        <motion.div
                            key={`hint-${idx}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800"
                        >
                            <span className="font-bold">Hint for blank {idx + 1}:</span> {blank.hint}
                        </motion.div>
                    )
                ))}
            </AnimatePresence>

            {/* Check result */}
            {isChecked && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                        "rounded-xl p-4 text-sm",
                        correctCount === current.blanks.length ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"
                    )}
                >
                    <p className="font-bold mb-1">
                        {correctCount === current.blanks.length ? "All correct!" : `${correctCount}/${current.blanks.length} correct`}
                    </p>
                    <p className="text-xs italic">{current.explanation}</p>
                    {!Object.values(results).every(Boolean) && (
                        <div className="mt-2 space-y-1">
                            {current.blanks.map((blank, idx) => (
                                !results[blank.placeholder] && (
                                    <p key={idx} className="text-xs">
                                        Blank {idx + 1}: Expected <code className="bg-white px-1 rounded font-bold">{blank.answer}</code>
                                    </p>
                                )
                            ))}
                        </div>
                    )}
                </motion.div>
            )}

            <div className="flex items-center justify-between pt-2">
                {!isChecked ? (
                    <button
                        onClick={checkAnswers}
                        disabled={!allFilled}
                        className={cn(
                            "px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2",
                            allFilled ? "bg-violet-500 text-white hover:bg-violet-600 shadow-lg" : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        )}
                    >
                        <CheckCircle className="w-4 h-4" /> Check Code
                    </button>
                ) : (
                    <div className="flex items-center gap-3">
                        <button onClick={reset} className="text-sm font-bold text-violet-600 hover:underline">Retry</button>
                        {currentIdx < exercises.length - 1 && (
                            <button
                                onClick={nextExercise}
                                className="px-5 py-2 bg-violet-500 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-violet-600"
                            >
                                Next <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}
                <div className="h-1.5 w-24 bg-violet-200 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 transition-all" style={{ width: `${((currentIdx + 1) / exercises.length) * 100}%` }} />
                </div>
            </div>
        </div>
    );
}
