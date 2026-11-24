/* MoniliAI product catalogue.
   To add a product, add one object to this list. Nothing else needs to change.
   - id:      short name, also used for the page anchor
   - name:    product name as shown
   - market:  one of the MARKETS keys below (or add a new market there)
   - line:    one sentence, from the product's own site
   - runs:    where it runs (chips)
   - url:     link to the product site
   - image:   preview image (16:9 or 1200x630 works best)
   - color:   the product's own accent colour
*/
window.MARKETS = {
  design: '3D design in the chat',
  privacy: 'Privacy and security',
  travel: 'Mobility and travel',
  infra: 'AI infrastructure'
};

window.PRODUCTS = [
  {
    id: 'gemcore', name: 'GemCore', market: 'design',
    line: 'One conversation, a real ring: exact CAD geometry, exact finger sizes, automatic checks, STL and STEP export.',
    runs: ['ChatGPT', 'Codex'], url: 'https://monili-vlr.github.io/gemcore/', image: 'https://monili-vlr.github.io/gemcore/og.jpg', color: '#C9A65A'
  },
  {
    id: 'gapsman', name: 'Gapsman', market: 'design',
    line: 'The 3D engine for architecture built to be driven by an AI. You write, the machine draws, then renders it.',
    runs: ['ChatGPT', 'Codex'], url: 'https://monili-vlr.github.io/gapsman/', image: 'https://monili-vlr.github.io/gapsman/img/og.jpg', color: '#E8B04A'
  },
  {
    id: 'thirdbrain-pii', name: 'ThirdBrain-PII', market: 'privacy',
    line: 'Use Claude on real work and keep real names to yourself. Personal data is replaced in your browser, and comes back only for you.',
    runs: ['Claude'], url: 'https://monili-vlr.github.io/thirdbrain-pii/', image: 'https://monili-vlr.github.io/thirdbrain-pii/og.jpg', color: '#C96442'
  },
  {
    id: 't-shadow', name: 'T-Shadow', market: 'privacy',
    line: 'A Windows security guardian that works inside Claude. It blocks with undo and explains every alarm in plain words.',
    runs: ['Claude', 'Windows'], url: 'https://monili-vlr.github.io/t-shadow/', image: 'https://monili-vlr.github.io/t-shadow/og.jpg', color: '#FF2A3D'
  },
  {
    id: 'vertex', name: 'Vertex', market: 'travel',
    line: 'Your city, live, inside ChatGPT: real timetables, strikes, accessible routes and day plans that work.',
    runs: ['ChatGPT'], url: 'https://monili-vlr.github.io/vertex/', image: 'https://monili-vlr.github.io/vertex/img/bcn-sagrada.webp', color: '#D9480F'
  },
  {
    id: 'claude-vpn-mcp', name: 'Claude VPN MCP', market: 'infra',
    line: 'Write "activate my location in California": Claude starts an isolated browser that goes online from there and verifies the exit.',
    runs: ['Claude', 'Open source'], url: 'https://monili-vlr.github.io/claude-vpn-mcp/', image: 'https://monili-vlr.github.io/claude-vpn-mcp/og.jpg', color: '#3FD0B0'
  }
];
