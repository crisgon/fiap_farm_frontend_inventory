import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import type { InventoryMovement } from "@/domain/repositories/InventoryMovementsRepository";
import { PlusCircle } from "lucide-react";

function SalesTab({ data = [] }: { data?: InventoryMovement[] }) {
  return (
    <Card>
      <CardHeader className="justify-end">
        <Button size="lg">
          <PlusCircle />
          Adicionar movimentação de venda
        </Button>
      </CardHeader>
      <CardContent>
        {!data.length ? (
          <span>Não foram encontrados registros</span>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Produto</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Tipo de movimentação</TableHead>
                <TableHead>Data da movimentação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((movement) => (
                <TableRow key={movement.uid}>
                  <TableCell className="font-medium">
                    {movement.productId}
                  </TableCell>
                  <TableCell>{movement.quantity}</TableCell>
                  <TableCell>{movement.type}</TableCell>
                  <TableCell>
                    {movement.createdAt?.toISOString() || ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export { SalesTab };
