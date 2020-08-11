const { compileSassAndSave } = require('compile-sass');
const cliProgress   = require('cli-progress');
const fs            = require('fs');
const sfdxRoot      = './force-app';

module.exports.run = function run() {
    if (fs.existsSync(sfdxRoot)) {

        if (fs.existsSync(sfdxRoot + '/main/default/aura')) {

            let componentFolders = fs.readdirSync(sfdxRoot + '/main/default/aura');
            if (componentFolders.length > 0) {

                let components = [];
                componentFolders.forEach(component => {
                    components.push({
                        name: component,
                        scss: fs.existsSync(sfdxRoot + '/main/default/aura/' + component + '/' + component + '.scss') ? true : false
                    });
                });
                components = components
                    .filter(component => component.scss === true)
                    .map(function(component) {
                        return {
                            scss: sfdxRoot + '/main/default/aura/' + component.name + '/' + component.name + '.scss',
                            output: sfdxRoot + '/main/default/aura/' + component.name
                        }
                    });
                console.log('Compiling SCSS to CSS')
                compileComponents = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
                compileComponents.start(components.length, 0);
                components.forEach((component, index) => {
                    compileSassAndSave(component.scss, component.output).catch((error) => {
                        console.error(error);
                    });
                    compileComponents.increment(1);
                });
                compileComponents.stop();

            } else {
                console.error('There is no Aura Components');
            }

        } else {
            console.error('There is no Front-End');
        }
        
    } else {
        console.error('This is not an SFDX/Salesforce Project');
    }
}