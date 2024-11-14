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
                      <p className="space-y-4">
                        Our Maven Treasury allows you to browse through talented students based on their skills, experience, and availability. You can filter by expertise, university, and availability to find the perfect match. Each Maven's profile includes detailed information about their education and work experience. You can also review Maven ratings and reviews from previous projects to make an informed decision. Once you find a potential Maven, you can contact them directly through our platform to discuss your project needs.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How does pricing work?</AccordionTrigger>
                    <AccordionContent>
                      <p className="space-y-4">
                        Our pricing structure is designed to be transparent and flexible. Mavens set their own hourly or project-based rates which you can view on their profiles. You can negotiate terms directly with Mavens to find an arrangement that works for both parties. All payments are processed securely through our platform, and we offer a money-back guarantee for unsatisfactory work to ensure your peace of mind.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What kind of projects can I post?</AccordionTrigger>
                    <AccordionContent>
                      <p className="space-y-4">
                        You can post a wide variety of projects on our platform. This includes software development and technical projects, marketing and social media campaigns, business development and market research initiatives, design and creative work, as well as data analysis and financial modeling tasks. For the best results, we recommend breaking down larger projects into smaller, manageable tasks that can be easily tracked and completed.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I manage my projects?</AccordionTrigger>
                    <AccordionContent>
                      <p className="space-y-4">
                        Our platform provides comprehensive project management tools to help you stay organized and efficient. You'll have access to a Kanban board for task tracking, real-time chat with your Maven team, and robust file sharing and collaboration tools. We also offer integration with popular tools like Jira and Slack to streamline your workflow. Our milestone tracking and payment management features help ensure smooth project progression and timely completion.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>What if I'm not satisfied with the work?</AccordionTrigger>
                    <AccordionContent>
                      <p className="space-y-4">
                        We have several measures in place to ensure your satisfaction. Projects are structured with clear milestones and associated payments, allowing you to review work at each stage. You can communicate directly with Mavens to address any concerns, and our platform provides mediation if needed. We offer a money-back guarantee for unresolved issues, and you always have the option to switch Mavens if necessary. Your satisfaction is our top priority.
                      </p>
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
                      <p className="space-y-4">
                        A strong profile is essential for success on our platform. Start with a professional photo and write an engaging bio that highlights your unique skills and experiences. Include comprehensive information about your education and coursework, as well as any relevant work experience and projects. Make sure to showcase your technical skills and certifications, and if applicable, include a portfolio of your past work. Setting clear availability helps founders know when you can take on new projects.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I get my first project?</AccordionTrigger>
                    <AccordionContent>
                      <p className="space-y-4">
                        Starting your journey as a Maven begins with completing your profile thoroughly. Set competitive rates based on your experience level and browse available projects that match your skill set. When you find interesting opportunities, send personalized proposals to founders explaining why you're the perfect fit. Make sure to highlight relevant coursework and skills that align with their needs. Being responsive and professional in your communications will help you stand out from other candidates.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do payments work?</AccordionTrigger>
                    <AccordionContent>
                      <p className="space-y-4">
                        Our payment system is designed to be secure and efficient for all parties. You have the flexibility to set your own hourly or project-based rates. When a project begins, payments are held in escrow until agreed-upon milestones are completed. Once work is approved, funds are automatically transferred to your connected bank account. You can choose between weekly payments or milestone-based payments, and our system includes built-in protection against payment disputes.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>What tools and resources are available?</AccordionTrigger>
                    <AccordionContent>
                      <p className="space-y-4">
                        We provide a comprehensive suite of tools to help you succeed in your projects. This includes a detailed project management dashboard, time tracking tools, and integrated communication platforms. You'll have access to file sharing and collaboration features, along with integration options for popular development tools. We also offer various skills development resources to help you grow professionally and deliver better results to your clients.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How do I maintain a good rating?</AccordionTrigger>
                    <AccordionContent>
                      <p className="space-y-4">
                        Maintaining a high rating is crucial for long-term success on our platform. Regular communication with founders is essential - keep them updated on your progress and any challenges you encounter. Meeting deadlines and delivering quality work at each milestone is crucial. Always maintain professional conduct and be open to feedback from your clients. Document your work thoroughly and be proactive in addressing any concerns that arise during the project.
                      </p>
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