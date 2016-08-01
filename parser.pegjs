object
  = kv:keyvalue _ gs:(_ separator _ keyvalue)* _ separator? _ {
    var r = gs.map(g => g[3])
    r.unshift(kv)
    return r
  }
  / '{' _ o:object _ '}' { return o }

keyvalue
  = k:key _ equaler _ v:value { return [k, v] }

separator
  = ';'
  / ','
  / '.'
  / '|'

equaler
  = ':'
  / '='

key = word
value = word

word
  = l:[a-z0-9.\u0080-\u00FF ]i+ {
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
