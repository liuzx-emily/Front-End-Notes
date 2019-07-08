const fs = require('fs');
const dir = './demo/src';
const autoCreatedFileName = './demo/dist/main.txt';
fs.readdir(dir, (err, files) => {
    files.forEach(f => {
        f = `${dir}/${f}`;
        fs.watch(f, (ev, fn) => {
            console.log(`${fn} is ${ev}d`);
            update(dir);
        });
    });
});

function update(dir) {
    const arr = [];
    let content = '';
    fs.readdir(dir, (err, files) => {
        files.forEach(f => {
            f = `${dir}/${f}`;
            const stats = fs.statSync(f);
            switch (stats.mode) {
                case 16822: //folder
                    const files = fs.readdirSync(f);
                    files.forEach(fn => {
                        fn = `${f}/${fn}`;
                        arr.push(fn);
                    });
                    break;
                case 33206: //file
                    arr.push(f);
                    break;
                default:
                    break;
            }
        });
        console.log(arr);
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i]);
            console.log(fs.readFileSync(arr[i]));
            content += arr[i] + '\n' + fs.readFileSync(arr[i]) + '\n\n\n';
        }
        fs.writeFile(autoCreatedFileName, content);
    });

}

fs.readFile('./demo/src/index.html')

//watch可监视dir，但只能监控一层
