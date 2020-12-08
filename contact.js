$(document).ready(function () {
    //Events
    $("#albumSelection").submit(GetCart)
    //Functions
    function CreateCart(cartObject,cartArray){
        var cartTable = cartObject
        var header = cartTable.insertRow(0)
        var itemHeader = header.insertCell(0)
        var countHeader = header.insertCell(1)
        var priceHeader = header.insertCell(2)
        itemHeader.innerHTML = "Item"
        countHeader.innerHTML = "Count"
        priceHeader.innerHTML = "Price"
        countHeader.setAttribute("style","text-align: center;")
        priceHeader.setAttribute("style","text-align: right;")
        cartArray.forEach(toVisualCart)
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
    }
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
        //Pull all the album objects into an array and update the quantity attribute of each one to reflect the user's selection
        var completeCartArray = [ysSuburban,fandFriends,dsNow,obDifferent,peoplept,riMilwaukee,heartland]
        completeCartArray[0].quantity = $("#yss").val()
        completeCartArray[1].quantity = $("#fandf").val()
        completeCartArray[2].quantity = $("#dsn").val()
        completeCartArray[3].quantity = $("#obd").val()
        completeCartArray[4].quantity = $("#ppt").val()
        completeCartArray[5].quantity = $("#rim").val()
        completeCartArray[6].quantity = $("#heartland").val()
        $("#albumSelection").hide();
        //Trim all array items with a quantity of zero
        var conciseCartArray = []
        completeCartArray.forEach(CartCleanup)
        function CartCleanup(item){
            if(item.quantity > 0){
                conciseCartArray.push(item)
            }
        }
        //If I decide to continue work on the site for my Dad once the objectives for the assignment have been met,
        //this is where I would put complex validation constraints. I realize that a user could make a request for 0 items
        //which is completely harmless, but would be a hassle to deal with if this website were to receive any kind of attention

        //Also, I created this comparator function to sort the user's shopping cart by item cost.
        function cartComparator(item1, item2){
            if(item1.price < item2.price) return -1
            if(item1.price > item2.price) return 1
            return 0
        }
        //So, full disclosure here: I used the .getElementById method a lot before I realized you specifically requested we avoid it.
        //Since I needed the DOM object to make some of these behaviors function correctly, I went looking for a jQuery equivalent.
        conciseCartArray.sort(cartComparator)
        CreateCart($("#visualCart").get(0),conciseCartArray)
        var setShipInfoBottomMargin = $("#shipInfo").get(0)
        setShipInfoBottomMargin.setAttribute("style",`margin-bottom: ${conciseCartArray.length*20 + 145}px`)
        $("#shipInfo").show()
        $("#shipInfo").submit(HoldShippingInfo)
        function HoldShippingInfo(event){
            event.preventDefault()
            var shipTo = {
                firstName: $("#firstNameShipping").val(),
                lastName: $("#lastNameShipping").val(),
                addressOne: $("#addressOneShipping").val(),
                addressTwo: $("#addressTwoShipping").val(),
                city: $("#cityShipping").val(),
                state: $("#stateShipping").val(),
                zipCode: $("#zipCodeShipping").val(),
                phoneNumber: $("#phoneShipping").val(),
                emailAddress: $("#emailShipping").val()
            }
            $("#shipInfo").hide()
            var setBillingInfoBottomMargin = $("#billingInfo").get(0)
            setBillingInfoBottomMargin.setAttribute("style",`margin-bottom: ${conciseCartArray.length*20 + 145}px`)
            $("#billingInfo").show()
            //I've been coding for a while now and I'm super proud I was able to create this little table-generating function
            CreateCart($("#billingCart").get(0),conciseCartArray)
            $("#billingInfo").submit(HoldPaymentInfo)
            //Processes Credit Card info punched in by the user.
            function HoldPaymentInfo(event){
                event.preventDefault()
                var selectedRadioButton = $("input[name=card]:checked")
                var billTo = {
                    cardType: selectedRadioButton.data("card"),
                    cardNumber: $("#cardNumber").val(),
                    expiration: $("#expiration").val(),
                    securityCode: $("#securityCode").val(),
                    billingZip: $("#billingZip").val()
                }
                $("#billingInfo").hide()
                var confirmForm = $("#confirmPage").get(0)
                confirmForm.setAttribute("style",`margin-bottom: ${conciseCartArray.length*27 + 145}px`)
                $("#confirmPage").show()

                var confirmTable = $("#confirmCart").get(0)
                $("#confirmCart tbody").children().remove()
                var confirmheader = confirmTable.insertRow(0)
                var confirmItemHeader = confirmheader.insertCell(0)
                var confirmCountHeader = confirmheader.insertCell(1)
                var confirmPriceHeader = confirmheader.insertCell(2)
                confirmItemHeader.innerHTML = "Item"
                confirmCountHeader.innerHTML = "Count"
                confirmPriceHeader.innerHTML = "Price"
                confirmCountHeader.setAttribute("style","text-align: center;")
                confirmPriceHeader.setAttribute("style","text-align: right;")
                var subtotal = 0
                var emailCart = ""
                conciseCartArray.forEach(toEmailCart)
                function toEmailCart(item, index){
                    emailCart = emailCart + item.toString() + ";"
                }
                conciseCartArray.forEach(toConfirmCart)
                //Dump all the previously entered information into inputs so the user can make any final adjustments
                function toConfirmCart(item, index){
                    var confirmRow = confirmTable.insertRow(index+1)
                    var confirmItemDetail = confirmRow.insertCell(0)
                    var confirmCountDetail = confirmRow.insertCell(1)
                    confirmCountDetail.setAttribute("style","text-align: center;")
                    var confirmPriceDetail = confirmRow.insertCell(2)
                    confirmPriceDetail.setAttribute("style","text-align: right;")

                    //Create read-only inputs containing item name and drop it in the table.
                    //This should allow me to display all the info on a confirm screen and then have it emailed to me correctly.
                    var confirmItemBox = document.createElement("input")
                    confirmItemBox.setAttribute("readonly","true")
                    confirmItemBox.setAttribute("value",item.name)
                    confirmItemBox.setAttribute("name","item")
                    confirmItemDetail.appendChild(confirmItemBox)

                    var confirmCountBox = document.createElement("input")
                    confirmCountBox.setAttribute("readonly","true")
                    confirmCountBox.setAttribute("value",item.quantity)
                    confirmCountBox.setAttribute("class","tooWide")
                    confirmCountBox.setAttribute("name","count")
                    confirmCountDetail.appendChild(confirmCountBox)

                    var confirmPriceBox = document.createElement("input")
                    confirmPriceBox.setAttribute("readonly","true")
                    confirmPriceBox.setAttribute("value","$" + (item.price * item.quantity).toFixed(2))
                    confirmPriceBox.setAttribute("class","priceWidth")
                    confirmPriceBox.setAttribute("name","price")
                    confirmPriceDetail.appendChild(confirmPriceBox)

                    subtotal+=(item.price * item.quantity)
                }
                var totalRow = confirmTable.insertRow(conciseCartArray.length+1)
                totalRow.setAttribute("style","border-top: 1px solid black;")
                var indicatorCell = totalRow.insertCell(0)
                indicatorCell.innerHTML = "Subtotal:"
                var spacerCell = totalRow.insertCell(1)
                spacerCell.innerHTML = "     "
                var subtotalCell = totalRow.insertCell(2)
                subtotalCell.innerText = "$" + subtotal.toFixed(2)
                subtotalCell.setAttribute("style","text-align: right;")
                //After handling table, start dumping out everything into the form.
                //All this can be read/write so customers can make changes as needed here.

                var firstAndLast = $("#firstAndLast").get(0)
                firstAndLast.setAttribute("value",shipTo.firstName + " " + shipTo.lastName)
                var addressOneTwo = $("#addressOneTwo").get(0)
                if(shipTo.addressTwo !== ""){
                    addressOneTwo.setAttribute("value",shipTo.addressOne + ", " + shipTo.addressTwo)
                }
                else{
                    addressOneTwo.setAttribute("value",shipTo.addressOne)
                }
                var cityStateZip = $("#cityStateZip").get(0)
                cityStateZip.setAttribute("value", shipTo.city + ", " + shipTo.state + " " + shipTo.zipCode)
                var cardTypeNumber = $("#cardTypeNumber").get(0)
                cardTypeNumber.setAttribute("value",billTo.cardType + " " + billTo.cardNumber)
                var expirationSecurity = $("#expirationSecurity").get(0)
                expirationSecurity.setAttribute("value",billTo.expiration + ", " + billTo.securityCode)
                var billingZip = $("#zip").get(0)
                billingZip.setAttribute("value",billTo.billingZip)
                $("#confirmPage").submit(ThanksCleanup)
                //Display a thank you message and remove all the inputs. On that last submit action, the form dumps
                //everything into a mail client window. In a larger project, I would investigate some server-side shenanigans
                //to make this automatic and to send a confirmation email.
                function ThanksCleanup(event){
                    event.preventDefault()
                    $("#confirmPage").hide()
                    $("#thanksPage").show();
                }
            }
        }

    }
})