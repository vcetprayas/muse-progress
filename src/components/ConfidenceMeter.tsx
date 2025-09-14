import React from 'react';
import { cn } from '@/lib/utils';

interface ConfidenceMeterProps {
  score: number; // 0 to 1 float
  className?: string;
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({ 
  score, 
  className 
}) => {
  // Clamp score between 0 and 1
  const clampedScore = Math.max(0, Math.min(1, score));
  const percentage = Math.round(clampedScore * 100);
  
  // Calculate SVG circle properties
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (clampedScore * circumference);
  
  // Determine color based on score thresholds
  const getColorClass = (score: number) => {
    if (score > 0.75) return 'stroke-severity-low'; // green
    if (score >= 0.5) return 'stroke-severity-medium'; // yellow
    return 'stroke-severity-high'; // red
  };
  
  const getTextColorClass = (score: number) => {
    if (score > 0.75) return 'text-severity-low'; // green
    if (score >= 0.5) return 'text-severity-medium'; // yellow
    return 'text-severity-high'; // red
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg 
        width="120" 
        height="120" 
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="hsl(var(--muted))"
          strokeWidth="8"
          fill="transparent"
          className="opacity-20"
        />
        
        {/* Progress circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className={cn(
            "transition-all duration-700 ease-out",
            getColorClass(clampedScore)
          )}
          style={{
            strokeDasharray,
            strokeDashoffset,
          }}
        />
      </svg>
      
      {/* Percentage text in center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn(
          "text-2xl font-bold transition-colors duration-300",
          getTextColorClass(clampedScore)
        )}>
          {percentage}%
        </span>
      </div>
    </div>
  );
};