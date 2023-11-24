// JavaScript source code

document.getElementById("id1").innerHTML = "From Functions";  // no effect
alert("Hello");                                               // no effect

function myF1() {
    document.getElementById("id1").innerHTML ='"5"-1 = ' + ("5" - 1);
}

function myF2() {
    document.getElementById("id1").innerHTML ='"5"+1 = ' + ( "5" + 1 );
}

function myF3() {
    document.getElementById("id1").innerHTML ='"5"==5 is ' + ("5" == 5);
}

function myF4() {
    document.getElementById("id1").innerHTML ='"5"===5 is ' + ("5" === 5);
}

function myF5() {
    document.getElementById("id1").innerHTML = 'false==0 is ' + (false == 0);
}

function myF6() {
    document.getElementById("id1").innerHTML = 'false===0 is ' + (false === 0);
}

function myF7() {
    document.getElementById("id1").innerHTML = 'NaN==NaN is ' + (NaN == NaN);
}

function myF8() {
    document.getElementById("id1").innerHTML = 'NaN===NaN is ' + (NaN === NaN);
}

function myF9() {
    document.getElementById("id1").innerHTML = 'typeof NaN is ' + (typeof NaN);
}

function myF10() {
    document.getElementById("id1").innerHTML = 'isNaN(NaN) is ' + (isNaN(NaN));
}