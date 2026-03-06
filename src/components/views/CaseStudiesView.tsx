"use client";

import { motion } from "framer-motion";
import { CaseUpper, FileWarning, Microscope, CheckCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const cases = [
    {
        title: "The Agriculture Statistics Paper",
        problem: "High rejection rate due to formatting inconsistencies in equations and tables.",
        solution: "Converted to LaTeX IEEE style. Tables became stable, math symbols became crisp vector graphics.",
        result: "Paper accepted after first formatting review. Zero complaints about math layout.",
        icon: <Microscope className="w-8 h-8 text-blue-500" />,
        color: "bg-blue-50 border-blue-100"
    },
    {
        title: "The PhD Thesis Disaster",
        problem: "MS Word became extremely slow at 150+ pages. Numbering broke, images jumped to random pages.",
        solution: "Modular LaTeX chapters using \\include. Figure numbering handled by engine.",
        result: "Final PDF generated in 5 seconds. Precise control over all 250 pages.",
        icon: <FileWarning className="w-8 h-8 text-red-500" />,
        color: "bg-red-50 border-red-100"
    }
];

export function CaseStudiesView() {
    return (
        <div className="space-y-12 pb-20">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight outfit-font">Case Studies</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    Real-world examples of how LaTeX saved research from formatting chaos.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {cases.map((cs, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                        className={cn("p-10 rounded-[3rem] border-2 space-y-8 flex flex-col shadow-sm hover:shadow-xl transition-all", cs.color)}
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-white rounded-2xl shadow-sm ring-1 ring-slate-200">
                                {cs.icon}
                            </div>
                            <h3 className="text-2xl font-bold">{cs.title}</h3>
                        </div>

                        <div className="space-y-6 flex-1">
                            <div className="space-y-2">
                                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400">The Problem</p>
                                <p className="text-slate-800 leading-relaxed font-medium">{cs.problem}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs font-extrabold uppercase tracking-widest text-primary">The Solution</p>
                                <p className="text-slate-700 leading-relaxed text-sm italic">{cs.solution}</p>
                            </div>
                        </div>

                        <div className="bg-white/60 p-6 rounded-3xl border border-white space-y-2">
                            <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                                <CheckCircle className="w-4 h-4" /> Final Outcome
                            </div>
                            <p className="text-slate-800 font-bold">{cs.result}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
