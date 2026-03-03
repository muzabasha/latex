"use client";

import { useState } from "react";
import { LatexEditor } from "@/components/LatexEditor";
import { LatexPreview } from "@/components/LatexPreview";
import { motion } from "framer-motion";
import { Beaker, CheckCircle, Circle, ArrowRight, Trophy } from "lucide-react";
import confetti from "canvas-confetti";

export function LabView() {
    const [code, setCode] = useState(`\\documentclass{article}
\\begin{document}
% Type your lab work here
\\end{document}`);
    const [isCompiling, setIsCompiling] = useState(false);
    const [tasks, setTasks] = useState([
        { id: 1, text: "Create a section titled 'Results'", completed: false, regex: /\\section\{Results\}/ },
        { id: 2, text: "Insert an inline equation $E=mc^2$", completed: false, regex: /\$E=mc\^2\$/ },
        { id: 3, text: "Create a bold word using \\textbf", completed: false, regex: /\\textbf\{.*\}/ },
        { id: 4, text: "Add a numbered list using enumerate", completed: false, regex: /\\begin\{enumerate\}/ }
    ]);

    const handleCompile = (newCode: string) => {
        setIsCompiling(true);
        setTimeout(() => {
            setCode(newCode);
            setIsCompiling(false);

            const updatedTasks = tasks.map(task => ({
                ...task,
                completed: task.regex.test(newCode)
            }));

            if (updatedTasks.every(t => t.completed) && !tasks.every(t => t.completed)) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
            setTasks(updatedTasks);
        }, 800);
    };

    return (
        <div className="space-y-12 pb-20">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight outfit-font">Hands-On Lab</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    Putting it all together. Complete the tasks on the left and see the results live on the right.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 h-[750px]">
                {/* Task List */}
                <div className="lg:col-span-1 space-y-6 flex flex-col">
                    <div className="bg-card border rounded-3xl p-8 space-y-6 shadow-sm flex-1">
                        <h3 className="text-2xl font-bold flex items-center gap-3">
                            <Beaker className="w-6 h-6 text-primary" />
                            Experiment Tasks
                        </h3>
                        <div className="space-y-4">
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className={cn(
                                        "flex items-start gap-3 p-4 border rounded-2xl transition-all",
                                        task.completed ? "bg-green-50 border-green-200 text-green-900" : "bg-white border-slate-100"
                                    )}
                                >
                                    <div className="mt-1">
                                        {task.completed ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Circle className="w-5 h-5 text-slate-300" />}
                                    </div>
                                    <span className={cn("text-sm font-medium", task.completed && "line-through opacity-60")}>
                                        {task.text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {tasks.every(t => t.completed) && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-primary text-white p-6 rounded-2xl text-center space-y-2 shadow-xl"
                            >
                                <Trophy className="w-10 h-10 mx-auto mb-2" />
                                <h4 className="text-xl font-bold">Lab Completed!</h4>
                                <p className="text-xs text-primary-foreground">You&apos;ve mastered the basics of LaTeX document construction.</p>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Workspace */}
                <div className="lg:col-span-2 space-y-6 flex flex-col">
                    <div className="h-1/2">
                        <LatexEditor
                            initialCode={code}
                            onCompile={handleCompile}
                            height="320px"
                        />
                    </div>
                    <div className="h-1/2">
                        <LatexPreview
                            code={code}
                            isCompiling={isCompiling}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
import { cn } from "@/lib/utils";
