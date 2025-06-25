import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

function Products() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/50 p-6">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4">
          <div>
            <CardTitle>Produto Exemplo</CardTitle>
            <CardDescription>
              Esta é a página de produto do seu MFE.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary" className="mb-4">
            Novo
          </Badge>
          <p>
            Este é um produto de exemplo. Você pode reutilizar esta página em
            outros MFEs para testes e integração.
          </p>
          <Alert className="mt-4">
            <AlertTitle>Aviso</AlertTitle>
            <AlertDescription>
              Este é um alerta de demonstração do <strong>shadcn/ui</strong>.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Comprar agora</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export { Products };
