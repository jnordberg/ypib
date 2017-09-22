#!/usr/bin/env node

// exit if we are launched by our ourselves
if (process.env['in-postinstall']) {
    process.exit()
}

const artifact = process.argv[2]
if (!artifact) {
    console.error('Missing build artifact')
    process.exit(1)
}

// exit early if we don't need to build
const fs = require('fs')
if (fs.existsSync('lib')) {
    process.exit()
}

// exit early if we are top level
const cwd = process.cwd()
const path = require('path')
const parentDirs = cwd.split(path.sep)
if (!parentDirs.includes('node_modules')) {
    process.exit()
}

const {execSync} = require('child_process')
const pkg = require(path.join(cwd, 'package.json'))
const env = JSON.parse(JSON.stringify(process.env))
env['in-postinstall'] = 'you-bet'

// install devDependencies
execSync('yarn install --non-interactive --pure-lockfile', {env})

// run install
execSync(pkg.scripts.build, {env})

// prune devDependencies
execSync('yarn install --non-interactive --pure-lockfile --production', {env})
