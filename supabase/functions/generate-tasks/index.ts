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
    console.log('Starting task generation for project:', projectId, 'founder:', founderId);

    if (!projectId || !founderId) {
      throw new Error('Project ID and Founder ID are required');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Supabase client initialized');

    const { data: project, error: projectError } = await supabase
      .from('founder_projects')
      .select('description, title, goals, target_audience, timeline')
      .eq('id', projectId)
      .single();

    if (projectError) {
      console.error('Error fetching project:', projectError);
      throw new Error(`Failed to fetch project: ${projectError.message}`);
    }

    if (!project?.description) {
      throw new Error('Project description is required');
    }

    console.log('Project fetched successfully:', project.title);

    const hfToken = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN');
    if (!hfToken) {
      throw new Error('Missing Hugging Face access token');
    }

    const hf = new HfInference(hfToken);
    console.log('HuggingFace client initialized');

    const prompt = `As a project manager, analyze this project and create 3-5 specific, actionable tasks:

Project Title: ${project.title}
Project Description: ${project.description}
Goals: ${project.goals?.join(', ') || 'Not specified'}
Target Audience: ${project.target_audience || 'Not specified'}
Timeline: ${project.timeline || 'Not specified'}

Generate tasks in this exact JSON format:
[
  {
    "title": "Task title here",
    "description": "Detailed task description here"
  }
]

Make tasks specific, actionable, and focused on project implementation.`;

    console.log('Sending prompt to HuggingFace');

    // Using a faster and more reliable model
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const result = await hf.textGeneration({
        model: "mistralai/Mistral-7B-Instruct-v0.1",
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          top_p: 0.95,
        },
      });

      clearTimeout(timeout);
      console.log('Received response from HuggingFace');

      const jsonMatch = result.generated_text.match(/\[[\s\S]*\]/);
      let tasks;

      if (jsonMatch) {
        try {
          tasks = JSON.parse(jsonMatch[0]);
          console.log('Successfully parsed tasks:', tasks);
        } catch (parseError) {
          console.error('Error parsing tasks JSON:', parseError);
          throw new Error('Failed to parse AI response');
        }
      } else {
        console.log('No JSON found in response, using fallback tasks');
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
        throw new Error(`Failed to create tasks: ${tasksError.message}`);
      }

      console.log('Tasks created successfully:', createdTasks);

      return new Response(
        JSON.stringify({ tasks: createdTasks }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (aiError) {
      clearTimeout(timeout);
      if (aiError.name === 'AbortError') {
        throw new Error('AI request timed out after 30 seconds');
      }
      console.error('Error in AI processing:', aiError);
      throw new Error(`AI processing failed: ${aiError.message}`);
    }
  } catch (error) {
    console.error('Error in generate-tasks function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        details: error.stack
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});