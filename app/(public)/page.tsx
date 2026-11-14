
import { HomeCategoryItem, HomeService } from "./_components/home.types";
import HomeHero from "./_components/HomeHero";
import HomeCategories from "./_components/HomeCategories";
import FeaturedServices from "./_components/FeaturedServices";
import HowItWorks from "./_components/HowItWorks";
import WhyChooseUs from "./_components/WhyChooseUs";
import Footer from "./_components/HomeFooter";
import { getCategories } from "@/service/categories";
import { getAllServices } from "@/service/service.services";
export const metadata={
  title:"FixtItNow | Home Page"
}



export const dynamic = "force-dynamic";

export default async function HomePage() {
  let services: HomeService[] = [];

  try {
    const result = await getAllServices();

    services = Array.isArray(result?.data)
      ? (result.data as HomeService[])
      : [];
  } catch (error) {
    console.error("Home services fetching failed:", error);
  }

 

  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-slate-50">

      <HomeHero />

      <HomeCategories categories={categories.data} />

      <FeaturedServices services={services} />
      <HowItWorks></HowItWorks>
      <WhyChooseUs/>

      <Footer />

    </main>
  );
}
