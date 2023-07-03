var boxList = document.querySelectorAll(".box");

function insertImage() {
     for(i = 0 ; i<boxList.length ;i++){
         var text = boxList[i].innerText;
           
           text = text.trimEnd();
    
         if(text.length !== 0){
            if(text == "Wpawn" || text == "Bpawn"){
                 boxList[i].innerHTML = `${text} <img class = 'allimg allpawn' src ="./images/${text}.png" alt="">`
                 boxList[i].style.cursor = 'pointer'
             }
            else{
                boxList[i].innerHTML = `${text} <img class ='allimg' src ="./images/${text}.png" alt"">`
                boxList[i].style.cursor = 'pointer'
             }
         }
     }
       
    }
insertImage()

function coloring() {
    const color = boxList;

    color.forEach(color => {

        getId = color.id
        arr = Array.from(getId)
        arr.shift()
        aside = eval(arr.pop())
        aup = eval(arr.shift())
        a = aside + aup

        if (a % 2 == 0) {
            color.style.backgroundColor = 'rgb(240, 201, 150)'
        }
        if (a % 2 !== 0) {
            color.style.backgroundColor = 'rgb(100, 75, 43)'
        }

    })
}


turn = 1;

boxList.forEach( item =>{
    item.addEventListener('click' , function(){
        //to delete opposite
        delete_element(item);
        //changing the turns
        if(turn%2 !== 0){
            document.getElementById('tog').innerText = "White's Turn";
            whosturn('W' , item);
        }
        else{
            document.getElementById('tog').innerText = "Black's Turn";
            whosturn('B' , item);
        }
        //prevent from selecting same color element
        reddish();
        //checking for winning condition
        winning();
    })
})

//moving the elements
move_the_element();

//To block selecting multiple elements at a time
z = 0
boxList.forEach(ee => {
    ee.addEventListener('click', function () {
        z = z + 1
        if (z % 2 == 0 && ee.style.backgroundColor !== 'green') {
            coloring()
        }
    })
})


 //for available paths
function delete_element(item){
    if (item.style.backgroundColor == 'green' && item.innerText.length == 0) {
        turn = turn + 1;
    }

    else if (item.style.backgroundColor == 'green' && item.innerText.length !== 0) {

        boxList.forEach(i => {
            if (i.style.backgroundColor == 'pink') {
                pinkId = i.id
                pinkText = i.innerText.trimEnd();

                document.getElementById(pinkId).innerText = ''
                item.innerText = pinkText
                coloring()
                insertImage()
                turn = turn + 1
                
            }
        })
    }
}

 function whosturn(code , item){
    var getid = item.id;
    var arr = Array.from(getid);
    arr.shift();
    var side = eval(arr.pop());
    arr.push(0);
    var up = eval(arr.join(""))
    var box = up+side;   
        
    //pawns
    if(item.textContent == code+"pawn "){
        item.style.backgroundColor = "pink";
        pawns(box , up , side);
    }
    //king
    if(item.textContent == code+"king "){
        kings(box , up , side);
        item.style.backgroundColor = "pink"; 
    }
    
    // Queen
    if(item.textContent == code+"queen "){
        queen(box , up , side);
        item.style.backgroundColor = "pink"; 
    }
    //knight
    if(item.textContent == code+"knight "){
        knight(box , up , side);
        item.style.backgroundColor = "pink"; 
    }
    //rook
    if(item.textContent == code+"rook "){
        rook(box , up , side);
        item.style.backgroundColor = "pink";
    }
    //bishop
    if(item.textContent == code+"bishop "){
        bishop(box , up , side);
        item.style.backgroundColor = "pink";
    }
    
}

function pawns(box , up , side){
    if( turn%2 !== 0 && up<800){
                
            
        if (document.getElementById(`b${box + 100}`).innerText.length == 0) {
            document.getElementById(`b${box + 100}`).style.backgroundColor = 'green'
        }

        if (side < 8 && document.getElementById(`b${box + 100 + 1}`).innerText.length !== 0) {
            document.getElementById(`b${box + 100 + 1}`).style.backgroundColor = 'green'
        }

        if (side > 1 && document.getElementById(`b${box + 100 - 1}`).innerText.length !== 0) {
            document.getElementById(`b${box + 100 - 1}`).style.backgroundColor = 'green'

        }
    }
    if (turn % 2 == 0 && up > 100) {

        if (document.getElementById(`b${box - 100}`).innerText.length == 0) {
            document.getElementById(`b${box - 100}`).style.backgroundColor = 'green'
        }
        if (side < 8 && document.getElementById(`b${box - 100 + 1}`).innerText.length !== 0) {
            document.getElementById(`b${box - 100 + 1}`).style.backgroundColor = 'green'
        }
        if (side > 1 && document.getElementById(`b${box - 100 - 1}`).innerText.length !== 0) {
            document.getElementById(`b${box - 100 - 1}`).style.backgroundColor = 'green'

        }
    }
}

function kings(box , up , side){
    if(side < 8 ){
        document.getElementById(`b${box + 1}`).style.backgroundColor = 'green'
    }
    if(side >1){
        document.getElementById(`b${box - 1}`).style.backgroundColor = 'green'
    }
    if(up < 800){
        document.getElementById(`b${box + 100}`).style.backgroundColor = 'green'
    }
    if(up>100){
        document.getElementById(`b${box - 100}`).style.backgroundColor = 'green'
    }
    if(up >100 &&  side >1){
        document.getElementById(`b${box - 100 -1}`).style.backgroundColor = 'green'
    }
    if(up >100 && side <8){
        document.getElementById(`b${box -100 + 1}`).style.backgroundColor = 'green'
    } 
    if(up<800 && side >1){
        document.getElementById(`b${box + 100 -1}`).style.backgroundColor = 'green'
    }
    if(up <800 && side<8){
        document.getElementById(`b${box + 100+1}`).style.backgroundColor = 'green'
    }
}

function rook(box , up , side){
    for (let i = 1; i < 9; i++) {

        if ((box + i * 100) < 900 && document.getElementById(`b${box + i * 100}`).innerText == 0) {
            document.getElementById(`b${box + i * 100}`).style.backgroundColor = 'green'
        }
        else if ((box + i * 100) < 900 && document.getElementById(`b${box + i * 100}`).innerText !== 0) {
            document.getElementById(`b${box + i * 100}`).style.backgroundColor = 'green'
            break
        }
    }
    for (let i = 1; i < 9; i++) {

        if ((box - i * 100) > 100 && document.getElementById(`b${box - i * 100}`).innerText == 0) {
            document.getElementById(`b${box - i * 100}`).style.backgroundColor = 'green'
        }
        else if ((box - i * 100) > 100 && document.getElementById(`b${box - i * 100}`).innerText !== 0) {
            document.getElementById(`b${box - i * 100}`).style.backgroundColor = 'green'
            break
        }
    }
    for (let i = 1; i < 9; i++) {

        if ((box + i) < (up + 9) && document.getElementById(`b${box + i}`).innerText == 0) {
            document.getElementById(`b${box + i}`).style.backgroundColor = 'green'
        }
        else if ((box + i) < (up + 9) && document.getElementById(`b${box + i}`).innerText !== 0) {
            document.getElementById(`b${box + i}`).style.backgroundColor = 'green'
            break
        }
    }

    for (let i = 1; i < 9; i++) {

        if ((box - i) > (up) && document.getElementById(`b${box - i}`).innerText == 0) {
            document.getElementById(`b${box - i}`).style.backgroundColor = 'green'
        }
        else if ((box - i) > (up) && document.getElementById(`b${box - i}`).innerText !== 0) {
            document.getElementById(`b${box - i}`).style.backgroundColor = 'green'
            break
        }
    }
}

function queen(box , up , side){
    
    for (let i = 1; i < 9; i++) {
        if ((box + i * 100) < 900 && document.getElementById(`b${box + i * 100}`).innerText == 0) {
            document.getElementById(`b${box + i * 100}`).style.backgroundColor = 'green'
        }
        else if ((box + i * 100) < 900 && document.getElementById(`b${box + i * 100}`).innerText !== 0) {
            document.getElementById(`b${box + i * 100}`).style.backgroundColor = 'green'
            break
        }
    }
    for (let i = 1; i < 9; i++) {
        if ((box - i * 100) > 100 && document.getElementById(`b${box - i * 100}`).innerText == 0) {
            document.getElementById(`b${box - i * 100}`).style.backgroundColor = 'green'
        }
        else if ((box - i * 100) > 100 && document.getElementById(`b${box - i * 100}`).innerText !== 0) {
            document.getElementById(`b${box - i * 100}`).style.backgroundColor = 'green'
            break
        }
    }
    for (let i = 1; i < 9; i++) {
        if ((box + i) < (up + 9) && document.getElementById(`b${box + i}`).innerText == 0) {
            document.getElementById(`b${box + i}`).style.backgroundColor = 'green'
        }
        else if ((box + i) < (up + 9) && document.getElementById(`b${box + i}`).innerText !== 0) {
            document.getElementById(`b${box + i}`).style.backgroundColor = 'green'
            break
        }
    }
    for (let i = 1; i < 9; i++) {
        if ((box - i) > (up) && document.getElementById(`b${box - i}`).innerText == 0) {
            document.getElementById(`b${box - i}`).style.backgroundColor = 'green'
        }
        else if ((box - i) > (up) && document.getElementById(`b${box - i}`).innerText !== 0) {
            document.getElementById(`b${box - i}`).style.backgroundColor = 'green'
            break
        }
    }
    for (let i = 1; i < 9; i++) {
        if (i < (900 - up) / 100 && i < 9 - side && document.getElementById(`b${box + i * 100 + i}`).innerText.length == 0) {
            document.getElementById(`b${box + i * 100 + i}`).style.backgroundColor = 'green'
        }
        else if (i < (900 - up) / 100 && i < 9 - side && document.getElementById(`b${box + i * 100 + i}`).innerText.length !== 0) {
            document.getElementById(`b${box + i * 100 + i}`).style.backgroundColor = 'green'
            break
        }
    }
    for (let i = 1; i < 9; i++) {
        if (i < up / 100 && i < 9 - side && document.getElementById(`b${box - i * 100 + i}`).innerText.length == 0) {
            document.getElementById(`b${box - i * 100 + i}`).style.backgroundColor = 'green'
        }
        else if (i < up / 100 && i < 9 - side && document.getElementById(`b${box - i * 100 + i}`).innerText.length !== 0) {
            document.getElementById(`b${box - i * 100 + i}`).style.backgroundColor = 'green'
            break
        }
    }
    for (let i = 1; i < 9; i++) {
        if (i < (900 - up) / 100 && i < side && document.getElementById(`b${box + i * 100 - i}`).innerText.length == 0) {
            document.getElementById(`b${box + i * 100 - i}`).style.backgroundColor = 'green'
        }
        else if (i < (900 - up) / 100 && i < side && document.getElementById(`b${box + i * 100 - i}`).innerText.length !== 0) {
            document.getElementById(`b${box + i * 100 - i}`).style.backgroundColor = 'green'
            break
        }
    
    }
    for (let i = 1; i < 9; i++) {
        if (i < up / 100 && i < side && document.getElementById(`b${box - i * 100 - i}`).innerText.length == 0) {
            document.getElementById(`b${box - i * 100 - i}`).style.backgroundColor = 'green'
        }
        else if (i < up / 100 && i < side && document.getElementById(`b${box - i * 100 - i}`).innerText.length !== 0) {
            document.getElementById(`b${box - i * 100 - i}`).style.backgroundColor = 'green'
            break
        }
    }
}

function knight(box , up , side){
    if(side<7 && up<800){
        document.getElementById(`b${box + 100 + 2}`).style.backgroundColor = 'green'
    }
    if(side< 7 && up>200){
        document.getElementById(`b${box - 100 + 2}`).style.backgroundColor = 'green'
    }
    if(side<8 && up<700){
        document.getElementById(`b${box + 200 + 1}`).style.backgroundColor = 'green'
    }
    if (side > 1 && up < 700) {
        document.getElementById(`b${box + 200 - 1}`).style.backgroundColor = 'green'
    }
    if (side > 2 && up < 800) {
        document.getElementById(`b${box - 2 + 100}`).style.backgroundColor = 'green'
    }
    if (side > 2 && up > 100) {
        document.getElementById(`b${box - 2 - 100}`).style.backgroundColor = 'green'
    }
    if (side < 8 && up > 200) {
        document.getElementById(`b${box - 200 + 1}`).style.backgroundColor = 'green'
    }
    if (side > 1 && up > 200) {
        document.getElementById(`b${box - 200 - 1}`).style.backgroundColor = 'green'
    }
}

function bishop(box , up , side){
    for (let i = 1; i < 9; i++) {
        if (i < (900 - up) / 100 && i < 9 - side && document.getElementById(`b${box + i * 100 + i}`).innerText.length == 0) {
            document.getElementById(`b${box + i * 100 + i}`).style.backgroundColor = 'green'
        }
        else if (i < (900 - up) / 100 && i < 9 - side && document.getElementById(`b${box + i * 100 + i}`).innerText.length !== 0) {
            document.getElementById(`b${box + i * 100 + i}`).style.backgroundColor = 'green'
            break
        }
    }


    for (let i = 1; i < 9; i++) {
        if (i < up / 100 && i < 9 - side && document.getElementById(`b${box - i * 100 + i}`).innerText.length == 0) {
            document.getElementById(`b${box - i * 100 + i}`).style.backgroundColor = 'green'
        }
        else if (i < up / 100 && i < 9 - side && document.getElementById(`b${box - i * 100 + i}`).innerText.length !== 0) {
            document.getElementById(`b${box - i * 100 + i}`).style.backgroundColor = 'green'
            break
        }
    }


    for (let i = 1; i < 9; i++) {
        if (i < (900 - up) / 100 && i < side && document.getElementById(`b${box + i * 100 - i}`).innerText.length == 0) {
            document.getElementById(`b${box + i * 100 - i}`).style.backgroundColor = 'green'
        }
        else if (i < (900 - up) / 100 && i < side && document.getElementById(`b${box + i * 100 - i}`).innerText.length !== 0) {
            document.getElementById(`b${box + i * 100 - i}`).style.backgroundColor = 'green'
            break
        }

    }


    for (let i = 1; i < 9; i++) {
        if (i < up / 100 && i < side && document.getElementById(`b${box - i * 100 - i}`).innerText.length == 0) {
            document.getElementById(`b${box - i * 100 - i}`).style.backgroundColor = 'green'
        }
        else if (i < up / 100 && i < side && document.getElementById(`b${box - i * 100 - i}`).innerText.length !== 0) {
            document.getElementById(`b${box - i * 100 - i}`).style.backgroundColor = 'green'
            break
        }
    }
}
function winning(){
    var noOfKings = 0;
    boxList.forEach(items =>{
        if(items.textContent == "Wking " || items.textContent == "Bking "){
            noOfKings +=1;
        }
    })
    console.log(noOfKings);
    if(noOfKings == 1){
    
        if(turn%2 == 0){
            alert("White Wins!!");
            location.reload();
        }
        else{
            alert("Black's Win!!");
            location.reload();
        }
    }
}

function move_the_element(){
    boxList.forEach(place1 => {

        place1.addEventListener('click', function () {
    
            if (place1.style.backgroundColor == 'pink') {
    
                pinkId = place1.id
                pinkText = place1.innerText
    
                boxList.forEach(place2 => {
    
                    place2.addEventListener('click', function () {
                        if (place2.style.backgroundColor == 'green' && place2.innerText.length == 0) {
                            document.getElementById(pinkId).innerText = ''
                            place2.innerText = pinkText
                            coloring()
                            insertImage()
                        }
                    })
                })
            }
        })
    })
}

function reddish() {
    boxList.forEach(i1 => {
        if (i1.style.backgroundColor == 'pink') {

            boxList.forEach(i2 => {

                if (i2.style.backgroundColor == 'green' && i2.innerText.length !== 0) {


                    greenText = i2.innerText.trimEnd();

                    pinkText = i1.innerText.trimEnd();

                    pinkColor = ((Array.from(pinkText)).shift()).toString()
                    greenColor = ((Array.from(greenText)).shift()).toString()

                    getId = i2.id
                    arr = Array.from(getId)
                    arr.shift()
                    aside = eval(arr.pop())
                    aup = eval(arr.shift())
                    a = aside + aup
            
                    if (a % 2 == 0 && pinkColor === greenColor) {
                        i2.style.backgroundColor = 'rgb(240, 201, 150)'
                    }
                    if (a % 2 !== 0 && pinkColor === greenColor) {
                        i2.style.backgroundColor = 'rgb(100, 75, 43)'
                    }
                }
            })
        }
    })
}