# Smart Campus Navigation System

A lightweight web application for finding the best path across a campus using classic graph-search algorithms. The app lets users choose a start point and destination, compare route strategies, and view the route visually on a campus map.

## Overview

This project models the campus as a graph, where locations are nodes and roads are weighted edges. Users can choose between:

- BFS (Breadth-First Search): finds the route with the fewest stops
- UCS (Uniform Cost Search): finds the route with the shortest total distance

The interface highlights the selected route on a map and displays key stats such as number of stops and total distance in metres.

## Features

- Interactive campus map with clickable location boxes
- Start and destination selectors
- Route planning using BFS or UCS
- Visual route highlighting on the map
- Distance labels on each road segment
- Route summary showing stops and total distance
- Reset button to clear the current selection

## Why This Project Matters

This project demonstrates how graph traversal algorithms can be used in real-world navigation systems. It is useful for understanding how route-finding logic works in applications like:

- campus wayfinding
- indoor mapping
- logistics routing
- transportation planning

## How It Works

The application stores campus locations and roads in a graph structure:

- each building or landmark is a node
- each road between locations is an edge with a distance value
- BFS explores neighbors level by level to find the shortest path in terms of hops
- UCS explores the lowest-cost path first to minimize total travel distance

This makes the app a simple but effective example of pathfinding logic in JavaScript.

## Project Structure

- index.html: app structure and UI layout
- style.css: styling for the campus map and result panels
- script.js: graph data, algorithms, route rendering, and interaction logic
- README.md: project documentation

## Run the Project Locally

You can run this project without any build tools.

### Option 1: Open directly in a browser

1. Download or clone the project.
2. Open index.html in your browser.
3. Select a start and destination and click Find Route.

### Option 2: Serve it locally

From the project folder, run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Usage

1. Choose a starting location.
2. Choose a destination.
3. Select the algorithm:
   - BFS for fewest stops
   - UCS for shortest distance
4. Click Find Route.
5. Review the highlighted route and route details.

## Example Scenario

If a student wants to travel from the Main Gate to the Hostel, the app can compute a route and compare which algorithm returns the preferred result:

- BFS may choose the route with fewer stops
- UCS may prefer the route with the lowest total distance

## Technologies Used

- HTML
- CSS
- JavaScript

## License

This project is provided for educational and demonstration purposes.

## Author

Created as a campus navigation and graph-search demonstration project.
