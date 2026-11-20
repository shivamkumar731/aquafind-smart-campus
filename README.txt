AQUAFIND — P16 INT335 WEBSITE DEMO

FILES
- index.html: page structure and content
- style.css: bright, responsive visual design
- script.js: sample water-point data, search/filter, schematic map markers,
  issue-report modal, local browser storage and mobile navigation

HOW TO RUN
1. Keep all files in the same folder.
2. Open index.html in a modern browser.
3. For local development, you can use VS Code + Live Server.

IMPORTANT PROJECT NOTES
- All water-point names, locations and statuses are illustrative demo data.
- Replace the sample entries in script.js with your group's verified campus audit.
- The map is a schematic concept, not a surveyed LPU map.
- Issue reports are stored in the browser's localStorage only. They are not
  sent to LPU staff or any server.
- The website does not certify water quality.
- Gather real interview, observation and usability-testing evidence for the
  INT335 project report. Do not present sample data as research findings.

CUSTOMISE WATER POINTS
Edit the `waterPoints` array near the top of script.js. Each item has:
id, name, location, block, status, updated.
Allowed statuses: "working", "maintenance", "issue".
