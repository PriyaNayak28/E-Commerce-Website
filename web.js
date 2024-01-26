function saveTheData(event) {
    event.preventDefault();

    const Price = event.target.price.value;
    const Product = event.target.productName.value;

    let userDetails = {
        Price,
        Product,
    };

    // Store data in LocalStorage
    localStorage.setItem(Product, JSON.stringify(userDetails));

    //  Show user details on screen
    showUserOnScreen(userDetails);

    axios.post("https://crudcrud.com/api/8caad7915aba4c6f8c997efd5c12201d/E-Commerce-Website", userDetails)
        .then((res) => {
            console.log(res);
            // showUserOnScreen(userDetails);
        }).catch((err) => {
            console.log(err);
        });
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/8caad7915aba4c6f8c997efd5c12201d/E-Commerce-Website")
        .then((response) => {
            console.log(response);
            for (let i = 0; i < response.data.length; i++) {
                showUserOnScreen(response.data[i]);
            }
        }).catch((err) => {
            console.log(err);
        });
});

function showUserOnScreen(user) {

    document.getElementById('price').value = '';
    document.getElementById('productName').value = '';


    if (localStorage.getItem(user.Product) !== null) {
        removeUserFromScreen(user.Product);
    }

    const parentNode = document.getElementById('listitem');
    const childHTML = `<li id=${user._id}>${user.Price}-${user.Product}
    <button onClick="deleteUser('${user._id}')">Delete</button>
    </li>`;

    parentNode.innerHTML = parentNode.innerHTML + childHTML;

    deleteUser(user);
}


function deleteUser(userId) {
    axios.delete(`https://crudcrud.com/api/8caad7915aba4c6f8c997efd5c12201d/E-Commerce-Website/${userId}`)
        .then((response) => {
            removeUserFromScreen(userId)
        })
        .catch((err) => {
            console.log(err);
        })
}


function removeUserFromScreen(userId) {
    const parentNode = document.getElementById('listitem');
    const childNodeToBeDeleted = document.getElementById(userId);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}








