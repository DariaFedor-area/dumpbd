const mysqldump = require("mysqldump")
const colors = require("colors")
const date = new Date()
const fs = require("fs")

setTimeout(() => {
    savebd()
}, 0);


async function savebd() {
    console.log("Инициализация".blue);
    var name = `dump.${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}.${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    if (fs.existsSync("./bd.js") == false) {
        console.log("Файл не найден bd.js".red);
        return
    }
    const con = require("./bd.js")
    let int = setInterval(() => {
                console.log(`Создание дампа: ${`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} | ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}`.yellow);
    }, 1000);
    await mysqldump({
        connection: {
            host: con.host,
            user: con.user,
            password: con.password,
            database: con.database,
        },
        dumpToFile: `./${name}.sql`,
    });
    clearInterval(int)
    console.log("Сохранение закончено успешно".green);
    let timer = 1
    let int2 = setInterval(() => {
        console.log(`Закройте приложение`.red);
        if (timer < 10){
            timer + 1
        }else{
            clearInterval(int2)
        }
    }, 5000);

}