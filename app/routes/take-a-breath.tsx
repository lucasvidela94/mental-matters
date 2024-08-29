import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "~/components/loading/loading-screen";

const TakeABreathPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/mindflow");
    }, 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return <LoadingPage />;
};

export default TakeABreathPage;
