import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2';

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

    // Initialize HuggingFace client
    const hf = new HfInference(Deno.env.get('HUGGING_FACE_ACCESS_TOKEN'));

    // Create a structured prompt
    const prompt = `As a project manager, analyze this project and create 3-5 specific, actionable tasks:

Project Title: ${project.title}
Project Description: ${project.description}

Generate tasks in this exact JSON format:
[
  {
    "title": "Task title here",
    "description": "Detailed task description here"
  }
]

Make tasks specific, actionable, and focused on project implementation.`;

    try {
      // Use text generation with a larger model
      const result = await hf.textGeneration({
        model: "bigscience/bloomz-560m", // A good balance between quality and speed
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          top_p: 0.95,
        },
      });

      // Extract JSON from the response
      const jsonMatch = result.generated_text.match(/\[[\s\S]*\]/);
      let tasks;

      if (jsonMatch) {
        tasks = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback tasks if parsing fails
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
      console.error('Error in AI processing:', error);
      // Return fallback tasks on AI error
      const fallbackTasks = [{
        title: "Review Project Scope",
        description: `Analyze and break down the project: ${project.title}`,
      }, {
        title: "Create Project Timeline",
        description: "Develop a detailed timeline with key milestones",
      }, {
        title: "Begin Implementation",
        description: "Start working on core project components",
      }];

      const { data: createdTasks, error: tasksError } = await supabase
        .from('tasks')
        .insert(
          fallbackTasks.map((task) => ({
            title: task.title,
            description: task.description,
            created_by: founderId,
            status: 'pending'
          }))
        )
        .select();

      if (tasksError) throw tasksError;

      return new Response(
        JSON.stringify({ tasks: createdTasks }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
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