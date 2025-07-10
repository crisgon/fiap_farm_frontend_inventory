import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type InventoryMovement } from "@/domain/repositories/InventoryMovementsRepository";
import { useProductionsQuery } from "@/hooks/Productions/useProductionsQuery";

export function ProductionSelect({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<InventoryMovement>>;
}) {
  const { data, isLoading } = useProductionsQuery();

  return (
    <div className="grid gap-3">
      <Label htmlFor="referenceId">Venda *</Label>
      <Select
        name="referenceId"
        disabled={isLoading}
        // value={
        //   editableProduction?.productId && editableProduction?.product
        //     ? {
        //         value: editableProduction.productId,
        //         label: editableProduction.product.name,
        //       }
        //     : undefined
        // }
        onValueChange={(option) => {
          setData((prev) => ({
            ...prev,
            referenceId: option,
          }));
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            className="text-foreground text-sm native:text-lg"
            placeholder="Selecione a venda de referência"
          />
        </SelectTrigger>
        <SelectContent>
          {data?.map((production) => {
            const date = production.harvestDate
              ? `Colheita:
                          ${new Date(
                            production.harvestDate
                          ).toLocaleDateString()}`
              : `Plantação:
                          ${new Date(
                            production.plantingDate
                          ).toLocaleDateString()}`;

            return (
              <SelectItem key={production.uid} value={production.uid}>
                {production.product?.name} - {date}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
