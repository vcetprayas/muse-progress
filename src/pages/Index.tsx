import React, { useState } from 'react';
import { Timeline, Highlight } from '@/components/Timeline';
import { ConfidenceMeter } from '@/components/ConfidenceMeter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const sampleHighlights: Highlight[] = [
  {
    timestamp_start: 15,
    timestamp_end: 25,
    label: "Great eye contact and confident opening",
    severity: 1
  },
  {
    timestamp_start: 67,
    timestamp_end: 89,
    label: "Excellent technical explanation",
    severity: 1
  },
  {
    timestamp_start: 145,
    timestamp_end: 152,
    label: "Filler words detected (um, uh)",
    severity: 2
  },
  {
    timestamp_start: 203,
    timestamp_end: 210,
    label: "Strong problem-solving approach",
    severity: 1
  },
  {
    timestamp_start: 278,
    timestamp_end: 285,
    label: "Missed opportunity to ask questions",
    severity: 2
  },
  {
    timestamp_start: 334,
    timestamp_end: 341,
    label: "Weak salary negotiation response",
    severity: 3
  },
  {
    timestamp_start: 445,
    timestamp_end: 467,
    label: "Excellent closing statement",
    severity: 1
  },
];

const getSeverityBadge = (severity: 1 | 2 | 3) => {
  switch (severity) {
    case 1:
      return <Badge className="bg-severity-low/20 text-severity-low border-severity-low/30">Good</Badge>;
    case 2:
      return <Badge className="bg-severity-medium/20 text-severity-medium border-severity-medium/30">Attention</Badge>;
    case 3:
      return <Badge className="bg-severity-high/20 text-severity-high border-severity-high/30">Critical</Badge>;
  }
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const Index = () => {
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [confidenceScore, setConfidenceScore] = useState(0.72);

  const handleHighlightSelect = (highlight: Highlight) => {
    setSelectedHighlight(highlight);
    console.log('Selected highlight:', highlight);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            MirrorMuse
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered interview coaching with real-time feedback and performance insights
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeline Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">Interview Analysis</CardTitle>
                    <CardDescription>Mock Interview - Software Engineer Position</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="border-border/50"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="sm" className="border-border/50">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Timeline
                  highlights={sampleHighlights}
                  onSelect={handleHighlightSelect}
                  duration={500}
                />
                
                {/* Performance Summary */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-severity-low">
                      {sampleHighlights.filter(h => h.severity === 1).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Strengths</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-severity-medium">
                      {sampleHighlights.filter(h => h.severity === 2).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Areas to Improve</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-severity-high">
                      {sampleHighlights.filter(h => h.severity === 3).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Critical Issues</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Highlight Details */}
          <div className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground">
                  {selectedHighlight ? 'Highlight Details' : 'Select a Highlight'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedHighlight ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {formatTime(selectedHighlight.timestamp_start)} - {formatTime(selectedHighlight.timestamp_end)}
                      </span>
                      {getSeverityBadge(selectedHighlight.severity)}
                    </div>
                    <p className="text-foreground">{selectedHighlight.label}</p>
                    <div className="pt-2 border-t border-border/50">
                      <p className="text-sm text-muted-foreground">
                        Click on timeline markers to analyze different moments in your interview.
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Click on any colored marker in the timeline above to see detailed feedback for that moment.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* All Highlights List */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground">All Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {sampleHighlights.map((highlight, index) => (
                    <button
                      key={index}
                      onClick={() => handleHighlightSelect(highlight)}
                      className="w-full text-left p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">
                          {formatTime(highlight.timestamp_start)}
                        </span>
                        {getSeverityBadge(highlight.severity)}
                      </div>
                      <p className="text-sm text-foreground line-clamp-2">
                        {highlight.label}
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Confidence Meter */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground">Confidence Score</CardTitle>
                <CardDescription>Overall interview confidence assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center">
                  <ConfidenceMeter score={confidenceScore} />
                </div>
                <div className="flex gap-2 justify-center flex-wrap">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setConfidenceScore(0.3)}
                    className="border-border/50"
                  >
                    Low (30%)
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setConfidenceScore(0.65)}
                    className="border-border/50"
                  >
                    Medium (65%)
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setConfidenceScore(0.85)}
                    className="border-border/50"
                  >
                    High (85%)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;