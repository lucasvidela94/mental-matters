import { Button } from "@/components/ui/button";
import { BrainIcon } from "lucide-react";
import GradientLayout from "../gradient-layout";
import { useNavigate } from "react-router-dom";

function IndexPage() {
  const navigate = useNavigate();
  return (
    <GradientLayout>
      <div className="animate-float">
        <BrainIcon size={80} className="text-white" />
      </div>
      <h1 className="text-5xl font-bold text-center text-white shadow-text">
        Mental Matters
      </h1>
      <div className="space-y-4">
        <Button
          onClick={() => {
            navigate("/take-a-breath");
          }}
          className="w-64 h-14 m-2 text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg bg-white text-purple-600 hover:bg-purple-100"
        >
          Tengo una situación
        </Button>
        <Button
          onClick={() => {
            navigate("/mind-vault");
          }}
          className="w-64 h-14 text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg bg-transparent border-2 border-white hover:bg-white hover:text-purple-600"
        >
          Quiero ver mi registro
        </Button>
      </div>
    </GradientLayout>
  );
}

export default IndexPage;
