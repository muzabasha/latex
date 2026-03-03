"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Divide, Equal, Sigma, Terminal, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface MathSymbol {
    label: string;
    latex: string;
    category: string;
}

export function MathBuilder({ onInsert }: { onInsert: (latex: string) => void }) {
    const [copied, setCopied] = useState(false);

    const symbols: MathSymbol[] = [
        { label: "Fraction", latex: "\\frac{a}{b}", category: "Basic" },
        { label: "Exponent", latex: "x^{n}", category: "Basic" },
        { label: "Subscript", latex: "x_{i}", category: "Basic" },
        { label: "Integral", latex: "\\int_{a}^{b} f(x)dx", category: "Advanced" },
        { label: "Summation", latex: "\\sum_{i=1}^{n} a_i", category: "Advanced" },
        { label: "Square Root", latex: "\\sqrt{x}", category: "Basic" },
        { label: "Greek Alpha", latex: "\\alpha", category: "Greek" },
        { label: "Greek Beta", latex: "\\beta", category: "Greek" },
        { label: "Not Equal", latex: "\\neq", category: "Logic" },
        { label: "Matrix", latex: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}", category: "Advanced" },
    ];

    const handleCopy = (latex: string) => {
        navigator.clipboard.writeText(latex);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        onInsert(latex);
    };

    return (
        <div className="bg-card border rounded-3xl p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Sigma className="w-5 h-5 text-primary" />
                    Math Builder
                </h3>
                {copied && (
                    <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs font-bold text-primary flex items-center gap-1"
                    >
                        <Check className="w-3 h-3" /> Inserted to Clipboard
                    </motion.span>
                )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {symbols.map((sym, i) => (
                    <button
                        key={i}
                        onClick={() => handleCopy(sym.latex)}
                        className="group flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all text-center"
                    >
                        <span className="text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">{sym.label}</span>
                        <code className="text-sm font-mono mt-2 font-bold text-slate-800">{sym.latex}</code>
                    </button>
                ))}
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">
                    <Terminal className="w-3 h-3" /> Pro Tip
                </div>
                <p className="text-slate-300 text-sm italic leading-relaxed">
                    &quot;Wrap math in single <code>$</code> for inline equations, or <code>\\[ \\]</code> for display-style equations on their own lines.&quot;
                </p>
            </div>
        </div>
    );
}
