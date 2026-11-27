/* Monili VLR product catalogue.
   To add a product, add one object to PRODUCTS. Nothing else needs to change.
   - id, name:  short id (page anchor) and the name shown
   - market:    one of the MARKETS keys (or add a new market)
   - line:      one sentence about what it does
   - prompt:    an example of what a user writes to it (shown in the hero and on the card)
   - shape:     the animated preview: ring, building, redact, shield, transit, globe, or orb (default)
   - runs:      where it runs (chips)
   - url:       the product site
   - color:     the product's own colour, used only as a small beacon
*/
window.MARKETS = {
  design: '3D design in the chat',
  privacy: 'Privacy and security',
  travel: 'Mobility and travel',
  infra: 'AI infrastructure'
};

window.PRODUCTS = [
  { id: 'gemcore', name: 'GemCore', market: 'design', shape: 'ring', color: '#E0B65A',
    line: 'Real CAD rings from a conversation: exact geometry, exact finger sizes, automatic checks, STL and STEP export.',
    prompt: 'Design a size 14 ring with a twisted band.', runs: ['ChatGPT', 'Codex'], url: 'https://monili-vlr.github.io/gemcore/' },
  { id: 'gapsman', name: 'Gapsman', market: 'design', shape: 'building', color: '#E8B04A',
    line: 'The 3D engine for architecture driven by an AI. You write, the machine draws, then renders it.',
    prompt: 'Build this house from the plan and the section.', runs: ['ChatGPT', 'Codex'], url: 'https://monili-vlr.github.io/gapsman/' },
  { id: 'thirdbrain-pii', name: 'ThirdBrain-PII', market: 'privacy', shape: 'redact', color: '#E0805C',
    line: 'Use Claude on real work and keep real names to yourself. Personal data is replaced in your browser and comes back only for you.',
    prompt: 'Summarise this contract without sending the names.', runs: ['Claude'], url: 'https://monili-vlr.github.io/thirdbrain-pii/' },
  { id: 't-shadow', name: 'T-Shadow', market: 'privacy', shape: 'shield', color: '#FF4D5E',
    line: 'A Windows security guardian that works inside Claude. It blocks with undo and explains every alarm in plain words.',
    prompt: 'Is anything strange running on my PC?', runs: ['Claude', 'Windows'], url: 'https://monili-vlr.github.io/t-shadow/' },
  { id: 'vertex', name: 'Vertex', market: 'travel', shape: 'transit', color: '#FF8C42',
    line: 'Your city, live, inside ChatGPT: real timetables, strikes, accessible routes and day plans that work.',
    prompt: 'Plan my day in Barcelona, avoiding the metro strike.', runs: ['ChatGPT'], url: 'https://monili-vlr.github.io/vertex/' },
  { id: 'claude-vpn-mcp', name: 'Claude VPN MCP', market: 'infra', shape: 'globe', color: '#3FD0B0',
    line: 'Write "activate my location in California": Claude opens a browser that goes online from there through Tor. Free, nothing else to install.',
    prompt: 'Activate my location in California.', runs: ['Claude', 'Tor', 'Free'], url: 'https://monili-vlr.github.io/claude-vpn-mcp/' }
];
