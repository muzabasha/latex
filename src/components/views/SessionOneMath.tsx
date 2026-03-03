"use client";

import { useState } from "react";
import { LatexEditor } from "@/components/LatexEditor";
import { LatexPreview } from "@/components/LatexPreview";
import { MathBuilder } from "@/components/MathBuilder";
import { motion } from "framer-motion";
import { Sigma, FunctionSquare, Binary, Calculator } from "lucide-react";

export function SessionOneMath() {
    const [code, setCode] = useState(`\\documentclass{article}

\\begin{document}
\\section{Statistical Analysis of Crop Yield}
The relationship between rainfall $R$ and yield $Y$ can be expressed as:

\\[
Y = \\alpha R^2 + \\beta R + \\epsilon
\\]

Where:
\\begin{itemize}
    \\item $\\alpha$ is the transformation coefficient.
    \\item $\\beta$ is the linear growth factor.
    \\item $\\epsilon$ represents the error margin.
\\end{itemize}

\\subsection{Standard Deviation Formula}
The formula for standard deviation is:
\\[
\\sigma = \\sqrt{\\frac{1}{N} \\sum_{i=1}^{N} (x_i - \\mu)^2}
\\]
\\end{document}`);
    const [isCompiling, setIsCompiling] = useState(false);

    const handleCompile = (newCode: string) => {
        setIsCompiling(true);
        setTimeout(() => {
            setCode(newCode);
            setIsCompiling(false);
        }, 1000);
    };

    const insertLatex = (latex: string) => {
        // Basic logic to append latex to code for demonstration
        // In a real app, this would insert at cursor position
        setCode(prev => prev.replace("\\end{document}", `${latex}\n\\end{document}`));
    };

    return (
        <div className="space-y-12 pb-20">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight outfit-font">Module 5: Mathematics</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    The language of Agriculture Statistics. Professional, crisp, and publication-ready equations with zero effort.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-card border rounded-3xl p-8 space-y-4 shadow-sm">
                        <div className="flex items-center gap-3 text-primary">
                            <Calculator className="w-6 h-6" />
                            <h3 className="text-xl font-bold">Inline vs. Display Math</h3>
                        </div>
                        <div className="text-muted-foreground text-sm leading-relaxed space-y-2">
                            <p>Use <code>{"$...$"}</code> for math that stays inside your sentence (inline).</p>
                            <p>Use <code>{"\\[ ... \\]"}</code> for big equations that need a dedicated center stage (display).</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-dotted border-slate-300 font-mono text-xs">
                            <p className="text-slate-600 font-serif italic text-sm">The growth is $y = mx + b$.</p>
                            <div className="h-px bg-slate-200 my-2" />
                            <p className="text-slate-600 font-serif italic text-sm text-center py-2">The growth is \\[ y = mx + b \\]</p>
                        </div>
                    </div>

                    <MathBuilder onInsert={insertLatex} />
                </div>

                <div className="h-[650px]">
                    <LatexPreview
                        code={code}
                        isCompiling={isCompiling}
                    />
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Binary className="w-6 h-6 text-primary" />
                    Live Math Lab
                </h2>
                <div className="h-[500px]">
                    <LatexEditor
                        initialCode={code}
                        onCompile={handleCompile}
                        height="400px"
                    />
                </div>
            </div>
        </div>
    );
}
