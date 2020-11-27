const fs = require( "fs" );
const readline = require('readline');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 <command> [options]')
  .command('play', '- play this game')
  .command('stat', '- read statistic file')
  .example('$0 play --file filename.txt', 'play and keep on log file')
  .alias('f', 'file')
  .describe('f', 'file')
  .demandCommand(1)
  .argv;

const command = argv._[0];
const { file } = argv;

//Если не указан файл лога, то установливаем по умолчанию
const outLogFile = typeof file === 'string' ? file : 'default-log.txt';

if (command === 'play') {
  goToPlay(outLogFile);
} else if (command === 'stat') {
  printStat(outLogFile);
}

/**
 * Запуск игры
 * @param logFile файл лога
 */
function goToPlay (logFile) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const writeStream = fs.createWriteStream( logFile, { encoding: "utf8"} );
  console.log(`Ход игры пишется в ${logFile}`);
  const askUser = function () {
    //Загадываем число
    const randResult = Math.random() < 0.5 ? '1' : '2';
    //Спрашиваем
    rl.question("Орел или решка?:\n"
      + "1) Орел 1\n"
      + "2) Решка 2\n"
      + "3) Выход\n"
      , function (line) {
        let userResult = false;
        if (line === "3") {
          return rl.close();
        } else if (line === randResult) {
          userResult = true;
          console.log('Угадал');
        } else {
          console.log('Не угадал');
        }
        //Пишем в лог результат
        writeStream.write(userResult.toString() + ';');
        //спрашиваем снова
        askUser();
      });
  };
  askUser();
}

/**
 * Вывести статистику игра по логу
 * @param logFile файл лога
 */
function printStat(logFile) {
  fs.readFile(logFile, 'utf8', (err, data) => {
    if(err) throw err;
    const listPlays = data.split(';').filter(play => play.trim())
    const stat = {
      victories: listPlays.filter(v => v === 'true').length,
      defeats: listPlays.filter(v => v === 'false').length,
    }

    console.log(`Всего партий: ${listPlays.length}`)
    console.log(`Побед: ${stat.victories}`);
    console.log(`Поражений: ${stat.defeats}`);
    console.log(`Выиграно: ${ Math.round(stat.victories * 100/listPlays.length)} процентов партий`);
    console.log();
  });

}



