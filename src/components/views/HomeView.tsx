"use client";

import { useAtom } from "jotai";
import { currentModuleAtom } from "@/lib/store";
import { ArrowRight, BookOpen, GraduationCap, PenTool } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function HomeView() {
    const [, setCurrentModule] = useAtom(currentModuleAtom);

    const stats = [
        { label: "Workshop Duration", value: "1 Day (8 Hours)" },
        { label: "Target Scholars", value: "PG & PhD" },
        { label: "Prior Knowledge", value: "Absolute Zero" },
        { label: "Framework", value: "NEP 2020 Compliant" },
    ];

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-20 text-white shadow-2xl dark:bg-slate-950">
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 pointer-events-none">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-primary">
                        <path d="M44.7,-76.4C58.2,-69.2,70,-58.5,78.4,-45.6C86.8,-32.7,91.8,-17.6,90.9,-2.8C90,12,83.1,26.5,74.1,39.3C65.1,52,54,63,41,69.9C28,76.8,13.1,79.5,-1.3,81.7C-15.6,83.9,-32.8,85.6,-46.8,79.5C-60.8,73.4,-71.6,59.3,-78.9,44.4C-86.2,29.4,-89.9,13.7,-88.3,-1.6C-86.7,-16.9,-79.8,-31.8,-69.8,-43.8C-59.8,-55.8,-46.7,-64.9,-33.5,-72.4C-20.3,-79.9,-7.1,-85.8,5.1,-93.6C17.3,-101.5,31.2,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-4xl space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-semibold tracking-wide uppercase">
                            Production-Ready Workshop
                        </span>
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-7xl font-extrabold tracking-tight outfit-font"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Application of <span className="text-primary italic underline decoration-wavy underline-offset-8">LaTeX Skills</span> in Research Publications
                    </motion.h1>

                    <motion.p
                        className="text-xl text-slate-300 max-w-2xl leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Empowering Agriculture and Allied Sciences Scholars to transition from manual MS Word formatting to professional LaTeX engineering in just one day.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <button
                            onClick={() => setCurrentModule('session-0-intro')}
                            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-primary/20 transition-all hover:scale-105"
                        >
                            Start Program <ArrowRight className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setCurrentModule('lab')}
                            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
                        >
                            Go to Hands-On Lab
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                    >
                        <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    </motion.div>
                ))}
            </section>

            {/* Analogy Cards */}
            <section className="space-y-8">
                <h2 className="text-3xl font-bold text-center outfit-font">Why LaTeX? (The Magic Oven)</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        className="bg-card border rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
                        whileHover={{ y: -10 }}
                    >
                        <div className="relative h-64 w-full">
                            <Image
                                src="/assets/cooking.png"
                                alt="Cooking Analogy"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-2xl font-bold">The Cooking Recipe</h3>
                            </div>
                        </div>
                        <div className="p-8 space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                                &quot;LaTeX is like cooking with a recipe instead of guessing ingredients. MS Word is like painting freehand; LaTeX is like engineering with blueprints.&quot;
                            </p>
                            <div className="flex items-center gap-3 text-primary font-semibold">
                                <BookOpen className="w-5 h-5" />
                                <span>Learn the Language of Science</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-card border rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
                        whileHover={{ y: -10 }}
                    >
                        <div className="relative h-64 w-full">
                            <Image
                                src="/assets/compiler.png"
                                alt="Compiler Mixer"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-2xl font-bold">The Mixer Grinder</h3>
                            </div>
                        </div>
                        <div className="p-8 space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                                &quot;Compiler = Mixer grinder turning ingredients (Equations, Text, Tables) into a perfectly plated scientific dish (PDF).&quot;
                            </p>
                            <div className="flex items-center gap-3 text-primary font-semibold">
                                <PenTool className="w-5 h-5" />
                                <span>Precise Control Over Layout</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quick Start Guide for Instructors */}
            <section className="bg-primary/5 border border-primary/20 rounded-3xl p-10 space-y-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary rounded-2xl text-white shadow-lg">
                        <GraduationCap className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Academic Philosophy</h2>
                        <p className="text-muted-foreground">Skill-based outcomes & Technology integration.</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <h4 className="font-bold text-lg">70% Hands-On</h4>
                        <p className="text-sm text-muted-foreground">Every module ends with a code-along exercise.</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold text-lg">20% Guided</h4>
                        <p className="text-sm text-muted-foreground">Step-by-step visual installation walkthroughs.</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold text-lg">10% Conceptual</h4>
                        <p className="text-sm text-muted-foreground">Lightweight theory with funny analogies.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
