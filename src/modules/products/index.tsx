import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProductsQuery } from "@/hooks/Products/useProductsQuery";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import Spinner from "@/components/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { CreateDialog } from "./CreateDialog";
import DeleteDialog from "./DeleteDialog";
import type { Product } from "@/domain/repositories/ProductsRepository";
import CreateDialog from "./CreateDialog";

function Products() {
  const { data, isLoading, refetch } = useProductsQuery();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [editableProduct, setEditableProduct] = useState<Product | null>({
    uid: "",
    name: "",
    description: "",
    averageProductionDays: 0,
    createdAt: "",
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
            Adicionar produto
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center my-4">
              <Spinner />
            </div>
          ) : !data?.length ? (
            <span>Não foram encontrados registros</span>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Tempo médio de produção</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((prod) => (
                  <TableRow key={prod.uid}>
                    <TableCell className="font-medium">{prod.name}</TableCell>
                    <TableCell className="font-medium">
                      {prod.description}
                    </TableCell>
                    <TableCell className="font-medium">
                      {prod.averageProductionDays}
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
                          setEditableProduct({
                            ...prod,
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
                          setEditableProduct({ ...prod });
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
          editableProduct={editableProduct ?? null}
          setEditableProduct={setEditableProduct}
          refetchProducts={refetch}
        />
      )}
      {deleteModalIsOpen && (
        <DeleteDialog
          isOpen={deleteModalIsOpen}
          setIsOpen={setDeleteModalIsOpen}
          refetch={refetch}
          selectedProduct={editableProduct}
          setSelectedProduct={setEditableProduct}
        />
      )}
    </>
  );
}

export { Products };
