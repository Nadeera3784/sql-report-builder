import React from "react";

export default function Drawer({ children, drawerOpen, setDrawerOpen }) {
  return (
    <main
      className={
        " fixed overflow-hidden z-10  bg-opacity-25 inset-0 transform ease-in-out " +
        (drawerOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          " w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (drawerOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 m-10 h-full">
          <header className="pt-4  font-bold text-lg mt-3">Report analyzer </header>
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
            setDrawerOpen(false);
        }}
      ></section>
    </main>
  );
}
