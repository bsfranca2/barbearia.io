import { type Metadata } from "next";
import { getBarbershopBySlug } from "./getBarbershop";

interface RootLayoutProps {
  params: {
    barbershop: string;
  };
  children: React.ReactNode;
}

export async function generateMetadata({
  params: { barbershop: slug },
}: RootLayoutProps): Promise<Metadata> {
  const barbershop = await getBarbershopBySlug({ slug });
  return {
    title: {
      default: barbershop.name,
      template: `%s - ${barbershop.name}`,
    },
  };
}

export default function RootLayout({ children }: RootLayoutProps) {
  return children;
}
