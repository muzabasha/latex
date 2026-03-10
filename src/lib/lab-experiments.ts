export interface LabCheck {
    label: string;
    regex: RegExp;
    hint: string;
}

export interface CodeSnippet {
    label: string;
    code: string;
    description: string;
}

export interface GuidedStep {
    instruction: string;
    codeToAdd: string;
    checkRegex: RegExp;
}

export interface CommandOption {
    option: string;
    impact: string;
}

export interface CommandTip {
    command: string;
    userTip: string;
    options: CommandOption[];
}

export interface LabExperiment {
    id: string;
    title: string;
    difficulty: "seedling" | "sprout" | "harvester";
    category: string;
    agriContext: string;
    objective: string;
    instructions: string[];
    starterCode: string;
    checks: LabCheck[];
    successMessage: string;
    proTip: string;
    snippets?: CodeSnippet[];
    guidedSteps?: GuidedStep[];
    tips?: CommandTip[];
}

export const LAB_EXPERIMENTS: LabExperiment[] = [
    // ═══════════════════════════════════════════════
    // SEEDLING: Foundation Skills (Beginner)
    // ═══════════════════════════════════════════════

    {
        id: "seed-1",
        title: "Hello Agriculture World",
        difficulty: "seedling",
        category: "Document Structure",
        agriContext: "Every research journey starts with a single document — like planting your first seed.",
        objective: "Create a minimal LaTeX document with \\documentclass, \\begin{document}, and \\end{document}.",
        instructions: [
            "Keep \\documentclass{article} as the first line.",
            "Write a greeting message between \\begin{document} and \\end{document}.",
            "Add a % comment line to annotate your code.",
            "Click Compile and watch your first PDF appear on the right."
        ],
        starterCode: `\\documentclass{article}\n\\begin{document}\n\n% Replace this comment with your greeting!\n\n\\end{document}`,
        checks: [
            { label: "Has \\documentclass", regex: /\\documentclass\{/, hint: "The very first line must declare the document type." },
            { label: "Has \\begin{document}", regex: /\\begin\{document\}/, hint: "This opens the content area of your paper." },
            { label: "Has visible text", regex: /\\begin\{document\}\s*\n[\s\S]*[A-Za-z]{3,}/, hint: "Write at least one sentence between \\begin and \\end." },
            { label: "Has a % comment", regex: /%.*[A-Za-z]/, hint: "Add a comment line starting with % to annotate your code." },
            { label: "Has \\end{document}", regex: /\\end\{document\}/, hint: "Always close what you open — like closing the barn door." }
        ],
        successMessage: "Your first LaTeX document compiled! You've planted the seed. 🌱",
        proTip: "Lines starting with % are comments — LaTeX ignores them. Use them to leave notes for yourself.",
        snippets: [
            { label: "Document class", code: "\\documentclass{article}", description: "Declares document type" },
            { label: "Begin document", code: "\\begin{document}", description: "Opens content area" },
            { label: "End document", code: "\\end{document}", description: "Closes content area" },
            { label: "Comment", code: "% This is a comment", description: "Ignored by compiler" },
        ],
        guidedSteps: [
            { instruction: "The document class is already set. Write a greeting like 'Hello, Agriculture World!' between \\begin{document} and \\end{document}.", codeToAdd: "Hello, Agriculture World!", checkRegex: /[A-Za-z]{3,}/ },
            { instruction: "Add a comment line starting with % to annotate your code, e.g., % My first LaTeX document", codeToAdd: "% My first LaTeX document", checkRegex: /%.*[A-Za-z]/ },
        ],
        tips: [
            {
                command: "\\documentclass{...}",
                userTip: "Always place this as the very first line. Everything before \\begin{document} is the preamble.",
                options: [
                    { option: "\\documentclass{article}", impact: "Standard class for short papers (no chapters). Most common for journal submissions." },
                    { option: "\\documentclass{report}", impact: "Adds \\chapter support. Use for theses and dissertations." },
                    { option: "\\documentclass{book}", impact: "Adds \\chapter + \\part, front/back matter. Use for published books." },
                    { option: "\\documentclass{beamer}", impact: "Creates presentation slides instead of a document." },
                ]
            },
            {
                command: "\\begin{document} ... \\end{document}",
                userTip: "Everything visible in the PDF must be between these two commands. Anything outside is preamble (settings only).",
                options: [
                    { option: "Text before \\begin{document}", impact: "Causes a compile error. Only commands and package imports go in the preamble." },
                    { option: "Missing \\end{document}", impact: "Compile error: 'File ended while scanning'. Always close what you open." },
                ]
            },
            {
                command: "% (comment)",
                userTip: "Use comments liberally to annotate your code. They are invisible in the PDF output.",
                options: [
                    { option: "% single line comment", impact: "Everything after % on that line is ignored by the compiler." },
                    { option: "\\usepackage{comment} + \\begin{comment}", impact: "Allows multi-line block comments for hiding large sections." },
                ]
            },
        ]
    },
    {
        id: "seed-2",
        title: "Title Your Research",
        difficulty: "seedling",
        category: "Metadata",
        agriContext: "Every published paper needs a title page — it's the label on your seed packet.",
        objective: "Add \\title, \\author, \\date, and \\maketitle to your document.",
        instructions: [
            "Add \\title{...} in the preamble with a research topic.",
            "Add \\author{...} with your name.",
            "Add \\date{...} with a custom date, or use \\today for today's date.",
            "Place \\maketitle right after \\begin{document}."
        ],
        starterCode: `\\documentclass{article}\n\n% Add title, author, and date here\n\n\\begin{document}\n\n% Render the title block here\n\nThis paper studies the effect of organic fertilizers on wheat yield.\n\n\\end{document}`,
        checks: [
            { label: "Has \\title{...}", regex: /\\title\{.+\}/, hint: "Use \\title{Your Research Title} before \\begin{document}." },
            { label: "Has \\author{...}", regex: /\\author\{.+\}/, hint: "Use \\author{Your Name} in the preamble." },
            { label: "Has \\date{...} or \\today", regex: /\\date\{|\\today/, hint: "Use \\date{March 2026} or \\today for the current date." },
            { label: "Has \\maketitle", regex: /\\maketitle/, hint: "Place \\maketitle inside the document body to display the title." }
        ],
        successMessage: "Your paper now has a professional title page! 📄",
        proTip: "Use \\date{} (empty braces) to hide the date entirely. Use \\today to auto-insert today's date.",
        snippets: [
            { label: "Title", code: "\\title{Your Research Title}", description: "Sets the document title" },
            { label: "Author", code: "\\author{Your Name}", description: "Sets the author name" },
            { label: "Date", code: "\\date{March 2026}", description: "Sets a custom date" },
            { label: "Today's date", code: "\\today", description: "Auto-inserts current date" },
            { label: "Make title", code: "\\maketitle", description: "Renders the title block" },
        ],
        guidedSteps: [
            { instruction: "Add \\title{Effect of Organic Fertilizers on Wheat Yield} in the preamble.", codeToAdd: "\\title{Effect of Organic Fertilizers on Wheat Yield}", checkRegex: /\\title\{.+\}/ },
            { instruction: "Add \\author{Research Scholar} and \\date{\\today} after the title.", codeToAdd: "\\author{Research Scholar}\n\\date{\\today}", checkRegex: /\\author\{.+\}/ },
            { instruction: "Add \\maketitle right after \\begin{document}.", codeToAdd: "\\maketitle", checkRegex: /\\maketitle/ },
        ],
        tips: [
            {
                command: "\\title{...}",
                userTip: "Place in the preamble. The title only appears in the PDF when \\maketitle is called inside the document body.",
                options: [
                    { option: "\\title{Short Title}", impact: "Renders a single-line centered title on the title page." },
                    { option: "\\title{Long Title \\\\\\\\ with Subtitle}", impact: "The \\\\\\\\ forces a line break, creating a two-line title." },
                    { option: "Omitting \\title entirely", impact: "\\maketitle will still work but shows a blank title area." },
                ]
            },
            {
                command: "\\author{...}",
                userTip: "For multiple authors, separate with \\and. Use \\\\\\\\ for affiliation on a new line.",
                options: [
                    { option: "\\author{Name}", impact: "Single author centered below the title." },
                    { option: "\\author{Name1 \\and Name2}", impact: "Two authors displayed side by side." },
                    { option: "\\author{Name \\\\\\\\ Department}", impact: "Author name with affiliation on the next line." },
                ]
            },
            {
                command: "\\date{...}",
                userTip: "Controls the date line on the title page. Omitting \\date defaults to today's date.",
                options: [
                    { option: "\\date{March 2026}", impact: "Shows the exact custom date you specify." },
                    { option: "\\date{\\today}", impact: "Auto-inserts the current compilation date (e.g., March 10, 2026)." },
                    { option: "\\date{}", impact: "Empty braces suppress the date entirely — no date line appears." },
                    { option: "Omitting \\date", impact: "Defaults to \\today — the compilation date is shown automatically." },
                ]
            },
            {
                command: "\\maketitle",
                userTip: "Must appear inside \\begin{document}. It renders the title block using \\title, \\author, and \\date values.",
                options: [
                    { option: "\\maketitle (in article class)", impact: "Title, author, date appear at the top of page 1 with content below." },
                    { option: "\\maketitle (in report/book class)", impact: "Creates a separate dedicated title page." },
                    { option: "Forgetting \\maketitle", impact: "Title, author, and date are defined but never rendered in the PDF." },
                ]
            },
        ]
    },
    {
        id: "seed-3",
        title: "Bold, Italic & Emphasis",
        difficulty: "seedling",
        category: "Text Formatting",
        agriContext: "Scientific names like Oryza sativa must be italicized. Key findings must be bold.",
        objective: "Use \\textbf, \\textit, \\emph, and \\underline for text formatting.",
        instructions: [
            "Make at least one word bold using \\textbf{...}.",
            "Make at least one word italic using \\textit{...}.",
            "Use \\emph{...} for semantic emphasis.",
            "Use \\underline{...} to underline a word."
        ],
        starterCode: `\\documentclass{article}\n\\begin{document}\n\n\\section{Crop Analysis}\n\nThe rice variety known as Oryza sativa showed significant yield improvement.\nThe nitrogen content was the primary factor.\nThis finding is important for future research.\n\n% Apply formatting: italic for scientific name, bold for key word,\n% emph for emphasis, underline for important term\n\n\\end{document}`,
        checks: [
            { label: "Uses \\textbf{...}", regex: /\\textbf\{.+\}/, hint: "Wrap important words in \\textbf{bold text}." },
            { label: "Uses \\textit{...}", regex: /\\textit\{.+\}/, hint: "Wrap scientific names in \\textit{italic text}." },
            { label: "Uses \\emph{...}", regex: /\\emph\{.+\}/, hint: "Use \\emph{text} for context-aware emphasis." },
            { label: "Uses \\underline{...}", regex: /\\underline\{.+\}/, hint: "Use \\underline{text} to underline." }
        ],
        successMessage: "You can now emphasize key findings like a pro researcher! ✨",
        proTip: "\\emph{} is smarter than \\textit{} — inside italic text, \\emph toggles back to upright.",
        snippets: [
            { label: "Bold", code: "\\textbf{bold text}", description: "Makes text bold" },
            { label: "Italic", code: "\\textit{italic text}", description: "Makes text italic" },
            { label: "Emphasis", code: "\\emph{emphasized}", description: "Context-aware emphasis" },
            { label: "Underline", code: "\\underline{text}", description: "Underlines text" },
        ],
        tips: [
            {
                command: "\\textbf{...}",
                userTip: "Use for key findings and important terms. Avoid overuse — if everything is bold, nothing stands out.",
                options: [
                    { option: "\\textbf{significant}", impact: "Renders the word in bold weight. PDF shows heavier strokes." },
                    { option: "\\textbf{\\textit{text}}", impact: "Nesting produces bold-italic text. Order doesn't matter." },
                    { option: "{\\bfseries paragraph}", impact: "Alternative: makes an entire paragraph bold using a declaration." },
                ]
            },
            {
                command: "\\textit{...}",
                userTip: "Standard for scientific names (Oryza sativa), book titles, and foreign words.",
                options: [
                    { option: "\\textit{Oryza sativa}", impact: "Renders text in italic. Standard for genus/species names." },
                    { option: "{\\itshape paragraph}", impact: "Declaration form: makes everything in the group italic." },
                    { option: "\\textit{already \\textit{nested}}", impact: "Double italic stays italic — no toggle effect (unlike \\emph)." },
                ]
            },
            {
                command: "\\emph{...}",
                userTip: "Preferred over \\textit for semantic emphasis. It toggles: italic in normal text, upright in italic text.",
                options: [
                    { option: "\\emph{important} in normal text", impact: "Renders as italic — visually identical to \\textit." },
                    { option: "\\textit{text with \\emph{word}}", impact: "Inside italic context, \\emph toggles to upright (roman) — the word stands out." },
                    { option: "\\emph{\\emph{nested}}", impact: "Double \\emph toggles back to the original style." },
                ]
            },
            {
                command: "\\underline{...}",
                userTip: "Rarely used in academic papers. Underlining is a typewriter convention — prefer bold or italic instead.",
                options: [
                    { option: "\\underline{text}", impact: "Draws a line under the text. Does not break across lines." },
                    { option: "\\usepackage{ulem} + \\uline{text}", impact: "Better underlining that wraps across line breaks." },
                    { option: "\\usepackage{ulem} + \\sout{text}", impact: "Strikethrough text — useful for showing corrections." },
                ]
            },
        ]
    },
    {
        id: "seed-4",
        title: "Monospace & Font Sizes",
        difficulty: "seedling",
        category: "Text Formatting",
        agriContext: "Code snippets and variable names in research papers use monospace. Font sizes help create visual hierarchy.",
        objective: "Use \\texttt for monospace and font size commands like \\large, \\Large, \\huge.",
        instructions: [
            "Use \\texttt{...} to display a code-like term.",
            "Use {\\large ...} to make a paragraph larger.",
            "Use {\\Large ...} for even larger text.",
            "Use {\\footnotesize ...} for small text."
        ],
        starterCode: `\\documentclass{article}\n\\begin{document}\n\n\\section{Software Tools}\n\nThe data was processed using the R function lm() for linear regression.\n\nImportant Notice: Always calibrate instruments before field work.\n\nDetailed methodology is available in the supplementary materials.\n\nNote: Sample size was n=30.\n\n% Make 'lm()' monospace with \\texttt\n% Make 'Important Notice' large\n% Make 'Detailed methodology' Large\n% Make 'Note' footnotesize\n\n\\end{document}`,
        checks: [
            { label: "Uses \\texttt{...}", regex: /\\texttt\{.+\}/, hint: "Use \\texttt{lm()} for code-like text." },
            { label: "Uses {\\large ...}", regex: /\{\\large\s/, hint: "Wrap text in {\\large your text} for larger font." },
            { label: "Uses {\\Large ...}", regex: /\{\\Large\s/, hint: "Use {\\Large text} for even bigger text." },
            { label: "Uses {\\footnotesize ...}", regex: /\{\\footnotesize\s/, hint: "Use {\\footnotesize text} for smaller text." }
        ],
        successMessage: "You now control font styles and sizes like a typographer! 🔤",
        proTip: "Always scope font size changes with braces: {\\large text}. Without braces, everything after becomes large.",
        snippets: [
            { label: "Monospace", code: "\\texttt{code text}", description: "Typewriter/code font" },
            { label: "Large", code: "{\\large larger text}", description: "Slightly larger font" },
            { label: "LARGE", code: "{\\Large even larger}", description: "Bigger font" },
            { label: "Huge", code: "{\\huge huge text}", description: "Very large font" },
            { label: "Footnote size", code: "{\\footnotesize small text}", description: "Smaller font" },
            { label: "Tiny", code: "{\\tiny tiny text}", description: "Smallest font" },
        ],
        tips: [
            {
                command: "\\texttt{...}",
                userTip: "Use for code, filenames, URLs, and variable names. Renders in a fixed-width (monospace) font.",
                options: [
                    { option: "\\texttt{lm()}", impact: "Displays in typewriter font — clearly distinguishes code from prose." },
                    { option: "{\\ttfamily paragraph}", impact: "Declaration form: makes an entire block monospace." },
                    { option: "\\texttt{\\textbf{bold code}}", impact: "Nesting with bold creates bold monospace text." },
                ]
            },
            {
                command: "Font size commands",
                userTip: "Always scope with braces: {\\large text}. Without braces, everything after the command becomes that size.",
                options: [
                    { option: "{\\tiny text}", impact: "5pt — smallest readable size. Use for fine print or margin notes." },
                    { option: "{\\scriptsize text}", impact: "7pt — slightly larger than tiny. Good for footnotes in tables." },
                    { option: "{\\footnotesize text}", impact: "8pt — standard footnote size." },
                    { option: "{\\small text}", impact: "9pt — slightly smaller than body text." },
                    { option: "{\\normalsize text}", impact: "10/11/12pt — default body size (depends on class option)." },
                    { option: "{\\large text}", impact: "12pt — good for subsection-like emphasis." },
                    { option: "{\\Large text}", impact: "14pt — good for section-like headings." },
                    { option: "{\\LARGE text}", impact: "17pt — prominent headings." },
                    { option: "{\\huge text}", impact: "20pt — title-level text." },
                    { option: "{\\Huge text}", impact: "25pt — largest standard size. Use for cover pages." },
                ]
            },
        ]
    },
    {
        id: "seed-5",
        title: "Lists: Bullets, Numbers & Descriptions",
        difficulty: "seedling",
        category: "Lists",
        agriContext: "Research papers list materials, methods, and findings. Lists keep data organized.",
        objective: "Create itemize, enumerate, and description lists.",
        instructions: [
            "Create a bulleted list using \\begin{itemize} with 3+ items.",
            "Create a numbered list using \\begin{enumerate} with 3+ steps.",
            "Create a description list using \\begin{description} with labeled items."
        ],
        starterCode: `\\documentclass{article}\n\\begin{document}\n\n\\section{Materials}\nThe following soil types were collected:\n\n% Create a bulleted list of soil types\n\n\\section{Methodology}\nThe experiment followed these steps:\n\n% Create a numbered list of steps\n\n\\section{Key Terms}\n\n% Create a description list with definitions\n\n\\end{document}`,
        checks: [
            { label: "Has \\begin{itemize}", regex: /\\begin\{itemize\}/, hint: "Start a bulleted list with \\begin{itemize}." },
            { label: "Has \\begin{enumerate}", regex: /\\begin\{enumerate\}/, hint: "Start a numbered list with \\begin{enumerate}." },
            { label: "Has \\begin{description}", regex: /\\begin\{description\}/, hint: "Start a description list with \\begin{description}." },
            { label: "Has 5+ \\item entries", regex: /(\\item[\s\S]*?){5,}/, hint: "Add at least 5 \\item entries across all lists." },
            { label: "All lists closed", regex: /\\end\{itemize\}[\s\S]*\\end\{enumerate\}|\\end\{enumerate\}[\s\S]*\\end\{itemize\}/, hint: "Close each list with the matching \\end{...}." }
        ],
        successMessage: "Your materials and methods are neatly organized! 📋",
        proTip: "In description lists, use \\item[Term] to define the label. Nest lists up to 4 levels deep.",
        snippets: [
            { label: "Bullet list", code: "\\begin{itemize}\n  \\item First\n  \\item Second\n\\end{itemize}", description: "Unordered list" },
            { label: "Numbered list", code: "\\begin{enumerate}\n  \\item Step one\n  \\item Step two\n\\end{enumerate}", description: "Ordered list" },
            { label: "Description list", code: "\\begin{description}\n  \\item[Term] Definition here\n\\end{description}", description: "Labeled definitions" },
        ],
        tips: [
            {
                command: "\\begin{itemize}",
                userTip: "Creates bullet points. Default symbol is a filled circle (•). Nest up to 4 levels for sub-bullets.",
                options: [
                    { option: "\\item Text", impact: "Standard bullet point with • symbol." },
                    { option: "\\item[-] Text", impact: "Custom bullet: replaces • with a dash (-)." },
                    { option: "\\item[$\\star$] Text", impact: "Custom bullet: uses a star symbol (★)." },
                    { option: "Nested itemize (level 2)", impact: "Bullet changes to – (en-dash) automatically." },
                    { option: "Nested itemize (level 3)", impact: "Bullet changes to * (asterisk) automatically." },
                ]
            },
            {
                command: "\\begin{enumerate}",
                userTip: "Creates numbered lists. Numbers auto-increment. Nesting changes to (a), i., A. automatically.",
                options: [
                    { option: "\\item Text", impact: "Numbered 1. 2. 3. automatically." },
                    { option: "\\item[(a)] Text", impact: "Custom label: overrides the number with (a)." },
                    { option: "\\usepackage{enumitem} + [label=\\alph*)]", impact: "Changes all items to a) b) c) format." },
                    { option: "\\usepackage{enumitem} + [start=5]", impact: "Starts numbering from 5 instead of 1." },
                ]
            },
            {
                command: "\\begin{description}",
                userTip: "Perfect for glossaries and term definitions. The label in square brackets appears bold by default.",
                options: [
                    { option: "\\item[Term] Definition", impact: "Term appears in bold, followed by the definition text." },
                    { option: "\\item[Long Term Name] Def", impact: "Long labels may cause awkward indentation. Use enumitem to adjust." },
                ]
            },
        ]
    },
    {
        id: "seed-6",
        title: "Packages & Colors",
        difficulty: "seedling",
        category: "Packages",
        agriContext: "Just like adding fertilizer to soil, packages add capabilities to your LaTeX document.",
        objective: "Import packages with \\usepackage and use colored text with xcolor.",
        instructions: [
            "Add \\usepackage{xcolor} in the preamble.",
            "Use \\textcolor{red}{...} to color a warning text.",
            "Use \\colorbox{yellow}{...} to highlight a key finding."
        ],
        starterCode: `\\documentclass{article}\n\n% Add the xcolor package here\n\n\\begin{document}\n\n\\section{Soil pH Warning}\n\nThe soil pH dropped below 4.5, which is critically acidic.\n\nKey finding: Lime application restored pH to 6.8 within 3 months.\n\n\\end{document}`,
        checks: [
            { label: "Has \\usepackage{xcolor}", regex: /\\usepackage\{xcolor\}/, hint: "Add \\usepackage{xcolor} before \\begin{document}." },
            { label: "Uses \\textcolor", regex: /\\textcolor\{.+\}\{.+\}/, hint: "Use \\textcolor{red}{warning text} to color text." },
            { label: "Uses \\colorbox", regex: /\\colorbox\{.+\}\{.+\}/, hint: "Use \\colorbox{yellow}{text} for background color." }
        ],
        successMessage: "You've learned to enhance documents with color! 🎨",
        proTip: "Use colors sparingly in academic papers. Most journals prefer black text with minimal color.",
        snippets: [
            { label: "xcolor package", code: "\\usepackage{xcolor}", description: "Enables color commands" },
            { label: "Text color", code: "\\textcolor{red}{text}", description: "Colors the text" },
            { label: "Color box", code: "\\colorbox{yellow}{text}", description: "Highlights with background" },
        ],
        tips: [
            {
                command: "\\usepackage{...}",
                userTip: "Always place in the preamble (before \\begin{document}). Order matters — some packages conflict if loaded in wrong order.",
                options: [
                    { option: "\\usepackage{xcolor}", impact: "Loads the color package with basic color names (red, blue, green, etc.)." },
                    { option: "\\usepackage[dvipsnames]{xcolor}", impact: "Adds 68 named colors like ForestGreen, RoyalBlue, Maroon." },
                    { option: "\\usepackage[table]{xcolor}", impact: "Enables row/column coloring in tables with \\rowcolor." },
                    { option: "\\usepackage[x11names]{xcolor}", impact: "Adds 300+ X11 color names for maximum variety." },
                ]
            },
            {
                command: "\\textcolor{color}{text}",
                userTip: "Use sparingly in academic papers. Most journals prefer black text. Good for highlighting warnings or key values.",
                options: [
                    { option: "\\textcolor{red}{warning}", impact: "Text appears in red — good for critical warnings." },
                    { option: "\\textcolor{blue}{link text}", impact: "Blue text — commonly used for hyperlink-style text." },
                    { option: "\\textcolor[RGB]{34,139,34}{text}", impact: "Custom RGB color — precise color control." },
                    { option: "\\textcolor[HTML]{FF6600}{text}", impact: "HTML hex color code — familiar to web developers." },
                ]
            },
            {
                command: "\\colorbox{color}{text}",
                userTip: "Creates a colored background behind text. Useful for highlighting key findings or definitions.",
                options: [
                    { option: "\\colorbox{yellow}{highlighted}", impact: "Yellow background — mimics a highlighter pen effect." },
                    { option: "\\colorbox{lightgray}{code}", impact: "Gray background — good for inline code snippets." },
                    { option: "\\fcolorbox{red}{yellow}{text}", impact: "Colored box with a colored border — double emphasis." },
                ]
            },
        ]
    },
    {
        id: "seed-7",
        title: "Page Layout & Geometry",
        difficulty: "seedling",
        category: "Page Setup",
        agriContext: "Journals have strict margin requirements. The geometry package gives you precise control.",
        objective: "Use the geometry package to set margins and the \\newpage command.",
        instructions: [
            "Add \\usepackage{geometry} in the preamble.",
            "Set margins using \\geometry{margin=1in} or individual margins.",
            "Use \\newpage to force a page break.",
            "Add a \\footnote{...} to a sentence."
        ],
        starterCode: `\\documentclass[12pt, a4paper]{article}\n\n% Add geometry package and set margins\n\n\\begin{document}\n\n\\section{Introduction}\nThis study examines soil moisture retention in semi-arid regions.\nThe research was conducted at the university farm.\n\n% Add a footnote to 'university farm'\n% Add a \\newpage here\n\n\\section{Results}\nThe results show significant improvement.\n\n\\end{document}`,
        checks: [
            { label: "Has \\usepackage{geometry}", regex: /\\usepackage\{geometry\}|\\usepackage\[.*\]\{geometry\}/, hint: "Add \\usepackage{geometry} in the preamble." },
            { label: "Has margin setting", regex: /\\geometry\{|margin=|top=|bottom=|left=|right=/, hint: "Set margins with \\geometry{margin=1in} or individual values." },
            { label: "Has \\newpage", regex: /\\newpage|\\clearpage/, hint: "Use \\newpage to start a new page." },
            { label: "Has \\footnote{...}", regex: /\\footnote\{.+\}/, hint: "Add \\footnote{explanation} after a word." }
        ],
        successMessage: "You now control page layout like a journal editor! 📐",
        proTip: "Use \\clearpage instead of \\newpage when you want all pending floats (tables/figures) to be placed first.",
        snippets: [
            { label: "Geometry package", code: "\\usepackage[margin=1in]{geometry}", description: "Sets all margins to 1 inch" },
            { label: "Custom margins", code: "\\geometry{top=2cm, bottom=2cm, left=2.5cm, right=2.5cm}", description: "Individual margins" },
            { label: "New page", code: "\\newpage", description: "Forces a page break" },
            { label: "Clear page", code: "\\clearpage", description: "Page break + flush floats" },
            { label: "Footnote", code: "\\footnote{Explanation text}", description: "Adds a footnote" },
        ],
        tips: [
            {
                command: "\\usepackage{geometry}",
                userTip: "The most reliable way to set margins. Pass options either as package options or via \\geometry{...} command.",
                options: [
                    { option: "\\usepackage[margin=1in]{geometry}", impact: "Sets all four margins to 1 inch — common for US journals." },
                    { option: "\\geometry{top=2cm, bottom=2cm, left=3cm, right=2cm}", impact: "Individual margin control — left is wider for binding." },
                    { option: "\\geometry{a4paper, margin=2.5cm}", impact: "Explicitly sets A4 paper with 2.5cm margins." },
                    { option: "\\geometry{landscape}", impact: "Switches to landscape orientation — wider than tall." },
                ]
            },
            {
                command: "\\newpage vs \\clearpage",
                userTip: "Both force a page break, but \\clearpage also flushes all pending floats (tables/figures) before the break.",
                options: [
                    { option: "\\newpage", impact: "Starts a new page. Pending floats may appear after the break." },
                    { option: "\\clearpage", impact: "Flushes ALL pending floats first, then starts a new page. Use between chapters." },
                    { option: "\\pagebreak", impact: "Suggests a page break but stretches text to fill the current page (ugly spacing)." },
                    { option: "\\newpage in twocolumn", impact: "Only breaks the current column, not the full page. Use \\clearpage for full page." },
                ]
            },
            {
                command: "\\footnote{...}",
                userTip: "Place immediately after the word (no space). The footnote number auto-increments and appears at the page bottom.",
                options: [
                    { option: "word\\footnote{explanation}", impact: "Superscript number appears after 'word'; text at page bottom." },
                    { option: "\\footnote[5]{text}", impact: "Forces footnote number to 5 instead of auto-numbering." },
                    { option: "\\footnote inside tables", impact: "Footnotes inside tabular don't work. Use \\usepackage{tablefootnote} instead." },
                ]
            },
        ]
    },
    {
        id: "seed-8",
        title: "Verbatim & Special Characters",
        difficulty: "seedling",
        category: "Special Text",
        agriContext: "When documenting code or commands in your paper, you need verbatim mode to prevent LaTeX from interpreting them.",
        objective: "Use \\verb, \\begin{verbatim}, and escape special characters like %, $, &, #, _.",
        instructions: [
            "Use \\verb|...| to display inline code.",
            "Use \\begin{verbatim} for a block of code.",
            "Escape special characters: \\%, \\$, \\&, \\#, \\_."
        ],
        starterCode: `\\documentclass{article}\n\\begin{document}\n\n\\section{Data Processing}\n\nThe R command used was: % add inline verbatim here\n\nThe full script:\n% Add a verbatim block here\n\nThe yield increased by 40% and the cost was $500 per hectare.\nThe soil samples were labeled A&B with code #12.\n\n% Fix the special characters above!\n\n\\end{document}`,
        checks: [
            { label: "Has \\verb|...|", regex: /\\verb[|!+]/, hint: "Use \\verb|your code| for inline code display." },
            { label: "Has \\begin{verbatim}", regex: /\\begin\{verbatim\}/, hint: "Use \\begin{verbatim}...\\end{verbatim} for code blocks." },
            { label: "Escapes % correctly", regex: /\\%/, hint: "Use \\% to display a literal percent sign." },
            { label: "Escapes $ correctly", regex: /\\\$/, hint: "Use \\$ to display a literal dollar sign." },
            { label: "Escapes & correctly", regex: /\\&/, hint: "Use \\& to display a literal ampersand." }
        ],
        successMessage: "You can now safely display code and special characters! 💻",
        proTip: "The 10 special characters in LaTeX are: # $ % & _ { } ~ ^ \\. Escape them with a backslash.",
        snippets: [
            { label: "Inline verb", code: "\\verb|code here|", description: "Inline code display" },
            { label: "Verbatim block", code: "\\begin{verbatim}\nyour code here\n\\end{verbatim}", description: "Code block" },
            { label: "Escape %", code: "\\%", description: "Literal percent" },
            { label: "Escape $", code: "\\$", description: "Literal dollar" },
            { label: "Escape &", code: "\\&", description: "Literal ampersand" },
            { label: "Escape #", code: "\\#", description: "Literal hash" },
            { label: "Escape _", code: "\\_", description: "Literal underscore" },
        ],
        tips: [
            {
                command: "\\verb|...|",
                userTip: "The delimiter (|) can be any character not in the code. Use \\verb!...! if your code contains |.",
                options: [
                    { option: "\\verb|x = y + 1|", impact: "Displays code inline in monospace, preserving spaces and special chars." },
                    { option: "\\verb!path/to/file!", impact: "Uses ! as delimiter — useful when code contains | characters." },
                    { option: "\\verb inside \\textbf{}", impact: "DOES NOT WORK. \\verb cannot be used inside other commands." },
                ]
            },
            {
                command: "\\begin{verbatim}",
                userTip: "Preserves all formatting exactly as typed. No LaTeX commands are processed inside verbatim.",
                options: [
                    { option: "\\begin{verbatim}...\\end{verbatim}", impact: "Monospace block, all characters literal. Good for code listings." },
                    { option: "\\begin{verbatim*}...\\end{verbatim*}", impact: "Same but spaces are shown as visible ␣ symbols." },
                    { option: "\\usepackage{listings} + \\begin{lstlisting}", impact: "Better alternative: adds syntax highlighting, line numbers, and captions." },
                    { option: "\\usepackage{fancyvrb} + \\begin{Verbatim}", impact: "Enhanced verbatim with font size, line numbers, and frame options." },
                ]
            },
            {
                command: "Special character escaping",
                userTip: "LaTeX has 10 special characters: # $ % & _ { } ~ ^ \\. Each needs specific escaping.",
                options: [
                    { option: "\\# \\$ \\% \\& \\_", impact: "Backslash + character produces the literal symbol in the PDF." },
                    { option: "\\{ \\}", impact: "Literal curly braces — needed when braces are part of your text." },
                    { option: "\\textbackslash", impact: "Produces a literal backslash (\\). Note: \\\\ makes a line break instead." },
                    { option: "\\textasciitilde", impact: "Produces a literal tilde (~). Plain ~ creates a non-breaking space." },
                    { option: "\\textasciicircum", impact: "Produces a literal caret (^). Plain ^ enters math superscript mode." },
                ]
            },
        ]
    },
    // ═══════════════════════════════════════════════
    // SPROUT: Intermediate Skills
    // ═══════════════════════════════════════════════

    {
        id: "sprout-1",
        title: "Sections & Document Hierarchy",
        difficulty: "sprout",
        category: "Document Structure",
        agriContext: "A well-structured paper has clear sections: Introduction, Methods, Results, Discussion.",
        objective: "Use \\section, \\subsection, \\subsubsection, \\paragraph, and starred variants.",
        instructions: [
            "Create 3+ sections using \\section{...}.",
            "Add a \\subsection{...} and a \\subsubsection{...}.",
            "Use \\section*{...} for an unnumbered Abstract.",
            "Use \\paragraph{...} for a named paragraph."
        ],
        starterCode: `\\documentclass{article}\n\\title{Effect of Mulching on Soil Moisture}\n\\author{Agriculture Scholar}\n\\begin{document}\n\\maketitle\n\n% Add unnumbered Abstract, then numbered sections with subsections\n\n\\end{document}`,
        checks: [
            { label: "Has 3+ \\section{}", regex: /(\\section\*?\{[^}]+\}[\s\S]*?){3,}/, hint: "Create at least 3 sections." },
            { label: "Has \\subsection{}", regex: /\\subsection\{.+\}/, hint: "Add a subsection inside a section." },
            { label: "Has \\subsubsection{}", regex: /\\subsubsection\{.+\}/, hint: "Add a subsubsection for deeper nesting." },
            { label: "Has \\section*{} (unnumbered)", regex: /\\section\*\{/, hint: "Use \\section*{Abstract} for no number." },
            { label: "Has \\paragraph{}", regex: /\\paragraph\{.+\}/, hint: "Use \\paragraph{Title} for a named paragraph." }
        ],
        successMessage: "Your paper has professional structure with full hierarchy! 🏗️",
        proTip: "The hierarchy is: \\part > \\chapter > \\section > \\subsection > \\subsubsection > \\paragraph > \\subparagraph.",
        snippets: [
            { label: "Section", code: "\\section{Title}", description: "Numbered heading" },
            { label: "Subsection", code: "\\subsection{Title}", description: "Sub-heading" },
            { label: "Subsubsection", code: "\\subsubsection{Title}", description: "Sub-sub-heading" },
            { label: "Paragraph", code: "\\paragraph{Title}", description: "Named paragraph" },
            { label: "Unnumbered", code: "\\section*{Abstract}", description: "No number prefix" },
        ],
        tips: [
            {
                command: "\\section{...}",
                userTip: "The workhorse of document structure. Auto-numbered and auto-added to \\tableofcontents.",
                options: [
                    { option: "\\section{Introduction}", impact: "Creates '1 Introduction' — numbered, bold, large font." },
                    { option: "\\section*{Abstract}", impact: "Unnumbered section — not included in table of contents." },
                    { option: "\\section[Short]{Very Long Section Title}", impact: "Short title appears in TOC/headers; full title in the document." },
                    { option: "\\setcounter{secnumdepth}{2}", impact: "Only numbers sections and subsections; subsubsections become unnumbered." },
                ]
            },
            {
                command: "\\subsection{...} / \\subsubsection{...}",
                userTip: "Nesting creates the hierarchy: 1.1, 1.1.1. Don't skip levels (e.g., section → subsubsection).",
                options: [
                    { option: "\\subsection{Study Area}", impact: "Creates '1.1 Study Area' under the current section." },
                    { option: "\\subsubsection{Soil Sampling}", impact: "Creates '1.1.1 Soil Sampling' — deepest numbered level in article class." },
                    { option: "\\subsection*{Unnumbered}", impact: "Unnumbered subsection — useful for acknowledgments." },
                ]
            },
            {
                command: "\\paragraph{...} / \\subparagraph{...}",
                userTip: "These create run-in headings (bold title followed by text on the same line). No numbering by default.",
                options: [
                    { option: "\\paragraph{Note}", impact: "Bold 'Note' followed by text on the same line — no line break after title." },
                    { option: "\\subparagraph{Detail}", impact: "Deepest level. Indented, bold title, text continues on same line." },
                ]
            },
        ]
    },
    {
        id: "sprout-2",
        title: "Inline & Display Math",
        difficulty: "sprout",
        category: "Mathematics",
        agriContext: "Agriculture statistics rely on precise equations — yield models, regression, ANOVA.",
        objective: "Write inline math with $...$ and \\(...\\), display math with \\[...\\], and use superscripts/subscripts.",
        instructions: [
            "Write an inline equation using $...$ (e.g., $Y = aR + b$).",
            "Write another inline equation using \\(...\\).",
            "Write a display equation using \\[...\\] with \\frac.",
            "Use ^ for superscript and _ for subscript."
        ],
        starterCode: `\\documentclass{article}\n\\begin{document}\n\n\\section{Statistical Model}\n\nThe crop yield model is expressed as: % add inline $...$ equation\n\nAlternatively written as: % add inline \\(...\\) equation\n\nThe standard deviation formula:\n% Add display equation with \\frac, ^, and _\n\n\\end{document}`,
        checks: [
            { label: "Has $...$ inline math", regex: /\$[^$]+\$/, hint: "Wrap math in $Y = aR + b$." },
            { label: "Has \\(...\\) inline math", regex: /\\\([^)]+\\\)/, hint: "Use \\(Y = aR + b\\) as alternative inline math." },
            { label: "Has \\[...\\] display math", regex: /\\\[[\s\S]+?\\\]/, hint: "Use \\[ and \\] for centered display equations." },
            { label: "Uses \\frac{}{}", regex: /\\frac\{/, hint: "Create a fraction with \\frac{num}{den}." },
            { label: "Uses ^ (superscript)", regex: /\^/, hint: "Use x^2 for superscript." },
            { label: "Uses _ (subscript)", regex: /_/, hint: "Use x_i for subscript." }
        ],
        successMessage: "Your equations are publication-ready! 📐",
        proTip: "Use \\(...\\) instead of $...$ in modern LaTeX — it's the official recommended syntax.",
        snippets: [
            { label: "Inline $", code: "$Y = aR + b$", description: "Dollar-sign inline math" },
            { label: "Inline \\(\\)", code: "\\(Y = aR + b\\)", description: "Paren inline math" },
            { label: "Display \\[\\]", code: "\\[\n  \\sigma = \\sqrt{\\frac{1}{N}\\sum_{i=1}^{N}(x_i - \\mu)^2}\n\\]", description: "Centered equation" },
            { label: "Fraction", code: "\\frac{a}{b}", description: "a over b" },
            { label: "Superscript", code: "x^{2}", description: "x squared" },
            { label: "Subscript", code: "x_{i}", description: "x sub i" },
        ],
        tips: [
            {
                command: "$...$ and \\(...\\)",
                userTip: "Both produce inline math. \\(...\\) is the modern recommended syntax. $...$ is shorter but can hide errors.",
                options: [
                    { option: "$E = mc^2$", impact: "Equation renders inline within the text flow, same font size as surrounding text." },
                    { option: "\\(E = mc^2\\)", impact: "Identical output to $...$. Preferred because mismatched delimiters give clearer errors." },
                    { option: "$\\displaystyle \\frac{a}{b}$", impact: "Forces full-size fraction inline — taller, may disrupt line spacing." },
                ]
            },
            {
                command: "\\[...\\] (display math)",
                userTip: "Centers the equation on its own line. No equation number. Use equation environment for numbered equations.",
                options: [
                    { option: "\\[ E = mc^2 \\]", impact: "Centered equation on its own line, no number. Full-size fractions and symbols." },
                    { option: "$$...$$", impact: "Old TeX syntax — works but NOT recommended. Can cause spacing issues." },
                    { option: "\\[ \\frac{a}{b} \\]", impact: "Fractions render full-size in display mode (larger than inline)." },
                ]
            },
            {
                command: "\\frac{num}{den}",
                userTip: "Creates a fraction. In inline mode it's compact; in display mode it's full-size.",
                options: [
                    { option: "\\frac{a}{b}", impact: "Standard fraction: a over b with a horizontal line." },
                    { option: "\\dfrac{a}{b}", impact: "Forces display-style fraction even in inline mode — larger." },
                    { option: "\\tfrac{a}{b}", impact: "Forces text-style (compact) fraction even in display mode — smaller." },
                    { option: "\\frac{\\frac{a}{b}}{c}", impact: "Nested fractions — each level gets smaller. Use \\dfrac to keep readable." },
                ]
            },
            {
                command: "^ (superscript) and _ (subscript)",
                userTip: "Only work in math mode. For multi-character exponents, use braces: x^{10} not x^10.",
                options: [
                    { option: "x^2", impact: "Single character superscript — renders x²." },
                    { option: "x^{10}", impact: "Multi-character superscript — braces group '10' together." },
                    { option: "x_{i,j}", impact: "Multi-character subscript — braces group 'i,j' together." },
                    { option: "x_i^2", impact: "Both sub and superscript — renders xᵢ² (subscript left, superscript right)." },
                    { option: "x^2 without math mode", impact: "ERROR: ^ and _ only work inside $...$ or \\[...\\] math environments." },
                ]
            },
        ]
    },
    {
        id: "sprout-3",
        title: "Greek Letters & Math Operators",
        difficulty: "sprout",
        category: "Mathematics",
        agriContext: "Statistical formulas use Greek letters (α, β, σ, μ) and operators (sin, log, lim).",
        objective: "Use Greek letters, math operators, and the \\sqrt command.",
        instructions: [
            "Use at least 3 Greek letters: \\alpha, \\beta, \\sigma, \\mu, \\epsilon, etc.",
            "Use a math operator: \\sin, \\cos, \\log, or \\lim.",
            "Use \\sqrt{...} for a square root.",
            "Use \\sum_{i=1}^{n} for summation notation."
        ],
        starterCode: `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\n\\section{Growth Model Parameters}\n\nThe regression coefficients are $\\alpha$ and $\\beta$.\n\nThe error term follows a normal distribution with mean and standard deviation.\n\nThe growth rate is modeled as:\n% Add a display equation using Greek letters, \\sqrt, \\sum, and an operator\n\n\\end{document}`,
        checks: [
            { label: "Has 3+ Greek letters", regex: /(\\alpha|\\beta|\\gamma|\\delta|\\epsilon|\\sigma|\\mu|\\lambda|\\theta|\\pi|\\omega|\\phi|\\rho|\\tau|\\eta|\\nu|\\xi|\\zeta)[\s\S]*(\\alpha|\\beta|\\gamma|\\delta|\\epsilon|\\sigma|\\mu|\\lambda|\\theta|\\pi|\\omega|\\phi|\\rho|\\tau|\\eta|\\nu|\\xi|\\zeta)[\s\S]*(\\alpha|\\beta|\\gamma|\\delta|\\epsilon|\\sigma|\\mu|\\lambda|\\theta|\\pi|\\omega|\\phi|\\rho|\\tau|\\eta|\\nu|\\xi|\\zeta)/, hint: "Use \\alpha, \\beta, \\sigma, \\mu, etc." },
            { label: "Has math operator", regex: /\\sin|\\cos|\\tan|\\log|\\ln|\\lim|\\max|\\min|\\exp/, hint: "Use \\sin, \\cos, \\log, or \\lim." },
            { label: "Has \\sqrt{}", regex: /\\sqrt\{/, hint: "Use \\sqrt{expression} for square root." },
            { label: "Has \\sum", regex: /\\sum/, hint: "Use \\sum_{i=1}^{n} for summation." }
        ],
        successMessage: "You speak the mathematical language of research! 🧮",
        proTip: "Capital Greek letters use uppercase: \\Sigma (Σ), \\Delta (Δ), \\Omega (Ω). Lowercase: \\sigma (σ).",
        snippets: [
            { label: "Alpha/Beta", code: "\\alpha, \\beta", description: "α, β" },
            { label: "Sigma/Mu", code: "\\sigma, \\mu", description: "σ, μ" },
            { label: "Pi/Theta", code: "\\pi, \\theta", description: "π, θ" },
            { label: "Square root", code: "\\sqrt{x^2 + y^2}", description: "√(x²+y²)" },
            { label: "Summation", code: "\\sum_{i=1}^{n} x_i", description: "Σ from 1 to n" },
            { label: "Log", code: "\\log(x)", description: "Logarithm" },
            { label: "Sin", code: "\\sin(\\theta)", description: "Sine function" },
        ],
        tips: [
            {
                command: "Greek letters",
                userTip: "Lowercase: \\alpha, \\beta. Uppercase: \\Alpha (same as A), \\Sigma, \\Delta. Only use in math mode.",
                options: [
                    { option: "\\alpha, \\beta, \\gamma, \\delta", impact: "Lowercase Greek: α, β, γ, δ — used for parameters and variables." },
                    { option: "\\Sigma, \\Delta, \\Omega, \\Phi", impact: "Uppercase Greek: Σ, Δ, Ω, Φ — used for summation, change, sets." },
                    { option: "\\varepsilon vs \\epsilon", impact: "ε vs ϵ — variant forms. \\varepsilon is more common in statistics." },
                    { option: "\\varphi vs \\phi", impact: "φ vs ϕ — variant forms. Check your journal's convention." },
                ]
            },
            {
                command: "Math operators (\\sin, \\log, etc.)",
                userTip: "Always use \\sin not sin. Without the backslash, 'sin' renders as three italic variables s·i·n.",
                options: [
                    { option: "\\sin(x)", impact: "Renders 'sin' in upright (roman) font — correct mathematical typesetting." },
                    { option: "sin(x) (without backslash)", impact: "Renders as italic 's·i·n' — looks like three multiplied variables. WRONG." },
                    { option: "\\log_{10}(x)", impact: "Logarithm with subscript base — renders log₁₀(x)." },
                    { option: "\\lim_{x \\to \\infty}", impact: "Limit notation — subscript appears below in display mode." },
                    { option: "\\max, \\min, \\sup, \\inf", impact: "Optimization operators — proper upright font with subscript support." },
                ]
            },
            {
                command: "\\sqrt{...}",
                userTip: "Square root by default. Use optional argument for nth root: \\sqrt[3]{x} for cube root.",
                options: [
                    { option: "\\sqrt{x}", impact: "Square root symbol with bar extending over x." },
                    { option: "\\sqrt[3]{x}", impact: "Cube root — small 3 appears in the root symbol." },
                    { option: "\\sqrt{\\frac{a}{b}}", impact: "Root over a fraction — bar auto-sizes to cover the fraction." },
                ]
            },
            {
                command: "\\sum, \\prod, \\int",
                userTip: "Big operators. Limits go below/above in display mode, beside in inline mode.",
                options: [
                    { option: "\\sum_{i=1}^{n} x_i", impact: "Summation: Σ with limits. Display mode: limits above/below. Inline: beside." },
                    { option: "\\prod_{i=1}^{n} x_i", impact: "Product: Π with limits — same placement rules as \\sum." },
                    { option: "\\int_{0}^{\\infty} f(x)\\,dx", impact: "Integral: ∫ with limits. \\, adds thin space before dx (convention)." },
                    { option: "\\sum\\nolimits_{i=1}^{n}", impact: "Forces limits beside the symbol even in display mode." },
                    { option: "\\sum\\limits_{i=1}^{n}", impact: "Forces limits above/below even in inline mode." },
                ]
            },
        ]
    },
    {
        id: "sprout-4",
        title: "Numbered Equations & Align",
        difficulty: "sprout",
        category: "Mathematics",
        agriContext: "Multi-step derivations for regression models need aligned, numbered equations.",
        objective: "Use equation, equation*, align, and align* environments with \\label and \\eqref.",
        instructions: [
            "Load \\usepackage{amsmath}.",
            "Create a numbered equation with \\begin{equation} and \\label{eq:...}.",
            "Reference it with \\eqref{eq:...}.",
            "Create a multi-line aligned equation with \\begin{align*}."
        ],
        starterCode: `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\n\\section{Yield Model}\n\nThe primary yield equation is shown in Equation ???.\n\n% Add a numbered equation with \\begin{equation} and \\label{eq:yield}\n\n% Reference it with \\eqref{eq:yield}\n\nThe derivation steps:\n% Add multi-line aligned equation with \\begin{align*}\n\n\\end{document}`,
        checks: [
            { label: "Has \\begin{equation}", regex: /\\begin\{equation\}/, hint: "Use \\begin{equation} for a numbered equation." },
            { label: "Has \\label{eq:...}", regex: /\\label\{eq:.+\}/, hint: "Add \\label{eq:yield} inside the equation." },
            { label: "Has \\eqref{eq:...}", regex: /\\eqref\{eq:.+\}/, hint: "Reference with \\eqref{eq:yield} in text." },
            { label: "Has \\begin{align*}", regex: /\\begin\{align\*?\}/, hint: "Use \\begin{align*} for multi-line equations." },
            { label: "Has & alignment", regex: /&\s*=/, hint: "Place & before = to align." },
            { label: "Has line breaks \\\\", regex: /\\\\/, hint: "End each line with \\\\ to break." }
        ],
        successMessage: "Your equations are numbered, referenced, and aligned! 📊",
        proTip: "Use align (without *) for numbered lines. Use \\nonumber on specific lines to skip numbering.",
        snippets: [
            { label: "Numbered equation", code: "\\begin{equation}\n  Y = \\beta_0 + \\beta_1 X\n  \\label{eq:yield}\n\\end{equation}", description: "Auto-numbered" },
            { label: "Equation reference", code: "\\eqref{eq:yield}", description: "References (1)" },
            { label: "Align block", code: "\\begin{align*}\n  Y &= a + bX \\\\\n    &= 2.5 + 0.8X\n\\end{align*}", description: "Multi-line aligned" },
        ],
        tips: [
            {
                command: "\\begin{equation}",
                userTip: "Creates a single numbered equation. Use \\label inside for cross-referencing with \\eqref.",
                options: [
                    { option: "\\begin{equation}...\\end{equation}", impact: "Centered equation with auto-number (1), (2), etc. on the right margin." },
                    { option: "\\begin{equation*}...\\end{equation*}", impact: "Same layout but NO number. Equivalent to \\[...\\]." },
                    { option: "\\begin{equation} + \\tag{custom}", impact: "Replaces auto-number with custom tag, e.g., (★) or (A.1)." },
                    { option: "\\begin{equation} + \\notag", impact: "Suppresses the number for this specific equation." },
                ]
            },
            {
                command: "\\begin{align} / \\begin{align*}",
                userTip: "Use & to mark alignment points (usually before =). Use \\\\\\\\ to break lines. Each line gets a number in align.",
                options: [
                    { option: "\\begin{align}...\\end{align}", impact: "Each line gets its own equation number: (1), (2), etc." },
                    { option: "\\begin{align*}...\\end{align*}", impact: "No line numbers — use for derivation steps you don't need to reference." },
                    { option: "\\nonumber on a line", impact: "Suppresses the number for that specific line only." },
                    { option: "Multiple & per line", impact: "Creates multiple alignment columns — useful for systems of equations." },
                ]
            },
            {
                command: "\\label{eq:...} and \\eqref{eq:...}",
                userTip: "Place \\label inside the equation. \\eqref auto-inserts the number with parentheses. Compile twice to resolve.",
                options: [
                    { option: "\\eqref{eq:yield}", impact: "Renders as '(1)' — auto-updates if equation order changes." },
                    { option: "\\ref{eq:yield}", impact: "Renders as '1' without parentheses — less common for equations." },
                    { option: "Equation \\eqref{eq:yield} shows...", impact: "Produces 'Equation (1) shows...' — professional cross-referencing." },
                ]
            },
        ]
    },
    {
        id: "sprout-5",
        title: "Fertilizer Data Table",
        difficulty: "sprout",
        category: "Tables",
        agriContext: "Every field trial needs a results table — treatment, dose, yield, significance.",
        objective: "Build a table with tabular, table float, caption, label, hline, and column alignment (l, c, r).",
        instructions: [
            "Create a table environment with \\begin{table}[h] and \\centering.",
            "Use \\begin{tabular}{|l|c|r|} for left, center, right columns.",
            "Add \\hline for horizontal lines and & for column separators.",
            "Add \\caption{...} and \\label{tab:...}.",
            "Reference with \\ref{tab:...} in text."
        ],
        starterCode: `\\documentclass{article}\n\\begin{document}\n\n\\section{Results}\nTable \\ref{tab:fert} shows the fertilizer trial results.\n\n% Build your table here\n\n\\end{document}`,
        checks: [
            { label: "Has \\begin{table}", regex: /\\begin\{table\}/, hint: "Wrap in \\begin{table}[h]...\\end{table}." },
            { label: "Has \\centering", regex: /\\centering/, hint: "Add \\centering to center the table." },
            { label: "Has \\begin{tabular}", regex: /\\begin\{tabular\}/, hint: "The grid is \\begin{tabular}{|l|c|r|}." },
            { label: "Has & separator", regex: /&/, hint: "Separate columns with &." },
            { label: "Has \\hline", regex: /\\hline/, hint: "Use \\hline for horizontal lines." },
            { label: "Has \\caption{...}", regex: /\\caption\{.+\}/, hint: "Add a caption below the tabular." },
            { label: "Has \\label{tab:...}", regex: /\\label\{tab:.+\}/, hint: "Add \\label{tab:fert} AFTER \\caption." },
            { label: "Has \\ref{tab:...}", regex: /\\ref\{tab:.+\}/, hint: "Reference with \\ref{tab:fert} in text." }
        ],
        successMessage: "Your data table is structured and referenceable! 📊",
        proTip: "Professional journals prefer minimal vertical lines. Use booktabs package with \\toprule, \\midrule, \\bottomrule.",
        snippets: [
            { label: "Full table", code: "\\begin{table}[h]\n  \\centering\n  \\begin{tabular}{|l|c|r|}\n    \\hline\n    Treatment & Dose & Yield \\\\\n    \\hline\n    Urea & 120 & 4.5 \\\\\n    DAP & 80 & 5.2 \\\\\n    \\hline\n  \\end{tabular}\n  \\caption{Fertilizer results}\n  \\label{tab:fert}\n\\end{table}", description: "Complete table" },
        ],
        tips: [
            {
                command: "\\begin{tabular}{cols}",
                userTip: "The column spec defines alignment and borders. l=left, c=center, r=right, |=vertical line, p{width}=paragraph.",
                options: [
                    { option: "{|l|c|r|}", impact: "3 columns: left-aligned, centered, right-aligned, with vertical borders." },
                    { option: "{lcr}", impact: "Same alignment but NO vertical lines — cleaner, journal-preferred style." },
                    { option: "{p{3cm}p{5cm}}", impact: "Fixed-width columns that wrap text — essential for long content." },
                    { option: "{|l|*{5}{c|}}", impact: "Shorthand: 1 left column + 5 centered columns with borders." },
                ]
            },
            {
                command: "\\hline and borders",
                userTip: "\\hline draws a full horizontal line. For professional tables, use booktabs package instead.",
                options: [
                    { option: "\\hline", impact: "Full-width horizontal line — standard but considered old-fashioned." },
                    { option: "\\hline\\hline", impact: "Double horizontal line — sometimes used for header separation." },
                    { option: "\\cline{2-4}", impact: "Partial horizontal line spanning columns 2 to 4 only." },
                    { option: "\\usepackage{booktabs} + \\toprule/\\midrule/\\bottomrule", impact: "Professional-quality lines with proper spacing. Preferred by journals." },
                ]
            },
            {
                command: "\\begin{table}[placement]",
                userTip: "The table environment is a float — LaTeX decides where to place it. Use placement specifiers to guide it.",
                options: [
                    { option: "\\begin{table}[h]", impact: "Try to place 'here' — approximately where it appears in the source." },
                    { option: "\\begin{table}[t]", impact: "Place at the top of the current or next page." },
                    { option: "\\begin{table}[b]", impact: "Place at the bottom of the page." },
                    { option: "\\begin{table}[H] (float pkg)", impact: "EXACTLY here — no floating. Requires \\usepackage{float}." },
                    { option: "\\begin{table}[htbp]", impact: "Try here, then top, then bottom, then float page — most flexible." },
                ]
            },
            {
                command: "\\caption{...} and \\label{tab:...}",
                userTip: "\\caption MUST come before \\label. Place \\caption above tabular for tables (convention), below for figures.",
                options: [
                    { option: "\\caption{Results}", impact: "Adds 'Table 1: Results' — auto-numbered." },
                    { option: "\\caption[Short]{Long detailed caption}", impact: "Short version appears in \\listoftables; full version in the document." },
                    { option: "\\label before \\caption", impact: "BUG: \\ref will point to the wrong number. Always \\caption first, then \\label." },
                ]
            },
        ]
    },
    {
        id: "sprout-6",
        title: "Figure Insertion & Scaling",
        difficulty: "sprout",
        category: "Figures",
        agriContext: "A picture is worth a thousand words — especially for crop growth charts and field photos.",
        objective: "Use graphicx package, \\includegraphics with width/height/scale/angle options, figure float, caption, label.",
        instructions: [
            "Add \\usepackage{graphicx} in the preamble.",
            "Create a figure with \\begin{figure}[h] and \\centering.",
            "Use \\includegraphics with [width=0.8\\textwidth].",
            "Add \\caption{} and \\label{fig:...}.",
            "Reference with \\ref{fig:...} in text."
        ],
        starterCode: `\\documentclass{article}\n\n% Add graphicx package\n\n\\begin{document}\n\n\\section{Field Observations}\nFigure \\ref{fig:growth} shows the crop growth pattern.\n\n% Insert figure with caption, label, and width option\n\n% Try adding scale=0.5 or angle=90 as alternative options\n\n\\end{document}`,
        checks: [
            { label: "Has \\usepackage{graphicx}", regex: /\\usepackage\{graphicx\}/, hint: "Load graphicx for image support." },
            { label: "Has \\begin{figure}", regex: /\\begin\{figure\}/, hint: "Wrap in \\begin{figure}[h]." },
            { label: "Has \\centering", regex: /\\centering/, hint: "Center the figure." },
            { label: "Has \\includegraphics", regex: /\\includegraphics/, hint: "Use \\includegraphics[width=0.8\\textwidth]{image}." },
            { label: "Has width/scale/height option", regex: /width=|scale=|height=/, hint: "Add [width=0.8\\textwidth] or [scale=0.5]." },
            { label: "Has \\caption{...}", regex: /\\caption\{.+\}/, hint: "Add a descriptive caption." },
            { label: "Has \\label{fig:...}", regex: /\\label\{fig:.+\}/, hint: "Add \\label{fig:growth} for referencing." }
        ],
        successMessage: "Your figures are properly formatted for journal submission! 📸",
        proTip: "Options: width=\\textwidth (full), scale=2 (double), height=5cm (fixed), angle=90 (rotated).",
        snippets: [
            { label: "Full figure", code: "\\begin{figure}[h]\n  \\centering\n  \\includegraphics[width=0.8\\textwidth]{image.png}\n  \\caption{Description}\n  \\label{fig:label}\n\\end{figure}", description: "Complete figure" },
            { label: "Scale option", code: "\\includegraphics[scale=0.5]{image}", description: "Half size" },
            { label: "Angle option", code: "\\includegraphics[angle=90]{image}", description: "Rotated 90°" },
            { label: "Height option", code: "\\includegraphics[height=5cm]{image}", description: "Fixed height" },
        ],
        tips: [
            {
                command: "\\includegraphics[options]{file}",
                userTip: "Supports PNG, JPG, PDF formats. PDF gives best quality for vector graphics. Don't include the file extension for portability.",
                options: [
                    { option: "[width=0.8\\textwidth]", impact: "Scales image to 80% of text width — most common option. Maintains aspect ratio." },
                    { option: "[width=\\linewidth]", impact: "Full width of the current column — use in two-column layouts." },
                    { option: "[height=5cm]", impact: "Fixed height — width adjusts to maintain aspect ratio." },
                    { option: "[width=5cm, height=3cm]", impact: "Both specified — image may be distorted if aspect ratio doesn't match." },
                    { option: "[scale=0.5]", impact: "50% of original size. scale=2 doubles the size." },
                    { option: "[angle=90]", impact: "Rotates image 90° counter-clockwise." },
                    { option: "[angle=90, width=5cm]", impact: "Rotation applied first, then scaling — order matters." },
                    { option: "[trim=1cm 2cm 1cm 0cm, clip]", impact: "Crops the image: left, bottom, right, top. clip activates trimming." },
                ]
            },
            {
                command: "\\begin{figure}[placement]",
                userTip: "Figures float by default. Use \\centering inside (not \\begin{center}) to avoid extra vertical space.",
                options: [
                    { option: "\\begin{figure}[h]", impact: "Approximate 'here' placement — LaTeX may still move it." },
                    { option: "\\begin{figure}[H]", impact: "Exact placement (requires float package). No floating at all." },
                    { option: "\\begin{figure}[htbp]", impact: "Maximum flexibility — try here, top, bottom, then float page." },
                    { option: "\\begin{figure*} (in twocolumn)", impact: "Spans both columns — use for wide figures in two-column layouts." },
                ]
            },
            {
                command: "\\usepackage{graphicx}",
                userTip: "Required for \\includegraphics. Use graphicx (with x), not the older graphics package.",
                options: [
                    { option: "\\usepackage{graphicx}", impact: "Enables \\includegraphics with key=value options like width=, scale=." },
                    { option: "\\graphicspath{{images/}{figures/}}", impact: "Sets search paths — no need to type full path for each image." },
                ]
            },
        ]
    },
    {
        id: "sprout-7",
        title: "Citations & Bibliography",
        difficulty: "sprout",
        category: "Citations",
        agriContext: "No research paper survives without proper citations. BibTeX automates the pain.",
        objective: "Use \\cite, \\nocite, \\bibliographystyle (plain/unsrt/alpha), \\bibliography, and thebibliography.",
        instructions: [
            "Use \\cite{key} to reference a paper.",
            "Use \\cite{key1, key2} for multiple citations.",
            "Add \\bibliographystyle{plain} (try unsrt, alpha too).",
            "Add \\bibliography{references} OR use \\begin{thebibliography} for manual entries."
        ],
        starterCode: `\\documentclass{article}\n\\begin{document}\n\n\\section{Literature Review}\n\nDrip irrigation improves water efficiency by 40\\%.\n\n% Add citations and bibliography\n\n\\end{document}`,
        checks: [
            { label: "Has \\cite{...}", regex: /\\cite\{.+\}/, hint: "Insert \\cite{sharma2024} where you reference." },
            { label: "Has multi-cite or single", regex: /\\cite\{.+\}/, hint: "Use \\cite{key1, key2} for multiple." },
            { label: "Has \\bibliographystyle", regex: /\\bibliographystyle\{/, hint: "Add \\bibliographystyle{plain}." },
            { label: "Has bibliography", regex: /\\bibliography\{|\\begin\{thebibliography\}/, hint: "Add \\bibliography{refs} or \\begin{thebibliography}." }
        ],
        successMessage: "Your citations are automated! 📚",
        proTip: "Styles: plain (numbered, sorted), unsrt (numbered, order of appearance), alpha (letter keys like [Sha24]).",
        snippets: [
            { label: "Cite", code: "\\cite{sharma2024}", description: "Single citation" },
            { label: "Multi-cite", code: "\\cite{key1, key2, key3}", description: "Multiple citations" },
            { label: "Bib style", code: "\\bibliographystyle{plain}", description: "plain/unsrt/alpha" },
            { label: "Bibliography", code: "\\bibliography{references}", description: "Loads .bib file" },
            { label: "Manual bib", code: "\\begin{thebibliography}{9}\n  \\bibitem{key1} Author, Title, Year.\n\\end{thebibliography}", description: "Inline bibliography" },
        ],
        tips: [
            {
                command: "\\cite{key}",
                userTip: "The key must exactly match a \\bibitem or .bib entry. Compile: PdfLaTeX → BibTeX → PdfLaTeX → PdfLaTeX (4 passes).",
                options: [
                    { option: "\\cite{sharma2024}", impact: "Inserts [1] or [Sha24] depending on bibliography style." },
                    { option: "\\cite{key1, key2}", impact: "Multiple citations: [1, 3] or [Sha24, Kum23] — auto-sorted in some styles." },
                    { option: "\\cite[p.~42]{sharma2024}", impact: "Adds a note: [1, p. 42] — useful for page-specific references." },
                    { option: "\\nocite{key}", impact: "Includes in bibliography without a citation mark in the text." },
                    { option: "\\nocite{*}", impact: "Includes ALL entries from the .bib file in the bibliography." },
                ]
            },
            {
                command: "\\bibliographystyle{style}",
                userTip: "Place before \\bibliography. The style controls how references look — numbered, alphabetic, or author-year.",
                options: [
                    { option: "\\bibliographystyle{plain}", impact: "Numbered [1], sorted alphabetically by author. Most common." },
                    { option: "\\bibliographystyle{unsrt}", impact: "Numbered [1], sorted by order of first citation. Good for IEEE-style." },
                    { option: "\\bibliographystyle{alpha}", impact: "Letter keys like [Sha24] based on author name + year." },
                    { option: "\\bibliographystyle{abbrv}", impact: "Like plain but with abbreviated first names." },
                    { option: "\\bibliographystyle{apalike}", impact: "Author-year style: (Sharma, 2024). Common in social sciences." },
                ]
            },
            {
                command: "\\begin{thebibliography}{widest}",
                userTip: "Manual bibliography — no .bib file needed. The argument sets the widest label width (use 9 for <10 refs, 99 for <100).",
                options: [
                    { option: "\\begin{thebibliography}{9}", impact: "Supports up to 9 references with single-digit labels." },
                    { option: "\\begin{thebibliography}{99}", impact: "Supports up to 99 references — wider label column." },
                    { option: "\\bibitem{key} Author, Title, Year.", impact: "Each entry defines a key for \\cite and the formatted reference text." },
                    { option: "\\bibitem[Custom]{key} Text", impact: "Custom label: \\cite{key} shows [Custom] instead of a number." },
                ]
            },
        ]
    },
    {
        id: "sprout-8",
        title: "Cross-References & Hyperlinks",
        difficulty: "sprout",
        category: "References",
        agriContext: "A 50-page thesis needs clickable cross-references — 'See Table 3' should jump to Table 3.",
        objective: "Use hyperref package, \\label, \\ref, \\pageref, \\url, \\href, and \\hypersetup.",
        instructions: [
            "Add \\usepackage{hyperref} in the preamble.",
            "Use \\label{...} on a section, table, or figure.",
            "Reference with \\ref{...} and \\pageref{...}.",
            "Add a URL with \\url{...} or \\href{url}{text}."
        ],
        starterCode: `\\documentclass{article}\n\n% Add hyperref package\n\n\\begin{document}\n\n\\section{Introduction}\n\\label{sec:intro}\n\nSee Section ??? on page ??? for details.\n\nFor more data, visit the ICAR website: % add URL\n\n\\section{Results}\nResults are discussed in Section ??? above.\n\n\\end{document}`,
        checks: [
            { label: "Has \\usepackage{hyperref}", regex: /\\usepackage\{hyperref\}/, hint: "Add hyperref for clickable links." },
            { label: "Has \\label{...}", regex: /\\label\{.+\}/, hint: "Add \\label{sec:intro} to a section." },
            { label: "Has \\ref{...}", regex: /\\ref\{.+\}/, hint: "Use \\ref{sec:intro} to reference." },
            { label: "Has \\pageref{...}", regex: /\\pageref\{.+\}/, hint: "Use \\pageref{sec:intro} for page number." },
            { label: "Has \\url or \\href", regex: /\\url\{|\\href\{/, hint: "Use \\url{https://icar.org.in}." }
        ],
        successMessage: "Your document has clickable cross-references! 🔗",
        proTip: "Load hyperref LAST to avoid conflicts. Use \\hypersetup{colorlinks=true, linkcolor=blue}.",
        snippets: [
            { label: "hyperref", code: "\\usepackage{hyperref}", description: "Clickable links" },
            { label: "Label", code: "\\label{sec:intro}", description: "Mark a location" },
            { label: "Ref", code: "\\ref{sec:intro}", description: "Reference number" },
            { label: "Page ref", code: "\\pageref{sec:intro}", description: "Page number" },
            { label: "URL", code: "\\url{https://icar.org.in}", description: "Clickable URL" },
            { label: "Hyperlink", code: "\\href{https://icar.org.in}{ICAR}", description: "Named link" },
        ],
        tips: [
            {
                command: "\\label{...} / \\ref{...} / \\pageref{...}",
                userTip: "Use prefixes: sec: for sections, fig: for figures, tab: for tables, eq: for equations. Compile twice to resolve.",
                options: [
                    { option: "\\ref{sec:intro}", impact: "Inserts the section number (e.g., '1'). Updates automatically if sections reorder." },
                    { option: "\\pageref{sec:intro}", impact: "Inserts the page number where the label is. Great for 'see page X'." },
                    { option: "\\eqref{eq:model}", impact: "Inserts equation number with parentheses: '(1)'. Requires amsmath." },
                    { option: "First compile shows [?]", impact: "NORMAL. Cross-references need 2 compilations to resolve. Compile again." },
                ]
            },
            {
                command: "\\usepackage{hyperref}",
                userTip: "Load LAST among all packages to avoid conflicts. Makes all \\ref, \\cite, TOC entries clickable.",
                options: [
                    { option: "\\usepackage{hyperref}", impact: "All cross-references become clickable hyperlinks in the PDF." },
                    { option: "\\hypersetup{colorlinks=true}", impact: "Links appear as colored text instead of boxed. Cleaner look." },
                    { option: "\\hypersetup{linkcolor=blue, citecolor=green}", impact: "Customizes colors: blue for internal links, green for citations." },
                    { option: "\\hypersetup{hidelinks}", impact: "Removes all link colors and boxes — links are invisible but still clickable." },
                    { option: "\\hypersetup{pdfauthor={Name}, pdftitle={Title}}", impact: "Sets PDF metadata visible in document properties." },
                ]
            },
            {
                command: "\\url{...} / \\href{url}{text}",
                userTip: "\\url shows the raw URL. \\href hides the URL behind clickable text. Both require hyperref.",
                options: [
                    { option: "\\url{https://icar.org.in}", impact: "Displays the full URL as clickable monospace text." },
                    { option: "\\href{https://icar.org.in}{ICAR Website}", impact: "Shows 'ICAR Website' as clickable text — URL is hidden." },
                    { option: "\\href{mailto:scholar@univ.edu}{Email}", impact: "Creates a clickable email link." },
                ]
            },
        ]
    },
    {
        id: "sprout-9",
        title: "Float Placement Control",
        difficulty: "sprout",
        category: "Floats",
        agriContext: "Tables and figures 'float' to optimal positions. Control where they land with placement specifiers.",
        objective: "Master float placement options [h], [t], [b], [p], [h!], [H] and use \\listoftables / \\listoffigures.",
        instructions: [
            "Create a table with [h] placement.",
            "Create a figure with [t] placement.",
            "Add \\listoftables and \\listoffigures after \\tableofcontents.",
            "Use \\usepackage{float} and [H] for exact placement."
        ],
        starterCode: `\\documentclass{article}\n\\usepackage{graphicx}\n\\usepackage{float}\n\\begin{document}\n\n\\tableofcontents\n% Add \\listoftables and \\listoffigures\n\n\\section{Data}\n\n% Create a table with [h] placement\n\n% Create a figure with [t] placement\n\n% Try [H] for strict placement (requires float package)\n\n\\end{document}`,
        checks: [
            { label: "Has \\begin{table}[h]", regex: /\\begin\{table\}\[h/, hint: "Use [h] for 'here' placement." },
            { label: "Has \\begin{figure}[t]", regex: /\\begin\{figure\}\[t/, hint: "Use [t] for 'top of page' placement." },
            { label: "Has \\listoftables", regex: /\\listoftables/, hint: "Add \\listoftables for auto-generated list." },
            { label: "Has \\listoffigures", regex: /\\listoffigures/, hint: "Add \\listoffigures for figure list." },
            { label: "Has [H] placement", regex: /\[H\]/, hint: "Use [H] with float package for exact placement." }
        ],
        successMessage: "You now control exactly where floats appear! 📍",
        proTip: "Placement priority: [h]=here, [t]=top, [b]=bottom, [p]=float page, [H]=EXACTLY here (float pkg).",
        snippets: [
            { label: "Here", code: "\\begin{table}[h]", description: "Approximate here" },
            { label: "Top", code: "\\begin{figure}[t]", description: "Top of page" },
            { label: "Bottom", code: "\\begin{table}[b]", description: "Bottom of page" },
            { label: "Exact", code: "\\begin{figure}[H]", description: "Exactly here (float pkg)" },
            { label: "List of tables", code: "\\listoftables", description: "Auto table list" },
            { label: "List of figures", code: "\\listoffigures", description: "Auto figure list" },
        ],
        tips: [
            {
                command: "Float placement specifiers [h], [t], [b], [p], [H]",
                userTip: "Combine specifiers for flexibility: [htbp]. LaTeX tries each in order. [H] overrides all floating.",
                options: [
                    { option: "[h] — here", impact: "Tries to place approximately where it appears in source. May move if space is tight." },
                    { option: "[t] — top", impact: "Places at the top of the current or next page. Common for journal submissions." },
                    { option: "[b] — bottom", impact: "Places at the bottom of the page. Less common." },
                    { option: "[p] — float page", impact: "Puts the float on a dedicated page with only floats. For large tables/figures." },
                    { option: "[h!] — here (insist)", impact: "Stronger hint to place here. Still not guaranteed — LaTeX may override." },
                    { option: "[H] — EXACTLY here", impact: "Requires \\usepackage{float}. Disables floating entirely. May cause ugly page breaks." },
                    { option: "[htbp]", impact: "Maximum flexibility: try here → top → bottom → float page. Recommended default." },
                ]
            },
            {
                command: "\\listoftables / \\listoffigures",
                userTip: "Auto-generated from \\caption entries. Place after \\tableofcontents. Compile twice to populate.",
                options: [
                    { option: "\\listoftables", impact: "Generates 'List of Tables' page with table numbers, captions, and page numbers." },
                    { option: "\\listoffigures", impact: "Generates 'List of Figures' page — required in most thesis formats." },
                    { option: "\\caption[Short]{Long caption}", impact: "Short version appears in the list; full version appears in the document." },
                ]
            },
        ]
    },
    {
        id: "sprout-10",
        title: "Custom Commands",
        difficulty: "sprout",
        category: "Advanced",
        agriContext: "Typing \\textit{Oryza sativa} 50 times is tedious. Define a shortcut once, use it everywhere.",
        objective: "Use \\newcommand and \\renewcommand to create custom shortcuts.",
        instructions: [
            "Define \\newcommand{\\rice}{\\textit{Oryza sativa}} in the preamble.",
            "Define a command with arguments: \\newcommand{\\yield}[1]{Y_{#1}}.",
            "Use your custom commands in the document body.",
            "Use \\renewcommand to override an existing command."
        ],
        starterCode: `\\documentclass{article}\n\\usepackage{amsmath}\n\n% Define custom commands here\n\n\\begin{document}\n\n\\section{Crop Study}\n\nThe rice variety known as Oryza sativa was studied.\nThe yield for treatment 1 was measured.\nThe yield for treatment 2 was also recorded.\n\n% Replace repetitive text with your custom commands\n\n\\end{document}`,
        checks: [
            { label: "Has \\newcommand", regex: /\\newcommand\{/, hint: "Define with \\newcommand{\\rice}{\\textit{Oryza sativa}}." },
            { label: "Has command with args [#1]", regex: /\\newcommand\{[^}]+\}\[/, hint: "Use [1] for one argument: \\newcommand{\\yield}[1]{Y_{#1}}." },
            { label: "Uses custom command", regex: /\\rice|\\yield|\\crop|\\var/, hint: "Use your defined command in the document body." },
            { label: "Has \\renewcommand", regex: /\\renewcommand\{/, hint: "Override an existing command with \\renewcommand." }
        ],
        successMessage: "You've automated repetitive typing with custom commands! ⚡",
        proTip: "Use \\newcommand for new commands, \\renewcommand to override existing ones. Never redefine \\section!",
        snippets: [
            { label: "Simple command", code: "\\newcommand{\\rice}{\\textit{Oryza sativa}}", description: "No arguments" },
            { label: "With argument", code: "\\newcommand{\\yield}[1]{Y_{#1}}", description: "One argument" },
            { label: "Two arguments", code: "\\newcommand{\\ratio}[2]{\\frac{#1}{#2}}", description: "Two arguments" },
            { label: "Renew command", code: "\\renewcommand{\\abstractname}{Summary}", description: "Override existing" },
        ],
        tips: [
            {
                command: "\\newcommand{\\name}{definition}",
                userTip: "Define in the preamble. Command names must start with \\. Cannot redefine existing commands (use \\renewcommand for that).",
                options: [
                    { option: "\\newcommand{\\rice}{\\textit{Oryza sativa}}", impact: "Every \\rice in the document expands to italic 'Oryza sativa'." },
                    { option: "\\newcommand{\\yield}[1]{Y_{#1}}", impact: "One argument: \\yield{1} → Y₁, \\yield{max} → Y_max." },
                    { option: "\\newcommand{\\ratio}[2]{\\frac{#1}{#2}}", impact: "Two arguments: \\ratio{a}{b} → a/b fraction." },
                    { option: "\\newcommand{\\note}[1][Note]{\\textbf{#1}:}", impact: "Optional argument with default: \\note → Note:, \\note[Warning] → Warning:." },
                ]
            },
            {
                command: "\\renewcommand{\\name}{new definition}",
                userTip: "Overrides an existing command. Use carefully — changing \\section or \\item can break your document.",
                options: [
                    { option: "\\renewcommand{\\abstractname}{Summary}", impact: "Changes the 'Abstract' heading to 'Summary' in the PDF." },
                    { option: "\\renewcommand{\\contentsname}{Table of Contents}", impact: "Customizes the TOC heading text." },
                    { option: "\\renewcommand{\\figurename}{Fig.}", impact: "Changes 'Figure 1' to 'Fig. 1' in captions." },
                    { option: "\\renewcommand{\\tablename}{Tab.}", impact: "Changes 'Table 1' to 'Tab. 1' in captions." },
                ]
            },
        ]
    },
    // ═══════════════════════════════════════════════
    // HARVESTER: Advanced Skills
    // ═══════════════════════════════════════════════

    {
        id: "harvest-1",
        title: "Complete Research Article",
        difficulty: "harvester",
        category: "Full Document",
        agriContext: "This is your capstone: a mini research article with all the elements you've learned.",
        objective: "Build a complete article with title, abstract, sections, math, table, figure reference, and citations.",
        instructions: [
            "Include \\title, \\author, \\date, \\maketitle.",
            "Add an abstract using \\begin{abstract}.",
            "Create sections: Introduction, Methodology, Results, Conclusion.",
            "Include at least one display equation with \\label and \\eqref.",
            "Include a table with caption and label.",
            "Add \\cite{} references and a bibliography."
        ],
        starterCode: `\\documentclass[12pt, a4paper]{article}\n\\usepackage{amsmath}\n\\usepackage{graphicx}\n\\usepackage{hyperref}\n\n\\title{Impact of Nitrogen Fertilization on Maize Yield}\n\\author{Your Name \\\\\\\\ Department of Agriculture}\n\\date{March 2026}\n\n\\begin{document}\n\\maketitle\n\n% Add abstract, sections, equation, table, citations\n\n\\end{document}`,
        checks: [
            { label: "Has \\begin{abstract}", regex: /\\begin\{abstract\}/, hint: "Add abstract after \\maketitle." },
            { label: "Has 4+ sections", regex: /(\\section\*?\{[^}]+\}[\s\S]*?){4,}/, hint: "Create Intro, Methods, Results, Conclusion." },
            { label: "Has display math", regex: /\\\[[\s\S]+?\\\]|\\begin\{equation\}/, hint: "Add a display equation." },
            { label: "Has a table", regex: /\\begin\{table\}/, hint: "Include a data table." },
            { label: "Has \\caption", regex: /\\caption\{/, hint: "Every table needs a caption." },
            { label: "Has \\cite{}", regex: /\\cite\{/, hint: "Reference at least one source." },
            { label: "Has bibliography", regex: /\\bibliography|\\begin\{thebibliography\}/, hint: "Add bibliography at the end." }
        ],
        successMessage: "You've built a complete research article! Ready for journal submission. 🎓🏆",
        proTip: "Download a real journal template (IEEE, Elsevier) and replace the content. The structure is identical.",
        snippets: [
            { label: "Abstract", code: "\\begin{abstract}\nYour abstract here.\n\\end{abstract}", description: "Paper abstract" },
            { label: "Equation", code: "\\begin{equation}\n  Y = \\beta_0 + \\beta_1 X\n  \\label{eq:model}\n\\end{equation}", description: "Numbered equation" },
            { label: "Table", code: "\\begin{table}[h]\n  \\centering\n  \\begin{tabular}{|l|c|r|}\n    \\hline\n    Treatment & Dose & Yield \\\\\n    \\hline\n    Control & 0 & 3.2 \\\\\n    \\hline\n  \\end{tabular}\n  \\caption{Results}\n  \\label{tab:results}\n\\end{table}", description: "Data table" },
            { label: "Manual bib", code: "\\begin{thebibliography}{9}\n  \\bibitem{kumar2024} Kumar R., Title, Journal, 2024.\n\\end{thebibliography}", description: "Bibliography" },
        ],
        tips: [
            {
                command: "\\begin{abstract}",
                userTip: "Place immediately after \\maketitle. In article class, it appears as an indented block. In report class, it gets its own page.",
                options: [
                    { option: "\\begin{abstract}...\\end{abstract}", impact: "Indented block with 'Abstract' heading. Typically 150-300 words." },
                    { option: "\\renewcommand{\\abstractname}{Summary}", impact: "Changes heading from 'Abstract' to 'Summary'." },
                    { option: "Abstract in report class", impact: "Gets a dedicated page — different from article class inline style." },
                ]
            },
            {
                command: "\\documentclass[options]{article}",
                userTip: "Set all global options here. They cascade to all packages. Common: font size, paper size, columns.",
                options: [
                    { option: "[12pt, a4paper]{article}", impact: "12pt body text on A4 paper — standard for most submissions." },
                    { option: "[11pt, twocolumn]{article}", impact: "11pt in two-column layout — common for conference papers." },
                    { option: "[12pt, a4paper, draft]{article}", impact: "Draft mode: shows overfull boxes as black bars, images as frames." },
                    { option: "[12pt, a4paper, final]{article}", impact: "Final mode (default): full rendering, no debug markers." },
                ]
            },
            {
                command: "Complete article structure",
                userTip: "Standard order: title → abstract → introduction → methodology → results → discussion → conclusion → bibliography.",
                options: [
                    { option: "\\section*{Abstract} vs \\begin{abstract}", impact: "\\begin{abstract} is preferred — proper formatting and indentation." },
                    { option: "\\section{Introduction} ... \\section{Conclusion}", impact: "Auto-numbered sections. Use \\section* for unnumbered (e.g., Acknowledgments)." },
                    { option: "\\appendix + \\section{...}", impact: "After \\appendix, sections become A, B, C instead of 1, 2, 3." },
                ]
            },
        ]
    },
    {
        id: "harvest-2",
        title: "Modular Thesis Structure",
        difficulty: "harvester",
        category: "Thesis",
        agriContext: "A PhD thesis is 200+ pages. Split it into modules or Word-style chaos awaits.",
        objective: "Use report class, \\chapter, \\include, \\input, \\includeonly, \\tableofcontents, \\appendix.",
        instructions: [
            "Use \\documentclass{report} for chapter support.",
            "Add \\tableofcontents, \\listoffigures, \\listoftables.",
            "Use \\chapter{} for top-level headings.",
            "Use \\include{} or \\input{} for 2+ chapter files.",
            "Add \\appendix before appendix content.",
            "Add \\includeonly{} (commented) for selective compilation."
        ],
        starterCode: `\\documentclass{report}\n\\usepackage{graphicx}\n\\usepackage{hyperref}\n\n\\title{Impact of Climate Variability on Crop Production}\n\\author{PhD Scholar \\\\\\\\ Department of Agricultural Sciences}\n\\date{2026}\n\n% \\includeonly{chapters/results}  % Uncomment to compile only one chapter\n\n\\begin{document}\n\\maketitle\n\n% Add TOC, list of figures, list of tables\n% Add chapters using \\include or \\chapter\n% Add appendix and bibliography\n\n\\end{document}`,
        checks: [
            { label: "Uses report class", regex: /\\documentclass.*\{report\}/, hint: "Theses use report class." },
            { label: "Has \\tableofcontents", regex: /\\tableofcontents/, hint: "Add TOC after \\maketitle." },
            { label: "Has \\chapter{}", regex: /\\chapter\{|\\include\{|\\input\{/, hint: "Use \\chapter{} or \\include{} for chapters." },
            { label: "Has 2+ chapter refs", regex: /(\\include\{[^}]+\}|\\input\{[^}]+\}|\\chapter\{[^}]+\})[\s\S]*(\\include\{[^}]+\}|\\input\{[^}]+\}|\\chapter\{[^}]+\})/, hint: "Reference at least 2 chapters." },
            { label: "Has \\appendix", regex: /\\appendix/, hint: "Add \\appendix before appendix content." },
            { label: "Has \\bibliography", regex: /\\bibliography\{|\\begin\{thebibliography\}/, hint: "End with bibliography." },
            { label: "Has \\listoffigures or \\listoftables", regex: /\\listoffigures|\\listoftables/, hint: "Add auto-generated lists." }
        ],
        successMessage: "Professional thesis structure! No more 'Not Responding' on 300-page files. 🏛️",
        proTip: "Use \\includeonly{chapters/results} during drafting to compile only one chapter — saves massive time.",
        snippets: [
            { label: "TOC", code: "\\tableofcontents", description: "Table of contents" },
            { label: "Chapter", code: "\\chapter{Introduction}", description: "Top-level heading" },
            { label: "Include", code: "\\include{chapters/intro}", description: "Load chapter file" },
            { label: "Input", code: "\\input{sections/abstract}", description: "Insert without page break" },
            { label: "Include only", code: "\\includeonly{chapters/results}", description: "Selective compilation" },
            { label: "Appendix", code: "\\appendix", description: "Start appendices" },
            { label: "List of figures", code: "\\listoffigures", description: "Auto figure list" },
            { label: "List of tables", code: "\\listoftables", description: "Auto table list" },
        ],
        tips: [
            {
                command: "\\include{file} vs \\input{file}",
                userTip: "\\include adds \\clearpage before and after — use for chapters. \\input is a simple paste — use for sections within a chapter.",
                options: [
                    { option: "\\include{chapters/intro}", impact: "Loads intro.tex, adds page breaks before/after. Works with \\includeonly." },
                    { option: "\\input{sections/abstract}", impact: "Pastes content inline — no page breaks. Does NOT work with \\includeonly." },
                    { option: "\\include{file} (no .tex extension)", impact: "Don't add .tex — LaTeX adds it automatically." },
                    { option: "Nested \\include", impact: "NOT ALLOWED. \\include cannot be nested. Use \\input inside included files." },
                ]
            },
            {
                command: "\\includeonly{file1, file2}",
                userTip: "Place in preamble. Only the listed files are compiled, but cross-references from other files still work. Huge time saver.",
                options: [
                    { option: "\\includeonly{chapters/results}", impact: "Only compiles the results chapter — 10x faster for large theses." },
                    { option: "\\includeonly{chapters/intro, chapters/results}", impact: "Compiles only intro and results — skip everything else." },
                    { option: "Comment out \\includeonly", impact: "Compiles the full document — use for final submission." },
                ]
            },
            {
                command: "\\chapter{...}",
                userTip: "Only available in report and book classes. Starts on a new page with a large heading.",
                options: [
                    { option: "\\chapter{Introduction}", impact: "Creates 'Chapter 1: Introduction' on a new page with large heading." },
                    { option: "\\chapter*{Acknowledgments}", impact: "Unnumbered chapter — not in TOC by default." },
                    { option: "\\chapter*{} + \\addcontentsline{toc}{chapter}{Ack}", impact: "Unnumbered chapter manually added to TOC." },
                ]
            },
            {
                command: "\\tableofcontents",
                userTip: "Auto-generated from section/chapter headings. Compile twice to populate. Depth controlled by tocdepth counter.",
                options: [
                    { option: "\\tableofcontents", impact: "Generates TOC with chapters, sections, subsections. Compile twice." },
                    { option: "\\setcounter{tocdepth}{2}", impact: "TOC shows down to subsection level (0=chapter, 1=section, 2=subsection)." },
                    { option: "\\setcounter{tocdepth}{1}", impact: "TOC shows only chapters and sections — cleaner for long documents." },
                ]
            },
            {
                command: "\\appendix",
                userTip: "Place once before appendix content. All subsequent \\chapter or \\section commands become A, B, C.",
                options: [
                    { option: "\\appendix + \\chapter{Data}", impact: "Creates 'Appendix A: Data' — auto-lettered." },
                    { option: "\\appendix + \\section{Tables}", impact: "In article class: creates 'A Tables' — sections become lettered." },
                ]
            },
        ]
    },
    {
        id: "harvest-3",
        title: "Advanced Math & Alignment",
        difficulty: "harvester",
        category: "Mathematics",
        agriContext: "Multi-step derivations for regression models, ANOVA tables, and growth curves.",
        objective: "Use align with numbering, cases, matrix, and advanced math environments.",
        instructions: [
            "Use \\begin{align} (numbered) with & alignment and \\\\.",
            "Use \\begin{cases} for piecewise functions.",
            "Use \\begin{pmatrix} or \\begin{bmatrix} for matrices.",
            "Include \\frac, \\sqrt, \\sum, \\prod, \\int in equations."
        ],
        starterCode: `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\n\\section{Advanced Yield Model}\n\nThe yield derivation:\n% Add numbered align environment\n\nThe growth function is defined as:\n% Add a piecewise function using cases\n\nThe transformation matrix:\n% Add a matrix using pmatrix or bmatrix\n\n\\end{document}`,
        checks: [
            { label: "Has \\begin{align}", regex: /\\begin\{align\*?\}/, hint: "Use \\begin{align} for multi-line math." },
            { label: "Has & alignment", regex: /&\s*=/, hint: "Place & before = to align." },
            { label: "Has \\begin{cases}", regex: /\\begin\{cases\}/, hint: "Use cases for piecewise functions." },
            { label: "Has matrix (pmatrix/bmatrix)", regex: /\\begin\{[pb]matrix\}/, hint: "Use \\begin{pmatrix} for matrices." },
            { label: "Uses \\frac or \\sqrt", regex: /\\frac\{|\\sqrt\{/, hint: "Include fractions or roots." },
            { label: "Uses \\sum, \\prod, or \\int", regex: /\\sum|\\prod|\\int/, hint: "Include summation, product, or integral." }
        ],
        successMessage: "Your advanced math is perfectly typeset! 🧮",
        proTip: "Use \\left( and \\right) for auto-sizing parentheses around tall expressions like fractions.",
        snippets: [
            { label: "Align", code: "\\begin{align}\n  Y &= a + bX \\label{eq:1} \\\\\n    &= 2.5 + 0.8X \\label{eq:2}\n\\end{align}", description: "Numbered multi-line" },
            { label: "Cases", code: "\\begin{cases}\n  Y_1 & \\text{if } X > 0 \\\\\n  Y_2 & \\text{otherwise}\n\\end{cases}", description: "Piecewise function" },
            { label: "Matrix", code: "\\begin{pmatrix}\n  a & b \\\\\n  c & d\n\\end{pmatrix}", description: "Parenthesized matrix" },
            { label: "Integral", code: "\\int_{0}^{\\infty} f(x)\\, dx", description: "Definite integral" },
            { label: "Product", code: "\\prod_{i=1}^{n} x_i", description: "Product notation" },
            { label: "Auto-size parens", code: "\\left( \\frac{a}{b} \\right)", description: "Auto-sizing brackets" },
        ],
        tips: [
            {
                command: "\\begin{cases}",
                userTip: "Creates piecewise functions with a left brace. Use & to separate the expression from the condition.",
                options: [
                    { option: "\\begin{cases} a & \\text{if } x>0 \\\\\\\\ b & \\text{otherwise} \\end{cases}", impact: "Left brace with conditions — standard piecewise notation." },
                    { option: "\\text{if } inside cases", impact: "\\text{} switches to roman font for words inside math mode." },
                    { option: "\\begin{dcases} (mathtools)", impact: "Display-style cases — fractions render full-size inside each case." },
                ]
            },
            {
                command: "Matrix environments",
                userTip: "All require amsmath. Use & for columns, \\\\\\\\ for rows. Choose the bracket style you need.",
                options: [
                    { option: "\\begin{pmatrix}", impact: "Parenthesized matrix: ( a  b ; c  d ) — most common in statistics." },
                    { option: "\\begin{bmatrix}", impact: "Bracketed matrix: [ a  b ; c  d ] — common in linear algebra." },
                    { option: "\\begin{vmatrix}", impact: "Vertical bars: | a  b ; c  d | — used for determinants." },
                    { option: "\\begin{Vmatrix}", impact: "Double vertical bars: ‖ a  b ; c  d ‖ — used for norms." },
                    { option: "\\begin{matrix}", impact: "No brackets at all — bare matrix entries." },
                    { option: "\\begin{smallmatrix}", impact: "Compact inline matrix — fits within text lines." },
                ]
            },
            {
                command: "\\left( ... \\right)",
                userTip: "Auto-sizes delimiters to match content height. Every \\left must have a matching \\right.",
                options: [
                    { option: "\\left( \\frac{a}{b} \\right)", impact: "Parentheses grow to match the fraction height." },
                    { option: "\\left[ ... \\right]", impact: "Auto-sizing square brackets." },
                    { option: "\\left\\{ ... \\right\\}", impact: "Auto-sizing curly braces (must escape with \\)." },
                    { option: "\\left. ... \\right|", impact: "Invisible left delimiter + visible right bar — used for evaluation notation." },
                    { option: "\\bigl( ... \\bigr)", impact: "Manual sizing: \\big, \\Big, \\bigg, \\Bigg — finer control than \\left/\\right." },
                ]
            },
            {
                command: "\\int, \\prod, \\iint, \\oint",
                userTip: "Integral variants for different types of integration. Use \\, before dx for proper spacing.",
                options: [
                    { option: "\\int_{a}^{b} f(x)\\,dx", impact: "Single integral from a to b. \\, adds thin space before dx." },
                    { option: "\\iint_{D} f(x,y)\\,dA", impact: "Double integral over domain D — for area integrals." },
                    { option: "\\iiint_{V} f\\,dV", impact: "Triple integral over volume V." },
                    { option: "\\oint_{C} F\\cdot dr", impact: "Contour integral — circle on the integral sign." },
                ]
            },
        ]
    },
    {
        id: "harvest-4",
        title: "Beamer Presentation",
        difficulty: "harvester",
        category: "Presentations",
        agriContext: "Conference presentations need professional slides. Beamer is LaTeX for presentations.",
        objective: "Create a beamer presentation with frames, title frame, itemize, and math.",
        instructions: [
            "Use \\documentclass{beamer}.",
            "Set a theme with \\usetheme{Madrid} or similar.",
            "Create a title frame with \\titlepage.",
            "Create content frames with \\begin{frame}{Title}.",
            "Add bullet points and an equation in separate frames."
        ],
        starterCode: `\\documentclass{beamer}\n\n% Set a theme here\n\n\\title{Impact of Organic Farming on Soil Health}\n\\author{Research Scholar}\n\\date{March 2026}\n\n\\begin{document}\n\n% Create title frame\n\n% Create content frames with bullets and math\n\n\\end{document}`,
        checks: [
            { label: "Uses beamer class", regex: /\\documentclass\{beamer\}/, hint: "Use \\documentclass{beamer} for slides." },
            { label: "Has \\usetheme{}", regex: /\\usetheme\{.+\}/, hint: "Set a theme like \\usetheme{Madrid}." },
            { label: "Has \\begin{frame}", regex: /\\begin\{frame\}/, hint: "Each slide is a \\begin{frame}...\\end{frame}." },
            { label: "Has \\titlepage", regex: /\\titlepage/, hint: "Use \\titlepage inside a frame for the title slide." },
            { label: "Has itemize in frame", regex: /\\begin\{frame\}[\s\S]*?\\begin\{itemize\}/, hint: "Add bullet points inside a frame." },
            { label: "Has math in frame", regex: /\\begin\{frame\}[\s\S]*?\$|\\\[/, hint: "Add an equation inside a frame." }
        ],
        successMessage: "Your conference presentation is ready! 🎤",
        proTip: "Popular themes: Madrid, Berlin, Copenhagen, Warsaw. Use \\usecolortheme{} for color variants.",
        snippets: [
            { label: "Theme", code: "\\usetheme{Madrid}", description: "Presentation theme" },
            { label: "Color theme", code: "\\usecolortheme{whale}", description: "Color variant" },
            { label: "Title frame", code: "\\begin{frame}\n  \\titlepage\n\\end{frame}", description: "Title slide" },
            { label: "Content frame", code: "\\begin{frame}{Slide Title}\n  \\begin{itemize}\n    \\item Point 1\n    \\item Point 2\n  \\end{itemize}\n\\end{frame}", description: "Content slide" },
            { label: "Math frame", code: "\\begin{frame}{Equation}\n  \\[\n    Y = \\beta_0 + \\beta_1 X\n  \\]\n\\end{frame}", description: "Equation slide" },
        ],
        tips: [
            {
                command: "\\documentclass{beamer}",
                userTip: "Beamer replaces article for presentations. No page numbers, margins, or sections — everything is in frames (slides).",
                options: [
                    { option: "\\documentclass{beamer}", impact: "Creates a slide deck. Each frame = one slide. Default 128mm × 96mm." },
                    { option: "\\documentclass[aspectratio=169]{beamer}", impact: "Widescreen 16:9 slides — modern projector format." },
                    { option: "\\documentclass[aspectratio=43]{beamer}", impact: "Traditional 4:3 slides — older projector format (default)." },
                    { option: "\\documentclass[handout]{beamer}", impact: "Handout mode: removes overlays/animations — one frame per slide." },
                ]
            },
            {
                command: "\\usetheme{...}",
                userTip: "Themes control the overall look. Combine with \\usecolortheme for color variants.",
                options: [
                    { option: "\\usetheme{Madrid}", impact: "Clean, professional theme with header bar and footer. Most popular." },
                    { option: "\\usetheme{Berlin}", impact: "Navigation dots at top, section/subsection indicators." },
                    { option: "\\usetheme{Copenhagen}", impact: "Similar to Berlin with different header style." },
                    { option: "\\usetheme{Warsaw}", impact: "Full navigation bar at top — good for long presentations." },
                    { option: "\\usetheme{default}", impact: "Minimal theme — no header/footer decorations." },
                    { option: "\\usetheme{Boadilla}", impact: "Compact theme with minimal navigation." },
                ]
            },
            {
                command: "\\usecolortheme{...}",
                userTip: "Changes colors without changing layout. Combine with any structural theme.",
                options: [
                    { option: "\\usecolortheme{whale}", impact: "Blue color scheme — professional and calm." },
                    { option: "\\usecolortheme{crane}", impact: "Yellow/orange scheme — warm and energetic." },
                    { option: "\\usecolortheme{dove}", impact: "Grayscale — elegant, prints well in B&W." },
                    { option: "\\usecolortheme{orchid}", impact: "Purple accents — distinctive and modern." },
                ]
            },
            {
                command: "\\begin{frame}{Title}",
                userTip: "Each frame is one slide. Keep content minimal — 5-7 bullet points max. Use \\pause for step-by-step reveals.",
                options: [
                    { option: "\\begin{frame}{Title}...\\end{frame}", impact: "Standard content slide with a title bar." },
                    { option: "\\begin{frame}[fragile]{Code}", impact: "Required when using verbatim/code inside a frame." },
                    { option: "\\begin{frame}[plain]", impact: "No header/footer — full slide for images or special content." },
                    { option: "\\pause between items", impact: "Reveals content step by step — each \\pause creates a new overlay." },
                    { option: "\\begin{frame}[allowframebreaks]{Long}", impact: "Auto-splits long content across multiple slides." },
                ]
            },
        ]
    },
    {
        id: "harvest-5",
        title: "Two-Column & Multicol Layout",
        difficulty: "harvester",
        category: "Layout",
        agriContext: "Many journals use two-column layouts. Conference papers often require this format.",
        objective: "Use twocolumn option, multicol package, and \\begin{center} environment.",
        instructions: [
            "Use \\documentclass[twocolumn]{article} for two-column layout.",
            "OR use \\usepackage{multicol} with \\begin{multicols}{2}.",
            "Use \\begin{center}...\\end{center} to center content.",
            "Use \\columnbreak to force a column break."
        ],
        starterCode: `\\documentclass{article}\n\\usepackage{multicol}\n\\usepackage{lipsum}\n\n\\begin{document}\n\n\\section{Research Summary}\n\n% Use \\begin{center} to center a title or important text\n\n% Use \\begin{multicols}{2} for two-column text\n% Add some content and try \\columnbreak\n\n\\end{document}`,
        checks: [
            { label: "Has multicol or twocolumn", regex: /\\usepackage\{multicol\}|twocolumn/, hint: "Use multicol package or [twocolumn] option." },
            { label: "Has \\begin{multicols}{2}", regex: /\\begin\{multicols\}\{2\}/, hint: "Use \\begin{multicols}{2} for two columns." },
            { label: "Has \\begin{center}", regex: /\\begin\{center\}/, hint: "Use \\begin{center}...\\end{center} to center text." },
            { label: "Has \\columnbreak", regex: /\\columnbreak/, hint: "Use \\columnbreak to force a column break." }
        ],
        successMessage: "You can now create journal-style two-column layouts! 📰",
        proTip: "Use multicols for flexible column control. The twocolumn class option is simpler but less flexible.",
        snippets: [
            { label: "Multicols", code: "\\begin{multicols}{2}\nColumn 1 text...\n\\columnbreak\nColumn 2 text...\n\\end{multicols}", description: "Two-column block" },
            { label: "Center", code: "\\begin{center}\nCentered text\n\\end{center}", description: "Center environment" },
            { label: "Column break", code: "\\columnbreak", description: "Force column break" },
        ],
        tips: [
            {
                command: "\\documentclass[twocolumn]{article} vs multicol",
                userTip: "twocolumn is a class option (whole document). multicol is a package for selective column control.",
                options: [
                    { option: "[twocolumn]{article}", impact: "Entire document in two columns. Simple but inflexible." },
                    { option: "\\usepackage{multicol} + \\begin{multicols}{2}", impact: "Only the wrapped content is two-column. Rest stays single-column." },
                    { option: "\\begin{multicols}{3}", impact: "Three columns — useful for glossaries or index pages." },
                    { option: "\\twocolumn[\\maketitle]", impact: "Title spans full width, rest is two-column. Common for conference papers." },
                ]
            },
            {
                command: "\\columnbreak",
                userTip: "Forces content to the next column. Only works inside multicols environment.",
                options: [
                    { option: "\\columnbreak", impact: "Moves remaining content to the next column — like \\newpage for columns." },
                    { option: "Without \\columnbreak", impact: "LaTeX auto-balances columns — content splits evenly." },
                ]
            },
            {
                command: "\\begin{center}",
                userTip: "Centers text and objects. Adds vertical space above and below. Use \\centering inside floats instead.",
                options: [
                    { option: "\\begin{center}...\\end{center}", impact: "Centers content with extra vertical spacing before and after." },
                    { option: "\\centering", impact: "Centers without extra spacing — preferred inside table/figure environments." },
                    { option: "{\\centering text\\par}", impact: "Scoped centering — the \\par is needed to apply before the group closes." },
                ]
            },
        ]
    },
    {
        id: "harvest-6",
        title: "Document Class Options Mastery",
        difficulty: "harvester",
        category: "Configuration",
        agriContext: "Different publications require different configurations — font size, paper size, columns, orientation.",
        objective: "Master all \\documentclass options: font size, paper, columns, orientation, and different classes.",
        instructions: [
            "Try \\documentclass[12pt, a4paper, twocolumn]{article}.",
            "Change to \\documentclass{report} and add a \\chapter.",
            "Try \\documentclass[landscape]{article}.",
            "Add \\usepackage[utf8]{inputenc} for encoding."
        ],
        starterCode: `% Try different document class options:\n% [10pt], [11pt], [12pt] - font sizes\n% [a4paper], [letterpaper] - paper sizes\n% [twocolumn] - two column layout\n% [landscape] - landscape orientation\n% Classes: article, report, book, beamer\n\n\\documentclass[12pt, a4paper]{article}\n\n\\begin{document}\n\n\\section{Configuration Test}\nThis document tests various class options.\n\n% Add a chapter (requires report/book class)\n% Try changing options above\n\n\\end{document}`,
        checks: [
            { label: "Has font size option", regex: /\\documentclass\[.*?(10pt|11pt|12pt)/, hint: "Add [12pt] to set font size." },
            { label: "Has paper size option", regex: /\\documentclass\[.*?(a4paper|letterpaper)/, hint: "Add [a4paper] for A4 paper." },
            { label: "Has document class", regex: /\\documentclass/, hint: "Every document needs \\documentclass." },
            { label: "Has content", regex: /\\section\{|\\chapter\{/, hint: "Add sections or chapters." }
        ],
        successMessage: "You understand all document configuration options! ⚙️",
        proTip: "article: papers/short docs. report: theses/long docs with chapters. book: published books. beamer: slides.",
        snippets: [
            { label: "Article 12pt A4", code: "\\documentclass[12pt, a4paper]{article}", description: "Standard paper" },
            { label: "Report", code: "\\documentclass[12pt]{report}", description: "Thesis/long document" },
            { label: "Book", code: "\\documentclass{book}", description: "Published book" },
            { label: "Two-column", code: "\\documentclass[twocolumn]{article}", description: "Journal style" },
            { label: "Landscape", code: "\\documentclass[landscape]{article}", description: "Landscape orientation" },
        ],
        tips: [
            {
                command: "Font size options",
                userTip: "Sets the base font size for the entire document. All relative sizes (\\large, \\small) scale accordingly.",
                options: [
                    { option: "[10pt]", impact: "Default size. Compact text — fits more content per page." },
                    { option: "[11pt]", impact: "Slightly larger — good balance of readability and density." },
                    { option: "[12pt]", impact: "Largest standard option. Most readable. Required by many thesis guidelines." },
                    { option: "No option specified", impact: "Defaults to 10pt. Same as explicitly writing [10pt]." },
                ]
            },
            {
                command: "Paper size options",
                userTip: "Sets the physical page dimensions. Affects margins, text width, and print layout.",
                options: [
                    { option: "[a4paper]", impact: "210mm × 297mm — international standard. Used in India, Europe, most of the world." },
                    { option: "[letterpaper]", impact: "8.5in × 11in — US standard. Default in many LaTeX distributions." },
                    { option: "[a5paper]", impact: "148mm × 210mm — half of A4. Used for booklets and small publications." },
                    { option: "[b5paper]", impact: "176mm × 250mm — between A4 and A5. Common for some book formats." },
                ]
            },
            {
                command: "Document classes",
                userTip: "Choose based on document type. The class determines available commands (\\chapter, \\part) and default formatting.",
                options: [
                    { option: "article", impact: "No chapters. Sections start at \\section. For papers, reports, short documents." },
                    { option: "report", impact: "Adds \\chapter. Title page is separate. For theses, long reports." },
                    { option: "book", impact: "Adds \\chapter + \\part + \\frontmatter/\\mainmatter/\\backmatter. For published books." },
                    { option: "beamer", impact: "Presentation slides. Frames instead of pages. No margins or page numbers." },
                    { option: "letter", impact: "For formal letters. Has \\opening, \\closing, \\signature commands." },
                ]
            },
            {
                command: "Layout options",
                userTip: "These options change the overall page layout and can be combined with font/paper options.",
                options: [
                    { option: "[twocolumn]", impact: "Entire document in two columns — standard for many journals." },
                    { option: "[onecolumn]", impact: "Default single column. Explicit only needed to override." },
                    { option: "[landscape]", impact: "Rotates page to landscape (wider than tall). Good for wide tables." },
                    { option: "[twoside]", impact: "Different margins for odd/even pages — for bound documents. Default in book class." },
                    { option: "[oneside]", impact: "Same margins on all pages. Default in article and report classes." },
                    { option: "[draft]", impact: "Shows overfull boxes as black bars. Images shown as empty frames. Faster compilation." },
                    { option: "[final]", impact: "Full rendering (default). Use for submission." },
                    { option: "[fleqn]", impact: "Left-aligns display equations instead of centering them." },
                    { option: "[leqno]", impact: "Equation numbers on the left instead of the right." },
                ]
            },
        ]
    },
];
