function OrderDtailDTO(OID) {
    var __OID = OID;


    this.getOID = function () {
        return __OID;
    }

    this.setOID = function (newOID) {
        __OID = newOID;
    }

}