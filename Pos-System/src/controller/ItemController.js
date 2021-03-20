$('#AddItem').click(function () {
    let itmCode = $("#ItemCode").val();
    let itmName = $("#ItemName").val();
    let itmQTY = $("#ItemQTY").val();
    let itmPrice = $("#ItemPrice").val();

    let res = saveItem(itmCode, itmName, itmQTY, itmPrice);
    if(res)clearAllItemText();
    generateIId();
    $("#ItemName").focus();
});

$("#btnGetAllItm").click(function () {
    loadAllItemsToTheTable();
});


$("#btnItmDelete").click(function () {
    let itmCode = $("#ItemCode").val();
    let option=confirm(`Do you want to delete Code:${itmCode}`);
    if (option){
        let res=deleteItem(itmCode);
        if (res){
            alert("Item Deleted");
        } else{
            alert("Delete Failed")
        }

    }
    loadAllItemsToTheTable();
    clearAllItemText();
});

$("#btnUpdateItm").click(function () {
    let itmCode = $("#ItemCode").val();
    let itmName = $("#ItemName").val();
    let itmQTY = $("#ItemQTY").val();
    let itmPrice = $("#ItemPrice").val();

    let option=confirm(`Do you want to Update Item Code:${itmCode}`);
    if (option){
        let res= updateItem(itmCode, itmName, itmQTY, itmPrice);
        if (res){
            alert("Item Updated");
        }else{
            alert("Update Faild");
        }
    }
    loadAllItemsToTheTable();
    clearAllItemText();

});

$("#ItemCode").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let item = searchItem($(this).val());
        if (item != null) {
            $("#ItemCode").val(item.getItemCode());
            $("#ItemName").val(item.getIName());
            $("#ItemQTY").val(item.getQTY());
            $("#ItemPrice").val(item.getPrice());
        } else {
            clearAllItemText();
        }
    }
});
// ==================================================================================

//Functions - CRUD operations
// save customer
function saveItem(code, iname, qty, price) {
    let item = new ItemDTO(code, iname, qty, price);
    ItemDB.push(item);// customer aded

    // load the table
    loadAllItemsToTheTable();
    return true;
}

//get all customers
function getAllItems() {
    return ItemDB;
}

//delete customer
function deleteItem(code) {
    let item = searchItem(code);
    if (item != null) {
        let indexNumber = ItemDB.indexOf(item);
        ItemDB.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}
// search customer
function searchItem(code) {
    for (var i in ItemDB) {
        if (ItemDB[i].getItemCode() == code) return ItemDB[i];
    }
    return null;
}


function updateItem(code, iname, qty, price) {
    let item = searchItem(code);
    if (item != null) {
        item.setIName(iname)
        item.setQTY(qty)
        item.setPrice(price);
        return true;
    } else {
        return false;
    }
}

// ==============================================================================

//Other function
function loadAllItemsToTheTable() {
    let allItems = getAllItems();
    $('#tblitem').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allItems) {
        let code = allItems[i].getItemCode();
        let iname = allItems[i].getIName();
        let qty = allItems[i].getQTY();
        let price = allItems[i].getPrice();

        var row = `<tr><td>${code}</td><td>${iname}</td><td>${qty}</td><td>${price}</td></tr>`;
        $('#tblitem').append(row);
    }
}

function clearAllItemText() {
    $("#ItemCode").val("");
    $("#ItemName").val("");
    $("#ItemQTY").val("");
    $("#ItemPrice").val("");

    $('#ItemCode').focus();
}

// store customerID validation
let itmRegEx=/^(I)[0-9]{1,10}$/;
let itmNRegEx=/^[A-z]{1,100}$/;
let itmARegEx=/^[0-9]{1,5}$/;
let itmSRegEx=/^[0-9]{1,100000}$/;



$("#ItemCode").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#ItemName').focus();
    }

    let inputID=$("#ItemCode").val();
    if (itmRegEx.test(inputID)){
        $("#ItemCode").css('border','2px solid green');
        // $("#lblitmcode").text("");
    }else{
        $("#ItemCode").css('border','2px solid red');
        $("#lblitmcode").text('Your Input Data Format is Wrong (I001)');
    }
});

$("#ItemName").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#ItemQTY').focus();
    }

    let inputID=$("#ItemName").val();
    if (itmNRegEx.test(inputID)){
        $("#ItemName").css('border','2px solid green');
        $("#lblitmname").text("");
    }else{
        $("#ItemName").css('border','2px solid red');
        $("#lblitmname").text('Invalid Input');
    }
});

$("#ItemQTY").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#ItemPrice').focus();
    }

    let inputID=$("#ItemQTY").val();
    if (itmARegEx.test(inputID)){
        $("#ItemQTY").css('border','2px solid green');
        $("#lblitmqty").text("");
    }else{
        $("#ItemQTY").css('border','2px solid red');
        $("#lblitmqty").text('Invalid Input');
    }
});


$("#ItemPrice").on('keyup',function (event){
    if (event.key=="Enter"){
        saveItem();
    }

    let inputID=$("#ItemPrice").val();
    if (itmSRegEx.test(inputID)){
        $("#ItemPrice").css('border','2px solid green');
        $("#lblitmprice").text("");
    }else{
        $("#ItemPrice").css('border','2px solid red');
        $("#lblitmprice").text('Invalid Input');
    }
});


$('#ItemCode,#ItemName,#ItemQTY,#ItemPrice').on('keydown',function (event){
    if (event.key=="Tab"){
        event.preventDefault();
    }
});

function generateIId() {
    try {
        let lastIID = ItemDB[ItemDB.length-1].getItemCode();
        let newIID = parseInt(lastIID.substring(1,4))+1;
        if (newIID < 10){
            $('#ItemCode').val("I00"+newIID);
        }else if(newOID < 100){
            $('#ItemCode').val("I0"+newIID);
        }else {
            $('#ItemCode').val("I"+newIID);
        }
    }catch (e) {
        $('#ItemCode').val("I001");
    }
}
