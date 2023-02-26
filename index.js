let temperature = document.querySelector(".weather-box .temperature");
let wind = document.querySelector(".weather-box .wind p");
let humidity = document.querySelector(".weather-box .humidity p");
let icon = document.querySelector(".weather-box .icon");
let weatherBox = document.querySelector(".weather-box--wrap");
const kevinDegree = 273.15;
const APIKey = "8c4aa4d3404c3735e05e120ed737f962";
function removeClass(element, className = "valid") {
    element.classList.contains(className)
        ? element.classList.remove(className)
        : null;
}
function addClass(element, className = "valid") {
    element.classList.add(className);
}
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
                    removeClass(weatherBox, "valid");
                    addClass(weatherBox, "invalid");
                    src = "./img/map.png";
                    temperature.innerHTML = "No location found!";
                    icon.querySelector("img").setAttribute("src", src);
                } else {
                    weatherTypeList.forEach((weatherType) => {
                        if (data.weather[0].main === weatherType.type) {
                            src = weatherType.src;
                        }
                    });
                    removeClass(weatherBox, "invalid");
                    addClass(weatherBox);
                    icon.querySelector("img").setAttribute("src", src);
                    temperature.innerHTML =
                        Math.round((data.main.temp - kevinDegree).toFixed(2)) +
                        "<sup>°C</sup>";
                    humidity.innerHTML = data.main.humidity + "<span>%</span>";
                    wind.innerHTML = data.wind.speed + "<span>km/h</span>";
                }
            });
    });
const hour1 = document.querySelectorAll(".hours .digit")[0];
const hour2 = document.querySelectorAll(".hours .digit")[1];
const minute1 = document.querySelectorAll(".minutes .digit")[0];
const minute2 = document.querySelectorAll(".minutes .digit")[1];
const second1 = document.querySelectorAll(".seconds .digit")[0];
const second2 = document.querySelectorAll(".seconds .digit")[1];
const setNumber = (element, number) => {
    const show = element.querySelectorAll(`.n${number}`);
    const hide = element.querySelectorAll(`:not(.n${number})`);

    hide.forEach((el) => {
        el.classList.remove("active");
    });
    show.forEach((el) => {
        el.classList.add("active");
    });
};
setInterval(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    setNumber(hour1, Math.floor(hours / 10));
    setNumber(hour2, Math.floor(hours % 10));
    setNumber(minute1, Math.floor(minutes / 10));
    setNumber(minute2, Math.floor(minutes % 10));
    setNumber(second1, Math.floor(seconds / 10));
    setNumber(second2, Math.floor(seconds % 10));
}, 1000);
