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
    console.log('Starting task generation for project:', projectId, 'founder:', founderId);

    if (!projectId || !founderId) {
      throw new Error('Project ID and Founder ID are required');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!supabaseUrl || !supabaseKey || !openAIApiKey) {
      throw new Error('Missing required environment variables');
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

    console.log('Sending prompt to OpenAI');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a helpful project manager that generates specific, actionable tasks.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Received response from OpenAI');

      const generatedText = data.choices[0].message.content;
      const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
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