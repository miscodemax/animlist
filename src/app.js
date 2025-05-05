

window.addEventListener("DOMContentLoaded", () => {
    
    const trends = document.getElementById('new');
    const top = document.getElementById('top');
    const coming = document.getElementById('coming');
    const container = document.getElementById('contain');
    const container2 = document.getElementById('contain2');
    const container3 = document.getElementById('contain3');


    async function fetchAnime(animeType, containerx) {

    const url = 'https://api.jikan.moe/v4' + animeType;
            
    startTime = performance.now();
    res = await fetch(url);
    data = await res.json();

    endTime = performance.now();

    time = (startTime - endTime).toFixed(2);

    const animes = data.data;

    const loader = document.createElement('p');
    container.appendChild(loader);
    loader.textContent = 'Chargement...';
    loader.className = 'text-red-300 text-lg font-bold';
    setTimeout(() => {
    loader.className = 'hidden';
    }, time)

    for(const anime of animes) {
        console.log(anime);
        function truncateText(text, maxWords) {
            const words = text.split(" ");
            return words.length > maxWords
                ? words.slice(0, maxWords).join(" ") + "..."
                : text;
            }
                
        const card = document.createElement('div');
        const imgTrends = document.createElement('img');
        const titleTrends = document.createElement('h2');
        const synopsisTrends = document.createElement('p');
        card.appendChild(imgTrends);
        card.appendChild(titleTrends);
        card.appendChild(synopsisTrends);
        containerx.appendChild(card);


        card.className = 'flex flex-col text-center gap-5 bg-slate-800 rounded-2xl shadow-md overflow-hidden max-w-xs transition hover:scale-105 duration-300';
        imgTrends.className = 'block w-full min-h-96 max-h-96';
        titleTrends.className = 'text-lg font-bold uppercase text-indigo-600';
        synopsisTrends.className = 'text-md text-gray-300 leading-relaxed capitalize font-bold hover:text-light';


        const image = anime.images.webp.image_url;
        const titre = anime.title;
        const synopsis = truncateText(anime.synopsis, 20);
            
            
            
            
            
            
        imgTrends.src = image;
        titleTrends.textContent = titre;
        synopsisTrends.textContent = synopsis;

        console.log(synopsis);
        
    

            
        }
    }

    fetchAnime('/seasons/now', container);
    fetchAnime('/top/anime', container2);
    fetchAnime('/seasons/upcoming', container3);
    container2.classList.add('hidden');
    container3.classList.add('hidden');


    const newAnime = () => {
        container2.classList.add('hidden');
        container3.classList.add('hidden');
        container.classList.remove('hidden');
    }
    const topAnime = () => {
        container2.classList.remove('hidden');
        container.classList.add('hidden');
        container3.classList.add('hidden');
    }

    const comingAnime = () => {
        container2.classList.add('hidden');
        container.classList.add('hidden');
        container3.classList.remove('hidden');
    }

  
  trends.onclick = newAnime;
  top.onclick = topAnime;
  coming.onclick = comingAnime;
});



