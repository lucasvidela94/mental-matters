"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BrainIcon,
  BookOpenIcon,
  CalendarIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface MindflowData {
  id: string;
  date: string;
  stage1_response?: string;
  stage2_response?: string;
  stage3_response?: string;
  stage4_response?: string;
  stage5_response?: string;
}

const STORAGE_KEY = "mindflow_data";

const stageLabels = {
  stage1_response: "Situación",
  stage2_response: "Pensamientos",
  stage3_response: "Emociones",
  stage4_response: "Acciones",
  stage5_response: "Resultado",
};

export default function MindVaultContainer() {
  const [mindflowData, setMindflowData] = useState<MindflowData[]>([]);

  useEffect(() => {
    const fetchMindflowData = () => {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsedData: MindflowData[] = JSON.parse(storedData);
        setMindflowData(parsedData);
      }
    };

    fetchMindflowData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card className="bg-white shadow-xl border-0 overflow-hidden">
          <CardHeader className="text-center border-b border-gray-200 pb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <BrainIcon size={40} className="text-blue-600" />
              <CardTitle className="text-4xl font-bold text-gray-800">
                Mental Matters
              </CardTitle>
            </div>
            <h2 className="text-2xl font-semibold text-gray-600 flex items-center justify-center">
              <BookOpenIcon size={24} className="mr-2 text-blue-600" />
              Registro de situaciones
            </h2>
          </CardHeader>
          <div className="h-[calc(100vh-250px)] overflow-hidden">
            <ScrollArea className="h-full">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {mindflowData.length > 0 ? (
                    mindflowData.map((item) => (
                      <Card
                        key={item.id}
                        className="bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between text-gray-600 mb-4">
                            <div className="flex items-center">
                              <CalendarIcon
                                size={16}
                                className="mr-2 text-blue-600"
                              />
                              <span>
                                {new Date(item.date).toLocaleDateString(
                                  "es-ES",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                            <Badge
                              variant="secondary"
                              className="text-xs bg-blue-100 text-blue-800 p-2"
                            >
                              {Object.values(item).filter(Boolean).length - 2}{" "}
                              etapas
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            {Object.entries(item).map(([key, value]) => {
                              if (key !== "id" && key !== "date" && value) {
                                return (
                                  <div
                                    key={key}
                                    className="flex items-start text-gray-700"
                                  >
                                    <ChevronRightIcon
                                      size={16}
                                      className="mr-2 text-blue-600 flex-shrink-0 mt-1"
                                    />
                                    <div>
                                      <span className="font-medium">
                                        {
                                          stageLabels[
                                            key as keyof typeof stageLabels
                                          ]
                                        }
                                        :
                                      </span>
                                      <span className="ml-1">{value}</span>
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center text-gray-600 py-8">
                      No hay situaciones registradas aún.
                    </div>
                  )}
                </div>
              </CardContent>
            </ScrollArea>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
