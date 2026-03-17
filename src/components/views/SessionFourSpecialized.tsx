"use client";

import { motion } from "framer-motion";
import { Presentation, FileText, Cpu, Layout, Play, Milestone, Newspaper, GraduationCap, Check, HelpCircle, ArrowRight, Target, Rocket, Trophy, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { CompilationDiscovery } from "@/components/CompilationDiscovery";
import { LATEX_COMMAND_DATA } from "@/lib/latex-commands";
import { DragDropMatch } from "@/components/DragDropMatch";
import { FillInBlank } from "@/components/FillInBlank";

export function SessionFourSpecialized() {
    return (
        <div className="space-y-12 pb-20">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-rose-100 rounded-2xl">
                        <Cpu className="w-8 h-8 text-rose-600" />
                    </div>
                    <span className="text-sm font-bold text-rose-600 uppercase tracking-widest italic font-outfit">Module 11: Professional Standards</span>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight outfit-font">
                    Presentations & Journals
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    Mastering <strong>Beamer</strong> for dynamic slides and <strong>IEEEtran</strong> for world-class engineering publications.
                </p>
            </div>

            <CompilationDiscovery
                commands={LATEX_COMMAND_DATA["session-4-specialized"]}
                moduleTitle="Module 11"
            />

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Section: Beamer */}
                <div className="bg-card border-2 border-rose-100 rounded-[3rem] p-10 space-y-8 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-rose-50/50 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-rose-100 transition-colors" />
                    
                    <div className="flex items-center gap-4 relative">
                        <div className="p-4 bg-rose-600 text-white rounded-3xl shadow-lg shadow-rose-200">
                            <Presentation className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold outfit-font">The Beamer Expert</h3>
                            <p className="text-rose-600 text-sm font-bold uppercase tracking-tighter">Academic Slides</p>
                        </div>
                    </div>

                    <div className="space-y-5 relative">
                        <p className="text-muted-foreground leading-relaxed italic">
                            &quot;Gone are the days of pixelated PowerPoint slides. Beamer produces crisp, vector-grade PDFs that remain sharp on any projector, with built-in navigation and professional color themes.&quot;
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white border rounded-2xl p-5 space-y-2">
                                <h4 className="font-bold flex items-center gap-2 text-rose-900">
                                    <Layout className="w-4 h-4" /> Layouts
                                </h4>
                                <p className="text-xs text-slate-500">Madrid, Berlin, Warsaw themes ready-to-use.</p>
                            </div>
                            <div className="bg-white border rounded-2xl p-5 space-y-2">
                                <h4 className="font-bold flex items-center gap-2 text-rose-900">
                                    <Play className="w-4 h-4" /> Animation
                                </h4>
                                <p className="text-xs text-slate-500">Use <code>\pause</code> to reveal thoughts sequentially.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section: IEEEtran */}
                <div className="bg-slate-900 text-white rounded-[3rem] p-10 space-y-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
                    
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-blue-600 rounded-3xl">
                                <FileText className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">IEEE Publication Standard</h3>
                                <p className="text-blue-400 text-sm font-mono tracking-widest text-[10px]">class: IEEEtran.cls</p>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                            <p className="text-xs font-bold uppercase tracking-widest text-blue-400">IEEE Micro-Typography</p>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                IEEE papers use specific column widths, font sizes, and citation styles to maximize readability. In LaTeX, all these rules are hardcoded into the class.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-[10px] px-2 py-1 bg-white/10 rounded-md">Two-Column</span>
                                <span className="text-[10px] px-2 py-1 bg-white/10 rounded-md">Balanced Rows</span>
                                <span className="text-[10px] px-2 py-1 bg-white/10 rounded-md">IEEE-Style Bib</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 mt-6">
                        <Newspaper className="w-10 h-10 text-blue-400 opacity-50" />
                        <p className="text-[11px] text-slate-400 italic">
                            &quot;Over 30% of global technological research papers are typeset using this exact class structure.&quot;
                        </p>
                    </div>
                </div>
            </div>

            <section className="space-y-10 py-10">
                <div className="text-center space-y-2">
                    <h2 className="text-4xl font-bold outfit-font text-slate-900">Career-Defining Skills</h2>
                    <p className="text-muted-foreground uppercase text-xs font-bold tracking-[0.2em]">Beyond Basic Documents</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Interactive Presenter",
                            desc: "Creating multi-frame slide decks with TOC highlights.",
                            points: ["Use \\usetheme{Madrid}", "Label slides with \\frametitle", "Link sections automatically"],
                            reward: "Conference Ready",
                            icon: <Target className="w-8 h-8 text-rose-500" />,
                            color: "bg-rose-50 border-rose-100"
                        },
                        {
                            title: "The Journal Expert",
                            desc: "Converting a draft report into a formal IEEE journal submission.",
                            points: ["Add \\IEEEpeerreviewmaketitle", "Enforce 2-column layout", "Sort IEEE-style bib"],
                            reward: "IEEE Architect",
                            icon: <Rocket className="w-8 h-8 text-blue-500" />,
                            color: "bg-blue-50 border-blue-100"
                        },
                        {
                            title: "Collaborative Publisher",
                            desc: "Managing authorship blocks and affiliations globally.",
                            points: ["IEEEbiography support", "Affiliation handling", "Metadata optimization"],
                            reward: "Lead Researcher",
                            icon: <Trophy className="w-8 h-8 text-amber-500" />,
                            color: "bg-amber-50 border-amber-100"
                        }
                    ].map((card, i) => (
                        <div key={i} className={cn("p-10 rounded-[3rem] border-2 space-y-6 hover:scale-[1.02] transition-all flex flex-col group", card.color)}>
                            <div className="p-4 bg-white rounded-2xl shadow-sm w-fit group-hover:rotate-6 transition-transform">
                                {card.icon}
                            </div>
                            <h4 className="text-2xl font-bold outfit-font">{card.title}</h4>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium">{card.desc}</p>
                            <ul className="space-y-3 flex-1">
                                {card.points.map((p, idx) => (
                                    <li key={idx} className="flex gap-2 text-xs text-slate-500 font-bold items-center italic">
                                        <Check className="w-3 h-3 text-emerald-500" />
                                        {p}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 bg-white/50 px-4 py-2 rounded-full w-fit">
                                <Milestone className="w-3 h-3" />
                                {card.reward}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <DragDropMatch
                title="Match the Specialist Class"
                agriContext="Publishing a breakthrough in IoT-based Farming"
                pairs={[
                    { command: "beamer", description: "Class for screen presentations/slides" },
                    { command: "IEEEtran", description: "The standard for engineering journals" },
                    { command: "frame", description: "The slide container in Beamer" },
                    { command: "usetheme", description: "Choose a visual style for Beamer" },
                    { command: "IEEEkeywords", description: "Standard section for indexing terms" },
                ]}
            />

            <FillInBlank
                title="Create your First Slide"
                exercises={[
                    {
                        id: 1,
                        prompt: "Define a presentation slide with a title and a bullet point:",
                        codeTemplate: "\\documentclass{___BLANK1___}\n\\begin{document}\n\\begin{___BLANK2___}\n  \\frametitle{Introduction}\n  Sustainable Agriculture\n  \\___BLANK3___\n  High-Tech Solutions\n\\end{___BLANK2___}\n\\end{document}",
                        blanks: [
                            { placeholder: "___BLANK1___", answer: "beamer", hint: "The presentation document class" },
                            { placeholder: "___BLANK2___", answer: "frame", hint: "The name of the slide environment" },
                            { placeholder: "___BLANK3___", answer: "pause", hint: "Command to make the text appear on click" },
                        ],
                        explanation: "A Beamer presentation consists of multiple 'frame' environments. You can use \\pause to create simple animations, making it the best tool for scientific presentations.",
                        agriExample: "Used for presenting crop output predictions at International Ag-Conferences."
                    }
                ]}
            />

            <div className="bg-amber-50 border-2 border-amber-200 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-8">
                <div className="p-6 bg-white rounded-3xl shadow-md border border-amber-100">
                    <Lightbulb className="w-12 h-12 text-amber-500" />
                </div>
                <div className="space-y-3 text-center md:text-left">
                    <h3 className="text-2xl font-bold outfit-font text-amber-900">Pro Tip for Scholars</h3>
                    <p className="text-amber-800 leading-relaxed text-sm">
                        NEP 2020 emphasizes <strong>multidisciplinary research</strong>. Using specialized classes like IEEEtran or Beamer ensures your research meets global standards, whether you&apos;re submitting to an engineering journal or an agricultural science conference.
                    </p>
                </div>
            </div>
        </div>
    );
}
