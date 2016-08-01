object
  = kv:keyvalue _ gs:(_ separator _ keyvalue)* _ separator? _ {
    return [kv].concat(gs.map(g => g[3]))
  }
  / '{' _ o:object _ '}' { return o }

keyvalue
  = k:key _ equaler _ v:value { return [k, v] }
  / k:key _ equaler _ a:array { return [k, a] }

separator
  = ';'
  / ','
  / '|'

equaler
  = ':'
  / '='

key = word
value = word
array = '[' _ w:word? _ ow:(',' _ word _)* (separator _)? ']' {
  return [w].concat(ow.map(o => o[2]))
}

word
  = l:[a-z0-9.\u0080-\u00FF -]i+ {
    let word = l.join('').trim()
    let num = /[0-9.]+/.exec(word)
    if (num && num[0].length == word.length) {
      let dotcount = word.split('.').length
      if (dotcount == 1) {
        return parseInt(word)
      } else if (dotcount == 2) {
        return parseFloat(word)
      }
    }

    if (word == 'true') return true
    if (word == 'false') return false
    if (word == 'null') return null

    return word
  }
  / '"' l:[^"]* '"' { return l.join('') }
  / "'" l:[^']* "'" { return l.join('') }

_ = ' '*
