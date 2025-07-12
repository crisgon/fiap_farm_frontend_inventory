import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Product } from "@/domain/repositories/ProductsRepository";
import { useDeleteProductMutation } from "@/hooks/Products/useDeleteProductMutation";

import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";

interface DeleteDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProduct: Partial<Product> | null | undefined;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Product[], Error>>;
}

export default function DeleteDialog({
  isOpen,
  setIsOpen,
  selectedProduct,
  setSelectedProduct,
  refetch,
}: DeleteDialogProps) {
  const { mutate, isPending } = useDeleteProductMutation();

  const handleDelete = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    mutate(selectedProduct?.uid!, {
      onSuccess: () => {
        refetch();
        setIsOpen(false);
        setSelectedProduct(null);

        toast.success("Produto deletada com sucesso");
      },
      onError: () => {
        toast.error("Não foi possível deletar o produto");
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setSelectedProduct(null);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deletar</DialogTitle>
          <DialogDescription className="mt-8 mb-6">
            Tem certeza de que deseja deletar esse produto?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-around">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setIsOpen(false);
              setSelectedProduct(null);
            }}
          >
            Fechar
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Carregando..." : "Deletar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
