import {
  isNumber,
  isString
} from './types'
/*
* @@依赖^webpack ->> ^require()|^import()
* @path{String} 导入的文件路径
* @status[Boolean, Number] 是否读取子文件夹下的文件, default: false, 0: false, 1: true, 2: true & 读取子文件index.*
* @match{RegExp} 匹配规则
* @notMatch{RegExp} 匹配规则
* @@匹配规则 ->> 仅匹配以点结尾的文件
*/
export function autoRquire(args) {
  let { path, status, match, notMatch } = args
  let justMatchIndex = false
  const context = require.context(path, status, match)
  const allPaths = context.keys()
  let filePaths = []
  
  if (!path) return console.error(`The import path cannot empty!`)
  
 
 
  if (status === null || status === undefined) status = false
  if (isNumber(status)) {
    switch (status) {
      case 0:
        status = false
        break;
      case 1:
        status = true
        break; 
      case 2:
        status = true
        justMatchIndex = true
        break;
    }
  }
  if (!match) match = /\.js$/
  if (isString(match) && !match.match(/^\./)) match = new RegExp(`.${match}`)
  if (isString(notMatch) && !notMatch.match(/^\./)) notMatch = new RegExp(`.${notMatch}`)

  const NotMatch = (file) => {
    return isString(notMatch) && file.match(/\w+.\w+$/)[0] === notMatch
  }

  if (justMatchIndex) { // 过滤相同目录下含有index.*的文件
    if (allPaths.length <= 1000) {
      allPaths.map(v => filePaths.push(v))
    } else {
      allPaths.forEach(v => filePaths = filePaths.concat(v))
      console.warn(`Import ${allPaths.length} files!`)
    }
    const hasIndexs = filePaths.filter(v => v.match(/\/index.\w+$/))
    hasIndexs.forEach(v => {
      let reg = '^' + v.replace(/\/index.\w+$/, '').replace(/\//g, '\\/') + '\\/\\w+.\\w+$'
      reg = new RegExp(reg)
      filePaths.filter(v => !!v.match(reg))
    })

  } else {
    filePaths = allPaths
  }

  /*
  * @import(file)
  */
  filePaths.forEach(file => NotMatch(file) && context(file))

  return {
    allPaths: allPaths, // 所有文件（含路径）
    paths: filePaths,  // 导入的文件（含路径）
    getFiles: () => filePaths.filter(v => !NotMatch(v)).map(v => v.match(/\w+.\w+$/)[0]), // 仅获取文件名
    getComponents: () => filePaths.filter(v => !NotMatch(v)).map(v => context(v).default ? context(v).default : context(v)) // 文件实体
  }
}