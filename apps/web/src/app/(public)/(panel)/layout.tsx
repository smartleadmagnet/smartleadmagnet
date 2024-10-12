import WebisteLayout from "@/components/Layout/website";


export default async function DashboardLayout({
                                                children,
                                              }: {
  children: React.ReactNode;
}) {


  return (
    <WebisteLayout>
      {children}
    </WebisteLayout>
  );
}
