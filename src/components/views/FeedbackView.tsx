"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, MessageSquare, CheckCircle, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

export function FeedbackView() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [category, setCategory] = useState("general");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const categories = [
        { id: "general", label: "General Experience" },
        { id: "content", label: "Course Content" },
        { id: "installation", label: "Installation Guide" },
        { id: "exercises", label: "Interactive Exercises" },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 space-y-12">
            <div className="text-center space-y-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex p-3 bg-primary/10 rounded-2xl text-primary"
                >
                    <MessageSquare className="w-8 h-8" />
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight outfit-font italic">
                    Share Your <span className="text-primary italic">Workshop Experience</span>
                </h1>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                    Your feedback helps us refine the LaTeX Research Workshop for future scholars.
                    Thank you for your valuable time!
                </p>
            </div>

            <AnimatePresence mode="wait">
                {!isSubmitted ? (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onSubmit={handleSubmit}
                        className="bg-white border-2 border-slate-100 rounded-[3rem] p-8 md:p-16 shadow-2xl space-y-10 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />

                        {/* Rating Section */}
                        <div className="space-y-6 text-center relative z-10">
                            <label className="text-xl font-bold block">Overall Rating</label>
                            <div className="flex justify-center gap-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                        className="transition-all transform hover:scale-125"
                                    >
                                        <Star
                                            className={cn(
                                                "w-12 h-12 transition-colors",
                                                (hover || rating) >= star
                                                    ? "fill-amber-400 text-amber-400"
                                                    : "text-slate-200"
                                            )}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category Selection */}
                        <div className="space-y-4 relative z-10">
                            <label className="text-sm font-bold uppercase tracking-widest text-slate-400">What did you like most?</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setCategory(cat.id)}
                                        className={cn(
                                            "p-4 rounded-2xl border-2 text-sm font-bold transition-all",
                                            category === cat.id
                                                ? "border-primary bg-primary/5 text-primary"
                                                : "border-slate-100 hover:border-slate-200 text-slate-500"
                                        )}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Comment Area */}
                        <div className="space-y-4 relative z-10">
                            <label className="text-sm font-bold uppercase tracking-widest text-slate-400 text-slate-400">Additional Comments</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="What was your favorite part? How can we improve?"
                                className="w-full min-h-[150px] p-6 rounded-3xl border-2 border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-slate-700 bg-slate-50/50"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center relative z-10 pt-4">
                            <button
                                type="submit"
                                disabled={rating === 0}
                                className={cn(
                                    "flex items-center gap-3 px-12 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl group",
                                    rating > 0
                                        ? "bg-primary text-white hover:scale-105 active:scale-95 shadow-primary/20"
                                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                                )}
                            >
                                Submit Feedback
                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </motion.form>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 text-white rounded-[4rem] p-16 md:p-24 text-center space-y-8 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent pointer-events-none" />
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 12 }}
                            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/20"
                        >
                            <CheckCircle className="w-12 h-12 text-white" />
                        </motion.div>
                        <div className="space-y-4">
                            <h2 className="text-5xl font-extrabold outfit-font">Thank You!</h2>
                            <p className="text-slate-400 text-xl max-w-md mx-auto">
                                Your feedback has been successfully submitted. We appreciate your contribution to the LaTeX community!
                            </p>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-primary font-bold animate-pulse">
                            <Heart className="w-5 h-5 fill-primary" />
                            <span>Keep Learning, Keep Publishing</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
