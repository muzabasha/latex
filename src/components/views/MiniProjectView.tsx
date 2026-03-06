"use client";

import { useState } from "react";
import { LatexEditor } from "@/components/LatexEditor";
import { LatexPreview } from "@/components/LatexPreview";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldAlert, CheckCircle, GraduationCap, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

export function MiniProjectView() {
    const [code, setCode] = useState(`\\documentclass{article}
\\begin{document}
\\title{The Impact of Irrigation Frequency on Maize Yield}
\\author{Your Name}
\\maketitle

\\begin{abstract}
Summarize your findings here.
\\end{abstract}

\\section{Introduction}

\\section{Methodology}

\\section{Results}

\\end{document}`);
    const [isCompiling, setIsCompiling] = useState(false);
    const [checklist, setChecklist] = useState([
        { id: 'title', label: 'Use \\title and \\maketitle', completed: false, regex: /\\title\{.*\}[\s\S]*\\maketitle/ },
        { id: 'abstract', label: 'Include an abstract (\begin{abstract})', completed: false, regex: /\\begin\{abstract\}/ },
        { id: 'sections', label: 'Create 3 separate sections', completed: false, regex: /(\\section\{.*\}){3}/ },
        { id: 'table', label: 'Insert at least one table', completed: false, regex: /\\begin\{table\}/ },
        { id: 'equation', label: 'Include one display-style equation', completed: false, regex: /\\\[|\\begin\{equation\}/ }
    ]);

    const handleCompile = (newCode: string) => {
        setIsCompiling(true);
        setTimeout(() => {
            setCode(newCode);
            setIsCompiling(false);

            const nextChecklist = checklist.map(item => ({
                ...item,
                completed: item.regex.test(newCode)
            }));

            if (nextChecklist.every(t => t.completed) && !checklist.every(t => t.completed)) {
                confetti({
                    particleCount: 200,
                    spread: 90,
                    origin: { y: 0.5 }
                });
            }
            setChecklist(nextChecklist);
        }, 1200);
    };

    return (
        <div className="space-y-12 pb-20">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight outfit-font">Mini Project: 2-Page Article</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    Final project to prove your proficiency. Create a structured research article in LaTeX from scratch.
                </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Progress Sidebar */}
                <div className="lg:col-span-1 border rounded-3xl p-8 bg-card shadow-lg space-y-8 flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-primary">
                            <Star className="w-6 h-6 fill-current" />
                            <h3 className="text-xl font-bold">Grading Checklist</h3>
                        </div>
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Compiler Validation</p>
                        <div className="space-y-4">
                            {checklist.map((item) => (
                                <div key={item.id} className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl transition-all">
                                    <div className="mt-1">
                                        {item.completed ? <CheckCircle className="w-4 h-4 text-green-600" /> : <ShieldAlert className="w-4 h-4 text-slate-300" />}
                                    </div>
                                    <span className={cn("text-xs font-semibold", item.completed ? "text-green-700" : "text-muted-foreground")}>
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {checklist.every(t => t.completed) && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-primary p-6 rounded-2xl shadow-xl text-center space-y-4"
                        >
                            <Trophy className="w-12 h-12 text-white mx-auto" />
                            <div>
                                <h4 className="text-white font-bold text-lg">Congratulations!</h4>
                                <p className="text-xs text-primary-foreground font-medium">You have mastered LaTeX publishing.</p>
                            </div>
                            <button className="bg-white text-primary px-6 py-2 rounded-xl text-sm font-bold shadow-sm hover:scale-105 transition-all">
                                Download Certificate
                            </button>
                        </motion.div>
                    )}
                </div>

                {/* Editor and Preview */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="h-[400px]">
                        <LatexEditor
                            initialCode={code}
                            onCompile={handleCompile}
                            height="350px"
                        />
                    </div>
                    <div className="h-[600px]">
                        <LatexPreview
                            code={code}
                            isCompiling={isCompiling}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
