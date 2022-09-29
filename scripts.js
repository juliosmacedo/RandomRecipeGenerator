const app = document.getElementById('root')
var request = new XMLHttpRequest()
const container = document.createElement('div')
container.setAttribute('class', 'container')
app.appendChild(container)

request.open('GET', 'https://www.themealdb.com/api/json/v1/1/random.php', true)




fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then(res => res.json())
  .then(res => {
  createMeal(res.meals[0]);
});

const createMeal = (meal) => {
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for(let i=1; i<=20; i++) {
		if(meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	}
  const h3 = document.createElement('h3')
  h3.innerHTML = `	<h5> Ingredients </h5>			<ul>
  ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
</ul>`;
container.appendChild(h3)
}




request.onload = function () {
  var data = JSON.parse(this.response);
  const h1 = document.createElement('h1')

  if (request.status >= 200 && request.status < 400) {
    console.log(data.meals[0])
    
      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      const h1 = document.createElement('h1')
      h1.textContent = data.meals[0].strMeal;

      const p = document.createElement('p')
      p.textContent = data.meals[0].strInstructions;

      const img = document.createElement('img')
      img.src = data.meals[0].strMealThumb;
      img.width = "300"
      img.height = "300"

      const h2 = document.createElement('a')
      h2.textContent = "Watch this recipe cooking tutorial on YouTube"
      h2.href = data.meals[0].strYoutube;



      const h4 = document.createElement('h4')
      h4.textContent = 'Category: ' + data.meals[0].strCategory + ' ---- ' + 'Origin: ' + data.meals[0].strArea

      container.appendChild(card)
      card.appendChild(img)
      card.appendChild(h1)
      card.appendChild(h4)
      card.appendChild(h2)
      card.appendChild(p)



  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}


request.send()