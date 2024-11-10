import { Manifest } from "deno-slack-sdk/mod.ts";

export default Manifest({
  name: "maven-slack-app",
  description: "Manage your Maven account and tasks directly from Slack",
  icon: "assets/maven_icon.png",
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
  },
  outgoingDomains: [], // No external domains needed yet
});