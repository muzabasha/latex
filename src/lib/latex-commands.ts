
export const LATEX_COMMAND_DATA = {
    "session-1-intro": [
        {
            name: "\\documentclass",
            syntax: "\\documentclass{article}",
            description: "Defines the type of document you are creating.",
            options: [
                { name: "[11pt]", description: "Sets font size to 11 points.", impact: "[11pt]" },
                { name: "[12pt]", description: "Sets font size to 12 points.", impact: "[12pt]" },
                { name: "[twocolumn]", description: "Splits the page into two columns.", impact: "[twocolumn]" },
                { name: "[a4paper]", description: "Sets paper size to A4 standard.", impact: "[a4paper]" },
                { name: "[landscape]", description: "Changes page orientation to landscape.", impact: "[landscape]" }
            ],
            example: "The blueprint of your paper.",
            preview: "Hello Agriculture Scholars!"
        },
        {
            name: "\\usepackage",
            syntax: "\\usepackage{graphicx}",
            description: "Imports external libraries (plugins) for extra features.",
            options: [
                { name: "{amsmath}", description: "For complex mathematical equations.", impact: "{amsmath}" },
                { name: "{biblatex}", description: "For advanced reference management.", impact: "{biblatex}" },
                { name: "{hyperref}", description: "Adds clickable links to your PDF.", impact: "{hyperref}" },
                { name: "{geometry}", description: "Allows manual margin adjustments.", impact: "{geometry}" }
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
            options: [
                { name: "\\title{...}", description: "Sets the paper title.", impact: "\\title" },
                { name: "\\author{...}", description: "Sets the author name.", impact: "\\author" },
                { name: "\\date{...}", description: "Sets the publication date.", impact: "\\date" }
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
            options: [
                { name: "\\section*{...}", description: "Creates heading without a number.", impact: "*" },
                { name: "\\subsection{...}", description: "Creates a secondary heading.", impact: "sub" },
                { name: "\\subsubsection{...}", description: "Creates a tertiary heading.", impact: "subsub" }
            ],
            example: "The spine of your manuscript.",
            preview: "1. Background of Study"
        },
        {
            name: "\\textbf",
            syntax: "\\textbf{Bold Text}",
            description: "Applies bold formatting to the text.",
            options: [
                { name: "\\textit{...}", description: "Applies italic formatting.", impact: "it" },
                { name: "\\underline{...}", description: "Underlines the text.", impact: "underline" },
                { name: "\\texttt{...}", description: "Monospaced (Typewriter) font.", impact: "tt" }
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
            options: [
                { name: "\\begin{equation*}", description: "Removes equation numbering.", impact: "*" },
                { name: "$...$", description: "Inline math (within text).", impact: "$" },
                { name: "\\frac{a}{b}", description: "Creates a fraction.", impact: "frac" },
                { name: "\\sqrt{x}", description: "Creates a square root.", impact: "sqrt" }
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
            options: [
                { name: "\\citep{...}", description: "Parenthetical citation (Name, Year).", impact: "p" },
                { name: "\\citet{...}", description: "Textual citation Name (Year).", impact: "t" },
                { name: "\\nocite{*}", description: "Includes all references from .bib.", impact: "no" }
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
            options: [
                { name: "[h]", description: "Place approximately here.", impact: "[h]" },
                { name: "[t]", description: "Place at the top of the page.", impact: "[t]" },
                { name: "[b]", description: "Place at the bottom of the page.", impact: "[b]" },
                { name: "[p]", description: "Place on a separate page of floats.", impact: "[p]" }
            ],
            example: "Structured data presentation.",
            preview: "Table 1: Soil Compaction Data"
        },
        {
            name: "\\includegraphics",
            syntax: "\\includegraphics[width=0.5\\textwidth]{graph.png}",
            description: "Imports an image file into the document.",
            options: [
                { name: "[scale=2]", description: "Scales the image size.", impact: "scale" },
                { name: "[angle=45]", description: "Rotates the image.", impact: "angle" },
                { name: "[height=3cm]", description: "Sets specific height.", impact: "height" }
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
            options: [
                { name: "\\include{...}", description: "Higher-level file inclusion (starts new page).", impact: "include" },
                { name: "\\tableofcontents", description: "Auto-generates table of contents.", impact: "toc" },
                { name: "\\appendix", description: "Starts the appendix section.", impact: "app" }
            ],
            example: "Managing large documents easily.",
            preview: "Chapter 1: Introduction (Inserted)"
        }
    ]
};
