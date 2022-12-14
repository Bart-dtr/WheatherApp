const fetch = require('node-fetch');

const processWeatherData = async data => {
    const sorted = [...data].sort((a, b) => {
        if (b.temperatura > a.temperatura) {
            return 1;
        }
        if (a.temperatura > b.temperatura) {
            return -1;
        }
        return 0;
    });

    const {
        stacja: station,
        temperatura: temperature,
    } = sorted[0];

    console.log(`The highest temperature ${temperature}°C currently is in ${station}.`);
}

const findWarmestPlaceInPoland = async () => {
    try {
        const res = await fetch('https://danepubliczne.imgw.pl/api/data/synop');
        const data = await res.json();
        await processWeatherData(data);
    } catch(err) {
        console.log('Error has occured :D', error);
    }
}

findWarmestPlaceInPoland();