import type React from "react";
import { Instagram, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SocialButtons: React.FC = () => (
  <div className="flex justify-center items-center gap-6 py-4">
    <a
      href="https://www.instagram.com/daniel_lindsayshad/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button
        size="icon"
        variant="ghost"
        className="rounded-ss bg-gradient-to-br from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600"
      >
        <Instagram className="h-5 w-5 text-white" />
      </Button>
    </a>
    <a
      href="https://www.linkedin.com/in/daniel-lindsay-shad-148073224/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button
        size="icon"
        variant="ghost"
        className="rounded-ss bg-blue-600 text-white hover:bg-blue-700"
      >
        <Linkedin className="h-5 w-5 text-white" />
      </Button>
    </a>
    <a
      href="https://github.com/dan1e1z"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button
        size="icon"
        variant="ghost"
        className="rounded-ss bg-gray-700 text-white hover:bg-gray-800"
      >
        <Github className="h-5 w-5 text-white" />
      </Button>
    </a>
  </div>
);
