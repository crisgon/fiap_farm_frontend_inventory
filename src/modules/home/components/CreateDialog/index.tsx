import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SourceInventoryMovement,
  TypeInventoryMovement,
  type InventoryMovement,
} from "@/domain/repositories/InventoryMovementsRepository";
import { useCreateInventoryMovementMutation } from "@/hooks/InventoryMovements/useCreateInventoryMovementMutation";
import { useProductsQuery } from "@/hooks/Products/useProductsQuery";
import type {
  RefetchOptions,
  QueryObserverResult,
} from "@tanstack/react-query";
import { useState } from "react";
import { SaleSelect } from "../SaleSelect";
import { ProductionSelect } from "../ProductionSelect";
import { useUpdateInventoryMovementMutation } from "@/hooks/InventoryMovements/useUpdateInventoryMovementMutation";

export function CreateDialog({
  isOpen = false,
  sourceMovement,
  setIsOpen,
  refetch,
  selectedMovement,
  setSelectedMovement,
}: {
  isOpen: boolean;
  sourceMovement: SourceInventoryMovement;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<InventoryMovement[], Error>>;
  selectedMovement: Partial<InventoryMovement> | null | undefined;
  setSelectedMovement: React.Dispatch<
    React.SetStateAction<Partial<InventoryMovement> | null | undefined>
  >;
}) {
  const defaultFormState = {
    type: TypeInventoryMovement.ENTRY,
    quantity: undefined,
    productId: "",
    referenceId: "",
    source: sourceMovement,
    createdAt: new Date(),
  };

  const { data: products, isLoading: productsLoading } = useProductsQuery();

  const { mutate: createInventoryMovement, isPending: createIsPending } =
    useCreateInventoryMovementMutation();
  const { mutate: updateInventoryMovement, isPending: updateIsPending } =
    useUpdateInventoryMovementMutation();

  const [data, setData] = useState<Partial<InventoryMovement>>(
    selectedMovement || defaultFormState
  );
  const isFormInvalid = !data.quantity || !data.productId || !data.referenceId;

  const handleSubmit = () => {
    if (!data.uid) {
      createInventoryMovement(data, {
        onSuccess: () => {
          setIsOpen(false);
          setSelectedMovement(undefined);
          refetch();
        },
      });
    } else {
      updateInventoryMovement(data as InventoryMovement, {
        onSuccess: () => {
          setIsOpen(false);
          setSelectedMovement(undefined);
          refetch();
        },
      });
    }
  };

  const buttonLabel = data?.uid
    ? updateIsPending
      ? "Salvando..."
      : "Salvar"
    : createIsPending
    ? "Criando..."
    : "Criar";

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        setData(defaultFormState);
        setSelectedMovement(undefined);
      }}
    >
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar movimentação de estoque</DialogTitle>
          </DialogHeader>
          {productsLoading ? (
            <div className="flex justify-center items-center my-4">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="grid gap-6 my-6">
                <div className="grid gap-3">
                  <Label htmlFor="productId">Produto *</Label>
                  <Select
                    name="productId"
                    value={data.productId}
                    onValueChange={(option) => {
                      setData((prev) => ({
                        ...prev,
                        productId: option,
                      }));
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        className="text-foreground text-sm native:text-lg"
                        placeholder="Selecione o produto"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {products?.map((product) => (
                        <SelectItem key={product.uid} value={product.uid}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {sourceMovement === SourceInventoryMovement.PRODUCTION ? (
                  <ProductionSelect
                    value={data.referenceId}
                    setData={setData}
                  />
                ) : (
                  <SaleSelect value={data.referenceId} setData={setData} />
                )}
                <div className="grid gap-3">
                  <Label htmlFor="type">Tipo da movimentação</Label>
                  <RadioGroup
                    name="type"
                    defaultValue={data.type}
                    className="flex flex-row gap-6 mt-2"
                    onValueChange={(value) => {
                      setData((prev) => ({
                        ...prev,
                        type: value as TypeInventoryMovement,
                      }));
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value={TypeInventoryMovement.ENTRY}
                        id={TypeInventoryMovement.ENTRY}
                      />
                      <Label htmlFor={TypeInventoryMovement.ENTRY}>
                        Entrada
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        value={TypeInventoryMovement.EXIT}
                        id={TypeInventoryMovement.EXIT}
                      />
                      <Label htmlFor={TypeInventoryMovement.EXIT}>Saída</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="quantity">Quantidade *</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={data.quantity}
                    onChange={(event) => {
                      setData((prev) => ({
                        ...prev,
                        quantity: Number(event.target.value),
                      }));
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsOpen(false);
                      setData(defaultFormState);
                      setSelectedMovement(undefined);
                    }}
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  onClick={() => handleSubmit()}
                  disabled={isFormInvalid || updateIsPending || createIsPending}
                >
                  {buttonLabel}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </form>
    </Dialog>
  );
}
