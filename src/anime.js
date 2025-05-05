
window.addEventListener("DOMContentLoaded", () => {
    
    const container = document.getElementById('containAnime');
    const container2 = document.getElementById('containAnime2');
    const container3 = document.getElementById('containAnime3');
    const trends = document.getElementById('new');
    const top = document.getElementById('top');
    const coming = document.getElementById('coming');
    const paginate = document.getElementById('paginate');
    const back = document.getElementById('back');
    back.classList.add('hidden');
    
    console.log(back.textContent);
    
    
    

    async function fetchAnimes(url, numberPage, containerx) {
        
        

       
                
        startTime = performance.now();
        res = await fetch(url);
        data = await res.json();

        if (data.pagination.has_next_page) {
            numberPage++
        }else if (numberPage === last_visible_page) {
            paginate.classList.add('hidden');
        }

        console.log(data);
        
    
        endTime = performance.now();
    
        time = (startTime - endTime).toFixed(2);
    
        const animes = data.data;

        console.log(data.pagination);
        
    
        const loader = document.createElement('p');
        container.appendChild(loader);
        loader.textContent = 'Chargement...';
        loader.className = 'text-red-300 text-lg font-bold';
        setTimeout(() => {
        loader.className = 'hidden';
        }, time)
    
        for(const anime of animes) {
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
            imgTrends.className = 'block w-full min-h-96  max-h-96';
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

    let numberDemo=27
    fetchAnimes('https://api.jikan.moe/v4/anime?start_date=1999-01-01$order_by=start_date&sort=asc&genres=27&page=1',1,  container);
    fetchAnimes('https://api.jikan.moe/v4/anime?start_date=1999-01-01$order_by=start_date&sort=asc&genres=25&page=1',1,  container2);
    fetchAnimes('https://api.jikan.moe/v4/anime?start_date=1999-01-01$order_by=start_date&sort=asc&genres=42&page=1',1,  container3);
    container2.classList.add('hidden');
    container3.classList.add('hidden');


    const newAnime = () => {
        numberDemo=27
        container2.classList.add('hidden');
        container3.classList.add('hidden');
        container.classList.remove('hidden');
        console.log(container.innerHTML);
        

        paginate.onclick = () => {
            console.log(back.textContent);
            let numberPage = 2;
            const url = 'https://api.jikan.moe/v4/anime?genres=' + numberDemo + '&page=' + numberPage;
            fetchAnimes(url, numberPage, container);
            back.classList.remove('hidden');
            back.classList.add('block');
        }
        
    
    
        back.onclick = () => {
            back.classList.remove('block');
            back.classList.add('hidden');
            container.innerHTML = '';
            fetchAnimes('https://api.jikan.moe/v4/anime?genres=' + numberDemo + '&page=', 1, container);
        }
    }
    const topAnime = () => {
        numberDemo=25

        container2.classList.remove('hidden');
        container.classList.add('hidden');
        container3.classList.add('hidden');
        console.log(container2.innerHTML);

        paginate.onclick = () => {
            console.log(back.textContent);
            let numberPage = 2;
            const url = 'https://api.jikan.moe/v4/anime?genres=' + numberDemo + '&page=' + numberPage;
            fetchAnimes(url, numberPage, container2);
            back.classList.remove('hidden');
            back.classList.add('block');
        }
        
    
    
        back.onclick = () => {
            back.classList.remove('block');
            back.classList.add('hidden');
            container2.innerHTML = '';
            fetchAnimes('https://api.jikan.moe/v4/anime?genres=' + numberDemo + '&page=', 1, container2);
        }
    }

    const comingAnime = () => {
        numberDemo=42

        container2.classList.add('hidden');
        container.classList.add('hidden');
        container3.classList.remove('hidden');

        console.log(container.innerHTML);

        paginate.onclick = () => {
            console.log(back.textContent);
            let numberPage = 2;
            const url = 'https://api.jikan.moe/v4/anime?genres=' + numberDemo + '&page=' + numberPage;
            fetchAnimes(url, numberPage, container3);
            back.classList.remove('hidden');
            back.classList.add('block');
        }
        
    
    
        back.onclick = () => {
            back.classList.remove('block');
            back.classList.add('hidden');
            container3.innerHTML = '';
            fetchAnimes('https://api.jikan.moe/v4/anime?genres=' + numberDemo + '&page=', 1, container3);
        }
    }

  
  trends.onclick = newAnime;
  top.onclick = topAnime;
  coming.onclick = comingAnime;

  const genres = document.getElementById('genres');
  const links = document.querySelectorAll('#genres a');

  const linkGenre = document.getElementById('linkGenre');

  linkGenre.onclick = () => {
    genres.classList.remove('hidden');
    genres.classList.add('grid');
    genres.classList.add('top-[45px]');
    genres.classList.add('grid-cols-3');
    genres.classList.add('justify-items-center');
    genres.classList.add('text-center');
    genres.classList.add('gap-5');
  }

  document.onclick = (event) => {
    const clickedInside = linkGenre.contains(event.target) //|| menu.contains(event.target);

    if (!clickedInside) {
        genres.classList.add('hidden');
        genres.classList.remove('grid');
        genres.classList.remove('top-[45px]');
        genres.classList.remove('grid-cols-3');
        genres.classList.remove('justify-items-center');
        genres.classList.remove('text-center');
        genres.classList.remove('gap-5');
    }
  
  }
  const mal_id = [1, 2, 4, 8, 10, 14, 7, 22, 24, 36, 30, 37, 41]
  const main = document.getElementById('main');
  links.forEach((link, index) => {
    link.onclick = (event) => {
        event.preventDefault();
        main.innerHTML = '';
        const url = 'https://api.jikan.moe/v4/anime?genres=' +  '&page=3' + mal_id[index + 1];
        fetchAnimes(url, 1, main);
        main.classList.add('grid');
        main.classList.add('grid-cols-3');
        main.classList.add('justify-items-center');
        main.classList.add('gap-8');
        main.classList.remove('flex');
        main.classList.remove('flex-col');
    }
  })



    
    })



    