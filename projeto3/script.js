document.querySelector('.busca').addEventListener('submit', async (event) => {
  event.preventDefault();

  let input = document.querySelector('#searchInput').value;

  if (input !== '') {
    clearInfo()
    showWarning('Carregando...');
  

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=e697859324f40f6b94a91c19ccf2a6dd&units=metric&lang=pt_br`;
    let results = await fetch(url)
    let json = await results.json()

    if(json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg
      })
    } else {
      clearInfo()
      showWarning('Não encontramos esta localização.')
    }
  }
  else {
    clearInfo()
  }
})

const showInfo = (json) => {
  showWarning('')
  console.log(json);
  
  document.querySelector('.tempInfo').innerHTML = `${Number(json.temp).toFixed(0)} <sup>ºC</sup>`
  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country} `
  document.querySelector('.ventoInfo').innerHTML = `${Number(json.windSpeed).toFixed(1)} <span>km/h</span>`
  document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle}deg)`
  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
  document.querySelector('.resultado').style.display = 'block'
}

const showWarning = (msg) => {
  document.querySelector('.aviso').innerHTML = msg
}

const clearInfo = () => {
  showWarning('')
  document.querySelector('.resultado').style.display = 'none'
}