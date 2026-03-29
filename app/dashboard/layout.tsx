import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <DashboardLayout
      artistName={session.user.name || "Artist"}
      artistImage={session.user.image || null}
    >
      {children}
    </DashboardLayout>
  );
}
