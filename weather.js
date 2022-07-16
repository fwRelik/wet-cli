#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printError, printSuccess, printHelp, printWeather, printQuestion } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from "./services/storage.service.js";
import { getWeather, getIcon } from "./services/api.service.js";

const saveToken = async token => {
    if (!token.length) {
        printError('Токен не передан');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Токен сохранен.');
    } catch (e) {
        printError(e.message);
    }
};

const saveCity = async city => {
    if (!city.length) {
        printError('Город не передан');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('Город сохранен.');
    } catch (e) {
        printError(e.message);
    }
};

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (e) {
        switch (e?.response?.status) {
            case 404:
                printError('Неверно указан город.');
            case 400:
                printError('Скорее всего не указан город, воспользуйтесь флагом -h');
                break;
            case 401:
                printError('Неверно указан токен');
                break;
            default:
                printError(e.message);
                break;
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv)

    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        return saveCity(args.s)
            .then(() => printQuestion(getForcast, 'Вывести погоду ? (y | n): '));
    }
    if (args.t) {
        return saveToken(args.t);
    }
    if (args.st) {
        return saveToken('2499615e6dea1893c04571c1644ec916');
    }

    return getForcast();
};

initCLI();