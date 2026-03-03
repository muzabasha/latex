"use client";

import { useState } from "react";

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
    ShieldCheck,
    Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { currentModuleAtom } from "@/lib/store";

export function SessionZeroIntro() {
    const [, setCurrentModule] = useAtom(currentModuleAtom);
    const [answers, setAnswers] = useState<Record<number, number>>({});

    const questions = [
        {
            q: "How do you feel when a software tool behaves unexpectedly (e.g., text jumping in Word)?",
            options: [
                "I get frustrated and try to force it back manually.",
                "I ignore it and hope it fixes itself.",
                "I feel curious and look for a logical setting to fix it.",
                "I assume the computer hates me personally."
            ],
            interpretations: [
                "Reactive Mindset: You focus on symptoms rather than causes.",
                "Avoidant Mindset: You leave risks unmanaged in your research.",
                "Engineering Mindset: You are ready for LaTeX's logical structure!",
                "Emotional Mindset: You might find the cold logic of code refreshing."
            ]
        },
        {
            q: "When starting a complex task (like a thesis), your strategy is:",
            options: [
                "Start typing immediately and figure it out as I go.",
                "Wait for the 'perfect' inspiration to strike.",
                "Break it into small, manageable modules first.",
                "Ask someone else exactly what to do."
            ],
            interpretations: [
                "Linear Thinker: You struggle with large document dynamics.",
                "Perfectionist Paralysis: You may benefit from LaTeX's modularity.",
                "Structured Thinker: You are a natural LaTeX architect.",
                "Dependent Learner: This workshop will build your independence."
            ]
        },
        {
            q: "How important is 'exact pixel-perfect' control over every line of your paper?",
            options: [
                "Extremely—I spend hours dragging images by the millimeter.",
                "Not at all—as long as the text is there, I'm happy.",
                "I care about professional standards, not manual dragging.",
                "I let the software decide everything without question."
            ],
            interpretations: [
                "Control Freak: LaTeX will save you from the 'drag-and-drop' nightmare.",
                "Content Minimalist: You'll love that LaTeX handles formatting for you.",
                "Quality Driven: You align perfectly with LaTeX's high-precision core.",
                "Passive User: You might need to learn the power of 'commands'."
            ]
        },
        {
            q: "What is your typical reaction to an error message?",
            options: [
                "Close the program immediately.",
                "Read the first few words and panic.",
                "Copy-paste the error into a search engine.",
                "Read it carefully to understand which 'bracket' I missed."
            ],
            interpretations: [
                "Panic Mode: We will teach you that errors are just 'conversations'.",
                "Partial Observer: Learning to read logs is your primary growth path.",
                "Researcher Mindset: You have the right instinct for debugging.",
                "Debugging Master: You'll master LaTeX faster than most!"
            ]
        },
        {
            q: "How do you handle bibliographic references?",
            options: [
                "I type them manually at the end [1], [2]...",
                "I use a basic citation plugin but it often breaks.",
                "I use a database and wish it was more automated.",
                "I dream of a system where numbering just works by itself."
            ],
            interpretations: [
                "The Sisyphus: You are pushing a boulder uphill. BibTeX is your rescue.",
                "The Struggler: You've seen the light but use the wrong switch.",
                "The Advanced Scholar: BibTeX will be your favorite thing today.",
                "The Visionary: You are 100% ready for the LaTeX automation."
            ]
        },
        {
            q: "When a colleague suggests a new tool (like LaTeX), you think:",
            options: [
                "Why change? My Current tool is 'good enough'.",
                "It looks too hard for someone like me.",
                "If it saves time in the long run, I'll learn it now.",
                "I've already started reading about it!"
            ],
            interpretations: [
                "Rigid Mindset: 'Good enough' is the enemy of 'Great Research'.",
                "Lowered Efficacy: You'll find out today that you are smarter than you think.",
                "Growth Mindset: You are the ideal candidate for this transformation.",
                "Proactive Learner: You are already ahead of the curve."
            ]
        },
        {
            q: "Your 300-page thesis file becomes slow and 'Not Responding'. You:",
            options: [
                "Save copies like Thesis_v1, Thesis_v2_FINAL_REAL...",
                "Reinstall the software and hope for a miracle.",
                "Split the document into separate chapter files.",
                "Cry. (Valid, but not helpful)."
            ],
            interpretations: [
                "History Repeats: You are living in a formatting loop. Stop it.",
                "Hopeful Fixer: System issues need structural solutions, not miracles.",
                "Architect Mindset: You've discovered the core of LaTeX modularity.",
                "Vulnerable Researcher: We've all been there. Today, we end the tears."
            ]
        },
        {
            q: "Why do you think high-impact journals provide LaTeX templates?",
            options: [
                "To make life difficult for researchers.",
                "Because they like the 'old-school' look.",
                "To ensure 100% consistent quality across all papers.",
                "Because math is easier to print that way."
            ],
            interpretations: [
                "The Skeptic: You'll see the efficiency once you hit 'Compile'.",
                "The Traditionalist: It's actually the most modern way to 'Type-set'.",
                "Strategic thinker: You understand the professional ecosystem.",
                "Computational mind: You value the 'Logic of Layout'."
            ]
        },
        {
            q: "Completing a research paper feels like:",
            options: [
                "Fighting a war with the software.",
                "A necessary evil I have to endure.",
                "A beautiful process of expressing my data.",
                "A marathon where the last mile (formatting) is the hardest."
            ],
            interpretations: [
                "War-zone Researcher: We are bringing peace to your desktop today.",
                "Duty-bound Scholar: Efficiency will turn duty into delight.",
                "Artist-Scientist: You'll appreciate the beauty of TeX fonts.",
                "The Finisher: We'll make that 'last mile' the easiest mile."
            ]
        },
        {
            q: "The phrase 'Why me?' in formatting usually means:",
            options: [
                "I am unlucky with technology.",
                "I don't know the hidden rules of the software.",
                "I am using a tool for painting to do engineering.",
                "I need a coffee and a fresh start."
            ],
            interpretations: [
                "The Unlucky: It's not luck, it's the 'WYSIWYG' limitation.",
                "The Learner: Today we expose all the 'hidden rules'.",
                "The Realist: You've identified the root cause. Welcome to engineering!",
                "The Human: Coffee helps, but LaTeX helps more."
            ]
        }
    ];

    const handleSelect = (qIdx: number, oIdx: number) => {
        setAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
    };

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

            {/* Psychology Assessment: The Mindset Mirror */}
            <section className="space-y-12 py-16 bg-white/30 backdrop-blur-sm rounded-[3rem] border border-slate-200 p-12">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-widest">
                        <Brain className="w-4 h-4" /> Self-Discovery
                    </div>
                    <h2 className="text-4xl font-extrabold outfit-font">The Researcher Mindset Mirror</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Before we touch code, let's look at how you think. Select the option that best describes you for each question.
                    </p>
                </div>

                <div className="space-y-8">
                    {questions.map((q, qIdx) => (
                        <motion.div
                            key={qIdx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-6"
                        >
                            <div className="flex gap-4">
                                <span className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 text-sm">
                                    {qIdx + 1}
                                </span>
                                <h3 className="text-lg font-bold text-slate-800 leading-snug">{q.q}</h3>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {q.options.map((option, oIdx) => (
                                    <button
                                        key={oIdx}
                                        onClick={() => handleSelect(qIdx, oIdx)}
                                        className={cn(
                                            "text-left p-5 rounded-2xl text-sm font-medium transition-all border-2",
                                            answers[qIdx] === oIdx
                                                ? "bg-primary/5 border-primary text-primary shadow-inner"
                                                : "bg-slate-50 border-transparent hover:border-slate-200 text-slate-600 hover:bg-white"
                                        )}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={cn(
                                                "mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center",
                                                answers[qIdx] === oIdx ? "border-primary bg-primary" : "border-slate-300"
                                            )}>
                                                {answers[qIdx] === oIdx && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                            </div>
                                            {option}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {answers[qIdx] !== undefined && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex gap-3 items-center"
                                >
                                    <Info className="w-5 h-5 text-primary shrink-0" />
                                    <p className="text-xs font-bold text-primary italic">
                                        Interpretation: {q.interpretations[answers[qIdx]]}
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {Object.keys(answers).length === 10 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 rounded-[2.5rem] p-10 text-center space-y-6 text-white"
                    >
                        <Trophy className="w-16 h-16 text-amber-400 mx-auto" />
                        <div className="space-y-2">
                            <h3 className="text-3xl font-bold">Assessment Complete!</h3>
                            <p className="text-slate-400">
                                You've identified your patterns. Whether you're a "Control Freak" or a "Panic Fixer",
                                LaTeX is the bridge to your new, engineered research life.
                            </p>
                        </div>
                    </motion.div>
                )}
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
