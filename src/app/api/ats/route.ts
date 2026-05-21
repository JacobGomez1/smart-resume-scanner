import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function extractKeywords(text: string) {
  const stopwords = new Set([
    "the","and","is","in","at","to","a","of","for","with","on","as","by"
  ]);

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopwords.has(word));
}

function getScore(resume: string, job: string) {
  const resumeWords = extractKeywords(resume);
  const jobWords = extractKeywords(job);

  const resumeSet = new Set(resumeWords);

  let matches = 0;
  const missing: string[] = [];

  for (const word of jobWords) {
    if (resumeSet.has(word)) {
      matches++;
    } else {
      missing.push(word);
    }
  }

  const score = Math.round((matches / jobWords.length) * 100);

  return { score, missing: [...new Set(missing)].slice(0, 20) };
}

export async function POST(req: Request) {
  try {
    const { resumeText, jobDescription } = await req.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: "Missing resumeText or jobDescription" },
        { status: 400 }
      );
    }

    const result = getScore(resumeText, jobDescription);

    return NextResponse.json({
      matchScore: result.score,
      missingKeywords: result.missing,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "ATS scoring failed" },
      { status: 500 }
    );
  }
}