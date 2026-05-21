"use client";

import { useState } from "react";

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [atsResult, setAtsResult] = useState<any>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  async function handleUpload() {
    if (!file) {
      setMessage("Please select a PDF");
      return;
    }

    if (file.type !== "application/pdf") {
      setMessage("Only PDF files are allowed");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setMessage("PDF must be under 5MB");
      return;
    }

    if (!jobDescription) {
      setMessage("Please paste a job description");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setMessage("Uploading resume...");

      // 1. Upload PDF → extract text
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error(uploadData.error || "Upload failed");
      }

      const resumeText = uploadData.text;

      if (!resumeText) {
        throw new Error("No resume text returned from upload API");
      }

      setMessage("Running ATS analysis...");

      // 2. Send to ATS scoring API
      const atsResponse = await fetch("/api/ats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      });

      const atsData = await atsResponse.json();

      if (!atsResponse.ok) {
        throw new Error(atsData.error || "ATS analysis failed");
      }

      setAtsResult(atsData);

      setMessage("Analysis complete!");

      console.log("ATS RESULT:", atsData);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Upload failed");
    }
  }

  return (
    <div className="mt-8 flex flex-col gap-4 max-w-lg">
      {/* FILE INPUT */}
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {/* JOB DESCRIPTION INPUT */}
      <textarea
        placeholder="Paste job description here"
        className="border p-2 w-full"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      {/* BUTTON */}
      <button
        onClick={handleUpload}
        className="border rounded p-3 hover:bg-gray-100"
      >
        Analyze Resume
      </button>

      {/* STATUS */}
      <p>{message}</p>

      {/* RESULTS */}
      {atsResult && (
        <div className="mt-4 p-3 border rounded">
          <h3 className="font-bold text-lg">
            Match Score: {atsResult.matchScore}%
          </h3>

          <p className="mt-2 font-semibold">Missing Keywords:</p>

          <ul className="list-disc pl-5">
            {atsResult.missingKeywords?.map((k: string) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}