import {Header} from "../Components/header.ts";
import {type Event} from "../helpers/data.ts";
import {getActiveSession, getEmail, isAlreadyRegistered} from "../utils/session.ts";
import Swal from "sweetalert2";
import {addParticipant, getEventsNotAccepted, removeParticipant} from "../helpers/events.ts";
import {navigate} from "../Router.ts";

export function receiveEvent(evento: Event) {
    return `
            <div class="grid grid-cols-[1fr,4fr] items-center bg-gray-50 border border-slate-600 border-1 rounded-2xl w-full max-w-4xl">
            <div class="text-2xl border-slate-600 border-r-2 h-full flex items-center self-center justify-center bg-blue-800 text-white font-medium rounded-l-2xl">
           ${evento.date.toLocaleDateString()}
        </div>

        <div class="py-4 px-8 text-2xl text-black h-full flex items-start justify-between gap-8">
            <div class="flex-1 flex flex-col h-full">
            <div class="text-lg font-medium">${evento.name}</div>
            <div class="text-base max-w-[90%] pt-6">${evento.description}</div>
            <div class="text-[#3E50A6] font-medium text-base pt-4 mt-auto">${evento.category}</div>
            </div>
            <div class="grid grid-cols-1 gap-3 min-w-[150px]">
                <button
                    type="button"
                    class="accept-btn bg-green-700 hover:bg-green-600 border border-black rounded-md font-bold cursor-pointer text-xl transition-colors px-4 py-2"
                >
                    Aceptar
                </button>
                <button
                    type="button"
                    class="decline-btn bg-red-700 hover:bg-red-600 border border-black rounded-md font-bold cursor-pointer text-xl transition-colors px-4 py-2"
                >
                    rechazar
                </button>
                <button
                    type="button"
                    type="button"
                    data-event-id="${evento.id}"
                    data-event-name="${evento.name}"
                    data-event-description="${evento.description}"
                    data-event-category="${evento.category}"
                    data-event-date="${evento.date}"
                    data-event-organizer="${evento.organizer}"
                    data-event-link="${evento.link}"
                    data-event-place="${evento.place}"
                    data-event-spaces="${evento.spaces}"
                    class="see-more-btn bg-blue-600 hover:bg-blue-500 font-bold border border-black rounded-md cursor-pointer text-xl transition-colors px-4 py-2"
                >
                    ver mas
                </button>
            </div>
                </div>
            </div>`
}

export function solicitudEvento() {
    const eventos = getEventsNotAccepted()
    let eventHTML = ""
    for (const evento of eventos) {
        eventHTML = receiveEvent(evento)
    }


    return `
        ${Header()}
        <div class="min-h-screen px-6 py-8">
            <div class="text-center text-2xl font-bold mb-8">SOLICITUDES DE EVENTOS</div>
        
            <div class="flex justify-center">${eventHTML}</div>
        
        
        </div>
    `
}

export function initsolicitudEventosEvents() {
    const seeMore = document.querySelectorAll<HTMLButtonElement>(".see-more-btn");
    const decline = document.querySelectorAll<HTMLButtonElement>(".decline-btn");
    const accept = document.querySelectorAll<HTMLButtonElement>(".accept-btn");

    accept.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            Swal.fire({
                title: "Se acepto el evento!",
                icon: "success",
            });
        })
    })

    decline.forEach(button => {
        button.addEventListener("click", (evento) => {
            evento.preventDefault();
            Swal.fire({
                title: "Seguro que quieres rechazar el evento?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Rechazar",
                returnInputValueOnDeny: true
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    title: "¿Razón para rechazar el evento?",
                    input: "textarea",
                    icon: "warning",
                    inputPlaceholder: "Rechazar el evento",
                    width: "700px",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Rechazar",
                    cancelButtonText: "Cancelar",
                    inputValidator: (value) => {
                        if (!value || !value.trim()) return "Debes escribir una razón";
                    }

                }).then((result) => {
                    if (result.isConfirmed) {
                        const mensaje = result.value;
                        Swal.fire({
                            title: "Se rechazó correctamente!",
                            icon: "success"
                        });
                        //enviarMensje(mensaje)
                    }
                });
            });
        });

        seeMore.forEach((button) => {
            button.addEventListener("click", (evento) => {
                evento.preventDefault();
                const eventDate = button.dataset.eventDate
                    ? new Date(button.dataset.eventDate).toLocaleDateString()
                    : "Sin fecha definida";
                const organizer = button.dataset.eventOrganizer || "No definido";
                const place = button.dataset.eventPlace || "NULL";
                const link = button.dataset.eventLink || "NULL";
                const spaces = button.dataset.eventSpaces || "0";
                const category = button.dataset.eventCategory || "No definida";
                const eventId = Number.parseInt(button.dataset.eventId || '0');
                const isStudent = getActiveSession()?.role === "estudiante";
                if (!eventId || eventId == 0) {
                    console.error(`Event id ${eventId} not found.`);
                    return;
                }
                if (!isAlreadyRegistered(eventId)) {

                }
                Swal.fire({

                    title: button.dataset.eventName || "Evento",

                    confirmButtonText: isAlreadyRegistered(eventId) ? "Desinscribirse" : "Inscribirse",
                    customClass: {
                        confirmButton: isAlreadyRegistered(eventId)
                            ? "rounded-xl px-5 py-2.5 font-semibold text-white bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg transition-all focus:outline-none"
                            : "rounded-xl px-5 py-2.5 font-semibold text-white bg-green-500 hover:bg-green-600 shadow-md hover:shadow-lg transition-all focus:outline-none"
                    },
                    buttonsStyling: false,
                    didOpen: () => {
                        const confirmButton = Swal.getConfirmButton();

                        if (!confirmButton || isStudent) {
                            return;
                        }

                        confirmButton.disabled = true;
                        confirmButton.classList.remove("bg-red-500", "hover:bg-red-600", "bg-green-500", "hover:bg-green-600");
                        confirmButton.classList.add("bg-gray-500", "hover:bg-gray-500", "cursor-not-allowed");
                    },

                    html: `
                    <div class="flex flex-col gap-4 text-left">
                        <div class="flex items-center justify-between px-4 text-sm text-slate-700">
                            <div class="text-left">
                                <span class="font-semibold">Organizer:</span> ${organizer}
                            </div>
                            <div class="text-right">
                                <span class="font-semibold">Date:</span> ${eventDate}
                            </div>
                        </div> Description: 
                        <p class="m-0 px-4 text-base leading-7 text-slate-800 text-left bg-gray-200 rounded-2xl min-h-14"> 
                            ${button.dataset.eventDescription || "Sin descripcion disponible"}
                        </p>
                    </div>
                `,
                    width: "800px",
                    icon: "info",
                    footer: `
                    <div class="grid w-full grid-cols-1 gap-x-6 gap-y-2 px-4 text-left text-sm text-slate-700 sm:grid-cols-2">
                        <div class="text-left"><span class="font-semibold">Place:</span> ${place}</div>
                        <div class="text-right"> <span class="font-semibold">Link:</span> ${link}</div>
                        <div class="text-left"><span class="font-semibold">Type:</span> ${category}</div>
                        <div class="text-right"><span class="font-semibold">Spaces:</span> ${spaces}</div>
                    </div>
                `
                }).then(result => {
                    if (result.isConfirmed) {
                        if (!isAlreadyRegistered(eventId)) {
                            addParticipant(eventId, getEmail())
                        } else {
                            removeParticipant(eventId, getEmail())
                        }
                        Swal.fire({

                            title: isAlreadyRegistered(eventId) ? "Te haz inscrito correctamente!" : "Te haz desinscrito correctamente!",
                            text: isAlreadyRegistered(eventId) ? `Te haz inscrito en ${button.dataset.eventName}` : `Te haz desinscrito en ${button.dataset.eventName}`,
                            icon: "success"
                        });
                        navigate("/home")
                    }
                });
            });
        });
    })
}