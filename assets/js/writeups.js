// Paths are relative to the repository root, WITHOUT a leading slash.
// Add an entry here to update search, the sidebar, category pages, and recent writeups.
window.SITE_DATA = {
  categories: [
    { id: "cyberquest", title: "CyberQuest", url: "writeups/cyberquest/", description: "CyberQuest competition writeups and notes." },
    { id: "ncl", title: "NCL", url: "writeups/ncl/", description: "National Cyber League challenges and competition notes." },
    { id: "faust", title: "FAUST CTF", url: "writeups/faust/", description: "FAUST CTF challenges and event writeups." },
    { id: "pwnsec", title: "PwnSec CTF", url: "writeups/pwnsec/", description: "PwnSec CTF challenges and competition writeups." },
    { id: "misc", title: "Labs / Misc", navTitle: "Misc / Labs", url: "writeups/misc/", description: "Independent labs, practice challenges, and other notes." }
  ],
  writeups: [
    {
      title: "pickle",
      event: "PwnSec CTF 2026",
      collection: "pwnsec",
      year: "2026",
      category: "Python / Deserialization",
      date: null,
      tags: ["python", "pickle", "deserialization", "opcodes", "base64"],
      url: "writeups/pwnsec/2026/pickle/",
      description: "Using OBJ, BUILD, and sessionstore to work around a restricted pickle loader.",
      template: false
    },
    {
      title: "Template Writeup",
      event: "CyberQuest",
      collection: "cyberquest",
      year: "2026",
      category: "Template",
      date: null,
      // Demonstration keywords only; this page contains no challenge solution.
      tags: ["template", "example", "grep", "log analysis", "windows", "ncl", "web", "forensics"],
      url: "writeups/cyberquest/2026/example-writeup/",
      description: "A reusable layout with placeholder content. No challenge solution.",
      template: true
    }
  ]
};
