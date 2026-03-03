"use client";

import { useMemo, useState } from "react";
import "katex/dist/katex.min.css";
import katex from "katex";
import { Loader2, Monitor, Download, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LatexPreviewProps {
    code: string;
    isCompiling: boolean;
}

export function LatexPreview({ code, isCompiling }: LatexPreviewProps) {
    const rendered = useMemo(() => {
        // Basic structural parsing
        const lines = code.split("\n");
        const result: React.ReactNode[] = [];
        let isDocument = false;

        lines.forEach((line, idx) => {
            if (line.includes("\\begin{document}")) { isDocument = true; return; }
            if (line.includes("\\end{document}")) { isDocument = false; return; }
            if (line.includes("\\documentclass")) return;
            if (line.includes("\\title")) return;
            if (line.includes("\\author")) return;
            if (line.includes("\\date")) return;

            // Sectioning
            if (line.match(/\\section\{(.*)\}/)) {
                result.push(<h2 key={idx} className="text-3xl font-extrabold mt-8 mb-4 border-b pb-2 text-slate-800 font-serif">{line.match(/\\section\{(.*)\}/)?.[1]}</h2>);
                return;
            }
            if (line.match(/\\subsection\{(.*)\}/)) {
                result.push(<h3 key={idx} className="text-2xl font-bold mt-6 mb-3 text-slate-800 italic font-serif">{line.match(/\\subsection\{(.*)\}/)?.[1]}</h3>);
                return;
            }

            // Math Parsing
            if (line.includes("$$")) {
                const math = line.replace(/^\s*\$\$\s*|\s*\$\$\s*$/g, "");
                try {
                    const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
                    result.push(<div key={idx} className="my-6 bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300 overflow-x-auto" dangerouslySetInnerHTML={{ __html: html }} />);
                } catch (e) {
                    result.push(<p key={idx} className="text-red-500 font-mono text-sm py-2">Math Error: {line}</p>);
                }
                return;
            }

            if (line.includes("$")) {
                const parts = line.split("$");
                const lineNodes: React.ReactNode[] = [];
                parts.forEach((part, pIdx) => {
                    if (pIdx % 2 === 1) {
                        try {
                            const html = katex.renderToString(part, { displayMode: false, throwOnError: false });
                            lineNodes.push(<span key={`${idx}-${pIdx}`} dangerouslySetInnerHTML={{ __html: html }} />);
                        } catch (e) {
                            lineNodes.push(<span key={`${idx}-${pIdx}`} className="text-red-500">{part}</span>);
                        }
                    } else {
                        lineNodes.push(<span key={`${idx}-${pIdx}`}>{part}</span>);
                    }
                });
                result.push(<p key={idx} className="my-3 leading-relaxed text-slate-700 font-serif">{lineNodes}</p>);
                return;
            }

            // Text Formatting
            const formattedLine = line
                .replace(/\\textbf\{(.*)\}/g, "<strong>$1</strong>")
                .replace(/\\textit\{(.*)\}/g, "<em>$1</em>");

            if (line.trim() === "") {
                result.push(<div key={idx} className="h-4" />);
            } else {
                result.push(<p key={idx} className="my-3 leading-relaxed text-slate-700 font-serif" dangerouslySetInnerHTML={{ __html: formattedLine }} />);
            }
        });

        return result;
    }, [code]);

    return (
        <div className="relative flex flex-col h-full bg-slate-200 dark:bg-slate-900 border rounded-xl overflow-hidden shadow-inner min-h-[400px]">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b">
                <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">PDF Output Preview</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-700 border rounded-md text-xs font-semibold hover:bg-slate-50 transition-colors">
                        <Download className="w-3 h-3" /> Download PDF
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-auto bg-white p-12 m-8 shadow-2xl rounded-sm border relative">
                <AnimatePresence>
                    {isCompiling && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center flex-col gap-3"
                        >
                            <Loader2 className="w-10 h-10 animate-spin text-primary" />
                            <p className="text-sm font-bold animate-pulse text-primary tracking-widest uppercase">Compiling Boilerplate...</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <article className="prose prose-slate max-w-none font-serif text-lg">
                    {rendered.length > 0 ? rendered : (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-20 opacity-50 space-y-4">
                            <Info className="w-12 h-12" />
                            <p className="font-sans italic">Type some LaTeX code and click Compile to see the magic!</p>
                        </div>
                    )}
                </article>
            </div>
        </div>
    );
}
