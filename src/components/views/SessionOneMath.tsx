"use client";

import { useState } from "react";
import { LatexEditor } from "@/components/LatexEditor";
import { LatexPreview } from "@/components/LatexPreview";
import { MathBuilder } from "@/components/MathBuilder";
import { motion } from "framer-motion";
import { Sigma, FunctionSquare, Binary, Calculator, HelpCircle, CheckCircle2, Target, Rocket, Trophy, Star, Check, X, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { SessionQuiz } from "@/components/SessionQuiz";
import { SESSION_QUIZZES } from "@/lib/quiz-data";
import { CompilationDiscovery } from "@/components/CompilationDiscovery";
import { LATEX_COMMAND_DATA } from "@/lib/latex-commands";
import { FillInBlank } from "@/components/FillInBlank";
import { DragDropMatch } from "@/components/DragDropMatch";

const MATH_TERMS = [
    {
        category: "Greek Letters (Lowercase)", terms: [
            { command: "\\alpha", output: "α", usage: "Significance level, coefficients" },
            { command: "\\beta", output: "β", usage: "Regression coefficients" },
            { command: "\\gamma", output: "γ", usage: "Growth rate parameters" },
            { command: "\\delta", output: "δ", usage: "Small change / difference" },
            { command: "\\epsilon", output: "ε", usage: "Error term" },
            { command: "\\sigma", output: "σ", usage: "Standard deviation" },
            { command: "\\mu", output: "μ", usage: "Population mean" },
            { command: "\\lambda", output: "λ", usage: "Rate parameter" },
            { command: "\\theta", output: "θ", usage: "Angle / parameter" },
            { command: "\\pi", output: "π", usage: "Pi constant (3.14...)" },
        ]
    },
    {
        category: "Greek Letters (Uppercase)", terms: [
            { command: "\\Sigma", output: "Σ", usage: "Summation" },
            { command: "\\Delta", output: "Δ", usage: "Change / difference" },
            { command: "\\Omega", output: "Ω", usage: "Sample space" },
            { command: "\\Pi", output: "Π", usage: "Product notation" },
            { command: "\\Phi", output: "Φ", usage: "Normal distribution CDF" },
        ]
    },
    {
        category: "Operators & Functions", terms: [
            { command: "\\frac{a}{b}", output: "a/b", usage: "Fractions" },
            { command: "\\sqrt{x}", output: "√x", usage: "Square root" },
            { command: "\\sum_{i=1}^{n}", output: "Σ (i=1 to n)", usage: "Summation" },
            { command: "\\int_{a}^{b}", output: "∫ (a to b)", usage: "Integration" },
            { command: "\\prod_{i=1}^{n}", output: "∏ (i=1 to n)", usage: "Product" },
            { command: "\\log", output: "log", usage: "Logarithm" },
            { command: "\\lim_{x \\to 0}", output: "lim (x→0)", usage: "Limit" },
        ]
    },
    {
        category: "Relations & Comparisons", terms: [
            { command: "\\leq", output: "≤", usage: "Less than or equal" },
            { command: "\\geq", output: "≥", usage: "Greater than or equal" },
            { command: "\\neq", output: "≠", usage: "Not equal" },
            { command: "\\approx", output: "≈", usage: "Approximately equal" },
            { command: "\\pm", output: "±", usage: "Plus or minus" },
            { command: "\\times", output: "×", usage: "Multiplication" },
            { command: "\\infty", output: "∞", usage: "Infinity" },
        ]
    },
];

export function SessionOneMath() {
    const [code, setCode] = useState(`\\documentclass{article}

\\begin{document}
\\section{Statistical Analysis of Crop Yield}
The relationship between rainfall $R$ and yield $Y$ can be expressed as:

\\[
Y = \\alpha R^2 + \\beta R + \\epsilon
\\]

Where:
\\begin{itemize}
    \\item $\\alpha$ is the transformation coefficient.
    \\item $\\beta$ is the linear growth factor.
    \\item $\\epsilon$ represents the error margin.
\\end{itemize}

\\subsection{Standard Deviation Formula}
The formula for standard deviation is:
\\[
\\sigma = \\sqrt{\\frac{1}{N} \\sum_{i=1}^{N} (x_i - \\mu)^2}
\\]
\\end{document}`);
    const [isCompiling, setIsCompiling] = useState(false);

    const handleCompile = (newCode: string) => {
        setIsCompiling(true);
        setTimeout(() => {
            setCode(newCode);
            setIsCompiling(false);
        }, 1000);
    };

    const insertLatex = (latex: string) => {
        // Basic logic to append latex to code for demonstration
        // In a real app, this would insert at cursor position
        setCode(prev => prev.replace("\\end{document}", `${latex}\n\\end{document}`));
    };

    return (
        <div className="space-y-12 pb-20">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight outfit-font">Module 5: Mathematics</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    The language of Agriculture Statistics. Professional, crisp, and publication-ready equations with zero effort.
                </p>
            </div>

            <CompilationDiscovery
                commands={LATEX_COMMAND_DATA["session-1-math"]}
                moduleTitle="Module 5"
            />

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-card border rounded-3xl p-8 space-y-4 shadow-sm">
                        <div className="flex items-center gap-3 text-primary">
                            <Calculator className="w-6 h-6" />
                            <h3 className="text-xl font-bold">Math Mode Architectures</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { mode: "Inline Math", cmd: "$...$", impact: "Keeps flow within a paragraph.", options: [{ name: "\\( ... \\)", impact: "Standard official alternative." }] },
                                { mode: "Display Math", cmd: "\\[ ... \\]", impact: "Centers equation, adds spacing.", options: [{ name: "\\begin{equation}", impact: "Adds auto-numbering." }] },
                                { mode: "Aligned Math", cmd: "\\begin{align}", impact: "Aligns multiple steps at = sign.", options: [{ name: "align*", impact: "Removes numbers from all steps." }] }
                            ].map((mode, i) => (
                                <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-primary transition-colors group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-sm text-slate-700">{mode.mode}</h4>
                                        <code className="text-xs bg-white px-2 py-0.5 rounded border border-slate-200 text-primary">{mode.cmd}</code>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-3">{mode.impact}</p>
                                    <div className="space-y-1">
                                        {mode.options.map((opt, idx) => (
                                            <div key={idx} className="text-[10px] bg-white/50 p-1.5 rounded italic flex gap-2">
                                                <span className="font-bold text-slate-600 shrink-0">{opt.name}:</span>
                                                <span>{opt.impact}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <MathBuilder onInsert={insertLatex} />
                </div>

                <div className="h-[650px]">
                    <LatexPreview
                        code={code}
                        isCompiling={isCompiling}
                    />
                </div>
            </div>

            {/* Mathematical Terms Reference Table */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                        <FunctionSquare className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Mathematical Terms Reference</h2>
                        <p className="text-sm text-muted-foreground">Essential LaTeX commands for agriculture statistics and research</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {MATH_TERMS.map((group) => (
                        <div key={group.category} className="bg-card border rounded-3xl overflow-hidden shadow-sm">
                            <div className="bg-slate-900 px-6 py-3">
                                <h3 className="text-sm font-bold text-white tracking-wide">{group.category}</h3>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="grid grid-cols-[1fr_60px_1fr] gap-2 px-6 py-2 bg-slate-50 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                    <span>Command</span>
                                    <span className="text-center">Output</span>
                                    <span>Usage in Agriculture</span>
                                </div>
                                {group.terms.map((term) => (
                                    <div
                                        key={term.command}
                                        className="grid grid-cols-[1fr_60px_1fr] gap-2 px-6 py-2.5 hover:bg-primary/5 transition-colors items-center group/row"
                                    >
                                        <code className="text-xs font-mono text-slate-700 font-semibold">{term.command}</code>
                                        <span className="text-center text-lg">{term.output}</span>
                                        <span className="text-xs text-muted-foreground">{term.usage}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Binary className="w-6 h-6 text-primary" />
                    Live Math Lab
                </h2>
                <div className="h-[500px]">
                    <LatexEditor
                        initialCode={code}
                        onCompile={handleCompile}
                        height="400px"
                    />
                </div>
            </div>
            {/* Interactive Math Deep Dive */}
            <section className="bg-slate-900 rounded-[3rem] p-12 text-white space-y-10 shadow-2xl relative overflow-hidden mt-12">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[130px] rounded-full -mr-48 -mt-48" />

                <div className="flex items-center gap-6 relative z-10">
                    <div className="p-4 bg-primary rounded-3xl shadow-2xl shadow-primary/30 rotate-3 transition-transform hover:rotate-0">
                        <HelpCircle className="w-12 h-12" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold outfit-font">The Math Masterclass</h2>
                        <p className="text-slate-400 text-lg italic">&quot;Communicating complex Agriculture Data with Mathematical Elegance.&quot;</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 relative z-10">
                    <div className="space-y-8">
                        <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] space-y-6 hover:bg-white/8 transition-all duration-300">
                            <h4 className="font-bold text-primary flex items-center gap-3 text-2xl">
                                <CheckCircle2 className="w-8 h-8" /> Why <code>align</code> over <code>equation</code>?
                            </h4>
                            <p className="text-slate-200 text-lg">When writing a multi-step derivation for Soil Density calculation...</p>
                            <div className="pt-6 border-t border-white/10">
                                <p className="text-base text-slate-300 leading-relaxed font-light">
                                    <span className="font-bold text-white uppercase text-xs block mb-3 tracking-[0.2em]">Publication Insight:</span>
                                    Standard <code>equation</code> forces all steps on one line or centers them independently. <code>align</code> uses the <strong>&amp;</strong> symbol to align every equal sign (=) perfectly across lines, making your proof much easier for reviewers to follow.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] space-y-6 hover:bg-white/8 transition-all">
                            <h4 className="font-bold text-primary flex items-center gap-3 text-2xl">
                                <CheckCircle2 className="w-8 h-8" /> The Non-Italic Mystery?
                            </h4>
                            <p className="text-slate-200">Why does <code>{"\\sin(x)"}</code> look better than <code>{"sin(x)"}</code>?</p>
                            <div className="pt-6 border-t border-white/10">
                                <p className="text-base text-slate-300 leading-relaxed font-light">
                                    <span className="font-bold text-white uppercase text-xs block mb-3 tracking-[0.2em]">Scientific Protocol:</span>
                                    In math, multiletter variables are rare. <code>sin(x)</code> is interpreted as <i>s &times; i &times; n &times; x</i>. Using the backslash <code>\\sin</code> tells LaTeX it is a <strong>Function Operator</strong>, typesetting it upright as per ISO standards.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-primary/5 border border-primary/20 p-10 rounded-[2.5rem] space-y-6 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                                <Sigma className="w-24 h-24" />
                            </div>
                            <h5 className="font-extrabold text-primary uppercase text-xs tracking-[0.3em]">Advanced Tip: Fractions</h5>
                            <p className="text-lg text-slate-200 leading-snug">
                                &quot;For inline math, prefer <code>x/y</code>. For display math, always use <code>{"\\frac{numerator}{denominator}"}</code>.&quot;
                            </p>
                            <div className="p-8 bg-black/40 rounded-3xl font-mono text-sm border border-white/5 text-primary/90 space-y-2">
                                <p className="text-slate-500">// Too big for inline</p>
                                <code>{"$\\frac{Total\\ Yield}{Total\\ Area}$"}</code>
                                <div className="h-px bg-white/5 my-4" />
                                <p className="text-slate-500">// Correct for flow</p>
                                <code>{"$Yield / Area_{total}$"}</code>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] space-y-6">
                            <h4 className="font-bold text-primary flex items-center gap-3 text-2xl">
                                <CheckCircle2 className="w-8 h-8" /> Auto-Numbering?
                            </h4>
                            <p className="text-lg text-slate-200">How to remove the (1) next to an equation?</p>
                            <div className="pt-6 border-t border-white/10">
                                <p className="text-base text-slate-300 leading-relaxed font-light">
                                    <span className="font-bold text-white uppercase text-xs block mb-3 tracking-[0.2em]">Solution:</span>
                                    Simply add an asterisk (*) to the environment name. <code>{"\\begin{equation*}"}</code> or <code>{"\\begin{align*}"}</code>. Use this for intermediate steps that don&apos;t need to be cited in your text.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Activity Track: The Formula Lab */}
            <section className="space-y-10 py-10">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold outfit-font">Skill Level: The Formula Lab</h2>
                    <p className="text-muted-foreground italic">Mastering the language of quantitative precision</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            level: "1. The Pipette (Beginner)",
                            analogy: "Basic Mixing",
                            instruction: "Write a simple inline equation showing the sum of Nitrogen (N) and Phosphorus (P) equaling total fertilizer (F).",
                            detailedInstructions: [
                                "Type the equation inside dollar signs like this: $N + P = F$.",
                                "Experiment with adding subscripts like $N_1 + P_2 = F_{total}$.",
                                "Place it within a sentence of text."
                            ],
                            dos: ["Use $...$ for equations inside text.", "Use underscore (_) for subscripts."],
                            donts: ["Don't use dollar signs for large fractions.", "Don't forget to close the second $."],
                            reward: "Inline Syntax",
                            icon: <Target className="w-8 h-8 text-rose-500" />,
                            color: "bg-rose-50 border-rose-100"
                        },
                        {
                            level: "2. The Centrifuge (Moderate)",
                            analogy: "Structured Reaction",
                            instruction: "Create a display equation for the Quadratic Formula or a Crop Yield growth rate using fractions and square roots.",
                            detailedInstructions: [
                                "Use the display math syntax \\[ ... \\].",
                                "Use \\frac{num}{den} for fractions.",
                                "Use \\sqrt{...} for the square root."
                            ],
                            dos: ["Use display math for important formulas.", "Check that exponents (^) are correct."],
                            donts: ["Don't crowd multiple formulas in one \\[ \\].", "Don't use / for complex fractions."],
                            reward: "Structural Math",
                            icon: <Rocket className="w-8 h-8 text-blue-500" />,
                            color: "bg-blue-50 border-blue-100"
                        },
                        {
                            level: "3. The Data Lab (Pro)",
                            analogy: "Complex Synthesis",
                            instruction: "Use the 'align' environment to show a 3-step calculation of Total Yield based on Rainfall and Area.",
                            detailedInstructions: [
                                "Start with \\begin{align*}.",
                                "Use & before the equals sign to align them.",
                                "Use \\\\ to end each line of the calculation."
                            ],
                            dos: ["Align at the '=' for readability.", "Use '*' to hide equation numbers if not needed."],
                            donts: ["Don't forget the \\\\ at the end of each line.", "Don't use align for single-line formulas."],
                            reward: "Multi-line Alignment",
                            icon: <Trophy className="w-8 h-8 text-amber-500" />,
                            color: "bg-amber-50 border-amber-100"
                        }
                    ].map((activity, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className={cn("p-8 rounded-[3rem] border-2 space-y-6 relative overflow-hidden group transition-all flex flex-col", activity.color)}
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
                                Start Mixing
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* NEP 2020: Learn by Doing - Math Command Matching */}
            <DragDropMatch
                title="Match the Math Syntax to Its Output"
                agriContext="Agriculture statistics require precise mathematical notation"
                pairs={[
                    { command: "$x^2$", description: "x squared (superscript)" },
                    { command: "$x_i$", description: "x with subscript i" },
                    { command: "\\frac{a}{b}", description: "A fraction: a over b" },
                    { command: "\\sqrt{x}", description: "Square root of x" },
                    { command: "\\sum_{i=1}^{n}", description: "Summation from i=1 to n" },
                    { command: "$...$", description: "Inline math mode (within text)" },
                ]}
            />

            {/* NEP 2020: Learn by Doing - Write Agriculture Equations */}
            <FillInBlank
                title="Write Agriculture Statistics Equations"
                exercises={[
                    {
                        id: 1,
                        prompt: "Write the formula for crop yield per hectare using a fraction:",
                        codeTemplate: "The yield per hectare is:\n\\[\nY = ___BLANK1___{Total\\ Harvest}{Total\\ ___BLANK2___}\n\\]",
                        blanks: [
                            { placeholder: "___BLANK1___", answer: "\\frac", hint: "The LaTeX command for fractions (\\fr...)" },
                            { placeholder: "___BLANK2___", answer: "Area", hint: "Yield = Harvest divided by ___" },
                        ],
                        explanation: "\\frac{numerator}{denominator} creates a proper fraction. In agriculture, yield is commonly expressed as harvest per unit area.",
                        agriExample: "Yield (t/ha) = Total Harvest (tonnes) / Total Area (hectares)"
                    },
                    {
                        id: 2,
                        prompt: "Write the standard deviation formula for soil pH measurements:",
                        codeTemplate: "\\[\n\\sigma = ___BLANK1___{\\frac{1}{N} ___BLANK2___{i=1}^{N} (x_i - \\mu)___BLANK3___}\n\\]",
                        blanks: [
                            { placeholder: "___BLANK1___", answer: "\\sqrt", hint: "The square root command (\\sq...)" },
                            { placeholder: "___BLANK2___", answer: "\\sum", hint: "The summation symbol (\\su...)" },
                            { placeholder: "___BLANK3___", answer: "^2", hint: "Squared means to the power of 2 (use ^)" },
                        ],
                        explanation: "Standard deviation uses \\sqrt for the root, \\sum for summation, and ^2 for squaring. These are the building blocks of statistical notation.",
                        agriExample: "Used to measure variation in soil pH across different sampling points in your field"
                    }
                ]}
            />

            <SessionQuiz
                title="Mastery Check: The Formula Lab"
                questions={SESSION_QUIZZES["session-1-math"]}
            />
        </div>
    );
}
