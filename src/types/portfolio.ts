import { LucideIcon } from "lucide-react";

export interface Skill {
  name: string;
  level: number;
  icon: LucideIcon;
  category: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  grade: string;
}
