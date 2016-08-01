var tape = require('tape')
var parser = require('./')

var cases = [
  [
    `name: Al, uva: "passa", 'banana'='maçã'`,
    [['name', 'Al'], ['uva', 'passa'], ['banana', 'maçã']]
  ],
  [
    `{value=23.1; 2: átila o huno}`,
    [['value', 23.1], [2, 'átila o huno']]
  ],
  [
    `{'bánana'=23.12a    ; 23=1  ;}`,
    [['bánana', '23.12a'], [23, 1]]
  ],
  [
    `g=true,f:false,l:null;     null    :   false   ,true:23,false:'true' ;`,
    [['g', true], ['f', false], ['l', null], [null, false], [true, 23], [false, 'true']]
  ]
]

tape('basic', function (t) {
  t.plan(cases.length)
  cases.forEach((c, i) => {
    var str = c[0]
    var expected = c[1]
    console.log(i, str)
    t.deepEquals(parser.parse(str), expected)
  })
})
