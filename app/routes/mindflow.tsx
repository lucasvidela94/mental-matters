import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { v4 as uuidv4 } from "uuid";
import SituationForm from "~/components/forms/situation-form";
import RealityConfrontationForm from "~/components/forms/reality-confrontation-form";
import ThoughtForm from "~/components/forms/thought-form";
import FeelingForm from "~/components/forms/feeling-form";
import FinalConsequenceForm from "~/components/forms/final-consequence-form";
import GradientLayout from "~/components/gradient-layout";

const TOTAL_STEPS = 5;
const STORAGE_KEY = "mindflow_data";

interface MindflowData {
  id: string;
  date: string;
  stage1_response?: string;
  stage2_response?: string;
  stage3_response?: string;
  stage4_response?: string;
  stage5_response?: string;
}

const MindflowPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [mindflowData, setMindflowData] = useState<MindflowData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedStep = localStorage.getItem("mindflow_current_step");
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedStep) {
      setCurrentStep(parseInt(savedStep, 10));
    }

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      const currentFlow = parsedData[parsedData.length - 1];
      if (currentFlow && !currentFlow.stage5_response) {
        setMindflowData(currentFlow);
      } else {
        initializeNewFlow();
      }
    } else {
      initializeNewFlow();
    }
  }, []);

  const initializeNewFlow = () => {
    const newData: MindflowData = {
      id: uuidv4(),
      date: new Date().toISOString(),
    };
    setMindflowData(newData);
    saveToLocalStorage(newData);
  };

  const saveToLocalStorage = (data: MindflowData) => {
    const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const updatedData = existingData.filter(
      (flow: MindflowData) => flow.id !== data.id
    );
    updatedData.push(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  };

  const handleStepCompletion = (stageData: string) => {
    if (mindflowData) {
      const updatedData = {
        ...mindflowData,
        [`stage${currentStep}_response`]: stageData,
      };
      setMindflowData(updatedData);
      saveToLocalStorage(updatedData);
    }

    if (currentStep < TOTAL_STEPS) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      localStorage.setItem("mindflow_current_step", nextStep.toString());
    } else {
      finalizeMindflow();
    }
  };

  const finalizeMindflow = () => {
    localStorage.removeItem("mindflow_current_step");
    navigate("/");
  };

  const renderCurrentForm = () => {
    const initialData = mindflowData
      ? mindflowData[`stage${currentStep}_response` as keyof MindflowData]
      : undefined;

    switch (currentStep) {
      case 1:
        return (
          <SituationForm
            onStepComplete={handleStepCompletion}
            initialData={initialData}
          />
        );
      case 2:
        return (
          <RealityConfrontationForm
            onStepComplete={handleStepCompletion}
            initialData={initialData}
          />
        );
      case 3:
        return (
          <ThoughtForm
            onStepComplete={handleStepCompletion}
            initialData={initialData}
          />
        );
      case 4:
        return (
          <FeelingForm
            onStepComplete={handleStepCompletion}
            initialData={initialData}
          />
        );
      case 5:
        return (
          <FinalConsequenceForm
            onStepComplete={handleStepCompletion}
            initialData={initialData}
          />
        );
      default:
        return <div>Error: Paso no reconocido</div>;
    }
  };

  return <GradientLayout>{renderCurrentForm()}</GradientLayout>;
};

export default MindflowPage;
