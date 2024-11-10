import { TaskList } from "@/components/dashboard/TaskList";
import { useAuth } from "@/components/auth/AuthProvider";
import { StrictMode } from "react";

const Tasks = () => {
  const { session } = useAuth();

  return (
    <StrictMode>
      <TaskList />
    </StrictMode>
  );
};

export default Tasks;