require('dotenv').config();
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const http = require('http');
const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 <command>')
  .command('"your_city"', '- wheather to your city')
  .example('$0 kaluga', '- show wheather to kaluga')
  .demandCommand(1)
  .argv;

const city = argv._[0];
const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_TOKEN}&query=${city}`;

http.get(url, res => {
  const statusCode = res.statusCode;
  if (statusCode !== 200) {
    console.error(`Status Code: ${statusCode}`);
    return;
  }
  let rawData = '';
  res.on('data', chunk => rawData += chunk);
  res.on('end', () => {
    const data = JSON.parse(rawData);
    if (data.success === false) {
      console.log(`Ошибка получения данных: ${data.error.info}`);
    } else {
      console.log(`Current temperature in ${data.location.name} is ${data.current.temperature}℃`);
    }
  })
}).on('error', err => {
  console.error(`Got error: ${err.message}`)
})