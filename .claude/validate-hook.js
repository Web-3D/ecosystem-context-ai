// validate-hook.js — PostToolUse hook, engine-aware routing
const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const ECOSYSTEM_ROOT = path.resolve(__dirname, '..') // c:\Web-3D

let raw = ''
process.stdin.on('data', d => (raw += d))
process.stdin.on('end', () => {
  let json
  try { json = JSON.parse(raw.replace(/^﻿/, '')) } catch { process.exit(0) }

  const fp = json.tool_input?.file_path
  if (!fp) process.exit(0)

  const norm = fp.replace(/\//g, path.sep)

  const match =
    norm.match(/^(.*?[/\\]assets[/\\][^/\\]+[/\\][^/\\]+)/) ||
    norm.match(/^(.*?[/\\]threejs-modules[/\\][^/\\]+[/\\][^/\\]+)/) ||
    norm.match(/^(.*?[/\\]babylon-modules[/\\][^/\\]+[/\\][^/\\]+)/)

  if (!match) process.exit(0)

  const target = match[1]

  // Detect engine từ file path
  const sep = path.sep
  let engineRoot = null
  if (norm.includes(`${sep}THREEJS${sep}`)) {
    engineRoot = path.join(ECOSYSTEM_ROOT, 'THREEJS')
  } else if (norm.includes(`${sep}BABYLON${sep}`)) {
    engineRoot = path.join(ECOSYSTEM_ROOT, 'BABYLON')
  } else {
    // assets/ ở ecosystem root — dùng engine đầu tiên có validate.js
    for (const engine of ['THREEJS', 'BABYLON']) {
      const candidate = path.join(ECOSYSTEM_ROOT, engine)
      if (fs.existsSync(path.join(candidate, 'validate.js'))) {
        engineRoot = candidate
        break
      }
    }
  }

  if (!engineRoot) process.exit(0)

  try {
    execSync(`node validate.js "${target}"`, { cwd: engineRoot, stdio: 'inherit' })
  } catch {
    // validate.js exit 1 = có lỗi, đã in ra rồi
  }
})
