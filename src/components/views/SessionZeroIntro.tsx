"use client";

import { motion } from "framer-motion";
import {
    Target,
    Lightbulb,
    Rocket,
    Trophy,
    CheckCircle,
    Smile,
    Zap,
    ArrowRight,
    Brain,
    Scale,
    ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { currentModuleAtom } from "@/lib/store";

export function SessionZeroIntro() {
    const [, setCurrentModule] = useAtom(currentModuleAtom);

    return (
        <div className="space-y-16 pb-20">
            {/* Hero Section */}
            <div className="space-y-4 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-widest mb-4"
                >
                    Phase 0: Transformation & Mindset
                </motion.div>
                <h1 className="text-5xl font-extrabold tracking-tight outfit-font">
                    The Research <span className="text-primary italic">Paradigm Shift</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Moving from "Fighting with Word" to "Engineering with LaTeX".
                    Welcome to the 1-day journey from reactive scholar to proactive researcher.
                </p>
            </div>

            {/* Objectives & Outcomes */}
            <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-card border-2 border-primary/10 rounded-[2.5rem] p-10 space-y-6 shadow-sm"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-primary/10 rounded-2xl text-primary font-bold">
                            <Target className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-bold">Training Objectives</h2>
                    </div>
                    <ul className="space-y-4">
                        {[
                            "Master LaTeX fundamentals in just 8 hours.",
                            "Understand the 'Blueprinting' vs 'Painting' philosophy.",
                            "Configure a production-ready research environment.",
                            "Build a modular thesis structure from scratch."
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-card border-2 border-blue-500/10 rounded-[2.5rem] p-10 space-y-6 shadow-sm"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500 font-bold">
                            <Rocket className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-bold">Skill Outcomes</h2>
                    </div>
                    <ul className="space-y-4">
                        {[
                            "Publication-grade formatting for high-impact journals.",
                            "Automated bibliographic integrity (No manual numbering).",
                            "Crytsal clear vector-based equations and tables.",
                            "Zero 'Broken Layout' anxiety for large documents."
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                <Trophy className="w-5 h-5 text-blue-500 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Motivation Section: The Transformation */}
            <section className="space-y-10">
                <div className="text-center space-y-2">
                    <h2 className="text-4xl font-bold outfit-font">The Mindset Overhaul</h2>
                    <p className="text-muted-foreground uppercase text-xs font-bold tracking-widest italic">From Struggle to Strategy</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Perspective 1 */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-slate-900 text-white rounded-4xl p-8 space-y-6 relative overflow-hidden"
                    >
                        <Brain className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12" />
                        <h3 className="text-xl font-bold uppercase tracking-tighter text-primary">Reactive vs Proactive</h3>
                        <div className="space-y-4 relative z-10">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <p className="text-xs font-bold text-red-400 uppercase mb-1">Reactive (Word):</p>
                                <p className="text-sm italic">"Oh no, I added a photo and now the entire chapter is on page 42!"</p>
                            </div>
                            <div className="p-4 bg-primary/20 rounded-xl border border-primary/30">
                                <p className="text-xs font-bold text-primary uppercase mb-1">Proactive (LaTeX):</p>
                                <p className="text-sm italic">"I'll define the content and let the layout engine optimize the placement."</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Perspective 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-slate-900 text-white rounded-4xl p-8 space-y-6 relative overflow-hidden"
                    >
                        <Scale className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 -rotate-12" />
                        <h3 className="text-xl font-bold uppercase tracking-tighter text-blue-400">Rigid vs Open-Minded</h3>
                        <div className="space-y-4 relative z-10">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <p className="text-xs font-bold text-red-400 uppercase mb-1">Rigid:</p>
                                <p className="text-sm italic">"I've used Word for 10 years, it's fine (while crying over bibliography numbers)."</p>
                            </div>
                            <div className="p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
                                <p className="text-xs font-bold text-blue-400 uppercase mb-1">Open-Minded:</p>
                                <p className="text-sm italic">"I am willing to learn a system that guarantees 100% precision forever."</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Perspective 3 */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-slate-900 text-white rounded-4xl p-8 space-y-6 relative overflow-hidden"
                    >
                        <Smile className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-6" />
                        <h3 className="text-xl font-bold uppercase tracking-tighter text-amber-400">Why Me? vs Why Not Me?</h3>
                        <div className="space-y-4 relative z-10">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <p className="text-xs font-bold text-red-400 uppercase mb-1">Why Only Me (The Victim):</p>
                                <p className="text-sm italic">"Why does the cursor move the image to page 12 when I type a single comma? The LaTeX gods are punishing me!"</p>
                            </div>
                            <div className="p-4 bg-amber-500/20 rounded-xl border border-amber-500/30">
                                <p className="text-xs font-bold text-amber-400 uppercase mb-1">Why Not Me (The Master):</p>
                                <p className="text-sm italic">"I am the architect. I define the logic. The machine serves my research. Let's build a masterpiece."</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* What makes this different? */}
            <section className="bg-primary/5 border border-primary/20 rounded-[3rem] p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full -mr-32 -mt-32" />

                <div className="max-w-3xl space-y-6 relative z-10">
                    <h2 className="text-4xl font-bold outfit-font">What Makes This Training Different?</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        We don't just teach code; we teach <strong>Research Engineering</strong>. Unlike generic tutorials, this is built for the intensity of PhD-level agriculture and allied sciences publication workflows.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 pt-4">
                        <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                            <ShieldCheck className="w-6 h-6 text-primary" />
                            <span className="text-sm font-bold">100% Output Stability</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                            <Zap className="w-6 h-6 text-primary" />
                            <span className="text-sm font-bold">Automated Cross-Refs</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                            <Smile className="w-6 h-6 text-primary" />
                            <span className="text-sm font-bold">Funny Analogies (Zero Stress)</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                            <Brain className="w-6 h-6 text-primary" />
                            <span className="text-sm font-bold">Concept-First Pedagogy</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <div className="flex justify-center">
                <button
                    onClick={() => setCurrentModule('session-1-intro')}
                    className="group bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-primary transition-all flex items-center gap-4 shadow-2xl shadow-slate-900/20 active:scale-95"
                >
                    Start Module 1 <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
            </div>
        </div>
    );
}
