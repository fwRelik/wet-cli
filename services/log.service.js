import chalk from 'chalk';
import dedent from 'dedent-js';
import * as readLine from 'readline';

const printWeather = (data, icon) => {
    const { weather, main, wind, name } = data;
    console.log(
        dedent`${chalk.bgCyan.black(' Weather ')} 
        Погода в городе ${name}: ${icon}  ${weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1)}
        Температура: ${main.temp} (Ощущаеться как: ${main.feels_like} )
        Влажность: ${main.humidity}%
        Скорость Ветра: ${wind.speed} M/s
    `);
};

const printQuestion = (cb, question) => {
    const readline = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question(question, res => {
        if (res === 'y' || res === 'yes' || res === 'да') cb();
        readline.close();
    });
};

const printError = error => {
    console.log(`${'❌ '} ${chalk.bgRed.bold(' Error ')} ${error}`)
};

const printSuccess = msg => {
    console.log(`${'✔️ '} ${chalk.bgGreen.bold(' Success ')} ${msg}`)
};

const printHelp = () => {
    console.log(
        dedent`
        ${'❔'}
        ${chalk.bgCyan(' Help ')}
        Без параметров - вывод погоды.
        -h Для вывода помощи.
        -s [CITY] для установки города.
        -t [API_KEY] для сохранения токена.
        -st Использовать стандартный токен.
    `
    );
};

export { printError, printSuccess, printHelp, printWeather, printQuestion };