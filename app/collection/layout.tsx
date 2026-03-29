import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import CollectorLayout from "@/components/collector/CollectorLayout";

export default async function CollectionRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <CollectorLayout userName={session.user.name || "Collector"}>
      {children}
    </CollectorLayout>
  );
}
