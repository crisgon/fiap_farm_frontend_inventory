import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type InventoryMovement } from "@/domain/repositories/InventoryMovementsRepository";
import { useSalesQuery } from "@/hooks/Sales/useSalesQuery";

export function SaleSelect({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<InventoryMovement>>;
}) {
  const { data: sales, isLoading: salesLoading } = useSalesQuery();

  return (
    <div className="grid gap-3">
      <Label htmlFor="referenceId">Venda *</Label>
      <Select
        name="referenceId"
        disabled={salesLoading}
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
          {sales?.map((sale) => {
            return (
              <SelectItem key={sale.uid} value={sale.uid!}>
                {sale.product?.name} - Venda:{" "}
                {new Date(sale.saleDate).toLocaleDateString()}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
