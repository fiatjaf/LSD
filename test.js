var tape = require('tape')
var parser = require('./')

var cases = [
  [
    `name: Al, uva: "passa", 'banana'='maçã'`,
    [['name', 'Al'], ['uva', 'passa'], ['banana', 'maçã']]
  ],
  [
    `{val-ue=23.1; 2: átila o huno}`,
    [['val-ue', 23.1], [2, 'átila o huno']]
  ],
  [
    `{'bánana'=23.12a    ; 23=1  ;}`,
    [['bánana', '23.12a'], [23, 1]]
  ],
  [
    `g=true,f:false,l:null;     null    :   false   ,true:23,false:'true' ;`,
    [['g', true], ['f', false], ['l', null], [null, false], [true, 23], [false, 'true']]
  ],
  [
    `{"fruits"=['banana', 1235.2] ; other fruits:   [ 77,'crazy',"y!@#@#%¨&*" ,];}`,
    [['fruits', ['banana', 1235.2]], ['other fruits', [77, 'crazy', 'y!@#@#%¨&*']]]
  ],
  [
    `{"hello": "I am a normal JSON.", "can you parse me?": ["not", "always", 98, true]}`,
    [['hello', 'I am a normal JSON.'], ['can you parse me?', ['not', 'always', 98, true]]]
  ]
]

tape('basic', function (t) {
  t.plan(cases.length)
  cases.forEach(c => {
    var str = c[0]
    var expected = c[1]
    console.log(str)
    t.deepEquals(parser.parse(str), expected)
  })
})
