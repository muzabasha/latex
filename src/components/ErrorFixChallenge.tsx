"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bug, CheckCircle, XCircle, RotateCcw, Lightbulb, ArrowRight, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface ErrorChallenge {
    id: number;
    title: string;
    brokenCode: string;
    fixedCode: string;
    errorMessage: string;
    hint: string;
    explanation: string;
}

interface ErrorFixChallengeProps {
    title: string;
    challenges: ErrorChallenge[];
}

export function ErrorFixChallenge({ title, challenges }: ErrorFixChallengeProps) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [userCode, setUserCode] = useState(challenges[0].brokenCode);
    const [showHint, setShowHint] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const current = challenges[currentIdx];

    const normalize = (s: string) => s.replace(/\s+/g, " ").trim();

    const checkFix = () => {
        const correct = normalize(userCode) === normalize(current.fixedCode);
        setIsCorrect(correct);
        setIsChecked(true);
        if (correct) confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 } });
    };

    const nextChallenge = () => {
        if (currentIdx < challenges.length - 1) {
            const next = currentIdx + 1;
            setCurrentIdx(next);
            setUserCode(challenges[next].brokenCode);
            setShowHint(false);
            setIsChecked(false);
            setIsCorrect(false);
        }
    };

    const reset = () => {
        setUserCode(current.brokenCode);
        setShowHint(false);
        setIsChecked(false);
        setIsCorrect(false);
    };

    return (
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-3xl p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500 rounded-xl text-white">
                        <Bug className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">{title}</h3>
                        <p className="text-xs text-red-600">Bug {currentIdx + 1} of {challenges.length}: {current.title}</p>
                    </div>
                </div>
                <button onClick={reset} className="p-2 hover:bg-red-200 rounded-lg transition-colors">
                    <RotateCcw className="w-4 h-4 text-red-700" />
                </button>
            </div>

            {/* Error message */}
            <div className="bg-red-900 text-red-200 rounded-xl p-4 font-mono text-xs flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                    <p className="font-bold text-red-300 mb-1">Compilation Error:</p>
                    <p>{current.errorMessage}</p>
                </div>
            </div>

            {/* Editable code */}
            <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                disabled={isChecked && isCorrect}
                className="w-full h-40 bg-slate-900 text-slate-200 font-mono text-sm p-4 rounded-2xl border-2 border-slate-700 outline-none focus:border-amber-400 resize-none"
                spellCheck={false}
            />

            {showHint && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 flex items-start gap-2"
                >
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{current.hint}</span>
                </motion.div>
            )}

            {isChecked && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                        "rounded-xl p-4 text-sm",
                        isCorrect ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"
                    )}
                >
                    <div className="flex items-center gap-2 mb-1">
                        {isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        <span className="font-bold">{isCorrect ? "Bug squashed!" : "Not quite right..."}</span>
                    </div>
                    <p className="text-xs italic">{current.explanation}</p>
                </motion.div>
            )}

            <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                    {!isChecked ? (
                        <>
                            <button onClick={checkFix} className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 shadow-lg flex items-center gap-2">
                                <Bug className="w-4 h-4" /> Test Fix
                            </button>
                            <button onClick={() => setShowHint(!showHint)} className="text-sm font-bold text-amber-600 hover:underline flex items-center gap-1">
                                <Lightbulb className="w-3 h-3" /> {showHint ? "Hide" : "Show"} Hint
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            {!isCorrect && <button onClick={reset} className="text-sm font-bold text-red-600 hover:underline">Reset & Retry</button>}
                            {currentIdx < challenges.length - 1 && (
                                <button onClick={nextChallenge} className="px-5 py-2 bg-red-500 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-red-600">
                                    Next Bug <ArrowRight className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
                <div className="h-1.5 w-24 bg-red-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 transition-all" style={{ width: `${((currentIdx + 1) / challenges.length) * 100}%` }} />
                </div>
            </div>
        </div>
    );
}
