

    (async () => {
   
        const hamburgerButton = document.querySelector('[data-drawer-toggle="separator-sidebar"]');
        const sidebar = document.getElementById('separator-sidebar');

        hamburgerButton.addEventListener('click', function() {
          sidebar.classList.toggle('translate-x-0');
          sidebar.classList.toggle('-translate-x-full');
});

        $('.close').click(function() {  
          sidebar.classList.toggle('translate-x-0');
          sidebar.classList.toggle('-translate-x-full');

        });

        //Carosual
        const progressCircle = document.querySelector(".autoplay-progress svg");
        const progressContent = document.querySelector(".autoplay-progress span");
    
        const swiperEl = document.querySelector("swiper-container");
        swiperEl.addEventListener("autoplaytimeleft", (e) => {
          const [swiper, time, progress] = e.detail;
          progressCircle.style.setProperty("--progress", 1 - progress);
          progressContent.textContent = `${Math.ceil(time / 2000)}s`;
        });
        

        const movieData = getMovies().then((data) => {
            // console.log(data[0])
            return data;
        });

        let movieList = await movieData;
        // console.log(movieList)


        //Featured Movies
        // ----First Movie-----//
        let movieData1 = getMovies().then((data) => {
            // console.log(data[0])
            return data[0];
        });
        let firstMovie = await movieData1;
        // console.log(firstMovie)

        //----Second Movie----//
        let movieData2 = getMovies().then((data) => {
            // console.log(data[0])
            return data[1];
        });
        let secondMovie = await movieData2;
        // console.log(secondMovie)
        // //---end---//

        // //----Third Movie----//
        let movieData3 = getMovies().then((data) => {
            // console.log(data[0])
            return data[2];
        });
        let thirdMovie = await movieData3;
        // console.log(thirdMovie)
        // ---end---//

      
      //Append First Movie
      function featuredMovie(movie){
  
            let html = '';    

            html += ` <div class="h-96 md:h-96 grid place-items-center">
      
            <div class="bg-white rounded-md bg-gray-800 shadow-lg">
              <div class="md:flex px-4 leading-none max-w-xl">
                <div class="md:flex-none flex justify-center items-align">
                 <img src="${movie.image}"
                  alt="pic"
                  class="h-72 w-56 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-300 shadow-lg"
                />           
                </div>
      
                <div class="flex-col text-gray-300">
         
                  <p class="pt-4 text-2xl ml-4 font-bold">${movie.title}</p>
                  <hr class="hr-text" data-content="">
                  <p class="hidden md:block px-4 my-4 text-sm text-left"> ${movie.actors} </p>
                  
                  <p class="flex text-md px-4 my-2">
                    Rating: ${movie.rating} 
                  </p>
                  
                </div>
              </div>
              </div>          
            </div>
          </div>`
  
            $('.movie-1').append(html)
      }
      featuredMovie(await firstMovie)

      //Add second Movie
      function featuredMovie1(movie){
          let html = '';    
          html +=   `  <div class="h-96 grid place-items-center">
      
          <div class="bg-white rounded-md bg-gray-800 shadow-lg">
            <div class="md:flex px-4 leading-none max-w-xl">
              <div class="md:flex-none flex justify-center items-align">
               <img
               src="${movie.image}"
                class="h-72 w-56 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-300 shadow-lg"
              />           
              </div>
    
              <div class="flex-col text-gray-300">
       
                <p class="pt-4 text-2xl ml-4 font-bold">${movie.title}</p>
                <hr class="hr-text" data-content="">    
                <p class="hidden md:block px-4 my-4 text-sm text-left">${movie.actors}</p>
                
                <p class="flex text-md px-4 my-2">
                  Rating: ${movie.rating}  
                </p>
              </div>
            </div>
            </div>          
          </div>
        </div>`

          $('.movie-2').append(html)
      }
      featuredMovie1(await secondMovie)

    //   //Add third movie
      function featuredMovie2(movie){
        let html = '';    
        // for(let i = 0; i < allNewMovies.length; i++){
        html +=   `  <div class="h-96 grid place-items-center">
      
        <div class="bg-white rounded-md bg-gray-800 shadow-lg">
          <div class="md:flex px-4 leading-none max-w-xl">
            <div class="md:flex-none flex justify-center items-align">
             <img
             src="${movie.image}"
              class="h-72 w-56 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-300 shadow-lg"
            />           
            </div>
  
            <div class="flex-col text-gray-300">
     
              <p class="pt-4 text-2xl ml-4 font-bold">${movie.title}</p>
              <hr class="hr-text" data-content="">
              <p class="hidden md:block px-4 my-4 text-sm text-left">${movie.actors} </p>
              
              <p class="flex text-md px-4 my-2">
                Rating: ${movie.rating}
              </p>
            </div>
          </div>
        </div>          
        </div>
      </div>`

        $('.movie-3').append(html)
    }
      featuredMovie2(await thirdMovie)

//#################### Dynamic codes start here 

    console.log(movieList);
    function getAllMovies(){
    let html = '';    
    for(let i = 0; i < movieList.length; i++){

      html += `<div class="flex flex-col h-full border border-gray-200 xl:h-full xl:w-4/5 rounded-lg xl:flex-col xl:items-center w-full shadow md:flex-row dark:border-gray-700 xl:ml-[15px] dark:bg-gray-800">

      <img class="object-cover rounded-t-lg md:w-80 md:h-full w-full h-1/2 xl:h-2/3 md:rounded-none md:rounded-l-lg" src="${movieList[i].image}" alt="">

        <div class = "flex w-full justify-center items-center">

          <div class ="md:text-center md:ml-1/2 mt-[5em] md:mt-0 mb-5 flex flex-col space-between items-center">

            <div class="test flex h-1/2 flex-col justify-between p-5 break-words justify-center items-center">
                <h5 class=" mb-2 text-center text-4xl md:text-4xl font-bold text-gray-900 dark:text-white">${movieList[i].title}</h5>
                <p class=" font-normal  xl:text-md mb-1  text-gray-700 dark:text-gray-400">Year</p>
                <p class=" font-normal  xl:text-md mb-3  text-white">${movieList[i].year}</p>
                <p class=" font-normal  xl:text-md mb-1 text-gray-700 dark:text-gray-400">Rating</p>
                <p class=" font-normal  xl:text-md mb-3 text-white">${movieList[i].rating}</p>
                <p class=" font-normal  xl:text-md mb-1 text-gray-700 dark:text-gray-400">Summary</p>
                <p class=" font-normal  xl:text-md mb-3  text-white">${movieList[i].actors}</p>
            </div>

          <div>
                                    
          <button type="button" data-movieID = ${movieList[i].id} class="mt-5 delete-btn w-24 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium 
          rounded-lg text-sm py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>

          <button type="button" data-updateId ="${movieList[i].id}" class="update-btn text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Update</button>
                              
        </div>

      </div>

    </div>    
  </div>`
    } 
    $('.favorites').append(html);
    }
     getAllMovies();

//Movie Object that goes into add movies function(first add btn)
$(document).on(`click`, `#add-btn`, async (e) => {
  e.preventDefault();
  const addMovieValue = $('#title').val();
   const addMovieName = await movieDbApi(addMovieValue); 
  let imagePoster = `https://image.tmdb.org/t/p/w500${addMovieName.results[0].poster_path}` 

  let movieObject = {  
    image: imagePoster, 
    title: $('#title').val(),
    year:  $('#year').val(),
    rating: $('#rating').val(),
    actors: $('#actors').val(),
  }
//add to database
  await addMovie(movieObject);
  location.reload();
});

//All Cancel Buttons
$(document).on(`click`, `.cancel-btn`, (event) => {
  location.reload();
});


  // Delete Movies
$('.delete-btn').on('click',async function () {
    const movieAtt = $(this).attr('data-movieID');
    console.log($(this).attr('data-movieID'));
    await deleteMovie(movieAtt);
    location.reload()
})
  

  //Update function start
  $('.update-btn').on('click', function(e){
    e.preventDefault();
    const updateId = $(this).attr('data-updateId');
    const targetedMovie = movieList.find(movie => movie.id === updateId);
    console.log(targetedMovie.title);
    console.log(targetedMovie.year);
    console.log(targetedMovie.rating);
    console.log(targetedMovie.actors);
    let html = '';

    html += `

    <h5 class="w-50 mb-2 text-center text-4xl md:text-4xl md:w-50 font-bold text-gray-900 dark:text-black"><input type="text" id="updated-title" class="form-control w-4/5 md:mt-5 form-control rounded-full text-white focus:border-blue-500 focus:border-blue-500 text-center bg-gray-700 focus:ring-blue-500 dark:border-gray-600 rounded-full text-center" value="${targetedMovie.title}"/></h5>
                
               <p class=" font-normal mb-1 text-1xl text-gray-700 dark:text-gray-400">Year</p>
               <p class=" font-normal text-1xl mb-1 text-black"> <input type="number" id="updated-year" class="form-control form-control rounded-full text-white text-1xl focus:border-blue-500 focus:border-blue-500 text-center bg-gray-700 focus:ring-blue-500 dark:border-gray-600 rounded-full w-2/4 text-center" value="${targetedMovie.year}"/></p>
              
               <p class=" font-normal text-1xl mb-1  text-gray-700 dark:text-gray-400">Rating</p>
               <p class=" font-normal text-1xl mb-1  text-black"> <input type="number" id="updated-rating" class="form-control rounded-full w-2/4 text-1xl text-white focus:border-blue-500 focus:border-blue-500 text-center bg-gray-700 focus:ring-blue-500 dark:border-gray-600" value="${targetedMovie.rating}"/></p>  

               <p class=" font-normal text-1xl mb-1 text-gray-700 dark:text-gray-400">Summary</p>
               <textarea id= "updated-actors" class="font-normal form-control text-white focus:border-blue-500 focus:border-blue-500 text-center bg-gray-700 focus:ring-blue-500 dark:border-gray-600 text-2xl mb-1 md:text-3xl xl:text-1xl text-white" value="${targetedMovie.actors}"> </textarea> 
                
    <div class = "flex">
      <button type="button" data-saveId= ${targetedMovie.id} class="save-btn mt-3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Save</button>

      <button type="button" data-saveId= ${targetedMovie.id} class="cancel-btn mt-3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button>
      </div>
    `
    $(this).parent().parent().parent().children().html(html);
  });
 
//Save button event listener
$(document).on('click', '.save-btn', async function(e){
  e.preventDefault();
  const saveId = $(this).attr('data-saveId');
  const updatedTitle = $('#updated-title').val();
  const updatedActors = $('#updated-actors').val();
  const updatedRating = $('#updated-rating').val();
  const updatedYear = $('#updated-year').val();

   movieList.forEach(async element => {
    if(saveId === element.id){
      const editedMovie = {
        id: saveId,
        title: updatedTitle,
        rating: updatedRating,
        year: updatedYear,
        actors: updatedActors,
      }
      await updateMovie(editedMovie)
      location.reload();
      
    }
  });
});


//Click on Add Movie button
  $('.open-modal').click(function() {
    $('#pop-up').removeClass('hidden');
    sidebar.classList.toggle('translate-x-0');
    sidebar.classList.toggle('-translate-x-full');
  });

//Click On close button
  $('#close').click(function() {
    $('#pop-up').addClass('hidden');
   
  });

//Update Movie button
  $('#update-movie').click(function() {
    $('#update').removeClass('hidden');
  });

//Click On close button
  $('#close-update').click(function() {
    $('#update').addClass('hidden'); 
  });


  
//### The imdb API starts here
  const movieDbApi = async (movieName) =>{
   try{
     let apiCall = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${keys.themoviedb}&query=${movieName}`)
       let data = await apiCall.json();
       return data;
   }catch(error){
       console.log(error);
   }
 }


 $('#search-input').click(function(){
  $('.search-bar-container').addClass('scale-150');
  $('.search-backdrop').removeClass('hidden');
});

$('.search-backdrop').click(function(){
  $('.search-backdrop').addClass('hidden');
  $('.search-bar-container').removeClass('scale-150');
});

$(document).click(function(event) {
  if (!$(event.target).closest('#search-input').length) {
    $('.search-backdrop').addClass('hidden');
    $('.search-bar-container').removeClass('scale-150');
  }
});


//Search button event listeners here
$('#search-btn').on('click', async function(e){
 e.preventDefault();
 $('#hidden-div').toggleClass('hidden');
 $('#black-bg').addClass('hidden');

 const searchedMovie = $('#search-input').val();
//  console.log(searchedMovie);
 const foundMovies = await movieDbApi(searchedMovie);
//  console.log(foundMovies);

 let theDate = foundMovies.results[0].release_date.slice(0, 4);
 let actors = foundMovies.results[0].overview;
 
let html = '';

 html += ` 
 <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center">
 <div class="z-39 absolute w-full h-screen bg-gray-900 opacity-60"></div>
        <div class="md:h-96 grid place-items-center" style ="z-index:999999">
            <div class="bg-white rounded-md bg-gray-800 shadow-lg">
              <div class="md:flex px-4 leading-none max-w-xl">
                <div class="md:flex-none flex justify-center items-align">
                 <img src="https://image.tmdb.org/t/p/w500${foundMovies.results[0].poster_path}"
                  alt="pic"
                  id="s-m-poster"
                  class="h-72 w-56 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-300 shadow-lg"
                />           
                </div>
      
                <div class="flex-col text-gray-300">
         
                  <p id='s-m-title' class="pt-4 text-2xl ml-4 font-bold">${foundMovies.results[0].title} (<span id='s-m-date'>${theDate}</span>)</p>
                  <hr class="hr-text" data-content="">
                  <p id='s-m-actors'class="hidden md:block px-4 my-4 text-sm text-left"> ${actors} </p>
                  
                  <p id='s-m-rating' class="flex text-md px-4 my-2">
                    Rating: ${foundMovies.results[0].vote_average}/10 
                  </p>

                  <div class = "buttons ml-5 mt-3">
                  <button type="button" data-updateId ="${movieList.id}" class="add-btn text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Add</button>

                  <button type="button" data-updateId ="${movieList.id}" class="cancel-btn text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button>
                  </div>
                </div>
              </div>
              </div>          
            </div>
          </div>
          </div>`

     $('#hidden-div').prepend(html);
});


// Second add button from API search
$(document).on('click', '.add-btn', async function(e){
  e.preventDefault();
  let image = $("#s-m-poster").attr("src");
  console.log(image)
  let title = $('#s-m-title').text();
  let year = $('#s-m-date').text();
  let rating = $('#s-m-rating').text().split(": ")[1];
  let actors = $('#s-m-actors').text();

  const searchedMovie = {
    image: image,
    title: title,
    year: year,
    rating: rating,
    actors: actors,
  }
  await addMovie(searchedMovie);
  location.reload();
});


})();

