"use client";

import { useState } from "react";
import { LatexEditor } from "@/components/LatexEditor";
import { motion, AnimatePresence } from "framer-motion";
import { Table, Image as ImageIcon, Layout, Grid, Info, Sparkles, Plus, Trash2, HelpCircle, CheckCircle2, Target, Rocket, Trophy, Star, Check, X, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

export function SessionTwoTablesFigures() {
    const [data, setData] = useState([
        ["Year", "Rainfall (mm)", "Yield (t/ha)"],
        ["2021", "450", "3.2"],
        ["2022", "520", "3.8"]
    ]);

    const addRow = () => setData([...data, ["", "", ""]]);
    const removeRow = (i: number) => setData(data.filter((_, idx) => idx !== i));
    const updateData = (r: number, c: number, val: string) => {
        const newData = [...data];
        newData[r][c] = val;
        setData(newData);
    };

    const generateTableLatex = () => {
        let latex = `\\begin{table}[h]\n\\centering\n\\begin{tabular}{|${"c|".repeat(data[0].length)}}\n\\hline\n`;
        data.forEach(row => {
            latex += row.map(cell => cell || " ").join(" & ") + " \\\\ \\hline\n";
        });
        latex += `\\end{tabular}\n\\caption{Agricultural Performance Data}\n\\label{table:data}\n\\end{table}`;
        return latex;
    };

    const [code, setCode] = useState(`\\documentclass{article}
\\usepackage{graphicx}

\\begin{document}

\\section{Results}
As shown in Table \\ref{table:yield}, the nitrogen content directly correlates with height.

\\begin{table}[h]
\\centering
\\begin{tabular}{|l|c|r|}
\\hline
Treatment & Dose & Result \\\\ \\hline
N1 & 50kg & 45cm \\\\ \\hline
N2 & 100kg & 52cm \\\\ \\hline
\\end{tabular}
\\caption{Crop Yield Results}
\\label{table:yield}
\\end{table}

\\end{document}`);

    return (
        <div className="space-y-12 pb-20">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight outfit-font">Module 8: Tables & Figures</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    Visualizing research data. Learn how to build precise tables and insert images that stay exactly where you want them.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Table Builder */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <Table className="w-6 h-6 text-primary" />
                            Interactive Table Builder
                        </h3>
                        <button
                            onClick={addRow}
                            className="flex items-center gap-2 text-primary hover:bg-primary/10 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                        >
                            <Plus className="w-4 h-4" /> Add Row
                        </button>
                    </div>

                    <div className="bg-white border-2 border-primary/20 rounded-3xl overflow-hidden shadow-xl">
                        <div className="p-1 space-y-1">
                            {data.map((row, rIdx) => (
                                <div key={rIdx} className="flex gap-1 group">
                                    {row.map((cell, cIdx) => (
                                        <input
                                            key={cIdx}
                                            value={cell}
                                            onChange={(e) => updateData(rIdx, cIdx, e.target.value)}
                                            className={cn(
                                                "flex-1 p-3 outline-none focus:bg-primary/5 text-sm transition-colors",
                                                rIdx === 0 ? "font-bold bg-slate-100" : "bg-white"
                                            )}
                                            placeholder="..."
                                        />
                                    ))}
                                    {rIdx > 0 && (
                                        <button
                                            onClick={() => removeRow(rIdx)}
                                            className="px-3 text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase">Generated LaTeX Code</span>
                            <button
                                onClick={() => navigator.clipboard.writeText(generateTableLatex())}
                                className="text-xs flex items-center gap-1 hover:text-primary transition-colors font-bold"
                            >
                                <Plus className="w-3 h-3" /> Insert into Editor
                            </button>
                        </div>
                        <pre className="bg-black/40 p-4 rounded-xl text-xs font-mono text-primary leading-relaxed overflow-x-auto whitespace-pre-wrap">
                            {generateTableLatex()}
                        </pre>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="space-y-6">
                    <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Sparkles className="w-6 h-6 text-primary" />
                                The &quot;Float&quot; &amp; Table Architecture
                            </h3>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white p-5 rounded-3xl shadow-sm border space-y-3">
                                <h4 className="font-bold text-sm text-primary uppercase tracking-wider">Alignment Specifiers</h4>
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        { cmd: "|l|", desc: "Left aligned with vertical border.", impact: "Best for text-heavy columns." },
                                        { cmd: "|c|", desc: "Center aligned.", impact: "Standard for numeric data." },
                                        { cmd: "|r|", desc: "Right aligned.", impact: "Aligns decimal points visually." }
                                    ].map((opt, i) => (
                                        <div key={i} className="text-xs bg-slate-50 p-2 rounded-xl flex gap-3 italic">
                                            <code className="text-primary font-bold shrink-0">{opt.cmd}</code>
                                            <span>{opt.impact}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-3xl shadow-sm border space-y-3">
                                <h4 className="font-bold text-sm text-primary uppercase tracking-wider">Placement (Float) Control</h4>
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        { cmd: "[h]", impact: "Here (approximate placement)." },
                                        { cmd: "[t]", impact: "Top of the page." },
                                        { cmd: "[b]", impact: "Bottom of the page." },
                                        { cmd: "[h!]", impact: "Override LaTeX gravity (STRICT placement)." }
                                    ].map((opt, i) => (
                                        <div key={i} className="text-xs bg-slate-50 p-2 rounded-xl flex gap-3 italic">
                                            <code className="text-primary font-bold shrink-0">{opt.cmd}</code>
                                            <span>{opt.impact}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-[400px]">
                        <LatexEditor
                            initialCode={code}
                            height="350px"
                        />
                    </div>
                </div>
            </div>

            {/* Interactive Q&A Deep Dive */}
            <section className="bg-slate-900 rounded-[3rem] p-12 text-white space-y-10 shadow-2xl relative overflow-hidden mt-12">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[130px] rounded-full -mr-48 -mt-48" />

                <div className="flex items-center gap-6 relative z-10">
                    <div className="p-4 bg-primary rounded-3xl shadow-xl shadow-primary/30 rotate-6 hover:rotate-0 transition-transform">
                        <HelpCircle className="w-12 h-12" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold outfit-font">The Data Presentation Masterclass</h2>
                        <p className="text-slate-400 text-lg italic">&quot;Research credibility is built on structured transparency.&quot;</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 relative z-10">
                    <div className="space-y-8">
                        <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] space-y-4 hover:bg-white/5 transition-colors">
                            <h4 className="font-bold text-primary flex items-center gap-3 text-2xl">
                                <CheckCircle2 className="w-8 h-8" /> Table vs. Tabular?
                            </h4>
                            <p className="text-slate-200 text-lg">What is the difference between <code>{"\\begin{table}"}</code> and <code>{"\\begin{tabular}"}</code>?</p>
                            <div className="pt-6 border-t border-white/10">
                                <p className="text-base text-slate-300 leading-relaxed font-light">
                                    <span className="font-bold text-white uppercase text-xs block mb-3 tracking-[0.2em]">The Hierarchy:</span>
                                    <code>tabular</code> is the actual grid of data. <code>table</code> is the wrapper (container) that allows you to add a <strong>Caption</strong>, a <strong>Label</strong> for referencing, and controls how it &quot;floats&quot; on the page. You almost always use both together.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] space-y-4 hover:bg-white/5 transition-colors">
                            <h4 className="font-bold text-primary flex items-center gap-3 text-2xl">
                                <CheckCircle2 className="w-8 h-8" /> Labeling Strategy?
                            </h4>
                            <p className="text-slate-200">Why must <code>{"\\label{...}"}</code> come AFTER <code>{"\\caption{...}"}</code>?</p>
                            <div className="pt-6 border-t border-white/10">
                                <p className="text-base text-slate-300 leading-relaxed font-light">
                                    <span className="font-bold text-white uppercase text-xs block mb-3 tracking-[0.2em]">Technical Trap:</span>
                                    In LaTeX, the caption command actually increments the table counter. If you put the label before the caption, it will point to the previous section or table, breaking your <code>{"\\ref{...}"}</code> links!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 flex flex-col justify-center">
                        <div className="bg-primary/5 border border-primary/20 p-10 rounded-[2.5rem] space-y-6">
                            <h5 className="font-extrabold text-primary uppercase text-xs tracking-[0.3em]">The Horizontal Line Rule</h5>
                            <p className="text-lg text-slate-200 italic">
                                &quot;Academic journals generally dislike vertical lines. Professional tables often use <code>\\hline</code> only at the top, bottom, and to separate headers.&quot;
                            </p>
                            <div className="p-8 bg-black/40 rounded-3xl font-mono text-xs border border-white/5 text-primary/80">
                                \\hline <br />
                                Year &amp; Yield \\\\ <br />
                                \\hline <br />
                                2024 &amp; 3.5 \\\\ <br />
                                \\hline
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] space-y-4">
                            <h4 className="font-bold text-primary flex items-center gap-3 text-2xl">
                                <CheckCircle2 className="w-8 h-8" /> Figure Scaling?
                            </h4>
                            <p className="text-lg text-slate-200">How to make an image fit the page width?</p>
                            <div className="pt-6 border-t border-white/10">
                                <p className="text-base text-slate-300 leading-relaxed font-light">
                                    <span className="font-bold text-white uppercase text-xs block mb-3 tracking-[0.2em]">The Golden Script:</span>
                                    Use <code>{"\\includegraphics[width=\\textwidth]{image.png}"}</code>. This ensures the figure never bleeds into the margins, regardless of the journal&apos;s column width.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Activity Track: The Exhibition Hall */}
            <section className="space-y-10 py-10">
                <div className="text-center space-y-2">
                    <h2 className="text-4xl font-bold outfit-font">Skill Level: The Exhibition Hall</h2>
                    <p className="text-muted-foreground italic tracking-widest uppercase text-xs font-bold">From basic grids to publication-grade visuals</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            level: "1. The Framer (Beginner)",
                            analogy: "Setting the Borders",
                            instruction: "Create a simple 2x2 table listing 'Soil Type' and 'PH Level' for two different farm sites.",
                            detailedInstructions: [
                                "Use the \\begin{tabular}{|l|c|} syntax.",
                                "Separate columns with & and lines with \\\\.",
                                "Add vertical lines using | in the alignment string."
                            ],
                            dos: ["Use meaningful column headers.", "Check that you have a \\\\ at the end of each row."],
                            donts: ["Don't crowd too many columns at once.", "Don't forget the \\hline to close the grid."],
                            reward: "Tabular Logic",
                            icon: <Target className="w-8 h-8 text-primary" />,
                            color: "bg-primary/5 border-primary/10"
                        },
                        {
                            level: "2. The Curator (Moderate)",
                            analogy: "Managing Spacing",
                            instruction: "Convert your table to include a caption, a label, and ensure all numeric columns are centered (|c|).",
                            detailedInstructions: [
                                "Wrap the tabular environment inside \\begin{table}[h].",
                                "Add \\caption{Agricultural Data} below the tabular.",
                                "Add \\label{table:agri} for future referencing."
                            ],
                            dos: ["Put labels after captions.", "Use [h] to suggest 'Here' placement."],
                            donts: ["Don't put captions inside the tabular environment.", "Don't forget to include the graphicx package if needed."],
                            reward: "Cross-Referencing",
                            icon: <Rocket className="w-8 h-8 text-blue-500" />,
                            color: "bg-blue-50 border-blue-100"
                        },
                        {
                            level: "3. The Director (Pro)",
                            analogy: "Visual Dominance",
                            instruction: "Insert a figure using 'includegraphics' with width=0.8\\textwidth. Add a caption that includes a citation.",
                            detailedInstructions: [
                                "Use \\begin{figure}[h].",
                                "Use \\centering to align the image.",
                                "Use \\includegraphics[width=0.8\\textwidth]{filename}."
                            ],
                            dos: ["Use relative widths like 0.8\\textwidth.", "Add useful Alt text in the caption."],
                            donts: ["Don't use absolute pixels (e.g., 500px).", "Don't forget \\end{figure}."],
                            reward: "Scaling & Integration",
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
                                    <span>Milestone: {activity.reward}</span>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-primary transition-all shadow-xl shadow-slate-900/10 active:scale-95 font-outfit mt-auto relative z-10">
                                Enter Exhibition Hall
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
