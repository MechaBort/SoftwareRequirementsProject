import {getActiveSession} from "../utils/session";

export function Header() {
    const sessionUser = getActiveSession();
    const showProfile = sessionUser !== null && sessionUser?.role !== "admin";
    const showCreateEvents = sessionUser !== null && sessionUser?.role === "organizador";
    const showSessionActions = sessionUser !== null;
    const canManageUsers = sessionUser?.role === "admin";

    return `
    <header id="main-header" class="z-20 flex items-center justify-between px-6 bg-[#C2C2C2] border-b-2 border-[#757575] font-sans h-20 sticky top-0">
      <div class="flex items-center flex-1 min-w-[250px] h-full relative">
        <img
          src="https://www.tec.ac.cr/sites/default/files/media/branding/logo-tec.png"
          class="h-[120px] w-auto object-contain z-10"
        >
      </div>

      <div class="flex-2 text-center">
        <h1 class="text-3xl font-bold uppercase underline tracking-widest text-black">
          EVENTOS TEC
        </h1>
      </div>

      <div class="flex items-center justify-end gap-6 flex-1">
        
        ${showCreateEvents ? `
          <button id="eventsBtn" class="rounded-md  text-sm font-bold text-white transition-transform hover:scale-110">
            <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z" fill="#1C274C"/>
            </svg>
          </button>
        ` : ""}
        ${showProfile ? `
            
            <button id="profileBtn" class="text-4xl hover:scale-110 transition-transform">
              <svg width="70px" height="70px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z" fill="#1C274C"/>
              </svg>
            </button>
        ` : ""}
         ${
        showSessionActions ? `<button id="logoutBtn" class="text-4xl hover:scale-110 transition-transform">
              <svg width="70px" height="70px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 6.62219V17.245C22 18.3579 21.2857 19.4708 20.1633 19.8754L15.0612 21.7977C14.7551 21.8988 14.449 22 14.0408 22C13.5306 22 12.9184 21.7977 12.4082 21.4942C12.2041 21.2918 11.898 21.0895 11.7959 20.8871H7.91837C6.38776 20.8871 5.06122 19.6731 5.06122 18.0544V17.0427C5.06122 16.638 5.36735 16.2333 5.87755 16.2333C6.38776 16.2333 6.69388 16.5368 6.69388 17.0427V18.0544C6.69388 18.7626 7.30612 19.2684 7.91837 19.2684H11.2857V4.69997H7.91837C7.20408 4.69997 6.69388 5.20582 6.69388 5.91401V6.9257C6.69388 7.33038 6.38776 7.73506 5.87755 7.73506C5.36735 7.73506 5.06122 7.33038 5.06122 6.9257V5.91401C5.06122 4.39646 6.28572 3.08125 7.91837 3.08125H11.7959C12 2.87891 12.2041 2.67657 12.4082 2.47423C13.2245 1.96838 14.1429 1.86721 15.0612 2.17072L20.1633 4.09295C21.1837 4.39646 22 5.50933 22 6.62219Z" fill="#030D45"/>
                <path d="M4.85714 14.8169C4.65306 14.8169 4.44898 14.7158 4.34694 14.6146L2.30612 12.5912C2.20408 12.49 2.20408 12.3889 2.10204 12.3889C2.10204 12.2877 2 12.1865 2 12.0854C2 11.9842 2 11.883 2.10204 11.7819C2.10204 11.6807 2.20408 11.5795 2.30612 11.5795L4.34694 9.55612C4.65306 9.25261 5.16327 9.25261 5.46939 9.55612C5.77551 9.85963 5.77551 10.3655 5.46939 10.669L4.7551 11.3772H8.93878C9.34694 11.3772 9.7551 11.6807 9.7551 12.1865C9.7551 12.6924 9.34694 12.7936 8.93878 12.7936H4.65306L5.36735 13.5017C5.67347 13.8052 5.67347 14.3111 5.36735 14.6146C5.26531 14.7158 5.06122 14.8169 4.85714 14.8169Z" fill="#030D45"/>
              </svg>
            </button>` : ""
    }
        ${canManageUsers ? `
          <button id="hamburger-button" class="flex flex-col justify-center items-center gap-1 w-10 h-10 cursor-pointer hover:scale-110">
            <span class="bg-black w-7 h-1 rounded"></span>
            <span class="bg-black w-7 h-1 rounded"></span>
            <span class="bg-black w-7 h-1 rounded"></span>
          </button> 
          
          <nav id="hamburger-menu" class="hidden absolute top-20 right-6 bg-white border border-gray-300 rounded-lg shadow-lg p-4 flex-col gap-3 z-50" aria-label="main">
            <a class="cursor-pointer rounded-md px-3 py-2 transition-colors hover:bg-gray-200 hover:text-blue-700" href="/home">Todos los eventos</a> 
            <a class="cursor-pointer rounded-md px-3 py-2 transition-colors hover:bg-gray-200 hover:text-blue-700 " href="/solicitudes">Solicitudes de eventos</a> 
            <a class="cursor-pointer rounded-md px-3 py-2 transition-colors hover:bg-gray-200 hover:text-blue-700 " href="/organizadores">Organizadores</a> 
            <a class="cursor-pointer rounded-md px-3 py-2 transition-colors hover:bg-gray-200 hover:text-blue-700" href="/reportes">Reporte Eventos</a> 
            <a class="cursor-pointer rounded-md px-3 py-2 transition-colors hover:bg-gray-200 hover:text-blue-700" href="/anuncios">Anuncio</a> 
          </nav>
        ` : ""}
      </div>
    </header>
    `;
}
