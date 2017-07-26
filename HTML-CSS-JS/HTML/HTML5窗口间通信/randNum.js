function randNum(iAll, iWant) {
    var arr = [];
    var newArr = [];
    for (let i = 0; i < iAll; i++) {
        arr.push(i);
    }
    for (let i = 0; i < iWant; i++) {
        let random = Math.floor(Math.random() * arr.length);
        newArr.push(arr.splice(random, 1));
    }
    return newArr;
}
