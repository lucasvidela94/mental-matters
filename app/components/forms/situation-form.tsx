import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BrainIcon, SendIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SituationFormProps {
  onStepComplete: (data: string) => void;
  initialData?: string;
}

const SituationForm = ({ onStepComplete, initialData }: SituationFormProps) => {
  const [text, setText] = useState(initialData || "");

  useEffect(() => {
    if (initialData) {
      setText(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") {
      return;
    }
    onStepComplete(text);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 space-y-6"
      >
        <div className="flex items-center justify-center space-x-2">
          <BrainIcon size={32} className="text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-600">Mental Matters</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="situation"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              ¿Qué sucedió?
            </label>
            <Textarea
              id="situation"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Cuéntanos sobre tu situación..."
              className="min-h-[150px] text-gray-900 p-4"
              aria-describedby="situation-description"
            />
            <p
              id="situation-description"
              className="mt-2 text-sm text-gray-500"
            >
              Describe tu situación con tanto detalle como te sientas cómodo
              compartiendo.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <SendIcon size={18} className="mr-2" />
            <span>Enviar</span>
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default SituationForm;
