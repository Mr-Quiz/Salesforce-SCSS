#!/usr/bin/env node
const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const compileSolution = require('./commands/compileSolution');
const { clear } = require('console');

const pkg = require(path.join(__dirname, '../package.json'));

program
    .version(pkg.version)
    .option('-p, --project', 'compile whole project')
    .description('Salesforce SCSS Compiler');

program.parse(process.argv);

if(program.project) {
    clear();
    compileSolution.run();
}