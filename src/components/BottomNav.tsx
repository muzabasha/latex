"use client";

import { useAtom } from "jotai";
import { currentModuleAtom } from "@/lib/store";
import { MODULES } from "@/lib/constants";
import { ChevronRight, ChevronLeft } from "lucide-react";

export function BottomNav() {
    const [currentModule, setCurrentModule] = useAtom(currentModuleAtom);
    const currentIndex = MODULES.findIndex(m => m.id === currentModule);

    if (currentModule === 'home') return null;

    const nextModule = MODULES[currentIndex + 1];
    const prevModule = MODULES[currentIndex - 1];

    return (
        <div className="fixed bottom-0 left-0 w-full p-4 pointer-events-none z-40">
            <div className="container mx-auto flex justify-between items-center max-w-5xl">
                <div className="pointer-events-auto">
                    {prevModule && (
                        <button
                            onClick={() => {
                                setCurrentModule(prevModule.id);
                                window.scrollTo(0, 0);
                            }}
                            className="flex items-center gap-2 bg-background border px-4 py-2 rounded-xl text-sm font-bold shadow-lg hover:bg-muted transition-all"
                        >
                            <ChevronLeft className="w-4 h-4" /> {prevModule.title}
                        </button>
                    )}
                </div>

                <div className="pointer-events-auto">
                    {nextModule && (
                        <button
                            onClick={() => {
                                setCurrentModule(nextModule.id);
                                window.scrollTo(0, 0);
                            }}
                            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-xl hover:scale-105 transition-all animate-glow"
                        >
                            Next: {nextModule.title} <ChevronRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
