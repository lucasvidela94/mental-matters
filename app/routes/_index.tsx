import type { MetaFunction } from "@remix-run/node";
import IndexPage from "~/components/index/index-page";

export const meta: MetaFunction = () => {
  return [
    { title: "Mental matters" },
    { name: "Gestor de emociones", content: "Bienvenido a tu diario!" },
  ];
};

export default function Index() {
  return <IndexPage />;
}
