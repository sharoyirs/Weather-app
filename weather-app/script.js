const citySearch = document.querySelector(".city_search");
const btn = document.querySelector(".city_button");
const countryText = document.querySelector(".country");
const cityText = document.querySelector(".city");
const celcius = document.querySelector(".celcius");
const uv = document.querySelector(".uv");
const result = document.querySelector(".result");
const countryImg = document.querySelector(".country_image");

const fetchWeather = async function () {
	try {
		const response =
			await fetch(`http://api.weatherapi.com/v1/current.json?key=3498fe0832ae45c5800140648230507&q=${citySearch.value}&aqi=no
      `);
		console.log(response);
		if (!citySearch.value) {
			throw new Error("Type in a city to check its weather");
		} else if (response.status === 400) {
			throw new Error("Type in a valid city name");
		}
		const data = await response.json();

		// second fetch function:
		const countryFlag = async function () {
			try {
				const response2 = await fetch(
					`https://restcountries.com/v3.1/name/${data.location.country}`
				);
				const [data2] = await response2.json();
				countryImg.src = data2.flags.png;
			} catch (error) {
				cityText.insertAdjacentHTML(
					"afterend",
					`Couldnt find picture of this country`
				);
			}
		};
		await countryFlag();
		/////////////////////////////////////////
      /////////////////////////////////////////
		console.log(data);
		countryText.textContent = data.location.country;
		cityText.textContent = `${data.location.name}`;
		celcius.textContent = `Celcius: ${data.current.temp_c}`;
		uv.textContent = `UV: ${data.current.uv}`;
		result.style.opacity = 1;
		countryText.style.opacity = 1;
		cityText.style.opacity = 1;
	} catch (error) {
		console.log(error.message);
		cityText.textContent = error.message;
		cityText.style.opacity = 1;
		result.style.opacity = 0;
		countryText.style.opacity = 0;
		countryImg.src = "";
	}
};

btn.addEventListener("click", fetchWeather);

citySearch.addEventListener("keyup", function (event) {
	if (event.key === "Enter") {
		fetchWeather();
	}
});

const countryFlag = async function () {
	const response2 = await fetch(
		`https://restcountries.com/v3.1/name/deutschland`
	);
	const [data2] = await response2.json();
	console.log(data2.flags.png);
};

countryFlag();
