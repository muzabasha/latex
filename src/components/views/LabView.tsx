"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { LatexEditor } from "@/components/LatexEditor";
import { LatexPreview } from "@/components/LatexPreview";
import { motion, AnimatePresence } from "framer-motion";
import {
    Beaker, CheckCircle, Circle, Trophy, Target, Lightbulb,
    Flame, Sprout, TreePine, Wheat,
    RotateCcw, Filter, BookOpen, Zap, Award,
    CircleCheckBig, CircleDashed, ArrowRight, Code2,
    Copy, GraduationCap, Footprints, Eye, EyeOff,
    ChevronDown, ChevronUp, Sparkles, ClipboardCheck
} from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
import { LAB_EXPERIMENTS } from "@/lib/lab-experiments";

const DIFFICULTY_CONFIG = {
    seedling: {
        label: "Seedling",
        icon: Sprout,
        color: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-200",
        badge: "bg-green-100 text-green-700",
        ring: "ring-green-300",
        gradient: "from-green-500 to-emerald-500",
    },
    sprout: {
        label: "Sprout",
        icon: TreePine,
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
        badge: "bg-blue-100 text-blue-700",
        ring: "ring-blue-300",
        gradient: "from-blue-500 to-cyan-500",
    },
    harvester: {
        label: "Harvester",
        icon: Wheat,
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
        badge: "bg-amber-100 text-amber-700",
        ring: "ring-amber-300",
        gradient: "from-amber-500 to-orange-500",
    },
};

type DifficultyFilter = "all" | "seedling" | "sprout" | "harvester";
type LabMode = "explore" | "guided";

export function LabView() {
    const [filter, setFilter] = useState<DifficultyFilter>("all");
    const [selectedId, setSelectedId] = useState<string>(LAB_EXPERIMENTS[0].id);
    const [codes, setCodes] = useState<Record<string, string>>({});
    const [isCompiling, setIsCompiling] = useState(false);
    const [checkResults, setCheckResults] = useState<Record<string, Record<number, boolean>>>({});
    const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
    const [showHints, setShowHints] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);
    const [streak, setStreak] = useState(0);
    const [labMode, setLabMode] = useState<LabMode>("explore");
    const [guidedStepIdx, setGuidedStepIdx] = useState<Record<string, number>>({});
    const [livePreview, setLivePreview] = useState(true);
    const [showSnippets, setShowSnippets] = useState(false);
    const [showTips, setShowTips] = useState(false);
    const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
    const [expandedTask, setExpandedTask] = useState(true);
    const editorRef = useRef<string>("");

    const filtered = useMemo(() =>
        filter === "all" ? LAB_EXPERIMENTS : LAB_EXPERIMENTS.filter(e => e.difficulty === filter),
        [filter]
    );

    const selected = LAB_EXPERIMENTS.find(e => e.id === selectedId) || LAB_EXPERIMENTS[0];
    const currentCode = codes[selectedId] ?? selected.starterCode;
    const dc = DIFFICULTY_CONFIG[selected.difficulty];
    const DiffIcon = dc.icon;

    const completedCount = completedIds.size;
    const totalCount = LAB_EXPERIMENTS.length;
    const seedlingDone = LAB_EXPERIMENTS.filter(e => e.difficulty === "seedling" && completedIds.has(e.id)).length;
    const sproutDone = LAB_EXPERIMENTS.filter(e => e.difficulty === "sprout" && completedIds.has(e.id)).length;
    const harvesterDone = LAB_EXPERIMENTS.filter(e => e.difficulty === "harvester" && completedIds.has(e.id)).length;

    const currentGuidedStep = guidedStepIdx[selectedId] ?? 0;
    const guidedSteps = selected.guidedSteps || [];
    const hasGuidedSteps = guidedSteps.length > 0;

    // Track code changes for live preview
    const handleCodeChange = useCallback((newCode: string) => {
        editorRef.current = newCode;
        if (livePreview) {
            setCodes(prev => ({ ...prev, [selectedId]: newCode }));
        }
    }, [selectedId, livePreview]);

    const handleCompile = (newCode: string) => {
        setIsCompiling(true);
        setTimeout(() => {
            setCodes(prev => ({ ...prev, [selectedId]: newCode }));
            setIsCompiling(false);

            // Run checks
            const results: Record<number, boolean> = {};
            let allPassed = true;
            selected.checks.forEach((check, idx) => {
                const passed = check.regex.test(newCode);
                results[idx] = passed;
                if (!passed) allPassed = false;
            });
            setCheckResults(prev => ({ ...prev, [selectedId]: results }));

            // Advance guided step if current step passes
            if (labMode === "guided" && hasGuidedSteps) {
                const step = guidedSteps[currentGuidedStep];
                if (step && step.checkRegex.test(newCode) && currentGuidedStep < guidedSteps.length - 1) {
                    setGuidedStepIdx(prev => ({ ...prev, [selectedId]: currentGuidedStep + 1 }));
                }
            }

            if (allPassed && !completedIds.has(selectedId)) {
                setCompletedIds(prev => new Set([...prev, selectedId]));
                setStreak(prev => prev + 1);
                confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });

                const newCompleted = new Set([...completedIds, selectedId]);
                if (newCompleted.size === totalCount) {
                    setTimeout(() => {
                        confetti({ particleCount: 300, spread: 120, origin: { y: 0.4 } });
                    }, 600);
                }
            } else if (!allPassed) {
                setStreak(0);
            }
        }, 600);
    };

    const handleReset = () => {
        setCodes(prev => {
            const next = { ...prev };
            delete next[selectedId];
            return next;
        });
        setCheckResults(prev => {
            const next = { ...prev };
            delete next[selectedId];
            return next;
        });
        setGuidedStepIdx(prev => ({ ...prev, [selectedId]: 0 }));
    };

    const selectExperiment = (id: string) => {
        setSelectedId(id);
        setShowHints(false);
        setShowInstructions(true);
        setShowSnippets(false);
        setShowTips(false);
    };

    const goToNext = () => {
        const currentIndex = filtered.findIndex(e => e.id === selectedId);
        if (currentIndex < filtered.length - 1) {
            selectExperiment(filtered[currentIndex + 1].id);
        }
    };

    const copySnippet = (code: string, label: string) => {
        navigator.clipboard.writeText(code);
        setCopiedSnippet(label);
        setTimeout(() => setCopiedSnippet(null), 1500);
    };

    const currentChecks = checkResults[selectedId] || {};
    const passedChecks = Object.values(currentChecks).filter(Boolean).length;
    const totalChecks = selected.checks.length;
    const isCompleted = completedIds.has(selectedId);

    return (
        <div className="space-y-5 pb-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary rounded-xl text-white">
                            <Beaker className="w-6 h-6" />
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight outfit-font">Hands-On Lab</h1>
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-bold ml-2">NEP 2020 Learn-by-Doing</span>
                    </div>
                    <p className="text-sm text-muted-foreground max-w-2xl">
                        Select a task → Write LaTeX code → Compile → See live results on the right. Progress from 🌱 Seedling to 🌾 Harvester.
                    </p>
                </div>

                {/* Stats + Mode Toggle */}
                <div className="flex items-center gap-3 flex-wrap">
                    {/* Mode Toggle */}
                    <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
                        <button
                            onClick={() => setLabMode("explore")}
                            className={cn(
                                "px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
                                labMode === "explore" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"
                            )}
                        >
                            <Code2 className="w-3.5 h-3.5" /> Explore
                        </button>
                        <button
                            onClick={() => setLabMode("guided")}
                            className={cn(
                                "px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
                                labMode === "guided" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"
                            )}
                        >
                            <Footprints className="w-3.5 h-3.5" /> Guided
                        </button>
                    </div>

                    {streak > 1 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-1.5 bg-orange-100 text-orange-700 px-3 py-2 rounded-xl text-sm font-bold"
                        >
                            <Flame className="w-4 h-4" /> {streak} Streak
                        </motion.div>
                    )}
                    <div className="bg-slate-900 text-white px-5 py-3 rounded-2xl flex items-center gap-4 shadow-lg">
                        <div className="flex items-center gap-1.5">
                            <Award className="w-4 h-4 text-amber-400" />
                            <span className="text-sm font-bold">{completedCount}/{totalCount}</span>
                        </div>
                        <div className="h-4 w-px bg-slate-700" />
                        <div className="flex gap-2 text-xs">
                            <span className="text-green-400">🌱{seedlingDone}</span>
                            <span className="text-blue-400">🌿{sproutDone}</span>
                            <span className="text-amber-400">🌾{harvesterDone}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-linear-to-r from-green-500 via-blue-500 to-amber-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedCount / totalCount) * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-4 h-4 text-muted-foreground" />
                {(["all", "seedling", "sprout", "harvester"] as const).map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={cn(
                            "px-4 py-2 rounded-xl text-sm font-bold transition-all border",
                            filter === f
                                ? "bg-slate-900 text-white border-slate-900 shadow-md"
                                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                        )}
                    >
                        {f === "all" ? "All Experiments" : `${f === "seedling" ? "🌱" : f === "sprout" ? "🌿" : "🌾"} ${f.charAt(0).toUpperCase() + f.slice(1)}`}
                    </button>
                ))}
            </div>

            {/* Main Layout: 3-column on large screens */}
            <div className="grid lg:grid-cols-12 gap-4 min-h-[700px]">
                {/* Experiment List — Left Panel */}
                <div className="lg:col-span-2 bg-card border rounded-2xl p-3 shadow-sm flex flex-col overflow-hidden">
                    <h3 className="text-[10px] font-bold flex items-center gap-2 mb-2 px-2 text-muted-foreground uppercase tracking-widest">
                        <Beaker className="w-3.5 h-3.5 text-primary" /> Tasks
                    </h3>

                    <div className="space-y-1 overflow-y-auto flex-1 pr-1">
                        {filtered.map((exp) => {
                            const d = DIFFICULTY_CONFIG[exp.difficulty];
                            const done = completedIds.has(exp.id);
                            const active = selectedId === exp.id;
                            return (
                                <button
                                    key={exp.id}
                                    onClick={() => selectExperiment(exp.id)}
                                    className={cn(
                                        "w-full text-left p-2.5 rounded-xl transition-all border group",
                                        active ? `${d.border} ${d.bg} shadow-sm ring-2 ${d.ring}` : "border-transparent hover:bg-slate-50",
                                        done && !active && "opacity-70"
                                    )}
                                >
                                    <div className="flex items-start gap-2">
                                        <div className="mt-0.5 shrink-0">
                                            {done ? (
                                                <CircleCheckBig className="w-3.5 h-3.5 text-green-500" />
                                            ) : (
                                                <CircleDashed className={cn("w-3.5 h-3.5", active ? d.color : "text-slate-300")} />
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className={cn(
                                                "text-[11px] font-bold leading-tight",
                                                done && "line-through opacity-60"
                                            )}>
                                                {exp.title}
                                            </p>
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <span className={cn("text-[8px] font-bold px-1 py-0.5 rounded-full", d.badge)}>
                                                    {d.label}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {completedCount === totalCount && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-linear-to-br from-amber-500 to-orange-500 text-white p-3 rounded-xl text-center space-y-1 shadow-xl shrink-0 mt-2"
                        >
                            <Trophy className="w-6 h-6 mx-auto" />
                            <h4 className="font-bold text-xs">All Complete!</h4>
                            <p className="text-[9px] opacity-80">LaTeX Harvester 🌾</p>
                        </motion.div>
                    )}
                </div>

                {/* Workspace — Right Panel (10 cols) */}
                <div className="lg:col-span-10 flex flex-col gap-4 min-h-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selected.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-4 h-full"
                        >
                            {/* Task Header — Collapsible */}
                            <div className={cn("rounded-2xl border-2 overflow-hidden", dc.border, dc.bg)}>
                                <button
                                    onClick={() => setExpandedTask(!expandedTask)}
                                    className="w-full p-4 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn("p-2 rounded-xl text-white bg-linear-to-br", dc.gradient)}>
                                            <DiffIcon className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <h2 className="text-lg font-bold">{selected.title}</h2>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", dc.badge)}>{dc.label}</span>
                                                <span className="text-xs text-muted-foreground">{selected.category}</span>
                                                {labMode === "guided" && hasGuidedSteps && (
                                                    <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                                        <Footprints className="w-3 h-3" /> Step {currentGuidedStep + 1}/{guidedSteps.length}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setShowSnippets(!showSnippets); }}
                                            className={cn("p-2 rounded-lg transition-colors text-sm", showSnippets ? "bg-indigo-200 shadow-sm" : "hover:bg-white/50")}
                                            title="Code snippets"
                                        >
                                            <Code2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setShowTips(!showTips); }}
                                            className={cn("p-2 rounded-lg transition-colors text-sm", showTips ? "bg-teal-200 shadow-sm" : "hover:bg-white/50")}
                                            title="Tips & Options"
                                        >
                                            <BookOpen className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setShowHints(!showHints); }}
                                            className={cn("p-2 rounded-lg transition-colors text-sm", showHints ? "bg-amber-200 shadow-sm" : "hover:bg-white/50")}
                                            title="Toggle hints"
                                        >
                                            <Lightbulb className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setLivePreview(!livePreview); }}
                                            className={cn("p-2 rounded-lg transition-colors text-sm", livePreview ? "bg-green-200 shadow-sm" : "hover:bg-white/50")}
                                            title={livePreview ? "Live preview ON" : "Live preview OFF"}
                                        >
                                            {livePreview ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                        </button>
                                        <button onClick={(e) => { e.stopPropagation(); handleReset(); }} className="p-2 hover:bg-white/50 rounded-lg transition-colors" title="Reset code">
                                            <RotateCcw className="w-4 h-4" />
                                        </button>
                                        {expandedTask ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {expandedTask && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-4 pb-4 space-y-3">
                                                {/* Agriculture Context */}
                                                <div className="flex items-start gap-2 bg-white/60 rounded-xl p-3 border border-white">
                                                    <span className="text-base shrink-0">🌾</span>
                                                    <p className="text-xs text-slate-700 italic leading-relaxed">{selected.agriContext}</p>
                                                </div>

                                                {/* Objective */}
                                                <div className="flex items-center gap-2">
                                                    <Target className="w-4 h-4 text-slate-500 shrink-0" />
                                                    <p className="text-sm font-medium text-slate-800">{selected.objective}</p>
                                                </div>

                                                {/* Guided Mode: Step-by-step */}
                                                {labMode === "guided" && hasGuidedSteps && (
                                                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            <GraduationCap className="w-4 h-4 text-indigo-600" />
                                                            <p className="text-xs font-bold text-indigo-700 uppercase tracking-widest">Guided Walkthrough</p>
                                                        </div>
                                                        {/* Step progress */}
                                                        <div className="flex gap-1">
                                                            {guidedSteps.map((_, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={cn(
                                                                        "h-1.5 flex-1 rounded-full transition-all",
                                                                        i < currentGuidedStep ? "bg-indigo-500" :
                                                                            i === currentGuidedStep ? "bg-indigo-400 animate-pulse" :
                                                                                "bg-indigo-200"
                                                                    )}
                                                                />
                                                            ))}
                                                        </div>
                                                        {/* Current step */}
                                                        <div className="flex items-start gap-3">
                                                            <span className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                                                                {currentGuidedStep + 1}
                                                            </span>
                                                            <div className="space-y-2 flex-1">
                                                                <p className="text-sm text-indigo-900 font-medium">{guidedSteps[currentGuidedStep]?.instruction}</p>
                                                                {guidedSteps[currentGuidedStep]?.codeToAdd && (
                                                                    <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-green-400 relative group">
                                                                        <pre className="whitespace-pre-wrap">{guidedSteps[currentGuidedStep].codeToAdd}</pre>
                                                                        <button
                                                                            onClick={() => {
                                                                                navigator.clipboard.writeText(guidedSteps[currentGuidedStep].codeToAdd);
                                                                                setCopiedSnippet("guided");
                                                                                setTimeout(() => setCopiedSnippet(null), 1500);
                                                                            }}
                                                                            className="absolute top-2 right-2 p-1 bg-slate-700 rounded hover:bg-slate-600 transition-colors opacity-0 group-hover:opacity-100"
                                                                            title="Copy to clipboard"
                                                                        >
                                                                            {copiedSnippet === "guided" ? <ClipboardCheck className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-slate-300" />}
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Explore Mode: Instructions */}
                                                {labMode === "explore" && showInstructions && (
                                                    <div className="bg-white rounded-xl p-4 border space-y-2">
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Step-by-Step Instructions</p>
                                                        {selected.instructions.map((step, i) => (
                                                            <div key={i} className="flex items-start gap-2.5">
                                                                <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 shrink-0 mt-0.5">{i + 1}</span>
                                                                <p className="text-xs text-slate-700 leading-relaxed">{step}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Snippet Helper Panel */}
                            <AnimatePresence>
                                {showSnippets && selected.snippets && selected.snippets.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-700">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Sparkles className="w-4 h-4 text-amber-400" />
                                                <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Quick Snippets — Click to Copy</p>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                                {selected.snippets.map((snippet, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => copySnippet(snippet.code, snippet.label)}
                                                        className="text-left p-3 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 hover:border-slate-500 transition-all group"
                                                    >
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-[10px] font-bold text-amber-400">{snippet.label}</span>
                                                            {copiedSnippet === snippet.label ? (
                                                                <ClipboardCheck className="w-3 h-3 text-green-400" />
                                                            ) : (
                                                                <Copy className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
                                                            )}
                                                        </div>
                                                        <p className="text-[10px] text-slate-400 leading-tight">{snippet.description}</p>
                                                        <pre className="text-[9px] text-green-400/70 mt-1 truncate font-mono">{snippet.code.split("\n")[0]}</pre>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Tips & Options Panel */}
                            <AnimatePresence>
                                {showTips && selected.tips && selected.tips.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-4 space-y-4">
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="w-4 h-4 text-teal-600" />
                                                <p className="text-xs font-bold text-teal-800 uppercase tracking-widest">Tips, Options & PDF Impact</p>
                                            </div>
                                            <div className="space-y-3">
                                                {selected.tips.map((tip, tIdx) => (
                                                    <div key={tIdx} className="bg-white rounded-xl border border-teal-100 overflow-hidden">
                                                        <div className="px-4 py-3 bg-teal-100/50 border-b border-teal-100">
                                                            <code className="text-sm font-bold font-mono text-teal-900">{tip.command}</code>
                                                            <p className="text-xs text-teal-700 mt-1 flex items-start gap-1.5">
                                                                <Lightbulb className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                                                                {tip.userTip}
                                                            </p>
                                                        </div>
                                                        <div className="divide-y divide-teal-50">
                                                            {tip.options.map((opt, oIdx) => (
                                                                <div key={oIdx} className="px-4 py-2.5 flex items-start gap-3 hover:bg-teal-50/50 transition-colors">
                                                                    <code className="text-[11px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded shrink-0 mt-0.5 max-w-[220px] break-all">{opt.option}</code>
                                                                    <p className="text-xs text-slate-600 leading-relaxed flex-1">{opt.impact}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Code Editor + Live Preview — Side by Side */}
                            <div className="grid lg:grid-cols-2 gap-4 flex-1 min-h-[420px]">
                                <div className="flex flex-col min-h-0">
                                    <LatexEditor
                                        initialCode={currentCode}
                                        onCompile={handleCompile}
                                        height="100%"
                                    />
                                </div>
                                <div className="flex flex-col min-h-0 relative">
                                    {livePreview && (
                                        <div className="absolute top-2 right-14 z-10">
                                            <span className="text-[9px] bg-green-500 text-white px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
                                            </span>
                                        </div>
                                    )}
                                    <LatexPreview
                                        code={codes[selectedId] ?? selected.starterCode}
                                        isCompiling={isCompiling}
                                    />
                                </div>
                            </div>

                            {/* Validation Checks Panel */}
                            <div className={cn(
                                "rounded-2xl p-5 border-2 space-y-4 transition-colors",
                                isCompleted ? "bg-green-50 border-green-200" : "bg-white border-slate-200"
                            )}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Zap className={cn("w-5 h-5", isCompleted ? "text-green-600" : "text-slate-400")} />
                                        <h3 className="font-bold text-sm">
                                            Validation Checks
                                            <span className="ml-2 text-xs font-normal text-muted-foreground">
                                                ({passedChecks}/{totalChecks} passed)
                                            </span>
                                        </h3>
                                    </div>
                                    {isCompleted && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1.5 rounded-full flex items-center gap-1"
                                        >
                                            <CheckCircle className="w-3.5 h-3.5" /> Experiment Passed
                                        </motion.span>
                                    )}
                                </div>

                                {/* Check progress bar */}
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        className={cn("h-full rounded-full", isCompleted ? "bg-green-500" : "bg-primary")}
                                        animate={{ width: totalChecks > 0 ? `${(passedChecks / totalChecks) * 100}%` : "0%" }}
                                        transition={{ duration: 0.4 }}
                                    />
                                </div>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {selected.checks.map((check, idx) => {
                                        const passed = currentChecks[idx];
                                        const hasResult = idx in currentChecks;
                                        return (
                                            <div
                                                key={idx}
                                                className={cn(
                                                    "flex items-start gap-2.5 p-3 rounded-xl border transition-all text-xs",
                                                    hasResult && passed && "bg-green-50 border-green-200",
                                                    hasResult && !passed && "bg-red-50 border-red-200",
                                                    !hasResult && "bg-slate-50 border-slate-100"
                                                )}
                                            >
                                                <div className="mt-0.5 shrink-0">
                                                    {hasResult ? (
                                                        passed ? <CheckCircle className="w-3.5 h-3.5 text-green-600" /> : <Circle className="w-3.5 h-3.5 text-red-400" />
                                                    ) : (
                                                        <CircleDashed className="w-3.5 h-3.5 text-slate-300" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className={cn("font-semibold", hasResult && !passed && "text-red-700", hasResult && passed && "text-green-700")}>
                                                        {check.label}
                                                    </p>
                                                    {showHints && !passed && (
                                                        <p className="text-[10px] text-amber-700 mt-1 italic">{check.hint}</p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Success / Pro Tip / Next */}
                                <AnimatePresence>
                                    {isCompleted && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-3"
                                        >
                                            <div className="bg-green-100 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                                                <Trophy className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                                <p className="text-sm text-green-800 font-medium">{selected.successMessage}</p>
                                            </div>
                                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                                                <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-1">Pro Tip</p>
                                                    <p className="text-xs text-amber-800 italic">{selected.proTip}</p>
                                                </div>
                                            </div>
                                            {filtered.findIndex(e => e.id === selectedId) < filtered.length - 1 && (
                                                <button
                                                    onClick={goToNext}
                                                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-lg"
                                                >
                                                    Next Experiment <ArrowRight className="w-4 h-4" />
                                                </button>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
