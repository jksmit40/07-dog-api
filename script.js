const breedSelect = document.getElementById("breed-select");
const gallery = document.getElementById("gallery");

// Get all breeds from the Dog API.
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
		// Show a fallback option if the request fails.
		const option = document.createElement("option");
		option.value = "";
		option.textContent = "Could not load breeds";
		breedSelect.append(option);
	});

// When the user selects a breed, fetch one random image for that breed.
breedSelect.addEventListener("change", () => {
	const selectedBreed = breedSelect.value;

	if (!selectedBreed) {
		gallery.innerHTML = "";
		return;
	}

	fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
		.then((response) => response.json())
		.then((data) => {
			gallery.innerHTML = "";

			const image = document.createElement("img");
			image.src = data.message;
			image.alt = `A ${selectedBreed} dog`;
			gallery.append(image);
		})
		.catch(() => {
			gallery.innerHTML = "<p>Could not load image.</p>";
		});
});
