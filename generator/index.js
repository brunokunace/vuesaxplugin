module.exports = (api, options) => {
    api.extendPackage({
        dependencies: {
            'vuesax': '^3.8.12'
        }
    })
    // api.render('./template')
    // api.injectImports(api.entryFile, [
    //     `import './plugins/vuesax.js`,
    //     `import 'vuesax/dist/vuesax.css'`,
    //     `import 'material-icons/iconfont/material-icons.css'`
    // ])
    let rxLines = `\nimport VueSax from 'vuesax';\n\nVue.use(VueSax);`;
    api.onCreateComplete(() => {
        // inject to main.js
        const fs = require('fs');
        const ext = api.hasPlugin('typescript') ? 'ts' : 'js';
        const mainPath = api.resolve(`./src/main.${ext}`);
        // get content
        let contentMain = fs.readFileSync(mainPath, { encoding: 'utf-8' });
        const lines = contentMain.split(/\r?\n/g).reverse();
        // inject import
        const lastImportIndex = lines.findIndex(line => line.match(/^import/));
        lines[lastImportIndex] += rxLines;
        // modify app
        contentMain = lines.reverse().join('\n');
        fs.writeFileSync(mainPath, contentMain, { encoding: 'utf-8' });
      });
}
