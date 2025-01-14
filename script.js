
async function responseApi(movie) {

    try {
        const response = await fetch(`http://www.omdbapi.com/?t=${movie}&apikey=4d52c9d6`)
        if (!response.ok) {
            throw new Error("Error fetching data.")
        }
        const data = await response.json()

        // Udpating innerHTML
        document.querySelector(".movie-title").innerHTML = data.Title
        document.querySelector(".poster").innerHTML = `<img src="${data.Poster}">`
        document.querySelector(".movie-genre").innerHTML = `Movie Genre: ${data.Genre}`
        document.querySelector(".year").innerHTML = `Year: ${data.Year}`
        document.querySelector(".description").innerHTML = `Description: ${data.Plot}`
        document.querySelector(".country").innerHTML = `Country: ${data.Country}`
        document.querySelector(".director").innerHTML = `Directed by: ${data.Director}`
        document.querySelector(".language").innerHTML = `Language: ${data.Language}`
        console.log(data)

        // Updating Background
        document.body.style.backgroundImage = `url(${data.Poster})`
        document.body.style.backgroundSize = "cover"
        document.body.style.backgroundPosition = "center"
        document.body.style.backgroundRepeat = "no-repeat"

    } catch (error) {
        console.log(error)
    }
}


// Fetching Suggestions
async function fetchSuggestions(query) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=4d52c9d6`);
        if (!response.ok) {
            throw new Error("Error fetching suggestions.");
        }
        const data = await response.json();
        return data.Search; // Returns an array of movie objects
    } catch (error) {
        console.error(error);
        return [];
    }
}


document.querySelector(".text-input").addEventListener("input", async (e) => {
    const query = e.target.value;
    const suggestionsBox = document.querySelector(".suggestions");

    // Clear previous suggestions
    suggestionsBox.innerHTML = "";

    if (query.length > 2) { // Fetch suggestions only if input length > 2
        const suggestions = await fetchSuggestions(query);

        if (suggestions) {
            suggestions.forEach((movie) => {
                const suggestionItem = document.createElement("div");
                // suggestionItem.innerHTML = `<img style="height: 100px;" src="${movie.Poster}">`
                suggestionItem.innerHTML = `${movie.Title} <br> ${movie.Year}`
                suggestionItem.style.padding = "16px";
                suggestionItem.style.cursor = "pointer";

                suggestionItem.addEventListener("click", () => {
                    document.querySelector(".text-input").value = movie.Title;
                    responseApi(movie.Title)
                    suggestionsBox.innerHTML = ""; // Clear suggestions on selection
                });

                suggestionsBox.appendChild(suggestionItem);
            });
        }
    }
});


document.querySelector(".btn").addEventListener("click", () => {
    let input = document.querySelector(".text-input").value;
    if (input) {
        responseApi(input)
    } else {
        throw new Error("Please enter movie name")
    }
})
