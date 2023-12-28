// import type { Metadata } from "next";
import Header from "./Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="main mx-auto  flex min-h-screen flex-col items-center justify-between lg:p-24 ">
        {children}
      </main>
    </>
  );
}
