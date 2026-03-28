# Project Submission Details

## 1. Project Title
**Autonomous KYC/AML Compliance Agent**

## 2. Project Description

**Problem Statement:**
In the financial and cybersecurity sectors, Know Your Customer (KYC) and Anti-Money Laundering (AML) compliance represents a massive, multi-billion-dollar operational bottleneck. Every time a new corporate client is onboarded, human compliance officers must manually verify the entity to prevent fraud, terrorism financing, and regulatory violations. This process is deeply flawed due to:
*   **Fragmented Data Silos:** Crucial data is scattered across thousands of disparate, often poorly designed government websites (e.g., state-level Secretary of State portals, UK Companies House, international watchlists).
*   **High-Friction Manual Labor:** Analysts waste countless hours manually navigating dynamic sites, bypassing captchas, and cross-referencing extracted names against financial sanction lists (such as OFAC).
*   **Fragile Tech Status Quo:** Traditional web scrapers break instantly when a government website updates its UI, and simple LLM APIs lack the capability to independently navigate multi-step search workflows.

**Objective:**
To transform this manual compliance bottleneck into a seamless, 40-second autonomous workflow by building an intelligent, stealth web agent capable of navigating the web exactly like a human analyst—handling dynamic rendering, complex UIs, and multi-step transactions at machine speed.

**Methodology & Scope:**
Our proposed solution decouples the intelligence of web execution from orchestration, providing a robust and non-blocking architecture. The workflow follows this automated methodology:
1.  **Entity Ingestion:** The user inputs a target company name into a premium, cybersecurity-styled React/TypeScript terminal dashboard.
2.  **Dynamic Navigation:** Utilizing the TinyFish Web Agent API, the system autonomously navigates to the relevant corporate registry websites.
3.  **Extraction & Discovery:** The stealth agent interacts with search forms, waits for dynamic web tables to render, bypasses basic cookie walls, and successfully extracts the target company's Board of Directors.
4.  **Sanction Cross-Referencing:** The agent seamlessly takes the extracted director names, navigates to international financial sanction watchlists (e.g., US Treasury OFAC), inputs the data, and checks for direct regulatory/sanction hits.
5.  **Live Dossier Compilation:** A Java Spring Boot (WebFlux) backend securely manages the concurrent agent sessions and streams the extracted JSON assessment data live to the frontend via Server-Sent Events (SSE). This builds a unified, live-updating risk dossier directly on the user's dashboard.

**Additional Details:**
The system is built entirely around an Agentic Web Architecture. By proxying connections through a central nervous system (Spring Boot WebFlux), we prevent API key leakage while maintaining real-time responsiveness. This approach solves the "brittle scraper" problem by dynamically adapting to UI changes using the underlying TinyFish Web Agent API, ensuring sustainable, long-term compliance automation without immense maintenance overhead.

## 3. Built With

**Core Agentic Intelligence:**
*   TinyFish Agentic Web Framework (Web Agent API)

**Backend Architecture:**
*   Java (Version 17+)
*   Spring Boot 3.2
*   Spring WebFlux (Reactive Server-Sent Events Architecture)

**Frontend Presentation:**
*   React
*   TypeScript
*   Vite
*   Node.js (Version 18+)

**Use Case Scenario:**
*   HackerEarth Hackathon Submission
