import {Header} from "../Components/header.ts";
import {navigate} from "../Router.ts";


export function Anuncios() {

    return `
        ${Header()}
        <div class="flex flex-col items-center justify-center px-64">
          <div class="px-3 py-6 font-bold text-3xl">
            ANUNCIOS
          </div>
        </div>
        <div class="mx-auto flex w-full max-w-4xl flex-col gap-8 rounded-md bg-gray-400 px-10 py-10 font-sans text-xl">
          <div class="flex items-center gap-6">
            <label for="tituloAnuncio" class="min-w-52 font-semibold text-black">
              Titulo del anuncio
            </label>
            <input
              id="tituloAnuncio"
              type="text"
              placeholder="Escribe el titulo"
              class="w-full rounded-md bg-white px-4 py-3 text-base text-black outline-none"
            >
          </div>

          <div class="flex flex-col gap-3">
            <label for="descripcionAnuncio" class="font-semibold text-black">
              Descripcion del anuncio
            </label>
            <textarea
              id="descripcionAnuncio"
              placeholder="Escribe la descripcion"
              class="min-h-48 w-full rounded-md bg-white px-4 py-3 text-base text-black outline-none"
            ></textarea>
          </div>

          <button
            type="button"
            id="send"
            class="self-end rounded-md bg-blue-900 px-8 py-3 text-base font-bold text-white transition-colors hover:bg-blue-800"
          >
            Enviar anuncio
          </button>
        </div>
    `
}


export function initAnunciosEvents() {
    const sendBtn = document.querySelector<HTMLButtonElement>("#send");


    sendBtn?.addEventListener("click", event => {
        event.preventDefault();
        const desInput = document.querySelector<HTMLInputElement>("#descripcionAnuncio");
        const titleInput = document.querySelector<HTMLInputElement>("#tituloAnuncio");

        const description = desInput?.value
        const title = titleInput?.value

        navigate("/home");
    })
}