const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process')

const dirProject = path.resolve(__dirname, '../');

const dirDist = path.resolve(dirProject, 'dist');
const dirPackage = path.resolve(dirProject, './publish/package');

if (!fs.existsSync(dirPackage)) {
    console.log(`mkdir ${dirPackage}`)
    fs.mkdirSync(dirPackage);
}

let files = fs.readdirSync(dirDist).map((filename) => path.join(dirDist, filename));
files = files.concat(['package.json', 'README.md'].map((filename) => path.join(dirProject, filename)));

console.log('start copy file');
files.forEach((src) => {
    const filename = path.basename(src);
    const dest = path.join(dirPackage, filename);
    fs.copyFileSync(src, dest);
});

console.log('start run npm publish');
execSync('npm publish', {
    cwd: dirPackage
});