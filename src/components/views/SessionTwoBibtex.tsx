"use client";

import { useState } from "react";
import { LatexEditor } from "@/components/LatexEditor";
import { motion } from "framer-motion";
import { BookMarked, Search, Quote, FileCode, Check, Copy } from "lucide-react";

export function SessionTwoBibtex() {
    const [doi, setDoi] = useState("");
    const [bibtex, setBibtex] = useState("");
    const [loading, setLoading] = useState(false);

    const generateBibtex = () => {
        if (!doi) return;
        setLoading(true);
        // Simulate API call to DOI resolver
        setTimeout(() => {
            setBibtex(`@article{smith2024climate,
  title={Impact of Climate Change on Agriculture},
  author={Smith, John and Doe, Jane},
  journal={Agricultural Sciences},
  year={2024},
  publisher={Elsevier},
  doi={${doi}}
}`);
            setLoading(false);
        }, 1500);
    };

    const [code, setCode] = useState(`\\documentclass{article}
\\begin{document}

As stated in the recent study \\cite{smith2024climate}, 
climate change significantly affects crop rotation.

\\bibliographystyle{plain}
\\bibliography{references}

\\end{document}`);

    return (
        <div className="space-y-12 pb-20">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight outfit-font">Module 7: References & Citations</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    Never manually number a citation again. Join the .bib revolution and focus on your research, not your brackets.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Step-by-Step Guide */}
                <div className="space-y-8">
                    <div className="bg-card border rounded-3xl p-8 space-y-6 shadow-sm">
                        <h3 className="text-2xl font-bold flex items-center gap-3">
                            <Quote className="w-6 h-6 text-primary" />
                            The 3-Step Process
                        </h3>
                        <div className="space-y-4">
                            {[
                                { step: "1", title: "Create a .bib file", desc: "A simple text file containing all your references." },
                                { step: "2", title: "\\cite{your_key}", desc: "Call the reference anywhere in your text." },
                                { step: "3", title: "\\bibliography{file}", desc: "LaTeX auto-generates the bibliography at the end." }
                            ].map((s, i) => (
                                <div key={i} className="flex gap-4 p-4 hover:bg-muted/50 rounded-2xl transition-colors">
                                    <div className="h-10 w-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">
                                        {s.step}
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{s.title}</h4>
                                        <p className="text-sm text-muted-foreground">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* BibTeX Generator */}
                    <div className="bg-slate-900 rounded-3xl p-8 space-y-6 text-white shadow-2xl">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Search className="w-5 h-5 text-primary" />
                            BibTeX Generator
                        </h3>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={doi}
                                onChange={(e) => setDoi(e.target.value)}
                                placeholder="Paste DOI (e.g. 10.1016/j.agwat.2023.01)"
                                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 ring-primary"
                            />
                            <button
                                onClick={generateBibtex}
                                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
                                disabled={loading || !doi}
                            >
                                {loading ? "Fetching..." : "Generate"}
                            </button>
                        </div>

                        {bibtex && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                            >
                                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <span>Resulting entry</span>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(bibtex)}
                                        className="flex items-center gap-1 hover:text-white transition-colors"
                                    >
                                        <Copy className="w-3 h-3" /> Copy
                                    </button>
                                </div>
                                <pre className="bg-black/50 p-4 rounded-xl text-[10px] sm:text-xs font-mono text-primary leading-relaxed overflow-x-auto">
                                    {bibtex}
                                </pre>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Editor Preview */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <FileCode className="w-5 h-5 text-primary" />
                        Implementation in Code
                    </h3>
                    <LatexEditor
                        initialCode={code}
                        height="500px"
                        readOnly={true}
                    />
                </div>
            </div>
        </div>
    );
}
