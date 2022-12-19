const wrapper= document.querySelector('.wrapper');
const searchBtn=document.querySelector('#search-btn');
const searchInput=document.querySelector('.search-box');
const apiUrl=`http://www.omdbapi.com/?i=tt3896198&apikey=39fdc95`;
const check=document.querySelector('.check');
const main=document.body;
let moviesArray=[];
let watchListArray=[];

document.addEventListener('click',(event)=>{
    //setting the event handler for the search button click
    if(event.target.id==='search-btn'){
        console.log('clicked');
        let search=searchInput.value;
        //console.log(search);
        TitleSearch(search);       
    }
    

     if(event.target.dataset.icon){

        watchListArray= JSON.parse(localStorage.getItem('watchList') || '[]');
        let pressedId=event.target.dataset.id;
        //console.log(pressedId);
        const iconChange=document.querySelectorAll('.add-remove >:first-child');
        //console.log(moviesArray);
        let movieId=moviesArray.find(movie=> movie.imdbID===pressedId);
       // console.log(movieId); 
        //========handeling ADDING movies to watchlist and changing the btn and text.======
        if(event.target.dataset.icon==='plus'){       
            for(let i=0; i<iconChange.length;i++){
                    if(iconChange[i].dataset.id===pressedId){
                        iconChange[i].innerHTML=`${watchListBtn(movieId,false)}`;
                        break;                                           
                    }            
                }
            //adding movie to watchlist and save the array ont he localStorage. 
            
            watchListArray.push(movieId);
            localStorage.setItem('watchList',JSON.stringify(watchListArray));               
            console.log(watchListArray);
            
            
            //console.log(localCheck);
        }else{
            for(let i=0; i<iconChange.length;i++){
                if(iconChange[i].dataset.id===pressedId){
                    iconChange[i].innerHTML=`${watchListBtn(movieId,true)}`;                   
                    break;                
                }                            
            }
            if(watchListArray.length>0){
                for(let i=0; i<watchListArray.length;i++){
                    if(watchListArray[i].imdbID===movieId.imdbID){
                        watchListArray.splice(i,1);
                        break;
                    }
                }
                
                localStorage.setItem('watchList',JSON.stringify(watchListArray));
                watchListArray= JSON.parse(localStorage.getItem('watchList') || '[]');
                console.log(watchListArray);
            } 

        }      
       
    } 
    
})

const watchListBtn= (movie,plus)=>{
    if(plus){
        return(
            `<span data-icon="plus" data-id='${movie.imdbID}'><i data-id="${movie.imdbID}" data-icon="plus" class="fa-solid fa-circle-plus"></i>add to watchlist </span>`
        )        
    }else{
        return(`<span data-icon="minus" data-id='${movie.imdbID}'><i data-id="${movie.imdbID}" data-icon="minus" class="fa-solid fa-circle-minus"></i>remove from watchlist </span>`
        )
    }
}


const gettingHtml= (movie,plusOrMinus)=>{
    return( `<article>
                <div class="movie-container">
                        <div class="image-container">
                            <img src="${movie.Poster}" alt="alti">
                        </div>
                        <div class="movie-text">
                            <div class="movie-rating">
                                <h2 class="movie-title">${movie.Title}</h2>
                                <i class="fa-solid fa-star"></i>
                                <span class="movie-rate">${movie.imdbRating}</span>
                            </div>
                            <div class="movie-details">
                                <span class="movie-length">${movie.Runtime}</span>
                                <span class="movie-type">${movie.Genre}</span>
                                <div class="add-remove"> 
                                    ${watchListBtn(movie,plusOrMinus)}                  
                                    
                                </div>
                            </div>
                            <div class="movie-discription">
                                <p>${movie.Plot}</p>
                            </div>
                        </div>                        
                </div>
                <hr>
        </article>
        ` 
        
    )
}

const renderMovieCard = (moviesArray,plusOrMinus)=>{
    console.log(plusOrMinus);
    console.log(moviesArray);
    check.innerHTML=`<section>${moviesArray.map(movie=>(gettingHtml(movie,plusOrMinus))).join('')}</setion>`
    /* check.innerHTML =`<section>${(moviesArray.map(movie=>{gettingHtml(movie, plusOrMinus)})).join('')}</section>` */
}


const TitleSearch= async (searchValue)=>{
     moviesArray=[];
    console.log(searchValue);
    const res=await fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=39fdc95`);
    const moviesByTitle=await res.json();
    //validation that the response is an array with length bigger than 0.
    if(moviesByTitle.Search){
        for(let movie of moviesByTitle.Search){
            const response= await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=39fdc95`);
            const moviesById=await response.json();
            moviesArray.push(moviesById);            
        }
        //console.log(moviesArray);
        renderMovieCard(moviesArray,true);
    }
}



/* const indexRender=()=>{
    main.innerHTML=`
        <div class="wrapper">
        <div class="header">        
            <h1>Find You'r Movie!</h1>
            <a href="watch-list.html">Wathlist</a>        
        </div>
        <div class="search-box-container">
            <input type="text" class="search-box">
            <button id='search-btn' type="submit">search</button>
        </div>
        <div class="check">


        </div>
    
    `;
} */




/* else{
    renderMovieCard(watchListArray,plusOrMinus);
} */



















/* <div class="movie-container">
<div class="image-container">
    <img src="${movie.Poster}" alt="alti">
</div>
<div class="movie-text">
    <div class="movie-rating">
        <h2 class="movie-title">${movie.Title}</h2>
        <i class="fa-solid fa-star"></i>
        <span class="movie-rate">${movie.imdbRating}</span>
    </div>
    <div class="movie-details">
        <span class="movie-length">${movie.Runtime}</span>
        <span class="movie-type">${movie.Genre}</span>
        <div class="add-remove">                        
            ${icon(movie,plusOrMinus)}
        </div>
    </div>
    <div class="movie-discription">
        <p>${movie.Plot}</p>
    </div>
</div>
        
</div>
<hr> */