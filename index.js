let temperature = document.querySelector(".weather-box .temperature");
let wind = document.querySelector(".weather-box .wind p");
let humidity = document.querySelector(".weather-box .humidity p");
let icon = document.querySelector(".weather-box .icon");
let weatherBox = document.querySelector(".weather-box--wrap");
const kevinDegree = 273.15;
const APIKey = "8c4aa4d3404c3735e05e120ed737f962";
const weatherTypeList = [
    {
        type: "Clouds",
        src: "./img/sunny_with_clouds_icon.png",
    },
    {
        type: "Mist",
        src: "./img/mist.png",
    },
    {
        type: "Rain",
        src: "./img/rain.png",
    },
    {
        type: "Clear",
        src: "./img/sun.png",
    },
];
document
    .querySelector(".search-box .icon:last-child")
    .addEventListener("click", () => {
        const cityName = document.querySelector(".search-box input").value;
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units="metric"&appid=${APIKey}`
        )
            .then((response) => response.json())
            .then((data) => {
                // data <=> response.json()
                console.log(data);
                if (data.cod === "404") {
                    weatherBox.classList.add("invalid");
                    src = "./img/map.png";
                    temperature.innerHTML = "No location found!";
                    icon.querySelector("img").setAttribute("src", src);
                } else {
                    weatherTypeList.forEach((weatherType) => {
                        if (data.weather[0].main === weatherType.type) {
                            src = weatherType.src;
                        }
                    });
                    weatherBox.classList.add("valid");
                    icon.querySelector("img").setAttribute("src", src);
                    temperature.innerHTML =
                        Math.round((data.main.temp - kevinDegree).toFixed(2)) +
                        "<sup>°C</sup>";
                    humidity.innerHTML = data.main.humidity + "<span>%</span>";
                    wind.innerHTML = data.wind.speed + "<span>km/h</span>";
                }
            });
    });
