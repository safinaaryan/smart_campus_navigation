// -------------------------------------------------------------
// 1. CAMPUS GRAPH DATA (Places & Roads)
// -------------------------------------------------------------

// Each place has an (x, y) center position on the SVG map (viewBox 0 0 820 500)
const places = {
  "Main Gate":       { x: 95,  y: 250 },
  "Admin Office":    { x: 240, y: 100 },
  "Library":         { x: 420, y: 70  },
  "Computer Lab":    { x: 650, y: 120 },
  "Cafeteria":       { x: 260, y: 310 },
  "Classroom A":     { x: 440, y: 250 },
  "Classroom B":     { x: 660, y: 340 },
  "Auditorium":      { x: 440, y: 440 },
  "Hostel":          { x: 740, y: 440 },
  "Sports Ground":   { x: 95,  y: 440 }
};

// Roads connecting places with distance in metres
const roads = [
  ["Main Gate", "Admin Office", 150],
  ["Main Gate", "Cafeteria", 120],
  ["Main Gate", "Sports Ground", 200],
  ["Admin Office", "Library", 170],
  ["Admin Office", "Cafeteria", 100],
  ["Library", "Computer Lab", 200],
  ["Library", "Classroom A", 160],
  ["Cafeteria", "Classroom A", 180],
  ["Cafeteria", "Auditorium", 220],
  ["Classroom A", "Computer Lab", 140],
  ["Classroom A", "Classroom B", 190],
  ["Classroom A", "Auditorium", 170],
  ["Computer Lab", "Classroom B", 180],
  ["Classroom B", "Hostel", 130],
  ["Auditorium", "Hostel", 300],
  ["Sports Ground", "Auditorium", 350]
];

// Build adjacency list (bidirectional graph)
const graph = {};
for (const name in places) graph[name] = [];
for (const [a, b, d] of roads) {
  graph[a].push({ to: b, d: d });
  graph[b].push({ to: a, d: d });
}

// -------------------------------------------------------------
// 2. SEARCH ALGORITHMS (BFS & UCS)
// -------------------------------------------------------------

// BFS: finds the path with the fewest stops (hops)
function bfs(start, goal) {
  const queue = [[start]];
  const visited = new Set([start]);

  while (queue.length > 0) {
    const path = queue.shift();
    const node = path[path.length - 1];

    if (node === goal) return path;

    for (const next of graph[node]) {
      if (!visited.has(next.to)) {
        visited.add(next.to);
        queue.push([...path, next.to]);
      }
    }
  }
  return null;
}

// UCS: finds the path with the minimum total distance in metres
function ucs(start, goal) {
  const frontier = [{ path: [start], cost: 0 }];
  const bestCost = {};
  bestCost[start] = 0;

  while (frontier.length > 0) {
    frontier.sort((a, b) => a.cost - b.cost); // lowest cost first
    const current = frontier.shift();
    const node = current.path[current.path.length - 1];

    if (node === goal) return current.path;

    for (const next of graph[node]) {
      const newCost = current.cost + next.d;
      if (bestCost[next.to] === undefined || newCost < bestCost[next.to]) {
        bestCost[next.to] = newCost;
        frontier.push({ path: [...current.path, next.to], cost: newCost });
      }
    }
  }
  return null;
}

// Total distance calculation for a given path
function pathDistance(path) {
  let total = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const road = graph[path[i]].find(r => r.to === path[i + 1]);
    if (road) total += road.d;
  }
  return total;
}

// -------------------------------------------------------------
// 3. DRAWING THE MAP (Simple Box-by-Box Structure)
// -------------------------------------------------------------
const svg = document.getElementById("map");
const NS = "http://www.w3.org/2000/svg";

// Checks if the road segment between place a and place b is on the active route
function isOnRoute(path, a, b) {
  if (!path) return false;
  for (let i = 0; i < path.length - 1; i++) {
    if ((path[i] === a && path[i + 1] === b) ||
        (path[i] === b && path[i + 1] === a)) {
      return true;
    }
  }
  return false;
}

function drawMap(routePath) {
  svg.innerHTML = ""; // Clear existing SVG elements

  // 1. Draw Road Lines
  for (const [a, b, d] of roads) {
    const onRoute = isOnRoute(routePath, a, b);

    const line = document.createElementNS(NS, "line");
    line.setAttribute("x1", places[a].x);
    line.setAttribute("y1", places[a].y);
    line.setAttribute("x2", places[b].x);
    line.setAttribute("y2", places[b].y);
    line.setAttribute("class", onRoute ? "road road-active" : "road");
    svg.appendChild(line);
  }

  // 2. Draw Distance Badges in the middle of roads
  for (const [a, b, d] of roads) {
    const midX = (places[a].x + places[b].x) / 2;
    const midY = (places[a].y + places[b].y) / 2;

    const bg = document.createElementNS(NS, "rect");
    bg.setAttribute("x", midX - 22);
    bg.setAttribute("y", midY - 14);
    bg.setAttribute("width", 44);
    bg.setAttribute("height", 16);
    bg.setAttribute("rx", 4);
    bg.setAttribute("ry", 4);
    bg.setAttribute("class", "dist-bg");
    svg.appendChild(bg);

    const text = document.createElementNS(NS, "text");
    text.setAttribute("x", midX);
    text.setAttribute("y", midY - 2);
    text.setAttribute("class", "dist");
    text.textContent = d + " m";
    svg.appendChild(text);
  }

  // 3. Draw Place Boxes (Box-by-Box structure)
  const boxWidth = 114;
  const boxHeight = 36;

  for (const name in places) {
    const pos = places[name];
    const active = routePath && routePath.includes(name);

    // Box container group
    const g = document.createElementNS(NS, "g");
    g.style.cursor = "pointer";

    // Rounded rectangle box
    const rect = document.createElementNS(NS, "rect");
    rect.setAttribute("x", pos.x - boxWidth / 2);
    rect.setAttribute("y", pos.y - boxHeight / 2);
    rect.setAttribute("width", boxWidth);
    rect.setAttribute("height", boxHeight);
    rect.setAttribute("rx", 8);
    rect.setAttribute("ry", 8);
    rect.setAttribute("class", active ? "place-rect place-rect-active" : "place-rect");

    // Text label inside the box
    const label = document.createElementNS(NS, "text");
    label.setAttribute("x", pos.x);
    label.setAttribute("y", pos.y + 4);
    label.setAttribute("class", active ? "place-text place-text-active" : "place-text");
    label.textContent = name;

    // Click on a box to set start or destination
    g.addEventListener("click", () => {
      if (!startSel.value) {
        startSel.value = name;
      } else {
        endSel.value = name;
      }
    });

    g.appendChild(rect);
    g.appendChild(label);
    svg.appendChild(g);
  }
}

// -------------------------------------------------------------
// 4. USER INTERFACE & SEPARATE DIV SECTIONS
// -------------------------------------------------------------
const startSel = document.getElementById("start");
const endSel = document.getElementById("end");
const algoSel = document.getElementById("algo");
const resultBox = document.getElementById("result");
const findBtn = document.getElementById("findBtn");
const resetBtn = document.getElementById("resetBtn");

// Initially, add blank prompt options so no route is selected
startSel.add(new Option("-- Select Start --", ""));
endSel.add(new Option("-- Select Destination --", ""));

// Fill dropdowns with available places
for (const name in places) {
  startSel.add(new Option(name, name));
  endSel.add(new Option(name, name));
}

// Initially no route selected
startSel.selectedIndex = 0;
endSel.selectedIndex = 0;

// Find Route Button Handler
findBtn.addEventListener("click", function () {
  const start = startSel.value;
  const end = endSel.value;
  const algo = (algoSel && algoSel.value) ? algoSel.value : "ucs";

  // Check if both start and destination are selected
  if (!start || !end) {
    drawMap(null);
    resultBox.innerHTML = `
      <div class="result-card error-card">
        <span class="error-icon">&#9888;</span>
        <span>Please select both a start location and a destination.</span>
      </div>
    `;
    return;
  }

  if (start === end) {
    drawMap(null);
    resultBox.innerHTML = `
      <div class="result-card error-card">
        <span class="error-icon">&#9888;</span>
        <span>Start and destination are the same place. Please choose different buildings.</span>
      </div>
    `;
    return;
  }

  // Execute BFS or UCS based on selection
  const path = (algo === "bfs") ? bfs(start, end) : ucs(start, end);

  if (path === null) {
    drawMap(null);
    resultBox.innerHTML = `
      <div class="result-card error-card">
        <span class="error-icon">&#10006;</span>
        <span>No route available between <b>${start}</b> and <b>${end}</b>.</span>
      </div>
    `;
    return;
  }

  // Highlight route on the box-by-box graph
  drawMap(path);

  // Calculate metrics
  const stops = path.length - 1;
  const distance = pathDistance(path);
  const isBfs = (algo === "bfs");

  // Generate route breadcrumb pills
  const routePills = path.map((place, idx) => {
    const isStart = (idx === 0);
    const isEnd = (idx === path.length - 1);
    const nodeClass = isStart ? 'route-node node-start' : (isEnd ? 'route-node node-end' : 'route-node');
    return `<span class="${nodeClass}">${place}</span>`;
  }).join('<span class="route-arrow">&rarr;</span>');

  const algoBadge = isBfs
    ? '<span class="badge badge-bfs">BFS &bull; Fewest Stops</span>'
    : '<span class="badge badge-ucs">UCS &bull; Shortest Distance</span>';

  // Render separate well-designed div sections below the graph
  resultBox.innerHTML = `
    <div class="result-grid">
      <!-- Section 1: Optimal Route & Active Algorithm Badge -->
      <div class="result-card route-card">
        <div class="card-header">
          <div class="card-header-left">
            <span class="card-icon">🛣️</span>
            <span class="card-title">Optimal Route</span>
          </div>
          ${algoBadge}
        </div>
        <div class="route-flow">
          ${routePills}
        </div>
      </div>

      <!-- Section 2 & 3: Stats Row -->
      <div class="stats-row">
        <!-- Stops Section -->
        <div class="result-card stat-card">
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-icon">🚏</span>
              <span class="card-title">Total Stops</span>
            </div>
          </div>
          <div class="stat-body">
            <span class="stat-val">${stops}</span>
            <span class="stat-unit">${stops === 1 ? 'stop' : 'stops'}</span>
          </div>
        </div>

        <!-- Distance Section -->
        <div class="result-card stat-card">
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-icon">📏</span>
              <span class="card-title">Total Distance</span>
            </div>
          </div>
          <div class="stat-body">
            <span class="stat-val">${distance}</span>
            <span class="stat-unit">metres</span>
          </div>
        </div>
      </div>
    </div>
  `;
});

// Reset Campus Button Handler
if (resetBtn) {
  resetBtn.addEventListener("click", function () {
    // Reset dropdowns to initial unselected state
    startSel.selectedIndex = 0; // "-- Select Start --"
    endSel.selectedIndex = 0;   // "-- Select Destination --"
    if (algoSel) algoSel.value = "ucs";

    // Clear active path on map
    drawMap(null);

    // Reset result placeholder
    resultBox.innerHTML = `
      <div class="result-placeholder">
        Select a start, destination, and algorithm, then click <b>Find Route</b>.
      </div>
    `;
  });
}

// Initial box-by-box map render with NO active route
drawMap(null);