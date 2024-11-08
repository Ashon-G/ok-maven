import { TaskList } from "@/components/dashboard/TaskList";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { useAuth } from "@/components/auth/AuthProvider";
import { StrictMode } from "react";

const Tasks = () => {
  const { session } = useAuth();
  const isFounder = session?.user?.user_metadata?.user_type === "founder";

  return (
    <StrictMode>
      {isFounder && <ProjectForm />}
      <TaskList />
    </StrictMode>
  );
};

export default Tasks;