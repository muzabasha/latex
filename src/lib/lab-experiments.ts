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
    // ─── SEEDLING: Foundation Skills ───
    {
        id: "seed-1",
        title: "Hello Agriculture World",
        difficulty: "seedling",
        category: "Document Structure",
        agriContext: "Every research journey starts with a single document — like planting your first seed.",
        objective: "Create a minimal LaTeX document that compiles successfully.",
        instructions: [
            "Keep \\documentclass{article} as the first line.",
            "Write a greeting message between \\begin{document} and \\end{document}.",
            "Click Compile and watch your first PDF appear on the right."
        ],
        starterCode: `\\documentclass{article}\n\\begin{document}\n\n% Replace this comment with your greeting!\n\n\\end{document}`,
        checks: [
            { label: "Has \\documentclass", regex: /\\documentclass\{/, hint: "The very first line must declare the document type." },
            { label: "Has \\begin{document}", regex: /\\begin\{document\}/, hint: "This opens the content area of your paper." },
            { label: "Has visible text", regex: /\\begin\{document\}\s*\n[\s\S]*[A-Za-z]{3,}/, hint: "Write at least one sentence between \\begin and \\end." },
            { label: "Has \\end{document}", regex: /\\end\{document\}/, hint: "Always close what you open — like closing the barn door." }
        ],
        successMessage: "Your first LaTeX document compiled! You've planted the seed. 🌱",
        proTip: "LaTeX ignores extra spaces and blank lines between words. Use a blank line to start a new paragraph.",
        snippets: [
            { label: "Document class", code: "\\documentclass{article}", description: "Declares document type" },
            { label: "Begin document", code: "\\begin{document}", description: "Opens content area" },
            { label: "End document", code: "\\end{document}", description: "Closes content area" },
        ],
        guidedSteps: [
            { instruction: "The document class is already set. Now write a greeting like 'Hello, Agriculture World!' between \\begin{document} and \\end{document}.", codeToAdd: "Hello, Agriculture World!", checkRegex: /[A-Za-z]{3,}/ },
            { instruction: "Click the Compile button to see your document rendered on the right panel.", codeToAdd: "", checkRegex: /\\end\{document\}/ },
        ]
    },
    {
        id: "seed-2",
        title: "Title Your Research",
        difficulty: "seedling",
        category: "Metadata",
        agriContext: "Every published paper needs a title page — it's the label on your seed packet.",
        objective: "Add a title, author, and date to your document using LaTeX metadata commands.",
        instructions: [
            "Add \\title{...} in the preamble (before \\begin{document}) with a research topic.",
            "Add \\author{...} with your name.",
            "Place \\maketitle right after \\begin{document} to render the title block."
        ],
        starterCode: `\\documentclass{article}\n\n% Add your title and author here (in the preamble)\n\n\\begin{document}\n\n% Render the title block here\n\nThis paper studies the effect of organic fertilizers on wheat yield.\n\n\\end{document}`,
        checks: [
            { label: "Has \\title{...}", regex: /\\title\{.+\}/, hint: "Use \\title{Your Research Title} before \\begin{document}." },
            { label: "Has \\author{...}", regex: /\\author\{.+\}/, hint: "Use \\author{Your Name} in the preamble." },
            { label: "Has \\maketitle", regex: /\\maketitle/, hint: "Place \\maketitle inside the document body to display the title." }
        ],
        successMessage: "Your paper now has a professional title page! 📄",
        proTip: "Use \\date{} (empty braces) to hide the date, or \\date{March 2026} for a custom date.",
        snippets: [
            { label: "Title", code: "\\title{Your Research Title}", description: "Sets the document title" },
            { label: "Author", code: "\\author{Your Name}", description: "Sets the author name" },
            { label: "Make title", code: "\\maketitle", description: "Renders the title block" },
            { label: "Custom date", code: "\\date{March 2026}", description: "Sets a custom date" },
        ],
        guidedSteps: [
            { instruction: "Add \\title{Effect of Organic Fertilizers on Wheat Yield} in the preamble (between \\documentclass and \\begin{document}).", codeToAdd: "\\title{Effect of Organic Fertilizers on Wheat Yield}", checkRegex: /\\title\{.+\}/ },
            { instruction: "Add \\author{Your Name} right after the \\title line.", codeToAdd: "\\author{Research Scholar}", checkRegex: /\\author\{.+\}/ },
            { instruction: "Add \\maketitle right after \\begin{document} to render the title block.", codeToAdd: "\\maketitle", checkRegex: /\\maketitle/ },
        ]
    },
    {
        id: "seed-3",
        title: "Bold & Italic Crops",
        difficulty: "seedling",
        category: "Text Formatting",
        agriContext: "Scientific names like Oryza sativa must be italicized. Key findings must be bold.",
        objective: "Apply bold and italic formatting to text using LaTeX commands.",
        instructions: [
            "Make at least one word bold using \\textbf{...}.",
            "Make at least one word italic using \\textit{...}.",
            "Write a sentence about a crop using both styles."
        ],
        starterCode: `\\documentclass{article}\n\\begin{document}\n\n\\section{Crop Analysis}\n\nThe rice variety known as Oryza sativa showed significant yield improvement.\nThe nitrogen content was the primary factor.\n\n% Make the scientific name italic and \"significant\" bold!\n\n\\end{document}`,
        checks: [
            { label: "Uses \\textbf{...}", regex: /\\textbf\{.+\}/, hint: "Wrap important words in \\textbf{bold text}." },
            { label: "Uses \\textit{...}", regex: /\\textit\{.+\}/, hint: "Wrap scientific names in \\textit{italic text}." },
            { label: "Has a \\section", regex: /\\section\{.+\}/, hint: "Keep the section heading to organize your content." }
        ],
        successMessage: "You can now emphasize key findings like a pro researcher! ✨",
        proTip: "Use \\emph{} instead of \\textit{} — it's smarter and toggles italic based on context.",
        snippets: [
            { label: "Bold", code: "\\textbf{bold text}", description: "Makes text bold" },
            { label: "Italic", code: "\\textit{italic text}", description: "Makes text italic" },
            { label: "Emphasis", code: "\\emph{emphasized}", description: "Context-aware emphasis" },
            { label: "Underline", code: "\\underline{text}", description: "Underlines text" },
        ],
        guidedSteps: [
            { instruction: "Replace 'Oryza sativa' with \\textit{Oryza sativa} to italicize the scientific name.", codeToAdd: "\\textit{Oryza sativa}", checkRegex: /\\textit\{.+\}/ },
            { instruction: "Replace 'significant' with \\textbf{significant} to bold the key finding.", codeToAdd: "\\textbf{significant}", checkRegex: /\\textbf\{.+\}/ },
        ]
    },
    {
        id: "seed-4",
        title: "List Your Soil Types",
        difficulty: "seedling",
        category: "Lists",
        agriContext: "Research papers list materials, methods, and findings. Lists keep data organized.",
        objective: "Create both a bulleted list and a numbered list.",
        instructions: [
            "Create a bulleted list using \\begin{itemize} with at least 3 soil types.",
            "Create a numbered list using \\begin{enumerate} with at least 3 steps.",
            "Each item starts with \\item."
        ],
        starterCode: `\\documentclass{article}\n\\begin{document}\n\n\\section{Materials}\nThe following soil types were collected:\n\n% Create a bulleted list of soil types here\n\n\\section{Methodology}\nThe experiment followed these steps:\n\n% Create a numbered list of steps here\n\n\\end{document}`,
        checks: [
            { label: "Has \\begin{itemize}", regex: /\\begin\{itemize\}/, hint: "Start a bulleted list with \\begin{itemize}." },
            { label: "Has \\begin{enumerate}", regex: /\\begin\{enumerate\}/, hint: "Start a numbered list with \\begin{enumerate}." },
            { label: "Has 3+ \\item entries", regex: /(\\item[\s\S]*?){3,}/, hint: "Add at least 3 \\item entries across your lists." },
            { label: "Lists are closed", regex: /\\end\{itemize\}[\s\S]*\\end\{enumerate\}|\\end\{enumerate\}[\s\S]*\\end\{itemize\}/, hint: "Close each list with \\end{itemize} or \\end{enumerate}." }
        ],
        successMessage: "Your materials and methods are neatly organized! 📋",
        proTip: "You can nest lists inside each other up to 4 levels deep. LaTeX auto-changes the bullet style.",
        snippets: [
            { label: "Bullet list", code: "\\begin{itemize}\n  \\item First item\n  \\item Second item\n\\end{itemize}", description: "Unordered list" },
            { label: "Numbered list", code: "\\begin{enumerate}\n  \\item Step one\n  \\item Step two\n\\end{enumerate}", description: "Ordered list" },
            { label: "List item", code: "\\item ", description: "Single list entry" },
        ],
        guidedSteps: [
            { instruction: "Under the Materials section, add \\begin{itemize} to start a bulleted list.", codeToAdd: "\\begin{itemize}", checkRegex: /\\begin\{itemize\}/ },
            { instruction: "Add 3 soil types using \\item, e.g., \\item Alluvial Soil, \\item Black Soil, \\item Red Soil.", codeToAdd: "\\item Alluvial Soil\n  \\item Black Soil\n  \\item Red Soil", checkRegex: /(\\item[\s\S]*?){3,}/ },
            { instruction: "Close the list with \\end{itemize}, then under Methodology add a numbered list with \\begin{enumerate}...\\end{enumerate}.", codeToAdd: "\\end{itemize}", checkRegex: /\\end\{itemize\}/ },
        ]
    },
    {
        id: "seed-5",
        title: "Packages & Colors",
        difficulty: "seedling",
        category: "Packages",
        agriContext: "Just like adding fertilizer to soil, packages add capabilities to your LaTeX document.",
        objective: "Learn to import packages and use colored text.",
        instructions: [
            "Add \\usepackage{xcolor} in the preamble.",
            "Use \\textcolor{red}{...} to color a warning text.",
            "Use \\colorbox{yellow}{...} to highlight a key finding."
        ],
        starterCode: `\\documentclass{article}\n\n% Add the xcolor package here\n\n\\begin{document}\n\n\\section{Soil pH Warning}\n\nThe soil pH dropped below 4.5, which is critically acidic.\n\nKey finding: Lime application restored pH to 6.8 within 3 months.\n\n\\end{document}`,
        checks: [
            { label: "Has \\usepackage{xcolor}", regex: /\\usepackage\{xcolor\}/, hint: "Add \\usepackage{xcolor} before \\begin{document}." },
            { label: "Uses \\textcolor", regex: /\\textcolor\{.+\}\{.+\}/, hint: "Use \\textcolor{red}{warning text} to color text." },
            { label: "Uses \\colorbox", regex: /\\colorbox\{.+\}\{.+\}/, hint: "Use \\colorbox{yellow}{highlighted text} for background color." }
        ],
        successMessage: "You've learned to enhance documents with color! 🎨",
        proTip: "Use colors sparingly in academic papers. Most journals prefer black text with minimal color.",
        snippets: [
            { label: "xcolor package", code: "\\usepackage{xcolor}", description: "Enables color commands" },
            { label: "Text color", code: "\\textcolor{red}{text}", description: "Colors the text" },
            { label: "Color box", code: "\\colorbox{yellow}{text}", description: "Highlights with background" },
        ],
        guidedSteps: [
            { instruction: "Add \\usepackage{xcolor} in the preamble (after \\documentclass).", codeToAdd: "\\usepackage{xcolor}", checkRegex: /\\usepackage\{xcolor\}/ },
            { instruction: "Wrap 'critically acidic' with \\textcolor{red}{critically acidic}.", codeToAdd: "\\textcolor{red}{critically acidic}", checkRegex: /\\textcolor\{.+\}\{.+\}/ },
            { instruction: "Wrap the key finding with \\colorbox{yellow}{...}.", codeToAdd: "\\colorbox{yellow}{Lime application restored pH to 6.8}", checkRegex: /\\colorbox\{.+\}\{.+\}/ },
        ]
    },
    // ─── SPROUT: Intermediate Skills ───
    {
        id: "sprout-1",
        title: "Crop Yield Equation",
        difficulty: "sprout",
        category: "Mathematics",
        agriContext: "Agriculture statistics rely on precise equations — yield models, regression, ANOVA.",
        objective: "Write both an inline equation and a display equation about crop yield.",
        instructions: [
            "Write an inline equation using $...$ within a sentence (e.g., $Y = aR + b$).",
            "Write a display equation using \\[ ... \\] for the standard deviation formula.",
            "Use \\frac{}{} for at least one fraction."
        ],
        starterCode: `\\documentclass{article}\n\\begin{document}\n\n\\section{Statistical Model}\n\nThe crop yield model is expressed as: % add inline equation here\n\nThe standard deviation of soil pH measurements is:\n% Add a display equation here using \\[ ... \\]\n\n\\end{document}`,
        checks: [
            { label: "Has inline math $...$", regex: /\$[^$]+\$/, hint: "Wrap math in single dollar signs for inline: $Y = aR + b$." },
            { label: "Has display math \\[...\\]", regex: /\\\[[\s\S]+?\\\]/, hint: "Use \\[ and \\] for centered display equations." },
            { label: "Uses \\frac{}{}", regex: /\\frac\{/, hint: "Create a fraction with \\frac{numerator}{denominator}." }
        ],
        successMessage: "Your equations are publication-ready! No more blurry Word equation images. 📐",
        proTip: "Use \\begin{equation} instead of \\[...\\] when you need auto-numbered equations for cross-referencing.",
        snippets: [
            { label: "Inline math", code: "$Y = aR + b$", description: "Math within text" },
            { label: "Display math", code: "\\[\n  \\sigma = \\sqrt{\\frac{1}{N}\\sum_{i=1}^{N}(x_i - \\mu)^2}\n\\]", description: "Centered equation" },
            { label: "Fraction", code: "\\frac{numerator}{denominator}", description: "Creates a fraction" },
            { label: "Square root", code: "\\sqrt{expression}", description: "Square root" },
            { label: "Summation", code: "\\sum_{i=1}^{N}", description: "Summation symbol" },
        ],
        guidedSteps: [
            { instruction: "After 'expressed as:', add the inline equation $Y = aR + b$ where Y is yield, R is rainfall, a and b are constants.", codeToAdd: "$Y = aR + b$", checkRegex: /\$[^$]+\$/ },
            { instruction: "Below the standard deviation line, add a display equation: \\[ \\sigma = \\sqrt{\\frac{1}{N}\\sum_{i=1}^{N}(x_i - \\mu)^2} \\]", codeToAdd: "\\[\n  \\sigma = \\sqrt{\\frac{1}{N}\\sum_{i=1}^{N}(x_i - \\mu)^2}\n\\]", checkRegex: /\\\[[\s\S]+?\\\]/ },
        ]
    },
    {
        id: "sprout-2",
        title: "Fertilizer Data Table",
        difficulty: "sprout",
        category: "Tables",
        agriContext: "Every field trial needs a results table — treatment, dose, yield, significance.",
        objective: "Build a complete table with headers, data rows, caption, and label.",
        instructions: [
            "Create a table environment with \\begin{table}[h] and \\centering.",
            "Use \\begin{tabular}{|l|c|r|} for a 3-column grid.",
            "Add at least 2 data rows with & separators and \\\\ line endings.",
            "Add \\caption{...} and \\label{...} after the tabular."
        ],
        starterCode: `\\documentclass{article}\n\\begin{document}\n\n\\section{Results}\nTable \\ref{tab:fert} shows the fertilizer trial results.\n\n% Build your table here\n% Remember: \\begin{table}[h] → \\centering → \\begin{tabular} → data → \\end{tabular} → \\caption → \\label → \\end{table}\n\n\\end{document}`,
        checks: [
            { label: "Has \\begin{table}", regex: /\\begin\{table\}/, hint: "Wrap everything in \\begin{table}[h] ... \\end{table}." },
            { label: "Has \\begin{tabular}", regex: /\\begin\{tabular\}/, hint: "The actual grid is \\begin{tabular}{|l|c|r|}." },
            { label: "Has column separator &", regex: /&/, hint: "Separate columns with the & character." },
            { label: "Has \\caption{...}", regex: /\\caption\{.+\}/, hint: "Add a descriptive caption below the tabular." },
            { label: "Has \\label{...}", regex: /\\label\{.+\}/, hint: "Add \\label{tab:fert} AFTER \\caption for cross-referencing." },
            { label: "Has \\hline", regex: /\\hline/, hint: "Use \\hline to draw horizontal lines in your table." }
        ],
        successMessage: "Your data table is structured and referenceable! Journals will love this. 📊",
        proTip: "Professional journals prefer minimal vertical lines. Use \\hline only at top, bottom, and below headers.",
        snippets: [
            { label: "Table skeleton", code: "\\begin{table}[h]\n  \\centering\n  \\begin{tabular}{|l|c|r|}\n    \\hline\n    Header 1 & Header 2 & Header 3 \\\\\n    \\hline\n    Data & Data & Data \\\\\n    \\hline\n  \\end{tabular}\n  \\caption{Your caption}\n  \\label{tab:label}\n\\end{table}", description: "Complete table template" },
            { label: "Horizontal line", code: "\\hline", description: "Table row separator" },
            { label: "Centering", code: "\\centering", description: "Centers the table" },
        ],
        guidedSteps: [
            { instruction: "Start with \\begin{table}[h] and add \\centering on the next line.", codeToAdd: "\\begin{table}[h]\n  \\centering", checkRegex: /\\begin\{table\}/ },
            { instruction: "Add \\begin{tabular}{|l|c|r|} and a \\hline, then add headers: Treatment & Dose (kg/ha) & Yield (t/ha) \\\\", codeToAdd: "\\begin{tabular}{|l|c|r|}\n    \\hline\n    Treatment & Dose (kg/ha) & Yield (t/ha) \\\\", checkRegex: /\\begin\{tabular\}/ },
            { instruction: "Add 2 data rows, close with \\end{tabular}, then add \\caption{Fertilizer trial results} and \\label{tab:fert}.", codeToAdd: "\\hline\n    Urea & 120 & 4.5 \\\\\n    DAP & 80 & 5.2 \\\\\n    \\hline\n  \\end{tabular}\n  \\caption{Fertilizer trial results}\n  \\label{tab:fert}\n\\end{table}", checkRegex: /\\caption\{.+\}/ },
        ]
    },
    {
        id: "sprout-3",
        title: "Cite Your Sources",
        difficulty: "sprout",
        category: "Citations",
        agriContext: "No research paper survives without proper citations. BibTeX automates the pain.",
        objective: "Use \\cite{} to reference a paper and set up a bibliography.",
        instructions: [
            "Use \\cite{sharma2024} at least once in your text.",
            "Add \\bibliographystyle{plain} before the bibliography.",
            "Add \\bibliography{references} to load the .bib file."
        ],
        starterCode: `\\documentclass{article}\n\\begin{document}\n\n\\section{Literature Review}\n\nRecent studies have shown that drip irrigation improves water efficiency\nby up to 40\\% compared to flood irrigation.\n\n% Add a citation here using \\cite{sharma2024}\n\n% Add bibliography commands at the end\n\n\\end{document}`,
        checks: [
            { label: "Has \\cite{...}", regex: /\\cite\{.+\}/, hint: "Insert \\cite{sharma2024} where you reference the study." },
            { label: "Has \\bibliographystyle", regex: /\\bibliographystyle\{/, hint: "Add \\bibliographystyle{plain} before \\bibliography." },
            { label: "Has \\bibliography{...}", regex: /\\bibliography\{.+\}/, hint: "Add \\bibliography{references} to load your .bib file." }
        ],
        successMessage: "Your citations are automated! No more manual [1], [2] numbering. 📚",
        proTip: "Use \\cite{key1, key2, key3} to cite multiple papers at once. LaTeX groups them automatically.",
        snippets: [
            { label: "Citation", code: "\\cite{sharma2024}", description: "Cites a reference" },
            { label: "Multi-cite", code: "\\cite{key1, key2, key3}", description: "Multiple citations" },
            { label: "Bib style", code: "\\bibliographystyle{plain}", description: "Sets citation style" },
            { label: "Bibliography", code: "\\bibliography{references}", description: "Loads .bib file" },
        ],
        guidedSteps: [
            { instruction: "After the irrigation sentence, add \\cite{sharma2024} to reference the study.", codeToAdd: "\\cite{sharma2024}", checkRegex: /\\cite\{.+\}/ },
            { instruction: "Before \\end{document}, add \\bibliographystyle{plain}.", codeToAdd: "\\bibliographystyle{plain}", checkRegex: /\\bibliographystyle\{/ },
            { instruction: "Right after the style, add \\bibliography{references} to load the .bib file.", codeToAdd: "\\bibliography{references}", checkRegex: /\\bibliography\{.+\}/ },
        ]
    },
    {
        id: "sprout-4",
        title: "Sections & Subsections",
        difficulty: "sprout",
        category: "Document Structure",
        agriContext: "A well-structured paper has clear sections: Introduction, Methods, Results, Discussion.",
        objective: "Create a multi-section document with proper hierarchy.",
        instructions: [
            "Create at least 3 sections using \\section{...}.",
            "Add at least 1 subsection using \\subsection{...}.",
            "Use \\section*{...} (starred) for an unnumbered Abstract.",
            "Write at least one paragraph in each section."
        ],
        starterCode: `\\documentclass{article}\n\\title{Effect of Mulching on Soil Moisture Retention}\n\\author{Agriculture Scholar}\n\\begin{document}\n\\maketitle\n\n% Add an unnumbered Abstract section here\n\n% Add numbered sections: Introduction, Methodology, Results\n% Add a subsection inside Methodology\n\n\\end{document}`,
        checks: [
            { label: "Has 3+ \\section{}", regex: /(\\section\*?\{[^}]+\}[\s\S]*?){3,}/, hint: "Create at least 3 sections for a proper paper structure." },
            { label: "Has \\subsection{}", regex: /\\subsection\{.+\}/, hint: "Add a subsection inside one of your sections." },
            { label: "Has \\section*{} (unnumbered)", regex: /\\section\*\{/, hint: "Use \\section*{Abstract} for an unnumbered heading." },
            { label: "Has \\maketitle", regex: /\\maketitle/, hint: "Keep \\maketitle to display the title block." }
        ],
        successMessage: "Your paper has professional structure! The Table of Contents would auto-generate from this. 🏗️",
        proTip: "Add \\tableofcontents after \\maketitle to auto-generate a TOC. Compile twice for it to appear.",
        snippets: [
            { label: "Section", code: "\\section{Section Title}", description: "Numbered section" },
            { label: "Subsection", code: "\\subsection{Subsection Title}", description: "Numbered subsection" },
            { label: "Unnumbered section", code: "\\section*{Abstract}", description: "No number prefix" },
            { label: "Table of contents", code: "\\tableofcontents", description: "Auto-generated TOC" },
        ],
        guidedSteps: [
            { instruction: "Add \\section*{Abstract} after \\maketitle and write a brief abstract paragraph.", codeToAdd: "\\section*{Abstract}\nThis study investigates the effect of mulching on soil moisture retention in semi-arid regions.", checkRegex: /\\section\*\{/ },
            { instruction: "Add \\section{Introduction} with a paragraph about the research background.", codeToAdd: "\\section{Introduction}\nSoil moisture is critical for crop growth in rain-fed agriculture.", checkRegex: /\\section\{Introduction\}/ },
            { instruction: "Add \\section{Methodology} with a \\subsection{Study Area}, then add \\section{Results}.", codeToAdd: "\\section{Methodology}\n\\subsection{Study Area}\nThe experiment was conducted at the university farm.", checkRegex: /\\subsection\{.+\}/ },
        ]
    },
    {
        id: "sprout-5",
        title: "Figure Insertion",
        difficulty: "sprout",
        category: "Figures",
        agriContext: "A picture is worth a thousand words — especially for crop growth charts and field photos.",
        objective: "Insert a figure with caption, label, and proper sizing.",
        instructions: [
            "Add \\usepackage{graphicx} in the preamble.",
            "Create a figure environment with \\begin{figure}[h].",
            "Use \\includegraphics with width option.",
            "Add \\caption{} and \\label{} for cross-referencing."
        ],
        starterCode: `\\documentclass{article}\n\n% Add graphicx package here\n\n\\begin{document}\n\n\\section{Field Observations}\n\nFigure \\ref{fig:growth} shows the crop growth pattern over 12 weeks.\n\n% Insert your figure here\n% Use: \\begin{figure}[h] → \\centering → \\includegraphics → \\caption → \\label → \\end{figure}\n\n\\end{document}`,
        checks: [
            { label: "Has \\usepackage{graphicx}", regex: /\\usepackage\{graphicx\}/, hint: "Load graphicx package for image support." },
            { label: "Has \\begin{figure}", regex: /\\begin\{figure\}/, hint: "Wrap image in \\begin{figure}[h]...\\end{figure}." },
            { label: "Has \\includegraphics", regex: /\\includegraphics/, hint: "Use \\includegraphics[width=0.8\\textwidth]{image.png}." },
            { label: "Has \\caption{...}", regex: /\\caption\{.+\}/, hint: "Add a descriptive caption for the figure." },
            { label: "Has \\label{fig:...}", regex: /\\label\{fig:.+\}/, hint: "Add \\label{fig:growth} for cross-referencing." }
        ],
        successMessage: "Your figure is properly formatted for journal submission! 📸",
        proTip: "Use [width=\\textwidth] for full-width or [width=0.5\\textwidth] for half-width images.",
        snippets: [
            { label: "graphicx package", code: "\\usepackage{graphicx}", description: "Enables image insertion" },
            { label: "Figure skeleton", code: "\\begin{figure}[h]\n  \\centering\n  \\includegraphics[width=0.8\\textwidth]{image.png}\n  \\caption{Description}\n  \\label{fig:label}\n\\end{figure}", description: "Complete figure template" },
            { label: "Include image", code: "\\includegraphics[width=0.8\\textwidth]{filename}", description: "Inserts an image" },
        ],
        guidedSteps: [
            { instruction: "Add \\usepackage{graphicx} in the preamble.", codeToAdd: "\\usepackage{graphicx}", checkRegex: /\\usepackage\{graphicx\}/ },
            { instruction: "Add \\begin{figure}[h] with \\centering and \\includegraphics[width=0.8\\textwidth]{growth_chart.png}.", codeToAdd: "\\begin{figure}[h]\n  \\centering\n  \\includegraphics[width=0.8\\textwidth]{growth_chart.png}", checkRegex: /\\includegraphics/ },
            { instruction: "Add \\caption{Crop growth pattern over 12 weeks} and \\label{fig:growth}, then close with \\end{figure}.", codeToAdd: "  \\caption{Crop growth pattern over 12 weeks}\n  \\label{fig:growth}\n\\end{figure}", checkRegex: /\\caption\{.+\}/ },
        ]
    },
    // ─── HARVESTER: Advanced Skills ───
    {
        id: "harvest-1",
        title: "Complete Research Article",
        difficulty: "harvester",
        category: "Full Document",
        agriContext: "This is your capstone: a mini research article with all the elements you've learned.",
        objective: "Build a complete 2-page research article with title, abstract, sections, math, table, and citations.",
        instructions: [
            "Include \\title, \\author, \\maketitle.",
            "Add an abstract using \\begin{abstract}.",
            "Create sections: Introduction, Methodology, Results, Conclusion.",
            "Include at least one display equation.",
            "Include at least one table with caption and label.",
            "Add at least one \\cite{} reference."
        ],
        starterCode: `\\documentclass[12pt, a4paper]{article}\n\\usepackage{amsmath}\n\n\\title{Impact of Nitrogen Fertilization on Maize Yield}\n\\author{Your Name \\\\\\\\ Department of Agriculture}\n\\date{March 2026}\n\n\\begin{document}\n\\maketitle\n\n% Add abstract here\n\n% Add sections: Introduction, Methodology, Results, Conclusion\n% Include an equation, a table, and a citation\n\n\\end{document}`,
        checks: [
            { label: "Has \\begin{abstract}", regex: /\\begin\{abstract\}/, hint: "Add \\begin{abstract}...\\end{abstract} after \\maketitle." },
            { label: "Has 4+ sections", regex: /(\\section\*?\{[^}]+\}[\s\S]*?){4,}/, hint: "Create Introduction, Methodology, Results, and Conclusion." },
            { label: "Has display math", regex: /\\\[[\s\S]+?\\\]|\\begin\{equation\}/, hint: "Add a display equation using \\[...\\] or \\begin{equation}." },
            { label: "Has a table", regex: /\\begin\{table\}/, hint: "Include a data table with \\begin{table}." },
            { label: "Has \\caption", regex: /\\caption\{/, hint: "Every table needs a \\caption{} for the title." },
            { label: "Has \\cite{}", regex: /\\cite\{/, hint: "Reference at least one source with \\cite{key}." },
            { label: "Has bibliography", regex: /\\bibliography|\\begin\{thebibliography\}/, hint: "Add \\bibliography{refs} or \\begin{thebibliography} at the end." }
        ],
        successMessage: "You've built a complete research article from scratch! You're ready for journal submission. 🎓🏆",
        proTip: "Download a real journal template (IEEE, Elsevier) and replace the content with your research. The structure is identical.",
        snippets: [
            { label: "Abstract", code: "\\begin{abstract}\nYour abstract text here.\n\\end{abstract}", description: "Paper abstract" },
            { label: "Equation", code: "\\[\n  Y = \\beta_0 + \\beta_1 X + \\epsilon\n\\]", description: "Display equation" },
            { label: "Table", code: "\\begin{table}[h]\n  \\centering\n  \\begin{tabular}{|l|c|r|}\n    \\hline\n    Treatment & Dose & Yield \\\\\n    \\hline\n    Control & 0 & 3.2 \\\\\n    NPK & 120 & 5.8 \\\\\n    \\hline\n  \\end{tabular}\n  \\caption{Results}\n  \\label{tab:results}\n\\end{table}", description: "Data table" },
            { label: "Bibliography", code: "\\begin{thebibliography}{9}\n  \\bibitem{key1} Author, Title, Journal, Year.\n\\end{thebibliography}", description: "Manual bibliography" },
        ],
        guidedSteps: [
            { instruction: "Add \\begin{abstract}...\\end{abstract} after \\maketitle with a brief summary of the study.", codeToAdd: "\\begin{abstract}\nThis study examines the impact of nitrogen fertilization rates on maize yield in tropical conditions.\n\\end{abstract}", checkRegex: /\\begin\{abstract\}/ },
            { instruction: "Add \\section{Introduction} and \\section{Methodology} with content.", codeToAdd: "\\section{Introduction}\nNitrogen is essential for maize growth \\cite{kumar2024}.\n\n\\section{Methodology}\nField trials were conducted during Kharif 2025.", checkRegex: /(\\section\{[^}]+\}[\s\S]*?){2,}/ },
            { instruction: "Add \\section{Results} with a display equation and a table, then \\section{Conclusion}.", codeToAdd: "\\section{Results}\nThe yield model is:\n\\[\n  Y = 2.1 + 0.035N - 0.0001N^2\n\\]", checkRegex: /\\\[[\s\S]+?\\\]/ },
        ]
    },
    {
        id: "harvest-2",
        title: "Modular Thesis Structure",
        difficulty: "harvester",
        category: "Thesis",
        agriContext: "A PhD thesis is 200+ pages. You MUST split it into modules or Word-style chaos awaits.",
        objective: "Design a main.tex that uses \\input or \\include to manage chapters.",
        instructions: [
            "Use \\documentclass{report} (not article) for chapter support.",
            "Add \\tableofcontents after \\maketitle.",
            "Use \\include{} or \\input{} for at least 2 chapter references.",
            "Add \\appendix before appendix content.",
            "Include \\bibliography{references} at the end."
        ],
        starterCode: `\\documentclass{report}\n\\usepackage{graphicx}\n\n\\title{Impact of Climate Variability on Crop Production in Semi-Arid Regions}\n\\author{PhD Scholar \\\\\\\\ Department of Agricultural Sciences}\n\\date{2026}\n\n\\begin{document}\n\\maketitle\n\n% Add table of contents here\n\n% Include chapter files here (e.g., \\include{chapters/introduction})\n\n% Add appendix marker and bibliography\n\n\\end{document}`,
        checks: [
            { label: "Uses report class", regex: /\\documentclass.*\{report\}/, hint: "Theses use \\documentclass{report} for chapter support." },
            { label: "Has \\tableofcontents", regex: /\\tableofcontents/, hint: "Add \\tableofcontents after \\maketitle." },
            { label: "Has \\include or \\input", regex: /\\include\{|\\input\{/, hint: "Use \\include{chapters/intro} to load chapter files." },
            { label: "Has 2+ chapter refs", regex: /(\\include\{[^}]+\}|\\input\{[^}]+\}|\\chapter\{[^}]+\})[\s\S]*(\\include\{[^}]+\}|\\input\{[^}]+\}|\\chapter\{[^}]+\})/, hint: "Reference at least 2 chapters." },
            { label: "Has \\appendix", regex: /\\appendix/, hint: "Add \\appendix before your appendix content." },
            { label: "Has \\bibliography", regex: /\\bibliography\{/, hint: "End with \\bibliography{references}." }
        ],
        successMessage: "You've designed a professional thesis structure! No more 'Not Responding' on 300-page Word files. 🏛️",
        proTip: "Use \\includeonly{chapters/results} during drafting to compile only one chapter — saves massive time.",
        snippets: [
            { label: "Table of contents", code: "\\tableofcontents", description: "Auto-generated TOC" },
            { label: "Include chapter", code: "\\include{chapters/introduction}", description: "Loads a chapter file" },
            { label: "Input file", code: "\\input{sections/abstract}", description: "Inserts file content" },
            { label: "Appendix marker", code: "\\appendix", description: "Marks start of appendices" },
            { label: "Chapter", code: "\\chapter{Chapter Title}", description: "Top-level heading (report)" },
        ],
        guidedSteps: [
            { instruction: "Add \\tableofcontents after \\maketitle.", codeToAdd: "\\tableofcontents", checkRegex: /\\tableofcontents/ },
            { instruction: "Add \\include{chapters/introduction} and \\include{chapters/literature_review} to load chapter files.", codeToAdd: "\\include{chapters/introduction}\n\\include{chapters/literature_review}\n\\include{chapters/methodology}\n\\include{chapters/results}", checkRegex: /(\\include\{[^}]+\}|\\input\{[^}]+\})[\s\S]*(\\include\{[^}]+\}|\\input\{[^}]+\})/ },
            { instruction: "Add \\appendix followed by \\include{chapters/appendix_a}, then \\bibliographystyle{plain} and \\bibliography{references}.", codeToAdd: "\\appendix\n\\include{chapters/appendix_a}\n\n\\bibliographystyle{plain}\n\\bibliography{references}", checkRegex: /\\appendix/ },
        ]
    },
    {
        id: "harvest-3",
        title: "Advanced Math & Alignment",
        difficulty: "harvester",
        category: "Mathematics",
        agriContext: "Multi-step derivations for regression models, ANOVA tables, and growth curves.",
        objective: "Write a multi-line aligned equation using the align environment.",
        instructions: [
            "Load the amsmath package with \\usepackage{amsmath}.",
            "Use \\begin{align*} for a multi-line equation.",
            "Align at the = sign using & before each =.",
            "Use \\\\\\\\ to break lines.",
            "Include \\frac, \\sqrt, or \\sum in your equations."
        ],
        starterCode: `\\documentclass{article}\n\\usepackage{amsmath}\n\n\\begin{document}\n\n\\section{Yield Regression Model}\n\nThe total yield $Y$ is derived as follows:\n\n% Write a multi-line aligned equation here\n% Example structure:\n% \\begin{align*}\n%   Y &= ... \\\\\n%     &= ... \\\\\n%     &= ...\n% \\end{align*}\n\n\\end{document}`,
        checks: [
            { label: "Has \\usepackage{amsmath}", regex: /\\usepackage\{amsmath\}/, hint: "Load amsmath in the preamble for align environments." },
            { label: "Has \\begin{align", regex: /\\begin\{align/, hint: "Use \\begin{align*} or \\begin{align} for multi-line math." },
            { label: "Has & alignment", regex: /&\s*=/, hint: "Place & before each = sign to align them vertically." },
            { label: "Has line breaks \\\\", regex: /\\\\/, hint: "End each line (except the last) with \\\\ to break." },
            { label: "Uses \\frac, \\sqrt, or \\sum", regex: /\\frac\{|\\sqrt\{|\\sum/, hint: "Include at least one advanced math command." }
        ],
        successMessage: "Your multi-line equations are perfectly aligned! Reviewers will appreciate the clarity. 🧮",
        proTip: "Use align (without *) to get equation numbers. Reference them with \\label{eq:yield} and \\eqref{eq:yield}.",
        snippets: [
            { label: "Align block", code: "\\begin{align*}\n  Y &= \\beta_0 + \\beta_1 X \\\\\n    &= 2.5 + 0.8X\n\\end{align*}", description: "Multi-line aligned equations" },
            { label: "Fraction", code: "\\frac{a}{b}", description: "Fraction a/b" },
            { label: "Square root", code: "\\sqrt{x^2 + y^2}", description: "Square root expression" },
            { label: "Summation", code: "\\sum_{i=1}^{n} x_i", description: "Sum notation" },
            { label: "Greek letters", code: "\\alpha, \\beta, \\gamma, \\sigma, \\mu", description: "Common Greek letters" },
        ],
        guidedSteps: [
            { instruction: "Start with \\begin{align*} to open a multi-line equation block.", codeToAdd: "\\begin{align*}", checkRegex: /\\begin\{align/ },
            { instruction: "Write the first line: Y &= \\sum_{i=1}^{n} \\beta_i X_i + \\epsilon \\\\ and a second line with &= \\beta_0 + \\frac{\\beta_1}{\\sqrt{n}} X", codeToAdd: "  Y &= \\sum_{i=1}^{n} \\beta_i X_i + \\epsilon \\\\\n    &= \\beta_0 + \\frac{\\beta_1}{\\sqrt{n}} X", checkRegex: /&\s*=/ },
            { instruction: "Close with \\end{align*}.", codeToAdd: "\\end{align*}", checkRegex: /\\frac\{|\\sqrt\{|\\sum/ },
        ]
    },
    {
        id: "harvest-4",
        title: "Cross-References & Hyperlinks",
        difficulty: "harvester",
        category: "Advanced",
        agriContext: "A 50-page thesis needs clickable cross-references — 'See Table 3' should jump to Table 3.",
        objective: "Use labels, refs, and the hyperref package for clickable cross-references.",
        instructions: [
            "Add \\usepackage{hyperref} in the preamble.",
            "Create a table with \\label{tab:...}.",
            "Reference it with \\ref{tab:...} in text.",
            "Add a URL using \\url{...} or \\href{...}{...}."
        ],
        starterCode: `\\documentclass{article}\n\n% Add hyperref package here\n\n\\begin{document}\n\n\\section{Results}\n\nThe irrigation data is shown in Table ??? (add a reference here).\n\n% Add a table with \\label{tab:irrigation}\n\nFor more data, visit the ICAR website: % add URL here\n\n\\end{document}`,
        checks: [
            { label: "Has \\usepackage{hyperref}", regex: /\\usepackage\{hyperref\}/, hint: "Add \\usepackage{hyperref} for clickable links." },
            { label: "Has \\label{tab:...}", regex: /\\label\{tab:.+\}/, hint: "Add \\label{tab:irrigation} inside your table." },
            { label: "Has \\ref{tab:...}", regex: /\\ref\{tab:.+\}/, hint: "Use \\ref{tab:irrigation} to reference the table." },
            { label: "Has \\url or \\href", regex: /\\url\{|\\href\{/, hint: "Use \\url{https://icar.org.in} or \\href{url}{text}." }
        ],
        successMessage: "Your document now has clickable cross-references and hyperlinks! 🔗",
        proTip: "Always load hyperref as the LAST package to avoid conflicts. Use \\hypersetup{colorlinks=true} for colored links.",
        snippets: [
            { label: "hyperref package", code: "\\usepackage{hyperref}", description: "Enables clickable links" },
            { label: "Reference", code: "\\ref{tab:label}", description: "Cross-reference" },
            { label: "URL", code: "\\url{https://example.com}", description: "Clickable URL" },
            { label: "Hyperlink", code: "\\href{https://example.com}{Click here}", description: "Named hyperlink" },
            { label: "Hypersetup", code: "\\hypersetup{colorlinks=true, linkcolor=blue, urlcolor=cyan}", description: "Link styling" },
        ],
        guidedSteps: [
            { instruction: "Add \\usepackage{hyperref} in the preamble.", codeToAdd: "\\usepackage{hyperref}", checkRegex: /\\usepackage\{hyperref\}/ },
            { instruction: "Replace '???' with \\ref{tab:irrigation} and add a table with \\label{tab:irrigation}.", codeToAdd: "\\ref{tab:irrigation}", checkRegex: /\\ref\{tab:.+\}/ },
            { instruction: "Add \\url{https://icar.org.in} after 'ICAR website:'.", codeToAdd: "\\url{https://icar.org.in}", checkRegex: /\\url\{|\\href\{/ },
        ]
    },
];
