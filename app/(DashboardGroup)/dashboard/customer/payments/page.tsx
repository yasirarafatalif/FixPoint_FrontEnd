
import { getMyPayments } from "@/service/paymentService";
import MyPaymentsClient, { Payment } from "./_components/MyPaymentsClient";

export const metadata ={
  title:"FixItNow | Payments Page"
}


export default async function MyPaymentsPage() {
  const result = await getMyPayments();
  console.log("getMyPayments result:", result);

  const payments: Payment[] = result.success
    ? result.data
    : [];

  return (
    <MyPaymentsClient
      initialPayments={payments}
      initialError={result.success ? "" : result.message}
    />
  );
}
