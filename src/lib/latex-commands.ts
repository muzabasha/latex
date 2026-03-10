
export const LATEX_COMMAND_DATA = {
    "session-1-intro": [
        {
            name: "\\documentclass",
            syntax: "\\documentclass{article}",
            description: "Defines the type of document you are creating.",
            guidelines: [
                "Always place this as the very first line of your .tex file.",
                "Choose the class based on your target: 'article' for journal papers, 'report' for thesis/dissertations, 'book' for textbooks.",
                "Combine multiple options in square brackets: \\documentclass[12pt,a4paper,twocolumn]{article}.",
                "For ICAR/university submissions, check the required class — some journals provide their own .cls file."
            ],
            options: [
                {
                    name: "[11pt]",
                    description: "Sets font size to 11 points.",
                    impact: "[11pt]",
                    pdfImpact: "All body text, headings, and captions render at 11pt base size. Slightly larger than default 10pt — easier to read in printed copies.",
                    whenToUse: "When the journal or university guidelines specify 11pt, or when you want a comfortable reading size for draft reviews."
                },
                {
                    name: "[12pt]",
                    description: "Sets font size to 12 points.",
                    impact: "[12pt]",
                    pdfImpact: "Largest standard base size. All text scales up proportionally — headings become noticeably bigger. Page count increases by ~20% compared to 10pt.",
                    whenToUse: "Most thesis/dissertation guidelines (UGC, ICAR) require 12pt. Use this as your default for academic submissions."
                },
                {
                    name: "[twocolumn]",
                    description: "Splits the page into two columns.",
                    impact: "[twocolumn]",
                    pdfImpact: "The PDF page splits into two equal-width columns with a gap in the middle. Figures and tables may need [t] or [p] placement to avoid overflow.",
                    whenToUse: "Required by many agriculture journals (e.g., Journal of Agricultural Science). Avoid for thesis — use single column there."
                },
                {
                    name: "[a4paper]",
                    description: "Sets paper size to A4 standard.",
                    impact: "[a4paper]",
                    pdfImpact: "PDF dimensions become 210mm × 297mm (A4). Without this, LaTeX defaults to US Letter (shorter and wider), which can cause margin misalignment when printed on A4.",
                    whenToUse: "Always use for Indian/European submissions. US Letter is only needed for American journals."
                },
                {
                    name: "[landscape]",
                    description: "Changes page orientation to landscape.",
                    impact: "[landscape]",
                    pdfImpact: "The entire PDF rotates to landscape (wider than tall). All margins, headers, and footers adjust accordingly.",
                    whenToUse: "Rarely used for full documents. Better to use the 'lscape' package for individual landscape pages containing wide tables."
                }
            ],
            example: "The blueprint of your paper.",
            preview: "Hello Agriculture Scholars!"
        },
        {
            name: "\\usepackage",
            syntax: "\\usepackage{graphicx}",
            description: "Imports external libraries (plugins) for extra features.",
            guidelines: [
                "Place all \\usepackage commands in the preamble (between \\documentclass and \\begin{document}).",
                "Order matters: load 'hyperref' last to avoid conflicts with other packages.",
                "Don't load packages you don't use — each one adds compilation time.",
                "If you get 'Option clash' errors, it means two packages are fighting. Load the conflicting option only once."
            ],
            options: [
                {
                    name: "{amsmath}",
                    description: "For complex mathematical equations.",
                    impact: "{amsmath}",
                    pdfImpact: "Enables advanced math environments (align, gather, cases). Equations render with better spacing and professional alignment in the PDF.",
                    whenToUse: "Essential for any paper with statistics, formulas, or multi-line equations. Load it by default for agriculture research papers."
                },
                {
                    name: "{biblatex}",
                    description: "For advanced reference management.",
                    impact: "{biblatex}",
                    pdfImpact: "Citations appear in the style you choose (numeric, author-year, etc.). The bibliography section auto-generates with consistent formatting.",
                    whenToUse: "Use when you need author-year citations (APA style) or advanced filtering. For simple numeric citations, basic BibTeX may suffice."
                },
                {
                    name: "{hyperref}",
                    description: "Adds clickable links to your PDF.",
                    impact: "{hyperref}",
                    pdfImpact: "All cross-references (\\ref, \\cite, TOC entries) become clickable blue links in the PDF. URLs become active hyperlinks.",
                    whenToUse: "Always include for digital submissions. Add [hidelinks] option to remove colored boxes for print versions."
                },
                {
                    name: "{geometry}",
                    description: "Allows manual margin adjustments.",
                    impact: "{geometry}",
                    pdfImpact: "Overrides default margins. For example, \\usepackage[margin=1in]{geometry} sets all four margins to exactly 1 inch in the PDF.",
                    whenToUse: "When your university specifies exact margins (e.g., left=1.5in for binding). Without this, LaTeX uses its own calculated margins."
                }
            ],
            example: "Adding tools to your kitchen.",
            preview: "Advanced Features Loaded"
        }
    ],
    "session-1-first-doc": [
        {
            name: "\\maketitle",
            syntax: "\\maketitle",
            description: "Generates the title block based on your metadata.",
            guidelines: [
                "Define \\title, \\author, and \\date in the preamble BEFORE \\begin{document}.",
                "Place \\maketitle immediately after \\begin{document} — it must be inside the document body.",
                "Use \\date{} (empty braces) to suppress the date entirely.",
                "For multiple authors, separate with \\and: \\author{Dr. A \\and Dr. B}."
            ],
            options: [
                {
                    name: "\\title{...}",
                    description: "Sets the paper title.",
                    impact: "\\title",
                    pdfImpact: "The title appears centered, in a larger bold font at the top of the first page. In 'report' class, it gets its own dedicated title page.",
                    whenToUse: "Always required. Keep it concise (under 15 words for journals). Use Title Case for agriculture papers."
                },
                {
                    name: "\\author{...}",
                    description: "Sets the author name.",
                    impact: "\\author",
                    pdfImpact: "Author name(s) appear centered below the title in a slightly smaller font. Multiple authors are separated by commas or listed vertically.",
                    whenToUse: "Always required. Add affiliations using \\thanks{} for footnotes, e.g., \\author{Dr. Sharma\\thanks{IARI, New Delhi}}."
                },
                {
                    name: "\\date{...}",
                    description: "Sets the publication date.",
                    impact: "\\date",
                    pdfImpact: "Date appears centered below the author name. If omitted, LaTeX auto-inserts today's date. \\date{} with empty braces removes it entirely.",
                    whenToUse: "Use \\date{\\today} for drafts. Use a fixed date for final submissions. Use \\date{} to hide it when the journal handles dates."
                }
            ],
            example: "\\title{Soil Analysis}\n\\author{Dr. Smith}\n\\maketitle",
            preview: "Soil Analysis by Dr. Smith"
        }
    ],
    "session-1-formatting": [
        {
            name: "\\section",
            syntax: "\\section{Background}",
            description: "Creates a numbered main heading.",
            guidelines: [
                "LaTeX auto-numbers sections sequentially (1, 2, 3...). Never manually type numbers.",
                "Use the hierarchy: \\section → \\subsection → \\subsubsection. Don't skip levels.",
                "Section titles appear in the Table of Contents automatically.",
                "For unnumbered sections (Abstract, Acknowledgements), use the starred variant \\section*{}."
            ],
            options: [
                {
                    name: "\\section*{...}",
                    description: "Creates heading without a number.",
                    impact: "*",
                    pdfImpact: "The heading appears in the same bold, large font as a regular section BUT without any number prefix. It is also excluded from the Table of Contents.",
                    whenToUse: "Use for Abstract, Acknowledgements, and Dedication — sections that shouldn't be numbered per academic convention."
                },
                {
                    name: "\\subsection{...}",
                    description: "Creates a secondary heading.",
                    impact: "sub",
                    pdfImpact: "Renders as a slightly smaller bold heading with two-level numbering (e.g., 2.1, 2.2). Indentation and spacing are handled automatically.",
                    whenToUse: "Use to break a section into logical parts. E.g., under 'Methodology', have 'Soil Sampling' and 'Data Analysis' as subsections."
                },
                {
                    name: "\\subsubsection{...}",
                    description: "Creates a tertiary heading.",
                    impact: "subsub",
                    pdfImpact: "Renders with three-level numbering (e.g., 2.1.1). Font is smaller than subsection, often italic or run-in depending on the document class.",
                    whenToUse: "Use sparingly. If you need this level, your document is detailed enough. Going deeper (\\paragraph) is rarely needed in agriculture papers."
                }
            ],
            example: "The spine of your manuscript.",
            preview: "1. Background of Study"
        },
        {
            name: "\\textbf",
            syntax: "\\textbf{Bold Text}",
            description: "Applies bold formatting to the text.",
            guidelines: [
                "Use bold for structural emphasis: keywords, definitions, important terms.",
                "Don't overuse bold — if everything is bold, nothing stands out.",
                "For semantic emphasis (meaning-based), prefer \\emph{} which toggles between italic and upright.",
                "Bold and italic can be combined: \\textbf{\\textit{bold italic text}}."
            ],
            options: [
                {
                    name: "\\textit{...}",
                    description: "Applies italic formatting.",
                    impact: "it",
                    pdfImpact: "Text renders in a slanted italic typeface. Used extensively in scientific writing for species names, variables, and foreign terms.",
                    whenToUse: "Required for taxonomic names (e.g., \\textit{Triticum aestivum}), mathematical variables in text, book titles, and Latin phrases (et al., in vitro)."
                },
                {
                    name: "\\underline{...}",
                    description: "Underlines the text.",
                    impact: "underline",
                    pdfImpact: "A horizontal line appears directly below the text. It does NOT break across lines — long underlined text may overflow the margin.",
                    whenToUse: "Rarely used in modern academic writing. Journals prefer bold or italic. Use only if specifically required by your institution's format."
                },
                {
                    name: "\\texttt{...}",
                    description: "Monospaced (Typewriter) font.",
                    impact: "tt",
                    pdfImpact: "Text renders in a fixed-width font (like Courier). Each character occupies the same horizontal space, making it visually distinct from body text.",
                    whenToUse: "Use for code snippets, file names, URLs, software names, or command-line instructions within your paper."
                }
            ],
            example: "For emphasis and keywords.",
            preview: "Research Importance"
        }
    ],
    "session-1-math": [
        {
            name: "\\begin{equation}",
            syntax: "\\begin{equation}\n  E = mc^2\n\\end{equation}",
            description: "Creates a numbered mathematical equation.",
            guidelines: [
                "Use numbered equations only when you need to reference them later with \\ref{} or \\eqref{}.",
                "For throwaway/intermediate equations, use the starred version or \\[ ... \\] to save numbering.",
                "Always add a \\label{eq:name} right after \\begin{equation} for cross-referencing.",
                "The amsmath package is required for advanced environments like align, gather, and cases."
            ],
            options: [
                {
                    name: "\\begin{equation*}",
                    description: "Removes equation numbering.",
                    impact: "*",
                    pdfImpact: "The equation appears centered on its own line with vertical spacing, but NO number (like '(1)') appears on the right margin.",
                    whenToUse: "Use for equations you won't reference elsewhere. Keeps the numbering sequence clean for important equations only."
                },
                {
                    name: "$...$",
                    description: "Inline math (within text).",
                    impact: "$",
                    pdfImpact: "Math symbols render within the text line without breaking the paragraph flow. Fractions and large operators are compressed to fit the line height.",
                    whenToUse: "Use for variables ($x$, $N$), short expressions ($p < 0.05$), and units within sentences. Avoid for complex fractions or summations."
                },
                {
                    name: "\\frac{a}{b}",
                    description: "Creates a fraction.",
                    impact: "frac",
                    pdfImpact: "In display mode: a full-size fraction with numerator above and denominator below a horizontal line. In inline mode: a compressed, smaller version.",
                    whenToUse: "Use in display math (\\[ \\]) for readability. For inline, prefer a/b notation to avoid squished fractions that are hard to read."
                },
                {
                    name: "\\sqrt{x}",
                    description: "Creates a square root.",
                    impact: "sqrt",
                    pdfImpact: "A radical symbol (√) with a horizontal bar extending over the entire content. For nth roots, use \\sqrt[n]{x} — the n appears in the crook of the radical.",
                    whenToUse: "Use for standard deviation formulas, distance calculations, or any root expression. Nest fractions inside: \\sqrt{\\frac{a}{b}}."
                }
            ],
            example: "Precision in every calculation.",
            preview: "E = mc² (1)"
        }
    ],
    "session-2-bibtex": [
        {
            name: "\\cite",
            syntax: "\\cite{farmer2024}",
            description: "Inserts a citation reference into the text.",
            guidelines: [
                "The key inside \\cite{} must exactly match a key in your .bib file — it's case-sensitive.",
                "Cite multiple sources at once: \\cite{key1, key2, key3} — LaTeX groups them automatically.",
                "If you see [?] in the PDF, run the compile cycle: pdflatex → bibtex → pdflatex → pdflatex.",
                "Use descriptive keys like 'sharma2024irrigation' instead of 'ref1' for maintainability."
            ],
            options: [
                {
                    name: "\\citep{...}",
                    description: "Parenthetical citation (Name, Year).",
                    impact: "p",
                    pdfImpact: "Renders as (Sharma, 2024) in the PDF — the entire citation is wrapped in parentheses. Used when the citation is not part of the sentence grammar.",
                    whenToUse: "Use at the end of a statement: 'Drip irrigation improves yield \\citep{sharma2024}.' Requires the natbib or biblatex package."
                },
                {
                    name: "\\citet{...}",
                    description: "Textual citation Name (Year).",
                    impact: "t",
                    pdfImpact: "Renders as Sharma (2024) — the author name is part of the sentence, with only the year in parentheses.",
                    whenToUse: "Use when the author is the subject: '\\citet{sharma2024} demonstrated that...' Requires natbib or biblatex package."
                },
                {
                    name: "\\nocite{*}",
                    description: "Includes all references from .bib.",
                    impact: "no",
                    pdfImpact: "Every entry in your .bib file appears in the bibliography section, even if not cited in the text. No visible change in the body text.",
                    whenToUse: "Use for annotated bibliographies or when a supervisor wants to see all references you consulted. Avoid in journal submissions."
                }
            ],
            example: "Connecting your work to science.",
            preview: "[Farmer, 2024]"
        }
    ],
    "session-2-tables-figures": [
        {
            name: "\\begin{table}",
            syntax: "\\begin{table}[h]\n  \\centering\n  ...\n\\end{table}",
            description: "Floats a table onto the page with placement control.",
            guidelines: [
                "Always wrap \\begin{tabular} inside \\begin{table} to get captions, labels, and float control.",
                "Place \\caption{} BEFORE \\label{} — the label needs the caption's counter to work correctly.",
                "Use \\centering (not the center environment) inside floats for proper spacing.",
                "If LaTeX moves your table far away, try [h!] or [H] (with the float package) to force placement."
            ],
            options: [
                {
                    name: "[h]",
                    description: "Place approximately here.",
                    impact: "[h]",
                    pdfImpact: "LaTeX tries to place the table near where it appears in the source code. If there isn't enough space on the current page, it may float to the next page.",
                    whenToUse: "Default choice for most tables. Combine with ! for stronger suggestion: [h!]. Use [H] (float package) for absolute 'here' placement."
                },
                {
                    name: "[t]",
                    description: "Place at the top of the page.",
                    impact: "[t]",
                    pdfImpact: "The table floats to the top of the current or next page. Body text fills in below it. Multiple [t] floats stack at the top.",
                    whenToUse: "Good for tables referenced early in a section. Common in two-column journal layouts where [h] often fails."
                },
                {
                    name: "[b]",
                    description: "Place at the bottom of the page.",
                    impact: "[b]",
                    pdfImpact: "The table sinks to the bottom of the page. Body text appears above it. Useful when the table supports a conclusion at the end of a section.",
                    whenToUse: "Use when the table is supplementary and shouldn't interrupt the reading flow. Less common than [h] or [t]."
                },
                {
                    name: "[p]",
                    description: "Place on a separate page of floats.",
                    impact: "[p]",
                    pdfImpact: "The table gets its own dedicated page containing only floats (tables/figures). No body text appears on that page.",
                    whenToUse: "Use for very large tables or when you have many floats. Journals sometimes require all tables on separate pages at the end."
                }
            ],
            example: "Structured data presentation.",
            preview: "Table 1: Soil Compaction Data"
        },
        {
            name: "\\includegraphics",
            syntax: "\\includegraphics[width=0.5\\textwidth]{graph.png}",
            description: "Imports an image file into the document.",
            guidelines: [
                "Requires \\usepackage{graphicx} in the preamble — without it, this command doesn't exist.",
                "Always use relative widths (\\textwidth, \\linewidth) instead of absolute units (cm, px) for portability.",
                "Supported formats: PDF (best for vector), PNG (best for screenshots), JPG (best for photos). Avoid BMP and TIFF.",
                "Wrap inside \\begin{figure} for captions and cross-referencing. Bare \\includegraphics has no caption support."
            ],
            options: [
                {
                    name: "[scale=2]",
                    description: "Scales the image size.",
                    impact: "scale",
                    pdfImpact: "The image renders at 2× its original pixel dimensions. scale=0.5 would halve it. The aspect ratio is always preserved.",
                    whenToUse: "Use when you know the image's native size and want a proportional adjustment. Avoid for responsive layouts — prefer width= instead."
                },
                {
                    name: "[angle=45]",
                    description: "Rotates the image.",
                    impact: "angle",
                    pdfImpact: "The image rotates 45° counter-clockwise in the PDF. The bounding box adjusts, which may push surrounding text or cause overflow.",
                    whenToUse: "Rarely needed. Useful for rotating a landscape chart to fit a portrait page, or for creative poster layouts."
                },
                {
                    name: "[height=3cm]",
                    description: "Sets specific height.",
                    impact: "height",
                    pdfImpact: "The image is scaled so its height is exactly 3cm in the PDF. Width adjusts proportionally to maintain the aspect ratio.",
                    whenToUse: "Use when vertical space is constrained (e.g., fitting an image beside text). Combine with width for exact dimensions (may distort)."
                }
            ],
            example: "Visualizing research outcomes.",
            preview: "[RESEARCH GRAPH IMAGE]"
        }
    ],
    "session-2-thesis": [
        {
            name: "\\input",
            syntax: "\\input{chapters/chapter1}",
            description: "Inserts the content of another .tex file.",
            guidelines: [
                "Use \\input for modular writing — keep each chapter in a separate file.",
                "The path is relative to the main .tex file. Use forward slashes: chapters/chapter1 (not backslashes).",
                "\\input does NOT start a new page. The content flows continuously from where it's called.",
                "You can nest \\input calls — a chapter file can \\input its own sub-files."
            ],
            options: [
                {
                    name: "\\include{...}",
                    description: "Higher-level file inclusion (starts new page).",
                    impact: "include",
                    pdfImpact: "The included content always starts on a new page (\\clearpage is called automatically). Each included file gets its own .aux file for faster recompilation.",
                    whenToUse: "Use for chapter-level inclusion in a thesis. Pair with \\includeonly{ch1,ch3} in the preamble to compile only specific chapters during drafting."
                },
                {
                    name: "\\tableofcontents",
                    description: "Auto-generates table of contents.",
                    impact: "toc",
                    pdfImpact: "A full Table of Contents page appears with section titles, numbering, and page numbers — all auto-generated. Requires two compilations to resolve page numbers.",
                    whenToUse: "Place right after \\maketitle or on its own page. Essential for any document longer than 5 pages. Add \\listoffigures and \\listoftables for completeness."
                },
                {
                    name: "\\appendix",
                    description: "Starts the appendix section.",
                    impact: "app",
                    pdfImpact: "All \\section commands after \\appendix are numbered with letters (A, B, C) instead of numbers. 'Appendix A: Raw Data' appears in the PDF.",
                    whenToUse: "Place before your first appendix section. Use for raw data tables, questionnaires, supplementary figures, and code listings."
                }
            ],
            example: "Managing large documents easily.",
            preview: "Chapter 1: Introduction (Inserted)"
        }
    ]
};
