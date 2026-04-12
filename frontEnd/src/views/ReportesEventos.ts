import {Header} from "../Components/header.ts";
import type {Event} from "../helpers/data.ts";
import {getEvents} from "../helpers/events.ts";

export function Reporte(events: Event[]) {
    let eventosAcademicos = 0
    let eventosCulturales = 0
    let eventosRecreativos = 0
    let eventosTotales = 0
    let asistentes = 0
    let cupos = 0

    for (const event of events) {

        if (event.category === "Academico") {
            eventosAcademicos++
            eventosTotales++
            cupos += event.spaces
            asistentes += event.participants
        } else if (event.category === "Cultural") {
            eventosCulturales++
            eventosTotales++
            cupos += event.spaces
            asistentes += event.participants
        } else if (event.category === "Recreativo") {
            eventosRecreativos++
            eventosTotales++
            cupos += event.spaces
            asistentes += event.participants
        }
    }
    const promedioAsitentes = events.length > 0 ? (asistentes / events.length).toFixed(2) : 0;
    const porcentajeOcupacion = cupos > 0 ? ((asistentes / cupos) * 100).toFixed(2) : 0;

    return `<div class="grid gap-4 md:grid-cols-3">
              <div class="rounded-lg border border-[#d8d8d8] bg-white px-6 py-5 text-center shadow-sm">
                <p class="text-lg font-semibold text-black">Eventos Realizados</p>
                <p class="mt-2 text-3xl font-bold text-blue-700">${eventosTotales}</p>
              </div>

              <div class="rounded-lg border border-[#d8d8d8] bg-white px-6 py-5 text-center shadow-sm">
                <p class="text-lg font-semibold text-black">Promedio de Asistentes</p>
                <p class="mt-2 text-3xl font-bold text-blue-700">${promedioAsitentes}%</p>
              </div>

              <div class="rounded-lg border border-[#d8d8d8] bg-white px-6 py-5 text-center shadow-sm">
                <p class="text-lg font-semibold text-black">Porcentaje de Ocupacion</p>
                <p class="mt-2 text-3xl font-bold text-blue-700">${porcentajeOcupacion}%</p>
              </div>
            </div>

            <div class="rounded-lg border border-[#d8d8d8] bg-white p-5 shadow-sm">
              <h2 class="mb-4 text-2xl font-bold text-black">Eventos por Categoria</h2>
              <div class="overflow-x-auto">
                <table class="w-full min-w-[520px] border-collapse">
                  <thead>
                    <tr class="bg-[#e6e9ef] text-left text-sm font-semibold text-black">
                      <th class="border border-[#d8d8d8] px-4 py-3">Categoria</th>
                      <th class="border border-[#d8d8d8] px-4 py-3">Numero de Eventos</th>
                    </tr>
                  </thead>
                  <tbody class="text-black">
                    <tr>
                      <td class="border border-[#d8d8d8] px-4 py-3">Academico</td>
                      <td class="border border-[#d8d8d8] px-4 py-3">${eventosAcademicos}</td>
                    </tr>
                    <tr>
                      <td class="border border-[#d8d8d8] px-4 py-3">Cultural</td>
                      <td class="border border-[#d8d8d8] px-4 py-3">${eventosCulturales}</td>
                    </tr>
                    <tr>
                      <td class="border border-[#d8d8d8] px-4 py-3">Recreativo</td>
                      <td class="border border-[#d8d8d8] px-4 py-3">${eventosRecreativos}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>`
}

export function Reportes() {

    const reporteHTML = Reporte(getEvents())

    return `
        ${Header()}
        <div class="min-h-[calc(100dvh-80px)] bg-[#E8E8E8] px-6 py-8">
          <div class="mx-auto flex w-full max-w-5xl flex-col gap-6 rounded-xl border border-[#d8d8d8] bg-[#efefef] p-6 shadow-md">
            <div class="flex flex-col gap-4 rounded-lg border border-[#d8d8d8] bg-white p-5 md:flex-row md:items-end">
              <div class="flex flex-1 flex-col gap-2">
                <label for="fechaInicio" class="text-sm font-semibold text-black">
                  Fecha inicio
                </label>
                <input
                  id="fechaInicio"
                  type="date"
                  class="rounded-md border border-[#d8d8d8] bg-white px-4 py-3 text-base text-black outline-none"
                >
              </div>

              <div class="flex flex-1 flex-col gap-2">
                <label for="fechaFinal" class="text-sm font-semibold text-black">
                  Fecha final
                </label>
                <input
                  id="fechaFinal"
                  type="date"
                  class="rounded-md border border-[#d8d8d8] bg-white px-4 py-3 text-base text-black outline-none"
                >
              </div>

              <button 
                type="button"
                id="send"
                class="rounded-md bg-blue-900 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-800">
                Generar
              </button>
            </div>
            ${reporteHTML}
            
          </div>
        </div>
    `
}
