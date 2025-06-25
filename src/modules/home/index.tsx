import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/50 p-6">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="flex flex-col items-center gap-2">
          <CardTitle>Estoque - Home</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge className="mb-2" variant="outline">
            Estoque Ativo
          </Badge>
          <p>Bem-vindo ao módulo de estoque do seu sistema!</p>
          <Separator className="my-4" />
          <Alert>
            <AlertTitle>Informação</AlertTitle>
            <AlertDescription>
              Esta é uma tela de exemplo utilizando <strong>shadcn/ui</strong>.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="secondary">Ver Produtos</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export { Home };

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
// import { Separator } from "@/components/ui/separator";

// function Home() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-muted/50 p-6">
//       <Card className="w-full max-w-lg shadow-lg">
//         <CardHeader className="flex flex-col items-center gap-2">
//           <Avatar>
//             <AvatarImage
//               src="https://source.unsplash.com/100x100/?warehouse,inventory"
//               alt="Estoque"
//             />
//             <AvatarFallback>ES</AvatarFallback>
//           </Avatar>
//           <CardTitle>Estoque - Home</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Badge className="mb-2" variant="outline">
//             Estoque Ativo
//           </Badge>
//           <p>Bem-vindo ao módulo de estoque do seu sistema!</p>
//           <Separator className="my-4" />
//           <Alert>
//             <AlertTitle>Informação</AlertTitle>
//             <AlertDescription>
//               Esta é uma tela de exemplo utilizando <strong>shadcn/ui</strong>.
//             </AlertDescription>
//           </Alert>
//         </CardContent>
//         <CardFooter className="flex justify-end">
//           <Button variant="secondary">Ver Produtos</Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

// export { Home };
