import Spinner from "@/components/spinner";
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
import { Minus, Plus, PlusCircle } from "lucide-react";
import { useState } from "react";
import { CreateDialog } from "../CreateDialog";
import type { TabsProps } from "../../types";
import {
  SourceInventoryMovement,
  TypeInventoryMovement,
} from "@/domain/repositories/InventoryMovementsRepository";

function SalesTab({ data = [], isLoading = false, refetch }: TabsProps) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <>
      <Card>
        <CardHeader className="justify-end">
          <Button
            size="lg"
            onClick={() => {
              setModalIsOpen(true);
            }}
          >
            <PlusCircle />
            Adicionar movimentação de venda
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center my-4">
              <Spinner />
            </div>
          ) : !data.length ? (
            <span>Não foram encontrados registros</span>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Produto</TableHead>
                  <TableHead className="text-center">Quantidade</TableHead>
                  <TableHead className="text-center">
                    Tipo de movimentação
                  </TableHead>
                  <TableHead className="text-center">
                    Data da movimentação
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((movement) => (
                  <TableRow key={movement.uid}>
                    <TableCell className="font-medium">
                      {movement.product?.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {movement.quantity}
                    </TableCell>
                    <TableCell>
                      {movement.type === TypeInventoryMovement.ENTRY ? (
                        <span className="flex flex-row gap-2 items-center justify-center text-primary">
                          <Plus size={16} /> Entrada
                        </span>
                      ) : (
                        <span className="flex flex-row gap-2 items-center justify-center text-destructive">
                          <Minus size={16} /> Saída
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {movement.createdAt
                        ? new Date(movement.createdAt).toLocaleDateString()
                        : ""}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      <CreateDialog
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        refetch={refetch}
        sourceMovement={SourceInventoryMovement.SALE}
      />
    </>
  );
}

export { SalesTab };
