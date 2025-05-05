
window.addEventListener("DOMContentLoaded", () => {

    const url = 'https://api.jikan.moe/v4/genres/anime';

    async function genres(url) {
        res = await fetch(url);
        data = await res.json();
        console.log(data);
        
    }

    const body = document.querySelector('body')
    body.onclick = genres;
})

