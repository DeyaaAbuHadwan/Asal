document.getElementById("btn0").addEventListener("click",addNumber);
document.getElementById("btn1").addEventListener("click",addNumber);
document.getElementById("btn2").addEventListener("click",addNumber);
document.getElementById("btn3").addEventListener("click",addNumber);
document.getElementById("btn4").addEventListener("click",addNumber);
document.getElementById("btn5").addEventListener("click",addNumber);
document.getElementById("btn6").addEventListener("click",addNumber);
document.getElementById("btn7").addEventListener("click",addNumber);
document.getElementById("btn8").addEventListener("click",addNumber);
document.getElementById("btn9").addEventListener("click",addNumber);
document.getElementById("btn.").addEventListener("click",addNumber);
document.getElementById("btn+").addEventListener("click",addNumber);
document.getElementById("btn-").addEventListener("click",addNumber);
document.getElementById("equal").addEventListener("click",postFix);
document.getElementById("btn/").addEventListener("click",addNumber);
document.getElementById("btn*").addEventListener("click",addNumber);
document.getElementById("reset").addEventListener("click",reset);

var number=0 ,flag = 0;
var arrNumber = [] ;
var arrOperation = [];
var   flag =0;
// add element to text field 
function addNumber(event){ 
    let str = event.target.id;
     number = str.charAt(3);
    let text =document.getElementById("txt");
    text.value=text.value+number;   
     
}
// add reset all data 
function reset(){
    let text =document.getElementById("txt");
    text.value="";   
    number = 0; 
    arrNumber=[];
    arrOperation=[];
}
// duplicate two numbers
function duplicate(num1,num2){
    let x= num1.valueOf() * num2.valueOf();
    return x.toString() ;
}
//division two numbers 
function division(num1,num2){
    let  x = num1.valueOf() / num2.valueOf() ;
    return x.toString();
}
//get next number from screen 
function getNumber(i,number){
    let n = ""
    for (let x=i ; x<number.length ; x++ ){
        if(number.charAt(x)=="*"||number.charAt(x)=="-"||number.charAt(x)=="+"||number.charAt(x)=="/"){
            flag = x ;

            return n;
        }
        n=n+number.charAt(x);
    }
    return n;
}
    // convert from infix to postfix
    function postFix(){
        let text =document.getElementById("txt");
        number=text.value;
        let num =""  ,num1,num2;
        let i ;
        arrNumber.push(getNumber(0,number));
        if(flag==number.length-1){
            console.log("HELOO"); 
        }else{
             for ( i=flag; i<=number.length-1 ; i++ ){
                if(number.charAt(i)=="*"||number.charAt(i)=="-"||number.charAt(i)=="+"||number.charAt(i)=="/"){
                    if(arrOperation.length==0)
                        arrOperation.push(number.charAt(i))
                    else{
                        if(number.charAt(i)=="*" || number.charAt(i)=="/"){
                            if(arrOperation[arrOperation.length-1]=="*" ||arrOperation[arrOperation.length-1]=="/" ){
                                
                            let x = arrOperation.pop();
                             arrNumber.push(x);
                            arrOperation.push(number.charAt(i));

                            }else{
                                arrOperation.push(number.charAt(i));
                            }
                        } else if(number.charAt(i)=="-" || number.charAt(i)=="+"){
                            let x = arrOperation.pop(); 
                            arrNumber.push(x);
                            arrOperation.push(number.charAt(i));
                        }
                    }
                }else{
                    arrNumber.push(getNumber(i,number));
                    flag=i;
                }
             }
             while(arrOperation.length){
                let x = arrOperation.pop(); 
                arrNumber.push(x);
             }
        
        console.log(arrNumber);
        number = 0; 
 
        calPostfix();
            }
    }

    // calulate numbers from number array  
    function calPostfix(){
        let i = 0 ,num1 , num2,total=document.getElementById("txt").value;
        while(arrNumber.length!=0){
            if(arrNumber[i+1]=="*" ||arrNumber[i+1]=="/" ||arrNumber[i+1]=="-" ||arrNumber[i+1]=="+" ||
            arrNumber[i]=="*" ||arrNumber[i]=="/" ||arrNumber[i]=="-" ||arrNumber[i]=="+" ){// if array have two operators Consecutive
                i++;
            }
             else if(arrNumber[i+2]=="*" ||arrNumber[i+2]=="/" ||arrNumber[i+2]=="-" ||arrNumber[i+2]=="+" ){//if array have two number and one operator
                num1 = arrNumber[i];
                num2 = arrNumber[i+1];
                total = cal(num1,num2,arrNumber[i+2]);
                
                arrNumber[i]=total;                
                arrNumber.splice(i+1,2);
                console.log(arrNumber);
                
                i+=2;
                
             }
             else {
               
                 i++;
                
             }
             if(arrNumber.length<=2)
             
             break;
             document.getElementById("txt").value=total;
             if(i>arrNumber.length-1)
            i=0
        }
        arrNumber=[];
        arrOperation=[];
        document.getElementById("txt").value=total;
    }

    //division , duplicate , sub and plus number 
    function cal(num1,num2,op){
        let y ;
        if(op == "*"){
            return duplicate(num1,num2);
        }
        else  if(op == "/"){
            return division(num1,num2);
        }
        else if(op == "-"){
            y = num1.valueOf() - num2.valueOf();            
            return y.toString();
        }
        else if(op == "+"){
            num1 = parseFloat(num1);
            num2 = parseFloat(num2);
            y = num1+ num2;
            return y.toString();
        }

    }