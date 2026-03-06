"use client";

import { useState } from "react";
import { LatexEditor } from "@/components/LatexEditor";
import { LatexPreview } from "@/components/LatexPreview";
import { motion } from "framer-motion";
import { FileText, Type, Layers, Box, Info, HelpCircle, CheckCircle2, Rocket, Trophy, Target, Star, Check, X, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { SessionQuiz } from "@/components/SessionQuiz";
import { SESSION_QUIZZES } from "@/lib/quiz-data";
import { CompilationDiscovery } from "@/components/CompilationDiscovery";
import { LATEX_COMMAND_DATA } from "@/lib/latex-commands";
import { ErrorFixChallenge } from "@/components/ErrorFixChallenge";
import { FillInBlank } from "@/components/FillInBlank";

export function SessionOneFirstDoc() {
    const [code, setCode] = useState(`\\documentclass{article}

\\begin{document}
Hello Research World! 
This is my very first LaTeX document.
\\end{document}`);
    const [isCompiling, setIsCompiling] = useState(false);

    const handleCompile = (newCode: string) => {
        setIsCompiling(true);
        setTimeout(() => {
            setCode(newCode);
            setIsCompiling(false);
        }, 1000);
    };

    const explainers = [
        {
            tag: "\\documentclass{article}",
            icon: <FileText className="w-5 h-5 text-blue-500" />,
            title: "The Blueprint Choice",
            desc: "Tells LaTeX what kind of document you're building.",
            options: [
                { name: "report", impact: "Adds support for chapters." },
                { name: "book", impact: "Adds title page and double-sided margins." },
                { name: "beamer", impact: "Used for creating academic presentations (PPT style)." }
            ]
        },
        {
            tag: "\\begin{document}",
            icon: <Layers className="w-5 h-5 text-green-500" />,
            title: "The Front Door",
            desc: "Everything after this point will actually appear in your final PDF.",
            options: [
                { name: "Preamble", impact: "The space BEFORE this is where you load packages." }
            ]
        },
        {
            tag: "The Body",
            icon: <Type className="w-5 h-5 text-orange-500" />,
            title: "The Content",
            desc: "This is where your research lives. Just type naturally!",
            options: [
                { name: "Commands", impact: "Functions that start with \\ change style." },
                { name: "Comments", impact: "Lines starting with % are for your notes only." }
            ]
        },
        {
            tag: "\\end{document}",
            icon: <Box className="w-5 h-5 text-red-500" />,
            title: "The Exit Sign",
            desc: "Tells the compiler to stop reading.",
            options: [
                { name: "Impact", impact: "If missing, the PDF will fail to generate." }
            ]
        },
    ];

    return (
        <div className="space-y-12 pb-20">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight outfit-font">Module 3: Your First Document</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    Breaking down the DNA of a LaTeX file. It&apos;s like building with LEGO blocks.
                </p>
            </div>

            <CompilationDiscovery
                commands={LATEX_COMMAND_DATA["session-1-first-doc"]}
                moduleTitle="Module 3"
            />

            <div className="grid lg:grid-cols-4 gap-6">
                {explainers.map((ex, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                        className="group relative bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-default"
                    >
                        <div className="mb-4">{ex.icon}</div>
                        <code className="block text-xs font-bold text-primary mb-3 font-mono bg-primary/5 p-2 rounded-md">
                            {ex.tag}
                        </code>
                        <h4 className="font-bold text-lg mb-2">{ex.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed italic mb-4">{ex.desc}</p>

                        <div className="pt-4 border-t border-slate-100 space-y-2">
                            <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Options & Impact</p>
                            {ex.options?.map((opt, idx) => (
                                <div key={idx} className="text-[11px] leading-tight">
                                    <span className="font-bold text-slate-700">{opt.name}:</span>{" "}
                                    <span className="text-slate-500">{opt.impact}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <section className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex items-start gap-4 text-blue-800">
                    <Info className="w-6 h-6 mt-1 shrink-0" />
                    <p className="text-sm font-medium">
                        <strong>Challenge:</strong> Try changing the text inside the document to include your research title. Notice how the structure outside the <code>{"\\begin"}</code> and <code>{"\\end"}</code> remains the same.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 h-[550px]">
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-sm tracking-widest uppercase text-muted-foreground">Source Construction</h3>
                        <LatexEditor
                            initialCode={code}
                            onCompile={handleCompile}
                            height="450px"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-sm tracking-widest uppercase text-muted-foreground">Architectural Output</h3>
                        <LatexPreview
                            code={code}
                            isCompiling={isCompiling}
                        />
                    </div>
                </div>
            </section>

            {/* Interactive Q&A Deep Dive */}
            <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-8 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -mr-32 -mt-32" />

                <div className="flex items-center gap-4 relative z-10">
                    <div className="p-3 bg-primary rounded-2xl">
                        <HelpCircle className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">Interactive Deep Dive</h2>
                        <p className="text-slate-400">Mastering the &quot;Why&quot; behind the structure.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-3">
                            <h4 className="font-bold text-primary flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" /> Question:
                            </h4>
                            <p className="text-lg">What happens if I forget <code>{"\\end{document}"}</code>?</p>
                            <div className="pt-4 border-t border-white/10">
                                <p className="text-sm text-slate-300">
                                    <span className="font-bold text-white uppercase text-xs block mb-1">Justification:</span>
                                    The compiler will throw an error saying &quot;Emergency Stop&quot;. Think of it like a PDF container; without the closing lid, LaTeX cannot finalize the file structure.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-3">
                            <h4 className="font-bold text-primary flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" /> Question:
                            </h4>
                            <p className="text-lg">Can I have text before <code>{"\\begin{document}"}</code>?</p>
                            <div className="pt-4 border-t border-white/10">
                                <p className="text-sm text-slate-300">
                                    <span className="font-bold text-white uppercase text-xs block mb-1">Justification:</span>
                                    No. That area is the <strong>Preamble</strong>. Any text typed there will cause a &quot;Missing begin document&quot; error because LaTeX isn&apos;t ready to display content yet.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-3">
                            <h4 className="font-bold text-primary flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" /> Question:
                            </h4>
                            <p className="text-lg">Why use <code>article</code> and not <code>book</code> for research papers?</p>
                            <div className="pt-4 border-t border-white/10">
                                <p className="text-sm text-slate-300">
                                    <span className="font-bold text-white uppercase text-xs block mb-1">Justification:</span>
                                    <code>article</code> is optimized for short, single-sectioned works. <code>book</code> forces new chapters to start on odd-numbered pages, which wastes space in a short 5-page research article.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-3 shadow-inner">
                            <p className="text-xs font-bold text-primary uppercase tracking-widest">Interactive Outcome</p>
                            <p className="text-sm italic text-slate-400">
                                Choosing the right class (Article vs. Report) changes the font sizes and margins to match global publication standards (IEEE/Nature) automatically.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Activity Track: The Research Journey */}
            <section className="space-y-10 py-10">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold outfit-font">Skill Level: The Research Journey</h2>
                    <p className="text-muted-foreground italic">Moving from &quot;Seedling&quot; to &quot;Master Harvester&quot;</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            level: "1. The Sprout (Beginner)",
                            analogy: "Planting the Seed",
                            task: "Basic Structure",
                            instruction: "Create a simple document that contains exactly one sentence about your research interest.",
                            detailedInstructions: [
                                "1. Keep the \\documentclass{article} at the top.",
                                "2. Ensure your sentence is between \\begin{document} and \\end{document}.",
                                "3. Click Compile to see your sentence in the preview."
                            ],
                            dos: ["Use a simple sentence.", "Check if \\begin and \\end are present."],
                            donts: ["Don't type text before \\begin{document}.", "Don't delete the documentclass line."],
                            reward: "Structural Awareness",
                            icon: <Target className="w-8 h-8 text-emerald-500" />,
                            color: "bg-emerald-50 border-emerald-100"
                        },
                        {
                            level: "2. The Sapling (Moderate)",
                            analogy: "Growing the Stem",
                            task: "Metadata Integration",
                            instruction: "Add \\title{...} and \\author{...} in the preamble. Use \\maketitle inside the document to render them.",
                            detailedInstructions: [
                                "1. Place \\title{My Research} before \\begin{document}.",
                                "2. Place \\author{Your Name} after title.",
                                "3. Type \\maketitle right after \\begin{document}."
                            ],
                            dos: ["Place metadata in the preamble.", "Use \\maketitle for visual output."],
                            donts: ["Don't put \\title inside the document body.", "Don't forget the backslash for \\maketitle."],
                            reward: "Automation Logic",
                            icon: <Rocket className="w-8 h-8 text-blue-500" />,
                            color: "bg-blue-50 border-blue-100"
                        },
                        {
                            level: "3. The Harvest (Pro)",
                            analogy: "Professional Yield",
                            task: "Global Configurations",
                            instruction: "Change documentclass to 'report'. Add an abstract environment to summarize your work.",
                            detailedInstructions: [
                                "1. Edit the first line to \\documentclass{report}.",
                                "2. Use \\begin{abstract} ... \\end{abstract} before the main text.",
                                "3. Notice the font size and layout changes."
                            ],
                            dos: ["Use 'report' for multi-chapter works.", "Place abstract at the start of the body."],
                            donts: ["Don't use 'article' for books.", "Don't put abstract in the preamble."],
                            reward: "Architectural Mastery",
                            icon: <Trophy className="w-8 h-8 text-amber-500" />,
                            color: "bg-amber-50 border-amber-100"
                        }
                    ].map((activity, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className={cn("p-8 rounded-4xl border-2 space-y-6 relative overflow-hidden group", activity.color)}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                                {activity.icon}
                            </div>

                            <div className="space-y-2">
                                <span className="text-xs font-bold uppercase tracking-widest opacity-60">{activity.level}</span>
                                <h3 className="text-2xl font-bold">{activity.analogy}</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white/60 p-4 rounded-2xl">
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Challenge:</p>
                                    <p className="text-sm font-medium leading-relaxed">{activity.instruction}</p>
                                </div>

                                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    <span>Outcome: {activity.reward}</span>
                                </div>
                            </div>

                            <button className="w-full py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-900 hover:text-white transition-colors">
                                Try in Lab
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* NEP 2020: Learn by Doing - Debug the Code */}
            <ErrorFixChallenge
                title="Fix the Broken LaTeX"
                challenges={[
                    {
                        id: 1,
                        title: "Missing End Tag",
                        brokenCode: "\\documentclass{article}\n\\begin{document}\nHello Agriculture World!",
                        fixedCode: "\\documentclass{article}\n\\begin{document}\nHello Agriculture World!\n\\end{document}",
                        errorMessage: "Emergency stop. \\end{document} was never found.",
                        hint: "Every \\begin{...} needs a matching \\end{...}",
                        explanation: "LaTeX requires \\end{document} to know where the content stops. Without it, the compiler panics like a farmer who forgot to close the barn door."
                    },
                    {
                        id: 2,
                        title: "Text Before Document",
                        brokenCode: "\\documentclass{article}\nThis text is in the wrong place!\n\\begin{document}\nHello World!\n\\end{document}",
                        fixedCode: "\\documentclass{article}\n\\begin{document}\nThis text is in the wrong place!\nHello World!\n\\end{document}",
                        errorMessage: "LaTeX Error: Missing \\begin{document}. Text found before \\begin{document}.",
                        hint: "All visible text must be between \\begin{document} and \\end{document}",
                        explanation: "The preamble (before \\begin{document}) is only for settings and packages. It's like trying to plant seeds before preparing the soil."
                    },
                    {
                        id: 3,
                        title: "Wrong Document Class Syntax",
                        brokenCode: "\\documentclass[article]\n\\begin{document}\nMy Research Paper\n\\end{document}",
                        fixedCode: "\\documentclass{article}\n\\begin{document}\nMy Research Paper\n\\end{document}",
                        errorMessage: "LaTeX Error: Missing \\begin{document}. Invalid document class.",
                        hint: "Document class name goes in curly braces {}, not square brackets []",
                        explanation: "In LaTeX, {} holds mandatory arguments and [] holds optional ones. \\documentclass{article} is correct. [article] would be treated as an option, not the class name."
                    }
                ]}
            />

            {/* NEP 2020: Learn by Doing - Build from Scratch */}
            <FillInBlank
                title="Build Your First Research Document"
                exercises={[
                    {
                        id: 1,
                        prompt: "Create a document with a title about soil analysis:",
                        codeTemplate: "\\documentclass{___BLANK1___}\n\\title{Soil pH Analysis in ___BLANK2___}\n\\author{Your Name}\n\\begin{document}\n___BLANK3___\n\\section{Introduction}\nThis study examines soil properties.\n\\end{document}",
                        blanks: [
                            { placeholder: "___BLANK1___", answer: "article", hint: "The most common class for research papers" },
                            { placeholder: "___BLANK2___", answer: "Clay Soils", hint: "A type of soil (two words, starts with C)" },
                            { placeholder: "___BLANK3___", answer: "\\maketitle", hint: "Command to render the title block" },
                        ],
                        explanation: "A research article uses the 'article' class, defines metadata in the preamble, and uses \\maketitle to display it.",
                        agriExample: "Your first research paper structure, just like planning your first field experiment"
                    }
                ]}
            />

            <SessionQuiz
                title="Mastery Check: The Research Journey"
                questions={SESSION_QUIZZES["session-1-first-doc"]}
            />
        </div>
    );
}

