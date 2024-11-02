import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { AssignmentDialog } from "./AssignmentDialog";

export const AdminAssignments = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: currentUserProfile } = useQuery({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("user_type")
        .eq("id", session?.user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: founders } = useQuery({
    queryKey: ["founders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name")
        .eq("user_type", "founder");

      if (error) throw error;
      return data;
    },
  });

  const { data: mavens } = useQuery({
    queryKey: ["mavens"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name")
        .eq("user_type", "maven");

      if (error) throw error;
      return data;
    },
  });

  const { data: assignments, isLoading } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("founder_maven_assignments")
        .select(`
          id,
          created_at,
          founder:profiles!founder_maven_assignments_founder_id_fkey(
            id,
            full_name
          ),
          maven:profiles!founder_maven_assignments_maven_id_fkey(
            id,
            full_name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createAssignment = useMutation({
    mutationFn: async ({ founderId, mavenId }: { founderId: string; mavenId: string }) => {
      if (!session?.user.id) throw new Error("No user found");
      if (currentUserProfile?.user_type !== "admin") {
        throw new Error("Only admins can create assignments");
      }

      const { error } = await supabase.from("founder_maven_assignments").insert({
        founder_id: founderId,
        maven_id: mavenId,
        assigned_by: session.user.id,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      setIsOpen(false);
      toast({
        title: "Success",
        description: "Assignment created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const existingAssignments = assignments?.map(assignment => ({
    founder_id: assignment.founder.id,
    maven_id: assignment.maven.id,
  })) || [];

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Assignment
        </Button>
      </div>

      <AssignmentDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onCreateAssignment={(founderId, mavenId) =>
          createAssignment.mutate({ founderId, mavenId })
        }
        isPending={createAssignment.isPending}
        founders={founders || []}
        mavens={mavens || []}
        existingAssignments={existingAssignments}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Founder</TableHead>
              <TableHead>Maven</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments?.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>{assignment.founder.full_name}</TableCell>
                <TableCell>{assignment.maven.full_name}</TableCell>
                <TableCell>
                  {new Date(assignment.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};