"use client";

import { motion } from "framer-motion";
import { FolderTree, FileCode, Layers, ShieldCheck, Download, ExternalLink } from "lucide-react";

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
        </div>
    );
}
