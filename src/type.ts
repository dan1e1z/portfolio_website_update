import { ForwardRefExoticComponent, RefAttributes } from "react";
import { IconType } from "react-icons";

export interface File {
  name: string;
  type: "file";
  icon?: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
  parent?: string;
  index?: number;
}

export interface Directory {
  name: string;
  type: "directory";
  contents?: (File | Directory)[];
  icon?: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
  parent?: string;
}

export type FileSystemItem = File | Directory;

export interface IconProps {
  className?: string;
}

export interface Skill {
  name: string;
  icon: IconType;
  level: string;
  description: string;
}
