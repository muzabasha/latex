"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Hash, ChevronDown, ChevronUp, CheckCircle, Circle,
    BookOpen, Zap, Monitor, ArrowRight, ArrowLeft,
    Lightbulb, Eye, FileText, Type, Sigma, Table,
    Image as ImageIcon, FolderTree, Quote, Settings
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

export function CommandReferenceView() {
    const [expandedCmd, setExpandedCmd] = useState<number | null>(null);
    const [coveredCommands, setCoveredCommands] = useState<Set<number>>(new Set());
    const [activeModule, setActiveModule] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"all" | "module">("all");

    const coveredCount = coveredCommands.size;
    const progress = (coveredCount / TOTAL_COMMANDS) * 100;

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
            {/* Header — Large for projector */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl text-white shadow-xl">
                        <Hash className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight outfit-font">LaTeX Command Reference</h1>
                        <p className="text-lg text-muted-foreground mt-1">
                            All {TOTAL_COMMANDS} commands across {COMMAND_MODULES.length} modules — sequentially numbered for workshop tracking
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
                                    <button
                                        onClick={() => markAllInModule(mod.id)}
                                        className="text-xs font-bold px-3 py-2 rounded-lg bg-white border hover:bg-slate-50 transition-colors"
                                    >
                                        {allModCovered ? "Unmark All" : "Mark All"}
                                    </button>
                                </div>
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
