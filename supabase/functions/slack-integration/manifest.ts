import { Manifest } from "deno-slack-sdk/mod.ts";

export default Manifest({
  name: "Maven Assistant",
  description: "Manage your Maven account and tasks directly from Slack",
  icon: "assets/maven_icon.png",
  displayInformation: {
    name: "Maven Assistant",
    description: "Your Maven workspace assistant",
    backgroundColor: "#4F46E5" // Indigo color that matches Maven's theme
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
  },
  outgoingDomains: [], // No external domains needed yet
});