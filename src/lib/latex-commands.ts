
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
            technicalComment: "Sets the global 'Box Model' and default font metrics. All physical dimensions of the document (margins, indentations, etc.) are derived from this base class.",
            applicationPOV: "Standardization: Ensuring all research papers meet uniform global academic standards for publishing, aligned with NEP 2020's goal of digital standardisation.",
            options: [
                {
                    name: "[11pt]",
                    description: "Sets font size to 11 points.",
                    impact: "[11pt]",
                    pdfImpact: "All body text, headings, and captions render at 11pt base size. Slightly larger than default 10pt — easier to read in printed copies.",
                    whenToUse: "When the journal or university guidelines specify 11pt, or when you want a comfortable reading size for draft reviews.",
                    technicalComment: "Increases the base font dimension from 10pt to 11pt, triggering a recalculation of all relative vertical skips (\\baselineskip) and spacing.",
                    applicationPOV: "Accessibility: Aligning with NEP 2020's focus on inclusivity by ensuring text is legible for a wider audience."
                },
                {
                    name: "[12pt]",
                    description: "Sets font size to 12 points.",
                    impact: "[12pt]",
                    pdfImpact: "Largest standard base size. All text scales up proportionally — headings become noticeably bigger. Page count increases by ~20% compared to 10pt.",
                    whenToUse: "Most thesis/dissertation guidelines (UGC, ICAR) require 12pt. Use this as your default for academic submissions.",
                    technicalComment: "The max standard base size. Internally swaps the font definition files (e.g. size12.clo) which adjust line heights and paragraph spacing globally.",
                    applicationPOV: "Standardization: Complying with UGC and ICAR mandates for thesis submission, ensuring parity with global PhD standards."
                },
                {
                    name: "[twocolumn]",
                    description: "Splits the page into two columns.",
                    impact: "[twocolumn]",
                    pdfImpact: "The PDF page splits into two equal-width columns with a gap in the middle. Figures and tables may need [t] or [p] placement to avoid overflow.",
                    whenToUse: "Required by many agriculture journals (e.g., Journal of Agricultural Science). Avoid for thesis — use single column there.",
                    technicalComment: "Triggers a 'Switch' in the output driver to handle two distinct vertical boxes per page. Changes \\columnwidth and \\columnsep values.",
                    applicationPOV: "Industry Alignment: Adapting research output to the standard formats of major international journals, ensuring global reach."
                },
                {
                    name: "[a4paper]",
                    description: "Sets paper size to A4 standard.",
                    impact: "[a4paper]",
                    pdfImpact: "PDF dimensions become 210mm × 297mm (A4). Without this, LaTeX defaults to US Letter (shorter and wider), which can cause margin misalignment when printed on A4.",
                    whenToUse: "Always use for Indian/European submissions. US Letter is only needed for American journals.",
                    technicalComment: "Defines the physical boundaries of the \\shipout pages. Directly sets \\paperwidth and \\paperheight registers.",
                    applicationPOV: "Localization & Standards: Adhering to Indian printing standards (A4), minimizing resource waste during physical publication."
                },
                {
                    name: "[landscape]",
                    description: "Changes page orientation to landscape.",
                    impact: "[landscape]",
                    pdfImpact: "The entire PDF rotates to landscape (wider than tall). All margins, headers, and footers adjust accordingly.",
                    whenToUse: "Rarely used for full documents. Better to use the 'lscape' package for individual landscape pages containing wide tables.",
                    technicalComment: "Swaps the values of \\paperwidth and \\paperheight while keeping the text area's aspect ratio constant.",
                    applicationPOV: "Visualization: Enhancing the presentation of wide agricultural data sets (e.g. soil charts) which are hard to read in portrait mode."
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
            technicalComment: "Dynamic library mapping. LaTeX loads external .sty files into memory to extend functionality without bloating the core engine.",
            applicationPOV: "Customization & Technology Integration: Ability to adapt to specific university/journal guidelines with zero manual formatting.",
            options: [
                {
                    name: "{amsmath}",
                    description: "For complex mathematical equations.",
                    impact: "{amsmath}",
                    pdfImpact: "Enables advanced math environments (align, gather, cases). Equations render with better spacing and professional alignment in the PDF.",
                    whenToUse: "Essential for any paper with statistics, formulas, or multi-line equations. Load it by default for agriculture research papers.",
                    technicalComment: "Provides low-level access to mathematical fonts and creates 'environments' for multi-line equation alignment (align vs equation).",
                    applicationPOV: "Scientific Temper: Promoting high-precision quantitative reporting, essential for empirical research as per NEP 2020 guidelines."
                },
                {
                    name: "{biblatex}",
                    description: "For advanced reference management.",
                    impact: "{biblatex}",
                    pdfImpact: "Citations appear in the style you choose (numeric, author-year, etc.). The bibliography section auto-generates with consistent formatting.",
                    whenToUse: "Use when you need author-year citations (APA style) or advanced filtering. For simple numeric citations, basic BibTeX may suffice.",
                    technicalComment: "The modern successor to BibTeX. It processes data using the 'biber' backend, allowing for complex Unicode support and dynamic sorting.",
                    applicationPOV: "Academic Integrity: Simplifying the citation process to ensure all sources are properly credited, preventing unintended plagiarism."
                },
                {
                    name: "{hyperref}",
                    description: "Adds clickable links to your PDF.",
                    impact: "{hyperref}",
                    pdfImpact: "All cross-references (\\ref, \\cite, TOC entries) become clickable blue links in the PDF. URLs become active hyperlinks.",
                    whenToUse: "Always include for digital submissions. Add [hidelinks] option to remove colored boxes for print versions.",
                    technicalComment: "Post-processes the .pdf file to transform internal destination coordinates into interactive annotations (links).",
                    applicationPOV: "Digital Literacy: Creating high-quality, navigable digital documents that are easy to browse on mobile and web platforms."
                },
                {
                    name: "{geometry}",
                    description: "Allows manual margin adjustments.",
                    impact: "{geometry}",
                    pdfImpact: "Overrides default margins. For example, \\usepackage[margin=1in]{geometry} sets all four margins to exactly 1 inch in the PDF.",
                    whenToUse: "When your university specifies exact margins (e.g., left=1.5in for binding). Without this, LaTeX uses its own calculated margins.",
                    technicalComment: "Directly manipulates the layout registers like \\textwidth, \\textheight, \\oddsidemargin, and \\evensidemargin based on the options provided.",
                    applicationPOV: "Formatting Precision: Meeting specific institutional requirements (ICAR/UGC) for thesis binding and paper submission without manual guesswork."
                }
            ],
            example: "Adding tools to your kitchen.",
            preview: "Advanced Features Loaded"
        }
    ],
    "session-1-install": [
        {
            name: "TeX Distribution",
            syntax: "MiKTeX / TeX Live",
            description: "The 'Engine' that compiles your code.",
            guidelines: [
                "Windows users: MiKTeX is the standard choice (easy updates).",
                "Linux/Mac users: TeX Live is more robust and pre-packaged.",
                "Always choose 'Install missing packages on-the-fly' in MiKTeX settings to avoid manual downloads.",
                "Ensure your bin folder is in the system PATH for command-line access."
            ],
            technicalComment: "A collection of binaries and packages. It includes the actual compiler (pdflatex, xelatex), font metrics, and thousands of style files (.sty).",
            applicationPOV: "Infrastructure Readiness: Setting up a professional toolkit for digital scholarship, foundational to the NEP 2020 technology mandate.",
            options: [
                {
                    name: "MiKTeX Console",
                    description: "Package manager for Windows.",
                    impact: "miktex",
                    pdfImpact: "No change to PDF directly, but ensures all required packages (like 'amsmath') are installed so the PDF successfully generates.",
                    whenToUse: "When you get a 'File not found' error during compilation. Open the console and check for updates.",
                    technicalComment: "Manages the TDS (TeX Directory Structure) and updates the filename database (FNDB) so the engine can find new files.",
                    applicationPOV: "Tool Proficiency: Mastering the management of scientific software, ensuring a smooth and uninterrupted research workflow."
                }
            ],
            example: "The software behind the scenes.",
            preview: "System: LaTeX Engine Ready"
        },
        {
            name: "LaTeX Editor",
            syntax: "TeXstudio / Overleaf",
            description: "The 'Dashboard' where you write your code.",
            guidelines: [
                "Use TeXstudio for offline writing (best for large documents like a thesis).",
                "Use Overleaf for collaboration and cloud backups (requires internet).",
                "Set your default compiler to 'PdfLaTeX' for standard projects.",
                "Enable 'UTF-8' encoding to prevent weird symbols in regional languages."
            ],
            technicalComment: "An Integrated Development Environment (IDE). It provides syntax highlighting, spell checking, and one-click compilation by calling the TeX distribution binaries.",
            applicationPOV: "Digital Literacy: Choosing the right platform for scientific writing, balancing offline control with online collaboration as encouraged by NEP 2020.",
            options: [
                {
                    name: "Overleaf",
                    description: "Cloud-based collaborative editor.",
                    impact: "cloud",
                    pdfImpact: "Enables real-time collaboration with co-authors. The PDF updates automatically as you type (if 'Auto-compile' is on).",
                    whenToUse: "Perfect for journal papers with multiple authors from different institutions. No local installation required.",
                    technicalComment: "Uses a sandboxed Linux environment running TeX Live. Manages version control through a git-like history system.",
                    applicationPOV: "Collaborative Research: Fostering teamwork across borders, a core pillar of modern multidisciplinary research."
                }
            ],
            example: "Your scientific workbench.",
            preview: "Status: Connection Stable"
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
            technicalComment: "Triggers the layout engine to render the stored metadata (title, author, date) using the specific alignment and font sizing defined in the document class file (.cls).",
            applicationPOV: "Professional Presentation: Teaching scholars how to generate standardized title pages automatically, ensuring all research outputs look professional and uniform.",
            options: [
                {
                    name: "\\title{...}",
                    description: "Sets the paper title.",
                    impact: "\\title",
                    pdfImpact: "The title appears centered, in a larger bold font at the top of the first page. In 'report' class, it gets its own dedicated title page.",
                    whenToUse: "Always required. Keep it concise (under 15 words for journals). Use Title Case for agriculture papers.",
                    technicalComment: "Stores the value in a global macro \@title for retrieval by the \maketitle command during the render phase.",
                    applicationPOV: "Structural Clarity: Encouraging precise and impactful titling of research, reflecting the specific focus of the study."
                },
                {
                    name: "\\author{...}",
                    description: "Sets the author name.",
                    impact: "\\author",
                    pdfImpact: "Author name(s) appear centered below the title in a slightly smaller font. Multiple authors are separated by commas or listed vertically.",
                    whenToUse: "Always required. Add affiliations using \\thanks{} for footnotes, e.g., \\author{Dr. Sharma\\thanks{IARI, New Delhi}}.",
                    technicalComment: "Stores names in \@author. Handles author blocks and footnoted affiliations through complex macro expansion.",
                    applicationPOV: "Credit and Reputation: Properly attributing research contributions, which is a key part of academic ethics and integrity."
                },
                {
                    name: "\\date{...}",
                    description: "Sets the publication date.",
                    impact: "\\date",
                    pdfImpact: "Date appears centered below the author name. If omitted, LaTeX auto-inserts today's date. \\date{} with empty braces removes it entirely.",
                    whenToUse: "Use \\date{\\today} for drafts. Use a fixed date for final submissions. Use \\date{} to hide it when the journal handles dates.",
                    technicalComment: "Stores the date in \@date. If not called, the system default \today macro is used automatically.",
                    applicationPOV: "Timeliness: Recording the exact timeline of research, important for scientific precedence and archival accuracy."
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
            technicalComment: "Increments the 'section' counter and writes the current page number and title to the .toc (Table of Contents) auxiliary file for use in the next compilation pass.",
            applicationPOV: "Structural Logic: Encouraging scholars to create clear, hierarchical structures for their research, which is essential for logical reasoning and critical thinking as per NEP 2020.",
            options: [
                {
                    name: "\\section*{...}",
                    description: "Creates heading without a number.",
                    impact: "*",
                    pdfImpact: "The heading appears in the same bold, large font as a regular section BUT without any number prefix. It is also excluded from the Table of Contents.",
                    whenToUse: "Use for Abstract, Acknowledgements, and Dedication — sections that shouldn't be numbered per academic convention.",
                    technicalComment: "Suppresses the increment of the 'section' counter and bypasses the writing of the entry to the .toc file.",
                    applicationPOV: "Professional Etiquette: Adhering to stylistic norms for non-technical document sections like Acknowledgements, enhancing structural clarity."
                },
                {
                    name: "\\subsection{...}",
                    description: "Creates a secondary heading.",
                    impact: "sub",
                    pdfImpact: "Renders as a slightly smaller bold heading with two-level numbering (e.g., 2.1, 2.2). Indentation and spacing are handled automatically.",
                    whenToUse: "Use to break a section into logical parts. E.g., under 'Methodology', have 'Soil Sampling' and 'Data Analysis' as subsections.",
                    technicalComment: "Increments the 'subsection' counter. Resets the 'subsubsection' counter to zero automatically.",
                    applicationPOV: "Logical Subdivision: Encouraging a granular approach to reporting, allowing for detailed exploration of sub-topics within a research area."
                },
                {
                    name: "\\subsubsection{...}",
                    description: "Creates a tertiary heading.",
                    impact: "subsub",
                    pdfImpact: "Renders with three-level numbering (e.g., 2.1.1). Font is smaller than subsection, often italic or run-in depending on the document class.",
                    whenToUse: "Use sparingly. If you need this level, your document is detailed enough. Going deeper (\\paragraph) is rarely needed in agriculture papers.",
                    technicalComment: "Increments the 'subsubsection' counter. Linked to the master 'subsection' counter via the \@addtoreset mechanism.",
                    applicationPOV: "Structural Precision: Providing the highest level of hierarchy for complex experimental setups or detailed taxonomic descriptions."
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
            technicalComment: "Switches the current font's 'series' to 'bold' without changing the 'shape' or 'size'. This is a high-level command that handles font attribute state management.",
            applicationPOV: "Emphasis & Readability: Mastering typographic emphasis to guide the reader's attention to key findings and important terminology in scientific papers.",
            options: [
                {
                    name: "\\textit{...}",
                    description: "Applies italic formatting.",
                    impact: "it",
                    pdfImpact: "Text renders in a slanted italic typeface. Used extensively in scientific writing for species names, variables, and foreign terms.",
                    whenToUse: "Required for taxonomic names (e.g., \\textit{Triticum aestivum}), mathematical variables in text, book titles, and Latin phrases (et al., in vitro).",
                    technicalComment: "Switches the font shape to 'italic' or 'slanted' depending on the font family's internal organization.",
                    applicationPOV: "Scientific Accuracy: Adhering to international biological naming conventions, essential for high-quality agriculture research."
                },
                {
                    name: "\\underline{...}",
                    description: "Underlines the text.",
                    impact: "underline",
                    pdfImpact: "A horizontal line appears directly below the text. It does NOT break across lines — long underlined text may overflow the margin.",
                    whenToUse: "Rarely used in modern academic writing. Journals prefer bold or italic. Use only if specifically required by your institution's format.",
                    technicalComment: "A primitive TeX command that draws a solid rule below the box containing the text. It interferes with hyphenation and line breaking.",
                    applicationPOV: "Legacy Support: Understanding old-school formatting requirements while being aware of modern typographic trends for better readability."
                },
                {
                    name: "\\texttt{...}",
                    description: "Monospaced (Typewriter) font.",
                    impact: "tt",
                    pdfImpact: "Text renders in a fixed-width font (like Courier). Each character occupies the same horizontal space, making it visually distinct from body text.",
                    whenToUse: "Use for code snippets, file names, URLs, software names, or command-line instructions within your paper.",
                    technicalComment: "Switches the font family to 'typewriter' (usually Computer Modern Typewriter). Sets a fixed character advance for every glyph.",
                    applicationPOV: "Digital Competence: Presenting computer-related information (like algorithm names or file paths) in a clear, distinct format, as per NEP 2020's focus on digital literacy."
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
            technicalComment: "Activates 'Display Math' mode and its specific font metrics. In this mode, math symbols are rendered at full size, and the baseline spacing is adjusted to accommodate subscripts and superscripts.",
            applicationPOV: "Mathematical Thinking: Ensuring high-precision quantitative reporting, aligned with NEP 2020's focus on scientific temper and mathematical rigor.",
            options: [
                {
                    name: "\\begin{equation*}",
                    description: "Removes equation numbering.",
                    impact: "*",
                    pdfImpact: "The equation appears centered on its own line with vertical spacing, but NO number (like '(1)') appears on the right margin.",
                    whenToUse: "Use for equations you won't reference elsewhere. Keeps the numbering sequence clean for important equations only.",
                    technicalComment: "Activates the amsmath unnumbered equation environment. Suppresses the creation of an entry in the auxiliary file for that specific equation.",
                    applicationPOV: "Clarity in Presentation: Ensuring that only critical, referenceable equations carry numbers, making the document cleaner and easier to navigate."
                },
                {
                    name: "$...$",
                    description: "Inline math (within text).",
                    impact: "$",
                    pdfImpact: "Math symbols render within the text line without breaking the paragraph flow. Fractions and large operators are compressed to fit the line height.",
                    whenToUse: "Use for variables ($x$, $N$), short expressions ($p < 0.05$), and units within sentences. Avoid for complex fractions or summations.",
                    technicalComment: "Switches the TeX engine into 'Text Math' mode. Adjusts the size of operators (like \sum) and limits to maintain the current line's leading.",
                    applicationPOV: "Precision in Writing: Integrating mathematical terminology seamlessly into the narrative, supporting the flow of scientific arguments."
                },
                {
                    name: "\\frac{a}{b}",
                    description: "Creates a fraction.",
                    impact: "frac",
                    pdfImpact: "In display mode: a full-size fraction with numerator above and denominator below a horizontal line. In inline mode: a compressed, smaller version.",
                    whenToUse: "Use in display math (\\[ \\]) for readability. For inline, prefer a/b notation to avoid squished fractions that are hard to read.",
                    technicalComment: "A macro that takes two arguments and places them in a vertical stack separated by a rule, using different font sizes for text vs display mode.",
                    applicationPOV: "Analytical Rigour: Presenting mathematical relationships and ratios with professional clarity, essential for quantitative analysis in agriculture."
                },
                {
                    name: "\\sqrt{x}",
                    description: "Creates a square root.",
                    impact: "sqrt",
                    pdfImpact: "A radical symbol (√) with a horizontal bar extending over the entire content. For nth roots, use \\sqrt[n]{x} — the n appears in the crook of the radical.",
                    whenToUse: "Use for standard deviation formulas, distance calculations, or any root expression. Nest fractions inside: \\sqrt{\\frac{a}{b}}.",
                    technicalComment: "Uses TeX's specialized radical font metrics to draw a variable-width radical symbol and a top rule that scales with the box size of 'x'.",
                    applicationPOV: "Computational Accuracy: Explicitly showing mathematical operations like roots which are common in statistical formulas for crop yield prediction."
                }
            ],
            example: "Precision in every calculation.",
            preview: "E = mc² (1)"
        },
        {
            name: "\\begin{align}",
            syntax: "\\begin{align}\n  A &= B \\\\\n  C &= D\n\\end{align}",
            description: "Aligns multiple equations at specific points (usually the = sign).",
            guidelines: [
                "Use the ampersand (&) to mark the alignment point (e.g., &=).",
                "Each line except the last must end with a double backslash (\\\\).",
                "By default, every line is numbered. Use align* to remove all numbers.",
                "Use \\notag on a specific line to hide its number while keeping others."
            ],
            technicalComment: "Uses the internal amsmath gathering mechanism to process multiple lines of math, aligning them based on the & anchor points. It manages vertical alignment across lines while maintaining a single numbering sequence or unnumbered state.",
            applicationPOV: "Step-by-Step Problem Solving: Perfectly aligning complex derivations to help students follow the logical progression, essential for critical thinking as per NEP 2020.",
            options: [
                {
                    name: "& (Ampersand)",
                    description: "The alignment anchor.",
                    impact: "&",
                    pdfImpact: "Tells LaTeX exactly where to line up the equations vertically across different rows. Usually placed before the equals sign.",
                    whenToUse: "Always required inside align environments. You can use multiple &'s for complex multi-column alignments.",
                    technicalComment: "Acts as a tab-stop in a specialized math matrix. It forces the horizontal position of subsequent characters to a common baseline.",
                    applicationPOV: "Structural Clarity: Ensuring that mathematical proofs are visually organized and easy to scan, improving educational comprehension."
                },
                {
                    name: "\\\\ (Double Backslash)",
                    description: "Starts a new line.",
                    impact: "\\\\",
                    pdfImpact: "Forces the next part of the equation onto a new row with proper vertical spacing.",
                    whenToUse: "Use at the end of every row except the very last one. Do not use after the last row, as it adds unnecessary empty space.",
                    technicalComment: "Triggers a row-break in the math display alignment engine, resetting the horizontal cursor and incrementing the vertical position.",
                    applicationPOV: "Logical Flow: Clearly separating different steps of a calculation, vital for presenting archaeological or statistical proofs."
                }
            ],
            example: "Step-by-step agricultural math.",
            preview: "Y = f(x) (1)\nZ = g(x) (2)"
        },
        {
            name: "\\begin{cases}",
            syntax: "f(x) = \\begin{cases}\n  1 & x > 0 \\\\\n  0 & x \\leq 0\n\\end{cases}",
            description: "Creates piecewise functions with a large left brace.",
            guidelines: [
                "Must be used inside a math environment (equation or \\[ ... \\]).",
                "Use & to separate the math from the condition text.",
                "Use \\text{...} for words inside the conditions for proper spacing.",
                "Requires the amsmath package."
            ],
            technicalComment: "Creates an internal array-like structure with an automatic left-brace delimiter. It uses math-mode alignment to separate the conditional clauses from the mathematical outcomes.",
            applicationPOV: "Logical Conditionals: Representing piecewise functions and decision-making logic in scientific models, encouraging algorithmic thinking.",
            options: [
                {
                    name: "\\text{...}",
                    description: "Inserts plain text within math.",
                    impact: "text",
                    pdfImpact: "Renders text in the document's normal upright font instead of the math font. Corrects the 'squashed' look of words in math mode.",
                    whenToUse: "Essential for conditions in cases, units ($10\\text{ kg}$), and labels inside equations.",
                    technicalComment: "Temporarily exits math mode to enter a restricted horizontal box using the current body font settings, then returns to math mode.",
                    applicationPOV: "Scientific Literacy: Ensuring that units and descriptors are typeset according to international standards for clarity and precision."
                }
            ],
            example: "Conditional soil pH logic.",
            preview: "f(x) = { 1 if x > 0 ..."
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
            technicalComment: "Looks up the citation key in the .aux file and replaces it with the formatted reference number or author-year string based on the chosen bibliography style.",
            applicationPOV: "Academic Integrity: Automating citation management to prevent plagiarism and ensure ethical research practices, as highlighted in NEP 2020.",
            options: [
                {
                    name: "\\citep{...}",
                    description: "Parenthetical citation (Name, Year).",
                    impact: "p",
                    pdfImpact: "Renders as (Sharma, 2024) in the PDF — the entire citation is wrapped in parentheses. Used when the citation is not part of the sentence grammar.",
                    whenToUse: "Use at the end of a statement: 'Drip irrigation improves yield \\citep{sharma2024}.' Requires the natbib or biblatex package.",
                    technicalComment: "Wraps the citation output in parentheses based on the 'natbib' or 'biblatex' configuration. Internally calls back to the .bbl file to fetch author and year strings.",
                    applicationPOV: "Academic Integrity: Providing clear, unambiguous attribution to prior research, fostering an environment of ethical scholarship."
                },
                {
                    name: "\\citet{...}",
                    description: "Textual citation Name (Year).",
                    impact: "t",
                    pdfImpact: "Renders as Sharma (2024) — the author name is part of the sentence, with only the year in parentheses.",
                    whenToUse: "Use when the author is the subject: '\\citet{sharma2024} demonstrated that...' Requires natbib or biblatex package.",
                    technicalComment: "Splits the citation key resolution into two parts: the author name (textual) and the year (parenthetical), managed by the natbib engine.",
                    applicationPOV: "Narrative Flow: Allowing researchers to integrate previous findings directly into their scientific narrative, improving the readability of review sections."
                },
                {
                    name: "\\nocite{*}",
                    description: "Includes all references from .bib.",
                    impact: "no",
                    pdfImpact: "Every entry in your .bib file appears in the bibliography section, even if not cited in the text. No visible change in the body text.",
                    whenToUse: "Use for annotated bibliographies or when a supervisor wants to see all references you consulted. Avoid in journal submissions.",
                    technicalComment: "Forces the BibTeX backend to include every entry field from the .bib database into the .bbl output file, regardless of whether a \cite was found.",
                    applicationPOV: "Comprehensive Documentation: Ensuring a complete record of all consulted literature, reflecting deep research exploration as encouraged by NEP 2020."
                }
            ],
            example: "Connecting your work to science.",
            preview: "[Farmer, 2024]"
        },
        {
            name: "\\bibliographystyle",
            syntax: "\\bibliographystyle{IEEEtran}",
            description: "Defines the appearance of your references.",
            guidelines: [
                "Common styles: unsrt (numbered), alpha (letter keys), IEEEtran (standard), apalike (Author-Year).",
                "Place this in the preamble or right before \\bibliography{...}.",
                "Changing this style automatically reformats every entry in your reference list."
            ],
            technicalComment: "Directs the BibTeX processor to use a specific .bst file. This file contains the logic for sorting and formatting entries (e.g., whether titles are italicized).",
            applicationPOV: "Standardization: Easily switching between different journal styles (APA, IEEE, Nature) without rewriting a single citation, a massive efficiency gain for prolific researchers.",
            options: [
                {
                    name: "{unsrt}",
                    description: "Numbered in order of appearance.",
                    impact: "unsrt",
                    pdfImpact: "Citations appear as [1], [2], etc., based on when they first show up in your text.",
                    whenToUse: "Basic choice for most engineering and science reports.",
                    technicalComment: "Sorts the entries in the .bbl file by the order of their appearance in the .aux file entries.",
                    applicationPOV: "Structural Simplicity: Providing a clean, chronological roadmap of references for the reader."
                },
                {
                    name: "{apalike}",
                    description: "Author-Year style.",
                    impact: "apalike",
                    pdfImpact: "Citations appear as [Sharma et al., 2024]. Requires \\usepackage{natbib}.",
                    whenToUse: "Standard for social sciences and many agricultural biology journals.",
                    technicalComment: "A specialized style that works with natbib to handle complex author-year mapping and multi-author 'et al.' logic.",
                    applicationPOV: "Contextual Credibility: Allowing readers to immediately identify the researcher and timeline, which is crucial for establishing authority in long-form reports."
                }
            ],
            example: "Switching styles with one line.",
            preview: "References: [1] Sharma, 2024..."
        },
        {
            name: "\\bibliography",
            syntax: "\\bibliography{references}",
            description: "Prints the reference list and links to the .bib file.",
            guidelines: [
                "Place this exactly where you want your references to appear (usually at the end).",
                "The argument is the filename of your .bib file without the .bib extension.",
                "Ensure your references.bib file is in the same folder as your .tex file."
            ],
            technicalComment: "Writes a command to the .aux file telling BibTeX which database file to scan. It also triggers the inclusion of the final .bbl file into the document during the second pass.",
            applicationPOV: "Database Management: Decoupling your research database (.bib) from your document structure, allowing you to reuse references across multiple papers.",
            options: [
                {
                    name: "{file1,file2}",
                    description: "Include multiple .bib files.",
                    impact: "multi",
                    pdfImpact: "Combines entries from both databases into a single unified bibliography section.",
                    whenToUse: "Use to keep separate databases for 'Soil Science' and 'Machine Learning' and combine them for an interdisciplinary paper.",
                    technicalComment: "BibTeX will sequentially search through all listed filenames to resolve citation keys found in the document.",
                    applicationPOV: "Interdisciplinary Research: Seamlessly merging knowledge from different fields, aligning with NEP 2020's focus on multidisciplinary education."
                }
            ],
            example: "The final step in citation.",
            preview: "BIBLIOGRAPHY SECTION"
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
            technicalComment: "Defines a 'Float' object. LaTeX uses a complex algorithm to find the 'optimum' placement for the float based on available space and document constraints to prevent large gaps.",
            applicationPOV: "Data Literacy: Teaching scholars how to present complex experimental data in a structured, professional format that is easy to read and interpret.",
            options: [
                {
                    name: "[h]",
                    description: "Place approximately here.",
                    impact: "[h]",
                    pdfImpact: "LaTeX tries to place the table near where it appears in the source code. If there isn't enough space on the current page, it may float to the next page.",
                    whenToUse: "Default choice for most tables. Combine with ! for stronger suggestion: [h!]. Use [H] (float package) for absolute 'here' placement.",
                    technicalComment: "The 'here' parameter suggests placement at the current point in the stream. If the box size exceeds the remaining page height, vertical list displacement occurs.",
                    applicationPOV: "Contextual Relevance: Keeping data close to the text that discusses it, ensuring a logical flow of information for the reader."
                },
                {
                    name: "[t]",
                    description: "Place at the top of the page.",
                    impact: "[t]",
                    pdfImpact: "The table floats to the top of the current or next page. Body text fills in below it. Multiple [t] floats stack at the top.",
                    whenToUse: "Good for tables referenced early in a section. Common in two-column journal layouts where [h] often fails.",
                    technicalComment: "Places the float box into the 'top float' list for the current page. Follows the \topfraction parameter for maximum space usage.",
                    applicationPOV: "Structural Efficiency: Maximizing page real estate by placing large visuals at the top, a standard in high-end academic journals."
                },
                {
                    name: "[b]",
                    description: "Place at the bottom of the page.",
                    impact: "[b]",
                    pdfImpact: "The table sinks to the bottom of the page. Body text appears above it. Useful when the table supports a conclusion at the end of a section.",
                    whenToUse: "Use when the table is supplementary and shouldn't interrupt the reading flow. Less common than [h] or [t].",
                    technicalComment: "Appends the float box to the 'bottom float' list. Controlled by \bottomfraction and \bottomnumber settings.",
                    applicationPOV: "Reading Flow: Placing secondary evidence at the bottom to avoid breaking the reader's concentration on the main argument."
                },
                {
                    name: "[p]",
                    description: "Place on a separate page of floats.",
                    impact: "[p]",
                    pdfImpact: "The table gets its own dedicated page containing only floats (tables/figures). No body text appears on that page.",
                    whenToUse: "Use for very large tables or when you have many floats. Journals sometimes require all tables on separate pages at the end.",
                    technicalComment: "Defines a 'float page' containing only objects from the float queues. Triggered when the total float height exceeds a certain threshold.",
                    applicationPOV: "Data Organization: Segregating dense visual data into dedicated pages to maintain document cleanliness in long-form research reports."
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
            technicalComment: "Directly inserts an binary image file into the PDF stream. If the width/height are specified, the LaTeX engine calculates the scaling factor to retain the aspect ratio.",
            applicationPOV: "Multi-modal Learning: Visualizing research outcomes through clear charts and figures, aiding in the effective communication of scientific findings.",
            options: [
                {
                    name: "[scale=2]",
                    description: "Scales the image size.",
                    impact: "scale",
                    pdfImpact: "The image renders at 2× its original pixel dimensions. scale=0.5 would halve it. The aspect ratio is always preserved.",
                    whenToUse: "Use when you know the image's native size and want a proportional adjustment. Avoid for responsive layouts — prefer width= instead.",
                    technicalComment: "Multiplies the original viewport dimensions by the scale factor. Preserves vector resolution if the source is a PDF/EPS.",
                    applicationPOV: "Visual Hierarchy: Adjusting diagram sizes to match the conceptual importance of the figure within the research paper."
                },
                {
                    name: "[angle=45]",
                    description: "Rotates the image.",
                    impact: "angle",
                    pdfImpact: "The image rotates 45° counter-clockwise in the PDF. The bounding box adjusts, which may push surrounding text or cause overflow.",
                    whenToUse: "Rarely needed. Useful for rotating a landscape chart to fit a portrait page, or for creative poster layouts.",
                    technicalComment: "Applies a geometric rotation matrix to the image box during PDF generation. Recalculates the height and width of the enclosing box.",
                    applicationPOV: "Creative Formatting: Allowing for the flexible inclusion of wide landscape data (like topographic maps) within portrait documents."
                },
                {
                    name: "[height=3cm]",
                    description: "Sets specific height.",
                    impact: "height",
                    pdfImpact: "The image is scaled so its height is exactly 3cm in the PDF. Width adjusts proportionally to maintain the aspect ratio.",
                    whenToUse: "Use when vertical space is constrained (e.g., fitting an image beside text). Combine with width for exact dimensions (may distract).",
                    technicalComment: "Sets a hard constraint on the vertical dimension of the image box. The graphics engine automatically determines the width to prevent distortion.",
                    applicationPOV: "Consistent Scaling: Ensuring that multiple figures in a row have uniform height for a balanced and professional visual appearance."
                }
            ],
            example: "Visualizing research outcomes.",
            preview: "[RESEARCH GRAPH IMAGE]"
        },
        {
            name: "\\begin{figure}",
            syntax: "\\begin{figure}[h]\n  \\centering\n  \\includegraphics{...}\n  \\caption{...}\n\\end{figure}",
            description: "A container for images with captioning and automatic numbering.",
            guidelines: [
                "Always include a \\caption{} so your figure is numbered and listed in the LOF.",
                "Add a \\label{} AFTER the caption to reference it in your text using \\ref{}.",
                "Use \\centering to keep the image centered within its block.",
                "Like tables, figures are 'floats' — LaTeX might move them for better page balance."
            ],
            technicalComment: "A floating environment for graphics. LaTeX handles the placement and numbering. It creates an entry in the .lof (List of Figures) file and manages the 'figure' counter.",
            applicationPOV: "Visual Literacy: Enhancing research papers with charts and diagrams to simplify complex agricultural datasets, making data accessible to a wider audience.",
            options: [
                {
                    name: "\\caption{...}",
                    description: "Adds a numbered description.",
                    impact: "caption",
                    pdfImpact: "Prints 'Figure X: Your Description' below or above the image. Increments the global figure counter and updates the List of Figures.",
                    whenToUse: "Required for all research figures. Place it below the image for standard journal formatting.",
                    technicalComment: "Standard caption macro that interacts with the 'hypcap' package for correct PDF anchor alignment in hyperref.",
                    applicationPOV: "Structural Precision: Providing essential context for visual data, ensuring that every chart and image is properly explained."
                },
                {
                    name: "\\label{...}",
                    description: "Assigns a name for internal links.",
                    impact: "label",
                    pdfImpact: "No visible change. It maps the current figure number to a text key in the .aux file for use with \\ref{}.",
                    whenToUse: "Always use for cross-referencing. Use a prefix like 'fig:' to stay organized, e.g., \\label{fig:yield_chart}.",
                    technicalComment: "Writes the current value of the nearest counter (usually 'figure' or 'section') to the .aux file associated with the given key.",
                    applicationPOV: "Academic Efficiency: Automating the cross-referencing process, eliminating manual numbering errors in large research documents."
                }
            ],
            example: "Standard research figure setup.",
            preview: "Figure 1: Yield Progress Map"
        },
        {
            name: "\\begin{minipage}",
            syntax: "\\begin{minipage}{0.45\\textwidth}\n  ...\n\\end{minipage}",
            description: "Creates a 'pocket' or smaller page within an existing page.",
            guidelines: [
                "Requires a width argument (e.g., 0.5\\textwidth or 5cm).",
                "Text inside a minipage wraps within its boundaries like a normal page.",
                "Useful for putting two images or an image and text side-by-side.",
                "Minipages can have their own internal footnotes using letters (a, b, c)."
            ],
            technicalComment: "Creates a 'box' that behaves like a small page. It has its own footnotes and internal paragraph parameters. It effectively isolates the content's line-breaking and vertical alignment logic.",
            applicationPOV: "Pedagogical Design: Creating balanced, side-by-side comparisons of soil types or crop growth stages for clearer instructional materials.",
            options: [
                {
                    name: "{width}",
                    description: "Sets the horizontal span.",
                    impact: "width",
                    pdfImpact: "The box will be exactly this wide. Text will wrap at this boundary. Proportional widths (0.5\\textwidth) are better for responsive design.",
                    whenToUse: "Required. Use 0.48\\textwidth if you want two minipages per line with a small gap in between.",
                    technicalComment: "Directly sets the \\hsize for the content inside the box, constraining the line-breaking algorithm to this specific width.",
                    applicationPOV: "Layout Flexibility: Enabling scholars to design complex layouts (like posters or multi-column data sheets) with pixel-perfect control."
                }
            ],
            example: "Side-by-side data comparison.",
            preview: "[BOX A]    [BOX B]"
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
            technicalComment: "Stops reading the current file, opens the specified file for reading, and then resumes reading the original file once the input file is finished. It's a low-level stream switch.",
            applicationPOV: "Collaborative & Modular Research: Enabling scholars to manage large documents (like a PhD thesis) by splitting them into manageable, collaborative modules.",
            options: [
                {
                    name: "\\include{...}",
                    description: "Higher-level file inclusion (starts new page).",
                    impact: "include",
                    pdfImpact: "The included content always starts on a new page (\\clearpage is called automatically). Each included file gets its own .aux file for faster recompilation.",
                    whenToUse: "Use for chapter-level inclusion in a thesis. Pair with \\includeonly{ch1,ch3} in the preamble to compile only specific chapters during drafting.",
                    technicalComment: "Manages a specific .aux file for each included document, allowing for cross-references to be maintained even when files are excluded from compilation.",
                    applicationPOV: "Efficiency in Thesis Writing: Managing massive documents by allowing scholars to work on individual chapters without recompiling the entire thesis."
                },
                {
                    name: "\\tableofcontents",
                    description: "Auto-generates table of contents.",
                    impact: "toc",
                    pdfImpact: "A full Table of Contents page appears with section titles, numbering, and page numbers — all auto-generated. Requires two compilations to resolve page numbers.",
                    whenToUse: "Place right after \\maketitle or on its own page. Essential for any document longer than 5 pages. Add \\listoffigures and \\listoftables for completeness.",
                    technicalComment: "Reads the .toc auxiliary file generated in previous runs. Each \section entry in the main code writes a line to this auxiliary file.",
                    applicationPOV: "Information Retrieval: Providing an interactive and clear roadmap for the entire research paper, aiding the reader's navigation as per NEP 2020."
                },
                {
                    name: "\\appendix",
                    description: "Starts the appendix section.",
                    impact: "app",
                    pdfImpact: "All \\section commands after \\appendix are numbered with letters (A, B, C) instead of numbers. 'Appendix A: Raw Data' appears in the PDF.",
                    whenToUse: "Place before your first appendix section. Use for raw data tables, questionnaires, supplementary figures, and code listings.",
                    technicalComment: "Resets the section counter and redefines \thesection to use the \Alph format for alphabetical numbering.",
                    applicationPOV: "Structural Logic: Organising supplementary materials separately from the main narrative, ensuring a clean and professional research output."
                }
            ],
            example: "Managing large documents easily.",
            preview: "Chapter 1: Introduction (Inserted)"
        },
        {
            name: "\\tableofcontents",
            syntax: "\\tableofcontents",
            description: "Automatically generates a structured Table of Contents.",
            guidelines: [
                "LaTeX scans all \\section, \\subsection, etc., to build this list automatically.",
                "Requires two or three compilations to resolve page numbers correctly.",
                "Use \\addcontentsline if you need to manually add an unnumbered section to the TOC."
            ],
            technicalComment: "Reads the .toc file generated during previous compilation passes. Each formatting command writes its title and page number to this file.",
            applicationPOV: "Accessibility: Providing readers with an instant roadmap of the research journey, particularly useful for massive documents like PhD theses.",
            options: [
                {
                    name: "\\listoffigures",
                    description: "Generates a list of all images.",
                    impact: "lof",
                    pdfImpact: "Creates a 'List of Figures' page with figure titles and sequence numbers.",
                    whenToUse: "Mandatory for theses and technical reports with more than 5 figures.",
                    technicalComment: "Operates identically to \\tableofcontents but reads from the .lof file, which tracks the 'figure' counter.",
                    applicationPOV: "Visual Cataloging: Organizing graphical evidence for quick retrieval by peer reviewers and scholars."
                }
            ],
            example: "Instant navigation.",
            preview: "1. Introduction ..... 5"
        }
    ],
    "session-3-multilingual": [
        {
            name: "\\usepackage{babel}",
            syntax: "\\usepackage[hindi, english]{babel}",
            description: "Enables multilingual support and hyphenation rules.",
            guidelines: [
                "The last language in the list is the main language of the document.",
                "Babel automatically translates internal titles like 'Contents' and 'Abstract'.",
                "Use \\selectlanguage{...} to switch languages in the middle of a document.",
                "Essential for publishing research in regional languages like Hindi or Kannada."
            ],
            technicalComment: "Modifies standard strings (like 'Chapter' to 'अध्याय') and hyphenation rules based on the selected language. It uses language-specific .ldf files to redefine internal macros.",
            applicationPOV: "Inclusive Education: Enabling scholars to publish research in their mother tongue (e.g., Hindi, Kannada), fulfilling NEP 2020's vision of promoting Indian languages and multilingualism.",
            options: [
                {
                    name: "[hindi]",
                    description: "Enables Hindi/Devanagari support.",
                    impact: "hi",
                    pdfImpact: "Internal strings like 'Table of Contents' become 'विषय-सूची'. Hyphenation for Hindi script is activated.",
                    whenToUse: "Required for bilingual or Hindi-only journals and textbooks.",
                    technicalComment: "Loads hindic.ldf and sets up the Devanagari font encoding. Maps Arabic numerals to Devanagari digits if configured.",
                    applicationPOV: "Localization: Professionalizing Devanagari typesetting for academic research, ensuring cultural relevance in educational materials."
                },
                {
                    name: "\\selectlanguage{...}",
                    description: "Switches the active language.",
                    impact: "switch",
                    pdfImpact: "Immediately changes hyphenation and auto-titles to the specified language from that point forward.",
                    whenToUse: "Use in a bilingual paper when switching from an English abstract to a Kannada main body.",
                    technicalComment: "Global macro that updates the current hyphenation patterns in the TeX engine's memory and remaps all language-dependent strings.",
                    applicationPOV: "Multidisciplinary Approach: Crafting bilingual research papers that cater to both international and local readers, as per NEP 2020 trends."
                }
            ],
            example: "Bilingual document foundations.",
            preview: "Chapter 1 / अध्याय 1"
        },
        {
            name: "\\usepackage{polyglossia}",
            syntax: "\\setmainlanguage{hindi}\n\\setotherlanguage{english}",
            description: "The modern successor to Babel, designed for XeLaTeX and LuaLaTeX.",
            guidelines: [
                "Requires XeLaTeX or LuaLaTeX compiler (Babel works with standard PDFLaTeX).",
                "Best for complex Indian scripts as it uses OpenType font technologies.",
                "Specify fonts using \\newfontfamily\\hindifont[Script=Devanagari]{Lohit Hindi}.",
                "Handles right-to-left and left-to-right text seamlessly."
            ],
            technicalComment: "Engineered for modern TeX engines. It leverages fontspec and OpenType features like glyph substitution to handle the complex ligatures of Indian scripts accurately.",
            applicationPOV: "Digital Preservation: Promoting high-precision digital rendering of Indian languages using modern script technology, fulfilling NEP 2020's technology mandate.",
            options: [
                {
                    name: "\\setmainlanguage{...}",
                    description: "Sets the primary document language.",
                    impact: "main",
                    pdfImpact: "Global document settings, date formats, and auto-generated headings are set to this language.",
                    whenToUse: "The first thing to set after loading polyglossia. Use for the language most of your content is in.",
                    technicalComment: "Defines the root language node in the polyglossia state machine, configuring the default directional flow and script features.",
                    applicationPOV: "Universal Design: Creating documents that are natively designed for local languages rather than being translated afterthoughts."
                }
            ],
            example: "Next-gen multilingual rendering.",
            preview: "Script: Devanagari Enabled"
        }
    ],
    "session-4-specialized": [
        {
            name: "\\documentclass{beamer}",
            syntax: "\\documentclass{beamer}\n\\usetheme{Madrid}",
            description: "Creates professional presentation slides.",
            guidelines: [
                "Each 'page' is called a 'frame'.",
                "Use \\pause to reveal content step-by-step.",
                "Themes like 'Madrid', 'Berlin', and 'Frankfurt' are built-in.",
                "Beamer automatically handles TOC and navigation bars."
            ],
            technicalComment: "A specialized document class that overloads the layout engine to produce pages with the aspect ratio of slides (usually 4:3 or 16:9). It uses complex overlays and PDF layers for animations.",
            applicationPOV: "Effective Communication: Equipping scholars with tools to present complex data at international conferences with high visual impact.",
            options: [
                {
                    name: "\\begin{frame}",
                    description: "Defines a single slide.",
                    impact: "frame",
                    pdfImpact: "Creates a new slide page in the PDF. Text is automatically centered and scaled for screen viewing.",
                    whenToUse: "The core building block of any presentation.",
                    technicalComment: "Resets the page geometry and title/footer macros for each frame. Manages the 'allowframebreaks' logic for long content.",
                    applicationPOV: "Structured Presentation: Organizing thoughts into digestible, single-focus units for better audience engagement."
                },
                {
                    name: "\\pause",
                    description: "Creates a reveal effect.",
                    impact: "pause",
                    pdfImpact: "Splits the frame into two PDF pages. The first shows content before \\pause, the second shows everything.",
                    whenToUse: "Use to prevent 'information overload' by showing points one by one.",
                    technicalComment: "Increments the 'overlay' counter and triggers a page shipout while preserving the current cursor position for the next overlay.",
                    applicationPOV: "Pedagogical Clarity: Guiding the audience's attention through a narrative sequence, improving knowledge retention."
                }
            ],
            example: "The standard for academic slides.",
            preview: "Slide 1: Research Objectives"
        },
        {
            name: "\\documentclass{IEEEtran}",
            syntax: "\\documentclass[journal]{IEEEtran}",
            description: "The standard class for IEEE journal and conference papers.",
            guidelines: [
                "Uses an extremely strict two-column layout by default.",
                "Specific commands for keywords (\\begin{IEEEkeywords}) and biographies (\\begin{IEEEbiography}).",
                "Load 'cite' package to handle IEEE-style citation numbering [1]-[3].",
                "Requires specific metadata handling for peer reviews (peerreview option)."
            ],
            technicalComment: "A highly customized class file that implements the micro-typography and layout specific to IEEE publications, including double-column balancing and specific header fonts.",
            applicationPOV: "Global Publication Standards: Seamlessly adapting research to the world's most prestigious engineering journals with zero formatting stress.",
            options: [
                {
                    name: "[conference]",
                    description: "Format for IEEE conference papers.",
                    impact: "conf",
                    pdfImpact: "Adjusts margins and heading styles to match the slightly different requirements for IEEE conference proceedings compared to journals.",
                    whenToUse: "When submitting to specific technical conferences organized by IEEE.",
                    technicalComment: "Toggles internal boolean flags that switch between journal-style (running headers) and conference-style (no running headers) layouts.",
                    applicationPOV: "Versatility: Allowing researchers to quickly pivot their manuscript between journal and conference formats."
                },
                {
                    name: "\\begin{IEEEkeywords}",
                    description: "Section for index terms.",
                    impact: "keywords",
                    pdfImpact: "Renders as 'Index Terms — keyword1, keyword2' in the specific IEEE-mandated bold italic font.",
                    whenToUse: "Mandatory for all IEEE submissions to improve searchability.",
                    technicalComment: "A specialized environment that handles the indentation and labeling of search-engine optimized metadata within the PDF stream.",
                    applicationPOV: "Information Discovery: Enhancing the reach of research through structured metadata that search engines can easily index."
                }
            ],
            example: "Engineering publication gold standard.",
            preview: "Index Terms — Wireless Sensors..."
        }
    ]
};
