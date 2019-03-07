/*
* @String
*/
export function isString(val) {
  return typeof val === 'string' && !isNumber(val) ? true : false
}
/*
* @Number
*/
export function isNumber(val) {
  return typeof (val - 0) === 'number' && !isNaN(val) ? true : false
}

/*
* @Array
*/

export function isArray (val) {
  if (Array && Array.isArray)
    return Array.isArray(val)
  else
    return toString.call(val) === '[object Array]' ? true : false
}

/*
* @Object 
*/

export function isObject (val) {
  return toString.call(val) === '[object Object]' ? true : false
}