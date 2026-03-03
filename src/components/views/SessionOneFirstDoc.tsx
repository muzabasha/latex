"use client";

import { useState } from "react";
import { LatexEditor } from "@/components/LatexEditor";
import { LatexPreview } from "@/components/LatexPreview";
import { motion } from "framer-motion";
import { FileText, Type, Layers, Box, Info, HelpCircle, CheckCircle2 } from "lucide-react";

export function SessionOneFirstDoc() {
    const [code, setCode] = useState(`\\documentclass{article}

\\begin{document}
Hello Research World! 
This is my very first LaTeX document.
\\end{document}`);
    const [isCompiling, setIsCompiling] = useState(false);

    const handleCompile = (newCode: string) => {
        setIsCompiling(true);
        setTimeout(() => {
            setCode(newCode);
            setIsCompiling(false);
        }, 1000);
    };

    const explainers = [
        {
            tag: "\\documentclass{article}",
            icon: <FileText className="w-5 h-5 text-blue-500" />,
            title: "The Blueprint Choice",
            desc: "Tells LaTeX what kind of document you're building.",
            options: [
                { name: "report", impact: "Adds support for chapters." },
                { name: "book", impact: "Adds title page and double-sided margins." },
                { name: "beamer", impact: "Used for creating academic presentations (PPT style)." }
            ]
        },
        {
            tag: "\\begin{document}",
            icon: <Layers className="w-5 h-5 text-green-500" />,
            title: "The Front Door",
            desc: "Everything after this point will actually appear in your final PDF.",
            options: [
                { name: "Preamble", impact: "The space BEFORE this is where you load packages." }
            ]
        },
        {
            tag: "The Body",
            icon: <Type className="w-5 h-5 text-orange-500" />,
            title: "The Content",
            desc: "This is where your research lives. Just type naturally!",
            options: [
                { name: "Commands", impact: "Functions that start with \\ change style." },
                { name: "Comments", impact: "Lines starting with % are for your notes only." }
            ]
        },
        {
            tag: "\\end{document}",
            icon: <Box className="w-5 h-5 text-red-500" />,
            title: "The Exit Sign",
            desc: "Tells the compiler to stop reading.",
            options: [
                { name: "Impact", impact: "If missing, the PDF will fail to generate." }
            ]
        },
    ];

    return (
        <div className="space-y-12 pb-20">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight outfit-font">Module 3: Your First Document</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    Breaking down the DNA of a LaTeX file. It&apos;s like building with LEGO blocks.
                </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
                {explainers.map((ex, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                        className="group relative bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-default"
                    >
                        <div className="mb-4">{ex.icon}</div>
                        <code className="block text-xs font-bold text-primary mb-3 font-mono bg-primary/5 p-2 rounded-md">
                            {ex.tag}
                        </code>
                        <h4 className="font-bold text-lg mb-2">{ex.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed italic mb-4">{ex.desc}</p>

                        <div className="pt-4 border-t border-slate-100 space-y-2">
                            <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Options & Impact</p>
                            {ex.options?.map((opt, idx) => (
                                <div key={idx} className="text-[11px] leading-tight">
                                    <span className="font-bold text-slate-700">{opt.name}:</span>{" "}
                                    <span className="text-slate-500">{opt.impact}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <section className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex items-start gap-4 text-blue-800">
                    <Info className="w-6 h-6 mt-1 shrink-0" />
                    <p className="text-sm font-medium">
                        <strong>Challenge:</strong> Try changing the text inside the document to include your research title. Notice how the structure outside the <code>{"\\begin"}</code> and <code>{"\\end"}</code> remains the same.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 h-[550px]">
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-sm tracking-widest uppercase text-muted-foreground">Source Construction</h3>
                        <LatexEditor
                            initialCode={code}
                            onCompile={handleCompile}
                            height="450px"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-sm tracking-widest uppercase text-muted-foreground">Architectural Output</h3>
                        <LatexPreview
                            code={code}
                            isCompiling={isCompiling}
                        />
                    </div>
                </div>
            </section>

            {/* Interactive Q&A Deep Dive */}
            <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-8 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -mr-32 -mt-32" />

                <div className="flex items-center gap-4 relative z-10">
                    <div className="p-3 bg-primary rounded-2xl">
                        <HelpCircle className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">Interactive Deep Dive</h2>
                        <p className="text-slate-400">Mastering the &quot;Why&quot; behind the structure.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-3">
                            <h4 className="font-bold text-primary flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" /> Question:
                            </h4>
                            <p className="text-lg">What happens if I forget <code>{"\\end{document}"}</code>?</p>
                            <div className="pt-4 border-t border-white/10">
                                <p className="text-sm text-slate-300">
                                    <span className="font-bold text-white uppercase text-xs block mb-1">Justification:</span>
                                    The compiler will throw an error saying &quot;Emergency Stop&quot;. Think of it like a PDF container; without the closing lid, LaTeX cannot finalize the file structure.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-3">
                            <h4 className="font-bold text-primary flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" /> Question:
                            </h4>
                            <p className="text-lg">Can I have text before <code>{"\\begin{document}"}</code>?</p>
                            <div className="pt-4 border-t border-white/10">
                                <p className="text-sm text-slate-300">
                                    <span className="font-bold text-white uppercase text-xs block mb-1">Justification:</span>
                                    No. That area is the <strong>Preamble</strong>. Any text typed there will cause a &quot;Missing begin document&quot; error because LaTeX isn&apos;t ready to display content yet.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-3">
                            <h4 className="font-bold text-primary flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" /> Question:
                            </h4>
                            <p className="text-lg">Why use <code>article</code> and not <code>book</code> for research papers?</p>
                            <div className="pt-4 border-t border-white/10">
                                <p className="text-sm text-slate-300">
                                    <span className="font-bold text-white uppercase text-xs block mb-1">Justification:</span>
                                    <code>article</code> is optimized for short, single-sectioned works. <code>book</code> forces new chapters to start on odd-numbered pages, which wastes space in a short 5-page research article.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-3 shadow-inner">
                            <p className="text-xs font-bold text-primary uppercase tracking-widest">Interactive Outcome</p>
                            <p className="text-sm italic text-slate-400">
                                Choosing the right class (Article vs. Report) changes the font sizes and margins to match global publication standards (IEEE/Nature) automatically.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
