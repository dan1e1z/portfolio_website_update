import { Directory } from "@/type";
import { Folder, FileType2, Home } from "lucide-react";

export const fileSystem: Directory = {
  name: "home",
  type: "directory",
  icon: Home,
  contents: [
    {
      name: "about",
      type: "directory",
      icon: Folder,
      contents: [
        {
          name: "AboutMe",
          type: "file",
          icon: FileType2,
        },
        {
          name: "Education",
          type: "file",
          icon: FileType2,
        },
        {
          name: "Interests",
          type: "file",
          icon: FileType2,
        },
        {
          name: "Hobbies",
          type: "file",
          icon: FileType2,
        },
      ],
    },
    {
      name: "projects",
      type: "directory",
      icon: Folder,
      contents: [
        {
          name: "Project1",
          type: "file",
          icon: FileType2,
        },
        {
          name: "Project2",
          type: "file",
          icon: FileType2,
        },
        {
          name: "Project3",
          type: "file",
          icon: FileType2,
        },
      ],
    },
    {
      name: "contacts",
      type: "directory",
      icon: Folder,
      contents: [],
    },
    {
      name: "skills",
      type: "directory",
      icon: Folder,
      contents: [
        {
          name: "Skills",
          type: "file",
          icon: FileType2,
        },
      ],
    },
  ],
};
