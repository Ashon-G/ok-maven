import { AdminUserList } from "@/components/admin/UserList";
import { AdminAssignments } from "@/components/admin/Assignments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="mt-4">
          <AdminUserList />
        </TabsContent>
        <TabsContent value="assignments" className="mt-4">
          <AdminAssignments />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;