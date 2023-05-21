import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { Edit2, Plus, Timer, X } from "lucide-react";

import { api, type RouterOutputs } from "~/lib/api";
import { DashboardPageHeader } from "~/components/dashboard/page-header";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { createServiceSchema } from "~/lib/validations/service";
import { useDisclosure } from "~/hooks/use-disclosure";
import { DataTableFacetedFilter } from "~/components/dashboard/data-table-faceted-filter";

type FormData = z.infer<typeof createServiceSchema>;
type TService = RouterOutputs["services"]["getAll"][0];

type CrudServiceModalRef = {
  open: (data?: TService) => void;
};

const CrudServiceModal = forwardRef<CrudServiceModalRef>(
  function CrudServiceModal(_, ref) {
    const createMutation = api.services.create.useMutation();
    const apiContext = api.useContext();
    const updateMutation = api.services.update.useMutation();

    const isLoading = createMutation.isLoading || updateMutation.isLoading;

    const [initialData, setInitialData] = useState<TService | null>(null);
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
    } = useForm<FormData>({
      resolver: zodResolver(createServiceSchema),
    });

    const [opened, handlers] = useDisclosure(false, {
      onClose: () => {
        reset();
        setInitialData(null);
      },
    });

    async function onCreate(formData: FormData) {
      await createMutation.mutateAsync(formData);
    }

    async function onUpdate(formData: FormData) {
      if (!initialData) throw new Error("Initial data is not defined");
      await updateMutation.mutateAsync({ ...formData, id: initialData.id });
    }

    async function onSubmit(formData: FormData) {
      const fn = initialData ? onUpdate : onCreate;
      await fn(formData);
      await apiContext.services.getAll.invalidate();
      handlers.close();
    }

    useImperativeHandle(ref, () => ({
      open(data) {
        if (data) {
          setInitialData(data);
        }
        handlers.open();
      },
    }));

    useEffect(() => {
      if (initialData) {
        setValue("name", initialData.name);
        setValue("duration", initialData.duration);
        setValue("price", initialData.price);
      }
    }, [initialData, setValue]);

    return (
      <Dialog open={opened} onOpenChange={handlers.toggle}>
        <DialogTrigger className={buttonVariants({ variant: "default" })}>
          <Plus className="mr-2 h-4 w-4" />
          Cadastrar<span className="hidden sm:block">&#8202; serviço</span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {initialData ? "Editar" : "Cadastrar"} serviço
            </DialogTitle>
          </DialogHeader>
          <form
            className="space-y-3"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" required {...register("name")} />
              {errors?.name && (
                <p className="px-1 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="duration">Duração</Label>
              <Input
                id="duration"
                type="number"
                required
                {...register("duration")}
              />
              {errors?.duration && (
                <p className="px-1 text-xs text-red-600">
                  {errors.duration.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="price">Valor</Label>
              <Input
                id="price"
                type="number"
                step="1.0"
                {...register("price")}
              />
              {errors?.price && (
                <p className="px-1 text-xs text-red-600">
                  {errors.price.message}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <span>...</span>}
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
);

function ServiceCard({
  name,
  price,
  duration,
  onEdit,
}: TService & { onEdit: () => void }) {
  const priceFormatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(parseFloat(price));

  const durationFormatted = new Intl.NumberFormat("pt-BR", {
    style: "unit",
    unit: "minute",
  }).format(duration);

  return (
    <div className="flex flex-row justify-between rounded-lg border border-input px-3 py-2.5">
      <div className="flex flex-col">
        <div className="font-medium">{name}</div>
        <div className="flex flex-row space-x-2 text-sm text-slate-500">
          <div className="w-[75px]	min-w-fit">{priceFormatted}</div>
          <div className="flex items-center">
            <div className="mr-0.5">
              <Timer size={14} />
            </div>
            {durationFormatted}
          </div>
        </div>
      </div>
      <div className="self-center">
        <Button size="sm" variant="outline" onClick={onEdit}>
          <Edit2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [status, setStatus] = useState<string[]>([]);
  const services = api.services.getAll.useQuery(undefined, { retry: false });
  const crudModalRef = useRef<CrudServiceModalRef>(null);

  const isFiltered = false;

  return (
    <div className="space-y-4">
      <DashboardPageHeader
        title="Serviços"
        action={<CrudServiceModal ref={crudModalRef} />}
      />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center space-x-2">
            <Input
              placeholder="Filtrar serviços..."
              className="h-8 w-[150px] lg:w-[250px]"
            />
            <DataTableFacetedFilter
              title="Status"
              options={[
                {
                  value: "active",
                  label: "Ativo",
                },
                {
                  value: "inactive",
                  label: "Inativo",
                },
              ]}
              selectedValues={new Set(status)}
              setFilterValue={(value) => setStatus((value as string[]) ?? [])}
            />
            {isFiltered && (
              <Button
                variant="ghost"
                // onClick={() => table.resetColumnFilters()}
                className="h-8 px-2 lg:px-3"
              >
                Reset
                <X className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
          {/* <DataTableViewOptions table={table} /> */}
        </div>
        <div>
          {services.error && <p>Erro ao carregar serviços</p>}
          {services.isLoading && <p>Carregando...</p>}
          {!services.isLoading &&
            services.data &&
            services.data.length === 0 && <p>Sem serviços</p>}
          {!services.isLoading && services.data && services.data.length > 0 && (
            <div className="space-y-2">
              {services.data.map((service) => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  onEdit={() => crudModalRef.current?.open(service)}
                />
              ))}
            </div>
          )}
        </div>
        <div>Paginação...</div>
      </div>
    </div>
  );
}
