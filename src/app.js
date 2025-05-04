

window.addEventListener("DOMContentLoaded", () => {
    
    const trends = document.getElementById('new');
    const top = document.getElementById('top');

    async function newAnime() {


        startTime = performance.now();

        const container = document.getElementById('contain');
        const url = 'https://api.jikan.moe/v4/seasons/now';

        res = await fetch(url);
        data = await res.json();

        endTime = performance.now();

        time = (startTime - endTime).toFixed(2);

        animes = data.data;

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
            container.appendChild(card);
            card.className = 'flex flex-col text-center gap-5 bg-slate-800 rounded-2xl shadow-md overflow-hidden max-w-xs transition hover:scale-105 duration-300';
            imgTrends.className = 'block w-full';
            titleTrends.className = 'text-lg font-bold uppercase text-indigo-600';
            synopsisTrends.className = 'text-md text-gray-300 leading-relaxed capitalize font-bold hover:text-light';


            const image = anime.images.webp.image_url;
            const titre = anime.title;
            const synopsis = truncateText(anime.synopsis, 20);
            
            
            
            
            
            synopsisTrends.textContent = synopsis;
            imgTrends.src = image;
            titleTrends.textContent = titre;
   

            
        }
    }


    trends.onclick = newAnime;
    //top.onclick = topAnime;

  }
);



