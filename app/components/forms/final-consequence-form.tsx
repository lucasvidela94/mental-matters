import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BrainIcon, SendIcon, CheckCircleIcon } from "lucide-react";
import { Toaster, toast } from "sonner";
import confetti from "canvas-confetti";

interface FinalConsequenceProps {
  onStepComplete: (data: string) => void;
  initialData?: string;
}

export default function FinalConsequenceForm({
  onStepComplete,
  initialData,
}: FinalConsequenceProps) {
  const [text, setText] = useState(initialData || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setText(initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") {
      toast.error("Por favor, completa el campo antes de enviar.", {
        style: {
          background: "#FEE2E2",
          border: "1px solid #F87171",
          color: "#B91C1C",
        },
      });
      return;
    }
    setIsSubmitting(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    toast.success(
      <div className="flex items-center">
        <CheckCircleIcon className="mr-2 h-5 w-5" />
        <span className="font-medium">¡Lo hiciste genial!</span>
      </div>,
      {
        duration: 5000,
        style: {
          background: "#ECFDF5",
          border: "1px solid #6EE7B7",
          color: "#065F46",
          fontSize: "1rem",
        },
      }
    );

    setTimeout(() => {
      onStepComplete(text);
      setIsSubmitting(false);
    }, 5000);
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
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
                ¿Cuál es la consecuencia final de esta situación y cómo te hace
                sentir?
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
                Llegamos a la consecuencia final. Reflexioná sobre el desenlace
                de esta situación y reconocé cómo te hace sentir. Permitite
                sentir alivio al aceptar lo que es.
              </p>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center space-x-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <motion.div
                  className="h-5 w-5 rounded-full border-t-2 border-r-2 border-white"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  <SendIcon size={18} className="mr-2" />
                  <span>Enviar</span>
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </AnimatePresence>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "white",
            color: "black",
            border: "1px solid #E2E8F0",
            borderRadius: "0.5rem",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            fontSize: "1rem",
            padding: "1rem",
          },
        }}
      />
    </>
  );
}
