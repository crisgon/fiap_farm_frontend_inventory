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
import { Minus, Pencil, Plus, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { CreateDialog } from "../CreateDialog";
import type { TabsProps } from "../../types";
import {
  SourceInventoryMovement,
  TypeInventoryMovement,
  type InventoryMovement,
} from "@/domain/repositories/InventoryMovementsRepository";
import DeleteDialog from "../DeleteDialog";

function ProductionsTab({ data = [], isLoading = false, refetch }: TabsProps) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [editableMovement, setEditableMovement] = useState<
    Partial<InventoryMovement> | null | undefined
  >({
    productId: undefined,
    type: TypeInventoryMovement.ENTRY,
    quantity: undefined,
    source: SourceInventoryMovement.PRODUCTION,
    referenceId: undefined,
    createdAt: new Date(),
  });

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
            Adicionar movimentação de produção
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
                  <TableHead />
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
                    <TableCell
                      style={{
                        flexDirection: "row",
                        gap: 2,
                      }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditableMovement({
                            ...movement,
                          });
                          setModalIsOpen(true);
                        }}
                      >
                        <Pencil color="#198155" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditableMovement({ ...movement });
                          setDeleteModalIsOpen(true);
                        }}
                      >
                        <Trash2 color="#ef4444" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      {modalIsOpen && (
        <CreateDialog
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          refetch={refetch}
          sourceMovement={SourceInventoryMovement.PRODUCTION}
          selectedMovement={editableMovement}
          setSelectedMovement={setEditableMovement}
        />
      )}
      {deleteModalIsOpen && (
        <DeleteDialog
          isOpen={deleteModalIsOpen}
          setIsOpen={setDeleteModalIsOpen}
          refetch={refetch}
          selectedMovement={editableMovement}
          setSelectedMovement={setEditableMovement}
        />
      )}
    </>
  );
}

export { ProductionsTab };
