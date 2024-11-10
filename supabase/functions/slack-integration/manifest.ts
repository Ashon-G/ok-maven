import { Manifest } from "deno-slack-sdk/mod.ts";

export default Manifest({
  name: "Maven Assistant",
  description: "Manage your Maven account and tasks directly from Slack",
  icon: "assets/maven_icon.png",
  displayInformation: {
    name: "Maven Assistant",
    description: "Your Maven workspace assistant",
    backgroundColor: "#4F46E5"
  },
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "incoming-webhook"
  ],
  features: {
    appHome: {
      messagesTabEnabled: true,
      messagesTabReadOnlyEnabled: false,
    },
    socketMode: {
      enabled: true,
      appToken: Deno.env.get('SLACK_APP_TOKEN'),
    },
    slashCommands: [
      {
        command: "/maven-task-create",
        description: "Create a new task",
        usage_hint: "[title] [description] [@assignee]"
      },
      {
        command: "/maven-task-edit",
        description: "Edit an existing task",
        usage_hint: "[task-id] [field] [new-value]"
      },
      {
        command: "/maven-task-delete",
        description: "Delete a task",
        usage_hint: "[task-id]"
      },
      {
        command: "/maven-chat",
        description: "Send a message to a Maven user",
        usage_hint: "[@user] [message]"
      }
    ]
  },
  outgoingDomains: [],
});