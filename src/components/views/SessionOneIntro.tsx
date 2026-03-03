"use client";

import { useState } from "react";
import { LatexEditor } from "@/components/LatexEditor";
import { LatexPreview } from "@/components/LatexPreview";
import { motion } from "framer-motion";
import { Info, Lightbulb, ChefHat, ArrowRight, CheckCircle2 } from "lucide-react";

export function SessionOneIntro() {
    const [code, setCode] = useState("Hello Research World!\n\nThis is my first step into the world of LaTeX.");
    const [isCompiling, setIsCompiling] = useState(false);

    const handleCompile = (newCode: string) => {
        setIsCompiling(true);
        setTimeout(() => {
            setCode(newCode);
            setIsCompiling(false);
        }, 800);
    };

    return (
        <div className="space-y-12 pb-20">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight outfit-font">Module 1: What is LaTeX?</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    More than just a document editor&mdash;it&apos;s a high-precision engineering tool for your research papers.
                </p>
            </div>

            {/* Analogy Section */}
            <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                    className="bg-primary/5 border border-primary/20 rounded-2xl p-6 space-y-4"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="p-3 bg-primary/10 rounded-xl w-fit text-primary">
                        <ChefHat className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">The Cooking Analogy</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        LaTeX is like cooking with a recipe. You prepare the ingredients (Code) and the Oven (Compiler) produces the final dish (PDF).
                    </p>
                </motion.div>

                <motion.div
                    className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 space-y-4"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="p-3 bg-blue-500/10 rounded-xl w-fit text-blue-500">
                        <Lightbulb className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">Why not MS Word?</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Word is &quot;What You See Is What You Get&quot;. LaTeX is &quot;What You Mean Is What You Get&quot;. No more jumping images or broken numbering!
                    </p>
                </motion.div>

                <motion.div
                    className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-6 space-y-4"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="p-3 bg-orange-500/10 rounded-xl w-fit text-orange-500">
                        <Info className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">Compilation Process</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        <strong>Text File (.tex)</strong> &rarr; <strong>Compiler (PdfLaTeX)</strong> &rarr; <strong>PDF Output</strong>. It&apos;s that simple!
                    </p>
                </motion.div>
            </div>

            {/* Process Diagram */}
            <section className="bg-card border rounded-3xl p-8 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -mr-20 -mt-20" />

                <h2 className="text-2xl font-bold mb-8 text-center">Interactive Compilation Discovery</h2>

                <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative">
                    {/* Source Code */}
                    <div className="flex-1 w-full space-y-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground mb-2">
                            <div className="w-2 h-2 rounded-full bg-orange-400" /> SOURCE CODE (.tex)
                        </div>
                        <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-slate-300 shadow-xl border border-white/10">
                            <pre>{`\\documentclass{article}\n\\begin{document}\n  Hello Agriculture Scholars!\n\\end{document}`}</pre>
                        </div>
                    </div>

                    {/* Arrow / Animation */}
                    <div className="flex flex-col items-center gap-2">
                        <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <ArrowRight className="w-10 h-10 text-primary" />
                        </motion.div>
                        <span className="text-xs font-bold text-primary uppercase tracking-tighter">Compiler</span>
                    </div>

                    {/* PDF Output */}
                    <div className="flex-1 w-full space-y-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground mb-2">
                            <div className="w-2 h-2 rounded-full bg-blue-400" /> FORMATTED PDF
                        </div>
                        <div className="bg-white rounded-xl p-8 shadow-2xl border aspect-3/4 flex flex-col items-center justify-center text-center">
                            <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
                            <p className="text-2xl font-serif text-slate-800">Hello Agriculture Scholars!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Activity */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-1 bg-primary rounded-full" />
                    <h2 className="text-2xl font-bold">Interactive Activity: Your First Code</h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 h-[500px]">
                    <LatexEditor
                        initialCode={code}
                        onCompile={handleCompile}
                    />
                    <LatexPreview
                        code={code}
                        isCompiling={isCompiling}
                    />
                </div>
            </section>
        </div>
    );
}
