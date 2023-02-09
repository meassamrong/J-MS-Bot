const stringMessage = "cambodia is greet country to live and growing up poeple with fully respect";
const arrayMessage = stringMessage.split(" ");
const finalMessage = [];
for(let i = 0; i < arrayMessage.length; i++) {
const randomNum = Math.floor(Math.random() * 4)
    setTimeout(()=>{
        finalMessage.push(arrayMessage[i])
        if(i < i + randomNum){
            finalMessage.push(arrayMessage[i = randomNum])
        }  
            console.log(`is array ${i} / ${finalMessage.join(' ').toString(' ')}`)
    }, i * 100)

    // console.log(finalMessage.join(' ').toString(' '))
    // setTimeout(() => {
    //     if (randomNum < i) {
    //         
    //     } else {
    //         return false;
    //     }        
    //     console.log(finalMessage.join(' ').toString(' '))
    // }, i * 100)

}

