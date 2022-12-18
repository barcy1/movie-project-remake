const wrapper= document.querySelector('.wrapper');
const searchBtn=document.querySelector('#search-btn');
const searchInput=document.querySelector('.search-box');
const apiUrl=`http://www.omdbapi.com/?i=tt3896198&apikey=39fdc95`;
const iconChange=document.querySelector('.add-remove');


document.addEventListener('click',(event)=>{
    //setting the event handler for the search button click
    if(event.target.id==='search-btn'){
       // console.log('clicked');
        gettingMovieByTitle(searchInput.value);
    }
})



const displayIconMinus=()=>{
    iconChange.innerHTML=`
        <span data-icon="minus"> <i data-icon="minus" class="fa-solid fa-circle-minus"></i>add to watchlist </span>
    `;

}
const displayIconPlus=()=>{
    iconChange.innerHTML=`
        <span data-icon="plus"> <i data-icon="plus" class="fa-solid fa-circle-plus"></i>add to watchlist </span>
    `;
}


iconChange.addEventListener('click', (e)=>{
    
     if(e.target.dataset.icon==='plus'){
        displayIconMinus(); 

    } 
    else{
        displayIconPlus();
    }
})




const renderMovieCard= ()=>{
    wrapper.innerHTML+=`
            <div class="movie-container">
            <div class="image-container">
                <img src="images/3515432-endgamedek-1.jpg" alt="alti">
            </div>
            <div class="movie-text">
                <div class="movie-rating">
                    <h2 class="movie-title">movie-title</h2>
                    <i class="fa-solid fa-star"></i>
                    <span class="movie-rate">rate</span>
                </div>
                <div class="movie-details">
                    <span class="movie-length">movie-length</span>
                    <span class="movie-type">movie-type</span>
                    <div class="add-remove">                        
                        <span data-icon="plus"> <i data-icon="plus" class="fa-solid fa-circle-plus"></i>add to watchlist </span>
                    </div>
                </div>
                <div class="movie-discription">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ullam, tempora inventore laudantium, voluptate accusantium delectus iste perspiciatis eos dolores vel a ea aliquid. Id fugiat ea eius tenetur, facilis sed pariatur nobis voluptate a ipsum dolore vero nostrum possimus magni consequuntur beatae natus, itaque ex voluptatem distinctio veniam consectetur?</p>
                </div>
            </div>
                    
        </div>
        <hr>

    `;

}

const gettingMoviesById = async (movieId)=>{
    const res=await fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=39fdc95`);
    const moviesById= await res.json();
    renderMovieCard();
}

const searchMovieById=(moviesID)=>{
    /* const moviesById=[]; */
    //console.log(moviesID);
    for(let id of moviesID){
        gettingMoviesById(id);        
    }
}

 const gettingMovieByTitle= async function(movieTitle){ 
    const moviesId=[];    
    console.log(movieTitle)
    const res= await fetch(`http://www.omdbapi.com/?s=${movieTitle}&apikey=39fdc95`);
    const moviesByname= await res.json(); 
    if(moviesByname.Search){
        for(let movie of moviesByname.Search){
           // console.log(movie.imdbID);
            moviesId.push(movie.imdbID);
        }
        searchMovieById(moviesId);
    }
} 
















