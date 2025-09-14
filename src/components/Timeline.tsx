import React from 'react';
import { cn } from '@/lib/utils';

export interface Highlight {
  timestamp_start: number;
  timestamp_end: number;
  label: string;
  severity: 1 | 2 | 3;
}

interface TimelineProps {
  highlights: Highlight[];
  onSelect: (highlight: Highlight) => void;
  duration?: number;
  className?: string;
}

const getSeverityColor = (severity: 1 | 2 | 3) => {
  switch (severity) {
    case 1:
      return 'bg-severity-low hover:bg-severity-low/80';
    case 2:
      return 'bg-severity-medium hover:bg-severity-medium/80';
    case 3:
      return 'bg-severity-high hover:bg-severity-high/80';
    default:
      return 'bg-severity-low hover:bg-severity-low/80';
  }
};

const getSeverityLabel = (severity: 1 | 2 | 3) => {
  switch (severity) {
    case 1:
      return 'Good';
    case 2:
      return 'Attention';
    case 3:
      return 'Critical';
    default:
      return 'Good';
  }
};

export const Timeline: React.FC<TimelineProps> = ({ 
  highlights, 
  onSelect, 
  duration = 600, // 10 minutes default
  className 
}) => {
  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Timeline Track */}
      <div className="relative h-3 bg-timeline-track rounded-full overflow-hidden">
        {/* Progress Bar Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-timeline-progress/20 to-timeline-progress/10" />
        
        {/* Highlight Markers */}
        {highlights.map((highlight, index) => {
          const startPosition = (highlight.timestamp_start / duration) * 100;
          const width = ((highlight.timestamp_end - highlight.timestamp_start) / duration) * 100;
          
          return (
            <button
              key={index}
              className={cn(
                "absolute top-0 h-full transition-all duration-200 hover:scale-y-125 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm",
                getSeverityColor(highlight.severity)
              )}
              style={{
                left: `${startPosition}%`,
                width: `${Math.max(width, 0.5)}%`, // Minimum width of 0.5%
              }}
              onClick={() => onSelect(highlight)}
              title={`${highlight.label} (${getSeverityLabel(highlight.severity)})`}
            />
          );
        })}
        
        {/* Clickable Dots for Small Highlights */}
        {highlights.map((highlight, index) => {
          const position = (highlight.timestamp_start / duration) * 100;
          const width = ((highlight.timestamp_end - highlight.timestamp_start) / duration) * 100;
          
          // Only show dots for very small highlights
          if (width > 1) return null;
          
          return (
            <button
              key={`dot-${index}`}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-background transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-lg",
                getSeverityColor(highlight.severity)
              )}
              style={{
                left: `${position}%`,
                transform: 'translateX(-50%) translateY(-50%)',
              }}
              onClick={() => onSelect(highlight)}
              title={`${highlight.label} (${getSeverityLabel(highlight.severity)})`}
            />
          );
        })}
      </div>
      
      {/* Timeline Labels */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0:00</span>
        <span>{Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}</span>
      </div>
      
      {/* Legend */}
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-severity-low rounded-full" />
          <span className="text-muted-foreground">Good</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-severity-medium rounded-full" />
          <span className="text-muted-foreground">Attention</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-severity-high rounded-full" />
          <span className="text-muted-foreground">Critical</span>
        </div>
      </div>
    </div>
  );
};