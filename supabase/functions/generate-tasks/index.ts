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

    console.log('Fetched project:', project);

    // Generate tasks using OpenAI
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a project manager that breaks down projects into actionable tasks. 
            Generate 3-5 specific, actionable tasks that a maven (expert consultant) should complete to help with this project.
            Each task should have a title and description.
            Format the response as a JSON array of objects with 'title' and 'description' fields.
            Make tasks specific and actionable.`
          },
          {
            role: 'user',
            content: `Project Title: ${project.title}\nProject Description: ${project.description}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const aiData = await openAIResponse.json();
    console.log('OpenAI response:', aiData);

    if (!aiData.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI');
    }

    let tasks;
    try {
      tasks = JSON.parse(aiData.choices[0].message.content);
      if (!Array.isArray(tasks)) {
        throw new Error('OpenAI response is not an array');
      }
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      throw new Error('Failed to parse OpenAI response into tasks');
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

    console.log('Successfully created tasks:', createdTasks);

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