"use client";

import { motion } from "framer-motion";
import { Languages, Globe2, BookOpenCheck, Wheat, BookMarked, Sparkles, MessageSquareQuote, Check, X, ClipboardList, Target, Rocket, Trophy, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { CompilationDiscovery } from "@/components/CompilationDiscovery";
import { LATEX_COMMAND_DATA } from "@/lib/latex-commands";
import { DragDropMatch } from "@/components/DragDropMatch";
import { FillInBlank } from "@/components/FillInBlank";

export function SessionThreeMultilingual() {
    return (
        <div className="space-y-12 pb-20">
            <div className="space-y-4 text-center lg:text-left">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <div className="p-3 bg-indigo-100 rounded-2xl">
                        <Globe2 className="w-8 h-8 text-indigo-600" />
                    </div>
                    <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">NEP 2020 Aligned</span>
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight outfit-font">
                    Multilingual Support
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl border-l-4 border-indigo-200 pl-6 py-2 italic">
                    "Promoting Indian Languages: Fulfilling the NEP 2020 vision of inclusive education by publishing high-impact research in regional languages like Hindi and Kannada."
                </p>
            </div>

            <CompilationDiscovery
                commands={LATEX_COMMAND_DATA["session-3-multilingual"]}
                moduleTitle="Module 10"
            />

            <div className="grid lg:grid-cols-2 gap-12">
                <div className="bg-white border rounded-[3rem] p-10 space-y-8 shadow-xl relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-colors" />
                    
                    <h3 className="text-3xl font-bold flex items-center gap-4 outfit-font relative">
                        <Languages className="w-8 h-8 text-indigo-500" />
                        Scripts of Bharat
                    </h3>
                    
                    <div className="space-y-6 relative text-muted-foreground leading-relaxed">
                        <p>
                            LaTeX isn&apos;t just for English. Using the <code>babel</code> package, you can instantly translate your entire document structure. Headings like &quot;Abstract&quot; become &quot;सारांश&quot; (Hindi) or &quot;ಸಾರಾಂಶ&quot; (Kannada) automatically.
                        </p>
                        
                        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 space-y-4">
                            <h4 className="font-bold text-indigo-900 text-sm italic flex items-center gap-2">
                                <Sparkles className="w-4 h-4" /> Why the mother tongue matters?
                            </h4>
                            <p className="text-xs text-slate-600 leading-normal">
                                NEP 2020 emphasizes that complex scientific concepts are often best understood in one&apos;s primary language. LaTeX empowers you to bridge the gap between global science and local knowledge.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 text-white rounded-[3rem] p-10 space-y-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full -mr-16 -mt-16" />
                    
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-indigo-600 rounded-2xl">
                            <BookOpenCheck className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">The Babel Paradigm</h3>
                            <p className="text-indigo-300 text-sm">Automated Localization</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                            <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">Hindi Sample (UTF-8)</p>
                            <pre className="text-xs font-mono text-indigo-100 leading-relaxed">
{`\\usepackage[hindi,english]{babel}
\\begin{document}
\\selectlanguage{hindi}
भारतीय कृषि में अनुसंधान (Research in Indian Agriculture)
\\end{document}`}
                            </pre>
                        </div>
                        
                        <div className="flex items-start gap-3 bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20">
                            <Wheat className="w-5 h-5 text-indigo-400 shrink-0" />
                            <p className="text-xs text-indigo-200">
                                Perfect for publishing Agricultural Extension materials for local farmers who prefer regional scripts.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <section className="space-y-10 py-10">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold outfit-font">Multilingual Mastery Path</h2>
                    <p className="text-muted-foreground italic tracking-widest uppercase text-xs font-bold">Bridging Cultures with Code</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-left">
                    {[
                        {
                            level: "1. The Localizer",
                            instruction: "Setup a multi-language document using Babel. The last language in the options becomes the default.",
                            tasks: [
                                "Add \\usepackage[hindi,english]{babel} to preamble.",
                                "Notice how 'Contents' changes automatically.",
                                "Compile with PdfLaTeX."
                            ],
                            reward: "Inclusive Design",
                            icon: <Target className="w-8 h-8 text-primary" />,
                            color: "bg-indigo-50 border-indigo-100"
                        },
                        {
                            level: "2. The Translator",
                            instruction: "Switch languages mid-document for bilingual abstracts or appendices.",
                            tasks: [
                                "Use \\selectlanguage{hindi} for body text.",
                                "Use \\foreignlanguage{english}{...} for single words.",
                                "Ensure hyphenation stays correct."
                            ],
                            reward: "Bilingual Scholarship",
                            icon: <Rocket className="w-8 h-8 text-blue-500" />,
                            color: "bg-blue-50 border-blue-100"
                        },
                        {
                            level: "3. The Script Engineer",
                            instruction: "Master Polyglossia for complex fonts and scripts using XeLaTeX engine.",
                            tasks: [
                                "Use \\setmainlanguage{kannada}.",
                                "Load external fonts with fontspec.",
                                "Handle Right-to-Left (RTL) if needed."
                            ],
                            reward: "Modern Script Literacy",
                            icon: <Trophy className="w-8 h-8 text-amber-500" />,
                            color: "bg-emerald-50 border-emerald-100"
                        }
                    ].map((activity, i) => (
                        <div key={i} className={cn("p-8 rounded-[2.5rem] border-2 space-y-6 group transition-all", activity.color)}>
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{activity.level}</span>
                                {activity.icon}
                            </div>
                            <h4 className="text-xl font-bold">{activity.reward}</h4>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium">{activity.instruction}</p>
                            <ul className="space-y-2">
                                {activity.tasks.map((task, idx) => (
                                    <li key={idx} className="flex gap-2 text-xs text-slate-500 items-start italic">
                                        <Check className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                                        {task}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <DragDropMatch
                title="Match the Localization Tool"
                agriContext="Preparing your research for a regional Farmer's Journal"
                pairs={[
                    { command: "babel", description: "Standard multilingual package for PdfLaTeX" },
                    { command: "polyglossia", description: "Modern package for XeLaTeX script support" },
                    { command: "selectlanguage", description: "Switches the global document language" },
                    { command: "Devanagari", description: "The script used for Hindi and Sanskrit" },
                    { command: "UTF-8", description: "The encoding required for non-English scripts" },
                ]}
            />

            <FillInBlank
                title="Author your First Bilingual Abstract"
                exercises={[
                    {
                        id: 1,
                        prompt: "Enable Hindi support and write a bilingual title for your soil study:",
                        codeTemplate: "\\usepackage[___BLANK1___, english]{___BLANK2___}\n\\begin{document}\n\\___BLANK3___{hindi}\nमिट्टी का विश्लेषण (Soil Analysis)\n\\end{document}",
                        blanks: [
                            { placeholder: "___BLANK1___", answer: "hindi", hint: "The name of the language you want to add" },
                            { placeholder: "___BLANK2___", answer: "babel", hint: "The essential package for multilingual support" },
                            { placeholder: "___BLANK3___", answer: "selectlanguage", hint: "Command to switch the active language" },
                        ],
                        explanation: "Babel allows you to specify multiple languages. The last one is the default, but you can switch to Hindi using \\selectlanguage{hindi} to handle Devanagari script properly.",
                        agriExample: "Used for translating yield reports for local agricultural bureaus."
                    }
                ]}
            />
        </div>
    );
}
