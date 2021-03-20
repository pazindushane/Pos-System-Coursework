$("#makeord").click(function () {
    // $('#OrderID').empty();
    $('#ItmSelect').empty();
    $('#CustSelect').empty();

    generateOId();
    loadItemID();
    loadCustID();

    $(document).ready( function() {
        $('#Date1').val(new Date().toDateInputValue());
    });

//     var items=[], options=[];
//     //Iterate all td's in second column
//     $('#tb1-1 tbody tr td:nth-child(1)').each( function(){
//         //add item to array
//         items.push( $(this).text() );
//     });
//
//     //restrict array to unique items
//     var items = $.unique( items );
//
// //iterate unique array and build array of select options
//     $.each( items, function(i, item){
//         options.push('<option value="' + item + '">' + item + '</option>');
//     })
//
// //finally empty the select and append the items from the array
//     $('#CustSelect').empty().append( options.join() );


//     selectedSubjectName();
    // $('#CustSelect').off();


    // $('#CustSelect').empty();
    // $.each(getAllCustomers(), function(i, p) {
    //     $('#CustSelect').append($('<option></option>').val(p).html(p));
    // });
    //
    // function getAllCustomers() {
    //     return CustomerDB;
    // }
    // $.noConflict();
    // $('#CustSelect').on('click', function(){
    // $("#CustSelect option:selected").val();


    // $("#CustSelect option[value=3]").attr('selected', 'selected');


    // $(document).ready(function(){
    //     $("#CustSelect").change(function(){
    //         var selectedCountry = $(this).children("option:selected").val();
    //         alert("You have selected the country - " + selectedCountry);
    //     });
    // });
    // $( "#CustSelect" ).val(this)
    //     .change(function() {
    //         var str = "";
    //         $( "#CustSelect option:selected" ).each(function() {
    //             str += $( this ).text() + " ";
    //         });
    //         $( "div" ).text( str );
    //     })
    //     .trigger( "change" );


    //     console.log('clicked');
    // });
});

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

function loadItemID() {

    for (var c of getAllItems()) {
        $('#ItmSelect').append(`<option value="${c.getItemCode()}">${c.getItemCode()}</option>`);
        console.log("sdsd");
    }

}


$('#ItmSelect').change(function () {
    if ($('#ItmSelect').val() !== '-1'){

        const selectedItem = searchItem($('#ItmSelect').val());
        $('#ItemCode1').val(selectedItem.getItemCode());
        $('#ItemName2').val(selectedItem.getIName());
        $('#Price1').val(selectedItem.getPrice());
        $('#QtyOnH1').val(selectedItem.getQTY());
    }else {

    }
});

function loadCustID() {

    for (var c of getAllCustomers()) {
        $('#CustSelect').append(`<option value="${c.getCustomerID()}">${c.getCustomerID()}</option>`);
        console.log("sdsd");
    }

}


$('#CustSelect').change(function () {
    if ($('#CustSelect').val() !== '-1'){

        const selectedItem1 = searchCustomer($('#CustSelect').val());
        $('#CustId').val(selectedItem1.getCustomerID());
        $('#Name1').val(selectedItem1.getCustomerName());
        $('#Salary1').val(selectedItem1.getCustomerSalary());
        $('#Address1').val(selectedItem1.getCustomerAddress());
    }else {

    }
});



function generateOId() {
    try {
        let lastOID = OrderDetailDb[OrderDetailDb.length-1].getOID();
        let newOID = parseInt(lastOID.substring(1,4))+1;
        if (newOID < 10){
            $('#OrderID').val("R00"+newOID);
        }else if(newOID < 100){
            $('#OrderID').val("R0"+newOID);
        }else {
            $('#OrderID').val("R"+newOID);
        }
    }catch (e) {
        $('#OrderID').val("R001");
    }
}
// generateOId();

// function GetTodayDate() {
//     var tdate = new Date();
//     var dd = tdate.getDate(); //yields day
//     var MM = tdate.getMonth(); //yields month
//     var yyyy = tdate.getFullYear(); //yields year
//     var currentDate= dd + "-" +( MM+1) + "-" + yyyy;
//
//     // return currentDate;
//
//     $("#Date1").val(currentDate);
// }

// function selectedSubjectName() {
//     var subjectIdNode = document.getElementById('CustSelect');
//     var value =
//         subjectIdNode.options[subjectIdNode.selectedIndex].text;
//     console.log("The selected value=" + value);
// }



$("#OrderQuantity1").on('keypress',function (event){

    if (event.key=="Enter"){

        Qtyprocess();
        Totprocess();
        Checkavailability();

        let itmCode = $("#ItemCode1").val();
        let itmName = $("#ItemName2").val();
        let qtyh = $('#QtyOnH1').val();
        let price = $('#Price1').val();

        updateItem(itmCode, itmName, qtyh, price);
        $("#Cash1").focus();

    }else {
        console.log("stock")
    }

});

function Qtyprocess() {
    let qty = $('#OrderQuantity1').val();
    let qtyh = $('#QtyOnH1').val();
    let stock = qtyh - qty;
    $('#QtyOnH1').val(stock);
}

function Totprocess() {
    let qty = $('#OrderQuantity1').val();
    let price = $('#Price1').val();
    let tot = qty * price;
    $('#tot1').text(tot);
}

function Totprocess2() {
    let total = $('#tot1').text();
    let subTotal = $('#subtot1').text();
    let main = Number(total) +  Number(subTotal) ;
    $('#subtot1').text(main);
}

function Checkavailability() {
    let qty1 = $('#OrderQuantity1').val();
    let qtyh1 = $('#QtyOnH1').val();
    if (qtyh1 > qty1){
        $("#OrderQuantity1").css('border','2px solid green');
        $("#Cash1").focus();

    }else {
        $("#OrderQuantity1").css('border','2px solid red');
        $("#lbloqty").text('Out of Stock');
        $("#OrderQuantity1").focus();
    }

}

$("#additmbtn").click(function () {

    let itmCode = $("#ItemCode1").val();
    let itmName = $("#ItemName2").val();
    let itmPrice = $("#Price1").val();
    let itmQTY =  $("#OrderQuantity1").val();
    let itmtotal =  $("#tot1").text();
    Totprocess2();

    let res = saveItem1(itmCode, itmName, itmPrice, itmQTY,itmtotal);
    if(res)clearAllItemText1();

});

$("#PurchaseBtn").click(function () {
    $('#dash').css('display','none');
    $('#navbr').css('display','none');
    $('#additmbtn').css('display','none');
    $('#PurchaseBtn').css('display','none');
    window.print();
    $('#dash').css('display','block');
    $('#navbr').css('display','block');
    $('#additmbtn').css('display','block');
    $('#PurchaseBtn').css('display','block');
});





function clearAllItemText1() {
    $("#ItemCode1").val("");
    $("#ItemName2").val("");
    $("#Price1").val("");
    $("#QtyOnH1").val("");
    $("#OrderQuantity1").val("");

    $('#ItemCode').focus();
}

function saveItem1(code1, iname1, qty1, price1,total1) {
    let item = new OrderDTO(code1, iname1, qty1, price1 ,total1);
    OrderDb.push(item);// customer aded

    // load the table
    loadAllItemsToTheTable1();
    return true;
}

function getAllOrders() {
    return OrderDb;
}

function loadAllItemsToTheTable1() {
    let allItems = getAllOrders();
    $('#tblitem2').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allItems) {
        let code = allItems[i].getItemCode1();
        let iname = allItems[i].getIName1();
        let qty = allItems[i].getQTY1();
        let price = allItems[i].getPrice1();
        let total = allItems[i].getTotal();

        var row = `<tr><td>${code}</td><td>${iname}</td><td>${qty}</td><td>${price}</td><td>${total}</td></tr>`;
        $('#tblitem2').append(row);
    }
}

$("#Discount1").on('keyup',function (event){
    if (event.key=="Enter"){

        let cash = $("#Cash1").val();
        let disc = $("#Discount1").val();
        let blance = cash - disc;
         $("#Balance1").val(blance);
    }else{
        console.log("tot");
    }
});
