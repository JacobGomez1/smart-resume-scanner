# Smart Resume Scanner + ATS Analyzer

A full-stack web application that allows users to upload PDF resumes and compare them against job descriptions using a custom ATS (Applicant Tracking System) scoring engine.

## Features

- Upload PDF resumes
- Extract text from resumes
- Paste job descriptions
- Generate ATS match scores
- Detect missing keywords
- Display matched skills and resume insights
- Full frontend ↔ backend integration

## Tech Stack

- Next.js
- React
- TypeScript
- Node.js
- API Routes
- PDF parsing
- Tailwind CSS

## How It Works

1. User uploads a PDF resume
2. Resume text is extracted
3. User pastes a job description
4. ATS scoring analyzes:
   - keyword matches
   - missing keywords
   - match percentage
5. Results are displayed in the UI

## Installation

Clone the repository:

```bash
git clone https://github.com/JacobGomez1/smart-resume-scanner.git
```

Install dependencies:

```bash
pnpm install
```

Run development server:

```bash
pnpm dev
```

Open:

```bash
http://localhost:3000
```

## Future Improvements

- AI-generated resume suggestions
- Smarter ATS scoring algorithms
- Skill extraction
- Resume rewrite recommendations
- Charts and visual analytics
- User dashboard/history

## Project Status

In active development.

Current version includes working resume upload, text extraction, and ATS analysis.
