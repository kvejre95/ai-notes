"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { PenTool, FileText, FolderKanban, NotebookIcon } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";

export default function LandingPage() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (user) {
      createUser({
        userName: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl,
      });
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-50">
      {/* Navigation */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <NotebookIcon className="w-6 h-6 text-gray-800" />
            <span className="text-lg font-semibold text-gray-800">NOTE-ME</span>
          </div>
        </Link>
        <div>
          {user ? (
            <UserButton />
          ) : (
            <Link href="/sign-in">
              <Button className="px-5 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 py-16 bg-white shadow-sm">
        <span className="px-4 py-1 text-sm bg-blue-100 text-blue-700 rounded-full mb-4">
          Smart Productivity Tool
        </span>
        <h1 className="text-4xl font-bold text-gray-900 max-w-xl">
          Your AI-Powered Note-Taking Assistant
        </h1>
        <p className="text-lg text-gray-600 mt-3 max-w-lg">
          Effortlessly take notes, annotate PDFs, and leverage AI for smarter productivity.
        </p>
        <Link href={user ? "/dashboard" : "/sign-up"}>
          <Button className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition">
            {user ? "Go to Dashboard" : "Get Started"}
          </Button>
        </Link>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 py-12">
        <FeatureCard
          title="AI Assistance"
          description="Get AI-powered suggestions to enhance your notes and summaries."
          icon={<PenTool className="w-6 h-6 text-blue-600" />}
        />
        <FeatureCard
          title="PDF Viewer & Annotation"
          description="View, highlight, and annotate PDFs seamlessly."
          icon={<FileText className="w-6 h-6 text-blue-600" />}
        />
        <FeatureCard
          title="Organized Workspace"
          description="Manage and access your documents with an intuitive dashboard."
          icon={<FolderKanban className="w-6 h-6 text-blue-600" />}
        />
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gray-900 text-gray-400 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <NotebookIcon className="w-5 h-5 text-white" />
            <span className="text-white font-medium">NOTE-ME</span>
          </div>
          <div className="flex gap-5 mt-3 md:mt-0">
            {["Features", "Pricing", "Support", "Terms", "Privacy"].map((item, i) => (
              <a key={i} href="#" className="hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}


