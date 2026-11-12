
import { getCategories } from "@/service/categories";
import CategoriesClient from "./_components/CategoriesClient";
// import { getAdminCategories } from "@/service/adminDashboardService";

export const metadata = {
  title: "FixItNow | Categories",
  description: "Manage all service categories.",
};

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return <CategoriesClient categories={categories.data} />;
}
