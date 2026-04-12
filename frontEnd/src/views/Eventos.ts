import { Header } from "../Components/header.ts";
import {navigate} from "../Router.ts";
import Swal from "sweetalert2";

export function Eventos() {
    return `
    ${Header()}
    <div class = "min-h-[calc(100dvh-80px)] bg-[#E8E8E8] px-6 py-8 overflow-y-auto flex justify-center items-start"> 
      <form id = "miEventoForm" class = "bg-[#C7C7C7] p-10 rounded-lg shadow-xl w-full max-w-2xl border border-[#ABABAB]"> 
        
        <h2 class = "text-4xl font-bold text-center mb-8 text-black uppercase"> Crear Evento </h2>

        <div class = "flex items-center mb-6 gap-4">
          <label for = "title" class = "w-32 font-semibold text-black"> Titulo: </label>
          <input 
            type = "text" 
            id = "title" 
            name = "title"
            placeholder = "Charla compa de Aurelio" 
            class="flex-1 bg-gray-500 px-3 py-2 rounded-md text-white"
            required
          >
        </div>

        <div class="flex items-center mb-6 gap-4">
          <label for="descripcion" class="w-32 font-semibold text-black"> Descripcion:</label>
          <input 
            type = "text" 
            id = "descripcion" 
            name = "descripcion"
            placeholder = "habla sobre linux xD" 
            class = "flex-1 bg-gray-500 px-3 py-2 rounded-md text-white"
            required
          >
        </div>
        <div class = "flex items-center mb-6 gap-4">
          <label for = "categoria" class = "w-32 font-semibold text-black"> Categoria: </label>
          <select 
            id = "categoria" 
            name = "categoria"
            class="flex-1 bg-gray-500 px-3 py-2 rounded-md text-white"
            required
          >
          <option value="Academico">Académico</option>
            <option value="Cultural">Cultural</option>
            <option value="Recreativo">Recreativo</option> 
            </select>
        </div>
        <div class = "flex items-center mb-6 gap-4">
          <label for = "Organizador" class = "w-32 font-semibold text-black"> Organizador: </label>
          <input 
            type = "text" 
            id = "Organizador" 
            name = "Organizador"
            placeholder = "ASODEC" 
            class="flex-1 bg-gray-500 px-3 py-2 rounded-md text-white"
            required
          >
        </div>
        <div class="flex items-center mb-6 gap-4">
          <label for="fecha" class="w-32 font-semibold text-black"> Fecha y Hora:</label>
          <input 
            type = "date" 
            id = "fecha" 
            name = "fecha"
            class = "flex-1 bg-gray-500 px-3 py-2 rounded-md text-white"
            required
          >
        </div>
        <div class="flex items-center mb-6 gap-4">
          <label for="modalidad" class="w-32 font-semibold text-black"> Modalidad:</label>
          <select 
            id = "modalidad" 
            name = "modalidad"
            class = "flex-1 bg-gray-500 px-3 py-2 rounded-md text-white"
            required
          >
          <option value="Presencial">Presencial</option>
            <option value="Virtual">Virtual</option>
            
            </select>
        </div>
        <div class="flex items-center mb-6 gap-4">
          <label for="cupos" class="w-32 font-semibold text-black"> Cupos:</label>
          <input 
            type = "number" 
            id = "cupos" 
            name = "cupos"
            placeholder = "100" 
            class = "flex-1 bg-gray-500 px-3 py-2 rounded-md text-white"
            
          >
        </div>
        <div class="flex items-center mb-6 gap-4">
          <label for="lugar" class="w-32 font-semibold text-black"> Lugar:</label>
          <input 
            type = "text" 
            id = "lugar" 
            name = "lugar"
            placeholder = "Centro de las artes" 
            class = "flex-1 bg-gray-500 px-3 py-2 rounded-md text-white"
            
          >
        </div>
        <div class="flex items-center mb-6 gap-4">
          <label for="link" class="w-32 font-semibold text-black"> Link:</label>
          <input 
            type = "text" 
            id = "link" 
            name = "link"
            placeholder = "https://itcr.zoom.us/example.1" 
            class = "flex-1 bg-gray-500 px-3 py-2 rounded-md text-white"
            
          >
        </div>

        <button type = "submit" class = "bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-md w-full transition-colors shadow-lg">
          CREAR
        </button>
      </form>
    </div>
    `;
}


export function initEventosEvents() {
    const miEventoForm = document.querySelector<HTMLFormElement>("#miEventoForm");

    if (!miEventoForm) {
        return;
    }

    miEventoForm.addEventListener("submit", (event) => {
        event.preventDefault();



        Swal.fire({
            title: "Se creo el evento correctamente!",
            icon: "success",
        });

        navigate("/home");
    });
}