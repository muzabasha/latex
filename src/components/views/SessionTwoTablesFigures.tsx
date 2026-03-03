"use client";

import { useState } from "react";
import { LatexEditor } from "@/components/LatexEditor";
import { motion, AnimatePresence } from "framer-motion";
import { Table, Image as ImageIcon, Layout, Grid, Info, Sparkles, Plus, Trash2 } from "lucide-react";
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
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-primary" />
                            The &quot;Float&quot; Secret
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            LaTeX treats tables and figures as &quot;Floats&quot;. You don&apos;t tell LaTeX WHERE to put them exactly; you give it a suggestion (like <code>{"[h]"}</code> for here) and it does the complex math to find the perfect page placement.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-2xl shadow-sm border space-y-2">
                                <p className="font-bold text-primary text-xs uppercase">The Tabular Environment</p>
                                <p className="text-[10px] text-muted-foreground italic">For precise grid control.</p>
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-sm border space-y-2">
                                <p className="font-bold text-primary text-xs uppercase">The Graphicx Package</p>
                                <p className="text-[10px] text-muted-foreground italic">For inserting JPG/PNG/PDF.</p>
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
        </div>
    );
}
