"use client";

import { useState } from "react";
import { LatexEditor } from "@/components/LatexEditor";
import { LatexPreview } from "@/components/LatexPreview";
import { motion } from "framer-motion";
import { Beaker, CheckCircle, Circle, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
import { LATEX_COMMAND_DATA } from "@/lib/latex-commands";

export function LabView() {
    const [code, setCode] = useState(`\\documentclass{article}
\\begin{document}
% Type your lab work here
\\end{document}`);
    const [isCompiling, setIsCompiling] = useState(false);

    // Flatten LATEX_COMMAND_DATA to create tasks for all commands
    const flattenCommandsIntoTasks = () => {
        let idCounter = 1;
        const allTasks: { id: number; text: string; completed: boolean; regex: RegExp; commandName: string; optionName: string }[] = [];

        Object.values(LATEX_COMMAND_DATA).forEach((moduleCommands) => {
            moduleCommands.forEach((cmd) => {
                // Task for the base command
                allTasks.push({
                    id: idCounter++,
                    text: `Use ${cmd.name}`,
                    completed: false,
                    regex: new RegExp(cmd.name.replace(/\\/g, '\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\{/g, '\\{').replace(/\}/g, '\\}')),
                    commandName: cmd.name,
                    optionName: 'Base Command'
                });

                // Tasks for each option
                cmd.options.forEach((opt) => {
                    let regexStr = '';
                    if (opt.impact.startsWith('[')) {
                        // e.g. [11pt] or [h] - assumes the base command will have this option next to it
                        const baseCmdRegex = cmd.name.replace(/\\/g, '\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\{/g, '\\{').replace(/\}/g, '\\}');
                        const optRegex = opt.impact.replace(/\[/g, '\\[').replace(/\]/g, '\\]');
                        regexStr = baseCmdRegex + optRegex;
                    } else if (opt.impact.startsWith('{')) {
                        // e.g. {amsmath}
                        regexStr = opt.impact.replace(/\{/g, '\\{').replace(/\}/g, '\\}');
                    } else if (opt.impact === '*') {
                        // e.g. \section*
                        const baseCmdRegex = cmd.name.replace(/\\/g, '\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\{/g, '\\{').replace(/\}/g, '\\}');
                        regexStr = baseCmdRegex + '\\*';
                    } else {
                        // other impacts like \title or \textit
                        regexStr = (opt.impact.startsWith('\\') ? opt.impact : '\\\\' + opt.impact).replace(/\\/g, '\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\{/g, '\\{').replace(/\}/g, '\\}');
                    }

                    allTasks.push({
                        id: idCounter++,
                        text: `Use ${cmd.name} option: ${opt.name}`,
                        completed: false,
                        regex: new RegExp(regexStr),
                        commandName: cmd.name,
                        optionName: opt.name
                    });
                });
            });
        });
        return allTasks;
    };

    const [tasks, setTasks] = useState(flattenCommandsIntoTasks());

    const handleCompile = (newCode: string) => {
        setIsCompiling(true);
        setTimeout(() => {
            setCode(newCode);
            setIsCompiling(false);

            const updatedTasks = tasks.map(task => ({
                ...task,
                completed: task.regex.test(newCode)
            }));

            if (updatedTasks.every(t => t.completed) && !tasks.every(t => t.completed) && tasks.length > 0) {
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
