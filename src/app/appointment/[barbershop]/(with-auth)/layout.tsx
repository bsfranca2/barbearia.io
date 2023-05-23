import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "~/lib/auth";

export default async function AppointmentLayout(
  props: React.PropsWithChildren
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/entrar");
  }

  return props.children;
}
