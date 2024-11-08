import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProjectAnalysisProps {
  projectId: string;
}

export const ProjectAnalysis = ({ projectId }: ProjectAnalysisProps) => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const analyzeProject = async () => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-project', {
        body: { projectId },
      });

      if (error) throw error;
      
      const parsedAnalysis = JSON.parse(data.analysis);
      setAnalysis(parsedAnalysis);
      
      toast({
        title: "Analysis Complete",
        description: "AI has analyzed your project successfully.",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Could not complete the project analysis.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={analyzeProject}
        disabled={isAnalyzing}
        className="w-full"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing Project...
          </>
        ) : (
          "Analyze with AI"
        )}
      </Button>

      {analysis && (
        <Card className="p-6 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Summary</h3>
            <p className="text-sm text-gray-600">{analysis.summary}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Key Strengths</h3>
            <ul className="list-disc pl-4 text-sm text-gray-600">
              {analysis.strengths.map((strength: string, index: number) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Potential Challenges</h3>
            <ul className="list-disc pl-4 text-sm text-gray-600">
              {analysis.challenges.map((challenge: string, index: number) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Market Opportunities</h3>
            <ul className="list-disc pl-4 text-sm text-gray-600">
              {analysis.opportunities.map((opportunity: string, index: number) => (
                <li key={index}>{opportunity}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Recommendations</h3>
            <ul className="list-disc pl-4 text-sm text-gray-600">
              {analysis.recommendations.map((recommendation: string, index: number) => (
                <li key={index}>{recommendation}</li>
              ))}
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
};