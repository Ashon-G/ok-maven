import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const handleSlackCommands = async (
  formData: FormData,
  supabase: ReturnType<typeof createClient>
) => {
  const command = formData.get('command');
  const user_id = formData.get('user_id');

  switch (command) {
    case '/maven-status':
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user_id)
        .single();

      return new Response(JSON.stringify({
        response_type: 'ephemeral',
        text: `Your Maven status:\nType: ${profile?.user_type}\nSkillset: ${profile?.maven_skillset || 'Not set'}`
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    case '/maven-tasks':
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .eq('assigned_to', user_id)
        .eq('status', 'pending');

      const taskList = tasks?.map(task => `• ${task.title}`).join('\n') || 'No pending tasks';
      
      return new Response(JSON.stringify({
        response_type: 'ephemeral',
        text: `Your pending tasks:\n${taskList}`
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    default:
      return new Response(JSON.stringify({
        response_type: 'ephemeral',
        text: 'Unknown command'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
  }
};