"use client";

import { motion } from "framer-motion";
import { XCircle, CheckCircle, AlertTriangle, FileText, Zap, MousePointer2, ChevronRight, Target, Rocket, Trophy, Star, Check, X, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function SessionTwoWordVsLatex() {
    const comparisons = [
        {
            feature: "Numbering (Figures/Eq)",
            word: "Manual or buggy updates.",
            latex: "Fully automatic & stable.",
            icon: <FileText className="w-5 h-5 text-blue-500" />
        },
        {
            feature: "Layout Consistency",
            word: "Moving a photo breaks the doc.",
            latex: "Float management handles it.",
            icon: <Zap className="w-5 h-5 text-orange-500" />
        },
        {
            feature: "References",
            word: "Manual bibliography errors.",
            latex: "BibTeX: Perfect every time.",
            icon: <MousePointer2 className="w-5 h-5 text-green-500" />
        },
        {
            feature: "Large Files (Thesis)",
            word: "Becomes slow & crashes.",
            latex: "Splits into chapters easily.",
            icon: <AlertTriangle className="w-5 h-5 text-red-500" />
        }
    ];

    return (
        <div className="space-y-16 pb-20">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight outfit-font">Module 6: MS Word vs LaTeX</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    Practical adoption: Why stop manual labor and start engineering your research?
                </p>
            </div>

            <div className="relative h-96 w-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                    src="/assets/blueprint.png"
                    alt="Blueprint comparison"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent flex items-center p-12">
                    <div className="max-w-lg space-y-4">
                        <h2 className="text-4xl font-bold text-white">Engineering vs. Painting</h2>
                        <p className="text-slate-200 text-lg italic">
                            &quot;MS Word is painting freehand. LaTeX is engineering with blueprints. Stop worrying about where the image lands; let the engine decide the best spot.&quot;
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <h3 className="text-3xl font-bold outfit-font">The Daily Struggle (Word)</h3>
                    <div className="space-y-4">
                        {[
                            "Adding a new figure changes the numbering of all 42 subsequent figures.",
                            "Changing a font style requires highlighting every single paragraph.",
                            "Equations become 'images' that look blurry when zoomed.",
                            "Your thesis takes 2 minutes to open and 'Not Responding' is your best friend."
                        ].map((text, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * i }}
                                className="flex items-start gap-4 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-900"
                            >
                                <XCircle className="w-6 h-6 mt-1 shrink-0" />
                                <p className="text-sm font-medium">{text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <h3 className="text-3xl font-bold outfit-font">The LaTeX Solution</h3>
                    <div className="space-y-4">
                        {[
                            "\\label and \\ref ensure numbering is always correct.",
                            "Changing the document class updates the entire thesis style instantly.",
                            "Vector-based math engine ensures crisp, high-quality publication symbols.",
                            "Modular structure (\\include) makes handling 300 pages a breeze."
                        ].map((text, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * i }}
                                className="flex items-start gap-4 p-4 bg-green-50 border border-green-100 rounded-2xl text-green-900"
                            >
                                <CheckCircle className="w-6 h-6 mt-1 shrink-0" />
                                <p className="text-sm font-medium">{text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <section className="bg-card border rounded-3xl overflow-hidden shadow-inner">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="p-6 font-bold uppercase tracking-wider text-xs">Comparison Feature</th>
                            <th className="p-6 font-bold uppercase tracking-wider text-xs">Standard Processor (Word)</th>
                            <th className="p-6 font-bold uppercase tracking-wider text-xs text-primary">LaTeX Engine</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {comparisons.map((c, i) => (
                            <tr key={i} className="hover:bg-muted/30 transition-colors">
                                <td className="p-6">
                                    <div className="flex items-center gap-3">
                                        {c.icon}
                                        <span className="font-bold">{c.feature}</span>
                                    </div>
                                </td>
                                <td className="p-6 text-sm text-muted-foreground italic">{c.word}</td>
                                <td className="p-6 text-sm font-bold text-slate-800">{c.latex}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <div className="bg-primary text-white rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold">Ready to make the switch?</h2>
                    <p className="text-primary-foreground/80">Let&apos;s look at how LaTeX handles your most painful task: Citations.</p>
                </div>
                <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all flex items-center gap-2">
                    Next Module <ChevronRight className="w-5 h-5" />
                </button>
            </div>
            {/* Activity Track: The Strategy Map */}
            <section className="space-y-10 py-10">
                <div className="text-center space-y-2">
                    <h2 className="text-4xl font-bold outfit-font">Skill Level: The Strategy Map</h2>
                    <p className="text-muted-foreground italic tracking-widest uppercase text-xs font-bold">Planning your migration from manual to automated research</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            level: "1. The Critic (Beginner)",
                            analogy: "Identifying the Leak",
                            instruction: "Open your most recent MS Word research paper. Count how many times you manually updated a figure or citation number.",
                            detailedInstructions: [
                                "Find a document with at least 5 figures.",
                                "Try adding a new figure at the beginning.",
                                "Observe how long it takes to fix all subsequent 'Figure X' mentions."
                            ],
                            dos: ["Be honest about the time spent on formatting.", "Look for broken 'Error! Reference source not found' tags."],
                            donts: ["Don't ignore the time wasted on manual labor.", "Don't settle for 'good enough' alignment."],
                            reward: "Pain-Point Awareness",
                            icon: <Target className="w-8 h-8 text-primary" />,
                            color: "bg-primary/5 border-primary/10"
                        },
                        {
                            level: "2. The Planner (Moderate)",
                            analogy: "Mapping the Bridge",
                            instruction: "Choose one existing Word table or equation. Sketch how its LaTeX equivalent would look using \\begin{...} and \\end{...}.",
                            detailedInstructions: [
                                "Take a complex equation from your paper.",
                                "Try to break it down into LaTeX tokens (e.g., \\sqrt, \\frac).",
                                "Sketch the structure of a 3-column table on paper."
                            ],
                            dos: ["Focus on the logical structure.", "Use LaTeX commands for symbols."],
                            donts: ["Don't worry about the visual output yet.", "Don't try to make it look exactly like Word."],
                            reward: "Conceptual Migration",
                            icon: <Rocket className="w-8 h-8 text-blue-500" />,
                            color: "bg-blue-50 border-blue-100"
                        },
                        {
                            level: "3. The Visionary (Pro)",
                            analogy: "Professional Scaling",
                            instruction: "Explain to a peer how 'Modular Thinking' (splitting files) will save 50+ hours during the final Thesis submission phase.",
                            detailedInstructions: [
                                "Imagine a 300-page document.",
                                "Consider the risk of file corruption in a single massive Word file.",
                                "Explain how \\include allows multiple people to work on different chapters."
                            ],
                            dos: ["Think about long-term scalability.", "Emphasize safety and backup ease."],
                            donts: ["Don't underestimate the complexity of a PhD thesis.", "Don't wait until the deadline to switch."],
                            reward: "Structural Foresight",
                            icon: <Trophy className="w-8 h-8 text-amber-500" />,
                            color: "bg-amber-50 border-amber-100"
                        }
                    ].map((activity, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className={cn("p-10 rounded-[3rem] border-2 space-y-8 relative overflow-hidden group transition-all flex flex-col", activity.color)}
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform">
                                {activity.icon}
                            </div>

                            <div className="space-y-2">
                                <span className="text-xs font-bold uppercase tracking-widest opacity-60">{activity.level}</span>
                                <h3 className="text-3xl font-bold">{activity.analogy}</h3>
                            </div>

                            <div className="space-y-6 flex-1">
                                <div className="bg-white/80 p-6 rounded-3xl backdrop-blur-md shadow-sm border border-white/50 space-y-3">
                                    <div className="flex items-center gap-2">
                                        <ClipboardList className="w-4 h-4 text-slate-500" />
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter text-left">The Strategy Step:</p>
                                    </div>
                                    <div className="space-y-2">
                                        {activity.detailedInstructions.map((step, idx) => (
                                            <p key={idx} className="text-[13px] font-medium leading-relaxed border-l-2 border-slate-300 pl-3 text-left">{step}</p>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-emerald-500/10 p-4 rounded-xl space-y-2 border border-emerald-500/20">
                                        <div className="flex items-center gap-1.5 text-emerald-700 font-bold uppercase text-[9px] tracking-widest">
                                            <Check className="w-3 h-3" />
                                            <span>Do&apos;s</span>
                                        </div>
                                        {activity.dos.map((doItem, idx) => (
                                            <p key={idx} className="text-[11px] text-emerald-800 leading-tight italic text-left">✓ {doItem}</p>
                                        ))}
                                    </div>
                                    <div className="bg-rose-500/10 p-4 rounded-xl space-y-2 border border-rose-500/20">
                                        <div className="flex items-center gap-1.5 text-rose-700 font-bold uppercase text-[9px] tracking-widest">
                                            <X className="w-3 h-3" />
                                            <span>Don&apos;ts</span>
                                        </div>
                                        {activity.donts.map((dontItem, idx) => (
                                            <p key={idx} className="text-[11px] text-rose-800 leading-tight italic text-left">✗ {dontItem}</p>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-xs font-bold text-slate-900 bg-white/40 w-fit px-4 py-2 rounded-full">
                                    <Star className="w-4 h-4 fill-primary text-primary" />
                                    <span>Outcome: {activity.reward}</span>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-primary transition-all shadow-xl shadow-slate-900/10 active:scale-95 font-outfit mt-auto relative z-10">
                                Finalize Strategy
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
