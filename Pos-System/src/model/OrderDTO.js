function OrderDTO(code1,iname1,qty1,price1,total1) {
    var __code1 = code1;
    var __iname1 = iname1;
    var __qty1 = qty1;
    var __price1 = price1;
    var __total1 = total1;



    this.getItemCode1 = function () {
        return __code1;
    }

    this.setItemCode1 = function (newcode1) {
        __code1 = newcode1;
    }

    this.getIName1 = function () {
        return __iname1;
    }

    this.setIName1 = function (newiname1) {
        __iname1 = newiname1;
    }

    this.getQTY1 = function () {
        return __qty1;
    }

    this.setQTY1 = function (newqty1) {
        __qty1 = newqty1;
    }

    this.getPrice1 = function () {
        return __price1;
    }

    this.setPrice1 = function (newprice1) {
        __price1 = newprice1;
    }

    this.getTotal = function () {
        return __total1;
    }

    this.setTotal = function (newtotal1) {
        __total1 = newtotal1;
    }
}
