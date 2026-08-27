/* =========================================
   PMT LUXE - COMPLETE SCRIPT.JS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- STORAGE ---------- */

    let bag = JSON.parse(localStorage.getItem("pmtBag")) || [];
    let isLoggedIn = localStorage.getItem("pmtLoggedIn") === "true";

    /* ---------- HELPERS ---------- */

    const saveBag = () => {
        localStorage.setItem("pmtBag", JSON.stringify(bag));
    };

    const showMessage = (message) => {
        alert(message);
    };

    const getBagCount = () => {
        return bag.reduce((total, item) => total + (item.quantity || 1), 0);
    };

    /* ---------- LOGIN ---------- */

    function openLogin() {

        // If login page already exists, show it
        const loginPage =
            document.querySelector("#loginPage") ||
            document.querySelector(".login-page") ||
            document.querySelector(".login-modal");

        if (loginPage) {
            loginPage.style.display = "flex";
            return;
        }

        // Create login screen
        const overlay = document.createElement("div");

        overlay.id = "pmtLoginOverlay";

        overlay.innerHTML = `
            <div class="pmt-login-box">

                <button class="pmt-login-close" id="pmtLoginClose">
                    ×
                </button>

                <div class="pmt-logo">PMT</div>

                <div class="pmt-subtitle">
                    LUXE FASHION
                </div>

                <form id="pmtLoginForm">

                    <input
                        type="email"
                        id="pmtEmail"
                        placeholder="Email address"
                        required
                    >

                    <input
                        type="password"
                        id="pmtPassword"
                        placeholder="Password"
                        required
                    >

                    <button type="submit" class="pmt-login-button">
                        ENTER PMT LUXE
                    </button>

                </form>

                <button id="pmtGuestLogin" class="pmt-guest">
                    Continue as Guest
                </button>

            </div>
        `;

        document.body.appendChild(overlay);

        document
            .getElementById("pmtLoginClose")
            .addEventListener("click", () => {
                overlay.remove();
            });

        document
            .getElementById("pmtGuestLogin")
            .addEventListener("click", () => {

                isLoggedIn = true;

                localStorage.setItem(
                    "pmtLoggedIn",
                    "true"
                );

                overlay.remove();

                showMessage(
                    "Welcome to PMT LUXE ✦"
                );

                openBag();
            });

        document
            .getElementById("pmtLoginForm")
            .addEventListener("submit", (event) => {

                event.preventDefault();

                const email =
                    document.getElementById("pmtEmail").value.trim();

                const password =
                    document.getElementById("pmtPassword").value.trim();

                if (!email || !password) {
                    showMessage(
                        "Please enter email and password."
                    );
                    return;
                }

                isLoggedIn = true;

                localStorage.setItem(
                    "pmtLoggedIn",
                    "true"
                );

                overlay.remove();

                showMessage(
                    "Welcome to PMT LUXE ✦"
                );

                openBag();
            });
    }


    /* ---------- BAG ---------- */

    function openBag() {

        if (!isLoggedIn) {
            openLogin();
            return;
        }

        const bagPanel =
            document.querySelector("#bagPanel") ||
            document.querySelector(".bag-panel") ||
            document.querySelector(".cart-panel") ||
            document.querySelector(".cart-drawer");

        if (bagPanel) {

            bagPanel.classList.add("active");

            bagPanel.style.display = "block";

            renderBag();

            return;
        }

        createBagPanel();
    }


    /* ---------- CREATE BAG PANEL ---------- */

    function createBagPanel() {

        let existing =
            document.getElementById("pmtBagPanel");

        if (existing) {
            existing.remove();
        }

        const panel = document.createElement("div");

        panel.id = "pmtBagPanel";

        panel.innerHTML = `

            <div class="pmt-bag-header">

                <div>
                    <span class="pmt-small">
                        PMT / SHOPPING
                    </span>

                    <h2>
                        Your Bag
                    </h2>
                </div>

                <button id="pmtBagClose">
                    ×
                </button>

            </div>

            <div id="pmtBagItems"></div>

            <div class="pmt-bag-footer">

                <div class="pmt-total-row">

                    <span>
                        Total
                    </span>

                    <strong id="pmtBagTotal">
                        ₹0
                    </strong>

                </div>

                <button
                    id="pmtCheckout"
                    class="pmt-checkout"
                >
                    CHECKOUT
                </button>

            </div>
        `;

        document.body.appendChild(panel);

        document
            .getElementById("pmtBagClose")
            .addEventListener("click", () => {

                panel.classList.remove("active");

                panel.style.display = "none";
            });

        document
            .getElementById("pmtCheckout")
            .addEventListener("click", () => {

                if (bag.length === 0) {

                    showMessage(
                        "Your PMT bag is empty."
                    );

                    return;
                }

                showMessage(
                    "Checkout coming soon ✦"
                );
            });

        renderBag();
    }


    /* ---------- RENDER BAG ---------- */

    function renderBag() {

        const container =
            document.getElementById("pmtBagItems");

        if (!container) return;

        if (bag.length === 0) {

            container.innerHTML = `
                <div class="pmt-empty-bag">

                    <div class="empty-icon">
                        ♢
                    </div>

                    <h3>
                        Your bag is empty
                    </h3>

                    <p>
                        Add something from the collection.
                    </p>

                </div>
            `;

            updateBagTotal();

            return;
        }

        container.innerHTML = "";

        bag.forEach((item, index) => {

            const product = document.createElement("div");

            product.className = "pmt-bag-item";

            product.innerHTML = `

                <img
                    src="${item.image || ""}"
                    alt="${item.name || "Product"}"
                >

                <div class="pmt-item-info">

                    <span class="pmt-small">
                        PMT / EXCLUSIVE
                    </span>

                    <h3>
                        ${item.name || "PMT Product"}
                    </h3>

                    <p>
                        ₹${Number(item.price || 0).toLocaleString("en-IN")}
                    </p>

                    <div class="pmt-quantity">

                        <button
                            data-action="minus"
                            data-index="${index}"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity || 1}
                        </span>

                        <button
                            data-action="plus"
                            data-index="${index}"
                        >
                            +
                        </button>

                    </div>

                    <button
                        class="pmt-remove"
                        data-action="remove"
                        data-index="${index}"
                    >
                        Remove
                    </button>

                </div>
            `;

            container.appendChild(product);
        });

        container
            .querySelectorAll("[data-action]")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const index =
                        Number(button.dataset.index);

                    const action =
                        button.dataset.action;

                    if (action === "plus") {

                        bag[index].quantity =
                            (bag[index].quantity || 1) + 1;
                    }

                    if (action === "minus") {

                        bag[index].quantity =
                            (bag[index].quantity || 1) - 1;

                        if (bag[index].quantity <= 0) {
                            bag.splice(index, 1);
                        }
                    }

                    if (action === "remove") {

                        bag.splice(index, 1);
                    }

                    saveBag();

                    renderBag();

                    updateBagCount();
                });
            });

        updateBagTotal();
    }


    /* ---------- TOTAL ---------- */

    function updateBagTotal() {

        const totalElement =
            document.getElementById("pmtBagTotal");

        if (!totalElement) return;

        const total = bag.reduce(
            (sum, item) => {

                return sum +
                    (Number(item.price) || 0) *
                    (item.quantity || 1);

            },
            0
        );

        totalElement.textContent =
            "₹" + total.toLocaleString("en-IN");
    }


    /* ---------- BAG COUNT ---------- */

    function updateBagCount() {

        const count = getBagCount();

        const elements = document.querySelectorAll(
            "#bagCount, .bag-count, .cart-count, [data-bag-count]"
        );

        elements.forEach(element => {

            element.textContent = count;

            element.style.display =
                count > 0 ? "flex" : "none";
        });
    }


    /* ---------- ADD TO BAG ---------- */

    function addToBag(product) {

        const existing =
            bag.find(item =>
                item.name === product.name
            );

        if (existing) {

            existing.quantity =
                (existing.quantity || 1) + 1;

        } else {

            bag.push({
                name: product.name,
                price: Number(product.price) || 0,
                image: product.image || "",
                quantity: 1
            });
        }

        saveBag();

        updateBagCount();

        showMessage(
            "Added to your PMT bag ✦"
        );
    }


    /* ---------- ADD TO BAG BUTTONS ---------- */

    document.addEventListener("click", (event) => {

        const button =
            event.target.closest(
                "#addToBag, .add-to-bag, .add-bag, [data-add-to-bag]"
            );

        if (!button) return;

        const productCard =
            button.closest(
                ".product-card, .product, .collection-card, [data-product]"
            );

        let name =
            button.dataset.name ||
            productCard?.dataset.name ||
            productCard?.querySelector(
                "h2, h3, .product-name"
            )?.textContent ||
            "PMT Product";

        let price =
            button.dataset.price ||
            productCard?.dataset.price ||
            productCard?.querySelector(
                ".price, .product-price"
            )?.textContent ||
            "0";

        price =
            String(price)
                .replace(/[₹,\s]/g, "");

        let image =
            button.dataset.image ||
            productCard?.dataset.image ||
            productCard?.querySelector("img")?.src ||
            "";

        addToBag({
            name: name.trim(),
            price: price,
            image: image
        });
    });


    /* ---------- BAG ICON CLICK ---------- */

    document.addEventListener("click", (event) => {

        const bagButton =
            event.target.closest(
                "#bagIcon, #cartIcon, .bag-icon, .cart-icon, [data-bag], [data-cart]"
            );

        if (!bagButton) return;

        event.preventDefault();

        /*
         IMPORTANT:
         Do NOT show:
         "You are inside PMT LUXE"

         If user is logged out:
         → Login screen

         If user is logged in:
         → Bag
        */

        if (!isLoggedIn) {

            openLogin();

        } else {

            openBag();
        }
    });


    /* ---------- LOGIN ICON ---------- */

    document.addEventListener("click", (event) => {

        const loginButton =
            event.target.closest(
                "#loginButton, .login-button, [data-login]"
            );

        if (!loginButton) return;

        event.preventDefault();

        openLogin();
    });


    /* ---------- LOGOUT ---------- */

    document.addEventListener("click", (event) => {

        const logoutButton =
            event.target.closest(
                "#logout, .logout, [data-logout]"
            );

        if (!logoutButton) return;

        localStorage.removeItem(
            "pmtLoggedIn"
        );

        isLoggedIn = false;

        showMessage(
            "You have been logged out."
        );
    });


    /* ---------- CLOSE EXISTING MODALS ---------- */

    document.addEventListener("click", (event) => {

        const closeButton =
            event.target.closest(
                ".modal-close, .close-modal, [data-close]"
            );

        if (!closeButton) return;

        const modal =
            closeButton.closest(
                ".modal, .modal-overlay, .overlay"
            );

        if (modal) {
            modal.style.display = "none";
        }
    });


    /* ---------- INITIAL UPDATE ---------- */

    updateBagCount();

});
// ===============================
// CHECKOUT SYSTEM
// ===============================

const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutTotal = document.getElementById("checkoutTotal");

checkoutBtn.addEventListener("click", function () {

    if (cart.length === 0) {
        alert("Your bag is empty.");
        return;
    }

    let total = 0;

    cart.forEach(function (item) {
        total += Number(item.price);
    });

    checkoutTotal.textContent =
        "₹" + total.toLocaleString("en-IN");

    checkoutModal.classList.add("active");
});


closeCheckout.addEventListener("click", function () {
    checkoutModal.classList.remove("active");
});


checkoutModal.addEventListener("click", function (event) {

    if (event.target === checkoutModal) {
        checkoutModal.classList.remove("active");
    }

});


checkoutForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("customerPhone").value;
    const address = document.getElementById("customerAddress").value;
    const city = document.getElementById("customerCity").value;
    const pincode = document.getElementById("customerPincode").value;
    const payment = document.getElementById("paymentMethod").value;

    const orderId =
        "PMT" + Date.now().toString().slice(-6);

    alert(
        "Order Placed Successfully! 🎉\n\n" +
        "Order ID: " + orderId + "\n" +
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "City: " + city + "\n" +
        "Payment: " + payment
    );

    checkoutModal.classList.remove("active");

    checkoutForm.reset();

});
