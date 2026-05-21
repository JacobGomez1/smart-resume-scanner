import ResumeUpload from "@/components/ResumeUpload";

export default function Home() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold">
        Smart Resume Scanner
      </h1>

      <p className="mt-4 text-gray-600">
        Upload your resume and compare it against job descriptions.
      </p>

      <ResumeUpload />
    </main>
  );
}