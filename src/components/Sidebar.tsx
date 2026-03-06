"use client";

import { useAtom } from "jotai";
import { currentModuleAtom, presentationModeAtom } from "@/lib/store";
import { MODULES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Sidebar() {
    const [currentModule, setCurrentModule] = useAtom(currentModuleAtom);
    const [presentationMode] = useAtom(presentationModeAtom);

    if (presentationMode) return null;

    return (
        <aside className="fixed left-0 top-16 bottom-0 w-64 overflow-y-auto border-r bg-background/50 backdrop-blur-xl hidden lg:block z-40 pb-20 custom-scrollbar">
            <div className="p-4 space-y-1">
                <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4 px-3 mt-2">
                    Program Modules
                </div>
                {MODULES.map((mod) => (
                    <button
                        key={mod.id}
                        onClick={() => {
                            setCurrentModule(mod.id);
                            window.scrollTo(0, 0);
                        }}
                        className={cn(
                            "w-full text-left px-4 py-3 text-sm font-semibold rounded-xl transition-all relative overflow-hidden group flex items-center justify-between",
                            currentModule === mod.id
                                ? "bg-primary shadow-md text-primary-foreground font-bold"
                                : "text-muted-foreground hover:bg-slate-100 hover:text-slate-900"
                        )}
                    >
                        <span className="relative z-10">{mod.title}</span>
                        {currentModule === mod.id && (
                            <motion.div
                                layoutId="sidebar-active"
                                className="absolute inset-0 bg-primary z-0"
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 shrink-0">
                            {currentModule === mod.id && (
                                <div className="w-1.5 h-1.5 rounded-full bg-white ml-2 animate-pulse" />
                            )}
                        </span>
                    </button>
                ))}
            </div>
        </aside>
    );
}
