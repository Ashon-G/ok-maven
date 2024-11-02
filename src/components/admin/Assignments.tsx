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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

export const AdminAssignments = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFounder, setSelectedFounder] = useState("");
  const [selectedMaven, setSelectedMaven] = useState("");
  const { session } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
    mutationFn: async () => {
      if (!session?.user.id) throw new Error("No user found");

      const { error } = await supabase.from("founder_maven_assignments").insert({
        founder_id: selectedFounder,
        maven_id: selectedMaven,
        assigned_by: session.user.id,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      setIsOpen(false);
      setSelectedFounder("");
      setSelectedMaven("");
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

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Assignment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Founder</label>
                <Select
                  value={selectedFounder}
                  onValueChange={setSelectedFounder}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a founder" />
                  </SelectTrigger>
                  <SelectContent>
                    {founders?.map((founder) => (
                      <SelectItem key={founder.id} value={founder.id}>
                        {founder.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Maven</label>
                <Select value={selectedMaven} onValueChange={setSelectedMaven}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a maven" />
                  </SelectTrigger>
                  <SelectContent>
                    {mavens?.map((maven) => (
                      <SelectItem key={maven.id} value={maven.id}>
                        {maven.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={() => createAssignment.mutate()}
                disabled={!selectedFounder || !selectedMaven || createAssignment.isPending}
              >
                {createAssignment.isPending && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                Create Assignment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
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