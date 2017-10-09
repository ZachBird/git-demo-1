#!/usr/bin/env node
const fs = require('fs')
let dirName = process.argv[2]
if(dirName){
  if(fs.existsSync("./" + dirName)){
    console.log("目录已经存在")
    process.exit(1)
  }else{
  fs.mkdirSync("./" + dirName)
  process.chdir("./" + dirName)
  fs.mkdirSync("css")
  fs.mkdirSync("js")

  fs.writeFileSync("./index.html","<!DOCTYPE>\n<title>Hello</title>\n<h1>Hi</h1>")
  fs.writeFileSync("./css/style.css","h1 {color: red;}")
  fs.writeFileSync("js/main.js",'var string = "Hello World"\nalert(string)')

  console.log("Successful")
  process.exit(0)
}
}else{
  console.log("请在demo后输入目录名")
  process.exit(1)
}
