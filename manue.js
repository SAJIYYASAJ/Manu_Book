const searchbtn=document.getElementById('search-btn');
const meallist=document.getElementById('meal');
const mealDetailsConten=document.querySelector('.meal-detail-content');
const recipieCloseBtn=document.getElementById('recipe-close-btn');

//event listener
searchbtn.addEventListener('click',getMealList);
meallist.addEventListener('click',getMealRecipie);
recipieCloseBtn.addEventListener('click',()=>{
  mealDetailsConten.parentElement.classList.remove('showRecpie')
});

//get meal list is metch with increadiants
function getMealList(){
    let searchInputTxt=document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then((res)=>res.json())
     .then(data => {
         let html="";
         if(data.meals){
              data.meals.forEach(meal => {
                  html += `
                     <div class="meal-item" data-id= "${meal.idMeal}">
                     <div class="meal-img">
                     <img src="${meal.strMealThumb}" alt="food">
                     </div>
                     <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                     <a href="#" class="recipe-btn">Get recipe</a>
                     </div>
                     </div>
                `
             });
             meallist.classList.remove('notFound');
          }
          else{
            html="sorry we didn't find any meals!";
            meallist.classList.add('notFound');
          }
         meallist.innerHTML=html;
     })
}
//get recipie of the meal
function getMealRecipie(e){
  e.preventDefault();
  if(e.target.classList.contains('recipe-btn')){
    let mealItem=e.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
    .then((res)=>res.json())
    .then(data =>mealRecipieModel(data.meals))
}
}
//creat a model
function mealRecipieModel(meal){
  console.log(meal)
  meal=meal[0];
  let html=`
                    <h2 class="recipe-title">${meal.strMeal}Mea</h2>
                    <p class="recipie-cotegory">${meal.strCategory}</p>
                    <div class="recipie-instruction">
                      <h3>Instructions:</h3>
                      <p>${meal.strInstructions}</p>
                    </div>
                    <div class="recipie-meal-img">
                        <img src="${meal.strMealThumb}" alt="">
                    </div>
                    <div class="recipie-link">
                        <a href="${meal.strYoutube}" target="_blank">watch vedio</a>
                    </div>
  `;
  mealDetailsConten.innerHTML=html;
  mealDetailsConten.parentElement.classList.add('showRecpie')
}
