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
  value,
}: {
  setData: React.Dispatch<React.SetStateAction<Partial<InventoryMovement>>>;
  value?: string;
}) {
  const { data, isLoading } = useProductionsQuery();

  return (
    <div className="grid gap-3">
      <Label htmlFor="referenceId">Produção *</Label>
      <Select
        value={value}
        name="referenceId"
        disabled={isLoading}
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
            placeholder="Selecione a produção de referência"
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
