import { Manifest } from "deno-slack-sdk/mod.ts";

export default Manifest({
  name: "Maven Assistant",
  description: "Your Maven workspace assistant",
  icon: "assets/maven_icon.png",
  displayInformation: {
    name: "Maven Assistant",
    description: "Manage your Maven team and tasks directly from Slack",
    backgroundColor: "#004492",
    longDescription: "Manage your Maven team and tasks directly from Slack. Communicate directly with your Mavens and assign new tasks or edit and delete old ones directly from your slack dashboard."
  },
  botScopes: [
    "commands",
    "chat:write",
    "users:read"
  ],
  features: {
    appHome: {
      messagesTabEnabled: true,
      messagesTabReadOnlyEnabled: false,
    },
    slashCommands: [
      {
        command: "/maven-task-create",
        description: "Creates a new task (founders/admins only)",
        usage_hint: "title | description"
      },
      {
        command: "/maven-task-edit",
        description: "Edits a task (based on user permissions)",
        usage_hint: "task-id | field | new-value"
      },
      {
        command: "/maven-task-delete",
        description: "Deletes a task (founders/admins only)",
        usage_hint: "task-id"
      },
      {
        command: "/maven-chat",
        description: "Sends a message to a Maven user",
        usage_hint: "@user message"
      }
    ]
  },
  settings: {
    orgDeployEnabled: false,
    socketModeEnabled: false,
    tokenRotationEnabled: false
  },
});