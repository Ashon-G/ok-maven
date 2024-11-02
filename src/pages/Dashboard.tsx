import { TaskList } from "@/components/dashboard/TaskList";
import { Chat } from "@/components/dashboard/Chat";

const Dashboard = () => {
  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <TaskList />
        <Chat />
      </div>
    </div>
  );
};

export default Dashboard;