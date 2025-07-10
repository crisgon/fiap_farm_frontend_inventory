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

export function CreateDialog({
  isOpen = false,
  sourceMovement,
  setIsOpen,
  refetch,
}: {
  isOpen: boolean;
  sourceMovement: SourceInventoryMovement;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<InventoryMovement[], Error>>;
}) {
  const defaultFormState = {
    type: TypeInventoryMovement.ENTRY,
    quantity: 0,
    productId: "",
    referenceId: "",
    source: sourceMovement,
    createdAt: new Date(),
  };

  const { data: products, isLoading: productsLoading } = useProductsQuery();

  const { mutate, isPending } = useCreateInventoryMovementMutation();

  const [data, setData] = useState<InventoryMovement>(defaultFormState);
  const isFormInvalid = !data.quantity || !data.productId || !data.referenceId;

  const handleSubmit = () => {
    mutate(data, {
      onSuccess: () => {
        setIsOpen(false);
        refetch();
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        setData(defaultFormState);
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
                  <ProductionSelect setData={setData} />
                ) : (
                  <SaleSelect setData={setData} />
                )}
                <div className="grid gap-3">
                  <Label htmlFor="type">Tipo da movimentação</Label>
                  <RadioGroup
                    name="type"
                    defaultValue={TypeInventoryMovement.ENTRY}
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
                    }}
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  onClick={() => handleSubmit()}
                  disabled={isFormInvalid || isPending}
                >
                  {isPending ? "Criando..." : "Criar"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </form>
    </Dialog>
  );
}
