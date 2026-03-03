"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, CheckCircle, XCircle, ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface Question {
    id: number;
    q: string;
    options: string[];
    ans: number;
}

const questions: Question[] = [
    {
        id: 1,
        q: "What is the primary extension of a LaTeX source file?",
        options: [".pdf", ".tex", ".doc", ".latex"],
        ans: 1
    },
    {
        id: 2,
        q: "Which command is used to choose the document blueprint (article, book, etc.)?",
        options: ["\\begin{document}", "\\usepackage{...}", "\\documentclass{...}", "\\title{...}"],
        ans: 2
    },
    {
        id: 3,
        q: "How do you start an inline equation?",
        options: ["Using \\begin{math}", "Using $$", "Using single $", "Using \\equation"],
        ans: 2
    },
    {
        id: 4,
        q: "Which package is essential for handling images?",
        options: ["amsmath", "graphicx", "tabularx", "hyperref"],
        ans: 1
    },
    {
        id: 5,
        q: "What is the purpose of the 'BibTeX' file?",
        options: ["To store image data", "To manage bibliographic references", "To compile the PDF", "To format headers"],
        ans: 1
    }
];

export function QuizView() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const handleSelect = (idx: number) => {
        if (selected !== null) return;
        setSelected(idx);
        const correct = idx === questions[currentIdx].ans;
        setIsCorrect(correct);
        if (correct) setScore(score + 1);
    };

    const nextQuestion = () => {
        if (currentIdx < questions.length - 1) {
            setCurrentIdx(currentIdx + 1);
            setSelected(null);
            setIsCorrect(null);
        } else {
            setIsFinished(true);
            if (score >= 4) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }
    };

    const restart = () => {
        setCurrentIdx(0);
        setSelected(null);
        setIsCorrect(null);
        setScore(0);
        setIsFinished(false);
    };

    return (
        <div className="space-y-12 pb-20">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight outfit-font">Knowledge Check</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    Test your LaTeX skills. Aim for a perfect score!
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                <AnimatePresence mode="wait">
                    {!isFinished ? (
                        <motion.div
                            key={currentIdx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-card border-2 border-slate-100 rounded-[3rem] p-12 shadow-xl space-y-10"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-tighter">
                                    <HelpCircle className="w-5 h-5" /> Question {currentIdx + 1} of {questions.length}
                                </div>
                                <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-500"
                                        style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold leading-tight">{questions[currentIdx].q}</h2>

                            <div className="grid gap-4">
                                {questions[currentIdx].options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSelect(i)}
                                        disabled={selected !== null}
                                        className={cn(
                                            "group p-6 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between",
                                            selected === null ? "hover:border-primary hover:bg-primary/5 border-slate-100" :
                                                i === questions[currentIdx].ans ? "border-green-500 bg-green-50 text-green-900" :
                                                    selected === i ? "border-red-500 bg-red-50 text-red-900" : "border-slate-100 opacity-50"
                                        )}
                                    >
                                        <span>{opt}</span>
                                        {selected !== null && i === questions[currentIdx].ans && <CheckCircle className="w-6 h-6 text-green-600" />}
                                        {selected === i && i !== questions[currentIdx].ans && <XCircle className="w-6 h-6 text-red-600" />}
                                    </button>
                                ))}
                            </div>

                            {selected !== null && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex justify-end"
                                >
                                    <button
                                        onClick={nextQuestion}
                                        className="bg-primary hover:shadow-primary/20 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
                                    >
                                        {currentIdx === questions.length - 1 ? "Finish Quiz" : "Next Question"} <ArrowRight className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-slate-900 text-white rounded-[3rem] p-16 shadow-2xl space-y-8 text-center"
                        >
                            <h2 className="text-5xl font-extrabold mb-4">Quiz Complete!</h2>
                            <div className="flex flex-col items-center gap-4">
                                <div className="text-7xl font-bold text-primary">{score} / {questions.length}</div>
                                <p className="text-xl text-slate-400">
                                    {score === questions.length ? "Master! You are ready for publication." :
                                        score >= 3 ? "Great job! High accuracy achieved." : "Not bad, but a quick review might help."}
                                </p>
                            </div>

                            <div className="flex gap-4 justify-center pt-8">
                                <button
                                    onClick={restart}
                                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-2xl font-bold transition-all"
                                >
                                    <RotateCcw className="w-5 h-5" /> Retake Quiz
                                </button>
                                <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-primary/20">
                                    Get Certificate
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
