<div align="center">

# 🧭 Smart Campus Navigation

**Find the quickest route to any class, lab, or facility on campus, powered by classic graph-search algorithms.**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge)](https://safinaaryan.github.io/smart_campus_navigation/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![No Dependencies](https://img.shields.io/badge/dependencies-none-blue?style=flat-square)

[Live Demo](https://safinaaryan.github.io/smart_campus_navigation/) · [Report a Bug](https://github.com/safinaaryan/smart_campus_navigation/issues) · [Request a Feature](https://github.com/safinaaryan/smart_campus_navigation/issues)

</div>

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Live Demo](#-live-demo)
- [How It Works](#-how-it-works)
- [BFS vs UCS](#-bfs-vs-ucs)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Customizing the Campus Map](#-customizing-the-campus-map)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🎯 About

**Smart Campus Navigation** is a lightweight, zero-dependency web app that helps students and visitors find their way around campus. The campus is modeled as a **weighted graph**: buildings and landmarks are *nodes*, and roads between them are *edges* with distances in metres.

Pick a start point and a destination, choose a search strategy, and the app highlights the route on an interactive map along with the number of stops and the total distance.

It is also a hands-on demonstration of how pathfinding algorithms power real-world navigation systems.

## ✨ Features

- 🗺️ **Interactive campus map** with clickable location boxes
- 📍 **Start and destination selectors**
- 🔀 **Two routing strategies**: BFS (fewest stops) and UCS (shortest distance)
- 🎨 **Visual route highlighting** directly on the map
- 📏 **Distance labels** on every road segment
- 📊 **Route summary** showing number of stops and total distance (m)
- 🔄 **Reset button** to clear the current selection
- ⚡ **No build tools, no frameworks, no installs**

## 🚀 Live Demo

👉 **[safinaaryan.github.io/smart_campus_navigation](https://safinaaryan.github.io/smart_campus_navigation/)**

<!-- Add a screenshot or GIF here for a big boost in first impressions:
![Smart Campus Navigation Screenshot](assets/screenshot.png)
-->

## ⚙️ How It Works

The campus is stored as a graph in `script.js`:

| Concept | Representation |
|---|---|
| Building / landmark | Node |
| Road between two locations | Edge |
| Walking distance | Edge weight (metres) |

When you click **Find Route**, the selected algorithm explores the graph from the start node until it reaches the destination, then the path is rebuilt and drawn on the map.

## 🔍 BFS vs UCS

| | **BFS** (Breadth-First Search) | **UCS** (Uniform Cost Search) |
|---|---|---|
| **Optimizes for** | Fewest stops (hops) | Lowest total distance |
| **Explores** | Level by level | Cheapest path first (priority queue) |
| **Uses edge weights?** | No | Yes |
| **Best for** | Simple, direct routes | Realistic shortest walking route |

**Example:** going from the *Main Gate* to the *Hostel*, BFS may return a route with fewer stops, while UCS may return a route with more stops that is shorter overall. Try both and compare!

## 🛠️ Getting Started

No build step is required.

### Option 1: Open directly

```bash
git clone https://github.com/safinaaryan/smart_campus_navigation.git
cd smart_campus_navigation
```

Then open `index.html` in your browser.

### Option 2: Serve locally

```bash
python -m http.server 8000
```

Then visit **http://localhost:8000**.

## 🧑‍💻 Usage

1. Choose a **starting location**.
2. Choose a **destination**.
3. Select an **algorithm**:
   - **BFS** for the fewest stops
   - **UCS** for the shortest distance
4. Click **Find Route**.
5. Review the highlighted path and the route summary.
6. Click **Reset** to start over.

## 📁 Project Structure

```
smart_campus_navigation/
├── .github/workflows/   # GitHub Actions (deployment to GitHub Pages)
├── index.html           # App structure and UI layout
├── style.css            # Map, location boxes, and result panel styling
├── script.js            # Graph data, BFS/UCS algorithms, route rendering
└── README.md            # Project documentation
```

## 🏫 Customizing the Campus Map

To adapt the app to your own campus, edit the graph data in `script.js`:

1. Add or rename locations (nodes).
2. Define the roads (edges) between them with distances in metres.
3. Update the matching location boxes in `index.html` / `style.css`.

> Tip: keep distances realistic, since UCS relies on them to pick the shortest route.

## 🗺️ Roadmap

- [ ] Add **Dijkstra's / A\*** search for comparison
- [ ] Show **estimated walking time**
- [ ] Add **search & autocomplete** for locations
- [ ] **Accessibility-friendly routes** (ramps, elevators)
- [ ] **Dark mode**
- [ ] Display **step-by-step directions**
- [ ] Mobile-first responsive improvements
- [ ] Algorithm **step-through visualization**

Have an idea? [Open an issue](https://github.com/safinaaryan/smart_campus_navigation/issues)!

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## 📄 License

This project is provided for educational and demonstration purposes. Consider adding an [MIT License](https://choosealicense.com/licenses/mit/) if you want others to reuse it freely.

## 👤 Author

**Safin Aaryan** · [@safinaaryan](https://github.com/safinaaryan)

⭐ If you found this project useful, consider giving it a star!
