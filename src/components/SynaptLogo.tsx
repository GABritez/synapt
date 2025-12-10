import { cn } from "@/lib/utils";

interface SynaptLogoProps {
  className?: string;
  size?: number;
}

export function SynaptLogo({ className, size = 32 }: SynaptLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
    >
      <rect width="32" height="32" rx="6" className="fill-primary"/>
      <path d="M6 10H26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="stroke-primary-foreground"/>
      <path d="M6 16H18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="stroke-primary-foreground"/>
      <path d="M22 16H26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="stroke-primary-foreground"/>
      <path d="M6 22H26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="stroke-primary-foreground"/>
    </svg>
  );
}
