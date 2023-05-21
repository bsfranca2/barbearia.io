import { useRouter } from "next/router";
import { NewEmployeeForm } from "~/components/dashboard/new-employee-form";
import { DashboardPageHeader } from "~/components/dashboard/page-header";
import { api } from "~/lib/api";
import { type CreateEmployeeInput } from "~/lib/validations/employee";

export default function NewEmployeePage() {
  const createEmployee = api.employees.create.useMutation();
  const router = useRouter();

  async function onSubmit(form: CreateEmployeeInput) {
    if (createEmployee.isLoading) return;
    await createEmployee.mutateAsync(form);
    await router.push("/dashboard/colaboradores");
  }

  return (
    <>
      <DashboardPageHeader title="Cadastro de colaborador" />
      <NewEmployeeForm
        isSubmitting={createEmployee.isLoading}
        onSubmit={onSubmit}
      />
    </>
  );
}
