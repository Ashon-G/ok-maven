import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { taskId, title, description, jiraConfig } = await req.json();

    // Create Jira issue
    const jiraResponse = await fetch(`${jiraConfig.jira_host}/rest/api/2/issue`, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${btoa(`${jiraConfig.email}:${jiraConfig.api_token}`)}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        fields: {
          project: {
            key: jiraConfig.jira_project_key,
          },
          summary: title,
          description: description,
          issuetype: {
            name: "Task",
          },
        },
      }),
    });

    if (!jiraResponse.ok) {
      throw new Error(`Failed to create Jira issue: ${await jiraResponse.text()}`);
    }

    const jiraIssue = await jiraResponse.json();

    // Update task with Jira issue key
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const { error: updateError } = await supabaseClient
      .from("tasks")
      .update({ jira_issue_key: jiraIssue.key })
      .eq("id", taskId);

    if (updateError) {
      throw updateError;
    }

    return new Response(
      JSON.stringify({ message: "Jira issue created successfully", key: jiraIssue.key }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});