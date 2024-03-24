import Link from "next/link";
import React from "react";
import { LuUser2 } from "react-icons/lu";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const menus = [
    { title: "Home", path: "/" },
    { title: "Appointments", path: "/appointment" },
    { title: "Community", path: "/community-forum" },
    { title: "Resources", path: "/resources" },
    { title: "Journals", path: "/journals" },
    { title: "Chatbot", path: "/chatbot" },
  ];

  const pathname = usePathname();

  return (
    <div className="bg-lilacWhite w-full flex justify-between items-center p-8 rounded-md">
      <h1 className="text-deepAqua font-bold text-3xl">App Logo Here</h1>

      <div className="flex gap-10">
        {menus.map((menu, index) => (
          <Link
            href={menu.path}
            key={index}
            className={`text-lg ${
              pathname === menu.path
                ? "text-deepAqua font-semibold"
                : "text-faded"
            }`}
          >
            {menu.title}
          </Link>
        ))}
      </div>

      <div className="flex gap-4 items-center bg-aqua p-4 rounded-full">
        <p className="text-lg text-black font-medium">Anees</p>
        <LuUser2 size={26} className="text-deepAqua" />
      </div>
    </div>
  );
};

export default Navbar;
