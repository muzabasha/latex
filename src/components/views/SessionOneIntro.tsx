"use client";

import { useState } from "react";
import { LatexEditor } from "@/components/LatexEditor";
import { LatexPreview } from "@/components/LatexPreview";
import { motion } from "framer-motion";
import { Info, Lightbulb, ChefHat, ArrowRight, CheckCircle2, Target, Rocket, Trophy, Star, Check, X, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { SessionQuiz } from "@/components/SessionQuiz";
import { SESSION_QUIZZES } from "@/lib/quiz-data";
import { CompilationDiscovery } from "@/components/CompilationDiscovery";
import { LATEX_COMMAND_DATA } from "@/lib/latex-commands";
import { DragDropMatch } from "@/components/DragDropMatch";
import { FillInBlank } from "@/components/FillInBlank";

export function SessionOneIntro() {
    const [code, setCode] = useState("Hello Research World!\n\nThis is my first step into the world of LaTeX.");
    const [isCompiling, setIsCompiling] = useState(false);

    const handleCompile = (newCode: string) => {
        setIsCompiling(true);
        setTimeout(() => {
            setCode(newCode);
            setIsCompiling(false);
        }, 800);
    };

    return (
        <div className="space-y-12 pb-20">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight outfit-font">Module 1: What is LaTeX?</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    More than just a document editor&mdash;it&apos;s a high-precision engineering tool for your research papers.
                </p>
            </div>

            {/* Analogy Section */}
            <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                    className="bg-primary/5 border border-primary/20 rounded-2xl p-6 space-y-4"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="p-3 bg-primary/10 rounded-xl w-fit text-primary">
                        <ChefHat className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">The Cooking Analogy</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        LaTeX is like cooking with a recipe. You prepare the ingredients (Code) and the Oven (Compiler) produces the final dish (PDF).
                    </p>
                </motion.div>

                <motion.div
                    className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 space-y-4"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="p-3 bg-blue-500/10 rounded-xl w-fit text-blue-500">
                        <Lightbulb className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">Why not MS Word?</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Word is &quot;What You See Is What You Get&quot;. LaTeX is &quot;What You Mean Is What You Get&quot;. No more jumping images or broken numbering!
                    </p>
                </motion.div>

                <motion.div
                    className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-6 space-y-4"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="p-3 bg-orange-500/10 rounded-xl w-fit text-orange-500">
                        <Info className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">Compilation Process</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        <strong>Text File (.tex)</strong> &rarr; <strong>Compiler (PdfLaTeX)</strong> &rarr; <strong>PDF Output</strong>. It&apos;s that simple!
                    </p>
                </motion.div>
            </div>

            {/* Interactive Compilation Discovery */}
            <CompilationDiscovery
                commands={LATEX_COMMAND_DATA["session-1-intro"]}
                moduleTitle="Module 1"
            />

            {/* Activity Track: The Seedling Phase */}
            <section className="space-y-10 py-10">
                <div className="text-center space-y-2">
                    <h2 className="text-4xl font-bold outfit-font">Skill Level: The Seedling Phase</h2>
                    <p className="text-muted-foreground italic tracking-widest uppercase text-xs font-bold">Understanding the engine before the complexity</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            level: "1. The Observer (Beginner)",
                            analogy: "Sprouting the Seed",
                            instruction: "Look at the Source Code snippet. Identify the 'Control Words' that start with a backslash (\\).",
                            detailedInstructions: [
                                "Scan the example code for the '\\' character.",
                                "Notice how \\documentclass defines the type of paper.",
                                "Identify where the actual content begins and ends."
                            ],
                            dos: ["Look for the backslash before every command.", "Check for matching curly braces {}."],
                            donts: ["Don't ignore the preamble (stuff before \\begin{document}).", "Don't forget that LaTeX is case-sensitive."],
                            reward: "Command Recognition",
                            icon: <Target className="w-8 h-8 text-primary" />,
                            color: "bg-primary/5 border-primary/10"
                        },
                        {
                            level: "2. The Apprentice (Moderate)",
                            analogy: "Watering the Plant",
                            instruction: "Modify the text in the Interactive Editor above and hit 'Compile'. Observe the delay—that's the 'Oven' cooking your PDF!",
                            detailedInstructions: [
                                "Change 'Hello Research World' to your own name.",
                                "Add a few sentences about your research interest.",
                                "Click 'Compile Document' and watch the preview update."
                            ],
                            dos: ["Experiment with different sentences.", "Watch the compilation status indicator."],
                            donts: ["Don't worry if it takes a second—compilation is structured.", "Don't delete the document environment tags."],
                            reward: "Workflow Mastery",
                            icon: <Rocket className="w-8 h-8 text-blue-500" />,
                            color: "bg-blue-50 border-blue-100"
                        },
                        {
                            level: "3. The Gardener (Pro)",
                            analogy: "Branching Out",
                            instruction: "Predict what happens if you remove the \\end{document} tag. Try it and see if the 'PDF' still appears correctly.",
                            detailedInstructions: [
                                "Remove only the last line (\\end{document}).",
                                "Compile and look for error messages.",
                                "Understand why LaTeX needs a clearly defined 'End' for the document."
                            ],
                            dos: ["Read the error messages carefully.", "Restore the tag to fix the document."],
                            donts: ["Don't leave tags open in a real project.", "Don't ignore the importance of structure."],
                            reward: "Structural Integrity",
                            icon: <Trophy className="w-8 h-8 text-amber-500" />,
                            color: "bg-amber-50 border-amber-100"
                        }
                    ].map((activity, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className={cn("p-10 rounded-4xl border-2 space-y-8 relative overflow-hidden group transition-all flex flex-col", activity.color)}
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
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter text-left">The Mission:</p>
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
                                    <span>Milestone: {activity.reward}</span>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-primary transition-all shadow-xl shadow-slate-900/10 active:scale-95 font-outfit mt-auto relative z-10">
                                Start Observing
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* NEP 2020: Learn by Doing - Match the Concepts */}
            <DragDropMatch
                title="Match the LaTeX Concept"
                agriContext="Think of LaTeX like a seed-to-harvest pipeline for your research papers"
                pairs={[
                    { command: ".tex file", description: "The raw ingredients (your code and text)" },
                    { command: "Compiler (PdfLaTeX)", description: "The oven that bakes your code into a PDF" },
                    { command: ".pdf output", description: "The final dish served to the journal" },
                    { command: "\\documentclass", description: "The recipe type (article, report, book)" },
                    { command: "Preamble", description: "The preparation area before cooking begins" },
                ]}
            />

            {/* NEP 2020: Learn by Doing - Fill in the Blanks */}
            <FillInBlank
                title="Complete the LaTeX Structure"
                exercises={[
                    {
                        id: 1,
                        prompt: "Complete this minimal LaTeX document structure:",
                        codeTemplate: "___BLANK1___{article}\n\n___BLANK2___\nHello Agriculture World!\n___BLANK3___",
                        blanks: [
                            { placeholder: "___BLANK1___", answer: "\\documentclass", hint: "This command defines the type of document (starts with \\document...)" },
                            { placeholder: "___BLANK2___", answer: "\\begin{document}", hint: "This opens the document body (\\begin{...})" },
                            { placeholder: "___BLANK3___", answer: "\\end{document}", hint: "This closes the document body (\\end{...})" },
                        ],
                        explanation: "Every LaTeX document needs: \\documentclass to set the type, \\begin{document} to start content, and \\end{document} to finish.",
                        agriExample: "Think of it as: Choose your crop type → Plant the seeds → Harvest the yield"
                    },
                    {
                        id: 2,
                        prompt: "Add a title and author to this research paper:",
                        codeTemplate: "\\documentclass{article}\n___BLANK1___{Impact of Rainfall on Wheat Yield}\n___BLANK2___{Dr. Agriculture Scholar}\n\\begin{document}\n___BLANK3___\n\\end{document}",
                        blanks: [
                            { placeholder: "___BLANK1___", answer: "\\title", hint: "The command to set the paper title (\\ti...)" },
                            { placeholder: "___BLANK2___", answer: "\\author", hint: "The command to set the author name (\\au...)" },
                            { placeholder: "___BLANK3___", answer: "\\maketitle", hint: "The command that renders the title block (\\make...)" },
                        ],
                        explanation: "\\title, \\author, and \\date go in the preamble. \\maketitle goes inside the document body to render them.",
                        agriExample: "Like labeling your seed packet (title), noting the farmer (author), and planting it (maketitle)"
                    }
                ]}
            />

            <SessionQuiz
                title="Mastery Check: The Seedling Phase"
                questions={SESSION_QUIZZES["session-1-intro"]}
            />
        </div>
    );
}
