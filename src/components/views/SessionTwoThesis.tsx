"use client";

import { motion } from "framer-motion";
import { FolderTree, FileCode, Layers, ShieldCheck, Download, ExternalLink, Target, Rocket, Trophy, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function SessionTwoThesis() {
    const structure = [
        { title: "main.tex", desc: "The brain. Loads packages and chapters.", type: "file" },
        { title: "chapters/", desc: "A folder containing individual .tex files for each chapter.", type: "folder" },
        { title: "references.bib", desc: "Your central database of citations.", type: "file" },
        { title: "images/", desc: "Where all your high-res research photos live.", type: "folder" }
    ];

    return (
        <div className="space-y-12 pb-20">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight outfit-font">Module 9: Thesis Structure</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    The Blueprint of Your Academic Journey. Learn how to manage 200+ pages without losing your mind.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="bg-card border rounded-3xl p-8 space-y-6 shadow-sm">
                        <h3 className="text-2xl font-bold flex items-center gap-3">
                            <FolderTree className="w-6 h-6 text-primary" />
                            Modular Organization
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            For large documents like a PhD Thesis, don&apos;t put everything in one file. Use the <code>{"\\include{...}"}</code> command to stitch chapters together.
                        </p>

                        <div className="space-y-3">
                            {structure.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-primary transition-all">
                                    <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-primary/10 transition-colors">
                                        {item.type === 'folder' ? <Layers className="w-5 h-5 text-orange-500" /> : <FileCode className="w-5 h-5 text-blue-500" />}
                                    </div>
                                    <div>
                                        <h4 className="font-mono font-bold text-sm">{item.title}</h4>
                                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-900 text-white rounded-3xl p-10 space-y-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16" />

                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-primary rounded-2xl">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">Agriculture Thesis Template</h3>
                                <p className="text-slate-400 text-sm">Pre-configured with local university standards.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm text-slate-300 leading-relaxed italic">
                                &quot;This template includes pre-defined styles for Title Pages, Abstract, Table of Contents, and ICAR style referencing. Ready to download and use in TeXstudio or Overleaf.&quot;
                            </p>
                            <div className="flex flex-col gap-3">
                                <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white p-4 rounded-xl font-bold transition-all w-full">
                                    <Download className="w-5 h-5" /> Download Agriculture Template
                                </button>
                                <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white p-4 rounded-xl font-bold transition-all w-full">
                                    <ExternalLink className="w-5 h-5" /> Open in Overleaf
                                </button>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                            <p className="text-xs font-bold uppercase tracking-widest text-primary">Chapter snippet</p>
                            <pre className="text-[10px] font-mono text-slate-400">
                                {`\\chapter{Literature Review}
\\label{ch:lit_review}
\\input{chapters/chapter2_review}

\\chapter{Methodology}
\\label{ch:method}
\\input{chapters/chapter3_method}`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
            {/* Activity Track: Building the Farmhouse */}
            <section className="space-y-10 py-10">
                <div className="text-center space-y-2">
                    <h2 className="text-4xl font-bold outfit-font">Skill Level: Building the Farmhouse</h2>
                    <p className="text-muted-foreground italic tracking-widest uppercase text-xs font-bold">From a single brick to a complete research estate</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            level: "1. The Foundation (Beginner)",
                            analogy: "Clearing the Land",
                            instruction: "Split a single document into two files: main.tex (preamble) and content.tex. Use \\input{content} to link them.",
                            reward: "Modular Thinking",
                            icon: <Target className="w-8 h-8 text-primary" />,
                            color: "bg-primary/5 border-primary/10"
                        },
                        {
                            level: "2. The Framework (Moderate)",
                            analogy: "Raising the Walls",
                            instruction: "Create a Table of Contents (\\tableofcontents) and a List of Figures. Ensure they update after 2-3 compilations.",
                            reward: "Systemic Navigation",
                            icon: <Rocket className="w-8 h-8 text-blue-500" />,
                            color: "bg-blue-50 border-blue-100"
                        },
                        {
                            level: "3. The Estate Architect (Pro)",
                            analogy: "The Master Blueprint",
                            instruction: "Design a full chapter structure where Chapter 1 is in 'intro.tex' and Chapter 2 is in 'results.tex'. Use \\include to manage page breaks.",
                            reward: "Professional Manuscript Control",
                            icon: <Trophy className="w-8 h-8 text-amber-500" />,
                            color: "bg-amber-50 border-amber-100"
                        }
                    ].map((activity, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className={cn("p-10 rounded-[3rem] border-2 space-y-8 relative overflow-hidden group transition-all", activity.color)}
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform">
                                {activity.icon}
                            </div>

                            <div className="space-y-2">
                                <span className="text-xs font-bold uppercase tracking-widest opacity-60">{activity.level}</span>
                                <h3 className="text-3xl font-bold">{activity.analogy}</h3>
                            </div>

                            <div className="space-y-6 relative z-10">
                                <div className="bg-white/80 p-6 rounded-3xl backdrop-blur-md shadow-sm border border-white/50">
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-tighter">Construction Task:</p>
                                    <p className="text-sm font-medium leading-relaxed text-slate-700">{activity.instruction}</p>
                                </div>

                                <div className="flex items-center gap-3 text-xs font-bold text-slate-900 bg-white/40 w-fit px-4 py-2 rounded-full">
                                    <Star className="w-4 h-4 fill-primary text-primary" />
                                    <span>Achievement: {activity.reward}</span>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-primary transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                                Build Section
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
