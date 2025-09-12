"use client"

import { Button } from "@/shared/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { User2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function DropDown() {
    const navigate = useNavigate();

    const handleAdminLogin = () => {
        navigate('/login');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"}><User2></User2></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Button 
                    variant={"ghost"} 
                    style={{fontWeight:400}} 
                    className="w-full flex justify-start text-gray-700"
                    onClick={handleAdminLogin}
                >
                    Acceso Administrador
                </Button>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}
