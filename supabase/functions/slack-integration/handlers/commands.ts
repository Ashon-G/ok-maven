import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const handleSlackCommands = async (
  formData: FormData,
  supabase: ReturnType<typeof createClient>
) => {
  const command = formData.get('command') as string;
  const text = formData.get('text') as string;
  const user_id = formData.get('user_id') as string;
  
  // Get user profile to check permissions
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user_id)
    .single();

  if (!profile) {
    return new Response(JSON.stringify({
      response_type: 'ephemeral',
      text: 'Error: User not found in Maven platform'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  switch (command) {
    case '/maven-task-create': {
      if (profile.user_type !== 'founder' && profile.user_type !== 'admin') {
        return new Response(JSON.stringify({
          response_type: 'ephemeral',
          text: 'Only founders and admins can create tasks'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const [title, description, assignee] = text.split('|').map(s => s.trim());
      
      if (!title) {
        return new Response(JSON.stringify({
          response_type: 'ephemeral',
          text: 'Please provide a task title: /maven-task-create title | description | @assignee'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const { data: task, error } = await supabase
        .from('tasks')
        .insert({
          title,
          description,
          created_by: user_id,
          assigned_to: assignee?.replace(/[<@>]/g, ''),
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        return new Response(JSON.stringify({
          response_type: 'ephemeral',
          text: `Error creating task: ${error.message}`
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({
        response_type: 'in_channel',
        text: `Task created: ${task.title}`
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    case '/maven-task-edit': {
      const [taskId, field, value] = text.split('|').map(s => s.trim());
      
      if (!taskId || !field || !value) {
        return new Response(JSON.stringify({
          response_type: 'ephemeral',
          text: 'Please provide task ID, field, and new value: /maven-task-edit task-id | field | new-value'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Check if user can edit this task
      const { data: task } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', taskId)
        .single();

      if (!task) {
        return new Response(JSON.stringify({
          response_type: 'ephemeral',
          text: 'Task not found'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const canEdit = 
        profile.user_type === 'admin' ||
        (profile.user_type === 'founder' && task.created_by === user_id) ||
        (profile.user_type === 'maven' && task.assigned_to === user_id);

      if (!canEdit) {
        return new Response(JSON.stringify({
          response_type: 'ephemeral',
          text: 'You do not have permission to edit this task'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const { error } = await supabase
        .from('tasks')
        .update({ [field]: value })
        .eq('id', taskId);

      if (error) {
        return new Response(JSON.stringify({
          response_type: 'ephemeral',
          text: `Error updating task: ${error.message}`
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({
        response_type: 'in_channel',
        text: `Task ${taskId} updated: ${field} = ${value}`
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    case '/maven-task-delete': {
      const taskId = text.trim();
      
      if (!taskId) {
        return new Response(JSON.stringify({
          response_type: 'ephemeral',
          text: 'Please provide a task ID: /maven-task-delete task-id'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Check if user can delete this task
      const { data: task } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', taskId)
        .single();

      if (!task) {
        return new Response(JSON.stringify({
          response_type: 'ephemeral',
          text: 'Task not found'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const canDelete = 
        profile.user_type === 'admin' ||
        (profile.user_type === 'founder' && task.created_by === user_id);

      if (!canDelete) {
        return new Response(JSON.stringify({
          response_type: 'ephemeral',
          text: 'Only admins and task creators can delete tasks'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) {
        return new Response(JSON.stringify({
          response_type: 'ephemeral',
          text: `Error deleting task: ${error.message}`
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({
        response_type: 'in_channel',
        text: `Task ${taskId} has been deleted`
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    case '/maven-chat': {
      const [recipient, ...messageParts] = text.split(' ');
      const message = messageParts.join(' ');
      
      if (!recipient || !message) {
        return new Response(JSON.stringify({
          response_type: 'ephemeral',
          text: 'Please provide a recipient and message: /maven-chat @user message'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const recipientId = recipient.replace(/[<@>]/g, '');

      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: user_id,
          receiver_id: recipientId,
          content: message
        });

      if (error) {
        return new Response(JSON.stringify({
          response_type: 'ephemeral',
          text: `Error sending message: ${error.message}`
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({
        response_type: 'in_channel',
        text: `Message sent to <@${recipientId}>`
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    default:
      return new Response(JSON.stringify({
        response_type: 'ephemeral',
        text: 'Unknown command'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
  }
};