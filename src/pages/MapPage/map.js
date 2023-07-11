function initMap() {
  // Cria um objeto do mapa usando a API do Google Maps
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -23.5505, lng: -46.6333}, // Coordenadas de São Paulo (exemplo)
    zoom: 13 // Nível de zoom inicial
  });
  
  // Obtém a localização atual do usuário
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(() => {
      const userLocation = {
        lat: -23.224158,
        lng: -45.923331
      };

      console.log(userLocation);

      // função que adiciona um marcador no mapa de acordo com os parâmetros passados
      function addMarker(position, title) {
        const newMarker = new google.maps.Marker({
          position: position,
          map: map,
          title: title
        });
      }

      // Adiciona um marcador na localização do usuário
      addMarker(userLocation, "Você está aqui!");

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
    document.body.appendChild(script);
  }

// Carrega o script da API do Google Maps quando a página é carregada
window.onload = loadMapScript;

// adicionar marcador para o noo posto adicionado, além de buscar a geolocation atraves do endereço
function adicionarEndereco() {
  const cidade = document.getElementById('enderecoInputCidade').value;
  const rua = document.getElementById('enderecoInputRua').value;
  const numero = document.getElementById('enderecoInputNumero').value;
  const endereco = rua + ", " + numero + " - " + cidade;
  console.log(endereco);
  let geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: endereco }, (res, status) => {
    if (status === google.maps.GeocoderStatus.OK) {
      let latitude = res[0].geometry.location.lat();
      let longitude = res[0].geometry.location.lng();
      const newLocation = {
        lat: latitude,
        lng: longitude
      };
      addMarker(newLocation, 'Teste de localização!');
      console.log(newLocation);
    }
  });
}
