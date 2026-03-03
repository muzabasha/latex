"use client";

import { motion } from "framer-motion";
import { XCircle, CheckCircle, AlertTriangle, FileText, Zap, MousePointer2, ChevronRight } from "lucide-react";
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
        </div>
    );
}
