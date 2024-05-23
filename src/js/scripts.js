const toggleTheme = document.getElementById('toggle-theme');
const toggleIcon = document.getElementById('toggle-icon');
const toggleText = document.getElementById('toggle-text');

const toggleColors = document.getElementById("toggle-colors")

const rootStyles = document.documentElement.style;

const flagsElement = document.getElementById("flags");

const textsToChange = document.querySelectorAll("[data-section]");

const changeLanguage = async (language) => {
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();

    for(const textToChange of textsToChange) {
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;

        textToChange.innerHTML = texts[section][value];
    }
};

//Permite cambiar el lenguaje de la pagina
flagsElement.addEventListener("click", (e) => {
    changeLanguage(e.target.parentElement.dataset.language);
});

//Permite alternar en modo oscuro o claro la pagina
toggleTheme.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    if(toggleIcon.src.includes('moon.svg')){
        toggleIcon.src='assets/icons/sun.svg'
        toggleText.textContent='Light Mode'
    }else{
        toggleIcon.src='assets/icons/moon.svg'
        toggleText.textContent='Dark Mode';
    }
});

//Controla que cuando llame al primary color este valor cambie de color dependiendo la eleccion en la paleta de color
toggleColors.addEventListener("click", (e) => {
    rootStyles.setProperty("--primary-color", e.target.dataset.color);
})

//Controla el audio de fondo al abrir la pagina
document.addEventListener("DOMContentLoaded", function() {
    var audio = document.getElementById("background-audio");
    audio.volume = 0.1; // Establece el volumen al 50% cuando se carga la página
});

//Permite que al terminar una cancion detecte si hay mas en la lista y la reproduce
document.addEventListener('DOMContentLoaded', function () {
    var audioPlayer = document.getElementById('background-audio');
    var sourceElements = audioPlayer.getElementsByTagName('source');
    var currentSourceIndex = 0;
  
    audioPlayer.addEventListener('ended', function () {
      currentSourceIndex = (currentSourceIndex + 1) % sourceElements.length;
      audioPlayer.src = sourceElements[currentSourceIndex].src;
      audioPlayer.play();
    });
});
