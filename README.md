# BrickBytes

> Turn layout plans and static PDFs into interactive, digital sales experiences.

BrickBytes is a premium, coordinate-aware real estate digitization platform. We replace obsolete flat paper plans, static site blueprints, and siloed spreadsheets with immersive, vector-based spatial maps and real-time inventory dashboards designed for modern developers, brokers, and home buyers.

---

## 🏢 What We Do & Our Business

Real estate marketing is historically slow, flat, and fragmented. Buyers struggle to read engineering drafts, brokers coordinate over unstructured channels, and developers manage inventory across multiple offline sheets, leading to double-bookings and friction.

**BrickBytes solves this by digitizing the entire sales experience.** We provide high-end, responsive vector maps that render lot-by-lot availability, custom coordinates, and spatial layouts, backed by automated scheduling and booking systems.

We serve three primary stakeholders:
*   **Buyers**: Interactive lot exploration, drone view overlays, and real-time reservation timers.
*   **Brokers**: Affiliate network workspace to track leads, reserve plots, and schedule site visits.
*   **Developers**: A unified control center to update inventory, manage pricing, and view executive sales metrics.

---

## ⚡ Our Unique Selling Propositions (USPs)

1.  **Precision Meets Presentation**: We blend engineering-grade CAD layout accuracy with high-end, luxury visual design. The interface is optimized for high-value sales where visual premium is non-negotiable.
2.  **Zero-Silo Inventory Sync**: A single, real-time database coordinates plot availability instantly. If a buyer reserves a plot via their portal, the broker's list and developer's admin dashboard update immediately, eliminating manual coordination errors.
3.  **Cross-Spectrum Spatial Visualization**: Support for multiple development archetypes, including gated plotted developments (subdivisions), horizontal villa communities (layouts + paths), and vertical high-rise apartments (exploded 3D floor plate selectors).
4.  **AI-Driven Buyer Guidance**: Integrated spatial assistant answering questions about pricing, dimensions, local regulations, and plot parameters in real time.

---

## 🛠️ Product Ecosystem & Use Cases

*   **Subdivisions & Land Layouts**: Interactive plot-by-plot maps, road width overlays, and reservation timers.
*   **Residential & Gated Communities**: Interactive villa maps, garden tours, and walking path guides.
*   **High-Rise Towers**: Volumetric floor selectors, layout configuration visualizers, and multi-tower maps.

---

## 💻 Technical Architecture

The frontend is built using a modern, fast, and highly responsive web stack:
*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Runtime**: React 19
*   **Styling**: TailwindCSS & Custom Vanilla CSS Variables (supporting custom accent configurations per card)
*   **Animations**: Framer Motion (staggered layouts, spring-based transitions)
*   **Icons**: Lucide React
*   **Language**: TypeScript

---

## 🚀 Getting Started

Follow these steps to set up and run the codebase on your local machine:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 22.18 or later, for the tests) installed.

### 1. Clone the Repository
```bash
git clone https://github.com/utkarsh2302/brickbytes-website-next.js.git
cd brickbytes-website-next.js
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the port indicated in the terminal) in your browser to view the application.

### 4. Run the Tests
Unit tests (`src/**/*.test.ts`) run on Node's built-in test runner, so they need Node 22.18 or later:
```bash
npm test
```

### 5. Build for Production
To generate an optimized build of the application:
```bash
npm run build
npm run start
```
