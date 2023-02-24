#!/usr/bin/env node
'use strict';


const prompts   = require('prompts');
const path      = require('path');
const os        = require('os');
const fs        = require('fs-extra');
const ncp       = require('ncp');

function main() {
  let questions = [
    {
      type: 'text',
      name: 'name',
      message: 'Package name',
      initial: 'ExampleApi',
      validate: value => value.match(/^[a-zA-Z][a-zA-Z0-9_]{2,}/) ? true :
          `Must contains at least 3 letters or numbers or underscore that starts with a lowercase letter!`
    },
    {
      type: 'text',
      name: 'version',
      message: 'Version',
      initial: '0.0.1',
    },
    {
      type: 'text',
      name: 'author',
      message: 'Author',
    },
    {
      type: 'text',
      name: 'license',
      message: 'License',
      initial: 'ISC',
    },
    {
      type: 'text',
      name: 'package',
      message: 'Package of the API',
      initial: 'com.example.api',
      validate: value => value.match(/^[a-z][a-z0-9\.]+[a-z0-9]$/) ? true :
          `Must be dot separated letters or numbers!`
    },
  ];

  (async () => {
    const pkg = await prompts(questions)
    createApp(pkg)
  })()
}

function createApp(pkg) {
  const apiPkg = pkg.package
  delete pkg.package

  pkg.scripts = {
    "build"        : "tsc",
    "run"          : "node build/index.js",
    "web-prepare"  : "ncp ./node_modules/@wuapi/web/dist ./dist && node build/index.js -o dist -r",
    "web-serv"     : "http-server ./dist",
  }
  pkg.devDependencies = {
    "typescript"        : "^4.9.5",
    "@types/node"       : "^18.14.0",
    "@wuapi/processor"  : "^1.0.3",
    "@wuapi/web"        : "^0.0.1",
    "http-server"       : "^14.1.1",
    "ncp"               : "^2.0.0",
  }

  const root = path.resolve(pkg.name)
  
  fs.ensureDirSync(root);
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(pkg, null, 2) + os.EOL
  )

  ncp(path.join('template', 'tsconfig.json'), path.join(root, 'tsconfig.json'))
  ncp(path.join('template', 'src'), path.join(root, 'src'), function(){
    rewriteFile(
      path.join('template', 'src', 'project.ts'), 
      path.join(root, 'src', 'project.ts'), 
      {
        "{{project_name}}"     : pkg.name,
        "{{project_version}}"  : "0.0.1",
        "{{project_package}}"  : apiPkg,
      }
    )
  })
}

function rewriteFile(src, dst, map){
  let content = fs.readFileSync(src).toString()
  for(var key in map){
    content = content.replace(key, map[key])
  }
  fs.writeFileSync(dst, content) 
}


main()

