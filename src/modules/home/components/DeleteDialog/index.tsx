import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { InventoryMovement } from "@/domain/repositories/InventoryMovementsRepository";
import { useDeleteMovementMutation } from "@/hooks/InventoryMovements/useDeleteMovementMutation";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";

interface DeleteDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMovement: Partial<InventoryMovement> | null | undefined;
  setSelectedMovement: React.Dispatch<
    React.SetStateAction<Partial<InventoryMovement> | null | undefined>
  >;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<InventoryMovement[], Error>>;
}

export default function DeleteDialog({
  isOpen,
  setIsOpen,
  selectedMovement,
  setSelectedMovement,
  refetch,
}: DeleteDialogProps) {
  const { mutate, isPending } = useDeleteMovementMutation();

  const handleDelete = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    mutate(selectedMovement?.uid!, {
      onSuccess: () => {
        refetch();
        setIsOpen(false);
        setSelectedMovement(null);

        toast.success("Movimentação deletada com sucesso");
      },
      onError: () => {
        toast.error("Não foi possível deletar a movimentação");
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setSelectedMovement(null);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deletar</DialogTitle>
          <DialogDescription className="mt-8 mb-6">
            Tem certeza de que deseja deletar essa movimentação?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-around">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setIsOpen(false);
              setSelectedMovement(null);
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
