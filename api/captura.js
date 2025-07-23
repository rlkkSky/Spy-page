// Função chamada assim que a página for carregada
window.onload = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("location").innerHTML = "Geolocalização não é suportada pelo seu navegador.";
    }
};

// Exibe a localização quando recebida
function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    document.getElementById("location").innerHTML = `Latitude: ${lat} <br> Longitude: ${lon}`;

    // Aqui você pode fazer algo com o arquivo locations.json se necessário
    fetch('data/locations.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Exibe o conteúdo de locations.json no console
        })
        .catch(err => console.error('Erro ao carregar locations.json:', err));
}

// Exibe erro se não for possível obter a localização
function showError(error) {
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
