# ✦ Neon New Tab

> A futuristic, minimal, productivity-focused Chrome new-tab dashboard built to turn every new tab into a clean workspace.

![Preview](preview.png)

## ✧ Overview

**Neon New Tab** is a custom browser start page designed around focus, productivity, and quick access.

Instead of opening a plain browser tab, you get a polished dashboard with:

- 🕐 Large live clock
- 📅 Current date
- 🌌 Animated constellation-style background
- 🔎 Universal search / command bar
- ✅ Quick task management
- 🎯 Focus timer
- 📝 Scratchpad for temporary notes
- 🔗 Custom quick-access shortcuts
- 📊 Year and day progress indicators
- ⚙️ Settings controls
- ✨ Dark futuristic glassmorphism UI

The goal is simple:

**Open a tab → see what matters → get things done.**

---

## ✦ Features

### 🕐 Live Clock & Date

A large central clock shows the current time with AM/PM, along with the current date.

The interface is designed to keep the clock visually dominant without making the rest of the dashboard feel crowded.

### 🌌 Constellation Background

The background uses a dark space-inspired design with:

- Connected constellation lines
- Glowing points
- Subtle gradients
- Ambient lighting
- Futuristic atmosphere

The background stays subtle so the productivity widgets remain easy to read.

### 🔎 Search & Command Bar

A central search bar lets you quickly:

- Search the web
- Open links
- Type commands
- Access shortcuts

Keyboard-friendly interaction is supported for faster navigation.

### ✅ Tasks

A lightweight task panel lets you add tasks directly from the new tab.

Simply type a task and press **Enter**.

The dashboard keeps the task interface intentionally simple so it doesn't become another complicated productivity app.

### 🎯 Focus Timer

Built-in focus modes provide a quick way to start a focused work session.

Available modes:

- **Focus**
- **Short**
- **Long**

The timer includes simple start and reset controls.

### 📝 Scratchpad

The scratchpad is designed for temporary thoughts, notes, ideas, links, or anything you don't want to lose while browsing.

> Think here. It saves itself.

### 🔗 Quick Links

Frequently used websites can be placed directly on the dashboard for one-click access.

Examples include:

- YouTube
- Google
- GitHub
- AI tools
- Google Maps
- Other custom websites

### 📊 Progress Indicators

Small progress indicators provide a quick visual representation of:

- Year progress
- Day progress

They stay in the background rather than distracting from the main dashboard.

---

## ✦ Design

The interface follows a futuristic **dark glass / neon** visual language.

### Visual direction

- Dark background
- Glassmorphism panels
- Soft borders
- Warm neon highlights
- Subtle glow effects
- Rounded UI components
- Monospace / futuristic typography
- Minimal visual clutter

The design is intended to feel more like a personal command center than a traditional browser homepage.

---

## ✦ Layout

```text
┌──────────────────────────────────────────────────────────────┐
│ Greeting                              Progress       Settings │
│                                                              │
│                         06:34 PM                             │
│                    ───────────────                           │
│                    Friday, October 2                         │
│                                                              │
│                 ┌─────────────────────┐                      │
│                 │ Search / Command     │                      │
│                 └─────────────────────┘                      │
│                                                              │
│       ┌────────────┐  ┌────────────┐  ┌────────────┐         │
│       │   Tasks    │  │   Focus    │  │ Scratchpad │         │
│       │            │  │   25:00    │  │            │         │
│       └────────────┘  └────────────┘  └────────────┘         │
│                                                              │
│                    Quick Links / Apps                        │
└──────────────────────────────────────────────────────────────┘
```

---

## ✦ Tech Stack

> Update this section with the exact technologies used by the project.

- HTML5
- CSS3
- JavaScript
- Browser APIs
- Local Storage
- SVG / Canvas-based visual effects

---

## ✦ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
```

### 2. Enter the project

```bash
cd YOUR-REPOSITORY
```

### 3. Run the project

If it is a simple static project, open:

```text
index.html
```

Or use a local development server:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

---

## ✦ Chrome New Tab Setup

To use the project as a personal Chrome new-tab experience, configure it as a Chrome extension or use the project's supported new-tab setup.

### Extension development

1. Open Chrome.
2. Go to:

```text
chrome://extensions/
```

3. Enable **Developer mode**.
4. Select **Load unpacked**.
5. Choose the project folder.
6. Open a new tab.

> The exact setup depends on the extension structure and `manifest.json` used by the project.

---

## ✦ Project Structure

A typical structure can look like:

```text
neon-new-tab/
│
├── index.html
├── style.css
├── script.js
├── manifest.json
│
├── assets/
│   ├── icons/
│   ├── fonts/
│   └── images/
│
└── README.md
```

---

## ✦ Privacy

This project is designed around a local-first experience.

Personal data such as tasks, notes, and preferences should remain stored locally unless an external service is explicitly added.

No unnecessary account or cloud system is required for the core dashboard.

---

## ✦ Roadmap

Planned improvements can include:

- [ ] More customization options
- [ ] Theme switching
- [ ] Custom backgrounds
- [ ] More clock styles
- [ ] Better task management
- [ ] Keyboard shortcuts
- [ ] More command actions
- [ ] Drag-and-drop quick links
- [ ] Widget customization
- [ ] Additional focus modes
- [ ] Import / export settings
- [ ] Chrome extension polish
- [ ] Performance optimizations
- [ ] Mobile / responsive improvements

---

## ✦ Screenshots

### Main Dashboard

![Main Dashboard](preview.png)

> More screenshots will be added as the project evolves.

---

## ✦ Contributing

Contributions, ideas, UI improvements, and bug reports are welcome.

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Commit them.

```bash
git commit -m "Add your feature"
```

5. Push the branch.

```bash
git push origin feature/your-feature
```

6. Open a Pull Request.

---

## ✦ License

This project is currently available under the license specified in the repository.

If no license has been added yet, add one before distributing the project publicly.

---

<div align="center">

### ✧ Built for focus. Designed for the future. ✧

**Neon New Tab**

</div>
