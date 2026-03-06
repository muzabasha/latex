"use client";

import { useState } from "react";
import { LatexEditor } from "@/components/LatexEditor";
import { LatexPreview } from "@/components/LatexPreview";
import { motion, AnimatePresence } from "framer-motion";
import { Beaker, CheckCircle, Circle, Trophy, Target } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
import { LATEX_COMMAND_DATA } from "@/lib/latex-commands";

export function LabView() {
    // Flatten LATEX_COMMAND_DATA to create tasks for all commands
    const flattenCommandsIntoTasks = () => {
        let idCounter = 1;
        const allTasks: { id: number; text: string; completed: boolean; regex: RegExp; commandName: string; optionName: string, initialCode: string }[] = [];

        Object.values(LATEX_COMMAND_DATA).forEach((moduleCommands) => {
            moduleCommands.forEach((cmd) => {
                // Task for the base command
                allTasks.push({
                    id: idCounter++,
                    text: `Render ${cmd.name}`,
                    completed: false,
                    regex: new RegExp(cmd.name.replace(/\\/g, '\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\{/g, '\\{').replace(/\}/g, '\\}')),
                    commandName: cmd.name,
                    optionName: 'Base Command',
                    initialCode: `\\documentclass{article}\n\\begin{document}\n\n% Write your code here to use ${cmd.name}\n\n\\end{document}`
                });

                // Tasks for each option
                cmd.options.forEach((opt) => {
                    let matchText = opt.name.replace(/\{...\}/g, '').replace(/\.\.\./g, '');
                    if (matchText === "$$") matchText = "\\$";
                    const regexStr = matchText.replace(/\\/g, '\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\*/g, '\\*').replace(/\$/g, '\\$');

                    allTasks.push({
                        id: idCounter++,
                        text: `Apply ${opt.name}`,
                        completed: false,
                        regex: new RegExp(regexStr),
                        commandName: cmd.name,
                        optionName: opt.name,
                        initialCode: `\\documentclass{article}\n\\begin{document}\n\n% Modify the code here to use ${opt.name}\n\n\\end{document}`
                    });
                });
            });
        });
        return allTasks;
    };

    const [tasks, setTasks] = useState(flattenCommandsIntoTasks());
    const [selectedTaskId, setSelectedTaskId] = useState<number>(tasks[0]?.id || 1);
    const [codes, setCodes] = useState<Record<number, string>>({});
    const [isCompiling, setIsCompiling] = useState(false);

    const selectedTask = tasks.find(t => t.id === selectedTaskId) || tasks[0];
    const currentCode = codes[selectedTaskId] ?? selectedTask?.initialCode ?? "";

    const handleCompile = (newCode: string) => {
        setIsCompiling(true);
        setTimeout(() => {
            setCodes(prev => ({ ...prev, [selectedTaskId]: newCode }));
            setIsCompiling(false);

            setTasks(prevTasks => {
                const updatedTasks = prevTasks.map(task => {
                    if (task.id === selectedTaskId) {
                        return { ...task, completed: task.regex.test(newCode) };
                    }
                    return task;
                });

                if (updatedTasks.every(t => t.completed) && !prevTasks.every(t => t.completed) && updatedTasks.length > 0) {
                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
                return updatedTasks;
            });
        }, 800);
    };

    const completedCount = tasks.filter(t => t.completed).length;

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight outfit-font">Interactive Lab</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Compile towards the right. Select an experiment task, write the associated code, and view the live result to pass.
                    </p>
                </div>
                <div className="bg-primary/10 border border-primary/20 px-6 py-3 rounded-2xl flex items-center gap-4">
                    <div className="font-bold text-primary">Progress</div>
                    <div className="text-2xl font-black text-slate-800">{completedCount} <span className="text-sm font-medium text-slate-500">/ {tasks.length}</span></div>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8 h-[750px] md:h-[650px]">
                {/* Task List */}
                <div className="lg:col-span-1 bg-card border rounded-3xl p-5 shadow-sm flex flex-col overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full -mr-16 -mt-16 pointer-events-none" />
                    <h3 className="text-xl font-bold flex items-center gap-3 mb-4 shrink-0 relative z-10">
                        <Beaker className="w-5 h-5 text-primary" />
                        Experiments
                    </h3>

                    <div className="space-y-2 overflow-y-auto pr-2 pb-6 flex-1 custom-scrollbar relative z-10">
                        {tasks.map((task) => (
                            <button
                                key={task.id}
                                onClick={() => setSelectedTaskId(task.id)}
                                className={cn(
                                    "w-full text-left flex items-start gap-3 p-3 border rounded-xl transition-all",
                                    selectedTaskId === task.id ? "border-primary bg-primary/5 shadow-sm scale-[1.02]" : "border-slate-100 hover:bg-slate-50",
                                    task.completed && selectedTaskId !== task.id ? "bg-green-50/50 border-green-100 text-green-900 opacity-70" : ""
                                )}
                            >
                                <div className="mt-0.5 shrink-0">
                                    {task.completed ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Circle className="w-4 h-4 text-slate-300" />}
                                </div>
                                <span className={cn("text-xs font-semibold leading-relaxed", task.completed && "line-through opacity-60")}>
                                    {task.text}
                                </span>
                            </button>
                        ))}
                    </div>

                    {completedCount === tasks.length && tasks.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-primary text-white p-4 rounded-2xl text-center space-y-1 shadow-xl shrink-0 mt-4 relative z-10"
                        >
                            <Trophy className="w-8 h-8 mx-auto mb-1" />
                            <h4 className="font-bold">Lab Completed!</h4>
                        </motion.div>
                    )}
                </div>

                {/* Workspace area (Code + Preview side-by-side) */}
                <div className="lg:col-span-3 flex flex-col gap-6 h-full overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedTask?.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-50/50 rounded-3xl p-6 border shadow-sm flex flex-col h-full"
                        >
                            <div className="space-y-2 shrink-0 mb-6">
                                <h4 className="text-xl font-bold flex items-center gap-2">
                                    <Target className="w-5 h-5 text-primary" />
                                    {selectedTask?.commandName}
                                    {selectedTask?.optionName !== 'Base Command' && (
                                        <span className="text-muted-foreground font-medium text-base ml-2 bg-white px-2 py-0.5 rounded border">
                                            {selectedTask?.optionName}
                                        </span>
                                    )}
                                </h4>
                                <div className="flex items-center gap-3">
                                    <p className="text-sm font-medium text-slate-600 bg-white inline-flex p-2 rounded-lg border shadow-sm">
                                        Goal: {selectedTask?.text}
                                    </p>
                                    {selectedTask?.completed && (
                                        <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                                            <CheckCircle className="w-3.5 h-3.5" /> Passed
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-6 flex-1 min-h-0">
                                <div className="flex flex-col h-full overflow-hidden relative group">
                                    <LatexEditor
                                        initialCode={currentCode}
                                        onCompile={handleCompile}
                                        height="100%"
                                    />
                                </div>
                                <div className="flex flex-col h-full overflow-hidden relative border rounded-xl object-contain shadow-lg bg-white p-2">
                                    <LatexPreview
                                        code={codes[selectedTaskId] ?? selectedTask?.initialCode ?? ""}
                                        isCompiling={isCompiling}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
