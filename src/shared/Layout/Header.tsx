import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Iconos para el menú
import LOGO from "../../assets/images/logo.webp";
import { DropDown } from "@/features/admin/home/components/DropDown";

const links = [
    { path: "/map", label: "Mapa" },
    // { path: "/new-point", label: "Nuevo Punto" },
    { path: "/monitoring", label: "Monitoreo" },
    // { path: "/compare", label: "Comparaciones" },
    // { path: "/export", label: "Exportar" }
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="border-b h-[70px] shadow-md bg-white px-4 md:px-0">
            <div className="md:max-w-[1225px] md:mx-auto flex justify-between items-center h-full">
                {/* Logo */}
                <div className="h-[50px] w-[150px]">
                    <img className="w-full h-full object-cover" src={LOGO} alt="logo.png" />
                </div>

                {/* Menú de escritorio */}
                <nav className="hidden md:flex">
                    <ul className="flex text-gray-700 text-[0.9rem] space-x-6 h-full items-center">
                        {links.map((item, index) => (
                            <li key={index}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `hover:text-gray-800 transition duration-300 ${isActive ? "font-semibold text-black" : ""}`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                        <DropDown />
                    </ul>
                </nav>

                {/* Botón de menú en móviles */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden focus:outline-none"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Menú móvil */}
            {isOpen && (
                <nav className="md:hidden absolute top-[70px] text-[0.9rem] left-0 w-full bg-white shadow-lg z-50">
                    <ul className="flex flex-col items-start   p-4">
                        {links.map((item, index) => (
                            <li key={index} className="w-full">
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `block w-full py-2 px-4 hover:bg-gray-100 transition duration-300 ${isActive ? "font-semibold text-black" : "text-gray-700"
                                        }`
                                    }
                                    onClick={() => setIsOpen(false)} // Cerrar menú al hacer clic
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                        <DropDown />
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;
