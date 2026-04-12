import {Header} from "../Components/header.ts";
import {navigate} from "../Router";
import {getRoleForEmail, setActiveSession} from "../utils/session";
import {usuarios} from '../helpers/data.ts'
import Swal from "sweetalert2";

export function LogIn() {
    return `
    ${Header()}
    <div class = "flex justify-center items-center h-[calc(100vh-80px)] bg-[#E8E8E8]"> 
      <form id = "loginForm" class = "bg-[#C7C7C7] p-16 rounded-lg shadow-xl w-full max-w-2xl border border-[#ABABAB]"> 
        
        <h2 class = "text-2xl font-bold text-center mb-8 text-black uppercase underline"> Inicio de Sesión </h2>

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

        <div class="flex items-center mb-8 gap-4">
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

        <button type = "submit" class = "bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 rounded-md w-full transition-colors shadow-lg">
          INGRESAR
        </button>

        <p class = "mt-6 text-center text-sm text-gray-700">
          ¿No tienes cuenta? <a href="/registro" class = "text-blue-900 font-bold underline"> Regístrate aquí </a>
        </p>
      </form>
    </div>
    `;
}

export function initLogInEvents() {
    const loginForm = document.querySelector<HTMLFormElement>("#loginForm");
    const allusers = usuarios
    if (!loginForm) {
        return;
    }

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const emailInput = loginForm.querySelector<HTMLInputElement>("#email");
        const email = emailInput?.value.trim() ?? "";
        const passwordInput = loginForm.querySelector<HTMLInputElement>("#password");
        const password = passwordInput?.value.trim() ?? "";
        let exitsUser = false

        //TODO QUITAR ESTO
        for (const user of allusers) {
            if (user.password == password && user.correo == email) {
                exitsUser = true
                break;
            }
        }
        if (exitsUser) {
            const role = getRoleForEmail(email);
            const events: number[] = [1]
            setActiveSession(email, role, events);
            navigate("/home");
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "EMAIL O CONTRASEÑA INCORRECTA!",
            });
            
        }
    });
}
