"use client";

import { useState } from "react";
import { LatexEditor } from "@/components/LatexEditor";
import { motion } from "framer-motion";
import { BookMarked, Search, Quote, FileCode, Check, Copy, HelpCircle, CheckCircle2 } from "lucide-react";

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
                                    <div className="h-10 w-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold shrink-0">
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

                {/* Editor Preview/Implementation */}
                <div className="space-y-6">
                    <div className="bg-card border rounded-3xl p-8 space-y-6 shadow-sm">
                        <h3 className="text-xl font-bold flex items-center gap-3">
                            <BookMarked className="w-6 h-6 text-primary" />
                            Reference Styles & Entries
                        </h3>

                        <div className="space-y-6">
                            <div className="bg-slate-50 p-5 rounded-3xl border border-dotted border-slate-300 space-y-3">
                                <h4 className="font-bold text-xs uppercase text-slate-500 tracking-wider">Bibliography Styles</h4>
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        { cmd: "plain", impact: "Numbers [1], sorted by author name." },
                                        { cmd: "alpha", impact: "Letter keys [Smi24], very professional." },
                                        { cmd: "unsrt", impact: "Numbers [1], in order of appearance." }
                                    ].map((s, i) => (
                                        <div key={i} className="text-xs flex gap-2 italic">
                                            <code className="text-primary font-bold">{s.cmd}:</code>
                                            <span className="text-muted-foreground">{s.impact}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-50 p-5 rounded-3xl border border-dotted border-slate-300 space-y-3">
                                <h4 className="font-bold text-xs uppercase text-slate-500 tracking-wider">Common Entry Types</h4>
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        { type: "@article", impact: "For research papers in journals." },
                                        { type: "@book", impact: "For published books/textbooks." },
                                        { type: "@manual", impact: "For software or instrument documentation." }
                                    ].map((e, i) => (
                                        <div key={i} className="text-xs flex gap-2 italic">
                                            <code className="text-primary font-bold">{e.type}:</code>
                                            <span className="text-muted-foreground">{e.impact}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border shadow-sm p-2">
                        <LatexEditor
                            initialCode={code}
                            height="350px"
                            readOnly={true}
                        />
                    </div>
                </div>
            </div>

            {/* Interactive Citations Deep Dive */}
            <section className="bg-slate-900 rounded-[3rem] p-12 text-white space-y-10 shadow-2xl relative overflow-hidden mt-12">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[130px] rounded-full -mr-48 -mt-48" />

                <div className="flex items-center gap-6 relative z-10">
                    <div className="p-4 bg-primary rounded-3xl shadow-xl shadow-primary/30 rotate-3 hover:rotate-0 transition-transform">
                        <HelpCircle className="w-12 h-12" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold outfit-font">The Citation Masterclass</h2>
                        <p className="text-slate-400 text-lg italic">&quot;References are the bedrock of academic integrity.&quot;</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 relative z-10">
                    <div className="space-y-8">
                        <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] space-y-4 hover:bg-white/5 transition-colors">
                            <h4 className="font-bold text-primary flex items-center gap-3 text-2xl">
                                <CheckCircle2 className="w-8 h-8" /> Why BibTeX?
                            </h4>
                            <p className="text-slate-200 text-lg">Why not just type [1], [2] in Word?</p>
                            <div className="pt-6 border-t border-white/10">
                                <p className="text-base text-slate-300 leading-relaxed font-light">
                                    <span className="font-bold text-white uppercase text-xs block mb-3 tracking-[0.2em]">The Automation Power:</span>
                                    If you delete a reference in Word, you must manually re-number every citation following it. In LaTeX, deleting <code>{"\\cite{smith}"}</code> triggers an automatic re-numbering and updates the bibliography list instantly.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] space-y-4 hover:bg-white/5 transition-colors">
                            <h4 className="font-bold text-primary flex items-center gap-3 text-2xl">
                                <CheckCircle2 className="w-8 h-8" /> Multiple Citations?
                            </h4>
                            <p className="text-slate-200">How to cite $3+$ authors at once?</p>
                            <div className="pt-6 border-t border-white/10">
                                <p className="text-base text-slate-300 leading-relaxed font-light">
                                    <span className="font-bold text-white uppercase text-xs block mb-3 tracking-[0.2em]">Efficiency Cheat:</span>
                                    Simply comma-separate them: <code>{"\\cite{smith2024, doe2023, lee2022}"}</code>. LaTeX will automatically group them as [1-3] or [1, 2, 8] depending on your style.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 flex flex-col justify-center">
                        <div className="bg-primary/5 border border-primary/20 p-10 rounded-[2.5rem] space-y-6">
                            <h5 className="font-extrabold text-primary uppercase text-xs tracking-[0.3em]">The DOI Advantage</h5>
                            <p className="text-lg text-slate-200 italic">
                                &quot;In modern agriculture research, DOIs are mandatory. BibTeX allows you to include DOIs which automatically become clickable hyperlinks in your final PDF.&quot;
                            </p>
                            <div className="bg-black/40 p-6 rounded-3xl font-mono text-xs text-primary/80">
                                doi = {"{10.1016/j.agwat.2023.01}"}
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] space-y-4">
                            <h4 className="font-bold text-primary flex items-center gap-3 text-2xl">
                                <CheckCircle2 className="w-8 h-8" /> Error: ??
                            </h4>
                            <p className="text-lg text-slate-200">Why do I see [?] instead of [1]?</p>
                            <div className="pt-6 border-t border-white/10">
                                <p className="text-base text-slate-300 leading-relaxed font-light">
                                    <span className="font-bold text-white uppercase text-xs block mb-3 tracking-[0.2em]">Compile Cycle:</span>
                                    LaTeX needs 3-4 passes to resolve citations: <strong>pdflatex {"->"} bibtex {"->"} pdflatex {"->"} pdflatex</strong>. Each pass builds a list of keys and then links them to the data.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
