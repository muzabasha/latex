export interface Question {
    id: number;
    q: string;
    options: string[];
    ans: number;
    explanation: string;
}

export const SESSION_QUIZZES: Record<string, Question[]> = {
    "session-0-intro": [
        {
            id: 1,
            q: "What is the primary objective of this workshop?",
            options: ["To teach MS Word advanced features", "To transform researchers into LaTeX experts for professional publishing", "To learn how to draw agriculture diagrams", "To play computer games"],
            ans: 1,
            explanation: "The workshop is designed to bridge the gap between basic typing and professional academic typesetting."
        },
        {
            id: 2,
            q: "Why is LaTeX considered a 'Mindset Shift'?",
            options: ["It requires a new computer", "It moves from visual 'painting' to logical 'engineering'", "It's only for mathematicians", "It's a new brand of ink"],
            ans: 1,
            explanation: "In LaTeX, you describe the structure of the document, and the computer handles the visual rendering."
        },
        {
            id: 3,
            q: "Which 'Psychology Question' assesses your tolerance for formatting errors?",
            options: ["How do you feel when an image moves automatically in Word?", "Do you like coffee?", "What is your favorite color?", "How fast can you type?"],
            ans: 0,
            explanation: "Assessing frustration with Word's unpredictability is the first step toward appreciating LaTeX's stability."
        },
        {
            id: 4,
            q: "The 'Pre-Lab Mental Health Check' is meant to:",
            options: ["Give you a medical degree", "Identify if you're ready for the cognitive load of learning code", "Make you sleep better", "Teach you biology"],
            ans: 1,
            explanation: "Learning a new language like LaTeX requires focus and a calm, logical approach."
        },
        {
            id: 5,
            q: "What does 'WYSIWYG' (Word/Google Docs) stand for?",
            options: ["What You See Is What You Get", "What You Send Is What You Get", "What You See Is Weekly Good", "Working Yields Systematic Instant Gains"],
            ans: 0,
            explanation: "WYSIWYG tools show the final result immediately as you type, but often lack structural precision."
        },
        {
            id: 6,
            q: "In LaTeX, the output is generated after:",
            options: ["Screaming at the screen", "Compilation", "Clicking 'Save'", "Restarting the PC"],
            ans: 1,
            explanation: "The compiler reads your code and 'bakes' it into a final PDF document."
        },
        {
            id: 7,
            q: "Why is 'Session 0' called the 'Mindset Phase'?",
            options: ["Because there's no code yet", "To prepare your brain for the shift from visual to logical document design", "Because it's short", "It's a marketing term"],
            ans: 1,
            explanation: "Preparing the mind is half the battle in learning any technical typesetting system."
        },
        {
            id: 8,
            q: "Professional researchers value LaTeX for its:",
            options: ["Vibrant colors", "Consistency and automated management of citations/equations", "Ease of drawing with a mouse", "Spell check speed"],
            ans: 1,
            explanation: "LaTeX ensures that formatting remains identical across hundreds of pages and thousands of revisions."
        },
        {
            id: 9,
            q: "The 'Agriculture Connection' in this workshop means:",
            options: ["We will farm during the break", "Examples and templates are tailored for agricultural sciences", "The computers are made of wood", "It's only for farmers"],
            ans: 1,
            explanation: "Contextual learning using relevant field examples (like soil data tables) makes the tool more useful."
        },
        {
            id: 10,
            q: "Is LaTeX a programming language?",
            options: ["Yes, exactly like Java", "It is a Markup Language with programmable macros", "No, it's an image", "It's a secret code"],
            ans: 1,
            explanation: "LaTeX uses commands (tags) to mark up text, similar to HTML but more powerful for math and logic."
        },
        {
            id: 11,
            q: "Which icon represents 'Mindset' in the UI?",
            options: ["Rocket", "Brain", "Trophy", "Trash"],
            ans: 1,
            explanation: "The Brain icon symbolizes the cognitive preparation required for LaTeX."
        },
        {
            id: 12,
            q: "What is 'Structural Reliability'?",
            options: ["A strong building", "Knowing that your formatting won't break when you add a new page", "Having a fast internet", "Using a backup drive"],
            ans: 1,
            explanation: "In LaTeX, the rules are mathematical, so the structure is unshakeable."
        },
        {
            id: 13,
            q: "The 'Zero Index' in computer science (Session 0) means:",
            options: ["The end", "The beginning or the foundation", "Zero value", "Errors"],
            ans: 1,
            explanation: "Naming the first session 'Session 0' is a nod to programming traditions where counting starts at zero."
        },
        {
            id: 14,
            q: "A PDF is usually the ___ of a LaTeX project.",
            options: ["Source", "Final Product", "Input", "Editor"],
            ans: 1,
            explanation: "The .tex file is the source; the .pdf is the professional output shared with the world."
        },
        {
            id: 15,
            q: "Who should use LaTeX?",
            options: ["Everyone who wants professional, distraction-free document control", "Only computer scientists", "Only math teachers", "Only people with high-end PCs"],
            ans: 0,
            explanation: "Anyone writing complex reports, theses, or research papers will benefit from LaTeX."
        }
    ],
    "session-1-intro": [
        {
            id: 1,
            q: "What does LaTeX stand for in the context of academic publishing?",
            options: ["Late Academic Text", "Lamport TeX", "Layout Technical Text", "Logical Text"],
            ans: 1,
            explanation: "LaTeX stands for Lamport TeX, named after Leslie Lamport who developed the initial set of macros on top of Donald Knuth's TeX engine."
        },
        {
            id: 2,
            q: "Which philosophy best describes LaTeX?",
            options: ["What You See Is What You Get (WYSIWYG)", "What You Mean Is What You Get (WYMIWYG)", "Paint as You Go", "Direct Visual Manipulation"],
            ans: 1,
            explanation: "LaTeX focuses on the logical structure (What You Mean) rather than the immediate visual output, which is handled by the compiler."
        },
        {
            id: 3,
            q: "In the 'Cooking Analogy', what represents the 'Oven'?",
            options: ["The Text Editor", "The .tex File", "The Compiler", "The PDF Viewer"],
            ans: 2,
            explanation: "The compiler (like PdfLaTeX) acts as the oven, taking the raw ingredients (code) and baking them into the final dish (PDF)."
        },
        {
            id: 4,
            q: "Who is the original creator of the TeX system?",
            options: ["Leslie Lamport", "Donald Knuth", "Bill Gates", "Linus Torvalds"],
            ans: 1,
            explanation: "Donald Knuth created TeX in 1978 to provide a high-quality typesetting system for mathematical and technical documents."
        },
        {
            id: 5,
            q: "What is the primary benefit of using LaTeX for long research papers?",
            options: ["Easier image dragging", "Consistent formatting and automated cross-referencing", "Faster typing speed", "Better spell check than Word"],
            ans: 1,
            explanation: "LaTeX ensures professional consistency throughout the document and automates complex tasks like numbering and citations."
        },
        {
            id: 6,
            q: "Which character is used to start a comment in LaTeX code?",
            options: ["#", "//", "%", "--"],
            ans: 2,
            explanation: "Anything typed after a '%' on a line is ignored by the LaTeX compiler, which is useful for internal notes."
        },
        {
            id: 7,
            q: "Why do scientists prefer LaTeX for mathematics?",
            options: ["It looks fancy", "It uses high-precision vector fonts and logical syntax", "It's faster than writing by hand", "It corrects math errors automatically"],
            ans: 1,
            explanation: "LaTeX uses specialized fonts (like Computer Modern) and a syntax designed specifically for complex mathematical notations."
        },
        {
            id: 8,
            q: "What file extension does a LaTeX source file typically have?",
            options: [".pdf", ".docx", ".tex", ".txt"],
            ans: 2,
            explanation: ".tex is the standard extension for LaTeX source files containing your text and commands."
        },
        {
            id: 9,
            q: "What happens during the 'Compilation' process?",
            options: ["The computer checks for spelling", "The .tex file is converted into a .pdf", "The file is uploaded to the cloud", "The images are compressed"],
            ans: 1,
            explanation: "Compilation is the process where the TeX engine reads the commands and content to generate the final formatted PDF document."
        },
        {
            id: 10,
            q: "Which of the following is NOT a standard LaTeX document class?",
            options: ["article", "report", "book", "spreadsheet"],
            ans: 3,
            explanation: "Standard classes include article, report, book, and slides. Spreadsheet is not a document class in LaTeX."
        },
        {
            id: 11,
            q: "LaTeX separation of content and style means:",
            options: ["You write text and formatting in separate apps", "The author focuses on content, LaTeX handles the layout", "Style is only added at the very end", "Content is hidden from the compiler"],
            ans: 1,
            explanation: "This separation allows researchers to focus on their ideas while LaTeX ensures the document meets professional standards."
        },
        {
            id: 12,
            q: "What is the 'Preamble' in a LaTeX document?",
            options: ["The last section of the paper", "The area before \\begin{document} where packages are loaded", "The introduction paragraph", "The table of contents"],
            ans: 1,
            explanation: "The preamble is used to define document settings, load packages, and set global styles before the actual content starts."
        },
        {
            id: 13,
            q: "Internal cross-referencing in LaTeX is handled by:",
            options: ["Manual numbering", "Automatic counters and the \\label/\\ref system", "Searching through the PDF", "Using a calculator"],
            ans: 1,
            explanation: "LaTeX uses labels and references to automatically update numbers for sections, figures, and equations even if you move them."
        },
        {
            id: 14,
            q: "Most high-impact journals provide LaTeX templates because:",
            options: ["They want to test your coding skills", "It ensures all submissions follow a single, strict visual standard", "It's more expensive to use Word", "They don't have Word installed"],
            ans: 1,
            explanation: "Templates allow journals to maintain a uniform and professional appearance across all published articles."
        },
        {
            id: 15,
            q: "Is LaTeX free to use?",
            options: ["Yes, it is open-source and free", "No, it requires a monthly subscription", "It's free for students but paid for others", "You have to pay per PDF generated"],
            ans: 0,
            explanation: "LaTeX and its distributions (like MiKTeX and TeX Live) are free and open-source software."
        }
    ],
    "session-1-install": [
        {
            id: 1,
            q: "Which of these is a popular LaTeX distribution for Windows?",
            options: ["MacTeX", "MiKTeX", "TexLive", "WindowsTeX"],
            ans: 1,
            explanation: "MiKTeX is widely used on Windows for its easy package management and lightweight initial install."
        },
        {
            id: 2,
            q: "What is the role of an 'Editor' like TeXstudio?",
            options: ["To compile the PDF", "To provide a user-friendly interface for writing code", "To store the bibliography", "To install drivers"],
            ans: 1,
            explanation: "The editor is the software where you type your code; it provides features like syntax highlighting and autocompletion."
        },
        {
            id: 3,
            q: "What does 'on-the-fly' package installation mean in MiKTeX?",
            options: ["It installs packages while you are flying in a plane", "It automatically downloads missing packages during compilation", "It installs everything at once", "It deletes unused packages"],
            ans: 1,
            explanation: "This feature saves space by only downloading the packages your document actually needs when it needs them."
        },
        {
            id: 4,
            q: "Which keyboard shortcut in TeXstudio is commonly used to 'Compile and View'?",
            options: ["F1", "F5", "F12", "Ctrl + S"],
            ans: 1,
            explanation: "F5 is the default shortcut in TeXstudio to run the compiler and open the PDF preview."
        },
        {
            id: 5,
            q: "For macOS users, which distribution is recommended?",
            options: ["MiKTeX", "MacTeX", "AppleTeX", "iTeX"],
            ans: 1,
            explanation: "MacTeX is the standard, comprehensive distribution specifically packaged for macOS."
        },
        {
            id: 6,
            q: "What happens if you try to compile without a distribution installed?",
            options: ["The computer crashes", "The editor will report 'Command not found' or a similar error", "It will work but look bad", "It will open Word instead"],
            ans: 1,
            explanation: "The editor needs the distribution (the engine) to process the code; without it, it's like a cockpit without an airplane."
        },
        {
            id: 7,
            q: "In Linux, which command is often used to install the full TeX Live distribution?",
            options: ["apt install latex-full", "apt install texlive-full", "install mactex", "yum get tex"],
            ans: 1,
            explanation: "texlive-full is the package name in many Debian-based Linux distros for the complete LaTeX environment."
        },
        {
            id: 8,
            q: "Why should you allow MiKTeX to add itself to the 'PATH'?",
            options: ["To save disk space", "So the editor can find the compiler from anywhere in the system", "To speed up the internet", "To hide the files"],
            ans: 1,
            explanation: "Adding to PATH allows software to execute the compiler commands without needing to know their exact folder location."
        },
        {
            id: 9,
            q: "What is 'Administrator Mode' in the MiKTeX Console used for?",
            options: ["To play games", "To install packages for all users on the system", "To change the wallpaper", "To see hidden files"],
            ans: 1,
            explanation: "Admin mode is required when you want to update or install packages that are shared across the entire computer."
        },
        {
            id: 10,
            q: "How large is a 'comprehensive' LaTeX distribution like MacTeX?",
            options: ["50 MB", "200 MB", "Over 4 GB", "50 GB"],
            ans: 2,
            explanation: "Full distributions include every possible package and font, making them quite large (several gigabytes)."
        },
        {
            id: 11,
            q: "Which of these is NOT a LaTeX editor?",
            options: ["TeXstudio", "Overleaf", "Notepad", "Photoshop"],
            ans: 3,
            explanation: "While you can write code in Notepad, Photoshop is an image editor and cannot handle LaTeX compilation."
        },
        {
            id: 12,
            q: "The internal PDF viewer in TeXstudio is useful because:",
            options: ["It lets you watch movies", "It shows the changes immediately after compilation", "It edits the PDF directly", "It's faster than Chrome"],
            ans: 1,
            explanation: "Integrated viewers allow for seamless workflow where you see the output right next to your code."
        },
        {
            id: 13,
            q: "What is the purpose of checking for 'Updates' in MiKTeX Console?",
            options: ["To change the language", "To get the latest bug fixes and new package versions", "To renew your subscription", "To download more templates"],
            ans: 1,
            explanation: "Regular updates ensure your system environment remains stable and compatible with latest journal templates."
        },
        {
            id: 14,
            q: "If MiKTeX asks to install a package, you should:",
            options: ["Cancel it", "Check 'Always install' and click OK", "Format your PC", "Uninstall MiKTeX"],
            ans: 1,
            explanation: "Missing packages are normal; letting LaTeX install them automatically is the most efficient way to work."
        },
        {
            id: 15,
            q: "What is the benefit of an offline installation over an online editor like Overleaf?",
            options: ["It's harder to use", "You can work without an internet connection and have more control", "It uses more electricity", "It's only for pros"],
            ans: 1,
            explanation: "Offline installations offer speed, privacy, and the ability to work anywhere without relying on server availability."
        }
    ],
    "session-1-first-doc": [
        {
            id: 1,
            q: "Which command must be the very first line of any LaTeX document?",
            options: ["\\begin{document}", "\\title{...}", "\\documentclass{...}", "\\usepackage{...}"],
            ans: 2,
            explanation: "\\documentclass defines the template and global layout rules for the entire file."
        },
        {
            id: 2,
            q: "Where does the visible content of your document go?",
            options: ["In the preamble", "Between \\begin{document} and \\end{document}", "Before \\documentclass", "In a separate .txt file"],
            ans: 1,
            explanation: "All text inside the document environment is processed as the body of your paper."
        },
        {
            id: 3,
            q: "What is the mandatory argument for the \\documentclass command?",
            options: ["[12pt]", "{journal}", "{article}", "(book)"],
            ans: 2,
            explanation: "{article} is the most common class for research papers and short documents."
        },
        {
            id: 4,
            q: "How do you define the author of the document?",
            options: ["\\writer{...}", "\\author{...}", "\\by{...}", "\\person{...}"],
            ans: 1,
            explanation: "\\author{Name} stores the author's name to be used by the \\maketitle command."
        },
        {
            id: 5,
            q: "Which command actually prints the title, author, and date onto the PDF?",
            options: ["\\printtitle", "\\maketitle", "\\showheader", "\\begin{title}"],
            ans: 1,
            explanation: "\\maketitle uses the metadata you provided earlier to generate a formatted title block."
        },
        {
            id: 6,
            q: "To add a new paragraph in LaTeX, you should:",
            options: ["Use a single Enter key", "Leave a completely blank line", "Use the command \\paragraph", "Type [alt+p]"],
            ans: 1,
            explanation: "LaTeX interprets a blank line as the start of a new paragraph, handling the indentation automatically."
        },
        {
            id: 7,
            q: "What are the curly braces {} used for in commands?",
            options: ["Optional settings", "Mandatory arguments", "Comments", "Math symbols"],
            ans: 1,
            explanation: "Curly braces contain necessary information that the command needs to function correctly."
        },
        {
            id: 8,
            q: "What are the square brackets [] used for in commands?",
            options: ["Mandatory arguments", "Optional settings (like font size)", "Equation labels", "Footnotes"],
            ans: 1,
            explanation: "Square brackets allow you to customize a command, like [11pt] sets the base font size."
        },
        {
            id: 9,
            q: "Which command is used to load external functionality (like math or images)?",
            options: ["\\loadpackage", "\\usepackage", "\\import", "\\include"],
            ans: 1,
            explanation: "\\usepackage acts like an 'import' statement, adding new powers to your LaTeX engine."
        },
        {
            id: 10,
            q: "What happens if you forget to include \\end{document}?",
            options: ["It still works fine", "The compilation will fail with an error", "The document doubles in size", "It only prints the first page"],
            ans: 1,
            explanation: "LaTeX needs a clear signal that the document is finished to finalize the PDF file structure."
        },
        {
            id: 11,
            q: "How do you prevent a date from appearing in the title block?",
            options: ["Delete the computer's clock", "\\date{}", "\\nodate", "Ignore it"],
            ans: 1,
            explanation: "Passing an empty argument to \\date{} tells LaTeX not to display a date in the title."
        },
        {
            id: 12,
            q: "Which character is NOT allowed directly in normal text without a backslash?",
            options: ["$", "A", "7", "."],
            ans: 0,
            explanation: "Special characters like $ or % have functional meanings and must be escaped (e.g., \\$) to appear as text."
        },
        {
            id: 13,
            q: "What is 'White Space' in LaTeX logic?",
            options: ["Empty space on the page", "Multiple spaces treated as a single space", "Invisible characters", "The background of the PDF"],
            ans: 1,
            explanation: "LaTeX ignores multiple spaces, giving you the freedom to indent your code for readability without affecting the output."
        },
        {
            id: 14,
            q: "The area between \\documentclass and \\begin{document} is called:",
            options: ["The Intro", "The Preamble", "The Appendices", "The Source"],
            ans: 1,
            explanation: "The preamble is where you set the 'DNA' of your document before any text is written."
        },
        {
            id: 15,
            q: "Why is the first document often called 'Hello World'?",
            options: ["It's a greeting to the printer", "It's a programming tradition for the simplest possible program", "It's required by law", "It was invented by NASA"],
            ans: 1,
            explanation: "It symbolizes your successful entry into a new technical world by creating the simplest valid output."
        }
    ],
    "session-1-formatting": [
        {
            id: 1,
            q: "Which command creates a top-level heading in an 'article' class?",
            options: ["\\part", "\\chapter", "\\section", "\\heading"],
            ans: 2,
            explanation: "\\section is the primary organizational unit for articles."
        },
        {
            id: 2,
            q: "How do you create a bulleted list?",
            options: ["\\begin{bullets}", "\\begin{itemize}", "\\begin{list}", "\\begin{enumerate}"],
            ans: 1,
            explanation: "'itemize' is the environment used for unordered/bulleted lists."
        },
        {
            id: 3,
            q: "What is the difference between \\section and \\section*?",
            options: ["\\section* is larger", "\\section* removes numbering and TOC entry", "\\section* is in bold", "\\section* is for images"],
            ans: 1,
            explanation: "Starred versions of sectioning commands remove automatic numbering, perfect for Abstracts or Acknowledgements."
        },
        {
            id: 4,
            q: "Which command produces an ordered (numbered) list?",
            options: ["\\begin{itemize}", "\\begin{enumerate}", "\\begin{numbers}", "\\begin{order}"],
            ans: 1,
            explanation: "'enumerate' automatically handles the numbering (1, 2, 3...) of your list items."
        },
        {
            id: 5,
            q: "How do you make text bold in LaTeX?",
            options: ["\\textb", "\\bold{...}", "\\textbf{...}", "<b>...</b>"],
            ans: 2,
            explanation: "\\textbf stands for 'text bold face'."
        },
        {
            id: 6,
            q: "What does \\textit{...} do to your text?",
            options: ["Makes it smaller", "Adds an underline", "Makes it italic", "Changes the color"],
            ans: 2,
            explanation: "\\textit stands for 'text italic'."
        },
        {
            id: 7,
            q: "To create a sub-section inside a section, you use:",
            options: ["\\sub{...}", "\\subsection{...}", "\\section2{...}", "\\part{...}"],
            ans: 1,
            explanation: "LaTeX provides hierarchical levels: \\section, \\subsection, \\subsubsection."
        },
        {
            id: 8,
            q: "Which list item command is used inside both 'itemize' and 'enumerate'?",
            options: ["\\bullet", "\\point", "\\item", "\\next"],
            ans: 2,
            explanation: "\\item is the universal indicator for a new entry in any list environment."
        },
        {
            id: 9,
            q: "How many levels deep can you nest lists by default in LaTeX?",
            options: ["2", "4", "Unlimited", "10"],
            ans: 1,
            explanation: "LaTeX supports nesting up to 4 levels deep, automatically changing the bullet/number style for each level."
        },
        {
            id: 10,
            q: "Semantic emphasis (often italicized) is achieved using:",
            options: ["\\textbf", "\\textit", "\\emph", "\\style"],
            ans: 2,
            explanation: "\\emph is smart; it italicizes normal text but 'un-italicizes' text that is already inside an italic block."
        },
        {
            id: 11,
            q: "Which command is used to underline text?",
            options: ["\\bottomline{...}", "\\underline{...}", "\\lowline{...}", "\\uline{...}"],
            ans: 1,
            explanation: "While not recommended for professional typography, \\underline adds a line beneath the text."
        },
        {
            id: 12,
            q: "In the 'report' or 'book' class, what is the level above \\section?",
            options: ["\\part", "\\chapter", "\\unit", "\\volume"],
            ans: 1,
            explanation: "Chapters are the main building blocks of large documents like theses or books."
        },
        {
            id: 13,
            q: "How do you add a line break without starting a new paragraph?",
            options: ["Enter key", "////", "\\\\", "\\break"],
            ans: 2,
            explanation: "The double backslash forces a new line immediately without the indentation of a new paragraph."
        },
        {
            id: 14,
            q: "The command \\large changes:",
            options: ["The line thickness", "The font size", "The page margins", "The image scale"],
            ans: 1,
            explanation: "LaTeX has built-in font size commands ranging from \\tiny to \\Huge."
        },
        {
            id: 15,
            q: "To limit the scope of a font change (like \\large) to just a few words, you should:",
            options: ["Restart the computer", "Wrap it in curly braces {\\large text}", "Use a semicolon", "Type faster"],
            ans: 1,
            explanation: "Braces create a 'local scope' so that the settings only apply to what is inside them."
        }
    ],
    "session-1-math": [
        {
            id: 1,
            q: "Which environment is commonly used for large, centered equations?",
            options: ["\\begin{math}", "\\begin{equation}", "\\begin{tabular}", "\\begin{center}"],
            ans: 1,
            explanation: "The equation environment centers the formula and automatically provides an equation number."
        },
        {
            id: 2,
            q: "How do you start an inline math expression (inside a sentence)?",
            options: ["Using $$", "Using $", "Using \\begin{math}", "Using both B and C"],
            ans: 3,
            explanation: "Both the dollar sign ($) and the math environment are used for inline mathematical notation."
        },
        {
            id: 3,
            q: "To write a fraction (like 1/2), you use:",
            options: ["\\frac{1}{2}", "\\f{1}{2}", "\\divide{1}{2}", "1\\over2"],
            ans: 0,
            explanation: "\\frac takes two arguments: the numerator and the denominator."
        },
        {
            id: 4,
            q: "Which character is used to create a subscript (like x₂)?",
            options: ["^", "_", "*", "&"],
            ans: 1,
            explanation: "The underscore (_) is the standard LaTeX command for subscripts."
        },
        {
            id: 5,
            q: "Which character is used to create a superscript (like x²)?",
            options: ["^", "_", "~", "@"],
            ans: 0,
            explanation: "The caret (^) is used for powers and superscripts."
        },
        {
            id: 6,
            q: "What package is essential for advanced mathematical symbols and environments?",
            options: ["graphicx", "amsmath", "hyperref", "geometry"],
            ans: 1,
            explanation: "amsmath, provided by the American Mathematical Society, is the industry standard for academic math."
        },
        {
            id: 7,
            q: "How do you write the Greek letter Alpha in math mode?",
            options: ["A", "\\alpha", "\\GreekA", "alpha"],
            ans: 1,
            explanation: "\\alpha is the command for the lowercase Greek letter alpha."
        },
        {
            id: 8,
            q: "If you want to display an equation without an automatic number, use:",
            options: ["\\begin{equation}", "\\begin{equation*}", "\\begin{no-num}", "\\begin{calc}"],
            ans: 1,
            explanation: "The starred version of the math environment suppresses the equation numbering."
        },
        {
            id: 9,
            q: "To write a square root (√x), use:",
            options: ["\\root{x}", "\\sqrt{x}", "\\sq{x}", "\\sqr{x}"],
            ans: 1,
            explanation: "\\sqrt{...} is the standard command for square roots."
        },
        {
            id: 10,
            q: "What does the command \\sum produce?",
            options: ["A summary", "A summation symbol (Σ)", "An addition sign", "A subtotal"],
            ans: 1,
            explanation: "\\sum generates the large summation operator used in statistics and calculus."
        },
        {
            id: 11,
            q: "In math mode, spaces are:",
            options: ["Ignored by LaTeX", "Required between every symbol", "Represented by a dot", "Converted to new lines"],
            ans: 0,
            explanation: "LaTeX handles math spacing automatically; to force a space, you need special commands like \\, or \\quad."
        },
        {
            id: 12,
            q: "To align multiple equations by the equals sign (=), use:",
            options: ["\\begin{equation}", "\\begin{align}", "\\begin{tabular}", "\\begin{center}"],
            ans: 1,
            explanation: "The align environment (from amsmath) allows you to use the '&' symbol to line up symbols vertically."
        },
        {
            id: 13,
            q: "The command for the 'infinity' symbol (∞) is:",
            options: ["\\inf", "\\infinity", "\\infty", "\\forever"],
            ans: 2,
            explanation: "\\infty is the specific command for this mathematical symbol."
        },
        {
            id: 14,
            q: "How do you make brackets (like parentheses) automatically scale to the size of a fraction?",
            options: ["Just use ( )", "Use \\left( and \\right)", "Use \\big(", "Use \\huge["],
            ans: 1,
            explanation: "\\left and \\right paired tags allow brackets to stretch to match the height of their content."
        },
        {
            id: 15,
            q: "In LaTeX math, variables are automatically printed in:",
            options: ["Bold", "Italic", "Serif", "Courier"],
            ans: 1,
            explanation: "Mathematical variables are italicized by default to distinguish them from standard text."
        }
    ],
    "session-2-word-vs-latex": [
        {
            id: 1,
            q: "In the 'Engineering vs. Painting' analogy, which tool represents 'Painting'?",
            options: ["LaTeX", "MS Word", "Photoshop", "Notepad"],
            ans: 1,
            explanation: "In Word, you manually 'paint' the visual layout, which often leads to structural inconsistencies."
        },
        {
            id: 2,
            q: "What is the main reason images 'jump' in MS Word but stay predictable in LaTeX?",
            options: ["The file size", "Direct visual anchoring vs Logically defined placement", "Better graphics cards", "Word is older"],
            ans: 1,
            explanation: "LaTeX treats images as 'floats' and finds the optimal mathematical position for them based on rules, rather than pixel-dragging."
        },
        {
            id: 3,
            q: "For a 100-page thesis, which tool is more stable and less likely to crash or lag?",
            options: ["MS Word", "LaTeX", "Google Docs", "They are all the same"],
            ans: 1,
            explanation: "LaTeX source files are plain text, which remain fast and stable regardless of the document's total length."
        },
        {
            id: 4,
            q: "How does LaTeX handle automated line and page breaks compared to Word?",
            options: ["It doesn't", "It uses advanced algorithms to minimize 'widows' and 'orphans'", "It leaves it to the user", "It uses more ink"],
            ans: 1,
            explanation: "TeX was designed by Donald Knuth with high-quality line-breaking algorithms specifically to avoid awkward text gaps."
        },
        {
            id: 5,
            q: "Is it easier to maintain consistent formatting across a multi-author project in LaTeX?",
            options: ["No, it's harder", "Yes, because the style is defined in the preamble and doesn't change by typing", "Only if everyone uses the same mouse", "Word is better for collaboration"],
            ans: 1,
            explanation: "By sharing the same .tex file and preamble, everyone's output is guaranteed to be identical."
        },
        {
            id: 6,
            q: "Which tool allows you to 'Git' (version control) your document text more effectively?",
            options: ["MS Word (Binary file)", "LaTeX (Plain text file)", "PDF", "Handwritten notes"],
            ans: 1,
            explanation: "Version control works best with plain text, allowing you to see exactly which line was changed by whom."
        },
        {
            id: 7,
            q: "What is a 'Float' in LaTeX context?",
            options: ["A decimal number", "An environment (like figure or table) that finds its own place", "A type of font", "A digital signature"],
            ans: 1,
            explanation: "Floats 'float' through the document to the nearest optimal space (Top or Bottom of a page) to prevent large gaps."
        },
        {
            id: 8,
            q: "Common complaint about Word: 'I just deleted a space and the format broke.' Does this happen in LaTeX?",
            options: ["Yes, even more", "No, because content and structure are separated", "Only on Tuesdays", "If the computer is old"],
            ans: 1,
            explanation: "Since the layout is defined by commands, small text edits cannot accidentally trigger global layout shifts."
        },
        {
            id: 9,
            q: "How is a Table of Contents generated in LaTeX vs Word?",
            options: ["Manual typing", "Automatic compilation based on section tags vs. Paragraph styles", "Drawing it", "Using a plugin"],
            ans: 1,
            explanation: "LaTeX builds the TOC automatically from your \\section and \\chapter tags with 100% accurate page numbers."
        },
        {
            id: 10,
            q: "Professional academic publishers mostly provide templates in:",
            options: [".doc", ".pdf", ".tex", ".txt"],
            ans: 2,
            explanation: "The .tex format ensures that whatever the author types will perfectly match the journal's final print layout."
        },
        {
            id: 11,
            q: "Which tool is better for managing 500+ citations?",
            options: ["Word's built-in manager", "LaTeX with BibTeX", "Note-taking app", "Sticky notes"],
            ans: 1,
            explanation: "BibTeX handles massive databases with ease, ensuring zero duplication and perfect formatting style."
        },
        {
            id: 12,
            q: "When a layout Change is required (e.g., from Single to Double column), what do you do in LaTeX?",
            options: ["Manually move every image", "Change one word in the \\documentclass options", "Re-type the whole thing", "Call a pro"],
            ans: 1,
            explanation: "Changing [singlecolumn] to [twocolumn] in the preamble instantly re-flows the entire document."
        },
        {
            id: 13,
            q: "LaTeX is described as 'Logic-driven'. What does this mean for formatting?",
            options: ["No formatting is possible", "Formatting follows strict, predefined rules", "You have to be a math genius", "It's random"],
            ans: 1,
            explanation: "Consistency is forced by the rules of the document class, ensuring a professional look without human error."
        },
        {
            id: 14,
            q: "The learning curve for LaTeX is higher because:",
            options: ["The colors are boring", "It requires learning a syntax instead of clicking buttons", "It costs money", "It's newer than Word"],
            ans: 1,
            explanation: "The initial investment in learning syntax pays off with immense time savings during the later stages of research."
        },
        {
            id: 15,
            q: "Final Conclusion: LaTeX is best for...",
            options: ["Quick grocery lists", "Professional research papers and complex theses", "Editing photos", "Sending emails"],
            ans: 1,
            explanation: "LaTeX is the industry gold standard for high-precision, large-scale academic documentation."
        }
    ],
    "session-2-bibtex": [
        {
            id: 1,
            q: "What is the standard file extension for a LaTeX bibliography database?",
            options: [".bib", ".txt", ".ref", ".cite"],
            ans: 0,
            explanation: ".bib files store all your reference metadata in a structured, machine-readable format."
        },
        {
            id: 2,
            q: "To cite a source in your text, which command is used?",
            options: ["\\reference{key}", "\\cite{key}", "\\show{key}", "\\link{key}"],
            ans: 1,
            explanation: "The \\cite command uses a unique shorthand key to link your text to the bibliography entry."
        },
        {
            id: 3,
            q: "How does BibTeX handle source numbering (e.g., [1], [2])?",
            options: ["You type them manually", "It numbers them automatically based on appearance or alphabet", "It uses the year", "It doesn't use numbers"],
            ans: 1,
            explanation: "BibTeX automatically manages the sequence, ensuring that even if you move paragraphs, the numbers stay correct."
        },
        {
            id: 4,
            q: "Which command defines the visual style of your references (e.g., IEEE, APA)?",
            options: ["\\bibstyle{...}", "\\bibliographystyle{...}", "\\format{...}", "\\usepackage{cite}"],
            ans: 1,
            explanation: "\\bibliographystyle determines how the names, years, and titles are ordered and formatted."
        },
        {
            id: 5,
            q: "Where do you place the \\bibliography{filename} command?",
            options: ["In the preamble", "At the very end where you want the list to appear", "At the start of every chapter", "In the title"],
            ans: 1,
            explanation: "The command generates the 'References' or 'Bibliography' section exactly where it's called."
        },
        {
            id: 6,
            q: "What is a 'BibTeX Key'?",
            options: ["A password", "A unique ID for each paper (e.g., smith2023climate)", "The title of the book", "The author's name"],
            ans: 1,
            explanation: "The key is a short string you define to identify a specific source in your .bib file."
        },
        {
            id: 7,
            q: "Which tool helps in generating BibTeX entries from web sources or PDFs?",
            options: ["Mendeley/Zotero", "Photoshop", "Excel", "Calculator"],
            ans: 0,
            explanation: "Reference managers like Zotero or Mendeley can export your collection directly to a .bib file."
        },
        {
            id: 8,
            q: "If you have a source in your .bib file but don't \\cite it, does it appear in the PDF?",
            options: ["Yes, always", "No, LaTeX only shows sources that are actually cited", "Only if it's a book", "It shows as a blank line"],
            ans: 1,
            explanation: "This keeps your list clean, only showing what you actually used in your research paper."
        },
        {
            id: 9,
            q: "To force a source to appear without a visible citation, you use:",
            options: ["\\cite*", "\\nocite{key}", "\\silentcite{key}", "\\force{key}"],
            ans: 1,
            explanation: "\\nocite informs BibTeX to include the entry in the list even if it's not mentioned in the text."
        },
        {
            id: 10,
            q: "What type of entry is used for a scholarly journal paper?",
            options: ["@book", "@article", "@manual", "@proceedings"],
            ans: 1,
            explanation: "The @article type includes fields like journal name, volume, and pages."
        },
        {
            id: 11,
            q: "How many times do you need to run compilation to update all references?",
            options: ["Once", "Usually 3-4 times (LaTeX -> BibTeX -> LaTeX -> LaTeX)", "Ten times", "Never, it's instant"],
            ans: 1,
            explanation: "Multiple passes are needed so that LaTeX and BibTeX can 'handover' the data and resolve cross-references."
        },
        {
            id: 12,
            q: "In a .bib file, how is an author's name best formatted?",
            options: ["First Last", "Last, First", "First and Last", "It doesn't matter"],
            ans: 1,
            explanation: "Using 'Last, First' (e.g., Smith, John) helps BibTeX correctly identify the family name for sorting."
        },
        {
            id: 13,
            q: "What is the purpose of the 'natbib' package?",
            options: ["To draw nature photos", "To provide advanced author-year (Harvard style) citations", "To check for plagiarism", "To fix spelling"],
            ans: 1,
            explanation: "natbib is a highly popular package for managing complex citation formats beyond simple numbering."
        },
        {
            id: 14,
            q: "If the citation style is IEEE, the references are sorted by:",
            options: ["Alphabet", "Order of appearance", "Publication year", "Author's weight"],
            ans: 1,
            explanation: "IEEE style uses numerical citations based on when you first mention them in the text."
        },
        {
            id: 15,
            q: "BibTeX ensures 'Bibliographic Integrity'. This means:",
            options: ["No one can steal your work", "Every citation matches an entry and follows a consistent style", "The paper is fact-checked", "The grammar is perfect"],
            ans: 1,
            explanation: "It guarantees that you never have a [3] in the text without a corresponding [3] in the references list."
        }
    ],
    "session-2-tables-figures": [
        {
            id: 1,
            q: "Which environment is required to add an image in LaTeX?",
            options: ["\\begin{image}", "\\begin{figure}", "\\begin{picture}", "\\begin{graphics}"],
            ans: 1,
            explanation: "The 'figure' environment is a float that holds your graphic and provides a caption."
        },
        {
            id: 2,
            q: "Which package is essential for handling external image files?",
            options: ["amsmath", "graphicx", "tabularx", "color"],
            ans: 1,
            explanation: "graphicx provides the powerful \\includegraphics command."
        },
        {
            id: 3,
            q: "What is the purpose of the '[h!]' option in a figure command?",
            options: ["To make it 'huge'", "To suggest placing the figure 'here' (exactly in that spot)", "To hide the figure", "To high-res it"],
            ans: 1,
            explanation: "Placement specifiers like h (here), t (top), or b (bottom) guide the LaTeX engine on where to float the item."
        },
        {
            id: 4,
            q: "To add a description below an image, use:",
            options: ["\\text{...}", "\\caption{...}", "\\label{...}", "\\desc{...}"],
            ans: 1,
            explanation: "\\caption automatically adds the 'Figure 1:' prefix and maintains the numbering."
        },
        {
            id: 5,
            q: "Which environment is used to create a structured grid of data (table)?",
            options: ["\\begin{grid}", "\\begin{tabular}", "\\begin{matrix}", "\\begin{data}"],
            ans: 1,
            explanation: "'tabular' is the engine for building the rows and columns of your tables."
        },
        {
            id: 6,
            q: "In a tabular environment, what does the symbol '|' (pipe) represent in the argument {l|c|r}?",
            options: ["A space", "A vertical border line", "A horizontal border line", "A column break"],
            ans: 1,
            explanation: "Pipes define vertical lines between columns for visual separation."
        },
        {
            id: 7,
            q: "How do you add a horizontal line across a table?",
            options: ["\\hline", "\\line", "\\border", "----------"],
            ans: 0,
            explanation: "\\hline draws a clean horizontal line between rows."
        },
        {
            id: 8,
            q: "Which symbol is used to separate columns in a single row?",
            options: ["&", "%", "$", ","],
            ans: 0,
            explanation: "The ampersand (&) acts as a separator telling LaTeX to move to the next column cell."
        },
        {
            id: 9,
            q: "To refer to a specific figure in your text (e.g., 'as shown in Fig. 2'), you must use:",
            options: ["Manual numbering", "\\label and \\ref system", "Searching the PDF", "Pointers"],
            ans: 1,
            explanation: "Using labels ensures that if you add a new figure before Fig 2, the reference updates to Fig 3 automatically."
        },
        {
            id: 10,
            q: "What is 'Vector Graphics' (like PDF/EPS) vs 'Raster Graphics' (JPG/PNG)?",
            options: ["Raster has more colors", "Vector stays crisp when zooming; Raster gets pixelated", "LaTeX only supports PNG", "There is no difference"],
            ans: 1,
            explanation: "For research, always prefer vector formats for charts and diagrams to ensure high print quality."
        },
        {
            id: 11,
            q: "To scale an image to 50% of the page width, use:",
            options: ["width=0.5\\textwidth", "size=small", "scale=0.5", "A or C depending on command options"],
            ans: 3,
            explanation: "The \\includegraphics command allows flexible resizing via key-value options."
        },
        {
            id: 12,
            q: "Which package is commonly used for 'professional-grade' tables (book-style)?",
            options: ["amsmath", "booktabs", "tablex", "fancyhdr"],
            ans: 1,
            explanation: "booktabs provides rules like \\toprule and \\midrule that follow high-quality typography standards (no vertical lines!)."
        },
        {
            id: 13,
            q: "What is the 'List of Figures'?",
            options: ["A folder on the PC", "An automatic section generated by \\listoffigures", "A manual list of URLs", "A backup"],
            ans: 1,
            explanation: "Like a TOC, this command generates a table of all images and their page numbers automatically."
        },
        {
            id: 14,
            q: "Can you put a table inside a figure environment?",
            options: ["Yes, LaTeX doesn't care", "No, it must be in a 'table' environment to be labeled correctly", "Only if it has an image", "Only in the 'book' class"],
            ans: 1,
            explanation: "To have the caption say 'Table 1:' instead of 'Figure 1:', you must use the 'table' float environment."
        },
        {
            id: 15,
            q: "The power of 'Sub-figures' is provided by which common package?",
            options: ["subcaption", "multiphoto", "grid", "float"],
            ans: 0,
            explanation: "subcaption allows you to have Fig 1a and Fig 1b within a single master figure."
        }
    ],
    "session-2-thesis": [
        {
            id: 1,
            q: "Which command is used to include a separate .tex file into your main thesis file?",
            options: ["\\import{...}", "\\include{...}", "\\add{...}", "\\open{...}"],
            ans: 1,
            explanation: "\\include is designed for large documents, allowing you to manage chapters as modular pieces."
        },
        {
            id: 2,
            q: "What is the primary benefit of a 'Modular Thesis Structure'?",
            options: ["It makes the file larger", "Easy navigation, faster compilation of single chapters, and cleaner code", "It's a requirement for graduation", "It looks more complex"],
            ans: 1,
            explanation: "Separating chapters into different files prevents the 'Not Responding' lag common in Word."
        },
        {
            id: 3,
            q: "The command \\includeonly{chapter1} is useful because:",
            options: ["It deletes other chapters", "It only compiles the specified chapter while keeping page/ref counts correct", "It hides the text from advisors", "It checks for plagiarism"],
            ans: 1,
            explanation: "This allows you to focus on writing one chapter at a time without waiting for the whole 300-page book to compile."
        },
        {
            id: 4,
            q: "Which document class is standard for a Masters or PhD thesis?",
            options: ["article", "report", "slides", "letter"],
            ans: 1,
            explanation: "The 'report' class supports the hierarchical structure (Chapters -> Sections) needed for long academic works."
        },
        {
            id: 5,
            q: "What is the purpose of the 'Front Matter' in a thesis?",
            options: ["For the conclusion", "For Abstract, Dedication, and TOC with Roman numbering (i, ii, iii)", "For the bibliography", "For the appendix"],
            ans: 1,
            explanation: "Front matter allows for different page numbering styles before the main research content starts."
        },
        {
            id: 6,
            q: "The command \\mainmatter switches the page numbering to:",
            options: ["Roman (i, ii...)", "Arabic (1, 2, 3...)", "Binary", "Letters (A, B...)"],
            ans: 1,
            explanation: "It signals the start of the actual research content where standard page numbering is required."
        },
        {
            id: 7,
            q: "Where should you store your Global Packages and Definitions for a thesis?",
            options: ["In every chapter file", "In a single main.tex file (the Preamble)", "In the footer", "In a cloud folder"],
            ans: 1,
            explanation: "Keeping settings in one central 'Main' file ensures total consistency across all chapters."
        },
        {
            id: 8,
            q: "What is an 'Appendix' environment used for?",
            options: ["For the title", "To host raw data, code, or large tables that disrupt the main flow", "To store draft text", "To index keywords"],
            ans: 1,
            explanation: "\\appendix changes the numbering style to letters (Annexure A, B...) for supplementary material."
        },
        {
            id: 9,
            q: "How do you generate a 'List of Abbreviations' or 'Nomenclature'?",
            options: ["Manual list", "Using specialized packages like 'glossaries'", "Using a calculator", "LaTeX doesn't do this"],
            ans: 1,
            explanation: "The 'glossaries' package automates the tracking and display of technical terms and symbols."
        },
        {
            id: 10,
            q: "What is the 'Master File' in a LaTeX thesis project?",
            options: ["The largest file", "The central file that \\includes all other chapter.tex files", "The PDF output", "The bibliography folder"],
            ans: 1,
            explanation: "The master file (often called main.tex) acts as the 'glue' that coordinates the entire document architecture."
        },
        {
            id: 11,
            q: "In a 'book' class, clearpage vs. cleardoublepage:",
            options: ["No difference", "cleardoublepage ensures new chapters start on an odd-numbered (right-hand) page", "cleardoublepage deletes text", "One is faster"],
            ans: 1,
            explanation: "This follows professional book printing standards where chapter starts are always on the right."
        },
        {
            id: 12,
            q: "Thesis writing tip: How to handle long-term collaboration with a supervisor?",
            options: ["Send 50 different PDFs", "Use TeX Commenting (%) or 'todo' packages for internal feedback", "Print it out and use a pen", "Avoid feedback"],
            ans: 1,
            explanation: "Packages like 'todonotes' let you leave digital sticky notes on the PDF during the draft phase."
        },
        {
            id: 13,
            q: "What does 'Cross-Chapter Referencing' mean?",
            options: ["Copy-pasting text", "Linking to a figure in Chapter 2 from Chapter 5 using \\ref", "Writing two theses", "Checking for errors"],
            ans: 1,
            explanation: "LaTeX maintains a global map of labels, allowing you to link any part of the document to any other part instantly."
        },
        {
            id: 14,
            q: "Should you keep images in a separate folder for a 5-chapter thesis?",
            options: ["No, keep them with the code", "Yes, for organization; specify the path in the preamble", "Deleter them after use", "Doesn't matter"],
            ans: 1,
            explanation: "Large projects stay manageable only if you keep a clean directory structure (e.g., /chapters, /images, /refs)."
        },
        {
            id: 15,
            q: "The ultimate goal of using LaTeX for a thesis is:",
            options: ["To show off", "Zero formatting anxiety and 100% professional presentation on submission day", "To learn to code", "To use less paper"],
            ans: 1,
            explanation: "LaTeX turns the final 'formatting week' of your PhD from a nightmare into a simple click of a button."
        }
    ]
};


