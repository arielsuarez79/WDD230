

const apiURL = "https://api.openweathermap.org/data/2.5/weather?id=5604473&appid=d858fada324e1f2852714d37102f24bb ";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?id=5604473&appid=d858fada324e1f2852714d37102f24bb";
fetch(apiURL)
    .then((response) => response.json())
    .then((jsObject) => {
        let convertedTemp = kelvinToFarenheit(jsObject.main.temp);
        let description = jsObject.weather[0].description;
        let speed = Math.round(jsObject.wind.speed);

        document.querySelector('#description').innerHTML = `${description}`;

        document.querySelector('#temp').innerHTML = `${convertedTemp}&#8457;`;

        document.querySelector('#low-temp').innerHTML = `${kelvinToFarenheit(jsObject.main.temp_min)}&#8457;`;
       
        document.querySelector('#high-temp').innerHTML = `${kelvinToFarenheit(jsObject.main.temp_max)}&#8457;`;

        document.querySelector('#humidity').innerHTML = `${jsObject.main.humidity}%`

        document.querySelector('#speed').innerHTML = `${speed} mph`;

    });
    //Fetch forecast url
    fetch(forecastUrl)
    .then((response) => response.json())
    .then((jsObject) => {
        const currentDate = new Date(jsObject.list[0].dt_txt)
        const today = currentDate.getDay();
        let i = today;
        let dayOfTheWeek;
        const days = document.querySelectorAll('.col-head');

        const weekDayNames = {
            0: 'SUN',
            1: 'MON',
            2: 'TUE',
            3: 'WED',
            4: 'THUR',
            5: 'FRI',
            6: 'SAT',
        }

        days.forEach((day) => {
            Object.keys(weekDayNames).forEach((day) => {
                if (i > 6) {
                    i = 0;
                }
                if (day == i) {
                    dayOfTheWeek = weekDayNames[i];
                }
            })
            day.innerHTML = dayOfTheWeek;
            i += 1;
        })

        const weeklyImages = document.querySelectorAll('.week-img');

        const weeklyTemp = document.querySelectorAll('.data');

        let count = 0;

        jsObject.list.forEach((item, i) => {
            let itemDate = new Date(item.dt_txt);
            let now = itemDate.getHours();

            if (now == 18) {
                let weeklyWeather = kelvinToFarenheit(jsObject.list[i].main.temp);
                weeklyTemp[count].innerHTML = `${weeklyWeather}&#8457;`;

                let imagesrc = `https://openweathermap.org/img/w/${jsObject.list[i].weather[0].icon}.png`;
                weeklyImages[count].setAttribute('src', imagesrc)

                count += 1;
            }
        })
        for (i = today, j = 0; j < weeklyImages.length; j++, i++){
            if(i > 6){
                i = 0;
            }
            weeklyImages[j].setAttribute('alt', `An image for daily weather`)
        }
});


function kelvinToFarenheit(kelvinTemp){
    return Math.round((kelvinTemp * (9/5)) - 459.67);
}