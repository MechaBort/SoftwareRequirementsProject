import {Header} from "../Components/header.ts";
import {navigate} from "../Router.ts";
import Swal from "sweetalert2";
import {type Category, getEventsById, type Modality} from "../helpers/events.ts";
import {type Usuario, usuarios} from "../helpers/data.ts";

export function createParticipant(usuario: Usuario) {

    return `<tr>
            <td class="border border-black">${usuario.name} ${usuario.apellido1} ${usuario.apellido2}</td>
            <td class="border border-black">${usuario.carnet}</td>
            <td class="border border-black place-items-center">${usuario.correo}</td>
            <td class="border border-black place-items-center">${new Date().toDateString()}</td>
            <td class="border border-black place-items-center"> <input type="checkbox" name="Asistencia" id="Asistencia" class="w-16"></td>
            </tr>
        `
}

export function Edit(id: number) {

    const event = getEventsById([id])
    let eventData = event[0];
    let participantesHtml = ""
    for (const usuario of usuarios) {
        participantesHtml += createParticipant(usuario);
    }

    function isCategory(category: Category): boolean {
        return eventData.category == category;
    }

    function isModality(modality: Modality): boolean {
        return eventData.modality == modality;
    }

    return `
    ${Header()}
    <div class = "min-h-[calc(100dvh-80px)] bg-[#E8E8E8] px-6 py-8 overflow-y-auto flex justify-center items-start"> 
        <div>
        <form id = "miEventoForm" class = "bg-[#C7C7C7] p-10 rounded-lg shadow-xl w-full max-w-2xl border border-[#ABABAB]"> 
        
        <h2 class = "text-4xl font-bold text-center mb-8 text-black uppercase"> Editar Evento </h2>
        
        <div class = "flex items-center mb-6 gap-4">
          <label for = "title" class = "w-32 font-semibold text-black"> Titulo: </label>
          <input 
            type = "text" 
            id = "title" 
            name = "title"
            value = "${eventData.name}"
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
            value = "${eventData.description}"
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
            <option value="Academico" ${isCategory('Academico') ? "selected" : ""}>Académico</option>
            <option value="Cultural" ${isCategory('Cultural') ? "selected" : ""}>Cultural</option>
            <option value="Recreativo" ${isCategory('Recreativo') ? "selected" : ""}>Recreativo</option> 
          </select>
        </div>
        <div class = "flex items-center mb-6 gap-4">
          <label for = "Organizador" class = "w-32 font-semibold text-black"> Organizador: </label>
          <input 
            type = "text" 
            id = "Organizador" 
            name = "Organizador"
            value="${eventData.organizer}"
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
            value="${eventData.date.toISOString().split('T')[0]}"
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
          <option value="Presencial" ${isModality('Presencial') ? "selected" : ""}>Presencial</option>
            <option value="Virtual" ${isModality('Virtual') ? "selected" : ""}>Virtual</option>
            
            </select>
        </div>
        <div class="flex items-center mb-6 gap-4">
          <label for="cupos" class="w-32 font-semibold text-black"> Cupos:</label>
          <input 
            type = "number" 
            id = "cupos" 
            name = "cupos"
            value="${eventData.spaces}"
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
            value="${eventData.place}"
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
            value="${eventData.link}"
            placeholder = "https://itcr.zoom.us/example.1" 
            class = "flex-1 bg-gray-500 px-3 py-2 rounded-md text-white"
            
          >
        </div>
        <div class="flex items-center gap-4 justify-center">
            <button type = "button" class = "delete-btn w-52 justify-center bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-md transition-colors shadow-lg">
              Eliminar
            </button>
            <button type = "button" class = "update-btn w-52 justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-md transition-colors shadow-lg">
              Actualizar
            </button>
            <button type = "button" class = "send-btn justify-center hover:scale-110 transition-transform font-bold py-3 rounded-md">
              <svg width="60px" height="60px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>send_plane_fill</title>
                    <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="System" transform="translate(-1104.000000, -48.000000)" fill-rule="nonzero">
                            <g id="send_plane_fill" transform="translate(1104.000000, 48.000000)">
                                <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero"></path>
                                <path d="M21.4325,4.86103 L15.4325,20.361 C15.175,21.0261 14.324,21.2156 13.8087,20.7227 L10.4266,17.4876 L8.35348,19.5607 C8.0385,19.8757 7.49993,19.6526 7.49993,19.2072 L7.49993,14.6882 L2.30868,9.72268 C1.74196,9.1806 1.99133,8.22685 2.75086,8.03155 L20.2509,3.53155 C21.0389,3.32889 21.7262,4.10218 21.4325,4.86103 Z M19,6.00006 L8.03159,13.1534 L9.76704,14.8134 L19,6.00006 Z" id="形状" fill="#09244B"></path>
                    </g>
                        </g>
                            </g>
              </svg>
            </button>
        </div>
        
        </form>
        </div>
        <div class="overflow-y-scroll max-h-96">
           <table>
               <tr>
                    <th class="px-2 border border-black">Nombre Completo</th>
                    <th class="px-2 border border-black">Carnet</th>
                    <th class="px-2 border border-black">Correo Electronico</th>
                    <th class="px-2 border border-black">Fecha inscripción</th>
                    <th class="px-2 border border-black">¿Asistió?</th>
                </tr>
              ${participantesHtml}
           </table>
        </div>
    </div>
    `;
}


export function initEditEvents() {
    const sendBtn = document.querySelector<HTMLFormElement>(".send-btn");
    const deleteBtn = document.querySelector<HTMLFormElement>(".delete-btn");
    const updateBtn = document.querySelector<HTMLFormElement>(".update-btn");

    if (!sendBtn) {
        return;
    }
    if (!deleteBtn) {
        return;
    }

    if (!updateBtn) {
        return;
    }

    sendBtn?.addEventListener("click", (event) => {
        event.preventDefault();
        Swal.fire({
            title: "Enviar Mensaje",
            input: "textarea",
            icon: "warning",
            inputPlaceholder: "Enviar noticia del evento",
            width: "700px",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Enviar Mensaje",
            inputValidator: (value) => {
                if (!value || !value.trim()) return "Debes escribir una razón";
            }

        }).then((result) => {
            if (result.isConfirmed) {
                const mensaje = result.value;
                Swal.fire({
                    title: "Se envio el mensaje!",
                    icon: "success"
                });

                //enviarMensje(mensaje)
            }
        });
    })
    deleteBtn?.addEventListener("click", (event) => {
        event.preventDefault();
        Swal.fire({
            title: "Seguro que quieres eliminarlo?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
            returnInputValueOnDeny: true
        }).then((result) => {
            if (result.isConfirmed) Swal.fire({
                title: "¿Razón para eliminar el evento?",
                input: "textarea",
                icon: "warning",
                inputPlaceholder: "Eliminar el evento",
                width: "700px",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Eliminar",
                cancelButtonText: "Cancelar",
                inputValidator: (value) => {
                    if (!value || !value.trim()) return "Debes escribir una razón";
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const mensaje = result.value;
                    Swal.fire({
                        title: "Se borro correctamente!",
                        text: "El evento se ha eliminado correctamente.",
                        icon: "success"
                    });
                    navigate("/home");
                    //enviarMensje(mensaje)
                }
            });
        });
    })
    updateBtn?.addEventListener("click", (event) => {
        event.preventDefault();
        Swal.fire({
            title: "Se actualizo el evento correctamente!",
            icon: "success",
        });
        navigate("/home");
    })

}