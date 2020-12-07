$(document).ready(function () {
    //Events
    $("#albumSelection").submit(GetCart)
    //Functions
    function GetCart(event){
        event.preventDefault()
        //Objects for each album
        var ysSuburban = {
            name: "You're So Suburban",
            price: 7.00,
            quantity: 0
        }
        var fandFriends = {
            name: "Family and Friends",
            price: 7.00,
            quantity: 0
        }
        var dsNow = {
            name: "Don't Stop Now",
            price: 7.00,
            quantity: 0
        }
        var obDifferent = {
            name: "On Being Different",
            price: 7.00,
            quantity: 0
        }
        var peoplept = {
            name: "People, Places, and Things",
            price: 7.00,
            quantity: 0
        }
        var riMilwaukee = {
            name: "It's Raining in Milwaukee",
            price: 10.00,
            quantity: 0
        }
        var heartland = {
            name: "Heartland",
            price: 15.00,
            quantity: 0
        }
        var completeCartArray = [ysSuburban,fandFriends,dsNow,obDifferent,peoplept,riMilwaukee,heartland]
        completeCartArray[0].quantity = $("#yss").val()
        completeCartArray[1].quantity = $("#fandf").val()
        completeCartArray[2].quantity = $("#dsn").val()
        completeCartArray[3].quantity = $("#obd").val()
        completeCartArray[4].quantity = $("#ppt").val()
        completeCartArray[5].quantity = $("#rim").val()
        completeCartArray[6].quantity = $("#heartland").val()
        $("#albumSelection").hide();
        var conciseCartArray = []
        completeCartArray.forEach(CartCleanup)
        function CartCleanup(item){
            if(item.quantity > 0){
                conciseCartArray.push(item)
            }
        }
        //Potentially address empty cart requests here
        function cartComparator(item1, item2){
            if(item1.price < item2.price) return -1
            if(item1.price > item2.price) return 1
            return 0
        }
        conciseCartArray.sort(cartComparator)
        var cartTable = document.getElementById("visualCart")
        $("#visualCart tbody").children().remove()
        var header = cartTable.insertRow(0)
        var itemHeader = header.insertCell(0)
        var countHeader = header.insertCell(1)
        var priceHeader = header.insertCell(2)
        itemHeader.innerHTML = "Item"
        countHeader.innerHTML = "Count"
        priceHeader.innerHTML = "Price"
        countHeader.setAttribute("style","text-align: center;")
        priceHeader.setAttribute("style","text-align: right;")
        conciseCartArray.forEach(toVisualCart)
        function toVisualCart(item, index){
            var row = cartTable.insertRow(index+1)
            var itemDetail = row.insertCell(0)
            var countDetail = row.insertCell(1)
            countDetail.setAttribute("style","text-align: center;")
            var priceDetail = row.insertCell(2)
            priceDetail.setAttribute("style","text-align: right;")
            itemDetail.innerHTML = item.name
            countDetail.innerHTML = item.quantity
            priceDetail.innerHTML = "$" + (item.price * item.quantity).toFixed(2)
        }
        //TODO: Get Shipping Info in new form, Get Payment Info, pass to a mailto or something, send a form confirmation email potentially
        //Make sure we've hit all the requirements for the assignment
    }
})