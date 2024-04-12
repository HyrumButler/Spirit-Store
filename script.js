let addToCartButtons = document.getElementsByClassName('btn-primary');
let cartContainer = document.getElementsByTagName('tbody')[0];
let quantityFields = document.getElementsByClassName('num');
let delete_buttons = document.getElementsByClassName('uk-button-danger');

// Function to add items to the cart and update email content
function addToCartAndUpdateEmail(event) {
    addToCart(event); // Call the addToCart function to add the item to the cart // Update the email content with the new cart items
}

// Add event listener to each Add to Cart button to call the new function
for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', addToCartAndUpdateEmail);
}

function addToCart(event) {
    let itemContainer = document.createElement('tr');
    let btn = event.target;
    let btnGrandParent = btn.parentElement.parentElement;
    let btnParent = btn.parentElement;
    let itemImage = btnGrandParent.querySelector('.card-img-top').src;
    let itemName = btnParent.querySelector('.card-title').innerText;
    let itemPrice = btnParent.querySelector('.card-text').innerText;
    let selectedColor = btnParent.querySelector('#colorSelect').value; // Get the selected color from the dropdown
    let selectedSize = btnParent.querySelector('#sizeSelect').value; // Get the selected size from the dropdown
    let customNameCheckbox = btnParent.querySelector('#customNameCheckbox');
    let wantsCustomName = customNameCheckbox.checked; // Check if the custom name checkbox is checked

    // Add a custom name field if the checkbox is checked
    let customNameField = '';
    if (wantsCustomName) {
        customNameField = `<input type="text" id="customNameInput" placeholder="Enter Custom Name">`;
    }

    itemContainer.innerHTML = `
        <td><input class="uk-checkbox" type="checkbox"></td>
        <td><img class="uk-preserve-width uk-border-circle" src=${itemImage} width="40" alt=""></td>
        <td class="uk-table-link">
            <h3 class="item-name">${itemName}</h3>
        </td>
        <td class="uk-text-truncate item-price"><h3>${itemPrice}</h3></td>
        <td class="uk-text-truncate item-color" style="background-color: ${selectedColor};">${selectedColor}</td> <!-- Display selected color -->
        <td class="uk-text-truncate item-size">${selectedSize}</td> <!-- Display selected size -->
        <td>${customNameField}</td> <!-- Display custom name field if checkbox is checked -->
        <td><input type="number" class="num" value="1"></td>
        <td class="uk-text-truncate total-price"><h3>${itemPrice}</h3></td>
        <td><button class="uk-button uk-button-danger" type="button">Remove</button></td>
    `;

    cartContainer.append(itemContainer);

    // Accessing individual quantity fields
    for (let i = 0; i < quantityFields.length; i++) {
        quantityFields[i].value = 1;
        quantityFields[i].addEventListener('change', totalCost);
    }

    // Accessing individual delete buttons
    for (let i = 0; i < delete_buttons.length; i++) {
        delete_buttons[i].addEventListener('click', removeItem);
    }

    grandTotal();
}









// This function helps to multiply the quantity and the price
function totalCost(event) {
    let quantity = event.target;
    let quantity_parent = quantity.parentElement.parentElement;
    let price_field = quantity_parent.getElementsByClassName('item-price')[0];
    let total_field = quantity_parent.getElementsByClassName('total-price')[0];
    let price_field_content = price_field.innerText.replace('$', '');
    total_field.children[0].innerText = '$' + quantity.value * price_field_content;
    grandTotal();
    if (isNaN(quantity.value) || quantity.value <= 0) {
        quantity.value = 1;
    }
}

// This function helps to add up the total of the items
function grandTotal() {
    let total = 0;
    let grand_total = document.getElementsByClassName('grand-total')[0];
    let all_total_fields = document.getElementsByClassName('total-price');
    for (let i = 0; i < all_total_fields.length; i++) {
        let all_prices = Number(all_total_fields[i].innerText.replace('$', ''));
        total += all_prices;
    }
    grand_total.children[0].innerText = "$" + total;
    grand_total.children[0].style.fontWeight = 'bold';
}

function removeItem(event) {
    let del_btn = event.target;
    let del_btn_parent = del_btn.parentElement.parentElement;
    del_btn_parent.remove();
    grandTotal();
}

// Function to populate cart items in the email text box
function populateCartAndEmail() {
    let cartItems = document.querySelectorAll('tbody tr');
    let emailBodyContent = "Shopping Cart Items:\n";
    
    cartItems.forEach(function(item) {
        let itemName = item.querySelector('.item-name').textContent;
        let itemQuantity = item.querySelector('.num');
        let itemTotalPrice = item.querySelector('.item-price');
        emailBodyContent += "- " + itemName + " (Quantity: " + itemQuantity + ", Total Price: " + itemTotalPrice + ")\n";
    });

    document.getElementById('body').value = emailBodyContent;
}
