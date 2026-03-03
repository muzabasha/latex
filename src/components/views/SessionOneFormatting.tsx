"use client";

import { useState } from "react";
import { LatexEditor } from "@/components/LatexEditor";
import { LatexPreview } from "@/components/LatexPreview";
import { motion } from "framer-motion";
import { CaseUpper, Bold, Italic, CheckCircle, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

export function SessionOneFormatting() {
    const [code, setCode] = useState(`\\documentclass{article}

\\begin{document}
\\section{Introduction to Soil Science}
The research focuses on \\textbf{nutrient density} in clay soils.

\\subsection{Objective}
Understand the \\textit{impact of pH levels} on growth rates.

\\begin{itemize}
    \\item Clay Soil
    \\item Sandy Soil
    \\item Loam Soil
\\end{itemize}
\\end{document}`);
    const [isCompiling, setIsCompiling] = useState(false);

    const handleCompile = (newCode: string) => {
        setIsCompiling(true);
        setTimeout(() => {
            setCode(newCode);
            setIsCompiling(false);
        }, 1000);
    };

    const formattingCommands = [
        { cmd: "\\section{...}", icon: <CaseUpper className="w-4 h-4" />, label: "Header 1", color: "bg-blue-500" },
        { cmd: "\\subsection{...}", icon: <LayoutGrid className="w-4 h-4" />, label: "Header 2", color: "bg-cyan-500" },
        { cmd: "\\textbf{...}", icon: <Bold className="w-4 h-4" />, label: "Bold Text", color: "bg-indigo-500" },
        { cmd: "\\textit{...}", icon: <Italic className="w-4 h-4" />, label: "Italic Text", color: "bg-violet-500" },
    ];

    return (
        <div className="space-y-12 pb-20">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight outfit-font">Module 4: Sections & Formatting</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    Architecting your thoughts. No more manual numbering. Just write, and LaTeX handles the hierarchy.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {formattingCommands.map((cmd, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -4 }}
                        className="bg-card border rounded-2xl p-6 shadow-sm flex items-center gap-4 group"
                    >
                        <div className={cn("p-3 rounded-xl text-white shadow-lg", cmd.color)}>
                            {cmd.icon}
                        </div>
                        <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase opacity-70 mb-1">{cmd.label}</p>
                            <code className="text-sm font-mono font-bold text-primary">{cmd.cmd}</code>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-slate-900 text-slate-100 rounded-3xl p-10 space-y-6 shadow-2xl overflow-hidden relative group">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 scale-150 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="space-y-4 max-w-lg">
                        <h2 className="text-3xl font-bold">The Magic of Lists</h2>
                        <p className="text-slate-400 leading-relaxed italic">
                            &quot;Unlike Word, LaTeX lists don&apos;t &apos;jump&apos; when you add a new item. They are perfectly aligned, every time.&quot;
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center text-xs">1</div>
                                <span className="text-sm"><code>{"\\begin{itemize}"}</code> — Start the list</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center text-xs">2</div>
                                <span className="text-sm"><code>{"\\item"}</code> — Add a bullet point</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center text-xs">3</div>
                                <span className="text-sm"><code>{"\\end{itemize}"}</code> — Finalize the list</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full h-[450px]">
                        <LatexEditor
                            initialCode={code}
                            onCompile={handleCompile}
                            height="350px"
                        />
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 h-[550px]">
                <LatexPreview
                    code={code}
                    isCompiling={isCompiling}
                />
                <div className="bg-white border rounded-3xl p-8 shadow-sm space-y-6 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-primary" />
                        Progress Check
                    </h3>
                    <div className="space-y-4">
                        {[
                            "Try adding a \\section for 'Methodology'.",
                            "Make the word 'Clay Soil' bold using \\textbf.",
                            "Add a nested list for 'Irrigation Types'.",
                            "Change the title to focus on your specific research area."
                        ].map((task, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 border rounded-2xl border-slate-200 hover:border-primary transition-colors cursor-pointer group">
                                <div className="w-4 h-4 border-2 border-primary rounded-md group-hover:bg-primary/20 transition-colors" />
                                <span className="text-sm font-medium">{task}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
