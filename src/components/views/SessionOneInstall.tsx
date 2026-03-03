"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Monitor, CheckCircle, Info, AlertTriangle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface InstallationStep {
    title: string;
    desc: string;
    link?: string;
    command?: string;
}

interface Platform {
    name: string;
    icon: string;
    steps: InstallationStep[];
}

export function SessionOneInstall() {
    const [checklist, setChecklist] = useState<Record<string, boolean>>({
        compiler: false,
        editor: false,
        firstFile: false,
    });

    const toggleCheck = (key: string) => {
        setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const platforms: Platform[] = [
        {
            name: "Windows",
            icon: "🪟",
            steps: [
                { title: "Install MiKTeX", desc: "The engine that compiles your code.", link: "https://miktex.org/download" },
                { title: "Install TeXstudio", desc: "The cockpit where you write your code.", link: "https://www.texstudio.org/" }
            ]
        },
        {
            name: "macOS",
            icon: "🍎",
            steps: [
                { title: "Install MacTeX", desc: "Complete LaTeX distribution for Mac.", link: "https://tug.org/mactex/" },
                { title: "Install TeXstudio", desc: "Go-to editor for scholars.", link: "https://www.texstudio.org/" }
            ]
        },
        {
            name: "Linux",
            icon: "🐧",
            steps: [
                { title: "Install TeX Live", desc: "Standard distribution for Unix-like systems.", command: "sudo apt install texlive-full" },
                { title: "Install TeXstudio", desc: "Available in most repos.", command: "sudo apt install texstudio" }
            ]
        }
    ];

    return (
        <div className="space-y-12 pb-20">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight outfit-font">Module 2: Installation Walkthrough</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    Setting up your Engineering Workbench. Think of it as installing your high-tech kitchen.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {platforms.map((platform, i) => (
                    <motion.div
                        key={platform.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="bg-card border rounded-3xl p-8 space-y-6 shadow-sm hover:shadow-xl transition-all"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-4xl">{platform.icon}</span>
                            <h3 className="text-2xl font-bold">{platform.name}</h3>
                        </div>

                        <div className="space-y-6">
                            {platform.steps.map((step, si) => (
                                <div key={si} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-primary">{step.title}</h4>
                                        {step.link && (
                                            <a href={step.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:scale-110 transition-transform">
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                                    {step.command && (
                                        <code className="block bg-slate-900 text-slate-300 p-2 rounded-md text-xs font-mono mt-2">
                                            {step.command}
                                        </code>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-orange-500/5 border border-orange-500/20 rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-4 text-orange-600">
                    <AlertTriangle className="w-8 h-8" />
                    <h2 className="text-2xl font-bold">Common Pitfalls</h2>
                </div>
                <ul className="grid md:grid-cols-2 gap-4">
                    {[
                        "Path errors: Always allow MiKTeX to add itself to PATH.",
                        "Missing Packages: Set MiKTeX to 'Install packages on the fly'.",
                        "Multiple Compilers: Stick to PdfLaTeX for beginners.",
                        "Large Downloads: MiKTeX is ~200MB, MacTeX can be ~4GB."
                    ].map((p, i) => (
                        <li key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-orange-100">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2" />
                            <span className="text-sm font-medium">{p}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <section className="bg-primary/5 border border-primary/20 rounded-3xl p-10 flex flex-col items-center gap-8 text-center ring-4 ring-primary/5">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold">Your Readiness Checklist</h2>
                    <p className="text-muted-foreground">Confirm your setup before we start coding.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    {[
                        { id: 'compiler', label: 'Installed Compiler (MiKTeX/TeXLive)' },
                        { id: 'editor', label: 'Installed Editor (TeXstudio)' },
                        { id: 'firstFile', label: 'Created your first .tex file' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => toggleCheck(item.id)}
                            className={cn(
                                "px-6 py-4 rounded-2xl flex items-center gap-3 font-bold transition-all border-2",
                                checklist[item.id]
                                    ? "bg-primary text-white border-primary shadow-lg scale-105"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary"
                            )}
                        >
                            {checklist[item.id] ? <CheckCircle className="w-6 h-6" /> : <Monitor className="w-6 h-6" />}
                            {item.label}
                        </button>
                    ))}
                </div>

                {Object.values(checklist).every(v => v) && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex flex-col items-center gap-2 text-primary"
                    >
                        <div className="bg-primary/10 p-4 rounded-full">
                            <CheckCircle className="w-12 h-12" />
                        </div>
                        <p className="font-bold text-lg italic">Engineering Workbench Ready! Let&apos;s build.</p>
                    </motion.div>
                )}
            </section>
        </div>
    );
}
