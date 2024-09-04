

const recipeButton = document.querySelector(".oneRecipe");

recipeButton.addEventListener("click", () => {
    const input = document.querySelector("input").value;
    const url = `https://bite-box-da0099d606eb.herokuapp.com/api/recipe/${input}`;
    
    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error("Recipe Not Found. Please add or try again.");
            }
            return res.json(); 
        })
        .then(data => {
            const instructionsP = document.querySelector(".instructionsP");
            const mainRecipe = document.querySelector(".mainRecipe");
            const ul = document.querySelector("ul");
            const recipeName = document.querySelector(".recipeName");
            ul.innerHTML = "";

            data.ingredients.forEach(element => {
                const li = document.createElement("li");
                li.textContent = element;
                ul.appendChild(li);
            });
            instructionsP.textContent = data.instructions;
            mainRecipe.src = data.img;
            recipeName.textContent = data.name
        })
        .catch(error => {
            const error1 = document.querySelector(".error1");
            error1.textContent = `${input} not found. Please try another recipe.`;
            console.error("Error fetching recipe details:", error);
        });
});

const button2 = document.querySelector("#button2");

button2.addEventListener("click", () => {
    const url = "https://bite-box-da0099d606eb.herokuapp.com/api/recipes";
    fetch(url)
    .then(res => {
        if (!res.ok) {
            throw new Error("Error fetching recipes");
        }
        return res.json();
    })
    .then(data => {
        const recipeContainer = document.querySelector(".recipeContainer");
        recipeContainer.innerHTML = "";
        
        data.forEach(recipe => {
            const recipeDiv = document.createElement("div");
            recipeDiv.className = "recipe";
            recipeDiv.id = recipe.name; 

            const imgRecipeBoxDiv = document.createElement("div");
            imgRecipeBoxDiv.className = "imgRecipeBox";
            const img = document.createElement("img");
            img.className = "imgBox";
            img.src = recipe.img;
            img.alt = recipe.name;
            imgRecipeBoxDiv.appendChild(img);
            
            const nameRecipeBoxDiv = document.createElement("div");
            nameRecipeBoxDiv.className = "nameRecipeBox";
            const p = document.createElement("p");
            p.textContent = recipe.name;
            nameRecipeBoxDiv.appendChild(p);
            
            recipeDiv.appendChild(imgRecipeBoxDiv);
            recipeDiv.appendChild(nameRecipeBoxDiv);
            recipeContainer.appendChild(recipeDiv);  
        });

        recipeContainer.addEventListener("click", (event) => {
            const clickedRecipe = event.target.closest(".recipe");
            if (clickedRecipe) {
                const id = clickedRecipe.id;  
                const targetUrl = `https://bite-box-da0099d606eb.herokuapp.com/api/recipe/${id}`;
                console.log(`Fetching recipe from: ${targetUrl}`); 
                
                fetch(targetUrl)
                .then(res => {
                    recipeContainer.innerHTML = "";
                    console.log("okay made it past the .then")
                    if (!res.ok) {
                        throw new Error("Error fetching recipe details");
                    }
                    return res.json();
                })
                .then(data => {
                    const instructionsP = document.querySelector(".instructionsP");
                    const mainRecipe = document.querySelector(".mainRecipe");
                    const ul = document.querySelector("ul");
                    const recipeName = document.querySelector(".recipeName");
                    ul.innerHTML = "";

                    data.ingredients.forEach(element => {
                        const li = document.createElement("li");
                        li.textContent = element;
                        ul.appendChild(li);
                    });

                    instructionsP.textContent = data.instructions;
                    mainRecipe.src = data.img;
                    recipeName.textContent = data.name
                })
                .catch(error => {
                    console.error("Error fetching recipe details:", error);
                });
            }
        });
    })
    .catch(error => {
        console.error("Error fetching recipes:", error);
    });
});










