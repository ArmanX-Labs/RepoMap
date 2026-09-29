# RepoMap
Explore unfamiliar codebases visually.

RepoMap turns GitHub repositories into interactive architecture maps. It analyzes source code, extracts files, modules, functions, imports, and call relationships, and presents them as an explorable graph.

Live Demo: [repomap.armanx.online](https://repomap.armanx.online/)

<p align="center">
  <img src="./client/public/screenshot.png" alt="RepoMap Spatial Graph" width="100%" />
</p>
<p align="center">
  <em>Navigate huge codebases visually with auto-generated dependency graphs.</em>
</p>

## Why RepoMap?
Understanding an unfamiliar codebase can be difficult.
Developers often have to jump between directory trees, files, imports, function definitions, and documentation just to understand how a system fits together.

RepoMap provides a visual starting point.
Instead of navigating a repository only as a collection of files, you can explore its structure as a connected graph:

```text
Repository 
│ 
├── src/ 
│   ├── api/ 
│   │   ├── routes.ts 
│   │   └── controller.ts 
│   │ 
│   ├── services/ 
│   │   └── auth.ts 
│   │ 
│   └── database/ 
│       └── user.ts 
└── ...
```

RepoMap connects these relationships and lets you move from high-level architecture to individual functions and their call relationships.

## Features

### Interactive Codebase Graph
Explore repositories as an interactive 2D graph.
- Files and directories
- Module dependencies
- Imports and exports
- Functions and classes
- Function call relationships
- Connected nodes and execution paths

### AST-Based Analysis
RepoMap analyzes source code rather than relying only on directory structure.
The parser extracts structural information from supported source files and converts it into a graph representation used by the frontend.

### Function & Call Tracing
Inspect how functions are connected across a codebase.
For example:
`API Route ↓ Controller ↓ Service ↓ Database`

Select nodes to inspect their relationships and navigate through callers and callees.

### Source Inspection
Open files directly from the graph and inspect their source code without leaving the application.

### AI-Assisted Explanations
RepoMap can use AI providers to explain architectural concepts and selected pieces of code.
The AI layer is designed as a provider-based system so different models can be used without changing the core repository analysis pipeline.

### Search & Navigation
Search across the generated graph and jump directly to files, folders, or functions.
This is particularly useful for larger repositories where displaying every node simultaneously would make the graph difficult to navigate.

### Large Repository Support
RepoMap includes optimizations for larger codebases, including:
- Cached repository analysis
- Large-repository rendering modes
- Graph filtering
- Search across the complete graph
- Background freshness checks

### Smart Caching
RepoMap caches repository analysis locally using IndexedDB.
The system also tracks repository commit hashes so that cached graphs can be refreshed when the remote repository changes.

### Architecture Export
Export generated architecture diagrams for use in:
- Documentation
- Design discussions
- Presentations
- Architecture reviews

Supported export formats include Draw.io diagrams and graph image/PDF exports.

## How It Works
RepoMap follows a pipeline from repository URL to interactive graph.

```text
GitHub Repository 
       │ 
       ▼ 
Repository Clone 
       │ 
       ▼ 
Source Scanner 
       │ 
       ▼ 
AST / Dependency Analysis 
       │ 
       ▼ 
Graph Generation 
       │ 
       ▼ 
Graph JSON 
       │ 
       ▼ 
React Flow 
       │ 
       ▼ 
Interactive Explorer
```

**1. Connect**
Paste a public GitHub repository URL into RepoMap.

**2. Clone**
The backend creates a temporary copy of the repository for analysis.

**3. Parse**
The parser scans the repository and extracts relevant source-code relationships.

**4. Build the Graph**
The extracted information is converted into a graph containing nodes and edges representing relationships within the codebase.

**5. Explore**
The frontend renders the graph using React Flow.
Users can zoom from the repository-level structure into individual files, functions, and relationships.

**6. Inspect & Explain**
Users can inspect source code and optionally use the AI assistant to understand selected components.

## Architecture
RepoMap is organized into three primary components:

```text
RepoMap 
│ 
├── client/ 
│   └── Next.js / React frontend 
│ 
├── server/ 
│   └── Express API and repository processing 
│ 
└── parser/ 
    └── Source analysis and graph generation
```

### Client
The frontend is built with:
- Next.js
- React
- React Flow
- Tailwind CSS
- IndexedDB
- TypeScript

Responsibilities include:
- Graph visualization
- Repository exploration
- Source inspection
- Search and navigation
- Local caching
- Graph exports
- AI interaction

### Server
The backend is built with:
- Node.js
- Express
- TypeScript
- simple-git

Responsibilities include:
- Repository cloning
- Analysis orchestration
- Cache management
- API endpoints
- AI provider integration

### Parser
The parser is responsible for transforming source code into structured repository information.
It handles tasks such as:
- File scanning
- Import extraction
- Dependency resolution
- Function extraction
- Call extraction
- Graph construction

## Technology Stack

### Frontend
| Technology | Purpose |
| --- | --- |
| Next.js | Application framework |
| React | UI |
| React Flow | Graph visualization |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| IndexedDB | Local persistence |
| Vitest | Frontend testing |

### Backend
| Technology | Purpose |
| --- | --- |
| Node.js | Runtime |
| Express | API server |
| TypeScript | Backend development |
| simple-git | Repository operations |
| Docker | Containerized development |

### AI
RepoMap currently supports multiple AI providers through a provider-based architecture.
AI functionality is used for tasks such as:
- Code explanations
- Architectural summaries
- Repository understanding

## Getting Started

### Prerequisites
Make sure you have:
- Node.js 18+
- npm
- Git
- Docker (optional)

### Clone the repository
```bash
git clone https://github.com/ArmanX-Labs/RepoMap.git 
cd RepoMap
```

### Backend
```bash
cd server 
npm install
```

Create your environment file:
```bash
cp .env.example .env
```

Configure the required environment variables:
```env
PORT=5001 
GEMINI_API_KEY=your_gemini_api_key 
GROQ_API_KEY=your_groq_api_key
```

Start the development server:
```bash
npm run dev
```

The backend will run on:
`http://localhost:5001`

### Frontend
Open another terminal:
```bash
cd client 
npm install
```

Create the environment file:
```bash
cp .env.example .env
```

Configure:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

Start the frontend:
```bash
npm run dev
```

The application will be available at:
`http://localhost:3000`

### Docker
RepoMap can also be run using Docker.

From the repository root:
```bash
docker-compose up --build
```

To run in the background:
```bash
docker-compose up -d --build
```

To stop the containers:
```bash
docker-compose down
```

## Development
RepoMap is actively developed as an open-source project.
If you want to work on the project locally:

```bash
git clone https://github.com/ArmanX-Labs/RepoMap.git 
cd RepoMap
```

Then follow the frontend and backend setup instructions above.

Before opening a pull request:
- Create a feature or fix branch.
- Keep changes focused.
- Add or update tests where appropriate.
- Run the relevant test/build commands.
- Update documentation when behavior changes.
- Open a pull request with a clear description.

## Contributing
Contributions are welcome.
You can contribute by:
- Reporting bugs
- Suggesting features
- Improving the parser
- Adding language support
- Improving graph layouts
- Improving performance
- Adding tests
- Improving documentation
- Working on AI integrations
- Improving accessibility and UX

Please read:
- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)

If you are unsure where to start, open an issue describing what you would like to work on.

## Roadmap
Some areas we are exploring include:
- Broader programming-language support
- More accurate cross-file call resolution
- Improved large-repository rendering
- Vector-based graph exports
- More graph layouts
- Improved dependency and data-flow analysis
- Better AI-assisted repository exploration
- More automated testing
- Improved contributor tooling
- Performance improvements for very large repositories

The roadmap may change as the project evolves and as contributors experiment with new ideas.

## Known Limitations
RepoMap is still under active development.
Some limitations include:
- Analysis accuracy depends on language and parser support.
- Very large repositories can produce extremely dense graphs.
- Raster-based graph exports have practical browser and resolution limits.
- AI explanations depend on the configured model provider.
- Private repositories are not currently supported through the public repository workflow.

These limitations are part of the current development roadmap.

## Open Source
RepoMap is released under the MIT License.
See [LICENSE](LICENSE) for the complete license text.

## Links
- Live Demo: [https://repomap.armanx.online](https://repomap.armanx.online/)
- GitHub: [https://github.com/ArmanX-Labs/RepoMap](https://github.com/ArmanX-Labs/RepoMap)
- Organization: [https://github.com/ArmanX-Labs](https://github.com/ArmanX-Labs)

### Built under ArmanX-Labs
RepoMap is an open-source project developed under ArmanX-Labs, an independent open-source lab focused on developer tools, AI, and automation.
We are interested in building tools that make software development easier to understand, navigate, and automate.

If RepoMap is useful to you, consider ⭐ starring the repository, opening an issue, or contributing.
