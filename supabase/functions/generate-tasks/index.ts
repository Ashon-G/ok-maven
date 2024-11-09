import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { projectId, founderId } = await req.json();
    console.log('Received request for project:', projectId, 'from founder:', founderId);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch project details
    const { data: project, error: projectError } = await supabase
      .from('founder_projects')
      .select('description, title')
      .eq('id', projectId)
      .single();

    if (projectError) {
      console.error('Error fetching project:', projectError);
      throw projectError;
    }

    if (!project?.description) {
      throw new Error('Project description is required');
    }

    // Use HuggingFace's free inference API
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/opt-1.3b",
      {
        headers: { 
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: `Given this project:
          Title: ${project.title}
          Description: ${project.description}
          
          Generate 3-5 specific, actionable tasks that would help complete this project.
          Format your response as a JSON array of objects with 'title' and 'description' fields.
          Example format: [{"title": "Task 1", "description": "Description 1"}]`
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.statusText}`);
    }

    const result = await response.text();
    
    // Parse the response to extract tasks
    let tasks;
    try {
      // The model might return the JSON string within the text, so we need to find and extract it
      const jsonMatch = result.match(/\[.*\]/);
      if (!jsonMatch) {
        // If no JSON array is found, create a default task structure
        tasks = [{
          title: "Review Project Requirements",
          description: `Review and analyze the project: ${project.title}`,
        }, {
          title: "Create Project Timeline",
          description: "Develop a detailed timeline with milestones",
        }, {
          title: "Initial Implementation",
          description: "Begin working on the core project components",
        }];
      } else {
        tasks = JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Error parsing AI response:', error);
      // Fallback to default tasks if parsing fails
      tasks = [{
        title: "Project Analysis",
        description: `Analyze requirements for: ${project.title}`,
      }, {
        title: "Project Planning",
        description: "Create detailed project plan and timeline",
      }, {
        title: "Implementation Start",
        description: "Begin initial implementation phase",
      }];
    }

    // Create tasks in the database
    const { data: createdTasks, error: tasksError } = await supabase
      .from('tasks')
      .insert(
        tasks.map((task: any) => ({
          title: task.title,
          description: task.description,
          created_by: founderId,
          status: 'pending'
        }))
      )
      .select();

    if (tasksError) {
      console.error('Error creating tasks:', tasksError);
      throw tasksError;
    }

    return new Response(
      JSON.stringify({ tasks: createdTasks }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-tasks function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});