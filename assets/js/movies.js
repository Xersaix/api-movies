var input = document.getElementById("film-input")
var search_button = document.getElementById("search")
var film_list_container = document.getElementById("film-list")
var hero_body = document.getElementById("hero-body")
var top5 = document.getElementById("top5")
var next5 = document.getElementById("next5")
var top5_id = [];
var new_id = [];
var research_id = [];
var modal = document.getElementById("modal");
var modal_content = document.getElementById("modal-content");
var my_page = document.getElementById("MyPage");

var search_value;




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

  research_id = [];


  fetch(fetch_link, options)
    .then(response => response.json())
    .then(data => {
      

      

      for (let index = 0; index < data.results.length; index++) {
        research_id.push(data.results[index].id);
        let image_link = "https://image.tmdb.org/t/p/w500";
        let like_color = "#ffffff";
        if (data.results[index].vote_average >= 7)
        {
          like_color = "#adff2f"
      
        }else if(data.results[index].vote_average > 4 && data.results[index].vote_average < 7)
        {
          like_color = "#ffb62f"
        }
        else if(data.results[index].vote_average < 4)
        {
          like_color = "#ff0000"
        }
        if (data.results[index].backdrop_path != null) {
          image_link = image_link + data.results[index].backdrop_path
        }
        else {
          image_link = "assets/img/no-image.png"
        }
        film_list_container.innerHTML += `
  
        <div class="column is-2 is-half-mobile is-relative ">

        <figure class="image case is-2by1">
        <img src="https://image.tmdb.org/t/p/w500${data.results[index].backdrop_path}" alt="Placeholder image" style="width:100%">
        <div class= "in-case">
        <figure class="image case is-2by1">
        <img src="https://image.tmdb.org/t/p/w500${data.results[index].backdrop_path}" alt="Placeholder image" style="width:100%">
        <i class="bi bi-info-circle" id="next${index}-modal" onclick=(openModal(${data.results[index].id}))></i> 
        </figure>

        <div class= "in-caseB has-background-black-bis has-text-centered">
          <p class=""> ${data.results[index].title}</p>
            <p class="has-text-center ml-5" style="color:${like_color}">Recommandé à ${data.results[index].vote_average.toFixed(1).toString().replace(".","")}% </p>
           


        </div>

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
            <button class="button is-size-4 is-size-6-mobile" id="top-modal" onclick=(openModal(${response.results[0].id}))>Plus d'infos <i class="bi bi-info-circle ml-2"></i></button> 
            <span class="in-hero  ">
            <p class="title m-0 is-size-1 is-size-6-mobile ">
              ${response.results[0].title}
            </p>
         
            <p class="title m-0 ">
            ${response.results[0].release_date.substr(0, 4)}
            </p>    
            </span>          
            </figure>

            
            
           
            `

    })
    .catch(err => console.error(err));

}

function researchTop5() {
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

        let like_color = "#ffffff"
        if (data.results[index].vote_average > 7)
        {
          like_color = "#adff2f"

        }else if(data.results[index].vote_average > 4 && data.results[index].vote_average < 7)
        {
          like_color = "#ffb62f"
        }
        else if(data.results[index].vote_average < 4)
        {
          like_color = "#ff0000"
        }
        
        top5_id.push(data.results[index].id);
        top5.innerHTML +=  `
  
        <div class="column is-2 is-half-mobile is-relative ">

        <figure class="image case is-2by1">
        <img src="https://image.tmdb.org/t/p/w500${data.results[index].backdrop_path}" alt="Placeholder image" style="width:100%">
        <div class= "in-case">
        <figure class="image case is-2by1">
        <img src="https://image.tmdb.org/t/p/w500${data.results[index].backdrop_path}" alt="Placeholder image" style="width:100%">
        <i class="bi bi-info-circle" id="next${index}-modal" onclick=(openModal(${data.results[index].id}))></i> 
        </figure>

        <div class= "in-caseB has-background-black-bis has-text-centered">
          <p class=""> ${data.results[index].title}</p>
            <p class="has-text-center ml-5" style="color:${like_color}">Recommandé à ${data.results[index].vote_average.toFixed(1).toString().replace(".","")}% </p>
           


        </div>

        </div>
            `
      }


    })
    .catch(err => console.error(err));


}


function researchNext(){


  let options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGUzN2Y1YTU4ZTQ3ZGIwMGY4NTkyODU3OWY5MDBmOCIsInN1YiI6IjY0NmUxNjEzMzNhMzc2MDE1OGRjMDRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.10TTdpPPusGwjBn81duAdGN3P84qd250flrJJOeCyEs'
    }
  };


  

  fetch('https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&page=1', options)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      for (let index = 0; index < 5; index++) {
        new_id.push(data.results[index].id);
        let like_color = "#ffffff"
        if (data.results[index].vote_average > 7)
        {
          like_color = "#adff2f"

        }else if(data.results[index].vote_average > 4 && data.results[index].vote_average < 7)
        {
          like_color = "#ffb62f"
        }
        else if(data.results[index].vote_average < 4)
        {
          like_color = "#ff0000"
        }
        
        next5.innerHTML += `
  
        <div class="column is-2 is-half-mobile is-relative ">

        <figure class="image case is-2by1">
        <img src="https://image.tmdb.org/t/p/w500${data.results[index].backdrop_path}" alt="Placeholder image" style="width:100%">
        <div class= "in-case">
        <figure class="image case is-2by1">
        <img src="https://image.tmdb.org/t/p/w500${data.results[index].backdrop_path}" alt="Placeholder image" style="width:100%">
        <i class="bi bi-info-circle" id="next${index}-modal" onclick=(openModal(${data.results[index].id}))></i> 
        </figure>

        <div class= "in-caseB has-background-black-bis has-text-centered">
          <p class=""> ${data.results[index].title}</p>
            <p class="has-text-center ml-5" style="color:${like_color}">Recommandé à ${data.results[index].vote_average.toFixed(1).toString().replace(".","")}% </p>
           


        </div>

        </div>
            `
      }


    })
    .catch(err => console.error(err));



}


function closeModal(){
  modal.style.display = "none";
}

function openModal(id)
{
  


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGUzN2Y1YTU4ZTQ3ZGIwMGY4NTkyODU3OWY5MDBmOCIsInN1YiI6IjY0NmUxNjEzMzNhMzc2MDE1OGRjMDRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.10TTdpPPusGwjBn81duAdGN3P84qd250flrJJOeCyEs'
    }
  };

let fetch_link = 'https://api.themoviedb.org/3/movie/?language=fr-FR';

  fetch_link = fetch_link.replace("movie/","movie/"+ id);
  fetch(fetch_link, options)
    .then(data => data.json())
    .then(data => {
      let like_color = "#ffffff"
      if (data.vote_average > 7)
      {
        like_color = "#adff2f"

      }else if(data.vote_average > 4 && data.vote_average < 7)
      {
        like_color = "#ffb62f"
      }
      else if(data.vote_average < 4)
      {
        like_color = "#ff0000"
      }
      
      modal.style.display = "flex";
      
      modal_content.innerHTML = `
      <div class="modal-head">
      <i class="bi bi-x-circle" onclick="closeModal()" id="close-modal"></i>
      <img src="https://image.tmdb.org/t/p/original${data.backdrop_path}" alt="" style="heigth:20%;width:100%">
      <div class="bottom-blur"></div>
      </div>
      <div class="columns container is-fluid">
      
        <div class="column ">
          <p class="has-text-centered">${data.title}</p>
          <p class="has-text-centered " style="color:${like_color}">Recommandé à ${data.vote_average.toFixed(1).toString().replace(".","")}% </p>
          <p class="has-text-grey has-text-centered">${data.tagline}</p>
          <p class="title has-text-white is-size-4-mobile">Sypnosis</p>
          <p class="is-size-6-mobile">${data.overview}</p>
 
          <ul class=" mt-6 is-centered is-flex is-flex-direction-row">
          <p class="mr-5">Genre:  </p>
          <li class="mr-5">${data.genres[0].name}</li>
          <li class="mr-5">${data.genres[1].name}</li>
          <li class="mr-5">${data.genres[2].name}</li>
          </ul>

      </div>

      </div>
      `;


     
    })
    .catch(err => console.error(err));


}



input.addEventListener("input", function () {
  research()
})
search_button.addEventListener("click", function () {

  research();
})
// Ferme le modal
modal.addEventListener("click",function(e){
if(e.target == modal)
{
  modal.style.display = "none";
}
})


researchTop()
researchTop5()
researchNext()




