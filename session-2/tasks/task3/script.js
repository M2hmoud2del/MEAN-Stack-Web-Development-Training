const mealNameInput = document.getElementById('ingredient')
const mealsDiv = document.getElementById('meals')
const searchBtn = document.getElementById('searchBtn')
const URL = "https://www.themealdb.com"

async function Search(mealName){
    try{
        let response = await fetch(URL + "/api/json/v1/1/search.php?s=" + mealName)
        if(!response.ok){
            throw new Error('internal Error')
        }
        data = await response.json()
        if(data.meals === null)throw new Error("Not Found Meal")
            mealsDiv.innerHTML = ""
        for(let meal of data.meals){
    console.log(meal)
            mealsDiv.innerHTML += `
            <div class="col-md-12">
    <div class="card">
        <img class="card-img-top" src="${meal.strMealThumb}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.split('.')[0]}</p>
            <a href="${meal.strSource}" class="btn btn-primary">Go To Shop</a>
        </div>
    </div>
</div>
            
            `
        }
    }catch(error){
        console.log(error)
        mealsDiv.innerHTML = `<h3>No Meals Found 😢</h3>`;
    }
}


searchBtn.addEventListener('click', _ =>{
    Search(mealNameInput.value)

})