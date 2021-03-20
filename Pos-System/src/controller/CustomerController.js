// var table = document.getElementById("tb1-1");
// var SaveCustomer = document.getElementById("SaveCustomer");
// // var rates = document.getElementById('Gender').value;
// var radioValue = $("input[name='exampleRadios']:checked").val();
// var rset =document.getElementById("custForm");
// SaveCustomer.addEventListener('click',function (){
//     var row = table.insertRow(3);
//     var cell1 = row.insertCell(0);
//     var cell2 = row.insertCell(1);
//     var cell3 = row.insertCell(2);
//     var cell4 = row.insertCell(3);
//     //     if(rates =='option1'){
//     //         cell4 = document.getElementById('exampleRadios1').value;
//     //
//     //     }else if(rates =='option2') {
//     //         cell4 = document.getElementById('exampleRadios2').value;
//     //     }
//     cell1.innerHTML = document.getElementById("CustomerID").value;
//     cell2.innerHTML = document.getElementById("CustomerName").value;
//     cell3.innerHTML = document.getElementById("CustomerAddress").value;
//     if(radioValue){
//         alert("Your are a - " + radioValue);
//         cell4.innerHTML = document.getElementById("Gender").value;
//     }
//
//     rset.reset();
//     return false;
//
// });

// $('#SaveCustomer').click(function (){

//     $('#tblcustomer>tr').off('click');
//
//     let cusid = $('#CustomerID').val();
//     let cusname = $('#CustomerName').val();
//     let cusaddress = $('#CustomerAddress').val();
//     let cussalary = $('#CustomerSalary').val();
//
//     let row = "<tr><td>"+cusid+"</td><td>"+cusname+"</td><td>"+cusaddress+"</td><td>"+cussalary+"</td></tr>";
//
//     $('#tblcustomer').append(row);
//
//     clearcustomertextfields();
//
//     $('#tblcustomer>tr').click(function (){
//         let id = $(this).children('td:eq(0)').text;
//         let name = $(this).children('td:eq(1)').text;
//         let address = $(this).children('td:eq(2)').text;
//         let salary = $(this).children('td:eq(3)').text;
//
//         console.log(id,name,address,salary)
//     });
// });
//
// function clearcustomertextfields(){
//     $('#CustomerID').val("");
//     $('#CustomerName').val("");
//     $('#CustomerAddress').val("");
//     $('#CustomerSalary').val("");
//
//     $('#CustomerID').focus();
// }
// =====================================================================================================

// ========================================================================================
$('#SaveCustomer').click(function () {
    let cusID = $("#CustomerID").val();
    let cusName = $("#CustomerName").val();
    let cusAddress = $("#CustomerAddress").val();
    let cusSalary = $("#CustomerSalary").val();

    let res = saveCustomer(cusID, cusName, cusAddress, cusSalary);
    if(res)clearAllCustomerText();
    generateCId();
    $("#CustomerName").focus();
});

$("#btnGetAll").click(function () {
    loadAllCustomerToTheTable();
});


$("#btnCusDelete").click(function () {
    let cusID = $("#CustomerID").val();
    let option=confirm(`Do you want to delete ID:${cusID}`);
    if (option){
        let res=deleteCustomer(cusID);
        if (res){
            alert("Customer Deleted");
        } else{
            alert("Delete Failed")
        }

    }
    loadAllCustomerToTheTable();
    clearAllCustomerText();
});

$("#btnUpdate").click(function () {
    let cusID = $("#CustomerID").val();
    let cusName = $("#CustomerName").val();
    let cusAddress = $("#CustomerAddress").val();
    let cusSalary = $("#CustomerSalary").val();

    let option=confirm(`Do you want to Update Customer ID:${cusID}`);
    if (option){
        let res= updateCustomer(cusID, cusName, cusAddress, cusSalary);
        if (res){
            alert("Customer Updated");
        }else{
            alert("Update Faild");
        }
    }
    loadAllCustomerToTheTable();
    clearAllCustomerText();

});

$("#CustomerID").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let customer = searchCustomer($(this).val());
        if (customer != null) {
            $("#CustomerID").val(customer.getCustomerID());
            $("#CustomerName").val(customer.getCustomerName());
            $("#CustomerAddress").val(customer.getCustomerAddress());
            $("#CustomerSalary").val(customer.getCustomerSalary());
        } else {
            clearAllCustomerText();
        }
    }
});
// ==================================================================================

//Functions - CRUD operations
// save customer
function saveCustomer(id, name, address, salary) {
    let customer = new CustomerDTO(id, name, address, salary);
    CustomerDB.push(customer);// customer aded

    // load the table
    loadAllCustomerToTheTable();
    return true;
}

//get all customers
function getAllCustomers() {
    return CustomerDB;
}

//delete customer
function deleteCustomer(id) {
    let customer = searchCustomer(id);
    if (customer != null) {
        let indexNumber = CustomerDB.indexOf(customer);
        CustomerDB.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}
// search customer
function searchCustomer(id) {
    for (var i in CustomerDB) {
        if (CustomerDB[i].getCustomerID() == id) return CustomerDB[i];
    }
    return null;
}


function updateCustomer(id, name, address, salary) {
    let customer = searchCustomer(id);
    if (customer != null) {
        customer.setCustomerName(name)
        customer.setCustomerAddress(address)
        customer.setCustomerSalary(salary);
        return true;
    } else {
        return false;
    }
}

// ==============================================================================

//Other function
function loadAllCustomerToTheTable() {
    let allCustomers = getAllCustomers();
    $('#tblcustomer').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allCustomers) {
        let id = allCustomers[i].getCustomerID();
        let name = allCustomers[i].getCustomerName();
        let address = allCustomers[i].getCustomerAddress();
        let salary = allCustomers[i].getCustomerSalary();

        var row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`;
        $('#tblcustomer').append(row);
    }
}

function clearAllCustomerText() {
    $("#CustomerID").val("");
    $("#CustomerName").val("");
    $("#CustomerAddress").val("");
    $("#CustomerSalary").val("");

    $('#CustomerID').focus();
}

// store customerID validation
let cusRegEx=/^(C)[0-9]{1,10}$/;
let cusNRegEx=/^[A-z]{1,100}$/;
let cusARegEx=/^[A-z,0-9]{1,200}$/;
let cusSRegEx=/^[0-9]{1,100000}$/;



$("#CustomerID").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#CustomerName').focus();
    }

    let inputID=$("#CustomerID").val();
    if (cusRegEx.test(inputID)){
        $("#CustomerID").css('border','2px solid green');
        // $("#lblcusid").text("CustomerID").css('text','solid green');
    }else{
        $("#CustomerID").css('border','2px solid red');
        $("#lblcusid").text('Your Input Data Format is Wrong (C001)');
    }
});

$("#CustomerName").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#CustomerAddress').focus();
    }

    let inputID=$("#CustomerName").val();
    if (cusNRegEx.test(inputID)){
        $("#CustomerName").css('border','2px solid green');
        $("#lblcusname").text("");
    }else{
        $("#CustomerName").css('border','2px solid red');
        $("#lblcusname").text('Invalid Input');
    }
});

$("#CustomerAddress").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#CustomerSalary').focus();
    }

    let inputID=$("#CustomerAddress").val();
    if (cusARegEx.test(inputID)){
        $("#CustomerAddress").css('border','2px solid green');
        $("#lblcusasddress").text("");
    }else{
        $("#CustomerAddress").css('border','2px solid red');
        $("#lblcusasddress").text('Invalid Input');
    }
});


$("#CustomerSalary").on('keyup',function (event){
    if (event.key=="Enter"){
        saveCustomer();
    }

    let inputID=$("#CustomerSalary").val();
    if (cusSRegEx.test(inputID)){
        $("#CustomerSalary").css('border','2px solid green');
        $("#lblcussalary").text("");
    }else{
        $("#CustomerSalary").css('border','2px solid red');
        $("#lblcussalary").text('Invalid Input');
    }
});


$('#CustomerID,#CustomerName,#CustomerAddress,#CustomerSalary').on('keydown',function (event){
    if (event.key=="Tab"){
        event.preventDefault();
    }
});


function generateCId() {
    try {
        let lastCID = CustomerDB[CustomerDB.length-1].getCustomerID();
        let newCID = parseInt(lastCID.substring(1,4))+1;
        if (newCID < 10){
            $('#CustomerID').val("C00"+newCID);
        }else if(newCID < 100){
            $('#CustomerID').val("C0"+newCID);
        }else {
            $('#CustomerID').val("C"+newCID);
        }
    }catch (e) {
        $('#CustomerID').val("C001");
    }
}
