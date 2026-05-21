import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ✅ IMPORTANT: import ONLY the real function safely
const pdfParse = require("pdf-parse/lib/pdf-parse.js");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const data = await pdfParse(buffer);

    return NextResponse.json({
      text: data.text || "",
      pages: data.numpages || 0,
    });

  } catch (err: any) {
    console.error("UPLOAD ERROR:", err);

    return NextResponse.json(
      { error: err.message || "PDF parsing failed" },
      { status: 500 }
    );
  }
}