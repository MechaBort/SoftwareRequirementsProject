import {Header} from "../Components/header.ts";
import {getActiveSession} from "../utils/session";
import {EventCard} from "../Components/eventCard.ts";
import {getEvents} from "../helpers/events.ts";
import Swal from "sweetalert2";


export function Home() {
    const sessionUser = getActiveSession();
    const events = getEvents()

    let eventsHtml: string = ""

    events.forEach(event => {
        if (event.accepted)
            eventsHtml += EventCard(event);
    })

    return `
    ${Header()}
    <div class="bg-gray-200 pb-24">
        <div class="flex justify-center py-10  gap-x-2 text-4xl text-black"> EVENTOS </div>
        <div class="px-10 py-4 text-lg text-gray-700">
          Sesion actual: ${sessionUser ? `${sessionUser.email} (${sessionUser.role})` : "sin sesion"}
        </div>
        <div class="py-1 px-10 gap-x-2 text-xl text-blue-800"> Filtra el evento que mejor se adapte a ti. </div>
     
        <div class="p-4 mx-6 mt-4  flex flex-wrap items-center gap-6 justify-center">
          <div class="flex  flex-col  rounded-md px-3 py-2 w-64">
          <span class="text-[10px] uppercase font-bold mb-1">Titulo</span>
            <input 
              type="text" 
              placeholder="Buscar evento por nombre..." 
              class="bg-gray-500 text-white placeholder-gray-300 px-4 py-2 rounded-md outline-none"
            >
          </div>
        
          <div class="flex flex-col">
            <span class="text-[10px] uppercase font-bold mb-1">Categoría</span>
            <select id="categoryFilter" class="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer outline-none hover:bg-gray-600 transition-colors">
              <option value="">Todas</option>
              <option value="Academico">Académico</option>
              <option value="Cultural">Cultural</option>
              <option value="Recreativo">Recreativo</option>
            </select>
          </div>
        
          <div class="flex flex-col">
            <span class="text-[10px] uppercase font-bold mb-1">Fecha</span>
            <select id="dateFilter" class="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer outline-none hover:bg-gray-600 transition-colors">
              <option value="">Cualquier fecha</option>
              <option value="semana">Esta semana</option>
              <option value="mes">Este mes</option>
              <option value="proximos">Próximos eventos</option>
            </select>
          </div>
        
          <div class="flex flex-col">
            <span class="text-[10px] uppercase font-bold mb-1">Modalidad</span>
            <select id="modalityFilter" class="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer outline-none hover:bg-gray-600 transition-colors">
              <option value="">Ambas</option>
              <option value="Presencial">Presencial</option>
              <option value="Virtual">Virtual</option>
            </select>
          </div>
  
  <div class="flex flex-col">
    <span class="text-[10px] uppercase font-bold mb-1">Organizador</span>
    <select id="organizerFilter" class="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer outline-none hover:bg-gray-600 transition-colors">
      <option value="">Cualquiera</option>
      <option value="Presencial">TEC</option>
      <option value="Virtual">ASODEC</option>
      <option value="Virtual">FEITEC</option>
    </select>
  </div>
</div>
        <div id="cardsEvents" class="max-w-7xl m-auto px-10 pt-8 flex flex-col gap-8"> 
            ${eventsHtml}
        </div>
        <button type="button" id="announcement-button" class="fixed bottom-6 right-6 z-50 hover:scale-110">
            <svg width="50px" height="50px" viewBox="0 0 24 24" id="magicoon-Filled" xmlns="http://www.w3.org/2000/svg">
            <defs>
            <style>.cls-1{fill:#41416e;}</style>
            </defs>
            <title>exclamation-circle</title>
            <g id="exclamation-circle-Filled">
            <path id="exclamation-circle-Filled-2" data-name="exclamation-circle-Filled" class="cls-1" d="M12,2A10,10,0,1,0,22,12,10.016,10.016,0,0,0,12,2Zm0,15a1,1,0,1,1,1-1A1,1,0,0,1,12,17Zm1-5a1,1,0,0,1-2,0V8a1,1,0,0,1,2,0Z"/>
            </g>
            </svg>
        </button>
    </div>
  `;
}

export function initHomeEvents() {
    const categoryFilter = document.getElementById("categoryFilter");
    const dateFilter = document.getElementById("dateFilter");
    const modalityFilter = document.getElementById("modalityFilter");
    const organizerFilter = document.getElementById("organizerFilter");
    const announcementButton = document.querySelector<HTMLButtonElement>("#announcement-button");

    announcementButton?.addEventListener("click", event => {
        event.preventDefault();
        Swal.fire({
            title: "Anuncio Importante!",
            text: "Promocion de pavos en SIMSO STORE.",
            icon: "info",
        });
    })

    categoryFilter?.addEventListener("change", (event) => {
        event.preventDefault();
        const valueCategory = (event.target as HTMLInputElement).value;
    })

    dateFilter?.addEventListener("change", (event) => {
        event.preventDefault();
        const valueDate = (event.target as HTMLInputElement).value;
    })

    modalityFilter?.addEventListener("change", (event) => {
        event.preventDefault();
        const modalityMode = (event.target as HTMLInputElement).value;
    })

    organizerFilter?.addEventListener("change", (event) => {
        event.preventDefault();
        const valueOrganizer = (event.target as HTMLInputElement).value;
    })
}
