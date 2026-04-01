const breedSelect = document.getElementById("breed-select");
const gallery = document.getElementById("gallery");

// Get all breeds from the Dog API.
function loadBreeds() {
	fetch("https://dog.ceo/api/breeds/list/all")
		.then((response) => response.json())
		.then((data) => {
			const breeds = Object.keys(data.message).sort();

			// Add one option for each breed.
			breeds.forEach((breed) => {
				const option = document.createElement("option");
				option.value = breed;
				option.textContent = breed;
				breedSelect.append(option);
			});
		})
		.catch(() => {
			const option = document.createElement("option");
			option.value = "";
			option.textContent = "Could not load breeds";
			breedSelect.append(option);
		});
}

loadBreeds();

// When the user selects a breed, fetch 9 random images for that breed.
breedSelect.addEventListener("change", () => {
	const selectedBreed = breedSelect.value;

	if (!selectedBreed) {
		gallery.innerHTML = "";
		return;
	}

	fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/9`)
		.then((response) => response.json())
		.then((data) => {
			gallery.innerHTML = "";

			// Create an image element for each URL returned by the API.
			data.message.forEach((imageUrl) => {
				const image = document.createElement("img");
				image.src = imageUrl;
				image.alt = `A ${selectedBreed} dog`;
				gallery.append(image);
			});
		})
		.catch(() => {
			gallery.innerHTML = "<p>Could not load images.</p>";
		});
});
