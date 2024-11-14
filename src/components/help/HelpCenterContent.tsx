import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const HelpCenterContent = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="founders" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="founders">For Founders</TabsTrigger>
          <TabsTrigger value="mavens">For Mavens</TabsTrigger>
        </TabsList>

        <TabsContent value="founders">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started as a Founder</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I find the right Maven?</AccordionTrigger>
                    <AccordionContent>
                      Browse through our Maven Treasury to find talented students based on their skills, experience, and availability. You can filter by expertise, university, and more.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How does pricing work?</AccordionTrigger>
                    <AccordionContent>
                      Mavens set their own rates based on their experience level. You can view pricing details on each Maven's profile and discuss project specifics before starting.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What kind of projects can I post?</AccordionTrigger>
                    <AccordionContent>
                      You can post any type of project related to software development, marketing, design, or business development. We recommend breaking down larger projects into smaller, manageable tasks.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mavens">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started as a Maven</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I create a compelling profile?</AccordionTrigger>
                    <AccordionContent>
                      Focus on highlighting your skills, relevant coursework, and any previous projects or internships. Add a professional photo and keep your availability status up to date.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I get my first project?</AccordionTrigger>
                    <AccordionContent>
                      Complete your profile, set competitive rates, and actively browse through available projects. Engage with founders by asking thoughtful questions about their projects.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do payments work?</AccordionTrigger>
                    <AccordionContent>
                      Payments are processed securely through our platform. Once a project milestone is completed and approved, the payment will be released to your connected bank account.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};