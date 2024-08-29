import { Button } from "@/components/ui/button";
import { BrainIcon } from "lucide-react";
import GradientLayout from "../gradient-layout";
import { useNavigate } from "react-router-dom";

function IndexPage() {
  const navigate = useNavigate();

  return (
    <GradientLayout>
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <div className="animate-float mb-8">
          <BrainIcon size={80} className="text-white" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-white shadow-text mb-12">
          Mental Matters
        </h1>
        <div className="w-full max-w-md space-y-4">
          <Button
            onClick={() => {
              navigate("/take-a-breath");
            }}
            className="w-full h-14 text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg bg-white text-gray-600 hover:bg-gray-100"
          >
            Tengo una situación
          </Button>
          <Button
            onClick={() => {
              navigate("/mind-vault");
            }}
            className="w-full h-14 text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg bg-transparent border-2 border-white hover:bg-white hover:text-gray-600"
          >
            Quiero ver mi registro
          </Button>
        </div>
      </div>
    </GradientLayout>
  );
}

export default IndexPage;
