import axios from 'axios';
import dedent from 'dedent-js';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getIcon = icon => {
    switch (icon.slice(0, 2)) {
        case '01':
            return `☀️`;
        case '02':
            return `🌤️`;
        case '03':
            return `☁️`;
        case '04':
            return `☁️☁️`;
        case '09':
            return `🌧️`;
        case '10':
            return `🌦️`;
        case '11':
            return `🌩️⛈️`;
        case '13':
            return `❄️`;
        case '50':
            return `🌫️`;
    }
}

const getWeather = async city => {
    if (city == 'nz') city = 'Nizhniy Novgorod';
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
    if (!token) {
        throw new Error(
            dedent`
                Не задан ключ API, задайте его через команду -t [API_KEY] 
                или используйте флаг -st для того что бы использовать стандартный ключь
            `);
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: 'ru',
            units: 'metric'
        }
    });
    return data
};

export { getWeather, getIcon };