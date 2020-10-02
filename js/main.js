//api 
///const API_KEY='55678498db2edf3e7d8d2468020fe9a5e04f9000004654465475476654465';

const url='https://api.themoviedb.org/3/search/movie?api_key=<ENTER_YOUR_API_KEY_HERE>';
const IMG_URL='https://image.tmdb.org/t/p/w500/';
const Popular_movies='https://api.themoviedb.org/3/movie/popular?api_key=<ENTER_YOUR_API_KEY_HERE>&language=en-US&page=1';
//const MOVIE_ID_URL='https://api.themoviedb.org/3/movie/{movies.id}?api_key=<ENTER_YOUR_API_KEY_HERE>'

//Selecting elements from the DOM

const buttonElement=document.querySelector('#search');
const inputElement=document.querySelector('#inputValue');

//function to show details of movie
function movieSelected(id){
    sessionStorage.setItem('movieId',id);
    window.location='movie.html';
    return false;
}


//movie html page 
function createMovie(movie_data){
    let posterpath=movie_data.poster_path;
    let output='';
        output=`
        <div class="jumbotron">
            <div class="image_prop">
                <img src="${IMG_URL+posterpath}" >
            </div>
            
            <div class="details_prop">
                <h4>${movie_data.title}</h4>
                <button type="button" class="btn btn-outline-success">
                ${movie_data.vote_average} <i class="fa fa-star-o"></i>
                </button>
                <div>
                    <h6>Released On:${movie_data.release_date}</h6>
                    <div id="genres">
                        
                    </div>
                </div>
                <div>
                <h6><strong>Overview:</strong></h6>
                <p>"${movie_data.overview}"</p>
                </div>
            </div>
            
        </div>    
    `;
         return output;
    
}

//get movie
function getMovie(){
    let movieId=sessionStorage.getItem('movieId');

    fetch('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=<ENTER_YOUR_API_KEY_HERE>')
    .then((res)=>{
        return res.json();
    })
    .then((movie_data)=>{
        //const movie=data
        console.log(movie_data);
        const movie=createMovie(movie_data);  
       document.getElementById("movie").innerHTML=movie;
       $('#genres').html(
        '<h6>Genres:</h6> ' + movie_data.genres.map(function(genre) {
            return genre.name;
        }).join(', ')
    );
        
    })
    .catch((error)=>{
       console.log('Error:',error);
    });

}

//get video trailers
function getMovieVideos(){
    let movieId=sessionStorage.getItem('movieId');

    fetch('https://api.themoviedb.org/3/movie/'+movieId+'/videos?api_key=<ENTER_YOUR_API_KEY_HERE>&language=en-US')
    .then((res)=>{
        return res.json();
    })
    .then((video_data)=>{
        console.log(video_data);
        //const movie=createMovie(video_data);  
       //document.getElementById("videos").innerHTML=movie;
        
    })
    .catch((error)=>{
       console.log('Error:',error);
    });

}


//movie container html code
function createMovieContainer(movies){
    let posterpath=movies.poster_path;
    let output='';
    if(posterpath!=null){
        output=`
        <div class="well text-center">
            <img src="${IMG_URL+movies.poster_path}" >
            <h6>${movies.title}</h6>
            <button type="button" class="btn btn-outline-success">
                ${movies.vote_average} <i class="fa fa-star-o"></i>
                </button>
            <a onclick="movieSelected(${movies.id})" class="btn btn-info" href="movie.html">Movie Deatails</a>
            <a class="btn btn-outline-success">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-download" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M.5 8a.5.5 0 0 1 .5.5V12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5a.5.5 0 0 1 1 0V12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8.5A.5.5 0 0 1 .5 8z"/>
                    <path fill-rule="evenodd" d="M5 7.5a.5.5 0 0 1 .707 0L8 9.793 10.293 7.5a.5.5 0 1 1 .707.707l-2.646 2.647a.5.5 0 0 1-.708 0L5 8.207A.5.5 0 0 1 5 7.5z"/>
                    <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 8 1z"/>
                </svg>
            </a>
        </div>    
    `;
         return output;
    }
        let not_found="/2ZbnHeSwwwejcOa5DkSienBFLA8.jpg";
        output=`
        <div class="well text-center">
            <img src="${IMG_URL+not_found}">
            <h6>${movies.title}</h6>
            <p>Rating:${movies.vote_average}</p>
            <a onclick="movieSelected(${movies.id})" class="btn btn-info" href="movie.html">Movie Deatails</a>
        </div>    
    `;
    return output;
    
        
}
//to hide popular movies
document.getElementById("inputValue").oninput = function() {hidehtml()};

function hidehtml() {
    document.getElementById("popular_title").innerHTML="";
    document.getElementById("popular_movies").innerHTML="";
}

//popular movies 

function popularMovies(event){
    const value=inputElement.value;
    fetch(Popular_movies)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        const movies=data.results;
        console.log(movies);
        const pop_array=movies.map(createMovieContainer).join('');  

       document.getElementById("popular_movies").innerHTML=pop_array;
        
        
    })
    .catch((error)=>{
       console.log('Error:',error);
    });

} 




//all movies by name
function allMovies(event){
    event.preventDefault();
    const value=inputElement.value;

    const newurl=url+'&query='+value;

    fetch(newurl)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        const movies=data.results;
        console.log(movies);
        const newarray=movies.map(createMovieContainer).join('');  
       document.getElementById("movies").innerHTML=newarray;

    })
    .catch((error)=>{
       console.log('Error:',error);
    });


    
    
}
