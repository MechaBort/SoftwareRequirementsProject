import {Header} from "../Components/header.ts";
import {type Usuario, usuarios} from "../helpers/data.ts";
import {getRoleForEmail} from "../utils/session.ts";

export function createOrganizadores(organizador: Usuario) {
    return `<tr>
            <td class="border border-black">${organizador.name} ${organizador.apellido1} ${organizador.apellido2}</td>
            <td class="border border-black">${organizador.correo}</td>
            <td class="border border-black place-items-center">${organizador.eventsCreated}</td>
            <td class="border border-black place-items-center"> <input type="checkbox" name="Asistencia" id="Asistencia" class="w-16"></td>
            </tr>
        `
}

export function Organizadores() {
    let usuariosEncontrar: Usuario[] = [];
    let usuario: Usuario;
    let organizadoresHTML = ""
    for (const usuario of usuarios) {
        if (getRoleForEmail(usuario.correo) == "organizador") {
            usuariosEncontrar.push(usuario);
        }
    }
    console.log(usuariosEncontrar);
    for (usuario of usuariosEncontrar) {
        organizadoresHTML += createOrganizadores(usuario);
    }

    return `
        ${Header()}
        <div class="flex flex-col w-full items-center"> 
           <h2 class="py-3 text-2xl font-bold text-center">ORGANIZADORES</h2>
           <div class="p-4 mx-6 mt-4  flex flex-wrap items-center gap-6 justify-center">
          <div class="flex  flex-col  rounded-md px-3 py-2 w-80">
          <span class="text-[10px] uppercase font-bold mb-1">Nombre</span>
            <input 
              type="text" 
              placeholder="Buscar organizador por nombre..." 
              class="bg-gray-500 text-white placeholder-gray-300 px-4 py-2 rounded-md outline-none"
            >
          </div>
        
          <div class="flex  flex-col  rounded-md px-3 py-2 w-80">
          <span class="text-[10px] uppercase font-bold mb-1">Correo</span>
            <input 
              type="text" 
              placeholder="Buscar organizador por correo..." 
              class="bg-gray-500 text-white placeholder-gray-300 px-4 py-2 rounded-md outline-none"
            >
          </div>
          </div>
           <table class="text-center">
               <tr>
                    <th class="px-2 border border-black">Nombre Completo</th>
                    <th class="px-2 border border-black">Correo Electronico</th>
                    <th class="px-2 border border-black">Eventos Creados</th>
                    <th class="px-2 border border-black">¿Activo?</th>
                </tr>
              ${organizadoresHTML}
           </table>
        </div>
    `
}
