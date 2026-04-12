import type {Event} from "../helpers/data.ts";
import Swal from "sweetalert2";
import {addParticipant, removeParticipant} from "../helpers/events.ts";
import {getActiveSession, getEmail, isAlreadyRegistered} from "../utils/session.ts";
import {navigate} from "../Router.ts";

export function EventCard(evento: Event) {
    let editarOrganizador = false
    let editarAdmin = false
    if (getActiveSession()?.role === "organizador" && evento.createdBy === getEmail()) {
        editarOrganizador = true
    }
    if (getActiveSession()?.role === "admin") {
        editarAdmin = true
    }


    return `
    <div class="grid grid-cols-[1fr,4fr] items-center bg-gray-50 border border-slate-600 border-1 rounded-2xl">
        <div class="py-8 px-8 text-2xl border-slate-600 border-r-2 h-full flex items-center self-center justify-center bg-blue-800 text-white font-medium rounded-2xl">
           ${evento.date.toLocaleDateString()}
        </div>

        <div class="py-4 px-8 text-2xl text-black h-full relative">
            <div class="text-lg font-medium">${evento.name}</div>
            <div class="text-base max-w-[90%] pt-6">${evento.description}</div>
            <div class="text-[#3E50A6] font-medium text-base absolute top-3 right-6">${evento.category}</div>
            ${editarAdmin ? ` <div class="text-base max-w-[90%] absolute bottom-0 right-28 pt-6">
                <button
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
                class="hover:scale-110 transition-transform edit-button"
                >
                    <svg width="40px" height="40px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <title>edit_2_fill</title>
                        <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Editor" transform="translate(-96.000000, -240.000000)" fill-rule="nonzero">
                                <g id="edit_2_fill" transform="translate(96.000000, 240.000000)">
                                    <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero"></path>
                                    <path d="M10.7559,6.16997 L17.8269,13.241 L10.6532,20.4148 C10.3197778,20.7482222 9.88080296,20.9517481 9.41483139,20.9928598 L9.23898,21.0006 L4.00634,21.0006 C3.48575467,21.0006 3.0571064,20.6066836 3.00226701,20.1006493 L2.99634,19.9906 L2.99634,14.7579 C2.99634,14.2864333 3.16282691,13.8321123 3.46324765,13.473528 L3.58212,13.3437 L10.7559,6.16997 Z M13.8958,3.03 C14.6357895,2.29005789 15.8112493,2.25111357 16.5970778,2.91316704 L16.7243,3.03 L20.9669,7.27264 C21.7067947,8.01258211 21.7457366,9.18806637 21.0837255,9.97388053 L20.9669,10.1011 L19.2411,11.8268 L12.1701,4.75576 L13.8958,3.03 Z" id="形状" fill="#09244B"></path></g></g></g>
                        </svg>
                </button>
            </div>
            ` : ""}
            ${editarOrganizador ? ` <div class="text-base max-w-[90%] absolute bottom-0 right-28 pt-6">
                <button
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
                class="hover:scale-110 transition-transform edit-button"
                >
                    <svg width="40px" height="40px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <title>edit_2_fill</title>
                        <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Editor" transform="translate(-96.000000, -240.000000)" fill-rule="nonzero">
                                <g id="edit_2_fill" transform="translate(96.000000, 240.000000)">
                                    <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero"></path>
                                    <path d="M10.7559,6.16997 L17.8269,13.241 L10.6532,20.4148 C10.3197778,20.7482222 9.88080296,20.9517481 9.41483139,20.9928598 L9.23898,21.0006 L4.00634,21.0006 C3.48575467,21.0006 3.0571064,20.6066836 3.00226701,20.1006493 L2.99634,19.9906 L2.99634,14.7579 C2.99634,14.2864333 3.16282691,13.8321123 3.46324765,13.473528 L3.58212,13.3437 L10.7559,6.16997 Z M13.8958,3.03 C14.6357895,2.29005789 15.8112493,2.25111357 16.5970778,2.91316704 L16.7243,3.03 L20.9669,7.27264 C21.7067947,8.01258211 21.7457366,9.18806637 21.0837255,9.97388053 L20.9669,10.1011 L19.2411,11.8268 L12.1701,4.75576 L13.8958,3.03 Z" id="形状" fill="#09244B"></path></g></g></g>
                        </svg>
                </button>
            </div>
            ` : ""}
            <div class="text-base absolute bottom-3 right-6">
                <button
                
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
                    class="see-more-button text-[#3E50A6] font-bold cursor-pointer text-xl hover:scale-110 transition-transform hover:text-[#043565]"
                >
                    ver mas
                </button>
            </div>
        </div>
    </div>
    `;
}

export function initEventCardEvents() {
    const seeMore = document.querySelectorAll<HTMLButtonElement>(".see-more-button");
    const editBtn = document.querySelectorAll<HTMLButtonElement>(".edit-button");

    editBtn.forEach((btn) => {
        btn.addEventListener("click", () => navigate(`/edit?id=${btn.dataset.eventId}`));
    })

    seeMore.forEach((button) => {
        button.addEventListener("click", () => {
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
}
