"use client";

import { useAtom } from "jotai";
import { currentModuleAtom, presentationModeAtom } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  HomeView, SessionZeroIntro, SessionOneIntro, SessionOneInstall,
  SessionOneFirstDoc, SessionOneFormatting, SessionOneMath,
  SessionTwoWordVsLatex, SessionTwoBibtex, SessionTwoTablesFigures,
  SessionTwoThesis, SessionThreeMultilingual, SessionFourSpecialized, LabView, CaseStudiesView, MiniProjectView, QuizView, CommandReferenceView, FeedbackView
} from "@/components/views";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [currentModule] = useAtom(currentModuleAtom);
  const [presentationMode] = useAtom(presentationModeAtom);

  const renderView = () => {
    switch (currentModule) {
      case 'home': return <HomeView />;
      case 'session-0-intro': return <SessionZeroIntro />;
      case 'session-1-intro': return <SessionOneIntro />;
      case 'session-1-install': return <SessionOneInstall />;
      case 'session-1-first-doc': return <SessionOneFirstDoc />;
      case 'session-1-formatting': return <SessionOneFormatting />;
      case 'session-1-math': return <SessionOneMath />;
      case 'session-2-word-vs-latex': return <SessionTwoWordVsLatex />;
      case 'session-2-bibtex': return <SessionTwoBibtex />;
      case 'session-2-tables-figures': return <SessionTwoTablesFigures />;
      case 'session-2-thesis': return <SessionTwoThesis />;
      case 'session-3-multilingual': return <SessionThreeMultilingual />;
      case 'session-4-specialized': return <SessionFourSpecialized />;
      case 'lab': return <LabView />;
      case 'case-studies': return <CaseStudiesView />;
      case 'mini-project': return <MiniProjectView />;
      case 'quiz': return <QuizView />;
      case 'command-ref': return <CommandReferenceView />;
      case 'feedback': return <FeedbackView />;
      default: return <HomeView />;
    }
  };

  return (
    <div className={cn(
      "min-h-[calc(100-4rem)] transition-all ease-in-out duration-300 w-full",
      presentationMode ? "presentation-mode max-w-none px-12 pb-20 pt-10" : "lg:pl-64"
    )}>
      <div className={cn(
        "mx-auto w-full transition-all",
        presentationMode ? "max-w-none" : "max-w-7xl px-4 py-8 lg:px-12"
      )}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentModule}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
