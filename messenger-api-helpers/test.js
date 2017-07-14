const addStrings = (a,b,c,...d) => {
  console.log(c,b,a,...d);
}

const array = ['a', 'b', 'c']



const add = (a,b,c,d,...e) => {
  var array = [a,b,c,d,...e]
  return console.log(array)
}


add(1,2,3,4,1,2,3,4)