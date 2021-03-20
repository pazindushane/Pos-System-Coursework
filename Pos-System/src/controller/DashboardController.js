var customer = document.getElementById("cust");
var order = document.getElementById("ord");
var Item = document.getElementById("itm");
var dashb = document.getElementById("ob1")
var customer1 = document.getElementById("nav1");
var order1 = document.getElementById("nav4");
var Item1 = document.getElementById("nav3");
var dashb1 = document.getElementById("nav")

customer.style.display='none';
order.style.display='none';
Item.style.display='none';
dashb.style.display='block'
customer1.style.display='none';
order1.style.display='none';
Item1.style.display='none';
dashb1.style.display='block'

var Btncustomer = document.getElementById("savecust");
Btncustomer.addEventListener('click',function (){
    dashb.style.display='none'
    order.style.display='none';
    Item.style.display='none';
    customer.style.display='block';
    customer1.style.display='block';
    order1.style.display='none';
    Item1.style.display='none';
    dashb1.style.display='none';
    generateCId();
    $("#CustomerName").focus();
});

var Btnorder = document.getElementById("makeord");
Btnorder.addEventListener('click',function (){
    dashb.style.display='none'
    customer.style.display='none';
    Item.style.display='none';
    order.style.display='block';
    customer1.style.display='none';
    order1.style.display='block';
    Item1.style.display='none';
    dashb1.style.display='none'
});

var Btnitem = document.getElementById("Itms");
Btnitem.addEventListener('click',function (){
    dashb.style.display='none'
    customer.style.display='none';
    order.style.display='none';
    Item.style.display='block';
    customer1.style.display='none';
    order1.style.display='none';
    Item1.style.display='block';
    dashb1.style.display='none';
    generateIId();
    $("#ItemName").focus();
});


var Btnhome = document.getElementById("home1");
Btnhome.addEventListener('click',function (){
    customer.style.display='none';
    order.style.display='none';
    Item.style.display='none';
    dashb.style.display='block';
    customer1.style.display='none';
    order1.style.display='none';
    Item1.style.display='none';
    dashb1.style.display='block'
});

var Btnhome2 = document.getElementById("nav");
Btnhome2.addEventListener('click',function (){
    customer.style.display='none';
    order.style.display='none';
    Item.style.display='none';
    dashb.style.display='block'
    customer1.style.display='none';
    order1.style.display='none';
    Item1.style.display='none';
    dashb1.style.display='block'
});


// hideall();
// $('#ob1').css('display', 'block');
// $('#nav').text("Dashboard");
//
// $('#imghome').click(function (){
//     hideall();
//     $('#ob1').css('display', 'block');
//     $('#nav').text("Dashboard");
//     text = $('#nav').text();
// });
//
// $('#savecust').click(function (){
//     hideall();
//     alert("Customer Form")
//     $('#CustomerID').focus();
//     $('#cust').css('display', 'block');
//     $('#nav').text("Manage Customer");
//     text = $('#nav').text();
// });
//
// $('#makeord').click(function (){
//     hideall();
//     alert("Order Form")
//     // $('#CustomerID').focus();
//     $('#ord').css('display', 'block');
//     $('#nav').text("Manage Orders");
//     text = $('#nav').text();
// });
//
// $('#Itms').click(function (){
//     hideall();
//     alert("Items Form")
//     $('#ItemCode1').focus();
//     $('#Itemcontent').css('display', 'block');
//     $('#nav').text("Manage Items");
//     text = $('#nav').text();
// });
//
// function hideall(){
//     $("#ob1,#cust,#ord,#itm").css('display', 'none');
// }

