import { api } from "~/lib/api";
import { DashboardPageHeader } from "~/components/dashboard/page-header";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";

export default function EmployeesPage() {
  const employees = api.employees.getAll.useQuery(undefined, { retry: false });
  return (
    <>
      <DashboardPageHeader
        title="Colaboradores"
        action={
          <Link
            href="/dashboard/colaboradores/cadastrar"
            className={buttonVariants()}
          >
            Adicionar colaborador
          </Link>
        }
      />
      <div>
        {employees.error && <p>Erro ao carregar colaboradores</p>}
        {employees.isLoading && <p>Carregando...</p>}
        {!employees.isLoading &&
          employees.data &&
          employees.data.length === 0 && <p>Sem colaboradores</p>}
        {!employees.isLoading &&
          employees.data &&
          employees.data.length > 0 && (
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Colaborador
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Telefone
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Função
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              <span className="sr-only">Editar</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {employees.data.map((employee) => (
                            <tr key={employee.name}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {employee.name}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {employee.email}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {employee.phone}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {employee.roles.join(",")}
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <a
                                  href="#"
                                  className="text-indigo-600 hover:text-indigo-900"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    //   crudModalRef.current?.open(employee);
                                  }}
                                >
                                  Editar
                                  <span className="sr-only">
                                    , {employee.name}
                                  </span>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </>
  );
}
