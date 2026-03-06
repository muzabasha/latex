"use client";

import Link from "next/link";
import { useAtom } from "jotai";
import { currentModuleAtom, presentationModeAtom, instructorModeAtom } from "@/lib/store";
import { MODULES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
    Home, BookOpen, PenTool, Layout, FileText,
    Settings, Monitor, Book, CheckCircle, GraduationCap,
    Sun, Moon
} from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
    const [currentModule, setCurrentModule] = useAtom(currentModuleAtom);
    const [presentationMode, setPresentationMode] = useAtom(presentationModeAtom);
    const [instructorMode, setInstructorMode] = useAtom(instructorModeAtom);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const isDark = document.documentElement.classList.contains("dark");
        setTheme(isDark ? "dark" : "light");
    }, []);

    const toggleTheme = () => {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        if (next === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4 md:gap-6">
                    <Link
                        href="/"
                        onClick={() => setCurrentModule('home')}
                        className="flex items-center gap-2 font-bold text-xl text-primary"
                    >
                        <GraduationCap className="w-8 h-8" />
                        <span className="hidden md:inline">LaTeX for Research</span>
                    </Link>
                    <a
                        href="https://scholar-sparkle-web.lovable.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors md:border-l md:pl-6 border-border"
                    >
                        Resource person
                    </a>
                </div>

                <div className="hidden lg:flex flex-1 mx-4 items-center gap-1 overflow-x-auto whitespace-nowrap px-2 py-1 relative">
                    {/* Horizontal tabs removed to use sidebar navigation */}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setPresentationMode(!presentationMode)}
                        className={cn(
                            "p-2 rounded-full transition-colors",
                            presentationMode ? "bg-orange-500 text-white" : "hover:bg-muted"
                        )}
                        title="Presentation Mode"
                    >
                        <Monitor className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setInstructorMode(!instructorMode)}
                        className={cn(
                            "p-2 rounded-full transition-colors",
                            instructorMode ? "bg-blue-500 text-white" : "hover:bg-muted"
                        )}
                        title="Instructor Mode"
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                    >
                        {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </nav>
    );
}
