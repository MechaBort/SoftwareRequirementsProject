import "toastify-js/src/toastify.css";
import "./css/style.css";
import "./css/header.css";
import {initEventCardEvents} from "./Components/eventCard";
import {Home, initHomeEvents} from "./views/Home";
import {Eventos, initEventosEvents} from "./views/Eventos";
import {initRouter, navigate} from "./Router";
import {Perfil} from "./views/Perfil";
import {initLogInEvents, LogIn} from "./views/Log In";
import {initRegistroEvents, registro} from "./views/Registro";
import {clearActiveSession} from "./utils/session";
import {Edit, initEditEvents} from "./views/edit.ts";
import {Anuncios, initAnunciosEvents} from "./views/Anuncios.ts";
import {Reportes} from "./views/ReportesEventos.ts";
import {initsolicitudEventosEvents, solicitudEvento} from "./views/solicitudesEventos.ts";
import {Organizadores} from "./views/Organizadores.ts";

const appDiv = document.getElementById("app");

function render(content: string, setup?: () => void) {
    if (!appDiv) {
        return;
    }

    appDiv.innerHTML = content;
    setupNavigation();
    setup?.();
}

function setupNavigation() {
    const profileBtn = document.querySelector<HTMLButtonElement>("#profileBtn");
    const logoutBtn = document.querySelector<HTMLButtonElement>("#logoutBtn");
    const eventsBtn = document.querySelector<HTMLButtonElement>("#eventsBtn");
    const hamburgerBtn = document.querySelector<HTMLButtonElement>("#hamburger-button");
    const hamburgerMenu = document.querySelector<HTMLElement>("#hamburger-menu");

    profileBtn?.addEventListener("click", () => navigate("/perfil"));
    eventsBtn?.addEventListener("click", () => navigate("/eventos"));
    logoutBtn?.addEventListener("click", () => {
        clearActiveSession();
        navigate("/");
    });

    hamburgerBtn?.addEventListener("click", () => {
        hamburgerMenu?.classList.toggle("hidden");
        hamburgerMenu?.classList.toggle("flex");
    })

}

initRouter({
    "/home": () => render(Home(), () => {
        initEventCardEvents();
        initHomeEvents();
    }),
    "/perfil": () => render(Perfil(), initEventCardEvents),
    "/eventos": () => render(Eventos(), initEventosEvents),
    "/": () => render(LogIn(), initLogInEvents),
    "/registro": () => render(registro(), initRegistroEvents),
    "/edit": (match) => render(Edit(match.params?.id), initEditEvents),
    "/anuncios": () => render(Anuncios(), initAnunciosEvents),
    "/reportes": () => render(Reportes()),
    "/solicitudes": () => render(solicitudEvento(), initsolicitudEventosEvents),
    "/organizadores": () => render(Organizadores())
});
