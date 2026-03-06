"use client";

import { useAtom } from "jotai";
import { completedModulesAtom } from "@/lib/store";
import { motion } from "framer-motion";
import { Trophy, Flame, Star, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { MODULES } from "@/lib/constants";

const LEVELS = [
    { name: "Seedling", minXP: 0, icon: "🌱", color: "text-green-500" },
    { name: "Sprout", minXP: 3, icon: "🌿", color: "text-emerald-500" },
    { name: "Sapling", minXP: 6, icon: "🌳", color: "text-teal-500" },
    { name: "Harvester", minXP: 9, icon: "🌾", color: "text-amber-500" },
    { name: "LaTeX Master", minXP: 12, icon: "🏆", color: "text-yellow-500" },
];

export function XPTracker() {
    const [completed] = useAtom(completedModulesAtom);
    const xp = completed.length;
    const totalModules = MODULES.filter(m => m.id !== "home" && m.id !== "feedback").length;
    const currentLevel = [...LEVELS].reverse().find(l => xp >= l.minXP) || LEVELS[0];
    const nextLevel = LEVELS.find(l => l.minXP > xp);
    const progress = nextLevel ? ((xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100 : 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-5 text-white flex items-center gap-6 shadow-xl"
        >
            <div className="text-3xl">{currentLevel.icon}</div>
            <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                    <span className={cn("text-sm font-bold", currentLevel.color)}>{currentLevel.name}</span>
                    <span className="text-xs text-slate-400">{xp}/{totalModules} modules</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                </div>
                {nextLevel && (
                    <p className="text-[10px] text-slate-500">
                        {nextLevel.minXP - xp} more to reach {nextLevel.icon} {nextLevel.name}
                    </p>
                )}
            </div>
            <div className="flex items-center gap-1 bg-amber-500/20 px-3 py-1.5 rounded-full">
                <Flame className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-amber-300">{xp} XP</span>
            </div>
        </motion.div>
    );
}
