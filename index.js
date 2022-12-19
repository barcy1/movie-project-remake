const apiUrl=`http://www.omdbapi.com/?i=tt3896198&apikey=39fdc95`;

const main=document.body;
let moviesArray=[];
let watchListArray=[];
let isSearched=false;



document.addEventListener('click',(event)=>{
    
    const searchInput=document.querySelector('.search-box');
    //setting the event handler for the search button click
    if(event.target.id==='search-btn'){
        console.log('clicked');
        let search=searchInput.value;
        //console.log(search);
        TitleSearch(search);       
    }
    

     if(event.target.dataset.icon){
        
        let pressedIcon=event.target.dataset.icon;
        let pressedId=event.target.dataset.id;
        const iconChange=document.querySelectorAll('.add-remove');
        var movieId=moviesArray.find(movie=> movie.imdbID===pressedId);
        watchListArray= JSON.parse(localStorage.getItem('watchList') || '[]');
        
           
           
            //========handeling ADDING movies to watchlist and changing the btn and text.======
        if(pressedIcon==='plus'){ 
            console.log(movieId);      
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
        }
        if(pressedIcon==='minus'){            
            console.log(pressedIcon);
            console.log(pressedId);
            console.log(iconChange);
            var movieId=watchListArray.find(movie=> movie.imdbID===pressedId);
            console.log(movieId);
            if(watchListArray.length>0){
              let movieToDelete=watchListArray.find(movie=>movie.imdbID===movieId.imdbID);
              let index=watchListArray.indexOf(movieToDelete);
              watchListArray.splice(index,1);
              localStorage.setItem('watchList',JSON.stringify(watchListArray));
              watchListArray= JSON.parse(localStorage.getItem('watchList') || '[]');
              renderMovieCard(watchListArray,false);
              if(watchListArray.length===0){
                watchlistRender();
              }
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
                                <div class="add-remove" data-id=${movie.imdbID}> 
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

const renderMovieCard = (movies,plusOrMinus)=>{
    const check=document.querySelector('.check');
    console.log(plusOrMinus);
    console.log(movies);
    check.innerHTML=`<section>${movies.map(movie=>(gettingHtml(movie,plusOrMinus))).join('')}</setion>`
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



const indexRender=()=>{
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
            <div class="indexplace">
                <img src='images/indexplaceholder-film.png'>
                <span>Search for a movie!</span>                
            </div>
        </div>    
    `;
} 



const watchlistRender=()=>{
    main.innerHTML=`
        <div class="wrapper">
            <div class="header">        
                <h1>WathList</h1>
                <a href="index.html">Search for movies!</a>        
           </div>
          <div class="check">
            <div class='watchlist-container'>
                <a href='index.html'><span>Go to search page to find some movies!</span></a>
            </div>
        </div> 
        
    
    `;
}




window.addEventListener('load',()=>{
    watchListArray= JSON.parse(localStorage.getItem('watchList') || '[]')
    if(main.id==='index'){
        indexRender(); 
        
    }else{
        if(watchListArray.length>0){
            watchlistRender();
            renderMovieCard(watchListArray,false);
        }
        else{
            watchlistRender();
        }
    }    
  

})



 
/* const watchlistPlaceholder=()=>{
    watch
} */




/*  else{
    renderMovieCard(watchListArray,plusOrMinus);
}  */



















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







