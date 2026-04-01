const breedSelect = document.getElementById("breed-select");
const gallery = document.getElementById("gallery");

// Get all breeds from the Dog API.
async function loadBreeds() {
	const response = await fetch("https://dog.ceo/api/breeds/list/all").catch(() => null);

	if (!response) {
		const option = document.createElement("option");
		option.value = "";
		option.textContent = "Could not load breeds";
		breedSelect.append(option);
		return;
	}

	const data = await response.json();
	const breeds = Object.keys(data.message).sort();

	// Add one option for each breed.
	breeds.forEach((breed) => {
		const option = document.createElement("option");
		option.value = breed;
		option.textContent = breed;
		breedSelect.append(option);
	});
}

loadBreeds();

// When the user selects a breed, fetch 9 random images for that breed.
breedSelect.addEventListener("change", async () => {
	const selectedBreed = breedSelect.value;

	if (!selectedBreed) {
		gallery.innerHTML = "";
		return;
	}

	const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/9`).catch(() => null);

	if (!response) {
		gallery.innerHTML = "<p>Could not load images.</p>";
		return;
	}

	const data = await response.json();
	gallery.innerHTML = "";

	// Create an image element for each URL returned by the API.
	data.message.forEach((imageUrl) => {
		const image = document.createElement("img");
		image.src = imageUrl;
		image.alt = `A ${selectedBreed} dog`;
		gallery.append(image);
	});
});
