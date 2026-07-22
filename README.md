# ✨ SnapUI

Build beautiful, responsive user interfaces faster with modern copy-paste React components designed for customization, scalability, and production-ready performance.

---

## 🌐 Live Demo

🔗 https://snap-ui-two.vercel.app/

---

## 📖 Overview

SnapUI is a modern React component collection built with Tailwind CSS.  
It provides clean, reusable, and customizable UI components that developers can instantly copy and use in their projects.

Inspired by modern design systems like:
- shadcn/ui
- Material UI
- Vercel
- Linear

---

## ⚡ Features

- 🎨 Modern and clean UI
- 🌙 Dark mode support
- 📦 Copy-paste ready components
- ⚛️ Built with React + Tailwind CSS
- 📱 Fully responsive
- ♿ Accessibility-focused
- 🧩 Compound component patterns
- 🚀 Fast and lightweight
- 🔥 Developer-friendly documentation

---

## 🛠️ Tech Stack

- React.js
- Vite
- Tailwind CSS
- React Router DOM

---

## 📂 Project Structure

```bash
src/
│
├── components/
│   ├── ui/
│   ├── layout/
│   └── docs/
│
├── pages/
├── context/
├── routes/
└── assets/
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/snap-ui.git
```

### 2. Navigate into the project

```bash
cd snap-ui
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start development server

```bash
npm run dev
```

---

## 📦 Example Usage

```jsx
import { Card } from "@/components/ui/Card";

export default function Example() {
  return (
    <Card className="w-full max-w-sm">
      <Card.Header>Card Title</Card.Header>

      <Card.Body>
        This is a simple card description.
      </Card.Body>

      <Card.Footer>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Action
        </button>
      </Card.Footer>
    </Card>
  );
}
```

---

## 🌙 Dark Mode

SnapUI includes built-in dark mode support using:
- React Context API
- Tailwind dark mode classes
- localStorage persistence
- System theme detection

---

## 🎯 Goals

The goal of SnapUI is to:
- Simplify frontend development
- Help developers ship UI faster
- Provide customizable component architecture
- Improve developer experience

---

## 🚀 Deployment

SnapUI is deployed on Vercel.

For SPA routing support, the project includes:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

Feel free to fork the project and open a pull request.

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Built with ❤️ by Subham Saha.
