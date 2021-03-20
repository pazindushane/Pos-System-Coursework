function ItemDTO(code,iname,qty,price){
    var __code = code;
    var __iname = iname;
    var __qty = qty;
    var __price = price;

    this.getItemCode = function (){
        return __code;
    }

    this.setItemCode = function (newCode){
        __code = newCode;
    }

    this.getIName = function (){
        return __iname;
    }

    this.setIName = function (newIName){
        __iname = newIName;
    }

    this.getQTY = function (){
        return __qty;
    }

    this.setQTY = function (newQTY){
        __qty = newQTY;
    }

    this.getPrice = function (){
        return __price;
    }

    this.setPrice = function (newPrice){
        __price = newPrice;
    }
}