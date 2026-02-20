# 🍽 SmartCaf

<div align="center">
    <img src="https://readme-typing-svg.herokuapp.com/?lines=Welcome+to+SmartCaf!+🍽️;Smart+Cafeteria+Management+System;Software+Engineering+I+Project;Complete+SDLC+Documentation;Analysis+%26+Design+Phase;&size=28&center=true&width=600" alt="Typing SVG"/>
</div>

![student panel](/images/student-panel.png)

![GitHub repo size](https://img.shields.io/github/repo-size/Mr-MRF-Dev/SmartCaf-Software-Engineering-I-Project)
[![GitHub License](https://img.shields.io/github/license/Mr-MRF-Dev/SmartCaf-Software-Engineering-I-Project)](/LICENSE)

## 📋 Overview

**SmartCaf** (اسمارت کف) is a comprehensive Software Engineering I project at Isfahan University of Technology ([IUT](https://iut.ac.ir/)) for a modern smart cafeteria reservation system. The repository includes both the full software engineering documentation (analysis & design artifacts) and a working **Next.js web frontend** that demonstrates the system.

## 🎯 Project Objectives

- Design an innovative solution for university cafeteria reservation management
- Apply software engineering principles and methodologies
- Create comprehensive documentation following industry standards
- Develop detailed requirements specifications and process models
- Build a functional frontend prototype demonstrating the designed system
- Demonstrate proficiency in software analysis, design, and implementation

## 🚀 Key Features

The SmartCaf system is designed to streamline university cafeteria operations with:

- **Smart Reservation System**: Browse meals by type (breakfast/lunch/dinner) with a Farsi calendar and reserve food
- **AI-Powered Suggestions**: Intelligent meal recommendations based on user preferences and history
- **Order History & Reviews**: Track past orders, rate meals, and leave comments
- **Inventory Management**: Automated stock tracking and low-stock alerts (admin)
- **Payment & Wallet**: Digital wallet top-up and payment management
- **Analytics Dashboard**: Insights into sales, popular items, and daily statistics (admin)
- **User Management**: Separate interfaces for students and administrators
- **Help & Support**: FAQ system with searchable error codes and ticket-based support
- **Full RTL/Persian UI**: Complete Farsi interface with Jalali calendar and Vazirmatn font
- **Dark Mode**: System-wide light/dark theme toggle

## 📁 Repository Structure

```plaintext
SmartCaf-Software-Project/
├── docs/                          # Software Engineering documentation
│   ├── activity-diagram/          # UML Activity Diagrams
│   ├── class-diagram/             # UML Class Diagrams
│   ├── communication-diagram/     # UML Communication Diagrams
│   ├── package-diagram/           # UML Package Diagrams
│   ├── process-model/             # Business process models
│   ├── proposal/                  # Project proposal & feasibility
│   ├── requirements/              # SRS (functional & non-functional)
│   ├── sequence-diagram/          # UML Sequence Diagrams
│   ├── state-diagram/             # UML State Diagrams
│   ├── use-case-description/      # Detailed use case descriptions
│   ├── use-case-diagram/          # UML Use Case Diagrams
│   ├── user-story/                # Agile user stories
│   └── windows-navigation-diagram/ # UI flow & screen transitions
│
├── src/                           # Next.js frontend application
│   ├── public/                    # Static assets
│   └── src/
│       ├── app/                   # App Router pages
│       │   ├── login/             # Login + forgot password
│       │   ├── admin/             # Admin panel (6 sub-pages)
│       │   └── student/           # Student panel (6 sub-pages)
│       ├── components/            # Reusable UI components (shadcn/ui)
│       ├── hooks/                 # Custom React hooks
│       └── lib/                   # Mock data & utilities
│
├── LICENSE
└── README.md
```

## 📚 Documentation

The `docs/` folder contains a complete set of Software Engineering artifacts. Each document follows standard UML conventions.

| Artifact | Description |
| --- | --- |
| Activity Diagrams | Flow of activities: ordering, payment, inventory |
| Class Diagrams | Static structure: classes, attributes, relationships |
| Communication Diagrams | Object interactions & message exchanges |
| Package Diagrams | Logical grouping & dependencies between packages |
| Process Models | High-level & detailed operational workflows |
| Proposal | Problem statement, scope, feasibility |
| Requirements (SRS) | Functional & non-functional requirements |
| Sequence Diagrams | Time-ordered interactions for key scenarios |
| State Diagrams | Lifecycle & state transitions of entities |
| Use Case Descriptions | Structured textual descriptions of behavior |
| Use Case Diagrams | System boundaries, actors, interactions |
| User Stories | Agile user stories for all roles |
| Windows Navigation Diagrams | UI flow & screen transitions for user interfaces |

## 💻 Frontend Application

The `src/` folder contains a fully functional **Next.js 16** frontend prototype. See [src/README.md](src/README.md) for detailed setup instructions, tech stack, and project structure.

### Quick Start

```bash
cd src
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) — login with `admin`/`admin` (admin panel) or any 5+ character username (student panel).

### Tech Stack Highlights

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui · Recharts · react-day-picker (Farsi) · Vazirmatn font · Sonner · next-themes

## 🧠 Educational Purpose

This project is intended for **academic use** in the _Software Engineering I_ course and demonstrates:

- Application of UML and modeling techniques
- Requirement analysis and documentation skills
- Structured system design thinking
- End-to-end implementation from design to prototype
- Modern web development with Next.js and React
- Team-based software engineering practices

## 👥 Team Members

The project is a collaborative effort by the following team members:

- [Alipour8](https://github.com/Alipour8)
- [Amir Hossein Soleimani](https://github.com/amirsoleimani7)
- [Amier11ac](https://github.com/Amier11ac)
- [Mr MRF Dev](https://github.com/Mr-MRF-Dev)

## 🤝 Contributing

We welcome any contributions you may have. If you're interested in helping out, fork the repository
and create an [Issue](https://github.com/Mr-MRF-Dev/SmartCaf-Software-Engineering-I-Project/issues) or
[PR](https://github.com/Mr-MRF-Dev/SmartCaf-Software-Engineering-I-Project/pulls).

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE) file for details.
