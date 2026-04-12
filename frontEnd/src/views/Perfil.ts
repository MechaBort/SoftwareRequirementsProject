import {Header} from "../Components/header.ts";
import {getEmail, getEvents, getRoleForEmail} from "../utils/session.ts";
import {getEventsById, getEventsCreatedByMe} from "../helpers/events.ts";
import {EventCard} from "../Components/eventCard.ts";

export function Perfil() {
    const role: String = getRoleForEmail(getEmail())
    if (role == "organizador") {
        const events = getEventsCreatedByMe(getEmail());
        let eventsHtml: string = ""

        events.forEach(event => {
            eventsHtml += EventCard(event);
        })
        return `
    ${Header()}
    
    <div class="bg-gray-200 pb-24">
        <div class="flex justify-center py-10  gap-x-2 text-4xl text-black"> EVENTOS CREADOS POR MI </div>
        <div class="max-w-7xl m-auto px-10 pt-8 flex flex-col gap-8"> 
            ${eventsHtml}
        </div>
    </div>
    `;
    } else {
        const eventsIds = getEvents()
        const events = getEventsById(eventsIds)
        let eventsHtml = ""
        events.forEach(event => {
            eventsHtml += EventCard(event)
        })
        return `
    ${Header()}
    
    <div class="bg-gray-200 pb-24">
        <div class="flex justify-center py-10  gap-x-2 text-4xl text-black"> EVENTOS INSCRITO </div>
        <div class="max-w-7xl m-auto px-10 pt-8 flex flex-col gap-8"> 
            ${eventsHtml}
        </div>
    </div>
    `;
    }
}
