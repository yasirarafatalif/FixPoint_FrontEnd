import { getAllAdminUsers } from "@/service/adminUserService";
import UsersClient from "./UsersClient";


export default async function AdminUsersPage() {
  const response = await getAllAdminUsers();

  const result = response;

  // console.log(result.data);

  if (!result.success) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-red-500">
          {result.message}
        </p>
      </div>
    );
  }

  return (
    <UsersClient users={result.data ?? []} />
  );
}