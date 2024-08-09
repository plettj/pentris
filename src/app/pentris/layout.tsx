import PentrisProviders from "@/components/layouts/PentrisProviders";

export default async function PentrisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PentrisProviders>{children}</PentrisProviders>;
}
