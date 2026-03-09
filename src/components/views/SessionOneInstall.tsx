"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Download, Monitor, CheckCircle, AlertTriangle, ExternalLink,
    Target, Rocket, Trophy, Star, Check, X, ClipboardList,
    ChevronDown, ChevronUp, Cpu, HardDrive, Wifi, Shield,
    FileText, Settings, RefreshCw, Bug, Wrench, Zap,
    CircleCheckBig, CircleDashed, Copy, Terminal, Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SessionQuiz } from "@/components/SessionQuiz";
import { SESSION_QUIZZES } from "@/lib/quiz-data";

export function SessionOneInstall() {
    const [checklist, setChecklist] = useState<Record<string, boolean>>({
        ram: false,
        disk: false,
        internet: false,
        admin: false,
        compiler: false,
        compilerPath: false,
        compilerPackages: false,
        editor: false,
        editorConfig: false,
        firstFile: false,
        firstCompile: false,
        pdfViewer: false,
    });
    const [expandedPlatform, setExpandedPlatform] = useState<string>("Windows");
    const [expandedError, setExpandedError] = useState<string | null>(null);
    const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

    const toggleCheck = (key: string) => {
        setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const copyCommand = (cmd: string, id: string) => {
        navigator.clipboard.writeText(cmd);
        setCopiedCmd(id);
        setTimeout(() => setCopiedCmd(null), 1500);
    };

    const completedCount = Object.values(checklist).filter(Boolean).length;
    const totalChecks = Object.keys(checklist).length;
    const progress = (completedCount / totalChecks) * 100;

    return (
        <div className="space-y-12 pb-20">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight outfit-font">Module 2: Installation Walkthrough</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    Setting up your Engineering Workbench. Follow every step carefully — a proper setup saves hours of debugging later.
                </p>
            </div>

            {/* ═══════════════════════════════════════════════ */}
            {/* SECTION 1: PREREQUISITES */}
            {/* ═══════════════════════════════════════════════ */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500 rounded-xl text-white">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Step 0: Prerequisites Check</h2>
                        <p className="text-sm text-muted-foreground">Verify your laptop meets these requirements before installing anything.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        {
                            id: "ram",
                            icon: <Cpu className="w-5 h-5" />,
                            title: "RAM: 4 GB minimum",
                            desc: "8 GB recommended for smooth compilation of large documents.",
                            how: "Windows: Right-click 'This PC' → Properties. Mac: Apple menu → About This Mac.",
                            color: "bg-blue-50 border-blue-200 text-blue-700"
                        },
                        {
                            id: "disk",
                            icon: <HardDrive className="w-5 h-5" />,
                            title: "Disk Space: 5 GB free",
                            desc: "MiKTeX needs ~200MB, TeXstudio ~150MB. Full TeX Live needs ~4GB.",
                            how: "Windows: Open 'This PC' and check C: drive. Mac: Apple menu → About → Storage.",
                            color: "bg-green-50 border-green-200 text-green-700"
                        },
                        {
                            id: "internet",
                            icon: <Wifi className="w-5 h-5" />,
                            title: "Internet Connection",
                            desc: "Required for downloading installers and auto-installing LaTeX packages.",
                            how: "Open a browser and visit miktex.org to confirm connectivity.",
                            color: "bg-purple-50 border-purple-200 text-purple-700"
                        },
                        {
                            id: "admin",
                            icon: <Shield className="w-5 h-5" />,
                            title: "Administrator Access",
                            desc: "You need admin rights to install software and modify system PATH.",
                            how: "Windows: Right-click installer → 'Run as Administrator'. Mac: Enter your password when prompted.",
                            color: "bg-amber-50 border-amber-200 text-amber-700"
                        }
                    ].map((req) => (
                        <motion.div
                            key={req.id}
                            whileHover={{ y: -3 }}
                            className={cn("rounded-2xl border-2 p-5 space-y-3 cursor-pointer transition-all", req.color, checklist[req.id] && "ring-2 ring-green-400 bg-green-50 border-green-300")}
                            onClick={() => toggleCheck(req.id)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {req.icon}
                                    <h4 className="font-bold text-sm">{req.title}</h4>
                                </div>
                                {checklist[req.id] ? <CircleCheckBig className="w-5 h-5 text-green-600" /> : <CircleDashed className="w-5 h-5 opacity-30" />}
                            </div>
                            <p className="text-xs leading-relaxed opacity-80">{req.desc}</p>
                            <div className="bg-white/60 rounded-lg p-2 text-[10px] italic">
                                <span className="font-bold">How to check:</span> {req.how}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════ */}
            {/* SECTION 2: STEP-BY-STEP INSTALLATION */}
            {/* ═══════════════════════════════════════════════ */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-xl text-white">
                        <Download className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Step 1: Install LaTeX Compiler + TeXstudio</h2>
                        <p className="text-sm text-muted-foreground">Select your operating system and follow every step in order.</p>
                    </div>
                </div>

                {/* Platform Tabs */}
                <div className="flex gap-2">
                    {["Windows", "macOS", "Linux"].map(p => (
                        <button
                            key={p}
                            onClick={() => setExpandedPlatform(p)}
                            className={cn(
                                "px-5 py-3 rounded-xl font-bold text-sm transition-all border-2",
                                expandedPlatform === p
                                    ? "bg-slate-900 text-white border-slate-900 shadow-lg"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                            )}
                        >
                            {p === "Windows" ? "🪟" : p === "macOS" ? "🍎" : "🐧"} {p}
                        </button>
                    ))}
                </div>

                {/* Windows Installation */}
                <AnimatePresence mode="wait">
                    {expandedPlatform === "Windows" && (
                        <motion.div
                            key="windows"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            {[
                                {
                                    step: 1,
                                    title: "Download MiKTeX Installer",
                                    desc: "MiKTeX is the LaTeX compiler (the engine that converts .tex → .pdf).",
                                    details: [
                                        "Go to https://miktex.org/download",
                                        "Click the 'Download' button for Windows (64-bit recommended).",
                                        "The file will be named something like 'basic-miktex-24.1-x64.exe' (~200MB).",
                                        "Save it to your Downloads folder."
                                    ],
                                    link: "https://miktex.org/download",
                                    warning: "Do NOT download from any other website. Only use miktex.org."
                                },
                                {
                                    step: 2,
                                    title: "Install MiKTeX",
                                    desc: "Run the installer with administrator privileges.",
                                    details: [
                                        "Right-click the downloaded .exe file → 'Run as Administrator'.",
                                        "Accept the license agreement.",
                                        "Choose 'Install for all users' (recommended) or 'Install only for me'.",
                                        "IMPORTANT: On the 'Settings' page, select 'Always' for 'Install missing packages on-the-fly'.",
                                        "Keep the default installation directory (C:\\Program Files\\MiKTeX).",
                                        "Click 'Start' and wait for installation to complete (5-10 minutes)."
                                    ],
                                    warning: "If you choose 'Ask me first' for packages, you'll get pop-ups every time a new package is needed."
                                },
                                {
                                    step: 3,
                                    title: "Verify MiKTeX PATH",
                                    desc: "Ensure the system can find the MiKTeX compiler from any location.",
                                    details: [
                                        "Open Command Prompt (Win + R → type 'cmd' → Enter).",
                                        "Type: pdflatex --version",
                                        "You should see 'MiKTeX-pdfTeX' with a version number.",
                                        "If you get 'not recognized', MiKTeX PATH was not set correctly."
                                    ],
                                    command: "pdflatex --version",
                                    warning: "If PATH is missing: Open MiKTeX Console → Settings → 'Add MiKTeX to PATH' → Restart your computer."
                                },
                                {
                                    step: 4,
                                    title: "Update MiKTeX Packages",
                                    desc: "Ensure all packages are up to date before first use.",
                                    details: [
                                        "Open 'MiKTeX Console' from the Start Menu.",
                                        "If prompted, switch to 'Administrator Mode'.",
                                        "Go to the 'Updates' tab.",
                                        "Click 'Check for updates', then 'Update now'.",
                                        "Wait for all updates to complete."
                                    ],
                                    warning: "Do NOT close MiKTeX Console while updates are in progress."
                                },
                                {
                                    step: 5,
                                    title: "Download TeXstudio",
                                    desc: "TeXstudio is the editor (the cockpit where you write LaTeX code).",
                                    details: [
                                        "Go to https://www.texstudio.org/",
                                        "Click 'Download' → select the Windows installer.",
                                        "The file will be named something like 'texstudio-4.8.2-win-qt6.exe' (~100MB)."
                                    ],
                                    link: "https://www.texstudio.org/"
                                },
                                {
                                    step: 6,
                                    title: "Install TeXstudio",
                                    desc: "Run the installer and configure it.",
                                    details: [
                                        "Right-click the downloaded .exe → 'Run as Administrator'.",
                                        "Accept the license and keep default settings.",
                                        "Click 'Install' and wait for completion.",
                                        "Launch TeXstudio from the Start Menu or Desktop shortcut."
                                    ]
                                },
                                {
                                    step: 7,
                                    title: "Configure TeXstudio → MiKTeX Connection",
                                    desc: "Verify TeXstudio can find the MiKTeX compiler.",
                                    details: [
                                        "Open TeXstudio.",
                                        "Go to Options → Configure TeXstudio → Commands.",
                                        "Check that 'PdfLaTeX' shows a valid path (e.g., pdflatex.exe).",
                                        "If the path is empty, click 'Reset to Default' or browse to C:\\Program Files\\MiKTeX\\miktex\\bin\\x64\\pdflatex.exe.",
                                        "Click 'OK' to save."
                                    ],
                                    warning: "If TeXstudio cannot find pdflatex, your MiKTeX installation may be incomplete or PATH is not set."
                                }
                            ].map((s) => (
                                <div key={s.step} className="bg-card border rounded-2xl p-6 space-y-3 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-lg shrink-0">
                                            {s.step}
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-bold text-lg">{s.title}</h4>
                                                {s.link && (
                                                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary text-xs font-bold hover:underline">
                                                        <ExternalLink className="w-3.5 h-3.5" /> Open Link
                                                    </a>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">{s.desc}</p>
                                            <div className="space-y-1.5 pt-2">
                                                {s.details.map((d, i) => (
                                                    <div key={i} className="flex items-start gap-2 text-sm">
                                                        <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 shrink-0 mt-0.5">{i + 1}</span>
                                                        <p className="leading-relaxed">{d}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            {s.command && (
                                                <div className="flex items-center gap-2 bg-slate-900 rounded-xl p-3 mt-2 group">
                                                    <Terminal className="w-4 h-4 text-slate-500 shrink-0" />
                                                    <code className="text-sm font-mono text-green-400 flex-1">{s.command}</code>
                                                    <button
                                                        onClick={() => copyCommand(s.command!, `win-${s.step}`)}
                                                        className="p-1 hover:bg-slate-700 rounded transition-colors"
                                                    >
                                                        {copiedCmd === `win-${s.step}` ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                                                    </button>
                                                </div>
                                            )}
                                            {s.warning && (
                                                <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 mt-2">
                                                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                                    <p className="text-xs text-amber-800 font-medium">{s.warning}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {expandedPlatform === "macOS" && (
                        <motion.div
                            key="macos"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            {[
                                {
                                    step: 1,
                                    title: "Download MacTeX",
                                    desc: "MacTeX is the complete LaTeX distribution for macOS (~4GB).",
                                    details: [
                                        "Go to https://tug.org/mactex/",
                                        "Click 'MacTeX Download' to get the .pkg installer.",
                                        "The file is large (~4GB). Use a stable internet connection.",
                                        "Alternative: Download BasicTeX (~100MB) if disk space is limited."
                                    ],
                                    link: "https://tug.org/mactex/",
                                    warning: "BasicTeX is smaller but you'll need to manually install packages later. Full MacTeX is recommended."
                                },
                                {
                                    step: 2,
                                    title: "Install MacTeX",
                                    desc: "Run the .pkg installer.",
                                    details: [
                                        "Double-click the downloaded .pkg file.",
                                        "Follow the installation wizard — keep all defaults.",
                                        "Enter your Mac password when prompted.",
                                        "Installation takes 10-20 minutes depending on your Mac."
                                    ]
                                },
                                {
                                    step: 3,
                                    title: "Verify Installation",
                                    desc: "Check that the compiler is accessible from Terminal.",
                                    details: [
                                        "Open Terminal (Cmd + Space → type 'Terminal').",
                                        "Type: pdflatex --version",
                                        "You should see 'pdfTeX' with a version number.",
                                        "Also try: which pdflatex — should show /Library/TeX/texbin/pdflatex"
                                    ],
                                    command: "pdflatex --version"
                                },
                                {
                                    step: 4,
                                    title: "Update TeX Live Manager",
                                    desc: "Keep packages up to date.",
                                    details: [
                                        "Open Terminal.",
                                        "Run: sudo tlmgr update --self --all",
                                        "Enter your password when prompted.",
                                        "Wait for all updates to complete."
                                    ],
                                    command: "sudo tlmgr update --self --all"
                                },
                                {
                                    step: 5,
                                    title: "Download & Install TeXstudio",
                                    desc: "The editor for writing LaTeX code.",
                                    details: [
                                        "Go to https://www.texstudio.org/",
                                        "Download the macOS version (.dmg file).",
                                        "Open the .dmg and drag TeXstudio to Applications.",
                                        "First launch: Right-click → Open (to bypass Gatekeeper)."
                                    ],
                                    link: "https://www.texstudio.org/",
                                    warning: "macOS may block the app. Go to System Preferences → Security → 'Open Anyway'."
                                },
                                {
                                    step: 6,
                                    title: "Configure TeXstudio",
                                    desc: "Verify compiler path.",
                                    details: [
                                        "Open TeXstudio.",
                                        "Go to TeXstudio → Preferences → Commands.",
                                        "Verify PdfLaTeX path shows: /Library/TeX/texbin/pdflatex",
                                        "If empty, browse to the path above.",
                                        "Click OK."
                                    ]
                                }
                            ].map((s) => (
                                <div key={s.step} className="bg-card border rounded-2xl p-6 space-y-3 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-lg shrink-0">
                                            {s.step}
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-bold text-lg">{s.title}</h4>
                                                {s.link && (
                                                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary text-xs font-bold hover:underline">
                                                        <ExternalLink className="w-3.5 h-3.5" /> Open Link
                                                    </a>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">{s.desc}</p>
                                            <div className="space-y-1.5 pt-2">
                                                {s.details.map((d, i) => (
                                                    <div key={i} className="flex items-start gap-2 text-sm">
                                                        <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 shrink-0 mt-0.5">{i + 1}</span>
                                                        <p className="leading-relaxed">{d}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            {s.command && (
                                                <div className="flex items-center gap-2 bg-slate-900 rounded-xl p-3 mt-2 group">
                                                    <Terminal className="w-4 h-4 text-slate-500 shrink-0" />
                                                    <code className="text-sm font-mono text-green-400 flex-1">{s.command}</code>
                                                    <button
                                                        onClick={() => copyCommand(s.command!, `mac-${s.step}`)}
                                                        className="p-1 hover:bg-slate-700 rounded transition-colors"
                                                    >
                                                        {copiedCmd === `mac-${s.step}` ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                                                    </button>
                                                </div>
                                            )}
                                            {s.warning && (
                                                <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 mt-2">
                                                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                                    <p className="text-xs text-amber-800 font-medium">{s.warning}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {expandedPlatform === "Linux" && (
                        <motion.div
                            key="linux"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            {[
                                {
                                    step: 1,
                                    title: "Install TeX Live (Full Distribution)",
                                    desc: "TeX Live is the standard LaTeX distribution for Linux.",
                                    details: [
                                        "Open Terminal.",
                                        "For Ubuntu/Debian: sudo apt update && sudo apt install texlive-full",
                                        "For Fedora: sudo dnf install texlive-scheme-full",
                                        "For Arch: sudo pacman -S texlive-most",
                                        "This downloads ~4GB. Use a stable connection."
                                    ],
                                    command: "sudo apt update && sudo apt install texlive-full",
                                    warning: "texlive-full includes ALL packages. Use texlive-base (~300MB) for minimal install, but you'll need to add packages manually."
                                },
                                {
                                    step: 2,
                                    title: "Verify TeX Live Installation",
                                    desc: "Check that pdflatex is available.",
                                    details: [
                                        "In Terminal, type: pdflatex --version",
                                        "You should see 'pdfTeX' with version info.",
                                        "Also check: which pdflatex — should show /usr/bin/pdflatex"
                                    ],
                                    command: "pdflatex --version"
                                },
                                {
                                    step: 3,
                                    title: "Install TeXstudio",
                                    desc: "Available in most Linux package repositories.",
                                    details: [
                                        "Ubuntu/Debian: sudo apt install texstudio",
                                        "Fedora: sudo dnf install texstudio",
                                        "Arch: sudo pacman -S texstudio",
                                        "Or download from texstudio.org for the latest version."
                                    ],
                                    command: "sudo apt install texstudio",
                                    link: "https://www.texstudio.org/"
                                },
                                {
                                    step: 4,
                                    title: "Configure & Verify",
                                    desc: "Launch TeXstudio and verify compiler detection.",
                                    details: [
                                        "Launch TeXstudio from your application menu.",
                                        "Go to Options → Configure TeXstudio → Commands.",
                                        "Verify PdfLaTeX path is set (usually auto-detected).",
                                        "Create a test file and compile with F5."
                                    ]
                                }
                            ].map((s) => (
                                <div key={s.step} className="bg-card border rounded-2xl p-6 space-y-3 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-lg shrink-0">
                                            {s.step}
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-bold text-lg">{s.title}</h4>
                                                {s.link && (
                                                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary text-xs font-bold hover:underline">
                                                        <ExternalLink className="w-3.5 h-3.5" /> Open Link
                                                    </a>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">{s.desc}</p>
                                            <div className="space-y-1.5 pt-2">
                                                {s.details.map((d, i) => (
                                                    <div key={i} className="flex items-start gap-2 text-sm">
                                                        <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 shrink-0 mt-0.5">{i + 1}</span>
                                                        <p className="leading-relaxed">{d}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            {s.command && (
                                                <div className="flex items-center gap-2 bg-slate-900 rounded-xl p-3 mt-2 group">
                                                    <Terminal className="w-4 h-4 text-slate-500 shrink-0" />
                                                    <code className="text-sm font-mono text-green-400 flex-1">{s.command}</code>
                                                    <button
                                                        onClick={() => copyCommand(s.command!, `linux-${s.step}`)}
                                                        className="p-1 hover:bg-slate-700 rounded transition-colors"
                                                    >
                                                        {copiedCmd === `linux-${s.step}` ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                                                    </button>
                                                </div>
                                            )}
                                            {s.warning && (
                                                <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 mt-2">
                                                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                                    <p className="text-xs text-amber-800 font-medium">{s.warning}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* ═══════════════════════════════════════════════ */}
            {/* SECTION 3: FIRST COMPILE TEST */}
            {/* ═══════════════════════════════════════════════ */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500 rounded-xl text-white">
                        <Zap className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Step 2: First Compile Test</h2>
                        <p className="text-sm text-muted-foreground">Verify everything works by compiling a test document.</p>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-3xl p-8 text-white space-y-6 shadow-2xl">
                    <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <h3 className="font-bold">Create this test file in TeXstudio:</h3>
                    </div>
                    <div className="bg-black/40 rounded-2xl p-6 font-mono text-sm text-green-400 leading-relaxed relative group">
                        <pre>{`\\documentclass{article}
\\title{Installation Test}
\\author{Your Name}
\\date{\\today}
\\begin{document}
\\maketitle
\\section{Hello World}
If you can see this PDF, your setup is complete!

The equation $E = mc^2$ proves LaTeX math works.
\\end{document}`}</pre>
                        <button
                            onClick={() => copyCommand(`\\documentclass{article}\n\\title{Installation Test}\n\\author{Your Name}\n\\date{\\today}\n\\begin{document}\n\\maketitle\n\\section{Hello World}\nIf you can see this PDF, your setup is complete!\n\nThe equation $E = mc^2$ proves LaTeX math works.\n\\end{document}`, "test-file")}
                            className="absolute top-3 right-3 p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors opacity-0 group-hover:opacity-100"
                        >
                            {copiedCmd === "test-file" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
                        </button>
                    </div>
                    <div className="space-y-3">
                        <h4 className="font-bold text-sm text-slate-300 uppercase tracking-widest">Steps to test:</h4>
                        {[
                            "Open TeXstudio → File → New.",
                            "Paste the code above.",
                            "Save as 'test.tex' (File → Save As).",
                            "Press F5 (or click the green double-arrow ▶▶ button).",
                            "Wait 5-10 seconds for compilation.",
                            "A PDF should appear in the right panel showing your title, section, and equation."
                        ].map((step, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                                <p className="text-sm text-slate-300">{step}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-start gap-3 bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                        <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-green-300">If you see the PDF with &quot;Installation Test&quot; as the title and the equation E = mc², your setup is 100% working.</p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════ */}
            {/* SECTION 4: COMMON ERRORS & TROUBLESHOOTING */}
            {/* ═══════════════════════════════════════════════ */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500 rounded-xl text-white">
                        <Bug className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Common Errors & Troubleshooting</h2>
                        <p className="text-sm text-muted-foreground">Click each error to see the solution. These are the most common issues scholars face.</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {[
                        {
                            id: "err-1",
                            error: "'pdflatex' is not recognized as an internal or external command",
                            when: "When running pdflatex --version in Command Prompt, or when TeXstudio tries to compile.",
                            cause: "MiKTeX was not added to the system PATH during installation.",
                            solution: [
                                "Open MiKTeX Console from Start Menu.",
                                "Go to Settings tab.",
                                "Look for 'PATH' section and click 'Add MiKTeX to PATH'.",
                                "If that option is not available: Open Windows Settings → System → About → Advanced System Settings → Environment Variables.",
                                "Under 'System Variables', find 'Path', click Edit.",
                                "Add: C:\\Program Files\\MiKTeX\\miktex\\bin\\x64\\",
                                "Click OK on all dialogs.",
                                "RESTART your computer (required for PATH changes to take effect).",
                                "Open a NEW Command Prompt and try pdflatex --version again."
                            ],
                            severity: "critical"
                        },
                        {
                            id: "err-2",
                            error: "Package 'xyz' not found / File 'xyz.sty' not found",
                            when: "During compilation, especially when using \\usepackage{...} for the first time.",
                            cause: "The required LaTeX package is not installed. MiKTeX uses a minimal install by default.",
                            solution: [
                                "If MiKTeX is set to 'Install on-the-fly': A pop-up will appear asking to install. Click 'Install'.",
                                "If no pop-up appears: Open MiKTeX Console → Settings → Set 'Install missing packages' to 'Always'.",
                                "Manual install: Open MiKTeX Console → Packages tab → Search for the package name → Click '+' to install.",
                                "After installing, try compiling again in TeXstudio."
                            ],
                            severity: "common"
                        },
                        {
                            id: "err-3",
                            error: "TeXstudio: 'Could not start the command' or 'PdfLaTeX not found'",
                            when: "When pressing F5 to compile in TeXstudio.",
                            cause: "TeXstudio cannot locate the MiKTeX compiler. The path is not configured.",
                            solution: [
                                "In TeXstudio: Go to Options → Configure TeXstudio → Commands.",
                                "Check the 'PdfLaTeX' field. It should show: pdflatex.exe or the full path.",
                                "If empty: Click the folder icon and browse to: C:\\Program Files\\MiKTeX\\miktex\\bin\\x64\\pdflatex.exe",
                                "Click OK and try compiling again.",
                                "If still failing: Reinstall MiKTeX with 'Add to PATH' checked, then restart TeXstudio."
                            ],
                            severity: "critical"
                        },
                        {
                            id: "err-4",
                            error: "LaTeX Error: File 'article.cls' not found",
                            when: "On the very first compilation attempt.",
                            cause: "MiKTeX installation is corrupted or incomplete.",
                            solution: [
                                "Open MiKTeX Console → Settings → Check for updates.",
                                "If that doesn't help: Uninstall MiKTeX completely.",
                                "Delete the folder: C:\\Users\\YourName\\AppData\\Local\\MiKTeX",
                                "Re-download and reinstall MiKTeX from miktex.org.",
                                "During installation, choose 'Install for all users' and 'Always install packages'."
                            ],
                            severity: "critical"
                        },
                        {
                            id: "err-5",
                            error: "Permission denied / Access denied during installation",
                            when: "During MiKTeX or TeXstudio installation.",
                            cause: "You don't have administrator privileges on the laptop.",
                            solution: [
                                "Right-click the installer → 'Run as Administrator'.",
                                "If you don't have admin access: Ask your IT department or lab administrator.",
                                "Alternative: Install MiKTeX in 'User Mode' (for current user only) — no admin needed.",
                                "During MiKTeX setup, choose 'Install only for me' instead of 'Install for all users'."
                            ],
                            severity: "common"
                        },
                        {
                            id: "err-6",
                            error: "Compilation hangs / takes forever / never finishes",
                            when: "After pressing F5, the compilation spinner never stops.",
                            cause: "Usually caused by an infinite loop in LaTeX code, or MiKTeX trying to download a package without internet.",
                            solution: [
                                "Press the red 'Stop' button in TeXstudio toolbar to kill the process.",
                                "Check your internet connection — MiKTeX may be trying to download a package.",
                                "Check your .tex file for errors: missing \\end{document}, unclosed environments.",
                                "Try compiling the simple test file first to isolate the issue.",
                                "If it happens on every file: Restart TeXstudio and try again."
                            ],
                            severity: "common"
                        },
                        {
                            id: "err-7",
                            error: "PDF viewer shows blank or old version",
                            when: "After successful compilation, the PDF doesn't update.",
                            cause: "The internal PDF viewer may be stuck, or the PDF is locked by another program.",
                            solution: [
                                "Close any external PDF viewer (Adobe, Foxit) that has the file open.",
                                "In TeXstudio: View → PDF Viewer → Refresh.",
                                "Try: Tools → Clean Auxiliary Files, then recompile.",
                                "If using external viewer: Go to Options → Configure TeXstudio → Build → Set 'PDF Viewer' to 'Internal'."
                            ],
                            severity: "minor"
                        },
                        {
                            id: "err-8",
                            error: "References show [?] or 'undefined reference'",
                            when: "After using \\cite{}, \\ref{}, or \\label{} commands.",
                            cause: "LaTeX needs multiple compilation passes to resolve cross-references.",
                            solution: [
                                "This is NORMAL on first compile. Compile 2-3 times in a row.",
                                "For citations: Run PdfLaTeX → BibTeX → PdfLaTeX → PdfLaTeX (4 passes).",
                                "In TeXstudio: Use Tools → Build & View (F5) twice, or set up a build chain.",
                                "Check that your \\label{} and \\ref{} keys match exactly (case-sensitive)."
                            ],
                            severity: "minor"
                        },
                        {
                            id: "err-9",
                            error: "MiKTeX Console: 'Windows API error 5: Access is denied'",
                            when: "When trying to update packages in MiKTeX Console.",
                            cause: "MiKTeX Console needs administrator mode for system-wide updates.",
                            solution: [
                                "In MiKTeX Console: Click 'Switch to Administrator Mode' at the top.",
                                "If that button is missing: Close MiKTeX Console, right-click it → 'Run as Administrator'.",
                                "If you installed MiKTeX for 'current user only': No admin mode is needed, but updates only apply to your profile."
                            ],
                            severity: "common"
                        },
                        {
                            id: "err-10",
                            error: "macOS: 'TeXstudio can't be opened because it is from an unidentified developer'",
                            when: "First time launching TeXstudio on macOS.",
                            cause: "macOS Gatekeeper blocks apps not from the App Store.",
                            solution: [
                                "Right-click TeXstudio in Applications → Click 'Open' (not double-click).",
                                "Click 'Open' in the dialog that appears.",
                                "If that doesn't work: Go to System Preferences → Security & Privacy → General.",
                                "You'll see 'TeXstudio was blocked'. Click 'Open Anyway'.",
                                "This only needs to be done once."
                            ],
                            severity: "common"
                        }
                    ].map((err) => (
                        <div key={err.id} className="border rounded-2xl overflow-hidden shadow-sm">
                            <button
                                onClick={() => setExpandedError(expandedError === err.id ? null : err.id)}
                                className={cn(
                                    "w-full p-5 flex items-start gap-4 text-left transition-colors",
                                    err.severity === "critical" ? "bg-red-50 hover:bg-red-100" :
                                        err.severity === "common" ? "bg-amber-50 hover:bg-amber-100" :
                                            "bg-blue-50 hover:bg-blue-100"
                                )}
                            >
                                <div className={cn(
                                    "p-1.5 rounded-lg shrink-0 mt-0.5",
                                    err.severity === "critical" ? "bg-red-200 text-red-700" :
                                        err.severity === "common" ? "bg-amber-200 text-amber-700" :
                                            "bg-blue-200 text-blue-700"
                                )}>
                                    <Bug className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={cn(
                                            "text-[9px] font-bold uppercase px-2 py-0.5 rounded-full",
                                            err.severity === "critical" ? "bg-red-200 text-red-800" :
                                                err.severity === "common" ? "bg-amber-200 text-amber-800" :
                                                    "bg-blue-200 text-blue-800"
                                        )}>
                                            {err.severity}
                                        </span>
                                    </div>
                                    <p className="font-bold text-sm font-mono text-red-800">{err.error}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{err.when}</p>
                                </div>
                                {expandedError === err.id ? <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                            </button>
                            <AnimatePresence>
                                {expandedError === err.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-5 bg-white border-t space-y-4">
                                            <div className="flex items-start gap-2">
                                                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-1">Root Cause</p>
                                                    <p className="text-sm text-slate-700">{err.cause}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Wrench className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                                <div className="space-y-2">
                                                    <p className="text-xs font-bold text-green-700 uppercase tracking-widest">Solution Steps</p>
                                                    {err.solution.map((s, i) => (
                                                        <div key={i} className="flex items-start gap-2">
                                                            <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-[10px] font-bold text-green-700 shrink-0 mt-0.5">{i + 1}</span>
                                                            <p className="text-sm text-slate-700 leading-relaxed">{s}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════ */}
            {/* SECTION 5: MASTER READINESS CHECKLIST */}
            {/* ═══════════════════════════════════════════════ */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500 rounded-xl text-white">
                        <ClipboardList className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Master Readiness Checklist</h2>
                        <p className="text-sm text-muted-foreground">Tick off each item as you complete it. Aim for 100% before the workshop.</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-card border rounded-2xl p-6 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-muted-foreground">Progress</span>
                        <span className="text-sm font-bold">{completedCount}/{totalChecks} completed</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                        <motion.div
                            className={cn(
                                "h-full rounded-full transition-all",
                                progress === 100 ? "bg-green-500" : progress >= 50 ? "bg-primary" : "bg-amber-400"
                            )}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                    {progress === 100 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4"
                        >
                            <Trophy className="w-6 h-6 text-green-600" />
                            <p className="text-sm font-bold text-green-800">Your workbench is fully set up. You are ready for the workshop.</p>
                        </motion.div>
                    )}
                </div>

                {/* Checklist Items */}
                <div className="grid md:grid-cols-2 gap-3">
                    {[
                        { key: "ram", label: "RAM ≥ 4 GB verified", group: "Prerequisites" },
                        { key: "disk", label: "Disk space ≥ 5 GB free", group: "Prerequisites" },
                        { key: "internet", label: "Internet connection working", group: "Prerequisites" },
                        { key: "admin", label: "Administrator access confirmed", group: "Prerequisites" },
                        { key: "compiler", label: "LaTeX compiler installed (MiKTeX / TeX Live / MacTeX)", group: "Installation" },
                        { key: "compilerPath", label: "pdflatex --version works in terminal", group: "Installation" },
                        { key: "compilerPackages", label: "Packages updated to latest", group: "Installation" },
                        { key: "editor", label: "TeXstudio installed and opens", group: "Installation" },
                        { key: "editorConfig", label: "TeXstudio detects compiler (Commands tab)", group: "Installation" },
                        { key: "firstFile", label: "Created test.tex file", group: "Verification" },
                        { key: "firstCompile", label: "F5 compile produces PDF", group: "Verification" },
                        { key: "pdfViewer", label: "PDF shows title, section, and equation", group: "Verification" },
                    ].map((item) => (
                        <motion.button
                            key={item.key}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleCheck(item.key)}
                            className={cn(
                                "flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                                checklist[item.key]
                                    ? "bg-green-50 border-green-300 text-green-800"
                                    : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                            )}
                        >
                            {checklist[item.key]
                                ? <CircleCheckBig className="w-5 h-5 text-green-600 shrink-0" />
                                : <CircleDashed className="w-5 h-5 text-slate-300 shrink-0" />
                            }
                            <div>
                                <p className="text-sm font-medium">{item.label}</p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.group}</p>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════ */}
            {/* SECTION 6: ACTIVITY TRACK */}
            {/* ═══════════════════════════════════════════════ */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500 rounded-xl text-white">
                        <Target className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">Activity Track: Workbench Setup</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            level: "Inspector",
                            icon: <Eye className="w-6 h-6" />,
                            color: "bg-green-50 border-green-200",
                            iconBg: "bg-green-100 text-green-700",
                            tasks: [
                                "Install MiKTeX (Windows) or TeX Live (Mac/Linux)",
                                "Install TeXstudio",
                                "Verify pdflatex --version in terminal",
                                "Compile the test document and see the PDF"
                            ]
                        },
                        {
                            level: "Engineer",
                            icon: <Settings className="w-6 h-6" />,
                            color: "bg-blue-50 border-blue-200",
                            iconBg: "bg-blue-100 text-blue-700",
                            tasks: [
                                "Configure TeXstudio to use PdfLaTeX as default",
                                "Enable 'Install packages on-the-fly' in MiKTeX",
                                "Update all packages to latest version",
                                "Set up spell-checker in TeXstudio (Options → Language)"
                            ]
                        },
                        {
                            level: "Systems Lead",
                            icon: <Rocket className="w-6 h-6" />,
                            color: "bg-purple-50 border-purple-200",
                            iconBg: "bg-purple-100 text-purple-700",
                            tasks: [
                                "Help a peer complete their installation",
                                "Troubleshoot at least one error from the list above",
                                "Create a custom build chain: PdfLaTeX → BibTeX → PdfLaTeX × 2",
                                "Configure TeXstudio to use an external PDF viewer"
                            ]
                        }
                    ].map((track) => (
                        <div key={track.level} className={cn("rounded-2xl border-2 p-6 space-y-4", track.color)}>
                            <div className="flex items-center gap-3">
                                <div className={cn("p-2 rounded-xl", track.iconBg)}>
                                    {track.icon}
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Level</p>
                                    <h4 className="font-bold text-lg">{track.level}</h4>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {track.tasks.map((task, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <Star className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                        <p className="text-sm leading-relaxed">{task}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Session Quiz */}
            <SessionQuiz title="Installation Knowledge Check" questions={SESSION_QUIZZES["session-1-install"]} />
        </div>
    );
}