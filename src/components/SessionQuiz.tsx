"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, CheckCircle, XCircle, ArrowRight, RotateCcw, MessageSquareQuote, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface Question {
    id: number;
    q: string;
    options: string[];
    ans: number;
    explanation?: string;
}

interface SessionQuizProps {
    title: string;
    questions: Question[];
}

export function SessionQuiz({ title, questions }: SessionQuizProps) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    const handleSelect = (idx: number) => {
        if (selected !== null) return;
        setSelected(idx);
        const correct = idx === questions[currentIdx].ans;
        setIsCorrect(correct);
        if (correct) setScore(score + 1);
        setShowExplanation(true);
    };

    const nextQuestion = () => {
        if (currentIdx < questions.length - 1) {
            setCurrentIdx(currentIdx + 1);
            setSelected(null);
            setIsCorrect(null);
            setShowExplanation(false);
        } else {
            setIsFinished(true);
            if (score >= questions.length * 0.7) {
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
        setShowExplanation(false);
    };

    return (
        <section className="py-16 space-y-12">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
                    <HelpCircle className="w-4 h-4" /> Interactive Feedback
                </div>
                <h2 className="text-4xl font-extrabold outfit-font">{title}</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Let's test your understanding of this session. We've prepared 15 questions to ensure you've mastered the core concepts.
                </p>
            </div>

            <div className="max-w-4xl mx-auto w-full px-4">
                <AnimatePresence mode="wait">
                    {!isFinished ? (
                        <motion.div
                            key={currentIdx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white border-2 border-slate-100 rounded-[3rem] p-8 md:p-12 shadow-xl space-y-8 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />

                            <div className="flex items-center justify-between relative z-10">
                                <div className="text-sm font-bold text-primary uppercase tracking-tighter">
                                    Question {currentIdx + 1} of {questions.length}
                                </div>
                                <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-500"
                                        style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold leading-tight relative z-10">{questions[currentIdx].q}</h3>

                            <div className="grid md:grid-cols-2 gap-4 relative z-10">
                                {questions[currentIdx].options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSelect(i)}
                                        disabled={selected !== null}
                                        className={cn(
                                            "group p-6 rounded-2xl border-2 text-left font-medium transition-all flex items-center justify-between",
                                            selected === null ? "hover:border-primary hover:bg-primary/5 border-slate-100 bg-slate-50/50" :
                                                i === questions[currentIdx].ans ? "border-green-500 bg-green-50 text-green-900 shadow-inner shadow-green-100" :
                                                    selected === i ? "border-red-500 bg-red-50 text-red-900" : "border-slate-100 opacity-50 bg-slate-50/20"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold",
                                                selected === null ? "bg-white border" :
                                                    i === questions[currentIdx].ans ? "bg-green-500 text-white" :
                                                        selected === i ? "bg-red-500 text-white" : "bg-slate-100 text-slate-400"
                                            )}>
                                                {String.fromCharCode(65 + i)}
                                            </div>
                                            <span>{opt}</span>
                                        </div>
                                        {selected !== null && i === questions[currentIdx].ans && <CheckCircle className="w-5 h-5 text-green-600" />}
                                        {selected === i && i !== questions[currentIdx].ans && <XCircle className="w-5 h-5 text-red-600" />}
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence>
                                {showExplanation && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden"
                                    >
                                        <div className="flex gap-3">
                                            <MessageSquareQuote className="w-6 h-6 text-primary shrink-0" />
                                            <div className="space-y-1">
                                                <p className="text-xs font-bold text-primary uppercase tracking-widest">Scientific Insight:</p>
                                                <p className="text-sm text-slate-300 leading-relaxed italic">
                                                    {questions[currentIdx].explanation || "Great job! This concept is fundamental to mastering LaTeX structure."}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {selected !== null && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-end pt-4"
                                >
                                    <button
                                        onClick={nextQuestion}
                                        className="bg-primary hover:shadow-primary/20 text-white px-10 py-4 rounded-3xl font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition-all text-sm group"
                                    >
                                        {currentIdx === questions.length - 1 ? "Finish Assessment" : "Next Challenge"}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-slate-950 text-white rounded-[4rem] p-12 md:p-20 shadow-2xl space-y-10 text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent" />

                            <div className="space-y-4">
                                <Trophy className="w-20 h-20 text-amber-400 mx-auto" />
                                <h2 className="text-5xl font-extrabold outfit-font tracking-tight">Assessment Complete!</h2>
                                <p className="text-slate-400 text-lg">You've successfully navigated the challenges of this module.</p>
                            </div>

                            <div className="bg-white/5 rounded-3xl p-10 border border-white/10 inline-block mb-8">
                                <div className="text-7xl font-bold bg-clip-text text-transparent bg-linear-to-br from-primary to-blue-400">
                                    {score} <span className="text-3xl text-slate-500 font-normal">/ {questions.length}</span>
                                </div>
                                <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                                    {score === questions.length ? "Perfect Mastery" :
                                        score >= questions.length * 0.8 ? "Advanced Proficiency" : "Core Competence Achieved"}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={restart}
                                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-5 rounded-2xl font-bold transition-all border border-white/10"
                                >
                                    <RotateCcw className="w-5 h-5" /> Retake Assessment
                                </button>
                                <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-xl shadow-primary/30">
                                    Continue to Next Module <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
