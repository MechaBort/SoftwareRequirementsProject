import {Header} from "../Components/header.ts";
import {navigate} from "../Router.ts";
import {setActiveSession} from "../utils/session";
import Swal from "sweetalert2";

export function registro() {
    return `
    ${Header()}
    <div class = "flex justify-center items-center h-[calc(100vh-80px)] bg-[#E8E8E8]"> 
      <form id = "registroForm" class = "bg-[#C7C7C7] p-16 rounded-lg shadow-xl w-full max-w-2xl border border-[#ABABAB]"> 
        
        <h2 class = "text-5xl font-bold text-center mb-8 text-black uppercase"> Registro </h2>

        <div class = "flex items-center mb-6 gap-4">
          <label for = "name" class = "w-32 font-semibold text-black"> Nombre: </label>
          <input 
            type = "text" 
            id = "name" 
            name = "name"
            placeholder = "Jaime" 
            class="flex-1 bg-gray-500 px-3 py-2 rounded-md text-white"
            required
          >
        </div>

        <div class="flex items-center mb-6 gap-4">
          <label for="apellido1" class="w-32 font-semibold text-black"> 1° Apellido:</label>
          <input 
            type = "text" 
            id = "apellido1" 
            name = "apellido1"
            placeholder = "Solano" 
            class = "flex-1 bg-gray-500 px-3 py-2 rounded-md text-white"
            required
          >
        </div>
        <div class = "flex items-center mb-6 gap-4">
          <label for = "apellido2" class = "w-32 font-semibold text-black"> 2° Apellido: </label>
          <input 
            type = "text" 
            id = "apellido2" 
            name = "apellido2"
            placeholder = "Soto" 
            class="flex-1 bg-gray-500 px-3 py-2 rounded-md text-white"
            required
          >
        </div>
        <div class = "flex items-center mb-6 gap-4">
          <label for = "email" class = "w-32 font-semibold text-black"> Correo: </label>
          <input 
            type = "email" 
            id = "email" 
            name = "email"
            placeholder = "ejemplo@estudiantec.cr" 
            class="flex-1 bg-gray-500 px-3 py-2 rounded-md text-white"
            required
          >
        </div>
        <div class="flex items-center mb-6 gap-4">
          <label for="password" class="w-32 font-semibold text-black">Contraseña:</label>
          <input 
            type = "password" 
            id = "password" 
            name = "password"
            placeholder = "********" 
            class = "flex-1 bg-gray-500 px-3 py-2 rounded-md text-white"
            required
          >
        </div>
        <div class="flex items-center mb-6 gap-4">
          <label for="carnet" class="w-32 font-semibold text-black">Carnet:</label>
          <input 
            type = "number" 
            id = "carnet" 
            name = "carnet"
            placeholder = "2026011111" 
            class = "flex-1 bg-gray-500 px-3 py-2 rounded-md text-white"
            required
          >
        </div>

        <button type = "submit" class = "bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 rounded-md w-full transition-colors shadow-lg">
          REGISTRARSE
        </button>
      </form>
    </div>
    `;
}

export function initRegistroEvents() {
    const registroForm = document.querySelector<HTMLFormElement>("#registroForm");

    if (!registroForm) {
        return;
    }

    registroForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const emailInput = registroForm.querySelector<HTMLInputElement>("#email");
        const email = emailInput?.value.trim() ?? "";
        const nombreInput = registroForm.querySelector<HTMLInputElement>("#nombre");
        const nombre = nombreInput?.value.trim() ?? "";
        const apellido1Input = registroForm.querySelector<HTMLInputElement>("#apellido1");
        const apellido1 = apellido1Input?.value.trim() ?? "";
        const apellido2Input = registroForm.querySelector<HTMLInputElement>("#apellido2");
        const apellido2 = apellido2Input?.value.trim() ?? "";
        const passwordInput = registroForm.querySelector<HTMLInputElement>("#password");
        const password = passwordInput?.value.trim() ?? "";
        const carnetInput = registroForm.querySelector<HTMLInputElement>("#carnet");
        const carnet = carnetInput?.value.trim() ?? "";

        if (!email.endsWith("@estudiantec.cr")) {
            Swal.fire({
                icon: "error",
                title: "E-mail invalido"
            });
            return
        }

        const tieneMinimo8 = password.length >= 8;
        const tieneMayuscula = /[A-Z]/.test(password);
        const tieneMinuscula = /[a-z]/.test(password);
        const tieneSimbolo = /[^A-Za-z0-9]/.test(password);

        if (!tieneMinimo8 || !tieneMayuscula || !tieneMinuscula || !tieneSimbolo) {
            Swal.fire({
                icon: "error",
                title: "Contraseña invalido"
            });
            return
        }

        setActiveSession(email, "estudiante", []);
        navigate("/home");
    });
}
