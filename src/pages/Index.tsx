import React, { useState } from 'react';
import { Timeline, Highlight } from '@/components/Timeline';
import { ConfidenceMeter } from '@/components/ConfidenceMeter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GeminiResponse {
  metrics: {
    confidence_overall_0_1: number;
    speaking_pace: number;
    filler_word_count: number;
  };
  highlights: Highlight[];
  rewrites: Array<{
    original: string;
    rewritten: string;
    timestamp_start: number;
    timestamp_end: number;
    improvement_reason: string;
  }>;
}

const sampleGeminiResponse: GeminiResponse = {
  metrics: {
    confidence_overall_0_1: 0.72,
    speaking_pace: 145,
    filler_word_count: 12
  },
  highlights: [
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
    {
      timestamp_start: 112,
      timestamp_end: 118,
      label: "Poor posture and fidgeting",
      severity: 3
    },
    {
      timestamp_start: 256,
      timestamp_end: 263,
      label: "Unclear response structure",
      severity: 3
    }
  ],
  rewrites: [
    {
      original: "Um, I think I'm pretty good at programming and stuff. I've done some projects.",
      rewritten: "I have strong programming skills demonstrated through several successful projects. For example, I built a full-stack e-commerce application using React and Node.js that handles over 1000 daily transactions.",
      timestamp_start: 145,
      timestamp_end: 152,
      improvement_reason: "More specific, confident, and includes concrete examples with metrics"
    },
    {
      original: "I don't know, maybe around 70k? Is that okay?",
      rewritten: "Based on my research and experience level, I'm looking for a salary in the range of $75,000 to $85,000. This aligns with market rates for similar positions and reflects the value I can bring to your team.",
      timestamp_start: 334,
      timestamp_end: 341,
      improvement_reason: "Shows preparation, confidence, and provides a professional negotiation approach"
    }
  ]
};

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
  
  // Use Gemini response data
  const geminiData = sampleGeminiResponse;
  const topSuggestions = geminiData.highlights
    .filter(h => h.severity >= 2)
    .sort((a, b) => b.severity - a.severity)
    .slice(0, 3);

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
                  highlights={geminiData.highlights}
                  onSelect={handleHighlightSelect}
                  duration={500}
                />
                
                {/* Performance Summary */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-severity-low">
                      {geminiData.highlights.filter(h => h.severity === 1).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Strengths</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-severity-medium">
                      {geminiData.highlights.filter(h => h.severity === 2).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Areas to Improve</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-severity-high">
                      {geminiData.highlights.filter(h => h.severity === 3).length}
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
                  {geminiData.highlights.map((highlight, index) => (
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
                  <ConfidenceMeter score={geminiData.metrics.confidence_overall_0_1} />
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  AI-generated confidence assessment
                </div>
              </CardContent>
            </Card>

            {/* Top Suggestions */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground">Top Improvement Areas</CardTitle>
                <CardDescription>Focus on these critical areas first</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg border border-border/50 bg-accent/20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">
                          {formatTime(suggestion.timestamp_start)}
                        </span>
                        {getSeverityBadge(suggestion.severity)}
                      </div>
                      <p className="text-sm text-foreground">
                        {suggestion.label}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Answer Rewrite */}
            {geminiData.rewrites[0] && (
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-foreground">Answer Improvement</CardTitle>
                  <CardDescription>
                    {formatTime(geminiData.rewrites[0].timestamp_start)} - See how to improve your response
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Original:</h4>
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <p className="text-sm text-foreground italic">
                        "{geminiData.rewrites[0].original}"
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Improved:</h4>
                    <div className="p-3 rounded-lg bg-severity-low/10 border border-severity-low/20">
                      <p className="text-sm text-foreground">
                        "{geminiData.rewrites[0].rewritten}"
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">
                      <strong>Why this is better:</strong> {geminiData.rewrites[0].improvement_reason}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;