import React from "react";
import { useAuthContext } from "./hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const nav = [
    { title: "Home", href: "" },
    { title: "My Cart", href: "my-cart" },
  ];
  const handleNavigate = (href) => {
    navigate(href);
  };

  const handleLogout = async () => {
    try {
      logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[rgba(255,255,255,0.5)] w-full h-16 fixed text-black flex items-center justify-between">
      <ul className=" flex items-center pl-12">
        {nav.map((navt, index) => (
          <li
            key={index}
            className="ml-8 text-center font-medium cursor-pointer"
            onClick={() => handleNavigate(navt.href)}
          >
            {navt.title}
          </li>
        ))}
      </ul>
      <a
        className="mr-8 font-medium text-black cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </a>
    </div>
  );
};
