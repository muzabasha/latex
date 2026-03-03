"use client";

import { useState } from "react";
import { LatexEditor } from "@/components/LatexEditor";
import { LatexPreview } from "@/components/LatexPreview";
import { motion } from "framer-motion";
import { FileText, Type, Layers, Box, Info } from "lucide-react";

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
            desc: "Tells LaTeX what kind of document you're building (article, book, report)."
        },
        {
            tag: "\\begin{document}",
            icon: <Layers className="w-5 h-5 text-green-500" />,
            title: "The Front Door",
            desc: "Everything after this point will actually appear in your final PDF."
        },
        {
            tag: "The Body",
            icon: <Type className="w-5 h-5 text-orange-500" />,
            title: "The Content",
            desc: "This is where your research lives. Just type naturally!"
        },
        {
            tag: "\\end{document}",
            icon: <Box className="w-5 h-5 text-red-500" />,
            title: "The Exit Sign",
            desc: "Tells the compiler to stop reading. Essential for a clean finish."
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
                        <p className="text-sm text-muted-foreground leading-relaxed italic">{ex.desc}</p>
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
        </div>
    );
}
