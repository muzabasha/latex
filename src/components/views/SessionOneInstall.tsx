"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Monitor, CheckCircle, Info, AlertTriangle, ExternalLink, Target, Rocket, Trophy, Star, Check, X, ClipboardList } from "lucide-react";
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
            {/* Activity Track: The Workbench Setup */}
            <section className="space-y-10 py-10">
                <div className="text-center space-y-2">
                    <h2 className="text-4xl font-bold outfit-font">Skill Level: The Workbench Setup</h2>
                    <p className="text-muted-foreground italic tracking-widest uppercase text-xs font-bold">Ensuring your research cockpit is flight-ready</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            level: "1. The Inspector (Beginner)",
                            analogy: "Testing the Ignition",
                            instruction: "Launch TeXstudio and identify the 'Green Play Button' or press F5. This is your primary engine starter.",
                            detailedInstructions: [
                                "Open the TeXstudio application.",
                                "Find the double green arrows (Compile & View) in the toolbar.",
                                "Hover over it to see the F5 keyboard shortcut."
                            ],
                            dos: ["Use keyboard shortcuts like F5 for efficiency.", "Check that the internal PDF viewer is visible."],
                            donts: ["Don't click compile multiple times quickly.", "Don't close TeXstudio until the first compile finishes."],
                            reward: "Interface Familiarity",
                            icon: <Target className="w-8 h-8 text-primary" />,
                            color: "bg-primary/5 border-primary/10"
                        },
                        {
                            level: "2. The Engineer (Moderate)",
                            analogy: "Checking the Gauges",
                            instruction: "Go to Options -> Configure TeXstudio -> Commands. Verify that 'PdfLaTeX' points to a valid file path.",
                            detailedInstructions: [
                                "Open the Configure menu.",
                                "Select 'Commands' on the left sidebar.",
                                "Ensure the path for PdfLaTeX isn't empty and points to your compiler installation."
                            ],
                            dos: ["Ask for help if paths are empty.", "Make sure your compiler (MiKTeX/TeXLive) is installed before this step."],
                            donts: ["Don't change paths manually unless you know the directory.", "Don't uncheck the 'Default' compiler settings."],
                            reward: "Path Validation",
                            icon: <Rocket className="w-8 h-8 text-blue-500" />,
                            color: "bg-blue-50 border-blue-100"
                        },
                        {
                            level: "3. Systems Lead (Pro)",
                            analogy: "Auto-Pilot Engagement",
                            instruction: "Launch MiKTeX Console, go to Settings, and set 'Always install missing packages on-the-fly'.",
                            detailedInstructions: [
                                "Open 'MiKTeX Console' from your start menu.",
                                "Switch to 'Administrator Mode' if prompted.",
                                "Under Settings, find 'You can choose whether missing packages are to be installed' and set it to 'Always'."
                            ],
                            dos: ["Run an update check in MiKTeX Console first.", "Set to 'Always' to avoid annoying pop-ups during work."],
                            donts: ["Don't set it to 'Never' or you will get 'Package Not Found' errors.", "Don't close the console during an update."],
                            reward: "Workflow Automation",
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
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter text-left">The Checklist:</p>
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
                                    <span>Status: {activity.reward}</span>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-primary transition-all shadow-xl shadow-slate-900/10 active:scale-95 font-outfit mt-auto relative z-10">
                                Run Verification
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
