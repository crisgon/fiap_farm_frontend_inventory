import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { SourceInventoryMovement } from "@/domain/repositories/InventoryMovementsRepository";
import { useInventoryMovementsQuery } from "@/hooks/InventoryMovements/useInventoryMovementsQuery";
import { SalesTab } from "./components/SalesTab";
import { ProductionsTab } from "./components/ProductionsTab";

function Home() {
  const { data } = useInventoryMovementsQuery();
  const sales =
    data?.filter((item) => item.source === SourceInventoryMovement.SALE) || [];
  const productions =
    data?.filter(
      (item) => item.source === SourceInventoryMovement.PRODUCTION
    ) || [];

  console.log(data);

  return (
    <div className="flex flex-col items-center min-h-screen bg-muted/50 p-6">
      <div className="w-full max-w-5xl h-full">
        <h3 className="font-bold text-3xl text-primary">
          Movimentações de Estoque
        </h3>

        <Tabs
          defaultValue={SourceInventoryMovement.PRODUCTION}
          className="mt-8"
        >
          <TabsList className="mb-2">
            <TabsTrigger value={SourceInventoryMovement.PRODUCTION}>
              Produção
            </TabsTrigger>
            <TabsTrigger value={SourceInventoryMovement.SALE}>
              Venda
            </TabsTrigger>
          </TabsList>
          <TabsContent value={SourceInventoryMovement.PRODUCTION}>
            <ProductionsTab data={productions} />
          </TabsContent>
          <TabsContent value={SourceInventoryMovement.SALE}>
            <SalesTab data={sales} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export { Home };
