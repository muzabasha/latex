"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Hash, ChevronDown, ChevronUp, CheckCircle, Circle,
    BookOpen, Zap, Monitor, ArrowRight, ArrowLeft,
    Lightbulb, Eye, FileText, Type, Sigma, Table,
    Image as ImageIcon, FolderTree, Quote, Settings,
    Clock, Play, Pause, RotateCcw, AlertTriangle, Timer, Bell,
    Copy, Check, Code2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandOption {
    option: string;
    impact: string;
    pdfImpact: string;
}

interface Command {
    id: number;
    command: string;
    syntax: string;
    description: string;
    tip: string;
    options: CommandOption[];
}

interface Module {
    id: string;
    number: number;
    title: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    borderColor: string;
    commands: Command[];
    sampleTex: string;
}

const COMMAND_MODULES: Module[] = [
    {
        id: "mod-1",
        number: 1,
        title: "What is LaTeX?",
        icon: <BookOpen className="w-5 h-5" />,
        color: "text-blue-700",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        sampleTex: `% ============================================
% MODULE 1: What is LaTeX? — Sample .tex
% Covers: \\documentclass, \\usepackage
% ============================================

% =============================================
% COMMAND 1: \\documentclass[options]{class}
% Purpose : Defines the document type. MUST be
%           the very first line of every .tex file.
% =============================================
% CLASS OPTIONS (choose one):
%   {article}    — short papers, research articles
%                  PDF: sections start at \\section, no chapters
%   {report}     — thesis, long reports with chapters
%                  PDF: \\maketitle creates separate title page
%   {book}       — published books with parts
%                  PDF: adds \\part, \\frontmatter, two-sided
%   {beamer}     — presentation slides
%                  PDF: each \\frame = one slide, no margins
%
% OPTIONAL PARAMETERS (comma-separated in []):
%   [10pt]       — small base font (default)
%                  PDF: more text per page, compact layout
%   [11pt]       — medium base font
%                  PDF: balanced readability
%   [12pt]       — large base font (recommended for thesis)
%                  PDF: all text scales up, ~20% more pages
%   [a4paper]    — A4 page size (210 x 297 mm)
%                  PDF: without this, defaults to US Letter
%   [letterpaper]— US Letter (8.5 x 11 in)
%                  PDF: standard for US journals
%   [twocolumn]  — two-column layout
%                  PDF: entire document splits into two columns
%   [landscape]  — landscape orientation
%                  PDF: page rotates to wider-than-tall
%   [draft]      — draft mode
%                  PDF: shows overfull boxes, images as frames
%   [oneside]    — single-sided printing
%                  PDF: uniform margins on all pages
%   [twoside]    — double-sided printing (default for book)
%                  PDF: alternating inner/outer margins
% =============================================
\\documentclass[12pt, a4paper]{article}

% =============================================
% COMMAND 2: \\usepackage[options]{package}
% Purpose : Imports external packages for extra
%           features. Place in preamble ONLY
%           (before \\begin{document}).
% Rule    : Load hyperref LAST to avoid conflicts.
% =============================================
% PACKAGE OPTIONS:
%   {amsmath}    — advanced math environments
%                  PDF: enables align, gather, cases, better spacing
%   {graphicx}   — image support
%                  PDF: enables \\includegraphics with width/scale/angle
%   {geometry}   — margin control
%                  PDF: precise margins via \\geometry{margin=1in}
%     [margin=1in]   — 1 inch all sides
%     [top=2cm, bottom=2cm, left=3cm, right=2cm] — custom
%   {xcolor}     — color support
%                  PDF: enables \\textcolor{red}{text}, \\colorbox
%     [dvipsnames]   — extra color names (e.g., ForestGreen)
%     [table]        — enables \\rowcolor for table rows
%   {float}      — float placement control
%                  PDF: enables [H] for exact placement of tables/figures
%   {hyperref}   — clickable hyperlinks (LOAD LAST!)
%                  PDF: \\ref, \\cite, TOC entries become clickable
%     [colorlinks=true]  — colored links instead of boxes
%     [linkcolor=blue]   — internal link color
%     [citecolor=green]  — citation link color
%     [urlcolor=magenta] — URL link color
%   {natbib}     — author-year citations
%                  PDF: enables \\citep, \\citet styles
%   {booktabs}   — professional table lines
%                  PDF: \\toprule, \\midrule, \\bottomrule
%   {caption}    — caption customization
%                  PDF: font, size, label format for captions
%   {setspace}   — line spacing control
%                  PDF: \\doublespacing, \\onehalfspacing
% =============================================
\\usepackage{amsmath}                        % Math: align, gather
\\usepackage{graphicx}                       % Images: \\includegraphics
\\usepackage[margin=1in]{geometry}           % Margins: 1 inch all sides
\\usepackage[dvipsnames, table]{xcolor}      % Colors + table row colors
\\usepackage{float}                          % [H] exact placement
\\usepackage[colorlinks=true,
            linkcolor=blue,
            citecolor=green,
            urlcolor=magenta]{hyperref}      % Clickable links (LAST!)

\\begin{document}

This document demonstrates \\texttt{\\textbackslash documentclass}
and \\texttt{\\textbackslash usepackage} — the two foundation
commands of every LaTeX document.

% TIP: Try changing [12pt] to [11pt] and recompile
%      to see the font size difference in the PDF.
% TIP: Try adding [twocolumn] to \\documentclass
%      to see two-column layout.

\\end{document}`,
        commands: [
            {
                id: 1,
                command: "\\documentclass{...}",
                syntax: "\\documentclass[12pt, a4paper]{article}",
                description: "Defines the type of document. Must be the very first line.",
                tip: "Choose article for papers, report for thesis, book for textbooks, beamer for slides.",
                options: [
                    { option: "{article}", impact: "Short documents, no chapters", pdfImpact: "Sections start at \\section. No title page by default." },
                    { option: "{report}", impact: "Long documents with chapters", pdfImpact: "Adds \\chapter support. \\maketitle creates a separate title page." },
                    { option: "{book}", impact: "Published books", pdfImpact: "Adds \\part, \\frontmatter, \\mainmatter. Two-sided by default." },
                    { option: "{beamer}", impact: "Presentation slides", pdfImpact: "Each frame = one slide. No page numbers or margins." },
                    { option: "[10pt] / [11pt] / [12pt]", impact: "Base font size", pdfImpact: "All text scales proportionally. 12pt increases page count ~20%." },
                    { option: "[a4paper]", impact: "A4 page dimensions", pdfImpact: "210×297mm. Without this, defaults to US Letter." },
                    { option: "[twocolumn]", impact: "Two-column layout", pdfImpact: "Entire document splits into two columns." },
                    { option: "[landscape]", impact: "Landscape orientation", pdfImpact: "Page rotates to wider-than-tall format." },
                ]
            },
            {
                id: 2,
                command: "\\usepackage{...}",
                syntax: "\\usepackage[options]{package}",
                description: "Imports external packages for extra features. Place in preamble only.",
                tip: "Load hyperref LAST. Don't load unused packages. Order matters for conflicts.",
                options: [
                    { option: "{amsmath}", impact: "Advanced math environments", pdfImpact: "Enables align, gather, cases. Better equation spacing." },
                    { option: "{graphicx}", impact: "Image support", pdfImpact: "Enables \\includegraphics with width, scale, angle options." },
                    { option: "{hyperref}", impact: "Clickable links", pdfImpact: "All \\ref, \\cite, TOC entries become clickable in PDF." },
                    { option: "{geometry}", impact: "Margin control", pdfImpact: "Precise margin settings: \\geometry{margin=1in}." },
                    { option: "{xcolor}", impact: "Color support", pdfImpact: "Enables \\textcolor, \\colorbox for colored text." },
                    { option: "{float}", impact: "Float placement", pdfImpact: "Enables [H] for exact 'here' placement of tables/figures." },
                ]
            },
        ]
    },
    {
        id: "mod-3",
        number: 3,
        title: "Your First Document",
        icon: <FileText className="w-5 h-5" />,
        color: "text-green-700",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        sampleTex: `% ============================================
% MODULE 3: Your First Document — Sample .tex
% Covers: \\begin{document}, \\title, \\author,
%         \\date, \\maketitle, \\begin{abstract}
% ============================================

\\documentclass[12pt, a4paper]{article}
\\usepackage[margin=1in]{geometry}
\\usepackage{hyperref}

% =============================================
% COMMAND 4: \\title{text}
% Purpose : Sets the document title in preamble.
%           Title only appears when \\maketitle
%           is called inside \\begin{document}.
% =============================================
% OPTIONS:
%   \\title{Short Title}
%     — single-line title
%     — PDF: centered, bold, large font at top
%   \\title{Main Title \\\\ Subtitle}
%     — two-line title using \\\\ for line break
%     — PDF: creates a subtitle effect
%   \\title{Very Long Title That Wraps}
%     — auto-wraps if too long
%     — PDF: LaTeX handles line breaking
% =============================================
\\title{Impact of Organic Manure on Soil Health \\\\
       A Field Study in Semi-Arid Regions}

% =============================================
% COMMAND 5: \\author{name(s)}
% Purpose : Sets author name(s) in preamble.
% =============================================
% OPTIONS:
%   \\author{Name}
%     — single author
%     — PDF: centered below title
%   \\author{A \\and B}
%     — multiple authors side by side
%     — PDF: names displayed with spacing between
%   \\author{Name\\thanks{Affiliation}}
%     — author with footnote affiliation
%     — PDF: superscript number links to footnote
%   \\author{A\\thanks{Dept1} \\and B\\thanks{Dept2}}
%     — multiple authors with different affiliations
%     — PDF: each gets own footnote marker
% =============================================
\\author{Dr. Priya Sharma\\thanks{Dept. of Soil Science, UAS Dharwad}
  \\and Dr. Ramesh Kumar\\thanks{ICAR-IARI, New Delhi}}

% =============================================
% COMMAND 6: \\date{text}
% Purpose : Sets the date on the title page.
% =============================================
% OPTIONS:
%   \\date{March 2026}
%     — custom fixed date
%     — PDF: shows exactly "March 2026"
%   \\date{\\today}
%     — automatic compilation date
%     — PDF: inserts current date (e.g., March 10, 2026)
%   \\date{}
%     — empty = no date shown
%     — PDF: date line completely suppressed
%   (omit \\date entirely)
%     — defaults to \\today automatically
% =============================================
\\date{\\today}

% =============================================
% COMMAND 3: \\begin{document} ... \\end{document}
% Purpose : Opens the document body. Everything
%           visible in the PDF goes between these.
% =============================================
% RULES:
%   - Everything BEFORE \\begin{document} = preamble
%     (only \\usepackage, \\title, settings allowed)
%   - Everything AFTER \\end{document} = ignored
%   - Text before \\begin{document} → compile error
%   - Missing \\end{document} → "File ended while
%     scanning" error
% =============================================
\\begin{document}

% =============================================
% COMMAND 7: \\maketitle
% Purpose : Renders the title block using \\title,
%           \\author, and \\date defined above.
%           Must be INSIDE \\begin{document}.
% =============================================
% BEHAVIOR BY CLASS:
%   In article class:
%     — PDF: title, author, date at top of page 1
%     — content continues below on same page
%   In report class:
%     — PDF: dedicated title page (page 1)
%     — content starts on page 2
%   In book class:
%     — PDF: separate title page, right-hand side
% =============================================
\\maketitle

% =============================================
% COMMAND 8: \\begin{abstract} ... \\end{abstract}
% Purpose : Creates the abstract section.
%           Place immediately after \\maketitle.
% =============================================
% BEHAVIOR BY CLASS:
%   In article class:
%     — PDF: indented paragraph with bold "Abstract"
%     — appears on page 1 below title
%   In report class:
%     — PDF: abstract on its own separate page
%   In KOMA-Script (scrartcl):
%     — PDF: can be customized with options
% TIP: Keep abstract to 150-300 words for journals.
% =============================================
\\begin{abstract}
This study evaluates the effect of farmyard manure (FYM),
vermicompost, and green manure on soil organic carbon,
microbial biomass, and crop yield of rice
(\\textit{Oryza sativa}) over three consecutive kharif
seasons (2023--2025). Results indicate a 23\\% increase
in soil organic carbon with integrated organic amendments.
\\end{abstract}

\\section{Introduction}
Soil health is fundamental to sustainable agriculture\\ldots

\\end{document}`,
        commands: [
            {
                id: 3,
                command: "\\begin{document}",
                syntax: "\\begin{document} ... \\end{document}",
                description: "Opens the document body. Everything visible in the PDF goes between these.",
                tip: "Anything before \\begin{document} is the preamble (settings only). Anything after \\end{document} is ignored.",
                options: [
                    { option: "Text before \\begin{document}", impact: "Compile error", pdfImpact: "Only \\usepackage and settings go in the preamble." },
                    { option: "Missing \\end{document}", impact: "Compile error", pdfImpact: "'File ended while scanning' — always close what you open." },
                ]
            },
            {
                id: 4,
                command: "\\title{...}",
                syntax: "\\title{Your Research Title}",
                description: "Sets the document title. Place in preamble.",
                tip: "Use \\\\\\\\ for line breaks in long titles. Title only appears when \\maketitle is called.",
                options: [
                    { option: "\\title{Short Title}", impact: "Single-line title", pdfImpact: "Centered, bold, large font at top of page." },
                    { option: "\\title{Long \\\\\\\\ Subtitle}", impact: "Two-line title", pdfImpact: "Line break creates a subtitle effect." },
                ]
            },
            {
                id: 5,
                command: "\\author{...}",
                syntax: "\\author{Your Name}",
                description: "Sets the author name(s). Place in preamble.",
                tip: "Use \\and for multiple authors. Use \\thanks{} for affiliations as footnotes.",
                options: [
                    { option: "\\author{Name}", impact: "Single author", pdfImpact: "Centered below title." },
                    { option: "\\author{A \\and B}", impact: "Multiple authors", pdfImpact: "Authors displayed side by side." },
                    { option: "\\author{Name\\thanks{Dept}}", impact: "With affiliation", pdfImpact: "Footnote with department/institution." },
                ]
            },
            {
                id: 6,
                command: "\\date{...}",
                syntax: "\\date{\\today}",
                description: "Sets the date on the title page.",
                tip: "\\date{} (empty) hides the date. Omitting \\date defaults to today.",
                options: [
                    { option: "\\date{March 2026}", impact: "Custom date", pdfImpact: "Shows exact date you specify." },
                    { option: "\\date{\\today}", impact: "Auto date", pdfImpact: "Inserts compilation date automatically." },
                    { option: "\\date{}", impact: "No date", pdfImpact: "Date line is completely suppressed." },
                ]
            },
            {
                id: 7,
                command: "\\maketitle",
                syntax: "\\maketitle",
                description: "Renders the title block. Must be inside \\begin{document}.",
                tip: "In article class: title at top of page 1. In report/book: separate title page.",
                options: [
                    { option: "In article class", impact: "Inline title", pdfImpact: "Title, author, date at top of page 1 with content below." },
                    { option: "In report class", impact: "Separate page", pdfImpact: "Dedicated title page — content starts on page 2." },
                ]
            },
            {
                id: 8,
                command: "\\begin{abstract}",
                syntax: "\\begin{abstract}...\\end{abstract}",
                description: "Creates the abstract section. Place after \\maketitle.",
                tip: "Keep to 150-300 words. In report class, abstract gets its own page.",
                options: [
                    { option: "In article class", impact: "Indented block", pdfImpact: "Indented paragraph with 'Abstract' heading." },
                    { option: "In report class", impact: "Separate page", pdfImpact: "Abstract on its own page." },
                ]
            },
        ]
    },
    {
        id: "mod-4",
        number: 4,
        title: "Sections & Formatting",
        icon: <Type className="w-5 h-5" />,
        color: "text-purple-700",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        sampleTex: `% ============================================
% MODULE 4: Sections & Formatting — Sample .tex
% Covers: \\section, \\subsection, \\subsubsection,
%   \\textbf, \\textit, \\underline, \\texttt,
%   \\begin{itemize}, \\begin{enumerate}, \\item
% ============================================

\\documentclass[12pt, a4paper]{article}
\\usepackage[margin=1in]{geometry}
\\usepackage[normalem]{ulem}  % For \\uline (better underline)

\\begin{document}

% =============================================
% COMMAND 9: \\section{title}
% Purpose : Creates a numbered main heading.
%           Auto-added to Table of Contents.
% =============================================
% OPTIONS:
%   \\section{Title}
%     — numbered heading: "1 Introduction"
%     — PDF: bold, large font, auto-numbered
%   \\section*{Title}
%     — unnumbered heading (no number, not in TOC)
%     — PDF: same style but no "1" prefix
%   \\section[Short]{Very Long Section Title}
%     — short title for TOC and page headers
%     — PDF: full title in body, short in TOC
% =============================================
\\section{Introduction}
This section introduces the research problem.

\\section*{Acknowledgements}
% Unnumbered — not in Table of Contents
The authors thank ICAR for funding.

\\section[Study Area]{Detailed Description of the Study Area}
% "Study Area" appears in TOC; full title in document

% =============================================
% COMMAND 10: \\subsection{title}
% Purpose : Secondary heading (e.g., 1.1, 1.2).
% =============================================
% OPTIONS:
%   \\subsection{Title}
%     — numbered: "1.1 Study Area"
%     — PDF: slightly smaller bold than \\section
%   \\subsection*{Title}
%     — unnumbered, not in TOC
% =============================================
\\subsection{Location and Climate}

% =============================================
% COMMAND 11: \\subsubsection{title}
% Purpose : Tertiary heading (e.g., 1.1.1).
%           Deepest commonly numbered level.
% =============================================
% OPTIONS:
%   \\subsubsection{Title}
%     — numbered: "1.1.1 Soil Sampling"
%     — PDF: smaller font than \\subsection
%   \\subsubsection*{Title}
%     — unnumbered
% TIP: Use sparingly. Too many levels = confusing.
% =============================================
\\subsubsection{Soil Sampling Protocol}

The experiment was conducted at the Agricultural
Research Station, Raichur, Karnataka.

% =============================================
% COMMAND 12: \\textbf{text}
% Purpose : Makes text bold.
% =============================================
% OPTIONS:
%   \\textbf{text}
%     — bold weight
%     — PDF: heavier strokes, stands out
%   \\textbf{\\textit{text}}
%     — bold + italic combined
%     — PDF: bold-italic formatting
%   {\\bfseries paragraph text here}
%     — declaration form (entire group bold)
%     — PDF: everything in braces becomes bold
% TIP: Don't overuse — if everything is bold,
%      nothing stands out.
% =============================================
The \\textbf{key finding} was a \\textbf{\\textit{significant}}
increase in grain yield.

{\\bfseries This entire paragraph is bold using
the declaration form.}

% =============================================
% COMMAND 13: \\textit{text}
% Purpose : Makes text italic. Standard for
%           scientific names and emphasis.
% =============================================
% OPTIONS:
%   \\textit{text}
%     — italic style
%     — PDF: slanted typeface
%   \\emph{text}
%     — smart emphasis (context-aware)
%     — PDF: italic in normal text;
%            upright in already-italic context
%   {\\itshape paragraph}
%     — declaration form
% TIP: Required for genus/species names,
%      book titles, foreign words.
% =============================================
The crop \\textit{Oryza sativa} (rice) was transplanted.
In italic context: \\textit{this is \\emph{toggled} back}.

% =============================================
% COMMAND 14: \\underline{text}
% Purpose : Underlines text.
% =============================================
% OPTIONS:
%   \\underline{text}
%     — simple underline
%     — PDF: line below text, does NOT wrap across lines
%   \\uline{text}  (requires ulem package)
%     — better underline
%     — PDF: properly wraps across line breaks
% TIP: Rarely used in academic papers.
%      Prefer \\textbf or \\textit instead.
% =============================================
This is \\underline{underlined} and this is
\\uline{a longer underlined phrase that can wrap
across multiple lines properly}.

% =============================================
% COMMAND 15: \\texttt{text}
% Purpose : Monospaced (typewriter) font for
%           code, filenames, and commands.
% =============================================
% OPTIONS:
%   \\texttt{code}
%     — fixed-width font
%     — PDF: each character same width,
%            clearly distinguishes code from text
%   {\\ttfamily paragraph}
%     — declaration form
% TIP: Use for R functions, file paths,
%      variable names mentioned in text.
% =============================================
Analysis was done using \\texttt{lm(yield \\~{} treatment)}
in \\texttt{R version 4.3.2}.

% =============================================
% COMMAND 16: \\begin{itemize} (bulleted list)
% Purpose : Creates an unordered (bulleted) list.
% =============================================
% OPTIONS:
%   \\item Text
%     — standard bullet: filled circle •
%     — PDF: indented with bullet marker
%   \\item[-] Text
%     — custom bullet: dash –
%     — PDF: replaces circle with dash
%   \\item[$\\star$] Text
%     — custom bullet: star ★
%   Nested \\begin{itemize}
%     — sub-bullets auto-change symbol
%     — PDF: Level 1: •  Level 2: –
%            Level 3: *  Level 4: ·
% TIP: Nest up to 4 levels maximum.
% =============================================
\\subsection{Materials Used}
\\begin{itemize}
  \\item Farmyard manure (FYM) @ 10 t/ha
  \\item[-] Vermicompost @ 5 t/ha
  \\item[$\\star$] Neem cake @ 2 t/ha
  \\begin{itemize}
    \\item Prepared from crop residues
    \\item Enriched with \\textit{Trichoderma}
    \\begin{itemize}
      \\item Sub-sub-bullet (level 3)
    \\end{itemize}
  \\end{itemize}
  \\item Green manure (\\textit{Sesbania})
\\end{itemize}

% =============================================
% COMMAND 17: \\begin{enumerate} (numbered list)
% Purpose : Creates an ordered (numbered) list.
% =============================================
% OPTIONS:
%   \\item Text
%     — auto-numbered: 1. 2. 3.
%     — PDF: sequential numbers with period
%   Nested \\begin{enumerate}
%     — sub-numbering auto-changes
%     — PDF: Level 1: 1.  Level 2: (a)
%            Level 3: i.  Level 4: A.
% =============================================
%
% COMMAND 18: \\item
% Purpose : Marks a list entry inside itemize,
%           enumerate, or description.
% OPTIONS:
%   \\item Text
%     — standard entry (bullet or number)
%   \\item[Custom] Text
%     — custom label overrides default
%     — PDF: "Custom" replaces bullet/number
% =============================================
\\subsection{Methodology Steps}
\\begin{enumerate}
  \\item Soil sampling at 0--15 cm depth
  \\item Laboratory analysis:
  \\begin{enumerate}
    \\item Organic carbon (Walkley-Black method)
    \\item Available N, P, K
    \\begin{enumerate}
      \\item Nitrogen by Kjeldahl method
      \\item Phosphorus by Olsen method
    \\end{enumerate}
  \\end{enumerate}
  \\item[Step 3.] Statistical analysis using ANOVA
  % Custom label "Step 3." overrides auto-number
\\end{enumerate}

\\end{document}`,
        commands: [
            {
                id: 9,
                command: "\\section{...}",
                syntax: "\\section{Introduction}",
                description: "Creates a numbered main heading. Auto-added to Table of Contents.",
                tip: "Never manually type numbers. Use \\section*{} for unnumbered (Abstract, Acknowledgements).",
                options: [
                    { option: "\\section{Title}", impact: "Numbered heading", pdfImpact: "Bold, large font: '1 Introduction'. Auto-numbered." },
                    { option: "\\section*{Title}", impact: "Unnumbered", pdfImpact: "Same style but no number. Not in TOC." },
                    { option: "\\section[Short]{Long Title}", impact: "Short for TOC", pdfImpact: "Short title in TOC/headers; full title in document." },
                ]
            },
            {
                id: 10,
                command: "\\subsection{...}",
                syntax: "\\subsection{Study Area}",
                description: "Creates a secondary heading (e.g., 1.1, 1.2).",
                tip: "Don't skip levels — go section → subsection → subsubsection.",
                options: [
                    { option: "\\subsection{Title}", impact: "Numbered sub-heading", pdfImpact: "Slightly smaller bold: '1.1 Study Area'." },
                    { option: "\\subsection*{Title}", impact: "Unnumbered", pdfImpact: "No number, not in TOC." },
                ]
            },
            {
                id: 11,
                command: "\\subsubsection{...}",
                syntax: "\\subsubsection{Soil Sampling}",
                description: "Creates a tertiary heading (e.g., 1.1.1).",
                tip: "Deepest commonly numbered level. Use sparingly.",
                options: [
                    { option: "\\subsubsection{Title}", impact: "Three-level number", pdfImpact: "'1.1.1 Soil Sampling' — smaller font than subsection." },
                ]
            },
            {
                id: 12,
                command: "\\textbf{...}",
                syntax: "\\textbf{important}",
                description: "Makes text bold. Use for key findings and important terms.",
                tip: "Don't overuse — if everything is bold, nothing stands out.",
                options: [
                    { option: "\\textbf{text}", impact: "Bold weight", pdfImpact: "Heavier strokes. Stands out from normal text." },
                    { option: "\\textbf{\\textit{text}}", impact: "Bold + italic", pdfImpact: "Combined bold-italic formatting." },
                    { option: "{\\bfseries paragraph}", impact: "Declaration form", pdfImpact: "Entire group becomes bold." },
                ]
            },
            {
                id: 13,
                command: "\\textit{...}",
                syntax: "\\textit{Oryza sativa}",
                description: "Makes text italic. Standard for scientific names and variables.",
                tip: "Required for genus/species names, book titles, foreign words.",
                options: [
                    { option: "\\textit{text}", impact: "Italic style", pdfImpact: "Slanted typeface for emphasis." },
                    { option: "\\emph{text}", impact: "Smart emphasis", pdfImpact: "Italic in normal text; upright in italic context." },
                ]
            },
            {
                id: 14,
                command: "\\underline{...}",
                syntax: "\\underline{text}",
                description: "Underlines text. Rarely used in academic papers.",
                tip: "Prefer bold or italic. Underline doesn't break across lines.",
                options: [
                    { option: "\\underline{text}", impact: "Simple underline", pdfImpact: "Line below text. Doesn't wrap across lines." },
                    { option: "\\uline{text} (ulem pkg)", impact: "Better underline", pdfImpact: "Wraps across line breaks properly." },
                ]
            },
            {
                id: 15,
                command: "\\texttt{...}",
                syntax: "\\texttt{lm()}",
                description: "Monospaced (typewriter) font for code and filenames.",
                tip: "Use for R functions, file paths, variable names in text.",
                options: [
                    { option: "\\texttt{code}", impact: "Fixed-width font", pdfImpact: "Each character same width — clearly distinguishes code." },
                ]
            },
            {
                id: 16,
                command: "\\begin{itemize}",
                syntax: "\\begin{itemize}\\item ...\\end{itemize}",
                description: "Creates a bulleted (unordered) list.",
                tip: "Nest up to 4 levels. Bullet symbol changes automatically at each level.",
                options: [
                    { option: "\\item Text", impact: "Standard bullet •", pdfImpact: "Filled circle bullet point." },
                    { option: "\\item[-] Text", impact: "Custom bullet", pdfImpact: "Dash instead of circle." },
                    { option: "Nested itemize", impact: "Sub-bullets", pdfImpact: "Level 2: –, Level 3: *, Level 4: ·" },
                ]
            },
            {
                id: 17,
                command: "\\begin{enumerate}",
                syntax: "\\begin{enumerate}\\item ...\\end{enumerate}",
                description: "Creates a numbered (ordered) list.",
                tip: "Numbers auto-increment. Nesting changes to (a), i., A. automatically.",
                options: [
                    { option: "\\item Text", impact: "Auto-numbered 1. 2. 3.", pdfImpact: "Sequential numbers with period." },
                    { option: "Nested enumerate", impact: "Sub-numbering", pdfImpact: "Level 2: (a), Level 3: i., Level 4: A." },
                ]
            },
            {
                id: 18,
                command: "\\item",
                syntax: "\\item First point",
                description: "Marks a list entry. Used inside itemize, enumerate, description.",
                tip: "In description lists, use \\item[Term] for labeled definitions.",
                options: [
                    { option: "\\item Text", impact: "Standard entry", pdfImpact: "Bullet or number depending on list type." },
                    { option: "\\item[Label] Text", impact: "Custom label", pdfImpact: "Overrides default bullet/number with your label." },
                ]
            },
        ]
    },
    {
        id: "mod-5",
        number: 5,
        title: "Mathematics",
        icon: <Sigma className="w-5 h-5" />,
        color: "text-orange-700",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        sampleTex: `% ==================================================
% MODULE 5: Mathematics — Comprehensive Sample .tex
%
% Covers: $...$, \\[...\\], equation, equation*,
%   align, align*, gather, gather*, multline,
%   flalign, cases, split, text in equations,
%   centering, \\frac, \\sqrt, \\sum, ^, _,
%   Greek letters, \\label/\\eqref,
%   ALL mathematical notations in table format
% ==================================================

\\documentclass[12pt, a4paper]{article}
\\usepackage{amsmath}     % align, gather, cases, text
\\usepackage{amssymb}     % extra math symbols
\\usepackage{mathtools}   % dcases, \\coloneqq
\\usepackage{booktabs}    % professional tables
\\usepackage[margin=1in]{geometry}
\\usepackage{hyperref}

\\begin{document}

\\section{Mathematical Expressions in Agriculture}

% ==================================================
% PART A: COMPLETE MATHEMATICAL NOTATIONS TABLE
% ==================================================
% This table lists EVERY mathematical notation
% a research scholar needs, with LaTeX command,
% output description, and usage context.
% ==================================================

\\subsection{Mathematical Notations Reference}

% --- TABLE 1: Arithmetic & Relational Operators ---
\\begin{table}[htbp]
\\centering
\\caption{Arithmetic and Relational Operators}
\\label{tab:arith}
\\begin{tabular}{lll}
  \\toprule
  \\textbf{LaTeX Command} & \\textbf{Symbol} & \\textbf{Usage / Meaning} \\\\
  \\midrule
  \\verb|+|             & $+$             & Addition \\\\
  \\verb|-|             & $-$             & Subtraction \\\\
  \\verb|\\times|        & $\\times$        & Multiplication (cross) \\\\
  \\verb|\\cdot|         & $\\cdot$         & Multiplication (dot) \\\\
  \\verb|\\div|          & $\\div$          & Division \\\\
  \\verb|\\frac{a}{b}|   & $\\frac{a}{b}$   & Fraction \\\\
  \\verb|\\pm|           & $\\pm$           & Plus or minus \\\\
  \\verb|\\mp|           & $\\mp$           & Minus or plus \\\\
  \\verb|=|             & $=$             & Equal to \\\\
  \\verb|\\neq|          & $\\neq$          & Not equal to \\\\
  \\verb|<|             & $<$             & Less than \\\\
  \\verb|>|             & $>$             & Greater than \\\\
  \\verb|\\leq|          & $\\leq$          & Less than or equal \\\\
  \\verb|\\geq|          & $\\geq$          & Greater than or equal \\\\
  \\verb|\\approx|       & $\\approx$       & Approximately equal \\\\
  \\verb|\\equiv|        & $\\equiv$        & Identical / congruent \\\\
  \\verb|\\sim|          & $\\sim$          & Distributed as / similar \\\\
  \\verb|\\propto|       & $\\propto$       & Proportional to \\\\
  \\bottomrule
\\end{tabular}
\\end{table}

% --- TABLE 2: Greek Letters ---
\\begin{table}[htbp]
\\centering
\\caption{Greek Letters for Statistics and Science}
\\label{tab:greek}
\\begin{tabular}{llll}
  \\toprule
  \\textbf{Lowercase} & \\textbf{Symbol} &
  \\textbf{Uppercase} & \\textbf{Symbol} \\\\
  \\midrule
  \\verb|\\alpha|      & $\\alpha$      &
  \\verb|\\Alpha| (use A) & $A$       \\\\
  \\verb|\\beta|       & $\\beta$       &
  \\verb|\\Beta| (use B)  & $B$       \\\\
  \\verb|\\gamma|      & $\\gamma$      &
  \\verb|\\Gamma|      & $\\Gamma$      \\\\
  \\verb|\\delta|      & $\\delta$      &
  \\verb|\\Delta|      & $\\Delta$      \\\\
  \\verb|\\epsilon|    & $\\epsilon$    &
  \\verb|\\varepsilon| & $\\varepsilon$ \\\\
  \\verb|\\zeta|       & $\\zeta$       &
                     &               \\\\
  \\verb|\\eta|        & $\\eta$        &
                     &               \\\\
  \\verb|\\theta|      & $\\theta$      &
  \\verb|\\Theta|      & $\\Theta$      \\\\
  \\verb|\\lambda|     & $\\lambda$     &
  \\verb|\\Lambda|     & $\\Lambda$     \\\\
  \\verb|\\mu|         & $\\mu$         &
                     &               \\\\
  \\verb|\\nu|         & $\\nu$         &
                     &               \\\\
  \\verb|\\pi|         & $\\pi$         &
  \\verb|\\Pi|         & $\\Pi$         \\\\
  \\verb|\\rho|        & $\\rho$        &
                     &               \\\\
  \\verb|\\sigma|      & $\\sigma$      &
  \\verb|\\Sigma|      & $\\Sigma$      \\\\
  \\verb|\\tau|        & $\\tau$        &
                     &               \\\\
  \\verb|\\phi|        & $\\phi$        &
  \\verb|\\Phi|        & $\\Phi$        \\\\
  \\verb|\\varphi|     & $\\varphi$     &
                     &               \\\\
  \\verb|\\chi|        & $\\chi$        &
                     &               \\\\
  \\verb|\\psi|        & $\\psi$        &
  \\verb|\\Psi|        & $\\Psi$        \\\\
  \\verb|\\omega|      & $\\omega$      &
  \\verb|\\Omega|      & $\\Omega$      \\\\
  \\bottomrule
\\end{tabular}
\\end{table}

% --- TABLE 3: Set Theory & Logic ---
\\begin{table}[htbp]
\\centering
\\caption{Set Theory, Logic, and Miscellaneous Symbols}
\\label{tab:sets}
\\begin{tabular}{lll}
  \\toprule
  \\textbf{LaTeX Command} & \\textbf{Symbol} & \\textbf{Meaning} \\\\
  \\midrule
  \\verb|\\in|           & $\\in$           & Element of \\\\
  \\verb|\\notin|        & $\\notin$        & Not element of \\\\
  \\verb|\\subset|       & $\\subset$       & Proper subset \\\\
  \\verb|\\subseteq|     & $\\subseteq$     & Subset or equal \\\\
  \\verb|\\cup|          & $\\cup$          & Union \\\\
  \\verb|\\cap|          & $\\cap$          & Intersection \\\\
  \\verb|\\emptyset|     & $\\emptyset$     & Empty set \\\\
  \\verb|\\forall|       & $\\forall$       & For all \\\\
  \\verb|\\exists|       & $\\exists$       & There exists \\\\
  \\verb|\\neg|          & $\\neg$          & Logical NOT \\\\
  \\verb|\\land|         & $\\land$         & Logical AND \\\\
  \\verb|\\lor|          & $\\lor$          & Logical OR \\\\
  \\verb|\\Rightarrow|   & $\\Rightarrow$   & Implies \\\\
  \\verb|\\Leftrightarrow| & $\\Leftrightarrow$ & If and only if \\\\
  \\verb|\\infty|        & $\\infty$        & Infinity \\\\
  \\verb|\\partial|      & $\\partial$      & Partial derivative \\\\
  \\verb|\\nabla|        & $\\nabla$        & Gradient / del \\\\
  \\verb|\\therefore|    & $\\therefore$    & Therefore \\\\
  \\verb|\\because|      & $\\because$      & Because \\\\
  \\bottomrule
\\end{tabular}
\\end{table}

% --- TABLE 4: Accents, Decorations & Big Operators ---
\\begin{table}[htbp]
\\centering
\\caption{Accents, Decorations, and Big Operators}
\\label{tab:accents}
\\begin{tabular}{lll}
  \\toprule
  \\textbf{LaTeX Command} & \\textbf{Output} & \\textbf{Usage} \\\\
  \\midrule
  \\verb|\\hat{x}|       & $\\hat{x}$       & Estimator \\\\
  \\verb|\\bar{x}|       & $\\bar{x}$       & Sample mean \\\\
  \\verb|\\tilde{x}|     & $\\tilde{x}$     & Approximation \\\\
  \\verb|\\vec{x}|       & $\\vec{x}$       & Vector \\\\
  \\verb|\\dot{x}|       & $\\dot{x}$       & Time derivative \\\\
  \\verb|\\ddot{x}|      & $\\ddot{x}$      & Second derivative \\\\
  \\verb|\\overline{AB}|  & $\\overline{AB}$ & Line segment / mean \\\\
  \\verb|\\underline{x}|  & $\\underline{x}$ & Underline \\\\
  \\verb|\\overbrace{x+y}| & $\\overbrace{x+y}$ & Group above \\\\
  \\verb|\\underbrace{x+y}| & $\\underbrace{x+y}$ & Group below \\\\
  \\midrule
  \\verb|\\sum|          & $\\sum$          & Summation \\\\
  \\verb|\\prod|         & $\\prod$         & Product \\\\
  \\verb|\\int|          & $\\int$          & Integral \\\\
  \\verb|\\iint|         & $\\iint$         & Double integral \\\\
  \\verb|\\oint|         & $\\oint$         & Contour integral \\\\
  \\verb|\\lim|          & $\\lim$          & Limit \\\\
  \\verb|\\max| / \\verb|\\min| & $\\max / \\min$ & Maximum / Minimum \\\\
  \\verb|\\log| / \\verb|\\ln|  & $\\log / \\ln$  & Logarithm / Natural log \\\\
  \\verb|\\sin| / \\verb|\\cos| & $\\sin / \\cos$ & Trigonometric \\\\
  \\verb|\\exp|          & $\\exp$          & Exponential \\\\
  \\bottomrule
\\end{tabular}
\\end{table}

% --- TABLE 5: Brackets, Delimiters & Arrows ---
\\begin{table}[htbp]
\\centering
\\caption{Brackets, Delimiters, and Arrows}
\\label{tab:brackets}
\\begin{tabular}{lll}
  \\toprule
  \\textbf{LaTeX Command} & \\textbf{Output} & \\textbf{Usage} \\\\
  \\midrule
  \\verb|(  )|            & $(\\ )$          & Parentheses \\\\
  \\verb|[  ]|            & $[\\ ]$          & Square brackets \\\\
  \\verb|\\{  \\}|          & $\\{\\ \\}$        & Curly braces (set) \\\\
  \\verb|\\langle \\rangle| & $\\langle\\rangle$ & Angle brackets \\\\
  \\verb+|  |+            & $|\\ |$          & Absolute value \\\\
  \\verb+\\|  \\|+          & $\\|\\ \\|$        & Norm \\\\
  \\verb|\\left( \\right)|  & auto-sized       & Auto-scaling parens \\\\
  \\verb|\\left[ \\right]|  & auto-sized       & Auto-scaling brackets \\\\
  \\verb|\\lceil \\rceil|   & $\\lceil\\rceil$   & Ceiling function \\\\
  \\verb|\\lfloor \\rfloor| & $\\lfloor\\rfloor$ & Floor function \\\\
  \\midrule
  \\verb|\\rightarrow|     & $\\rightarrow$    & Maps to / tends to \\\\
  \\verb|\\leftarrow|      & $\\leftarrow$     & Left arrow \\\\
  \\verb|\\leftrightarrow| & $\\leftrightarrow$ & Bidirectional \\\\
  \\verb|\\uparrow|        & $\\uparrow$       & Increase \\\\
  \\verb|\\downarrow|      & $\\downarrow$     & Decrease \\\\
  \\verb|\\mapsto|         & $\\mapsto$        & Function mapping \\\\
  \\verb|\\to|             & $\\to$            & Tends to (limit) \\\\
  \\bottomrule
\\end{tabular}
\\end{table}

% --- TABLE 6: Spacing Commands in Math Mode ---
\\begin{table}[htbp]
\\centering
\\caption{Spacing Commands in Math Mode}
\\label{tab:spacing}
\\begin{tabular}{lll}
  \\toprule
  \\textbf{Command} & \\textbf{Space} & \\textbf{Example Use} \\\\
  \\midrule
  \\verb|\\,|     & thin space     & $\\int f(x)\\, dx$ \\\\
  \\verb|\\:|     & medium space   & $a \\: b$ \\\\
  \\verb|\\;|     & thick space    & $a \\; b$ \\\\
  \\verb|\\!|     & negative thin  & tighten: $\\sqrt{\\,x}$ \\\\
  \\verb|\\quad|  & 1 em space     & $a \\quad b$ \\\\
  \\verb|\\qquad| & 2 em space     & $a \\qquad b$ \\\\
  \\verb|\\text{ }| & normal space & $x \\text{ and } y$ \\\\
  \\bottomrule
\\end{tabular}
\\end{table}


% ==================================================
% PART B: EQUATION TYPES AND ALIGNMENT OPTIONS
% ==================================================
% Every equation environment with numbered,
% unnumbered, centered, left-aligned, and
% text-based combinations.
% ==================================================

\\subsection{Equation Types and Alignment}

% --------------------------------------------------
% TYPE 1: INLINE MATH (within text)
% --------------------------------------------------
% $...$       : traditional syntax
% \\(...\\)     : modern LaTeX syntax (recommended)
% Both produce identical output.
% PDF: math renders within the text line,
%      fractions and limits are compressed.
% --------------------------------------------------
The yield was $Y = 4.5$ t/ha with $R^2 = 0.89$.
Modern: \\(Y = \\beta_0 + \\beta_1 X\\) is preferred.

% --------------------------------------------------
% TYPE 2: DISPLAY MATH - UNNUMBERED, CENTERED
% --------------------------------------------------
% \\[...\\]     : centered, unnumbered, display size
% PDF: full-size equation on its own line,
%      no equation number.
% NOTE: Do NOT use $$...$$ (old plain TeX).
% --------------------------------------------------
\\[ Y = \\beta_0 + \\beta_1 X_1 + \\beta_2 X_2 + \\epsilon \\]

% --------------------------------------------------
% TYPE 3: DISPLAY MATH - NUMBERED, CENTERED
% --------------------------------------------------
% \\begin{equation} ... \\end{equation}
% PDF: centered with (1) on right margin.
% Always add \\label{eq:name} for cross-referencing.
% --------------------------------------------------
\\begin{equation}
  Y = \\beta_0 + \\beta_1 X_1 + \\beta_2 X_2 + \\epsilon
  \\label{eq:regression}
\\end{equation}

% --------------------------------------------------
% TYPE 4: DISPLAY MATH - UNNUMBERED (equation*)
% --------------------------------------------------
% \\begin{equation*} ... \\end{equation*}
% PDF: same as \\[...\\] but explicit environment.
% Requires amsmath package.
% --------------------------------------------------
\\begin{equation*}
  \\bar{x} = \\frac{1}{n} \\sum_{i=1}^{n} x_i
\\end{equation*}

% --------------------------------------------------
% TYPE 5: MULTI-LINE ALIGNED - NUMBERED (align)
% --------------------------------------------------
% \\begin{align} ... \\end{align}
% & = alignment point (place before =)
% \\\\ = line break
% Each line gets a number: (1), (2), (3)
% \\nonumber skips number for one line
% \\label{} on each line for cross-ref
% PDF: equations aligned at & symbol, each numbered.
% --------------------------------------------------
\\begin{align}
  SS_{\\text{total}} &= \\sum_{i=1}^{n}(Y_i - \\bar{Y})^2
    \\label{eq:sst} \\\\
  SS_{\\text{reg}}   &= \\sum_{i=1}^{n}(\\hat{Y}_i - \\bar{Y})^2
    \\nonumber \\\\
  SS_{\\text{res}}   &= \\sum_{i=1}^{n}(Y_i - \\hat{Y}_i)^2
    \\label{eq:sse}
\\end{align}

% --------------------------------------------------
% TYPE 6: MULTI-LINE ALIGNED - UNNUMBERED (align*)
% --------------------------------------------------
% \\begin{align*} ... \\end{align*}
% Same as align but NO equation numbers at all.
% PDF: aligned equations, no numbers on right.
% --------------------------------------------------
\\begin{align*}
  R^2 &= 1 - \\frac{SS_{\\text{res}}}{SS_{\\text{total}}} \\\\
  R^2_{\\text{adj}} &= 1 - \\frac{(1 - R^2)(n - 1)}{n - p - 1}
\\end{align*}

% --------------------------------------------------
% TYPE 7: GATHER - CENTERED, NO ALIGNMENT
% --------------------------------------------------
% \\begin{gather} ... \\end{gather}     : numbered
% \\begin{gather*} ... \\end{gather*}   : unnumbered
% Each equation is centered independently.
% No alignment point (&) needed.
% PDF: each equation centered, stacked vertically.
% Use when equations are unrelated.
% --------------------------------------------------

% gather - numbered
\\begin{gather}
  E = mc^2 \\label{eq:energy} \\\\
  F = ma   \\label{eq:force} \\\\
  PV = nRT \\label{eq:gas}
\\end{gather}

% gather* - unnumbered
\\begin{gather*}
  \\text{Soil pH} = -\\log[\\text{H}^+] \\\\
  \\text{EC (dS/m)} = \\frac{\\text{TDS (mg/L)}}{640} \\\\
  \\text{CEC (cmol/kg)} = \\frac{\\text{meq}}{100\\text{g}}
\\end{gather*}

% --------------------------------------------------
% TYPE 8: MULTLINE - LONG EQUATION SPLIT
% --------------------------------------------------
% \\begin{multline} ... \\end{multline}   : numbered
% \\begin{multline*} ... \\end{multline*} : unnumbered
% First line: left-aligned
% Middle lines: centered
% Last line: right-aligned
% Use \\\\ to break the equation.
% PDF: single equation number for entire expression.
% Use when ONE equation is too long for one line.
% --------------------------------------------------

% multline - numbered (one number for whole equation)
\\begin{multline}
  Y = \\beta_0 + \\beta_1 X_1 + \\beta_2 X_2
    + \\beta_3 X_3 + \\beta_4 X_4 \\\\
    + \\beta_5 X_5 + \\beta_6 X_1 X_2
    + \\beta_7 X_1 X_3 + \\epsilon
  \\label{eq:longmodel}
\\end{multline}

% multline* - unnumbered
\\begin{multline*}
  \\text{Total Nutrient Uptake} =
    \\text{N uptake} + \\text{P uptake} \\\\
    + \\text{K uptake} + \\text{S uptake}
    + \\text{Micronutrients}
\\end{multline*}

% --------------------------------------------------
% TYPE 9: FLALIGN - FULL-WIDTH ALIGNMENT
% --------------------------------------------------
% \\begin{flalign} ... \\end{flalign}     : numbered
% \\begin{flalign*} ... \\end{flalign*}   : unnumbered
% Like align but pushes equations to margins.
% Left column: left-aligned
% Right column: right-aligned
% PDF: equations spread across full text width.
% --------------------------------------------------

% flalign - numbered, full-width
\\begin{flalign}
  \\text{Grain yield} &= 4.5 \\text{ t/ha} &
  \\label{eq:grain} \\\\
  \\text{Straw yield} &= 6.2 \\text{ t/ha} &
  \\label{eq:straw}
\\end{flalign}

% flalign* - unnumbered, full-width
\\begin{flalign*}
  \\text{Treatment A:} && Y_A &= 3.2 \\text{ t/ha} \\\\
  \\text{Treatment B:} && Y_B &= 4.5 \\text{ t/ha} \\\\
  \\text{Treatment C:} && Y_C &= 4.1 \\text{ t/ha}
\\end{flalign*}

% --------------------------------------------------
% TYPE 10: SPLIT - SUB-EQUATION ALIGNMENT
% --------------------------------------------------
% \\begin{equation}\\begin{split}...\\end{split}\\end{equation}
% Used INSIDE equation for multi-line with ONE number.
% & for alignment, \\\\ for line break.
% PDF: single equation number for all lines.
% --------------------------------------------------
\\begin{equation}
\\begin{split}
  \\text{Total SS} &= \\text{Treatment SS}
    + \\text{Block SS} \\\\
  &\\quad + \\text{Error SS}
\\end{split}
\\label{eq:anova}
\\end{equation}

% --------------------------------------------------
% TYPE 11: CASES - PIECEWISE / CONDITIONAL
% --------------------------------------------------
% \\begin{cases} ... \\end{cases}
% Used inside equation or align.
% Each case: expression & condition \\\\
% PDF: left brace with conditions listed.
%
% \\begin{dcases} (mathtools) for display-size
% --------------------------------------------------
\\begin{equation}
  \\text{Irrigation} =
  \\begin{cases}
    \\text{Full}    & \\text{if } \\theta < 0.20 \\\\
    \\text{Partial} & \\text{if } 0.20 \\leq \\theta < 0.35 \\\\
    \\text{None}    & \\text{if } \\theta \\geq 0.35
  \\end{cases}
  \\label{eq:irrigation}
\\end{equation}

% Unnumbered cases
\\[
  |x| =
  \\begin{cases}
    x  & \\text{if } x \\geq 0 \\\\
    -x & \\text{if } x < 0
  \\end{cases}
\\]

% ==================================================
% PART C: TEXT-BASED EQUATIONS WITH CENTERING
% ==================================================
% Mixing text and math in equations using \\text{},
% \\intertext{}, \\shortintertext{}, and centering.
% ==================================================

\\subsection{Text in Equations and Centering}

% --------------------------------------------------
% TEXT IN MATH: \\text{} command (amsmath)
% --------------------------------------------------
% \\text{words} inside math mode renders normal text.
% Spaces, punctuation, and formatting preserved.
% Without \\text{}, letters are treated as variables.
% --------------------------------------------------

% \\text{} in inline math
The formula $\\text{Yield} = \\text{Biomass} \\times \\text{HI}$
uses descriptive variable names.

% \\text{} in display equation - numbered
\\begin{equation}
  \\text{Harvest Index (HI)} =
  \\frac{\\text{Economic yield (kg/ha)}}
       {\\text{Biological yield (kg/ha)}}
  \\label{eq:hi}
\\end{equation}

% \\text{} in display equation - unnumbered
\\[
  \\text{Nutrient Use Efficiency} =
  \\frac{\\text{Yield increase (kg/ha)}}
       {\\text{Nutrient applied (kg/ha)}}
\\]

% --------------------------------------------------
% TEXT BETWEEN ALIGNED EQUATIONS: \\intertext{}
% --------------------------------------------------
% \\intertext{paragraph} inserts full-width text
% between lines of align without breaking alignment.
% \\shortintertext{} for less vertical space.
% --------------------------------------------------
\\begin{align}
  Y &= \\beta_0 + \\beta_1 X_1 + \\epsilon
    \\label{eq:simple} \\\\
  \\intertext{Adding a second predictor gives:}
  Y &= \\beta_0 + \\beta_1 X_1 + \\beta_2 X_2 + \\epsilon
    \\label{eq:multiple} \\\\
  \\shortintertext{With interaction term:}
  Y &= \\beta_0 + \\beta_1 X_1 + \\beta_2 X_2
    + \\beta_3 X_1 X_2 + \\epsilon
    \\label{eq:interaction}
\\end{align}

% --------------------------------------------------
% CENTERED TEXT-BASED EQUATIONS
% --------------------------------------------------
% Method 1: \\[ \\text{...} = \\text{...} \\]
%   Centered, unnumbered, display mode
%
% Method 2: \\begin{equation} with \\text{}
%   Centered, numbered, display mode
%
% Method 3: \\begin{center} with $...$
%   Centered text with inline math
%   (adds extra vertical space)
%
% Method 4: \\begin{gather} with \\text{}
%   Multiple centered text equations
% --------------------------------------------------

% Method 1: Display math with text - unnumbered centered
\\[
  \\text{Soil Organic Carbon (\\%)} =
  \\frac{\\text{Organic Matter (\\%)}}{1.724}
\\]

% Method 2: equation with text - numbered centered
\\begin{equation}
  \\text{Water Use Efficiency (kg/ha-mm)} =
  \\frac{\\text{Grain yield (kg/ha)}}
       {\\text{Total water used (mm)}}
  \\label{eq:wue}
\\end{equation}

% Method 3: center environment with inline math
\\begin{center}
  $\\text{Benefit-Cost Ratio} =
  \\dfrac{\\text{Gross Returns (Rs/ha)}}
        {\\text{Total Cost (Rs/ha)}}$
\\end{center}

% Method 4: gather with text - multiple centered
\\begin{gather}
  \\text{Nitrogen Use Efficiency} =
  \\frac{\\Delta \\text{Yield}}{\\text{N applied}}
  \\label{eq:nue} \\\\
  \\text{Phosphorus Use Efficiency} =
  \\frac{\\Delta \\text{Yield}}{\\text{P applied}}
  \\label{eq:pue} \\\\
  \\text{Potassium Use Efficiency} =
  \\frac{\\Delta \\text{Yield}}{\\text{K applied}}
  \\label{eq:kue}
\\end{gather}

% gather* - unnumbered centered text equations
\\begin{gather*}
  \\text{Gross Returns} =
    \\text{Yield} \\times \\text{Market Price} \\\\
  \\text{Net Returns} =
    \\text{Gross Returns} - \\text{Total Cost} \\\\
  \\text{B:C Ratio} =
    \\frac{\\text{Net Returns}}{\\text{Total Cost}}
\\end{gather*}

% --------------------------------------------------
% MIXED TEXT + MATH ALIGNMENT COMBINATIONS
% --------------------------------------------------

% align with text descriptions on left
\\begin{align*}
  \\text{Mean:}     \\quad & \\bar{x}
    = \\frac{1}{n}\\sum_{i=1}^{n} x_i \\\\
  \\text{Variance:} \\quad & s^2
    = \\frac{1}{n-1}\\sum_{i=1}^{n}(x_i - \\bar{x})^2 \\\\
  \\text{Std Dev:}  \\quad & s = \\sqrt{s^2} \\\\
  \\text{CV (\\%):}  \\quad & \\text{CV}
    = \\frac{s}{\\bar{x}} \\times 100
\\end{align*}

% align with text and numbering
\\begin{align}
  \\text{SEm} &= \\frac{s}{\\sqrt{n}}
    \\label{eq:sem} \\\\
  \\text{CD at 5\\%} &= \\text{SEm} \\times \\sqrt{2}
    \\times t_{0.05, \\text{df}}
    \\label{eq:cd}
\\end{align}

% --------------------------------------------------
% BOXED EQUATIONS
% --------------------------------------------------
% \\boxed{equation} draws a box around the equation.
% Use inside any math environment.
% PDF: equation enclosed in a rectangular border.
% --------------------------------------------------
\\begin{equation}
  \\boxed{
    R^2 = 1 -
    \\frac{\\sum_{i=1}^{n}(Y_i - \\hat{Y}_i)^2}
         {\\sum_{i=1}^{n}(Y_i - \\bar{Y})^2}
  }
  \\label{eq:rsquared}
\\end{equation}


% ==================================================
% PART D: EQUATION NUMBERING SUMMARY TABLE
% ==================================================

\\subsection{Equation Environment Quick Reference}

\\begin{table}[htbp]
\\centering
\\caption{Equation Environments: Numbering and Alignment}
\\label{tab:eqtypes}
\\begin{tabular}{lccl}
  \\toprule
  \\textbf{Environment} & \\textbf{Numbered} &
  \\textbf{Aligned} & \\textbf{Best For} \\\\
  \\midrule
  \\verb|$...$|         & No  & Inline
    & Math within text \\\\
  \\verb|\\[...\\]|       & No  & Center
    & Single display equation \\\\
  \\verb|equation|      & Yes & Center
    & Single numbered equation \\\\
  \\verb|equation*|     & No  & Center
    & Single unnumbered display \\\\
  \\verb|align|         & Yes & At \\verb|&|
    & Multi-line, aligned \\\\
  \\verb|align*|        & No  & At \\verb|&|
    & Multi-line, no numbers \\\\
  \\verb|gather|        & Yes & Center
    & Multi-line, each centered \\\\
  \\verb|gather*|       & No  & Center
    & Multi-line centered, no num \\\\
  \\verb|multline|      & Yes & L/C/R
    & One long equation split \\\\
  \\verb|multline*|     & No  & L/C/R
    & Long equation, no number \\\\
  \\verb|flalign|       & Yes & Full-width
    & Margin-to-margin alignment \\\\
  \\verb|flalign*|      & No  & Full-width
    & Full-width, no numbers \\\\
  \\verb|split|         & (parent) & At \\verb|&|
    & Multi-line, one number \\\\
  \\verb|cases|         & (parent) & Left brace
    & Piecewise / conditional \\\\
  \\bottomrule
\\end{tabular}
\\end{table}

% ==================================================
% CROSS-REFERENCING EQUATIONS
% ==================================================
% \\label{eq:name}  : place INSIDE equation
% \\eqref{eq:name}  : renders as (1) with parens
% \\ref{eq:name}    : renders as 1 without parens
% Compile TWICE to resolve references.
% ==================================================
See Equation~\\eqref{eq:regression} for the model,
Equations~\\eqref{eq:sst}--\\eqref{eq:sse} for ANOVA,
and Equation~\\eqref{eq:rsquared} for $R^2$.


\\end{document}`,
        commands: [
            {
                id: 19,
                command: "\\begin{equation}",
                syntax: "\\begin{equation} E=mc^2 \\label{eq:1} \\end{equation}",
                description: "Creates a numbered display equation. Use \\label for cross-referencing.",
                tip: "Use equation* or \\[...\\] for unnumbered. Always add \\label inside.",
                options: [
                    { option: "\\begin{equation}", impact: "Numbered equation", pdfImpact: "Centered equation with (1) on the right margin." },
                    { option: "\\begin{equation*}", impact: "Unnumbered", pdfImpact: "Same layout but no number. Equivalent to \\[...\\]." },
                ]
            },
            {
                id: 20,
                command: "$...$ (inline math)",
                syntax: "$E = mc^2$",
                description: "Inline math mode — equation flows within the text.",
                tip: "Use \\(...\\) as the modern alternative. $...$ is shorter but hides errors.",
                options: [
                    { option: "$E = mc^2$", impact: "Inline equation", pdfImpact: "Math renders within text line. Fractions are compressed." },
                    { option: "\\(E = mc^2\\)", impact: "Modern syntax", pdfImpact: "Identical output. Better error messages." },
                ]
            },
            {
                id: 21,
                command: "\\[...\\] (display math)",
                syntax: "\\[ E = mc^2 \\]",
                description: "Display math — centered equation on its own line, no number.",
                tip: "Don't use $$...$$ (old TeX). \\[...\\] is the correct LaTeX syntax.",
                options: [
                    { option: "\\[ equation \\]", impact: "Centered, unnumbered", pdfImpact: "Full-size equation on its own line. No number." },
                ]
            },
            {
                id: 22,
                command: "\\frac{a}{b}",
                syntax: "\\frac{numerator}{denominator}",
                description: "Creates a fraction. Compact inline, full-size in display.",
                tip: "Use \\dfrac for display-size in inline. Use \\tfrac for text-size in display.",
                options: [
                    { option: "\\frac{a}{b}", impact: "Standard fraction", pdfImpact: "a over b with horizontal line." },
                    { option: "\\dfrac{a}{b}", impact: "Display-size inline", pdfImpact: "Larger fraction even in inline mode." },
                    { option: "\\tfrac{a}{b}", impact: "Text-size display", pdfImpact: "Compact fraction even in display mode." },
                ]
            },
            {
                id: 23,
                command: "\\sqrt{x}",
                syntax: "\\sqrt{expression}",
                description: "Square root. Use \\sqrt[n]{x} for nth root.",
                tip: "Bar auto-extends over the entire content. Nest fractions inside freely.",
                options: [
                    { option: "\\sqrt{x}", impact: "Square root", pdfImpact: "√x with bar over content." },
                    { option: "\\sqrt[3]{x}", impact: "Cube root", pdfImpact: "Small 3 in the root symbol crook." },
                ]
            },
            {
                id: 24,
                command: "\\sum_{i=1}^{n}",
                syntax: "\\sum_{i=1}^{n} x_i",
                description: "Summation symbol. Limits below/above in display, beside in inline.",
                tip: "Use \\prod for product (Π), \\int for integral (∫).",
                options: [
                    { option: "\\sum_{i=1}^{n}", impact: "Summation Σ", pdfImpact: "Display: limits above/below. Inline: limits beside." },
                    { option: "\\prod_{i=1}^{n}", impact: "Product Π", pdfImpact: "Same placement rules as \\sum." },
                    { option: "\\int_{a}^{b}", impact: "Integral ∫", pdfImpact: "Integral with limits. Add \\,dx for spacing." },
                ]
            },
            {
                id: 25,
                command: "^ (superscript)",
                syntax: "x^{2} or x^2",
                description: "Superscript/exponent. Only works in math mode.",
                tip: "Use braces for multi-char: x^{10} not x^10. Combine with _: x_i^2.",
                options: [
                    { option: "x^2", impact: "Single char exponent", pdfImpact: "x² — superscript 2." },
                    { option: "x^{10}", impact: "Multi-char exponent", pdfImpact: "x¹⁰ — braces group '10'." },
                ]
            },
            {
                id: 26,
                command: "_ (subscript)",
                syntax: "x_{i} or x_i",
                description: "Subscript. Only works in math mode.",
                tip: "Use braces for multi-char: x_{ij} not x_ij.",
                options: [
                    { option: "x_i", impact: "Single char subscript", pdfImpact: "xᵢ — subscript i." },
                    { option: "x_{ij}", impact: "Multi-char subscript", pdfImpact: "x with 'ij' subscript." },
                ]
            },
            {
                id: 27,
                command: "\\begin{align}",
                syntax: "\\begin{align} Y &= a + bX \\\\\\\\ &= 2.5 \\end{align}",
                description: "Multi-line aligned equations. Each line numbered. Use & for alignment.",
                tip: "Use align* for no numbers. Place & before = to align. End lines with \\\\\\\\.",
                options: [
                    { option: "\\begin{align}", impact: "Numbered lines", pdfImpact: "Each line gets (1), (2), etc." },
                    { option: "\\begin{align*}", impact: "No numbers", pdfImpact: "Aligned but unnumbered." },
                    { option: "\\nonumber", impact: "Skip one line", pdfImpact: "Suppresses number for that line only." },
                ]
            },
            {
                id: 28,
                command: "Greek letters",
                syntax: "\\alpha, \\beta, \\sigma, \\mu",
                description: "Greek symbols for statistics: α, β, σ, μ, π, θ, etc.",
                tip: "Lowercase: \\alpha. Uppercase: \\Sigma, \\Delta. Only in math mode.",
                options: [
                    { option: "\\alpha, \\beta", impact: "α, β", pdfImpact: "Lowercase Greek — parameters, coefficients." },
                    { option: "\\Sigma, \\Delta, \\Omega", impact: "Σ, Δ, Ω", pdfImpact: "Uppercase Greek — summation, change, sets." },
                    { option: "\\varepsilon vs \\epsilon", impact: "ε vs ϵ", pdfImpact: "Variant forms — check journal convention." },
                ]
            },
            {
                id: 29,
                command: "\\label{eq:...} / \\eqref{eq:...}",
                syntax: "\\label{eq:yield} ... Equation \\eqref{eq:yield}",
                description: "Label and reference equations. \\eqref adds parentheses automatically.",
                tip: "Place \\label inside the equation. Compile twice to resolve references.",
                options: [
                    { option: "\\eqref{eq:yield}", impact: "Reference with ()", pdfImpact: "Renders as '(1)' — auto-updates." },
                    { option: "\\ref{eq:yield}", impact: "Reference without ()", pdfImpact: "Renders as '1' — no parentheses." },
                ]
            },
        ]
    },
    {
        id: "mod-7",
        number: 7,
        title: "References & Citations",
        icon: <Quote className="w-5 h-5" />,
        color: "text-teal-700",
        bgColor: "bg-teal-50",
        borderColor: "border-teal-200",
        sampleTex: `% ============================================
% MODULE 7: References & Citations — Sample .tex
% Covers: \\cite, \\citep/\\citet, \\bibliography,
%   \\bibliographystyle, \\nocite, BibTeX entries
% ============================================

\\documentclass[12pt, a4paper]{article}
\\usepackage[margin=1in]{geometry}
\\usepackage{natbib}   % For \\citep and \\citet
\\usepackage{hyperref}

\\begin{document}

\\section{Literature Review}

% =============================================
% COMMAND 30: \\cite{key}
% Purpose : Inserts a citation reference.
%           Key must match .bib entry exactly.
% =============================================
% OPTIONS:
%   \\cite{key}
%     — single citation
%     — PDF: [1] (plain) or [Sha24] (alpha)
%   \\cite{key1, key2}
%     — multiple citations in one command
%     — PDF: [1, 3] — auto-sorted in some styles
%   \\cite[p.~42]{key}
%     — citation with page note
%     — PDF: [1, p. 42] — page-specific reference
%   \\cite[see][p.~42]{key}
%     — with pre-note and post-note (natbib)
%     — PDF: [see 1, p. 42]
% COMPILE CYCLE: pdflatex → bibtex → pdflatex → pdflatex
% If you see [?] → incomplete compile cycle!
% =============================================
Organic farming improves soil health \\cite{sharma2024}.
Multiple studies confirm this \\cite{sharma2024, kumar2023}.
Specifically noted on \\cite[p.~42]{sharma2024}.

% =============================================
% COMMAND 31: \\citep{key} / \\citet{key}
% Purpose : Parenthetical vs textual citation.
%           Requires natbib or biblatex package.
% =============================================
% OPTIONS:
%   \\citep{key}
%     — parenthetical citation
%     — PDF: (Sharma, 2024)
%     — USE: at end of sentence
%   \\citet{key}
%     — textual citation (author as subject)
%     — PDF: Sharma (2024)
%     — USE: when author is the subject
%   \\citep[p.~42]{key}
%     — parenthetical with page
%     — PDF: (Sharma, 2024, p. 42)
%   \\citep*{key}
%     — full author list (no "et al.")
%     — PDF: (Sharma, Kumar, and Patel, 2024)
%   \\citeauthor{key}
%     — author name only
%     — PDF: Sharma
%   \\citeyear{key}
%     — year only
%     — PDF: 2024
% =============================================
\\citet{sharma2024} reported a 23\\% increase in SOC.
This aligns with earlier findings \\citep{kumar2023}.
As noted by \\citeauthor{sharma2024} in \\citeyear{sharma2024}.

% =============================================
% COMMAND 34: \\nocite{*}
% Purpose : Includes entries in bibliography
%           without in-text citation.
% =============================================
% OPTIONS:
%   \\nocite{*}
%     — include ALL .bib entries
%     — PDF: every entry appears in bibliography
%     — USE: annotated bibliographies
%   \\nocite{key}
%     — include one specific uncited entry
%     — PDF: that entry appears without in-text cite
% TIP: Avoid \\nocite{*} in journal submissions.
% =============================================
\\nocite{patel2022}  % Include without in-text citation

% =============================================
% COMMAND 33: \\bibliographystyle{style}
% Purpose : Sets how references are formatted.
%           Place BEFORE \\bibliography command.
% =============================================
% OPTIONS:
%   {plain}
%     — numbered, sorted alphabetically
%     — PDF: [1] Author. Title. Journal. Year.
%   {unsrt}
%     — numbered, in order of first citation
%     — PDF: [1] in citation order
%   {alpha}
%     — letter-based keys
%     — PDF: [Sha24] based on author+year
%   {apalike}
%     — author-year format
%     — PDF: (Sharma, 2024) — social science style
%   {abbrvnat}
%     — abbreviated author-year (natbib)
%     — PDF: abbreviated journal names
%   {plainnat}
%     — full author-year (natbib)
%     — PDF: full journal names
%   {ieeetr}
%     — IEEE transaction style
%     — PDF: [1] numbered, IEEE format
% =============================================
\\bibliographystyle{apalike}

% =============================================
% COMMAND 32: \\bibliography{file}
% Purpose : Loads the .bib file containing all
%           reference entries.
% =============================================
% OPTIONS:
%   \\bibliography{references}
%     — loads references.bib (no .bib extension!)
%     — PDF: bibliography section auto-generates
%   \\bibliography{refs1, refs2}
%     — loads multiple .bib files
%     — PDF: entries merged from all files
% TIP: Place at the END of the document.
% =============================================
\\bibliography{references}

\\end{document}

% =============================================
% COMMAND 35: BibTeX Entry Types
% Purpose : Define references in .bib files.
% =============================================
% FILE: references.bib (save as separate file)
%
% ENTRY TYPE OPTIONS:
%   @article{key, ...}
%     — journal paper
%     — Required: author, title, journal, year
%     — Optional: volume, number, pages, doi
%     — PDF: Author. Title. Journal, Vol(No):Pages, Year.
%
%   @book{key, ...}
%     — book
%     — Required: author/editor, title, publisher, year
%     — Optional: edition, address, isbn
%     — PDF: Author. Title. Publisher, Year.
%
%   @inproceedings{key, ...}
%     — conference paper
%     — Required: author, title, booktitle, year
%     — Optional: editor, pages, organization
%     — PDF: Author. Title. In Booktitle, Year.
%
%   @phdthesis{key, ...}
%     — PhD dissertation
%     — Required: author, title, school, year
%     — PDF: Author. Title. PhD thesis, School, Year.
%
%   @mastersthesis{key, ...}
%     — Master's thesis
%     — Required: author, title, school, year
%
%   @techreport{key, ...}
%     — technical report
%     — Required: author, title, institution, year
%
%   @misc{key, ...}
%     — anything that doesn't fit above
%     — Optional: author, title, howpublished, year
%     — USE: websites, software, datasets
%
% TIP: Use descriptive keys like sharma2024irrigation.
%      Fields are comma-separated.
%      Enclose titles in {Title} to preserve case.
% =============================================
%
% @article{sharma2024,
%   author  = {Sharma, Priya and Reddy, K.},
%   title   = {{Organic Manure Effects on Soil Carbon}},
%   journal = {Journal of Soil Science},
%   volume  = {89},
%   number  = {3},
%   pages   = {234--248},
%   year    = {2024},
%   doi     = {10.1234/jss.2024.0042}
% }
%
% @book{kumar2023,
%   author    = {Kumar, Ramesh},
%   title     = {{Sustainable Agriculture Practices}},
%   publisher = {ICAR Publications},
%   address   = {New Delhi},
%   edition   = {2nd},
%   year      = {2023}
% }
%
% @inproceedings{patel2022,
%   author    = {Patel, Anita and Singh, B.},
%   title     = {{Vermicompost in Dryland Farming}},
%   booktitle = {National Seminar on Organic Farming},
%   year      = {2022},
%   pages     = {45--52},
%   organization = {ICAR}
% }
%
% @phdthesis{reddy2021,
%   author = {Reddy, Suresh},
%   title  = {{Nutrient Dynamics in Paddy Soils}},
%   school = {UAS Dharwad},
%   year   = {2021}
% }
%
% @misc{fao2023,
%   author       = {{FAO}},
%   title        = {{World Food and Agriculture Report}},
%   howpublished = {\\url{https://www.fao.org/report}},
%   year         = {2023},
%   note         = {Accessed: 2026-03-10}
% }`,
        commands: [
            {
                id: 30,
                command: "\\cite{key}",
                syntax: "\\cite{sharma2024}",
                description: "Inserts a citation reference. Key must match .bib entry exactly.",
                tip: "Compile cycle: pdflatex → bibtex → pdflatex → pdflatex. [?] means incomplete cycle.",
                options: [
                    { option: "\\cite{key}", impact: "Single citation", pdfImpact: "Inserts [1] or [Sha24] depending on style." },
                    { option: "\\cite{k1, k2}", impact: "Multiple citations", pdfImpact: "[1, 3] — auto-sorted in some styles." },
                    { option: "\\cite[p.~42]{key}", impact: "With page note", pdfImpact: "[1, p. 42] — page-specific reference." },
                ]
            },
            {
                id: 31,
                command: "\\citep{key} / \\citet{key}",
                syntax: "\\citep{sharma2024} or \\citet{sharma2024}",
                description: "Parenthetical vs textual citation. Requires natbib or biblatex.",
                tip: "\\citep for end-of-sentence. \\citet when author is the subject.",
                options: [
                    { option: "\\citep{key}", impact: "(Author, Year)", pdfImpact: "(Sharma, 2024) — parenthetical." },
                    { option: "\\citet{key}", impact: "Author (Year)", pdfImpact: "Sharma (2024) — textual." },
                ]
            },
            {
                id: 32,
                command: "\\bibliography{file}",
                syntax: "\\bibliography{references}",
                description: "Loads the .bib file containing all reference entries.",
                tip: "Don't add .bib extension. Place at the end of the document.",
                options: [
                    { option: "\\bibliography{references}", impact: "Load .bib file", pdfImpact: "Bibliography section auto-generates from cited entries." },
                ]
            },
            {
                id: 33,
                command: "\\bibliographystyle{style}",
                syntax: "\\bibliographystyle{plain}",
                description: "Sets how references are formatted in the bibliography.",
                tip: "Place before \\bibliography. Style controls numbering, sorting, and format.",
                options: [
                    { option: "{plain}", impact: "Numbered, alphabetical", pdfImpact: "[1] sorted by author name." },
                    { option: "{unsrt}", impact: "Numbered, citation order", pdfImpact: "[1] in order of first citation." },
                    { option: "{alpha}", impact: "Letter keys", pdfImpact: "[Sha24] based on author+year." },
                    { option: "{apalike}", impact: "Author-year", pdfImpact: "(Sharma, 2024) — social science style." },
                ]
            },
            {
                id: 34,
                command: "\\nocite{*}",
                syntax: "\\nocite{*}",
                description: "Includes ALL .bib entries in bibliography, even if not cited.",
                tip: "Use for annotated bibliographies. Avoid in journal submissions.",
                options: [
                    { option: "\\nocite{*}", impact: "Include all entries", pdfImpact: "Every .bib entry appears in bibliography." },
                    { option: "\\nocite{key}", impact: "Include specific entry", pdfImpact: "That entry appears without in-text citation." },
                ]
            },
            {
                id: 35,
                command: "BibTeX entry types",
                syntax: "@article{key, title={...}, author={...}, ...}",
                description: "Define references in .bib files. Common: @article, @book, @inproceedings.",
                tip: "Use descriptive keys like sharma2024irrigation. Fields are comma-separated.",
                options: [
                    { option: "@article{...}", impact: "Journal paper", pdfImpact: "Author, Title, Journal, Volume, Pages, Year." },
                    { option: "@book{...}", impact: "Book", pdfImpact: "Author, Title, Publisher, Year." },
                    { option: "@inproceedings{...}", impact: "Conference paper", pdfImpact: "Author, Title, Booktitle, Year." },
                ]
            },
        ]
    },
    {
        id: "mod-8",
        number: 8,
        title: "Tables & Figures",
        icon: <Table className="w-5 h-5" />,
        color: "text-rose-700",
        bgColor: "bg-rose-50",
        borderColor: "border-rose-200",
        sampleTex: `% ============================================
% MODULE 8: Tables & Figures — Sample .tex
% Covers: \\begin{table}, \\begin{tabular}, \\hline,
%   \\caption, \\label/\\ref, \\centering,
%   \\includegraphics, \\begin{figure},
%   \\listoftables, \\listoffigures
% ============================================

\\documentclass[12pt, a4paper]{article}
\\usepackage[margin=1in]{geometry}
\\usepackage{graphicx}    % For \\includegraphics
\\usepackage{float}       % For [H] exact placement
\\usepackage{booktabs}    % For \\toprule, \\midrule, \\bottomrule
\\usepackage{hyperref}

\\begin{document}

% =============================================
% COMMAND 44: \\listoftables / \\listoffigures
% Purpose : Auto-generates list of all tables
%           or figures with page numbers.
% =============================================
% OPTIONS:
%   \\listoftables
%     — generates list of tables
%     — PDF: page with table numbers, captions, pages
%   \\listoffigures
%     — generates list of figures
%     — PDF: page with figure numbers, captions, pages
% TIP: Place after \\tableofcontents.
%      Compile TWICE to populate.
%      Uses short caption from \\caption[Short]{Long}.
% =============================================
\\listoftables
\\listoffigures

\\section{Results}

% =============================================
% COMMAND 36: \\begin{table}[placement]
% Purpose : Float wrapper for tables. Controls
%           placement and adds caption support.
% =============================================
% PLACEMENT OPTIONS (in square brackets):
%   [h]    — here (approximate)
%           — PDF: tries to place near source position
%           — may move if not enough space
%   [t]    — top of page
%           — PDF: floats to top of current/next page
%   [b]    — bottom of page
%           — PDF: sinks to bottom of page
%   [p]    — special float page
%           — PDF: placed on a page with only floats
%   [H]    — exactly here (requires float package!)
%           — PDF: no floating at all, stays put
%           — WARNING: may cause ugly page breaks
%   [htbp] — maximum flexibility (recommended)
%           — PDF: tries h, then t, then b, then p
%   [!h]   — override LaTeX restrictions
%           — PDF: forces placement even if "ugly"
% TIP: Always use \\centering inside table.
%      \\caption BEFORE \\label (label needs caption).
% =============================================
\\begin{table}[htbp]

  % =============================================
  % COMMAND 41: \\centering
  % Purpose : Centers content within the current
  %           environment (table, figure, etc.).
  % =============================================
  % OPTIONS:
  %   \\centering
  %     — no extra vertical space (preferred in floats)
  %     — PDF: content centered horizontally
  %   \\begin{center} ... \\end{center}
  %     — adds extra vertical space above and below
  %     — PDF: centered but with padding
  %     — AVOID inside floats (table/figure)!
  % =============================================
  \\centering

  % =============================================
  % COMMAND 39: \\caption{text}
  % Purpose : Adds a numbered caption to a table
  %           or figure float.
  % =============================================
  % OPTIONS:
  %   \\caption{Full caption text}
  %     — auto-numbered caption
  %     — PDF: "Table 1: Full caption text"
  %   \\caption[Short]{Very long detailed caption}
  %     — short version for \\listoftables
  %     — PDF: full text in document,
  %            "Short" in list of tables
  % CONVENTION:
  %   Tables: \\caption ABOVE the tabular
  %   Figures: \\caption BELOW the image
  % =============================================
  \\caption[Fertilizer trial]{Effect of organic amendments
    on rice yield (t/ha) during kharif 2024}

  % =============================================
  % COMMAND 40: \\label{prefix:key} / \\ref{prefix:key}
  % Purpose : Label and reference any numbered
  %           element. Compile TWICE to resolve.
  % =============================================
  % OPTIONS:
  %   \\label{tab:yield}
  %     — creates reference anchor
  %     — MUST come AFTER \\caption
  %   \\ref{tab:yield}
  %     — inserts number: "1"
  %     — PDF: auto-updates if order changes
  %   \\pageref{tab:yield}
  %     — inserts page number
  %     — PDF: "3" (the page it appears on)
  % PREFIX CONVENTION:
  %   sec:  — sections
  %   fig:  — figures
  %   tab:  — tables
  %   eq:   — equations
  %   ch:   — chapters
  % =============================================
  \\label{tab:yield}

  % =============================================
  % COMMAND 37: \\begin{tabular}{column spec}
  % Purpose : Creates the actual table grid.
  % =============================================
  % COLUMN SPECIFIERS:
  %   l     — left-aligned column
  %   c     — center-aligned column
  %   r     — right-aligned column
  %   |     — vertical border line
  %   ||    — double vertical line
  %   p{3cm} — fixed-width column (text wraps)
  %   m{3cm} — fixed-width, vertically centered
  %   @{}   — suppress inter-column space
  %   *{3}{c} — repeat: 3 centered columns
  %
  % COLUMN SPEC OPTIONS:
  %   {|l|c|r|}
  %     — bordered columns: left, center, right
  %     — PDF: vertical lines between columns
  %   {lcr}
  %     — no borders (clean, journal-preferred)
  %     — PDF: professional look
  %   {p{3cm}p{4cm}}
  %     — fixed-width columns with text wrapping
  %     — PDF: text wraps within specified width
  %   {l*{3}{c}r}
  %     — left + 3 centered + right
  %     — PDF: shorthand for repeated columns
  %
  % CELL SEPARATORS:
  %   &     — column separator
  %   \\\\  — row break (end of row)
  % =============================================
  \\begin{tabular}{lccc}

    % =============================================
    % COMMAND 38: \\hline and booktabs rules
    % Purpose : Draws horizontal lines in tables.
    % =============================================
    % OPTIONS:
    %   \\hline
    %     — full horizontal line across all columns
    %     — PDF: thin line spanning entire width
    %   \\hline\\hline
    %     — double horizontal line
    %     — PDF: two thin lines (old-style)
    %   \\cline{2-4}
    %     — partial line spanning columns 2 to 4
    %     — PDF: line under specific columns only
    %   \\toprule  (booktabs package)
    %     — thick top line with proper spacing
    %     — PDF: professional thick line at top
    %   \\midrule  (booktabs package)
    %     — medium separator line
    %     — PDF: thinner line between header and data
    %   \\bottomrule (booktabs package)
    %     — thick bottom line
    %     — PDF: professional thick line at bottom
    %   \\cmidrule{2-4} (booktabs package)
    %     — partial midrule for columns 2-4
    %     — PDF: partial line with trimming
    %   \\cmidrule(lr){2-4}
    %     — trimmed partial rule (l=left, r=right)
    %     — PDF: line with small gaps at edges
    % TIP: Professional journals prefer booktabs
    %      (no vertical lines, only horizontal rules).
    % =============================================
    \\toprule
    Treatment & Grain Yield & Straw Yield & HI \\\\
    \\midrule
    Control        & 3.2 & 4.8 & 0.40 \\\\
    FYM 10 t/ha    & 4.1 & 5.9 & 0.41 \\\\
    Vermicompost   & 4.5 & 6.2 & 0.42 \\\\
    Green Manure   & 3.8 & 5.5 & 0.41 \\\\
    \\cmidrule(lr){2-4}
    \\textbf{Mean}  & \\textbf{3.9} & \\textbf{5.6} & \\textbf{0.41} \\\\
    \\bottomrule
  \\end{tabular}
\\end{table}

% Using \\ref and \\pageref
Table~\\ref{tab:yield} on page~\\pageref{tab:yield}
shows the treatment effects on rice yield.

% =============================================
% COMMAND 43: \\begin{figure}[placement]
% Purpose : Float wrapper for figures. Same
%           placement options as \\begin{table}.
% =============================================
% OPTIONS:
%   [h], [t], [b], [p], [H], [htbp]
%     — same placement rules as table (see above)
%   \\begin{figure*}
%     — spans BOTH columns in twocolumn mode
%     — PDF: full-width figure across page
% TIP: Use \\begin{figure*} in two-column papers
%      for wide graphs or images.
% =============================================
\\begin{figure}[htbp]
  \\centering

  % =============================================
  % COMMAND 42: \\includegraphics[options]{file}
  % Purpose : Inserts an image file.
  %           Requires \\usepackage{graphicx}.
  % =============================================
  % OPTIONS:
  %   [width=0.8\\textwidth]
  %     — scale to 80% of text width
  %     — PDF: aspect ratio preserved automatically
  %   [width=\\linewidth]
  %     — full column width (useful in multicol)
  %     — PDF: fills entire column
  %   [scale=0.5]
  %     — 50% of original image size
  %     — PDF: half the native dimensions
  %   [height=5cm]
  %     — fixed height, width auto-adjusts
  %     — PDF: maintains aspect ratio
  %   [width=6cm, height=4cm]
  %     — fixed both (may distort!)
  %     — PDF: stretches to fit both dimensions
  %   [angle=90]
  %     — rotate 90° counter-clockwise
  %     — PDF: image rotated
  %   [angle=-90]
  %     — rotate 90° clockwise
  %   [trim=1cm 2cm 1cm 0cm, clip]
  %     — crop edges: left bottom right top
  %     — PDF: trims specified amounts from edges
  %     — MUST include "clip" or trim is ignored!
  %   [draft]
  %     — show placeholder frame only
  %     — PDF: empty box with filename (fast compile)
  %
  % SUPPORTED FORMATS: PNG, JPG, PDF, EPS
  % TIP: Use relative widths (\\textwidth) not
  %      absolute (cm) for responsive layouts.
  % TIP: PDF images give best quality for diagrams.
  % =============================================
  \\includegraphics[width=0.8\\textwidth]{yield_graph.png}

  % Caption BELOW image (convention for figures)
  \\caption{Grain yield across treatments during kharif 2024}
  \\label{fig:yield}
\\end{figure}

Figure~\\ref{fig:yield} illustrates the yield differences
across all four treatments.

\\end{document}`,
        commands: [
            {
                id: 36,
                command: "\\begin{table}[placement]",
                syntax: "\\begin{table}[h]\\centering...\\end{table}",
                description: "Float wrapper for tables. Controls placement and adds caption support.",
                tip: "Always use \\centering inside. \\caption before \\label. Try [htbp] for flexibility.",
                options: [
                    { option: "[h]", impact: "Here (approximate)", pdfImpact: "Tries to place near source position." },
                    { option: "[t]", impact: "Top of page", pdfImpact: "Floats to top of current/next page." },
                    { option: "[b]", impact: "Bottom of page", pdfImpact: "Sinks to bottom of page." },
                    { option: "[H] (float pkg)", impact: "Exactly here", pdfImpact: "No floating. May cause ugly page breaks." },
                    { option: "[htbp]", impact: "Maximum flexibility", pdfImpact: "Tries all positions in order." },
                ]
            },
            {
                id: 37,
                command: "\\begin{tabular}{cols}",
                syntax: "\\begin{tabular}{|l|c|r|}...\\end{tabular}",
                description: "Creates the actual table grid. l=left, c=center, r=right, |=border.",
                tip: "Use & for column separator, \\\\\\\\ for row break. Professional tables avoid vertical lines.",
                options: [
                    { option: "{|l|c|r|}", impact: "Bordered columns", pdfImpact: "Left, center, right aligned with vertical lines." },
                    { option: "{lcr}", impact: "No borders", pdfImpact: "Clean look — preferred by journals." },
                    { option: "{p{3cm}}", impact: "Fixed-width column", pdfImpact: "Text wraps within 3cm width." },
                ]
            },
            {
                id: 38,
                command: "\\hline",
                syntax: "\\hline",
                description: "Draws a horizontal line across the table.",
                tip: "For professional tables, use booktabs: \\toprule, \\midrule, \\bottomrule.",
                options: [
                    { option: "\\hline", impact: "Full horizontal line", pdfImpact: "Thin line spanning all columns." },
                    { option: "\\cline{2-4}", impact: "Partial line", pdfImpact: "Line spanning columns 2 to 4 only." },
                    { option: "\\toprule (booktabs)", impact: "Professional top line", pdfImpact: "Thicker top line with proper spacing." },
                ]
            },
            {
                id: 39,
                command: "\\caption{...}",
                syntax: "\\caption{Fertilizer trial results}",
                description: "Adds a numbered caption to a table or figure.",
                tip: "Place ABOVE tabular for tables, BELOW image for figures (convention).",
                options: [
                    { option: "\\caption{Text}", impact: "Auto-numbered", pdfImpact: "'Table 1: Text' or 'Figure 1: Text'." },
                    { option: "\\caption[Short]{Long}", impact: "Short for lists", pdfImpact: "Short version in \\listoftables." },
                ]
            },
            {
                id: 40,
                command: "\\label{...} / \\ref{...}",
                syntax: "\\label{tab:fert} ... Table \\ref{tab:fert}",
                description: "Label and reference any numbered element. Compile twice to resolve.",
                tip: "Use prefixes: sec:, fig:, tab:, eq:. \\label must come AFTER \\caption.",
                options: [
                    { option: "\\ref{tab:fert}", impact: "Number reference", pdfImpact: "Inserts '1' — auto-updates if order changes." },
                    { option: "\\pageref{tab:fert}", impact: "Page reference", pdfImpact: "Inserts the page number." },
                ]
            },
            {
                id: 41,
                command: "\\centering",
                syntax: "\\centering",
                description: "Centers content within the current environment.",
                tip: "Use inside floats (table/figure). Don't use \\begin{center} inside floats — it adds extra space.",
                options: [
                    { option: "\\centering", impact: "No extra space", pdfImpact: "Content centered without vertical padding." },
                    { option: "\\begin{center}", impact: "With extra space", pdfImpact: "Adds vertical space above and below." },
                ]
            },
            {
                id: 42,
                command: "\\includegraphics[opts]{file}",
                syntax: "\\includegraphics[width=0.8\\textwidth]{graph.png}",
                description: "Inserts an image. Requires \\usepackage{graphicx}.",
                tip: "Use relative widths (\\textwidth) not absolute (cm). Supports PNG, JPG, PDF.",
                options: [
                    { option: "[width=0.8\\textwidth]", impact: "80% text width", pdfImpact: "Scales to 80% of column width. Aspect ratio preserved." },
                    { option: "[scale=0.5]", impact: "Half original size", pdfImpact: "50% of native image dimensions." },
                    { option: "[height=5cm]", impact: "Fixed height", pdfImpact: "Width adjusts to maintain aspect ratio." },
                    { option: "[angle=90]", impact: "Rotated", pdfImpact: "90° counter-clockwise rotation." },
                    { option: "[trim=1cm 2cm 1cm 0cm, clip]", impact: "Cropped", pdfImpact: "Trims left, bottom, right, top edges." },
                ]
            },
            {
                id: 43,
                command: "\\begin{figure}[placement]",
                syntax: "\\begin{figure}[h]\\centering...\\end{figure}",
                description: "Float wrapper for figures. Same placement options as table.",
                tip: "Use \\begin{figure*} in twocolumn mode to span both columns.",
                options: [
                    { option: "[h]", impact: "Here", pdfImpact: "Approximate placement near source." },
                    { option: "[H] (float pkg)", impact: "Exactly here", pdfImpact: "No floating at all." },
                    { option: "\\begin{figure*}", impact: "Full width (twocol)", pdfImpact: "Spans both columns in two-column layout." },
                ]
            },
            {
                id: 44,
                command: "\\listoftables / \\listoffigures",
                syntax: "\\listoftables \\listoffigures",
                description: "Auto-generates list of tables/figures with page numbers.",
                tip: "Place after \\tableofcontents. Compile twice to populate.",
                options: [
                    { option: "\\listoftables", impact: "Table list", pdfImpact: "Page with all table numbers, captions, pages." },
                    { option: "\\listoffigures", impact: "Figure list", pdfImpact: "Page with all figure numbers, captions, pages." },
                ]
            },
        ]
    },
    {
        id: "mod-9",
        number: 9,
        title: "Thesis Structure",
        icon: <FolderTree className="w-5 h-5" />,
        color: "text-indigo-700",
        bgColor: "bg-indigo-50",
        borderColor: "border-indigo-200",
        sampleTex: `% ============================================
% MODULE 9: Thesis Structure — Sample .tex
% Covers: \\input, \\include, \\includeonly,
%   \\tableofcontents, \\appendix, \\chapter
% ============================================
% NOTE: This module uses {report} class because
%       \\chapter is only available in report/book.
% ============================================

\\documentclass[12pt, a4paper]{report}
\\usepackage[margin=1in]{geometry}
\\usepackage{hyperref}

% =============================================
% COMMAND 47: \\includeonly{file1, file2}
% Purpose : Compile only specific chapters.
%           Cross-references still work!
%           Place in PREAMBLE only.
% =============================================
% OPTIONS:
%   \\includeonly{chapters/results, chapters/discussion}
%     — only these two chapters compile
%     — PDF: only results + discussion appear
%     — cross-refs from other chapters still resolve
%     — 10x faster for large theses!
%   (comment out for final compilation)
%     — all chapters compile normally
% RULES:
%   - Only works with \\include (not \\input)
%   - File names must match \\include exactly
%   - No spaces after commas in file list
% TIP: Huge time saver during writing.
%      Comment out for final submission.
% =============================================
% \\includeonly{chapters/results,chapters/discussion}

\\title{Effect of Integrated Nutrient Management on
  Soil Health and Rice Productivity}
\\author{Priya Sharma \\\\
  Department of Soil Science \\\\
  University of Agricultural Sciences, Dharwad}
\\date{March 2026}

\\begin{document}

\\maketitle

% =============================================
% COMMAND 48: \\tableofcontents
% Purpose : Auto-generates Table of Contents
%           from \\chapter/\\section headings.
% =============================================
% OPTIONS:
%   \\tableofcontents
%     — full TOC with all heading levels
%     — PDF: page with headings, numbers, page numbers
%   \\setcounter{tocdepth}{1}
%     — control depth: 0=chapters, 1=sections,
%       2=subsections, 3=subsubsections
%     — PDF: TOC shows only up to that level
%   \\addcontentsline{toc}{chapter}{Title}
%     — manually add unnumbered entry to TOC
%     — PDF: "Title" appears in TOC
% TIP: Compile TWICE to populate TOC.
%      First pass collects headings,
%      second pass writes the TOC page.
% =============================================
\\tableofcontents
\\listoftables
\\listoffigures

% =============================================
% COMMAND 50: \\chapter{title}
% Purpose : Top-level heading. Only available
%           in report and book classes.
% =============================================
% OPTIONS:
%   \\chapter{Title}
%     — numbered chapter
%     — PDF: "Chapter 1" + "Introduction" on new page
%     — starts on new page automatically
%   \\chapter*{Title}
%     — unnumbered chapter
%     — PDF: no "Chapter N" prefix, not in TOC
%     — USE: for Acknowledgements, Abbreviations
%   \\chapter[Short]{Very Long Chapter Title}
%     — short title for TOC and page headers
%     — PDF: full title in body, short in TOC
% TIP: In book class, chapters start on right-hand
%      (odd) pages by default.
% =============================================

\\chapter*{Acknowledgements}
% Unnumbered — add to TOC manually:
\\addcontentsline{toc}{chapter}{Acknowledgements}
The author thanks ICAR for funding this research.

% =============================================
% COMMAND 45: \\input{file}
% Purpose : Inserts content of another .tex file
%           inline. No page break added.
% =============================================
% OPTIONS:
%   \\input{chapters/intro_background}
%     — inline paste of file content
%     — PDF: content flows continuously, no page break
%   \\input{sections/methods_part1}
%     — can be nested (input inside input)
%     — PDF: seamless content insertion
% RULES:
%   - Don't add .tex extension
%   - Included file should NOT have
%     \\documentclass or \\begin{document}
%   - Can be nested (\\input inside \\input)
%   - Does NOT work with \\includeonly
% USE: For sections within a chapter.
% =============================================

\\chapter{Introduction}
% \\input for sections within a chapter (no page break)
\\input{chapters/intro_background}
\\input{chapters/intro_objectives}

% =============================================
% COMMAND 46: \\include{file}
% Purpose : Includes a file with \\clearpage
%           before and after. Use for chapters.
% =============================================
% OPTIONS:
%   \\include{chapters/review}
%     — chapter-level include
%     — PDF: starts on new page (\\clearpage added)
%     — gets its own .aux file for cross-refs
%     — works with \\includeonly for selective compile
%   \\include{chapters/results}
%     — each \\include = separate compilation unit
% RULES:
%   - Don't add .tex extension
%   - CANNOT be nested (no \\include inside \\include)
%   - Included file should NOT have
%     \\documentclass or \\begin{document}
%   - Always adds \\clearpage before and after
% USE: For full chapters in a thesis.
%
% \\input vs \\include COMPARISON:
%   \\input:   inline, no page break, nestable,
%              no \\includeonly support
%   \\include: page break, own .aux file,
%              \\includeonly support, not nestable
% =============================================

% \\include for full chapters (page break before/after)
\\include{chapters/review}
\\include{chapters/materials}
\\include{chapters/results}
\\include{chapters/discussion}

\\chapter{Summary and Conclusions}
The integrated application of FYM and vermicompost
significantly improved soil organic carbon and
rice grain yield over three seasons.

% =============================================
% COMMAND 49: \\appendix
% Purpose : Switches numbering from numbers to
%           letters. All subsequent \\chapter or
%           \\section become A, B, C, etc.
% =============================================
% OPTIONS:
%   \\appendix + \\chapter{Data}
%     — in report/book class
%     — PDF: "Appendix A: Data" — auto-lettered
%   \\appendix + \\section{Tables}
%     — in article class
%     — PDF: "A Tables" — sections become A, B, C
% RULES:
%   - Place ONCE before the first appendix
%   - All subsequent headings use letters
%   - Figures/tables restart numbering: A.1, A.2
% USE: Raw data, questionnaires, code listings,
%      supplementary material.
% =============================================
\\appendix

\\chapter{Raw Data Tables}
% This becomes "Appendix A: Raw Data Tables"
Complete plot-wise yield data for all three seasons.

\\chapter{Questionnaire}
% This becomes "Appendix B: Questionnaire"
Farmer survey instrument used in the study.

\\chapter{R Code}
% This becomes "Appendix C: R Code"
Statistical analysis scripts.

\\end{document}

% ============================================
% PROJECT FOLDER STRUCTURE:
% ============================================
% thesis/
%   main.tex                (this file — compile this)
%   chapters/
%     intro_background.tex  (\\input — no preamble needed)
%     intro_objectives.tex  (\\input — no preamble needed)
%     review.tex            (\\include — no preamble needed)
%     materials.tex         (\\include)
%     results.tex           (\\include)
%     discussion.tex        (\\include)
%   references.bib          (BibTeX database)
%   figures/
%     yield_graph.png       (images go here)
%     soil_map.pdf
%
% IMPORTANT: Files used with \\input and \\include
% should contain ONLY content (sections, text, etc.)
% They should NOT contain:
%   - \\documentclass
%   - \\begin{document} / \\end{document}
%   - \\usepackage (put all packages in main.tex)
% ============================================`,
        commands: [
            {
                id: 45,
                command: "\\input{file}",
                syntax: "\\input{chapters/chapter1}",
                description: "Inserts content of another .tex file inline. No page break.",
                tip: "Use for sections within a chapter. Can be nested. Don't add .tex extension.",
                options: [
                    { option: "\\input{file}", impact: "Inline paste", pdfImpact: "Content flows continuously — no page break." },
                ]
            },
            {
                id: 46,
                command: "\\include{file}",
                syntax: "\\include{chapters/intro}",
                description: "Includes a file with \\clearpage before and after. Use for chapters.",
                tip: "Works with \\includeonly for selective compilation. Cannot be nested.",
                options: [
                    { option: "\\include{file}", impact: "Chapter-level include", pdfImpact: "Starts on new page. Gets own .aux file." },
                ]
            },
            {
                id: 47,
                command: "\\includeonly{...}",
                syntax: "\\includeonly{chapters/results}",
                description: "Compile only specific chapters. Cross-references still work.",
                tip: "Place in preamble. Comment out for final full compilation. Huge time saver.",
                options: [
                    { option: "\\includeonly{ch1, ch3}", impact: "Selective compile", pdfImpact: "Only ch1 and ch3 compile. 10x faster for large theses." },
                ]
            },
            {
                id: 48,
                command: "\\tableofcontents",
                syntax: "\\tableofcontents",
                description: "Auto-generates Table of Contents from section/chapter headings.",
                tip: "Compile twice to populate. Control depth with \\setcounter{tocdepth}{2}.",
                options: [
                    { option: "\\tableofcontents", impact: "Full TOC", pdfImpact: "Page with all headings, numbers, and page numbers." },
                    { option: "tocdepth=1", impact: "Sections only", pdfImpact: "TOC shows only chapters and sections." },
                ]
            },
            {
                id: 49,
                command: "\\appendix",
                syntax: "\\appendix",
                description: "Switches numbering to letters. All subsequent sections become A, B, C.",
                tip: "Place once before first appendix. Use for raw data, questionnaires, code.",
                options: [
                    { option: "\\appendix + \\chapter{Data}", impact: "Appendix A", pdfImpact: "'Appendix A: Data' — auto-lettered." },
                    { option: "\\appendix + \\section{Tables}", impact: "Section A", pdfImpact: "In article class: 'A Tables'." },
                ]
            },
            {
                id: 50,
                command: "\\chapter{...}",
                syntax: "\\chapter{Introduction}",
                description: "Top-level heading. Only in report and book classes.",
                tip: "Starts on a new page automatically. Use \\chapter*{} for unnumbered.",
                options: [
                    { option: "\\chapter{Title}", impact: "Numbered chapter", pdfImpact: "'Chapter 1: Introduction' on new page." },
                    { option: "\\chapter*{Title}", impact: "Unnumbered", pdfImpact: "No number, not in TOC by default." },
                ]
            },
        ]
    },
];

const TOTAL_COMMANDS = COMMAND_MODULES.reduce((sum, m) => sum + m.commands.length, 0);
const MINUTES_PER_COMMAND = 5;
const TOTAL_ESTIMATED_MINUTES = TOTAL_COMMANDS * MINUTES_PER_COMMAND;

function formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatMinutes(mins: number): string {
    const h = Math.floor(mins / 60);
    const m = Math.round(mins % 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
}

export function CommandReferenceView() {
    const [expandedCmd, setExpandedCmd] = useState<number | null>(null);
    const [coveredCommands, setCoveredCommands] = useState<Set<number>>(new Set());
    const [activeModule, setActiveModule] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"all" | "module">("all");
    const [expandedSample, setExpandedSample] = useState<Set<string>>(new Set());
    const [copiedModule, setCopiedModule] = useState<string | null>(null);

    // Timer state
    const [systemTime, setSystemTime] = useState(new Date());
    const [sessionRunning, setSessionRunning] = useState(false);
    const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [pausedElapsed, setPausedElapsed] = useState(0);

    const coveredCount = coveredCommands.size;
    const progress = (coveredCount / TOTAL_COMMANDS) * 100;

    // System clock — ticks every second
    useEffect(() => {
        const interval = setInterval(() => setSystemTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    // Session timer — ticks every second when running
    useEffect(() => {
        if (!sessionRunning || !sessionStartTime) return;
        const interval = setInterval(() => {
            setElapsedSeconds(pausedElapsed + Math.floor((Date.now() - sessionStartTime) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, [sessionRunning, sessionStartTime, pausedElapsed]);

    const startSession = useCallback(() => {
        setSessionStartTime(Date.now());
        setSessionRunning(true);
    }, []);

    const pauseSession = useCallback(() => {
        setPausedElapsed(elapsedSeconds);
        setSessionRunning(false);
        setSessionStartTime(null);
    }, [elapsedSeconds]);

    const resetSession = useCallback(() => {
        setSessionRunning(false);
        setSessionStartTime(null);
        setElapsedSeconds(0);
        setPausedElapsed(0);
    }, []);

    const toggleSample = (modId: string) => {
        setExpandedSample(prev => {
            const next = new Set(prev);
            if (next.has(modId)) next.delete(modId);
            else next.add(modId);
            return next;
        });
    };

    const copyTexCode = async (modId: string, code: string) => {
        await navigator.clipboard.writeText(code);
        setCopiedModule(modId);
        setTimeout(() => setCopiedModule(null), 2000);
    };

    // Time calculations
    const remainingCommands = TOTAL_COMMANDS - coveredCount;
    const estimatedRemainingMins = remainingCommands * MINUTES_PER_COMMAND;
    const elapsedMinutes = elapsedSeconds / 60;
    const expectedCoveredByNow = Math.floor(elapsedMinutes / MINUTES_PER_COMMAND);
    const avgMinutesPerCommand = coveredCount > 0 ? elapsedMinutes / coveredCount : 0;
    const projectedTotalMins = coveredCount > 0 ? avgMinutesPerCommand * TOTAL_COMMANDS : TOTAL_ESTIMATED_MINUTES;
    const isRunningBehind = sessionRunning && coveredCount > 0 && avgMinutesPerCommand > MINUTES_PER_COMMAND * 1.2;
    const isRunningCritical = sessionRunning && coveredCount > 0 && avgMinutesPerCommand > MINUTES_PER_COMMAND * 1.5;
    const estimatedEndTime = sessionRunning && sessionStartTime
        ? new Date(Date.now() + estimatedRemainingMins * 60 * 1000)
        : null;

    const toggleCovered = (id: number) => {
        setCoveredCommands(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const filteredModules = activeModule
        ? COMMAND_MODULES.filter(m => m.id === activeModule)
        : COMMAND_MODULES;

    const markAllInModule = (moduleId: string) => {
        const mod = COMMAND_MODULES.find(m => m.id === moduleId);
        if (!mod) return;
        setCoveredCommands(prev => {
            const next = new Set(prev);
            const allCovered = mod.commands.every(c => next.has(c.id));
            mod.commands.forEach(c => {
                if (allCovered) next.delete(c.id);
                else next.add(c.id);
            });
            return next;
        });
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Sticky Timer Bar — Always visible on projector */}
            <div className={cn(
                "sticky top-16 z-30 rounded-2xl p-4 shadow-xl border-2 transition-all",
                isRunningCritical ? "bg-red-50 border-red-300 animate-pulse" :
                    isRunningBehind ? "bg-amber-50 border-amber-300" :
                        "bg-white border-slate-200"
            )}>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    {/* System Clock */}
                    <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-slate-400" />
                        <div>
                            <p className="text-2xl font-extrabold tabular-nums tracking-tight">
                                {systemTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })}
                            </p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">System Time</p>
                        </div>
                    </div>

                    {/* Session Timer Controls */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            {!sessionRunning ? (
                                <button
                                    onClick={startSession}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-sm transition-colors shadow-md"
                                >
                                    <Play className="w-4 h-4" /> {elapsedSeconds > 0 ? "Resume" : "Start Session"}
                                </button>
                            ) : (
                                <button
                                    onClick={pauseSession}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-sm transition-colors shadow-md"
                                >
                                    <Pause className="w-4 h-4" /> Pause
                                </button>
                            )}
                            {elapsedSeconds > 0 && (
                                <button
                                    onClick={resetSession}
                                    className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors"
                                    title="Reset timer"
                                >
                                    <RotateCcw className="w-4 h-4 text-slate-400" />
                                </button>
                            )}
                        </div>
                        <div className="h-8 w-px bg-slate-200" />
                        <div className="text-center">
                            <p className={cn("text-2xl font-extrabold tabular-nums", sessionRunning ? "text-slate-900" : "text-slate-400")}>
                                {formatTime(elapsedSeconds)}
                            </p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Elapsed</p>
                        </div>
                    </div>

                    {/* Pace Indicator */}
                    <div className="flex items-center gap-4">
                        {sessionRunning && coveredCount > 0 && (
                            <div className={cn(
                                "text-center px-4 py-2 rounded-xl border-2",
                                isRunningCritical ? "bg-red-100 border-red-300" :
                                    isRunningBehind ? "bg-amber-100 border-amber-300" :
                                        "bg-green-100 border-green-300"
                            )}>
                                <p className={cn(
                                    "text-lg font-extrabold tabular-nums",
                                    isRunningCritical ? "text-red-700" :
                                        isRunningBehind ? "text-amber-700" :
                                            "text-green-700"
                                )}>
                                    {avgMinutesPerCommand.toFixed(1)}m
                                </p>
                                <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Avg/Cmd</p>
                            </div>
                        )}
                        <div className="text-center">
                            <p className="text-lg font-extrabold tabular-nums text-slate-700">
                                {formatMinutes(estimatedRemainingMins)}
                            </p>
                            <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Est. Remaining</p>
                        </div>
                        {estimatedEndTime && (
                            <div className="text-center">
                                <p className="text-lg font-extrabold tabular-nums text-slate-700">
                                    {estimatedEndTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}
                                </p>
                                <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Est. End</p>
                            </div>
                        )}
                    </div>

                    {/* Behind Schedule Alert */}
                    {isRunningBehind && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm",
                                isRunningCritical
                                    ? "bg-red-500 text-white shadow-lg animate-pulse"
                                    : "bg-amber-500 text-white shadow-md"
                            )}
                        >
                            {isRunningCritical ? <Bell className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                            {isRunningCritical ? "BEHIND SCHEDULE" : "Pace Slowing"}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Header — Large for projector */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl text-white shadow-xl">
                        <Hash className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight outfit-font">LaTeX Command Reference</h1>
                        <p className="text-lg text-muted-foreground mt-1">
                            All {TOTAL_COMMANDS} commands across {COMMAND_MODULES.length} modules — {MINUTES_PER_COMMAND} min/command — Total: {formatMinutes(TOTAL_ESTIMATED_MINUTES)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Progress Section — Prominent for projector */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl space-y-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Monitor className="w-6 h-6 text-blue-400" />
                        <div>
                            <h2 className="text-2xl font-bold">Workshop Progress</h2>
                            <p className="text-sm text-slate-400">Click commands to mark as covered during the session</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-4xl font-extrabold tabular-nums">{coveredCount}<span className="text-slate-500">/{TOTAL_COMMANDS}</span></div>
                        <p className="text-xs text-slate-400 uppercase tracking-widest">Commands Covered</p>
                    </div>
                </div>

                {/* Main progress bar */}
                <div className="space-y-2">
                    <div className="h-5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            className={cn(
                                "h-full rounded-full transition-all",
                                progress === 100 ? "bg-gradient-to-r from-green-400 to-emerald-400" :
                                    progress >= 50 ? "bg-gradient-to-r from-blue-400 to-cyan-400" :
                                        "bg-gradient-to-r from-amber-400 to-orange-400"
                            )}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                        <span>0%</span>
                        <span className="text-lg font-bold text-white">{Math.round(progress)}%</span>
                        <span>100%</span>
                    </div>
                </div>

                {/* Per-module mini progress */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-700">
                    <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                        <Timer className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                        <p className="text-xl font-extrabold tabular-nums">{MINUTES_PER_COMMAND} min</p>
                        <p className="text-[9px] text-slate-400 uppercase tracking-widest">Per Command</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                        <Clock className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                        <p className="text-xl font-extrabold tabular-nums">{formatMinutes(TOTAL_ESTIMATED_MINUTES)}</p>
                        <p className="text-[9px] text-slate-400 uppercase tracking-widest">Total Estimated</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                        <p className="text-xl font-extrabold tabular-nums">{formatMinutes(estimatedRemainingMins)}</p>
                        <p className="text-[9px] text-slate-400 uppercase tracking-widest">Time Remaining</p>
                    </div>
                    <div className={cn(
                        "rounded-xl p-3 text-center",
                        isRunningCritical ? "bg-red-500/20 ring-1 ring-red-400" :
                            isRunningBehind ? "bg-amber-500/20 ring-1 ring-amber-400" :
                                "bg-slate-800/50"
                    )}>
                        <p className={cn(
                            "text-xl font-extrabold tabular-nums",
                            isRunningCritical ? "text-red-400" :
                                isRunningBehind ? "text-amber-400" :
                                    "text-white"
                        )}>
                            {coveredCount > 0 ? `${avgMinutesPerCommand.toFixed(1)}m` : "—"}
                        </p>
                        <p className="text-[9px] text-slate-400 uppercase tracking-widest">Actual Avg/Cmd</p>
                    </div>
                </div>

                {/* Per-module mini progress */}
                <div className="grid grid-cols-3 lg:grid-cols-7 gap-3">
                    {COMMAND_MODULES.map(mod => {
                        const modCovered = mod.commands.filter(c => coveredCommands.has(c.id)).length;
                        const modTotal = mod.commands.length;
                        const modPct = modTotal > 0 ? (modCovered / modTotal) * 100 : 0;
                        return (
                            <button
                                key={mod.id}
                                onClick={() => setActiveModule(activeModule === mod.id ? null : mod.id)}
                                className={cn(
                                    "rounded-xl p-3 text-left transition-all border",
                                    activeModule === mod.id
                                        ? "bg-white/10 border-white/30 ring-2 ring-white/20"
                                        : "bg-slate-800/50 border-slate-700 hover:bg-slate-800"
                                )}
                            >
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest">M{mod.number}</p>
                                <p className="text-sm font-bold truncate">{mod.title}</p>
                                <div className="h-1.5 bg-slate-700 rounded-full mt-2 overflow-hidden">
                                    <div
                                        className={cn("h-full rounded-full transition-all", modPct === 100 ? "bg-green-400" : "bg-blue-400")}
                                        style={{ width: `${modPct}%` }}
                                    />
                                </div>
                                <p className="text-[10px] text-slate-500 mt-1">{modCovered}/{modTotal}</p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Module Filter Chips */}
            <div className="flex items-center gap-2 flex-wrap">
                <button
                    onClick={() => setActiveModule(null)}
                    className={cn(
                        "px-5 py-3 rounded-xl text-sm font-bold transition-all border-2",
                        !activeModule ? "bg-slate-900 text-white border-slate-900 shadow-lg" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                    )}
                >
                    All Modules
                </button>
                {COMMAND_MODULES.map(mod => (
                    <button
                        key={mod.id}
                        onClick={() => setActiveModule(activeModule === mod.id ? null : mod.id)}
                        className={cn(
                            "px-4 py-3 rounded-xl text-sm font-bold transition-all border-2",
                            activeModule === mod.id
                                ? `${mod.bgColor} ${mod.borderColor} ${mod.color} shadow-md`
                                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                        )}
                    >
                        M{mod.number}
                    </button>
                ))}
            </div>

            {/* Command Cards — Large, projector-friendly */}
            <div className="space-y-10">
                {filteredModules.map(mod => {
                    const modCovered = mod.commands.filter(c => coveredCommands.has(c.id)).length;
                    const allModCovered = modCovered === mod.commands.length;
                    return (
                        <div key={mod.id} className="space-y-4">
                            {/* Module Header */}
                            <div className={cn("flex items-center justify-between p-5 rounded-2xl border-2", mod.bgColor, mod.borderColor)}>
                                <div className="flex items-center gap-4">
                                    <div className={cn("p-3 rounded-xl text-white bg-gradient-to-br shadow-lg",
                                        mod.number <= 3 ? "from-blue-500 to-blue-700" :
                                            mod.number <= 5 ? "from-purple-500 to-purple-700" :
                                                mod.number <= 7 ? "from-teal-500 to-teal-700" :
                                                    "from-rose-500 to-rose-700"
                                    )}>
                                        {mod.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Module {mod.number}</p>
                                        <h2 className="text-2xl lg:text-3xl font-extrabold">{mod.title}</h2>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={cn("text-sm font-bold px-4 py-2 rounded-full",
                                        allModCovered ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
                                    )}>
                                        {modCovered}/{mod.commands.length} covered
                                    </span>
                                    <span className="text-xs font-bold px-3 py-2 rounded-full bg-blue-50 text-blue-700 flex items-center gap-1">
                                        <Timer className="w-3 h-3" />
                                        {formatMinutes(mod.commands.length * MINUTES_PER_COMMAND)}
                                    </span>
                                    <button
                                        onClick={() => markAllInModule(mod.id)}
                                        className="text-xs font-bold px-3 py-2 rounded-lg bg-white border hover:bg-slate-50 transition-colors"
                                    >
                                        {allModCovered ? "Unmark All" : "Mark All"}
                                    </button>
                                </div>
                            </div>

                            {/* Sample .tex Environment */}
                            <div className={cn("rounded-2xl border-2 overflow-hidden transition-all", mod.borderColor)}>
                                <button
                                    onClick={() => toggleSample(mod.id)}
                                    className={cn(
                                        "w-full flex items-center justify-between p-4 transition-colors",
                                        expandedSample.has(mod.id) ? `${mod.bgColor}` : "bg-white hover:bg-slate-50"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <Code2 className={cn("w-5 h-5", mod.color)} />
                                        <span className="font-bold text-sm">Sample .tex — All M{mod.number} Commands with Options</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-muted-foreground">{mod.commands.length} commands covered</span>
                                        {expandedSample.has(mod.id) ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {expandedSample.has(mod.id) && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="relative">
                                                <button
                                                    onClick={() => copyTexCode(mod.id, mod.sampleTex)}
                                                    className={cn(
                                                        "absolute top-3 right-3 z-10 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg",
                                                        copiedModule === mod.id
                                                            ? "bg-green-500 text-white"
                                                            : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                                                    )}
                                                >
                                                    {copiedModule === mod.id ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy .tex</>}
                                                </button>
                                                <pre className="bg-slate-900 text-green-400 p-5 pt-14 text-xs leading-relaxed font-mono overflow-x-auto max-h-[500px] overflow-y-auto">
                                                    <code>{mod.sampleTex}</code>
                                                </pre>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Commands Grid */}
                            <div className="grid lg:grid-cols-2 gap-4">
                                {mod.commands.map(cmd => {
                                    const isCovered = coveredCommands.has(cmd.id);
                                    const isExpanded = expandedCmd === cmd.id;
                                    return (
                                        <div
                                            key={cmd.id}
                                            className={cn(
                                                "rounded-2xl border-2 overflow-hidden transition-all shadow-sm",
                                                isCovered ? "border-green-300 bg-green-50/50" : "border-slate-200 bg-white",
                                                isExpanded && "ring-2 ring-primary/30 shadow-lg"
                                            )}
                                        >
                                            {/* Command Header */}
                                            <div className="p-5 flex items-start gap-4">
                                                {/* Sequence Number */}
                                                <button
                                                    onClick={() => toggleCovered(cmd.id)}
                                                    className={cn(
                                                        "w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-lg shrink-0 transition-all",
                                                        isCovered
                                                            ? "bg-green-500 text-white shadow-md"
                                                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                                    )}
                                                    title={isCovered ? "Mark as not covered" : "Mark as covered"}
                                                >
                                                    {isCovered ? <CheckCircle className="w-6 h-6" /> : cmd.id}
                                                </button>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <code className="text-lg lg:text-xl font-bold font-mono text-slate-900">{cmd.command}</code>
                                                        {isCovered && (
                                                            <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">COVERED</span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mt-1">{cmd.description}</p>

                                                    {/* Syntax */}
                                                    <div className="bg-slate-900 rounded-xl p-3 mt-3 font-mono text-sm text-green-400 overflow-x-auto">
                                                        <code>{cmd.syntax}</code>
                                                    </div>

                                                    {/* Tip */}
                                                    <div className="flex items-start gap-2 mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
                                                        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                                        <p className="text-xs text-amber-800 font-medium">{cmd.tip}</p>
                                                    </div>
                                                </div>

                                                {/* Expand toggle */}
                                                <button
                                                    onClick={() => setExpandedCmd(isExpanded ? null : cmd.id)}
                                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
                                                    title="Show options & PDF impact"
                                                >
                                                    {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                                                </button>
                                            </div>

                                            {/* Expanded: Options & PDF Impact */}
                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-5 pb-5 pt-0">
                                                            <div className="border-t pt-4 space-y-2">
                                                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                                                    <Settings className="w-3.5 h-3.5" /> Options & PDF Impact
                                                                </p>
                                                                <div className="space-y-2">
                                                                    {cmd.options.map((opt, i) => (
                                                                        <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                                                                            <code className="text-xs font-mono bg-white border px-2 py-1 rounded-lg shrink-0 text-slate-700 max-w-[200px] break-all">{opt.option}</code>
                                                                            <div className="flex-1 min-w-0">
                                                                                <p className="text-xs font-bold text-slate-700">{opt.impact}</p>
                                                                                <p className="text-xs text-slate-500 mt-0.5 flex items-start gap-1">
                                                                                    <Eye className="w-3 h-3 shrink-0 mt-0.5 text-blue-400" />
                                                                                    {opt.pdfImpact}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Completion Banner */}
            <AnimatePresence>
                {coveredCount === TOTAL_COMMANDS && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-10 text-center text-white shadow-2xl"
                    >
                        <Zap className="w-12 h-12 mx-auto mb-4" />
                        <h2 className="text-3xl font-extrabold">All {TOTAL_COMMANDS} Commands Covered!</h2>
                        <p className="text-lg opacity-90 mt-2">The workshop has covered every LaTeX command across all modules. Scholars are ready for independent research writing.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
