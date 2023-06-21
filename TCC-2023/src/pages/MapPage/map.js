function initMap() {
  // Cria um objeto do mapa usando a API do Google Maps
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -23.5505, lng: -46.6333}, // Coordenadas de São Paulo (exemplo)
    zoom: 13 // Nível de zoom inicial
  });
  
  // Obtém a localização atual do usuário
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Adiciona um marcador na localização do usuário
      const userMarker = new google.maps.Marker({
        position: userLocation,
        map: map,
        title: 'Você está aqui'
      });

      // Centraliza o mapa na localização do usuário
      map.setCenter(userLocation);
    }, () =>  {
      // Caso não seja possível obter a localização do usuário
      alert('Não foi possível obter sua localização.');
      console.log('erro ao buscar localização');
    });
  } else {
    // Caso o navegador não suporte geolocalização
    alert('Seu navegador não suporta geolocalização.');
    console.log('Navegador nao suporta geolocation');
  }
}
  // Função para carregar o script da API do Google Maps
  function loadMapScript() {
    const API_KEY = 'AIzaSyDK1DZ3AImIWAFQyfdxlXVY2VxlG3CnxEg';
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
    script.defer = true;
    document.head.appendChild(script);
  }

// Carrega o script da API do Google Maps quando a página é carregada
window.onload = loadMapScript;