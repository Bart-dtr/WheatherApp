const fetch = require('node-fetch');
const {appendFile} = require('fs').promises;
const { normalize, resolve } = require('path');

function safeJoin(base, target) {
    const targetPatch = '.' + normalize('/' + target)
    return resolve(base, targetPatch);
}

const getDataFileName = city => safeJoin(`./data/`,`${city}.txt`);

const processWeatherData = async (data,cityName) => {
    const foundData = data.find(stationData => stationData.stacja === cityName);
    if (!foundData) {
        throw new Error('Sorry, city is not available in our API :(')
    }

    const {wilgotnosc_wzgledna:humidity,
        cisnienie:pressure,
        temperatura:temperature
    } = foundData;

    const weatherInfo = `In ${cityName} is ${temperature}°C, ${humidity}% of humidity, pressure is ${pressure} hpa`

    console.log(weatherInfo);
    const dateTimeString = new Date().toLocaleString();
    await appendFile(getDataFileName(cityName), `${dateTimeString}\n${weatherInfo}\n`)
};


const checkCityWeather = async cityName => {
    try {
        const res = await fetch('https://danepubliczne.imgw.pl/api/data/synop');
        const data = await res.json();
        await processWeatherData(data, cityName);
    } catch(err) {
        console.log('Error has occured :D', error);
    }
}

checkCityWeather(process.argv[2]);