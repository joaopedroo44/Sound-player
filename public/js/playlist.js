const playlistContainer = document.createElement("div");
playlistContainer.id = "playlist";
document.body.appendChild(playlistContainer);

// Adicionar vídeo à playlist
async function adicionarPlaylist(videoId, titulo) {
    const res = await fetch("../api/playlist.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ video_id: videoId, titulo })
    });

    const data = await res.json();
    if (data.success) {
        alert("Vídeo adicionado à playlist!");
        carregarPlaylist();
    } else {
        alert(data.error || "Erro ao salvar vídeo.");
    }
}

// Listar playlist
async function carregarPlaylist() {
    const res = await fetch("../api/playlist.php");
    const data = await res.json();

    playlistContainer.innerHTML = "<h2>Sua Playlist</h2>";

    if (data.length === 0) {
        playlistContainer.innerHTML += "<p>Não há vídeos na playlist.</p>";
        return;
    }

    data.forEach(video => {
        const item = document.createElement("div");
        item.classList.add("playlist-item");
        item.innerHTML = `
            <h4>${video.titulo}</h4>
            <iframe width="300" height="170" src="https://www.youtube.com/embed/${video.video_id}" frameborder="0" allowfullscreen></iframe>
            <button onclick="removerVideo(${video.id})">Remover</button>
        `;
        playlistContainer.appendChild(item);
    });
}

// Remover vídeo
async function removerVideo(id) {
    const res = await fetch("../api/playlist.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    });

    const data = await res.json();
    if (data.success) {
        alert("Vídeo removido!");
        carregarPlaylist();
    } else {
        alert(data.error || "Erro ao remover vídeo.");
    }
}

document.addEventListener("DOMContentLoaded", carregarPlaylist);
