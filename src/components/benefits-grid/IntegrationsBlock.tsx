import React from "react";
import { Block } from "./Block";
import { CardTitle } from "./CardTitle";
import { CardSubtitle } from "./CardSubtitle";
import { FiBox } from "react-icons/fi";

export const IntegrationsBlock = () => (
  <Block className="col-span-3 overflow-hidden md:col-span-1">
    <div className="flex h-full flex-col justify-between gap-6">
      <div className="relative -mx-6 -mt-6 grid h-full place-content-center overflow-hidden border-b-2 border-zinc-900 bg-zinc-100 shadow-inner shadow-zinc-500">
        <div className="my-6 rounded-lg border-2 border-zinc-900 bg-white p-4 shadow shadow-zinc-500">
          <FiBox className="text-4xl" />
        </div>
      </div>
      <div>
        <CardTitle>Powerful Integrations</CardTitle>
        <CardSubtitle>
          Connect Maven with your favorite tools like Jira, GitHub, and more to streamline your development workflow.
        </CardSubtitle>
      </div>
    </div>
  </Block>
);