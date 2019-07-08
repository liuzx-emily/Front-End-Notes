//hello.js


const projectData = [{
    "name": "demo",
    "type": "dir",
    "files": [
        "webpack.develop.config.js",
        "webpack.publish.config.js", {
            "name": "dist",
            "type": "dir"
        }, {
            "name": "src",
            "type": "dir",
            "files": [
                { "name": "css", "type": "dir" },
                { "name": "js", "type": "dir" },
                "index.html"
            ]
        }
    ]
}];

const fs = require('fs');
const init = function(data, parentDir = './') {
    data.forEach((f) => {
        if (f.type === 'dir') {
            f.name = `${parentDir}\\${f.name}`;
            fs.mkdir(f.name, (err) => {
                if (f.files) {
                    init(f.files, f.name);
                }
            });
        } else {
            f = `${parentDir}\\${f}`;
            fs.writeFile(f);
        }
    });
};
init(projectData);
