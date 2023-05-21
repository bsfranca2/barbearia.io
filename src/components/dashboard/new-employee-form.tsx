import { MoreHorizontal, Pen, Plus, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactInputMask from "react-input-mask";

import { Label } from "~/components/ui/label";
import { Input, inputClassName } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Checkbox } from "~/components/ui/checkbox";
import { ServiceCard } from "~/components/dashboard/service-card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { type RouterOutputs, api } from "~/lib/api";
import { toast } from "~/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import { useDisclosure } from "~/hooks/use-disclosure";
import {
  type CreateEmployeeInput as FormData,
  createEmployeeSchema as formSchema,
} from "~/lib/validations/employee";
import { Loader2 } from "lucide-react";

// TODO: Move this to a shared file.
type TService = RouterOutputs["services"]["getAll"][0];

type NewEmployeeFormProps = {
  isSubmitting: boolean;
  onSubmit: (formData: FormData) => void;
};

export function NewEmployeeForm({
  isSubmitting,
  onSubmit,
}: NewEmployeeFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isBarber: true,
      isManager: false,
      services: [],
    },
  });

  const services = form.watch("services");

  return (
    <Form {...form}>
      <form
        className="mt-6 space-y-12 lg:max-w-2xl"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <h3 className="text-lg font-medium">Informações Pessoais</h3>
          <p className="text-sm text-muted-foreground">
            Preencha os detalhes básicos do colaborador aqui.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-3">
            <div className="col-span-full">
              <FormField
                control={form.control}
                name="name"
                render={() => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input {...form.register("name")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-full">
              <FormField
                control={form.control}
                name="email"
                render={() => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...form.register("email")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-full">
              <FormField
                control={form.control}
                name="phone"
                render={() => (
                  <FormItem>
                    <FormLabel>Celular</FormLabel>
                    <FormControl>
                      <ReactInputMask
                        type="tel"
                        mask="(99) 99999-9999"
                        className={inputClassName}
                        {...form.register("phone")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-full">
              <Label>Funções/Cargos</Label>
              <FormField
                control={form.control}
                name="isBarber"
                render={({ field }) => (
                  <FormItem className="mt-2 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Barbeiro</FormLabel>
                      <FormDescription>
                        Barbeiro pode visualizar e editar horários.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isManager"
                render={({ field }) => (
                  <FormItem className="mt-2 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Gerente</FormLabel>
                      <FormDescription>
                        Gerente pode adicionar e editar colaboradores, serviços
                        e horários.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-medium">Serviços Associados</h3>
          <p className="text-sm text-muted-foreground">
            Vincule o colaborador aos serviços que ele presta.
          </p>
          <div className="mt-5 ">
            <div className="mb-4 space-y-3">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  action={
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem
                          onClick={
                            // TODO: Edit employee service
                            () => null
                          }
                        >
                          <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            form.setValue(
                              "services",
                              services.filter((item) => item.id !== service.id)
                            )
                          }
                        >
                          <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                          Remover
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  }
                />
              ))}
            </div>
            <AddService
              servicesSelected={services.map((service) => service.id)}
              onAddService={(addServicesList) =>
                form.setValue("services", [
                  ...services,
                  ...addServicesList.map((service) => ({
                    id: service.id,
                    name: service.name,
                    duration: service.duration,
                    price: Number(service.price),
                  })),
                ])
              }
            />
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-medium">Horário de Trabalho</h3>
          <p className="text-sm text-muted-foreground">
            Especifique os dias e horários de trabalho do colaborador.
          </p>
        </div>
        <Separator />
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Cadastrar colaborador
          </Button>
        </div>
      </form>
    </Form>
  );
}

type AddServiceProps = {
  servicesSelected?: number[];
  onAddService?: (services: TService[]) => void;
};

function AddService({ servicesSelected = [], onAddService }: AddServiceProps) {
  const services = api.services.getAll.useQuery();
  const servicesFiltered =
    services.data?.filter(
      (service) => !servicesSelected.includes(service.id)
    ) ?? [];

  const [opened, handlers] = useDisclosure();

  return (
    <Dialog open={opened} onOpenChange={handlers.toggle}>
      <DialogTrigger asChild>
        <Button type="button" variant="secondary">
          <Plus className="mr-2 h-4 w-4" />
          Associar serviço
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Associar serviço</DialogTitle>
        </DialogHeader>
        {servicesFiltered.length === 0 && (
          <div>Nenhum serviço disponível para associar</div>
        )}
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-3">
            {servicesFiltered?.map((service) => (
              <ServiceCard
                key={service.id}
                {...service}
                price={parseFloat(service.price)}
                action={
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      toast({
                        title: "O serviço foi associado",
                        description: service.name,
                      });
                      onAddService?.([service]);
                      if (servicesFiltered.length === 1) handlers.close();
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                }
              />
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            disabled={servicesFiltered.length === 0}
            onClick={() => {
              toast({
                title: "Todos os serviços foram associados",
                description: `${servicesFiltered.length} serviços`,
              });
              onAddService?.(servicesFiltered);
              handlers.close();
            }}
          >
            Associar todos serviços
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
