"use client";

import { motion } from "framer-motion";
import { FolderTree, FileCode, Layers, ShieldCheck, Download, ExternalLink, Target, Rocket, Trophy, Star, Check, X, ClipboardList, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SessionQuiz } from "@/components/SessionQuiz";
import { SESSION_QUIZZES } from "@/lib/quiz-data";
import { CompilationDiscovery } from "@/components/CompilationDiscovery";
import { LATEX_COMMAND_DATA } from "@/lib/latex-commands";
import { DragDropMatch } from "@/components/DragDropMatch";
import { FillInBlank } from "@/components/FillInBlank";

export function SessionTwoThesis() {
    const structure = [
        { title: "main.tex", desc: "The brain. Loads packages and chapters.", type: "file" },
        { title: "chapters/", desc: "A folder containing individual .tex files for each chapter.", type: "folder" },
        { title: "references.bib", desc: "Your central database of citations.", type: "file" },
        { title: "images/", desc: "Where all your high-res research photos live.", type: "folder" }
    ];

    return (
        <div className="space-y-12 pb-20">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight outfit-font">Module 9: Thesis Structure</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    The Blueprint of Your Academic Journey. Learn how to manage 200+ pages without losing your mind.
                </p>
            </div>

            <CompilationDiscovery
                commands={LATEX_COMMAND_DATA["session-2-thesis"]}
                moduleTitle="Module 9"
            />

            <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="bg-card border rounded-3xl p-8 space-y-6 shadow-sm">
                        <h3 className="text-2xl font-bold flex items-center gap-3">
                            <FolderTree className="w-6 h-6 text-primary" />
                            Modular Organization
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            For large documents like a PhD Thesis, don&apos;t put everything in one file. Use the <code>{"\\include{...}"}</code> command to stitch chapters together.
                        </p>

                        <div className="space-y-3">
                            {structure.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-primary transition-all">
                                    <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-primary/10 transition-colors">
                                        {item.type === 'folder' ? <Layers className="w-5 h-5 text-orange-500" /> : <FileCode className="w-5 h-5 text-blue-500" />}
                                    </div>
                                    <div>
                                        <h4 className="font-mono font-bold text-sm">{item.title}</h4>
                                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-900 text-white rounded-3xl p-10 space-y-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16" />

                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-primary rounded-2xl">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">Agriculture Thesis Template</h3>
                                <p className="text-slate-400 text-sm">Pre-configured with local university standards.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm text-slate-300 leading-relaxed italic">
                                &quot;This template includes pre-defined styles for Title Pages, Abstract, Table of Contents, and ICAR style referencing. Ready to download and use in TeXstudio or Overleaf.&quot;
                            </p>
                            <div className="flex flex-col gap-3">
                                <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white p-4 rounded-xl font-bold transition-all w-full">
                                    <Download className="w-5 h-5" /> Download Agriculture Template
                                </button>
                                <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white p-4 rounded-xl font-bold transition-all w-full">
                                    <ExternalLink className="w-5 h-5" /> Open in Overleaf
                                </button>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                            <p className="text-xs font-bold uppercase tracking-widest text-primary">Chapter snippet</p>
                            <pre className="text-[10px] font-mono text-slate-400">
                                {`\\chapter{Literature Review}
\\label{ch:lit_review}
\\input{chapters/chapter2_review}

\\chapter{Methodology}
\\label{ch:method}
\\input{chapters/chapter3_method}`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
            {/* Activity Track: Building the Farmhouse */}
            <section className="space-y-10 py-10">
                <div className="text-center space-y-2">
                    <h2 className="text-4xl font-bold outfit-font">Skill Level: Building the Farmhouse</h2>
                    <p className="text-muted-foreground italic tracking-widest uppercase text-xs font-bold">From a single brick to a complete research estate</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            level: "1. The Foundation (Beginner)",
                            analogy: "Clearing the Land",
                            instruction: "Split a single document into two files: main.tex (preamble) and content.tex. Use \\input{content} to link them.",
                            detailedInstructions: [
                                "Create a new file called content.tex.",
                                "Move all text between \\begin{document} and \\end{document} to content.tex.",
                                "In your main.tex, use \\input{content} where the text used to be."
                            ],
                            dos: ["Keep the preamble in main.tex.", "Check that both files are in the same folder."],
                            donts: ["Don't put \\begin{document} in content.tex.", "Don't forget to save both files before compiling."],
                            reward: "Modular Thinking",
                            icon: <Target className="w-8 h-8 text-primary" />,
                            color: "bg-primary/5 border-primary/10"
                        },
                        {
                            level: "2. The Framework (Moderate)",
                            analogy: "Raising the Walls",
                            instruction: "Create a Table of Contents (\\tableofcontents) and a List of Figures. Ensure they update after 2-3 compilations.",
                            detailedInstructions: [
                                "Add \\tableofcontents after the Title page.",
                                "Add \\listoffigures if you have images.",
                                "Compile the document twice to allow LaTeX to generate the index."
                            ],
                            dos: ["Compile twice for correct numbering.", "Use \\section to create TOC entries automatically."],
                            donts: ["Don't manually type the TOC.", "Don't panic if it shows '??' on the first compile."],
                            reward: "Systemic Navigation",
                            icon: <Rocket className="w-8 h-8 text-blue-500" />,
                            color: "bg-blue-50 border-blue-100"
                        },
                        {
                            level: "3. The Estate Architect (Pro)",
                            analogy: "The Master Blueprint",
                            instruction: "Design a full chapter structure where Chapter 1 is in 'intro.tex' and Chapter 2 is in 'results.tex'. Use \\include to manage page breaks.",
                            detailedInstructions: [
                                "Use \\include{chapters/intro} for major sections.",
                                "Notice that \\include starts a new page automatically.",
                                "Use \\includeonly{chapters/intro} if you only want to compile one chapter during drafts."
                            ],
                            dos: ["Use \\include for full chapters.", "Use the 'chapters' folder to stay organized."],
                            donts: ["Don't nest \\include within other \\include files.", "Don't use \\input for chapters if you want page breaks."],
                            reward: "Professional Manuscript Control",
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
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter text-left">The Blueprint:</p>
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
                                    <span>Achievement: {activity.reward}</span>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-primary transition-all shadow-xl shadow-slate-900/10 active:scale-95 font-outfit mt-auto relative z-10">
                                Start Construction
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* NEP 2020: Learn by Doing - Thesis Structure Matching */}
            <DragDropMatch
                title="Match the Thesis Component"
                agriContext="Organize your agriculture PhD thesis like a professional"
                pairs={[
                    { command: "main.tex", description: "The master file that loads all chapters" },
                    { command: "\\include{chapter1}", description: "Inserts a chapter file (starts new page)" },
                    { command: "\\input{section}", description: "Inserts content without page break" },
                    { command: "\\tableofcontents", description: "Auto-generates the table of contents" },
                    { command: "references.bib", description: "Central database of all citations" },
                ]}
            />

            {/* NEP 2020: Learn by Doing - Build Thesis Structure */}
            <FillInBlank
                title="Build Your Thesis main.tex"
                exercises={[
                    {
                        id: 1,
                        prompt: "Complete the main.tex file for an agriculture thesis:",
                        codeTemplate: "\\documentclass{___BLANK1___}\n\\usepackage{graphicx}\n\\begin{document}\n\\___BLANK2___\n\\___BLANK3___\n\\include{chapters/introduction}\n\\include{chapters/methodology}\n\\include{chapters/results}\n\\bibliographystyle{plain}\n\\bibliography{references}\n\\end{document}",
                        blanks: [
                            { placeholder: "___BLANK1___", answer: "report", hint: "The document class for long documents with chapters (not 'article')" },
                            { placeholder: "___BLANK2___", answer: "maketitle", hint: "Renders the title page" },
                            { placeholder: "___BLANK3___", answer: "tableofcontents", hint: "Auto-generates the table of contents" },
                        ],
                        explanation: "A thesis uses 'report' class (supports chapters), \\maketitle for the title page, and \\tableofcontents for automatic navigation. Each chapter is a separate file loaded with \\include.",
                        agriExample: "This is the exact structure used for ICAR-approved PhD theses in agricultural sciences"
                    }
                ]}
            />

            <SessionQuiz
                title="Mastery Check: The Thesis Architect"
                questions={SESSION_QUIZZES["session-2-thesis"]}
            />
        </div >
    );
}
