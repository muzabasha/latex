"use client";

import { useState } from "react";
import { LatexEditor } from "@/components/LatexEditor";
import { LatexPreview } from "@/components/LatexPreview";
import { motion } from "framer-motion";
import { CaseUpper, Bold, Italic, CheckCircle, LayoutGrid, HelpCircle, CheckCircle2, Target, Rocket, Trophy, Star, Check, X, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { SessionQuiz } from "@/components/SessionQuiz";
import { SESSION_QUIZZES } from "@/lib/quiz-data";
import { CompilationDiscovery } from "@/components/CompilationDiscovery";
import { LATEX_COMMAND_DATA } from "@/lib/latex-commands";
import { DragDropMatch } from "@/components/DragDropMatch";
import { ErrorFixChallenge } from "@/components/ErrorFixChallenge";

export function SessionOneFormatting() {
    const [code, setCode] = useState(`\\documentclass{article}

\\begin{document}
\\section{Introduction to Soil Science}
The research focuses on \\textbf{nutrient density} in clay soils.

\\subsection{Objective}
Understand the \\textit{impact of pH levels} on growth rates.

\\begin{itemize}
    \\item Clay Soil
    \\item Sandy Soil
    \\item Loam Soil
\\end{itemize}
\\end{document}`);
    const [isCompiling, setIsCompiling] = useState(false);

    const handleCompile = (newCode: string) => {
        setIsCompiling(true);
        setTimeout(() => {
            setCode(newCode);
            setIsCompiling(false);
        }, 1000);
    };

    const formattingCommands = [
        {
            cmd: "\\section{...}",
            icon: <CaseUpper className="w-4 h-4" />,
            label: "Header 1",
            color: "bg-blue-500",
            options: [
                { name: "\\section*{...}", impact: "Removes auto-numbering." },
                { name: "\\chapter{...}", impact: "Top-level for Reports/Books." }
            ]
        },
        {
            cmd: "\\subsection{...}",
            icon: <LayoutGrid className="w-4 h-4" />,
            label: "Header 2",
            color: "bg-cyan-500",
            options: [
                { name: "\\subsubsection", impact: "Level 3 nesting." }
            ]
        },
        {
            cmd: "\\textbf{...}",
            icon: <Bold className="w-4 h-4" />,
            label: "Bold Text",
            color: "bg-indigo-500",
            options: [
                { name: "\\underline{...}", impact: "Adds a line below text." }
            ]
        },
        {
            cmd: "\\textit{...}",
            icon: <Italic className="w-4 h-4" />,
            label: "Italic Text",
            color: "bg-violet-500",
            options: [
                { name: "\\emph{...}", impact: "Semantic emphasis (toggles italic)." }
            ]
        },
    ];

    return (
        <div className="space-y-12 pb-20">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight outfit-font">Module 4: Sections & Formatting</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    Architecting your thoughts. No more manual numbering. Just write, and LaTeX handles the hierarchy.
                </p>
            </div>

            <CompilationDiscovery
                commands={LATEX_COMMAND_DATA["session-1-formatting"]}
                moduleTitle="Module 4"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {formattingCommands.map((cmd, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -4 }}
                        className="bg-card border rounded-2xl p-6 shadow-sm flex items-center gap-4 group"
                    >
                        <div className={cn("p-3 rounded-xl text-white shadow-lg", cmd.color)}>
                            {cmd.icon}
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-muted-foreground uppercase opacity-70 mb-1">{cmd.label}</p>
                            <code className="text-sm font-mono font-bold text-primary block mb-3">{cmd.cmd}</code>

                            <div className="space-y-1">
                                {cmd.options?.map((opt, idx) => (
                                    <div key={idx} className="text-[10px] bg-slate-50 p-1 rounded border border-slate-100 italic">
                                        <span className="font-bold text-slate-700">{opt.name}:</span> {opt.impact}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-slate-900 text-slate-100 rounded-3xl p-10 space-y-6 shadow-2xl overflow-hidden relative group">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 scale-150 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="space-y-4 max-w-lg">
                        <h2 className="text-3xl font-bold">The Magic of Lists</h2>
                        <p className="text-slate-400 leading-relaxed italic">
                            &quot;Unlike Word, LaTeX lists don&apos;t &apos;jump&apos; when you add a new item. They are perfectly aligned, every time.&quot;
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center text-xs">1</div>
                                <span className="text-sm"><code>{"\\begin{itemize}"}</code> — Start the list</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center text-xs">2</div>
                                <span className="text-sm"><code>{"\\item"}</code> — Add a bullet point</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center text-xs">3</div>
                                <span className="text-sm"><code>{"\\end{itemize}"}</code> — Finalize the list</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full h-[450px]">
                        <LatexEditor
                            initialCode={code}
                            onCompile={handleCompile}
                            height="350px"
                        />
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 h-[550px]">
                <LatexPreview
                    code={code}
                    isCompiling={isCompiling}
                />
                <div className="bg-white border rounded-3xl p-8 shadow-sm space-y-6 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-primary" />
                        Progress Check
                    </h3>
                    <div className="space-y-4">
                        {[
                            "Try adding a \\section for 'Methodology'.",
                            "Make the word 'Clay Soil' bold using \\textbf.",
                            "Add a nested list for 'Irrigation Types'.",
                            "Change the title to focus on your specific research area."
                        ].map((task, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 border rounded-2xl border-slate-200 hover:border-primary transition-colors cursor-pointer group">
                                <div className="w-4 h-4 border-2 border-primary rounded-md group-hover:bg-primary/20 transition-colors" />
                                <span className="text-sm font-medium">{task}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Interactive Q&A Deep Dive */}
            <section className="bg-slate-900 rounded-[3rem] p-12 text-white space-y-10 shadow-2xl relative overflow-hidden mt-12">
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[120px] rounded-full -mr-40 -mt-40" />

                <div className="flex items-center gap-5 relative z-10">
                    <div className="p-4 bg-primary rounded-3xl shadow-xl shadow-primary/20">
                        <HelpCircle className="w-10 h-10" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold outfit-font">Formatting Masterclass</h2>
                        <p className="text-slate-400 text-lg italic">&quot;Thinking in Logical Structures, not just Pixels.&quot;</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10 relative z-10">
                    <div className="space-y-8">
                        <div className="bg-white/5 border border-white/10 p-8 rounded-4xl space-y-4 hover:bg-white/[0.07] transition-colors">
                            <h4 className="font-bold text-primary flex items-center gap-3 text-xl">
                                <CheckCircle2 className="w-6 h-6" /> Starred Sections (*)?
                            </h4>
                            <p className="text-slate-200">Why use <code>{"\\section*{Abstract}"}</code> instead of <code>{"\\section{Abstract}"}</code>?</p>
                            <div className="pt-6 border-t border-white/10">
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    <span className="font-bold text-white uppercase text-xs block mb-2 tracking-widest">Scientific Justification:</span>
                                    The asterisk (*) tells LaTeX to remove the numbering (e.g., &quot;0.1&quot;) and exclude it from the Table of Contents. This is required for standard components like <strong>Abstracts</strong> or <strong>Acknowledgements</strong>.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-8 rounded-4xl space-y-4 hover:bg-white/[0.07] transition-colors">
                            <h4 className="font-bold text-primary flex items-center gap-3 text-xl">
                                <CheckCircle2 className="w-6 h-6" /> Bold vs. Italic impact?
                            </h4>
                            <p className="text-slate-200">When should a researcher choose <code>{"\\textbf"}</code> over <code>{"\\textit"}</code>?</p>
                            <div className="pt-6 border-t border-white/10">
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    <span className="font-bold text-white uppercase text-xs block mb-2 tracking-widest">Justification:</span>
                                    Use <strong>Bold</strong> for structural emphasis (definitions, keywords). Use <em>Italic</em> for taxonomic names (e.g., <i>Oryza sativa</i>), mathematical variables, or quotes.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 flex flex-col justify-center">
                        <div className="bg-primary/10 border border-primary/20 p-8 rounded-4xl space-y-6">
                            <h5 className="font-bold text-primary uppercase text-xs tracking-[0.2em]">The Nesting Rule</h5>
                            <p className="text-sm text-slate-300 leading-relaxed italic">
                                &quot;In LaTeX, you can nest lists within lists up to 4 levels deep. The engine automatically changes the bullet style (Bullet {"->"} Dash {"->"} Star) so the reader never gets lost.&quot;
                            </p>
                            <div className="bg-black/20 p-6 rounded-2xl font-mono text-[11px] text-primary/80">
                                {"\\begin{itemize}"} <br />
                                {"\u00A0\u00A0 \\item Crop Types"} <br />
                                {"\u00A0\u00A0 \\begin{itemize}"} <br />
                                {"\u00A0\u00A0\u00A0\u00A0 \\item Cereals"} <br />
                                {"\u00A0\u00A0 \\end{itemize}"} <br />
                                {"\\end{itemize}"}
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-8 rounded-4xl space-y-4">
                            <h4 className="font-bold text-primary flex items-center gap-3 text-xl">
                                <CheckCircle2 className="w-6 h-6" /> Logical Separation?
                            </h4>
                            <p className="text-lg">What happens if I use <code>{"\\large"}</code>?</p>
                            <div className="pt-6 border-t border-white/10">
                                <p className="text-sm text-slate-300">
                                    <span className="font-bold text-white uppercase text-xs block mb-2 tracking-widest">Impact:</span>
                                    LaTeX is &quot;scope-based&quot;. Unless you wrap it in <code>{"{...}"}</code>, everything after <code>\\large</code> becomes big. Always use <code>{"{\\large focus text}"}</code> to maintain control.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Activity Track: The Formatting Garden */}
            <section className="space-y-10 py-10">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold outfit-font">Skill Level: The Formatting Garden</h2>
                    <p className="text-muted-foreground italic">Pruning your manuscript for professional clarity</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            level: "1. The Trimmer (Beginner)",
                            analogy: "Basic Grooming",
                            instruction: "Take a list of 5 crop names and make only the most important one bold and the second one italic.",
                            detailedInstructions: [
                                "Create a list using \\begin{itemize}.",
                                "Use \\item for each crop name.",
                                "Apply \\textbf{...} to the first crop and \\textit{...} to the second crop."
                            ],
                            dos: ["Use meaningful crop names.", "Check for nested brackets."],
                            donts: ["Don't forget \\end{itemize}.", "Don't use bold for the entire list."],
                            reward: "Visual Hierarchy",
                            icon: <Target className="w-8 h-8 text-indigo-500" />,
                            color: "bg-indigo-50 border-indigo-100"
                        },
                        {
                            level: "2. The Landscaper (Moderate)",
                            analogy: "Defining Zones",
                            instruction: "Create a 'Methodology' section with two subsections: 'Soil Sampling' and 'Water Analysis'.",
                            detailedInstructions: [
                                "Start with \\section{Methodology}.",
                                "Add \\subsection{Soil Sampling} inside the methodology section.",
                                "Add some descriptive text below each subsection."
                            ],
                            dos: ["Use Title Case for sections.", "Keep content organized."],
                            donts: ["Don't put subsection before section.", "Don't over-nest sections."],
                            reward: "Document Architecture",
                            icon: <Rocket className="w-8 h-8 text-cyan-500" />,
                            color: "bg-cyan-50 border-cyan-100"
                        },
                        {
                            level: "3. The Architect (Pro)",
                            analogy: "Advanced Ecosystem",
                            instruction: "Create a nested procedure list using 'enumerate' inside 'itemize' to show a step-by-step chemical mix.",
                            detailedInstructions: [
                                "Start an \\begin{itemize} list for 'Materials'.",
                                "Inside an \\item, start an \\begin{enumerate} for 'Steps'.",
                                "Close both lists in the correct reverse order."
                            ],
                            dos: ["Indent nested lists for readability.", "Use enumeration for sequences."],
                            donts: ["Don't cross \\begin and \\end tags.", "Don't go deeper than 3 levels unnecessarily."],
                            reward: "Procedural Precision",
                            icon: <Trophy className="w-8 h-8 text-violet-500" />,
                            color: "bg-violet-50 border-violet-100"
                        }
                    ].map((activity, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className={cn("p-8 rounded-4xl border-2 space-y-6 relative overflow-hidden group transition-all flex flex-col", activity.color)}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                                {activity.icon}
                            </div>

                            <div className="space-y-2">
                                <span className="text-xs font-bold uppercase tracking-widest opacity-60">{activity.level}</span>
                                <h3 className="text-2xl font-bold">{activity.analogy}</h3>
                            </div>

                            <div className="space-y-5 flex-1">
                                <div className="bg-white/60 p-5 rounded-2xl space-y-3 border border-white/40 shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <ClipboardList className="w-4 h-4 text-slate-500" />
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Steps to Follow:</p>
                                    </div>
                                    <div className="space-y-2">
                                        {activity.detailedInstructions.map((step, idx) => (
                                            <p key={idx} className="text-[13px] font-medium leading-relaxed border-l-2 border-slate-300 pl-3">{step}</p>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-emerald-500/10 p-3 rounded-xl space-y-2 border border-emerald-500/20">
                                        <div className="flex items-center gap-1.5 text-emerald-700 font-bold uppercase text-[9px] tracking-widest">
                                            <Check className="w-3 h-3" />
                                            <span>Do&apos;s</span>
                                        </div>
                                        {activity.dos.map((doItem, idx) => (
                                            <p key={idx} className="text-[11px] text-emerald-800 leading-tight italic">✓ {doItem}</p>
                                        ))}
                                    </div>
                                    <div className="bg-rose-500/10 p-3 rounded-xl space-y-2 border border-rose-500/20">
                                        <div className="flex items-center gap-1.5 text-rose-700 font-bold uppercase text-[9px] tracking-widest">
                                            <X className="w-3 h-3" />
                                            <span>Don&apos;ts</span>
                                        </div>
                                        {activity.donts.map((dontItem, idx) => (
                                            <p key={idx} className="text-[11px] text-rose-800 leading-tight italic">✗ {dontItem}</p>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 pt-2 border-t border-slate-200/50">
                                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    <span>Outcome: {activity.reward}</span>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-primary transition-all shadow-xl shadow-slate-900/10 active:scale-95 font-outfit mt-auto relative z-10">
                                Start Lab Activity
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* NEP 2020: Learn by Doing - Match Formatting Commands */}
            <DragDropMatch
                title="Match the Formatting Command to Its Output"
                agriContext="Format your crop research paper like a professional"
                pairs={[
                    { command: "\\textbf{Wheat}", description: "Makes 'Wheat' appear in bold" },
                    { command: "\\textit{Oryza sativa}", description: "Makes the scientific name italic" },
                    { command: "\\section{Results}", description: "Creates a numbered main heading" },
                    { command: "\\begin{itemize}", description: "Starts a bulleted list" },
                    { command: "\\begin{enumerate}", description: "Starts a numbered list" },
                    { command: "\\subsection{Soil Data}", description: "Creates a secondary heading" },
                ]}
            />

            {/* NEP 2020: Learn by Doing - Fix Formatting Bugs */}
            <ErrorFixChallenge
                title="Fix the Formatting Errors"
                challenges={[
                    {
                        id: 1,
                        title: "Unclosed List Environment",
                        brokenCode: "\\begin{itemize}\n\\item Rice\n\\item Wheat\n\\item Maize",
                        fixedCode: "\\begin{itemize}\n\\item Rice\n\\item Wheat\n\\item Maize\n\\end{itemize}",
                        errorMessage: "LaTeX Error: \\begin{itemize} ended by \\end{document}.",
                        hint: "Every \\begin{itemize} needs a matching \\end{itemize}",
                        explanation: "Lists must be properly closed. Think of it like closing the gate after all the cattle are inside the pen."
                    },
                    {
                        id: 2,
                        title: "Wrong Bold Syntax",
                        brokenCode: "The \\bold{nitrogen content} affects growth.",
                        fixedCode: "The \\textbf{nitrogen content} affects growth.",
                        errorMessage: "Undefined control sequence \\bold.",
                        hint: "LaTeX uses \\textbf{} for bold, not \\bold{}",
                        explanation: "LaTeX commands are specific: \\textbf (text bold face), \\textit (text italic). There is no \\bold command."
                    },
                    {
                        id: 3,
                        title: "Nested List Error",
                        brokenCode: "\\begin{itemize}\n\\item Crops\n\\begin{enumerate}\n\\item Plant seeds\n\\item Water daily\n\\end{itemize}\n\\end{enumerate}",
                        fixedCode: "\\begin{itemize}\n\\item Crops\n\\begin{enumerate}\n\\item Plant seeds\n\\item Water daily\n\\end{enumerate}\n\\end{itemize}",
                        errorMessage: "LaTeX Error: \\begin{enumerate} ended by \\end{itemize}.",
                        hint: "Nested environments must close in reverse order (last opened = first closed)",
                        explanation: "Like Russian nesting dolls: the inner environment (enumerate) must close before the outer one (itemize)."
                    }
                ]}
            />

            <SessionQuiz
                title="Mastery Check: The Formatting Garden"
                questions={SESSION_QUIZZES["session-1-formatting"]}
            />
        </div>
    );
}
