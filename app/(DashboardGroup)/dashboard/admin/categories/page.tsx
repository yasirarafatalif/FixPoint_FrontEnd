import { getAllAdminCategories } from "@/service/adminCategoryService";
import CategoriesClient from "./CategoriesClient";

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