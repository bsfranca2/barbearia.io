import { Html, Head, Main, NextScript } from "next/document";
import { fontSans } from "~/lib/font";
import { cn } from "~/lib/utils";

export default function Document() {
  return (
    <Html
      lang="pt-BR"
      className={cn(
        "h-full bg-white font-sans text-slate-900 antialiased",
        fontSans.variable
      )}
    >
      <Head />
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
