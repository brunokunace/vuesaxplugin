const fs = require('fs')

module.exports = (path, oldText, newText) => {
    if(!fs.existsSync(path)) {
        return false;
    }
    let content = fs.readFileSync(path, {encoding: 'utf8'})
    content.replace(oldText, newText)
    fs.writeFileSync(path, content, { encoding: 'utf8'})
}
