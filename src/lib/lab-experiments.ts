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
    },
];
