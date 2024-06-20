import { LoginForm } from "./components/LoginForm/LoginForm";
import { Card, CardContent, CardHeader } from "./components/ui/card";

export default function App() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="min-w-[500px]">
        <CardHeader>
          <h1 className="text-3xl text-center">Créer un compte</h1>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
