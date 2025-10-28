#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const fileName = process.argv[2]?.trim();
const cwd = process.argv[3] ? path.resolve(process.cwd(), process.argv[3]?.trim()) : process.cwd();

if (!fileName) {
    console.error('Please provide a file name as an argument.\nUsage: node treegen.js <filename>');
    process.exit(1);
}

const filePath = path.resolve(process.cwd(), fileName);

if (!fs.existsSync(filePath)) {
    console.error(`"${filePath}" does not exist.`);
    process.exit(1);
}

if(cwd && fs.existsSync(cwd) && fs.lstatSync(cwd).isDirectory()) {
    process.chdir(cwd);
}

const fileContent = fs.readFileSync(filePath, 'utf-8');

function parseDirectoryStructure(content) {
    const paths = [];
    const stack = [];
    const lines = content.split('\n')
    .map(l => l.replace(/[│├└─┬]/g, '').replace(/\s+$/, ''))
    .filter(Boolean);
    let prevDepth = 0;
    
    lines.forEach(line => {
        const depth = line.search(/[^\s]/);
        const name = line.trim();


        if (depth === prevDepth) {
            stack.pop();
        } else if (depth < prevDepth) {
            stack.pop();
            stack.pop();
        }

        stack.push(name);

        const _path = {path: stack.join('/').replace(/\/+/g, '/'), isFolder: name.endsWith('/') || (!name.includes('.') && !path.extname(name))};
        paths.push(_path);

        prevDepth = depth;
    })

    return paths;
}

const directoryStructure = parseDirectoryStructure(fileContent);

if (directoryStructure.length) {
    directoryStructure.forEach(({ path: currentPath, isFolder }) => {
        const _path = path.join(process.cwd(), currentPath);
        if (isFolder) {
            if (!fs.existsSync(_path)) {
                fs.mkdirSync(_path);
            }
        } else {
            if (!fs.existsSync(_path)) {
                fs.writeFileSync(_path, '');
            }
        }
    });
}
