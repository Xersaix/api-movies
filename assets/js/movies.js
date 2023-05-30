var input = document.getElementById("film-input")
var search_button = document.getElementById("search")
var film_list_container = document.getElementById("film-list")
var hero_body = document.getElementById("hero-body")
var top5 = document.getElementById("top5")

var search_value




function research() {

    let options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGUzN2Y1YTU4ZTQ3ZGIwMGY4NTkyODU3OWY5MDBmOCIsInN1YiI6IjY0NmUxNjEzMzNhMzc2MDE1OGRjMDRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.10TTdpPPusGwjBn81duAdGN3P84qd250flrJJOeCyEs'
        }
    };
    film_list_container.innerHTML = `
  
    <div class="column is-12 is-12-mobile is-half">
        <p class="title  m-5 has-text-white">Titre associés à : ${input.value}</p>
    </div>
    `
    // Enleve les espace des input et remplace par %20
    search_value = input.value.split(' ').join("%20")
    let fetch_link = 'https://api.themoviedb.org/3/search/movie?query=&include_adult=false&language=fr-FR&page=1'
    // La rajoute au lien
    fetch_link = fetch_link.replace("query=", "query=" + search_value)
    console.log("result:" + fetch_link)




    fetch(fetch_link, options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for (let index = 0; index < data.results.length; index++) {
                film_list_container.innerHTML += `





                <div class="column is-2 is-half-mobile ">

                <figure class="image is-2by1">
                <img src="https://image.tmdb.org/t/p/w500${data.results[index].backdrop_path}" alt="Placeholder image" style="width:100%">

                </figure>

      
      
                </div>

            `
            }


        })
        .catch(err => console.error(err));

}

function researchTop() {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGUzN2Y1YTU4ZTQ3ZGIwMGY4NTkyODU3OWY5MDBmOCIsInN1YiI6IjY0NmUxNjEzMzNhMzc2MDE1OGRjMDRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.10TTdpPPusGwjBn81duAdGN3P84qd250flrJJOeCyEs'
        }
    };

    fetch('https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1', options)
        .then(response => response.json())
        .then(response => {

            hero_body.innerHTML = `
            <figure class="image is-2by1 img-body">
            <img src="https://image.tmdb.org/t/p/original${response.results[0].backdrop_path}" alt="" class=" p-0">
            <span class="in-hero  ">
            <p class="title m-0 is-size-2 is-size-6-mobile">
              ${response.results[0].title}
            </p>
            <p class="title m-0">
            ${response.results[0].release_date.substr(0,4)}
            </p>    
            </span>          
            </figure>

            
            
           
            `

        })
        .catch(err => console.error(err));

}

function researchTop5()
{
    let options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGUzN2Y1YTU4ZTQ3ZGIwMGY4NTkyODU3OWY5MDBmOCIsInN1YiI6IjY0NmUxNjEzMzNhMzc2MDE1OGRjMDRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.10TTdpPPusGwjBn81duAdGN3P84qd250flrJJOeCyEs'
        }
    };





    fetch('https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1', options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for (let index = 0; index < 5; index++) {
                top5.innerHTML += `
  
              



          <div class="column is-2 is-half-mobile is-mobile">

          <figure class="image is-1by1">
          <img src="https://image.tmdb.org/t/p/w500${data.results[index].backdrop_path}" alt="Placeholder image" style="width:100%">
          </figure>
          <p class="title is-4 is-size-12-mobile is-hidden-mobile has-text-white">${data.results[index].title}</p>
          <p class="subtitle is-6 is-hidden-mobile has-text-white">${data.results[index].release_date.substr(0,4)}</p>
          <p class="is-hidden-mobile">${data.results[index].overview.substr(0,150)} ...  </p>



          </div>
            `
            }


        })
        .catch(err => console.error(err));


}


input.addEventListener("input", function () {
    research()
})
search_button.addEventListener("click", function () {

    research();
})


researchTop()
researchTop5()



