import {
  type QueryObserverResult,
  type RefetchOptions,
} from "@tanstack/react-query";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/domain/repositories/ProductsRepository";
import { LeafyGreen } from "lucide-react";
import { useUpdateProductMutation } from "@/hooks/Products/useUpdateProductMutation";
import { useCreateProductMutation } from "@/hooks/Products/useCreateProductMutation";
import { toast } from "sonner";

interface CreateDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editableProduct: Product | null | undefined;
  setEditableProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  refetchProducts: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Product[], Error>>;
}

export default function CreateDialog({
  isOpen,
  setIsOpen,
  editableProduct,
  setEditableProduct,
  refetchProducts,
}: CreateDialogProps) {
  const { mutate: updateMutation, isPending: updateIsPending } =
    useUpdateProductMutation();
  const { mutate: createMutation, isPending: createIsPending } =
    useCreateProductMutation();

  const handleUpdateProduct = () => {
    if (editableProduct?.uid) {
      updateMutation(editableProduct, {
        onSuccess: () => {
          refetchProducts();
          setIsOpen(false);
          setEditableProduct(null);

          toast.success("Produto atualizado com sucesso");
        },
        onError: () => {
          toast.error("Falha ao atualizar o produto");
        },
      });
    } else {
      createMutation(
        {
          uid: uuidv4(),
          name: editableProduct?.name || "",
          description: editableProduct?.description || "",
          averageProductionDays: editableProduct?.averageProductionDays || 0,
          createdAt: new Date().toISOString(),
        },
        {
          onSuccess: () => {
            refetchProducts();
            setIsOpen(false);
            setEditableProduct(null);

            toast.success("Produto criado com sucesso");
          },
          onError: () => {
            toast.error("Falha ao criar o produto");
          },
        }
      );
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setEditableProduct(null);
      }}
    >
      <DialogContent className="min-w-full sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editableProduct?.name || ""}</DialogTitle>
          <DialogDescription className="mt-8 mb-6">
            <div className="flex flex-col gap-6 w-full">
              <div className="mx-auto mb-2">
                <LeafyGreen size={48} />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label id="name">Nome do produto</Label>
                <Input
                  value={editableProduct?.name || ""}
                  onChange={(e) =>
                    setEditableProduct(
                      (prev) =>
                        ({
                          ...prev,
                          name: e.target.value,
                        } as Product)
                    )
                  }
                  aria-labelledby="name"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label id="description">Descrição</Label>
                <Textarea
                  value={editableProduct?.description || ""}
                  onChange={(e) =>
                    setEditableProduct(
                      (prev) =>
                        ({
                          ...prev,
                          description: e.target.value,
                        } as Product)
                    )
                  }
                  aria-labelledby="description"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label>Tempo de produção (dias)</Label>
                <Input
                  inputMode="numeric"
                  value={
                    editableProduct?.averageProductionDays?.toString() || ""
                  }
                  onChange={(e) =>
                    setEditableProduct(
                      (prev) =>
                        ({
                          ...prev,
                          averageProductionDays: parseInt(e.target.value) || 0,
                        } as Product)
                    )
                  }
                  aria-labelledby="averageProductionDays"
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-around">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setIsOpen(false);
              setEditableProduct(null);
            }}
          >
            Fechar
          </Button>

          <Button
            size="sm"
            onClick={handleUpdateProduct}
            disabled={createIsPending || updateIsPending}
          >
            {createIsPending || updateIsPending ? "Carregando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
