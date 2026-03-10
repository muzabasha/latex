"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Settings2, Code2, Eye, Lightbulb, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandOption {
    name: string;
    description: string;
    impact: string;
    pdfImpact?: string;
    whenToUse?: string;
}

interface LatexCommand {
    name: string;
    syntax: string;
    description: string;
    guidelines?: string[];
    options: CommandOption[];
    example: string;
    preview: string;
}

interface CompilationDiscoveryProps {
    commands: LatexCommand[];
    moduleTitle: string;
}

export function CompilationDiscovery({ commands, moduleTitle }: CompilationDiscoveryProps) {
    const [selectedCommand, setSelectedCommand] = useState(commands[0]);
    const [selectedOption, setSelectedOption] = useState<CommandOption | null>(null);

    return (
        <section className="bg-card border rounded-[3rem] p-12 shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -mr-32 -mt-32 transition-colors group-hover:bg-primary/10" />

            <div className="relative z-10 space-y-10">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold outfit-font italic">Interactive Compilation Discovery</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Explore the &quot;Molecules&quot; of {moduleTitle}. Select a command to see guidelines, options, and how each choice impacts your final PDF.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-10">
                    {/* Command Selector */}
                    <div className="lg:col-span-3 space-y-4">
                        <div className="flex items-center gap-2 mb-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            <Code2 className="w-4 h-4 text-primary" /> Select Command
                        </div>
                        <div className="flex flex-col gap-2">
                            {commands.map((cmd) => (
                                <button
                                    key={cmd.name}
                                    onClick={() => {
                                        setSelectedCommand(cmd);
                                        setSelectedOption(null);
                                    }}
                                    className={cn(
                                        "text-left px-5 py-4 rounded-2xl transition-all duration-300 font-mono text-sm border-2",
                                        selectedCommand.name === cmd.name
                                            ? "bg-slate-900 text-white border-slate-900 shadow-xl scale-105"
                                            : "bg-white text-slate-600 border-slate-100 hover:border-primary/30 hover:bg-primary/5"
                                    )}
                                >
                                    {cmd.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Editor & Preview Area */}
                    <div className="lg:col-span-9 space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Source Discovery */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs font-bold text-orange-500 uppercase">
                                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" /> Source Engine
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase">.tex code</div>
                                </div>

                                <div className="bg-slate-900 rounded-4xl p-8 shadow-2xl border border-white/5 relative min-h-[250px] flex flex-col justify-center">
                                    <pre className="font-mono text-sm text-slate-300 leading-relaxed overflow-x-auto">
                                        {selectedOption
                                            ? selectedCommand.syntax.replace('}', `${selectedOption.impact}}`)
                                            : selectedCommand.syntax
                                        }
                                        {"\n"}
                                        {selectedCommand.example}
                                    </pre>
                                    <div className="absolute bottom-6 right-6 opacity-30">
                                        <Code2 className="w-12 h-12 text-slate-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Result Preview */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs font-bold text-blue-500 uppercase">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Formatted Result
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase">Live Output</div>
                                </div>
                                <div className="bg-white rounded-4xl p-10 shadow-3xl border border-slate-200 aspect-square md:aspect-auto md:min-h-[250px] flex flex-col items-center justify-center text-center relative group/preview">
                                    <div className="absolute top-4 right-4 opacity-10 group-hover/preview:opacity-30 transition-opacity">
                                        <Eye className="w-12 h-12 text-slate-900" />
                                    </div>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={selectedCommand.name + (selectedOption?.name || '')}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.05 }}
                                            className="space-y-4"
                                        >
                                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                                <CheckCircle2 className="w-6 h-6 text-primary" />
                                            </div>
                                            <p className={cn(
                                                "text-2xl font-serif text-slate-800",
                                                selectedOption?.impact.includes('section') && "font-bold text-3xl",
                                                selectedOption?.impact.includes('bf') && "font-bold",
                                                selectedOption?.impact.includes('it') && "italic"
                                            )}>
                                                {selectedCommand.preview}
                                            </p>
                                            {selectedOption && (
                                                <p className="text-xs text-primary font-bold uppercase tracking-widest mt-2 animate-bounce">
                                                    Option Applied: {selectedOption.name}
                                                </p>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* User Guidelines & Tips */}
                        {selectedCommand.guidelines && selectedCommand.guidelines.length > 0 && (
                            <div className="bg-amber-50/80 border border-amber-200/60 rounded-3xl p-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-100 rounded-xl">
                                        <Lightbulb className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <h3 className="font-bold text-base text-amber-900">Guidelines &amp; Tips</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {selectedCommand.guidelines.map((tip, idx) => (
                                        <div
                                            key={idx}
                                            className="flex gap-3 p-3 bg-white/70 rounded-xl border border-amber-100 text-left"
                                        >
                                            <span className="text-amber-500 font-bold text-xs mt-0.5 shrink-0">{idx + 1}.</span>
                                            <p className="text-[12px] text-amber-900 leading-relaxed">{tip}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Options Discovery */}
                        <div className="bg-slate-50/50 rounded-4xl p-8 border border-slate-100 space-y-6">
                            <div className="flex items-center gap-3">
                                <Settings2 className="w-5 h-5 text-primary" />
                                <h3 className="font-bold text-lg">Available Options (Modifiers)</h3>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {selectedCommand.options.map((opt) => (
                                    <button
                                        key={opt.name}
                                        onClick={() => setSelectedOption(selectedOption?.name === opt.name ? null : opt)}
                                        className={cn(
                                            "flex flex-col p-5 rounded-2xl text-left transition-all relative border-2",
                                            selectedOption?.name === opt.name
                                                ? "bg-primary text-white border-primary shadow-lg scale-[1.02]"
                                                : "bg-white text-slate-600 border-white hover:border-primary/20 hover:shadow-md"
                                        )}
                                    >
                                        <span className="font-mono text-sm font-bold mb-1">{opt.name}</span>
                                        <span className={cn(
                                            "text-[11px] leading-tight",
                                            selectedOption?.name === opt.name ? "text-white/80" : "text-muted-foreground"
                                        )}>
                                            {opt.description}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* PDF Impact & When to Use Panel */}
                        <AnimatePresence mode="wait">
                            {selectedOption && (selectedOption.pdfImpact || selectedOption.whenToUse) && (
                                <motion.div
                                    key={selectedOption.name + "-details"}
                                    initial={{ opacity: 0, y: 15, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: "auto" }}
                                    exit={{ opacity: 0, y: -10, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {selectedOption.pdfImpact && (
                                            <div className="bg-blue-50/80 border border-blue-200/50 rounded-3xl p-6 space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-1.5 bg-blue-100 rounded-lg">
                                                        <FileText className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    <h4 className="font-bold text-sm text-blue-900 uppercase tracking-wider">PDF Appearance Impact</h4>
                                                </div>
                                                <p className="text-[13px] text-blue-800 leading-relaxed">
                                                    {selectedOption.pdfImpact}
                                                </p>
                                            </div>
                                        )}
                                        {selectedOption.whenToUse && (
                                            <div className="bg-emerald-50/80 border border-emerald-200/50 rounded-3xl p-6 space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-1.5 bg-emerald-100 rounded-lg">
                                                        <Lightbulb className="w-4 h-4 text-emerald-600" />
                                                    </div>
                                                    <h4 className="font-bold text-sm text-emerald-900 uppercase tracking-wider">When to Use This</h4>
                                                </div>
                                                <p className="text-[13px] text-emerald-800 leading-relaxed">
                                                    {selectedOption.whenToUse}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
