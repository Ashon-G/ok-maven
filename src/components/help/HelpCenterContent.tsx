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
                      <div className="space-y-2">
                        <p>Browse through our Maven Treasury to find talented students based on their skills, experience, and availability. You can:</p>
                        <ul className="list-disc pl-6">
                          <li>Filter by expertise, university, and availability</li>
                          <li>Review detailed profiles including education and work experience</li>
                          <li>Check Maven ratings and reviews from previous projects</li>
                          <li>Contact Mavens directly through our platform</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How does pricing work?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p>Our pricing structure is transparent and flexible:</p>
                        <ul className="list-disc pl-6">
                          <li>Mavens set their own hourly or project-based rates</li>
                          <li>View detailed pricing on each Maven's profile</li>
                          <li>Negotiate terms directly with Mavens</li>
                          <li>Secure payment processing through our platform</li>
                          <li>Money-back guarantee for unsatisfactory work</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What kind of projects can I post?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p>You can post various types of projects, including:</p>
                        <ul className="list-disc pl-6">
                          <li>Software development and technical projects</li>
                          <li>Marketing and social media campaigns</li>
                          <li>Business development and market research</li>
                          <li>Design and creative work</li>
                          <li>Data analysis and financial modeling</li>
                        </ul>
                        <p>We recommend breaking down larger projects into smaller, manageable tasks for better results.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I manage my projects?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p>Our platform provides comprehensive project management tools:</p>
                        <ul className="list-disc pl-6">
                          <li>Kanban board for task tracking</li>
                          <li>Real-time chat with your Maven team</li>
                          <li>File sharing and collaboration tools</li>
                          <li>Integration with popular tools like Jira and Slack</li>
                          <li>Milestone tracking and payment management</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>What if I'm not satisfied with the work?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p>We have several measures in place to ensure your satisfaction:</p>
                        <ul className="list-disc pl-6">
                          <li>Clear milestone-based payment structure</li>
                          <li>Direct communication with Mavens to address concerns</li>
                          <li>Platform mediation for dispute resolution</li>
                          <li>Money-back guarantee for unresolved issues</li>
                          <li>Option to switch Mavens if needed</li>
                        </ul>
                      </div>
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
                      <div className="space-y-2">
                        <p>Build a strong profile by including:</p>
                        <ul className="list-disc pl-6">
                          <li>Professional photo and bio</li>
                          <li>Detailed education and coursework information</li>
                          <li>Previous work experience and projects</li>
                          <li>Technical skills and certifications</li>
                          <li>Portfolio of past work (if applicable)</li>
                          <li>Clear availability schedule</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I get my first project?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p>Follow these steps to land your first project:</p>
                        <ul className="list-disc pl-6">
                          <li>Complete your profile with detailed information</li>
                          <li>Set competitive rates based on your experience</li>
                          <li>Browse available projects in your skill area</li>
                          <li>Send personalized proposals to founders</li>
                          <li>Highlight relevant coursework and skills</li>
                          <li>Be responsive and professional in communications</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do payments work?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p>Our payment system is designed to be secure and efficient:</p>
                        <ul className="list-disc pl-6">
                          <li>Set your own hourly or project-based rates</li>
                          <li>Payments are held in escrow until milestones are completed</li>
                          <li>Automatic transfers to your connected bank account</li>
                          <li>Weekly or milestone-based payment options</li>
                          <li>Protection against payment disputes</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>What tools and resources are available?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p>We provide various tools to help you succeed:</p>
                        <ul className="list-disc pl-6">
                          <li>Project management dashboard</li>
                          <li>Time tracking tools</li>
                          <li>Communication platforms</li>
                          <li>File sharing and collaboration features</li>
                          <li>Integration with popular development tools</li>
                          <li>Skills development resources</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How do I maintain a good rating?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p>Tips for maintaining a high rating:</p>
                        <ul className="list-disc pl-6">
                          <li>Communicate regularly with founders</li>
                          <li>Meet deadlines and milestones</li>
                          <li>Provide regular progress updates</li>
                          <li>Maintain professional conduct</li>
                          <li>Ask for feedback and implement improvements</li>
                          <li>Document your work thoroughly</li>
                        </ul>
                      </div>
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