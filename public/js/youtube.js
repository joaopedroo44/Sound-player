const API_KEY = "AIzaSyDVHjAK3GctJMxy_FT0yuImjzyd8YvQZVk"; // 🔑 Substitua pela sua chave da API
const resultsContainer = document.getElementById("results");

async function buscarMusica() {
    const query = document.getElementById("searchInput").value.trim();
    if (!query) {
        alert("Digite algo para buscar.");
        return;
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${API_KEY}&maxResults=5`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        resultsContainer.innerHTML = "";

        if (data.items && data.items.length > 0) {
            data.items.forEach(video => {
                const videoId = video.id.videoId;
                const title = video.snippet.title;

                const videoElement = document.createElement("div");
                videoElement.classList.add("video");

                videoElement.innerHTML = `
                    <h3>${title}</h3>
                    <iframe width="300" height="170" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                `;

                resultsContainer.appendChild(videoElement);
            });
        } else {
            resultsContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        }
    } catch (err) {
        console.error("Erro ao buscar vídeos:", err);
        resultsContainer.innerHTML = "<p>Erro ao buscar vídeos.</p>";
    }
}
