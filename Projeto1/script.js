document.body.addEventListener('keyup', (event) => {
  playSound(event.code.toLocaleLowerCase());
});

document.querySelector('.composer button').addEventListener('click',  () => {
  let song = document.querySelector('#input').value
  if(song !== '') {
    let songArray = song.split('');
    
    playComposition(songArray)
  }
});

const playSound = (sound) => {
  let audioElement = document.querySelector(`#s_${sound}`)
  let keyElement = document.querySelector(`div[data-key="${sound}"]`)

  if(audioElement) {
    audioElement.currentTime = 0;
    audioElement.play();
  }

  if(keyElement) {
    keyElement.classList.add('active');

    setTimeout(() => {
      keyElement.classList.remove('active');
    }, 300);
  }
}

const playComposition = (songArray) => {
  let wait = 0

  songArray.forEach((letter) => {
    setTimeout(() => {
      playSound(`key${letter}`)
    }, wait)
    wait += 250
  })
}