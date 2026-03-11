const fs = require('fs');

// Helper to inject copiedActivity state after the last useState in a component
function addCopiedState(content, afterPattern) {
    // Find the last useState line before the return statement
    const lines = content.split('\n');
    let lastUseStateIdx = -1;
    let returnIdx = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('useState(') || lines[i].includes('useState<')) {
            lastUseStateIdx = i;
        }
        if (lines[i].trim().startsWith('return (') && returnIdx === -1) {
            returnIdx = i;
        }
    }

    // If no useState found, add before return
    const insertIdx = lastUseStateIdx !== -1 ? lastUseStateIdx + 1 : returnIdx;

    // Check if copiedActivity already exists
    if (content.includes('copiedActivity')) return content;

    lines.splice(insertIdx + 1, 0, '    const [copiedActivity, setCopiedActivity] = useState<string | null>(null);');
    return lines.join('\n');
}

// The sampleTex data for each file
const sampleTexData = {
