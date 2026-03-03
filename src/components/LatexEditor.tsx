"use client";

import Editor from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Copy, RefreshCw, FileText } from "lucide-react";

interface LatexEditorProps {
    initialCode: string;
    onCompile?: (code: string) => void;
    height?: string;
    readOnly?: boolean;
}

export function LatexEditor({ initialCode, onCompile, height = "400px", readOnly = false }: LatexEditorProps) {
    const [code, setCode] = useState(initialCode);

    useEffect(() => {
        setCode(initialCode);
    }, [initialCode]);

    const handleCompile = () => {
        if (onCompile) onCompile(code);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
    };

    return (
        <div className="flex flex-col border rounded-xl overflow-hidden bg-white dark:bg-slate-950 shadow-lg">
            <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
                <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-bold">research.tex</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className="p-1.5 hover:bg-primary/20 hover:text-primary rounded-md transition-colors text-muted-foreground"
                        title="Copy Code"
                    >
                        <Copy className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setCode(initialCode)}
                        className="p-1.5 hover:bg-primary/20 hover:text-primary rounded-md transition-colors text-muted-foreground"
                        title="Reset Code"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    {!readOnly && (
                        <button
                            onClick={handleCompile}
                            className="px-3 py-1 bg-primary text-white text-sm font-bold rounded-md flex items-center gap-1.5 hover:scale-105 transition-transform"
                        >
                            <Play className="w-3.5 h-3.5" /> Compile
                        </button>
                    )}
                </div>
            </div>
            <Editor
                height={height}
                defaultLanguage="latex"
                theme="vs-dark"
                value={code}
                onChange={(val) => setCode(val || "")}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    readOnly,
                    padding: { top: 16 }
                }}
            />
        </div>
    );
}
