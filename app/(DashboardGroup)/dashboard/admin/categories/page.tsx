
import { getAllAdminCategories } from "@/service/admin.services";
import CategoriesClient from "./CategoriesClient";

export const metadata = {
  title: "FixItNow | Categories Management Page",
  description: "Manage and oversee all categories in the FixItNow platform.",
};

export default async function CategoriesPage() {
  const result = await getAllAdminCategories();
  // console.log(result)

  if (!result.success) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            Failed to load categories
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {result.message}
          </p>
        </div>
      </div>
    );
  }

  return <CategoriesClient categories={result.data ?? []} />;
}