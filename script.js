/* =========================================
   PMT LUXE — script.js
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- PRODUCT DATA ---------- */

  const products = [
    {
      name: "Midnight Elegance",
      price: 4999,
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80",
      description:
        "Premium fashion designed with an elegant silhouette and luxurious finish."
    },
    {
      name: "Silk Noir",
      price: 5499,
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
      description:
        "Refined silk-inspired fashion with a sophisticated and timeless look."
    },
    {
      name: "Urban Muse",
      price: 3999,
      image:
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
      description:
        "Modern urban fashion created for confident everyday style."
    },
    {
      name: "Golden Hour",
      price: 6499,
      image:
        "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
      description:
        "Elegant outerwear with a premium finish and timeless character."
    }
  ];


  /* ---------- BAG ---------- */

  let bag = JSON.parse(localStorage.getItem("pmtBag")) || [];

  function saveBag() {
    localStorage.setItem("pmtBag", JSON.stringify(bag));
    updateBagCount();
  }

  function updateBagCount() {
    const count = bag.reduce((total, item) => total + item.quantity, 0);

    document.querySelectorAll(".bag-count, [data-bag-count]").forEach(el => {
      el.textContent = count;
    });

    // If your bag icon has no count element
    const bagIcon = document.querySelector(
      ".bag-icon, .cart-icon, [data-bag]"
    );

    if (bagIcon) {
      bagIcon.setAttribute("data-count", count);
    }
  }


  /* ---------- LOGIN ---------- */

  let loggedIn = localStorage.getItem("pmtLoggedIn") === "true";

  function showLogin() {
    const loginModal = document.querySelector(
      "#loginModal, .login-modal, [data-login-modal]"
    );

    if (loginModal) {
      loginModal.classList.add("active");
      loginModal.style.display = "flex";
      return;
    }

    const email = prompt("Enter your email:");

    if (!email) return;

    const password = prompt("Enter your password:");

    if (!password) return;

    loggedIn = true;
    localStorage.setItem("pmtLoggedIn", "true");

    alert("Welcome to PMT LUXE ✦");
  }


  function logout() {
    loggedIn = false;
    localStorage.removeItem("pmtLoggedIn");

    alert("You have been logged out.");
    location.reload();
  }


  /* ---------- LOGIN BUTTONS ---------- */

  document.querySelectorAll(
    ".login-btn, [data-login], #loginButton"
  ).forEach(button => {
    button.addEventListener("click", e => {
      e.preventDefault();
      showLogin();
    });
  });


  /* ---------- LOGOUT ---------- */

  document.querySelectorAll(
    ".logout-btn, [data-logout]"
  ).forEach(button => {
    button.addEventListener("click", e => {
      e.preventDefault();
      logout();
    });
  });


  /* ---------- LOGIN FORM ---------- */

  document.querySelectorAll(
    "#loginForm, .login-form, [data-login-form]"
  ).forEach(form => {

    form.addEventListener("submit", e => {
      e.preventDefault();

      const emailInput = form.querySelector(
        'input[type="email"], input[name="email"]'
      );

      const passwordInput = form.querySelector(
        'input[type="password"], input[name="password"]'
      );

      const email = emailInput ? emailInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value.trim() : "";

      if (!email || !password) {
        alert("Please enter your email and password.");
        return;
      }

      loggedIn = true;
      localStorage.setItem("pmtLoggedIn", "true");

      alert("Welcome to PMT LUXE ✦");

      const modal = form.closest(
        "#loginModal, .login-modal, [data-login-modal]"
      );

      if (modal) {
        modal.classList.remove("active");
        modal.style.display = "none";
      }
    });

  });


  /* ---------- CLOSE LOGIN MODAL ---------- */

  document.querySelectorAll(
    ".login-close, [data-login-close], .modal-close"
  ).forEach(button => {

    button.addEventListener("click", () => {

      const modal = button.closest(
        "#loginModal, .login-modal, .modal"
      );

      if (modal) {
        modal.classList.remove("active");
        modal.style.display = "none";
      }

    });

  });


  /* ---------- PRODUCT DETAILS ---------- */

  function openProduct(product) {

    let modal = document.querySelector(
      "#productModal, .product-modal, [data-product-modal]"
    );

    if (!modal) {
      modal = document.createElement("div");

      modal.id = "productModal";

      modal.innerHTML = `
        <div class="product-modal-overlay">
          <div class="product-modal-box">

            <button class="product-modal-close">×</button>

            <img class="product-modal-image" src="" alt="">

            <div class="product-modal-info">

              <small>PMT / EXCLUSIVE</small>

              <h2 class="product-modal-name"></h2>

              <h3 class="product-modal-price"></h3>

              <p class="product-modal-description"></p>

              <div class="product-sizes">
                <button data-size="S">S</button>
                <button data-size="M">M</button>
                <button data-size="L">L</button>
                <button data-size="XL">XL</button>
              </div>

              <button class="modal-add-bag">
                ADD TO BAG
              </button>

            </div>

          </div>
        </div>
      `;

      document.body.appendChild(modal);
    }

    const image = modal.querySelector(".product-modal-image");
    const name = modal.querySelector(".product-modal-name");
    const price = modal.querySelector(".product-modal-price");
    const description = modal.querySelector(
      ".product-modal-description"
    );

    image.src = product.image;
    image.alt = product.name;

    name.textContent = product.name;

    price.textContent = `₹${product.price.toLocaleString("en-IN")}`;

    description.textContent = product.description;

    modal.style.display = "flex";

    setTimeout(() => {
      modal.classList.add("active");
    }, 10);


    /* ---------- SIZE ---------- */

    let selectedSize = "M";

    modal.querySelectorAll("[data-size]").forEach(sizeButton => {

      sizeButton.classList.remove("selected");

      if (sizeButton.dataset.size === "M") {
        sizeButton.classList.add("selected");
      }

      sizeButton.onclick = () => {

        modal.querySelectorAll("[data-size]").forEach(btn => {
          btn.classList.remove("selected");
        });

        sizeButton.classList.add("selected");

        selectedSize = sizeButton.dataset.size;
      };

    });


    /* ---------- ADD TO BAG ---------- */

    const addButton = modal.querySelector(".modal-add-bag");

    addButton.onclick = () => {

      const existing = bag.find(
        item =>
          item.name === product.name &&
          item.size === selectedSize
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        bag.push({
          name: product.name,
          price: product.price,
          image: product.image,
          size: selectedSize,
          quantity: 1
        });
      }

      saveBag();

      alert("Added to your PMT bag ✦");

      closeProductModal();
    };


    /* ---------- CLOSE ---------- */

    const closeButton = modal.querySelector(
      ".product-modal-close"
    );

    closeButton.onclick = closeProductModal;

    const overlay = modal.querySelector(
      ".product-modal-overlay"
    );

    overlay.onclick = e => {

      if (e.target === overlay) {
        closeProductModal();
      }

    };


    function closeProductModal() {

      modal.classList.remove("active");

      setTimeout(() => {
        modal.style.display = "none";
      }, 250);

    }

  }


  /* ---------- PRODUCT BUTTONS ---------- */

  document.querySelectorAll(
    ".view-details, [data-product], .product-card"
  ).forEach((element, index) => {

    element.addEventListener("click", e => {

      // Don't open details when clicking another button
      if (
        e.target.closest(".add-to-bag") ||
        e.target.closest("[data-add-bag]")
      ) {
        return;
      }

      const productIndex =
        element.dataset.productIndex !== undefined
          ? Number(element.dataset.productIndex)
          : index;

      const product = products[productIndex];

      if (product) {
        openProduct(product);
      }

    });

  });


  /* ---------- ADD TO BAG DIRECTLY ---------- */

  document.querySelectorAll(
    ".add-to-bag, [data-add-bag]"
  ).forEach((button, index) => {

    button.addEventListener("click", e => {

      e.preventDefault();
      e.stopPropagation();

      const productIndex =
        button.dataset.productIndex !== undefined
          ? Number(button.dataset.productIndex)
          : index;

      const product = products[productIndex];

      if (!product) return;

      const existing = bag.find(
        item =>
          item.name === product.name &&
          item.size === "M"
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        bag.push({
          name: product.name,
          price: product.price,
          image: product.image,
          size: "M",
          quantity: 1
        });
      }

      saveBag();

      alert("Added to your PMT bag ✦");

    });

  });


  /* ---------- BAG CLICK ---------- */

  document.querySelectorAll(
    ".bag-icon, .cart-icon, [data-bag], #bagButton"
  ).forEach(button => {

    button.addEventListener("click", e => {

      e.preventDefault();

      if (!loggedIn) {
        showLogin();
        return;
      }

      openBag();

    });

  });


  /* ---------- BAG PAGE / PANEL ---------- */

  function openBag() {

    let bagModal = document.querySelector(
      "#bagModal, .bag-modal, [data-bag-modal]"
    );

    if (!bagModal) {

      bagModal = document.createElement("div");

      bagModal.id = "bagModal";

      bagModal.innerHTML = `
        <div class="bag-overlay">

          <div class="bag-box">

            <button class="bag-close">×</button>

            <h2>Your PMT Bag</h2>

            <div class="bag-items"></div>

            <div class="bag-total"></div>

            <button class="checkout-btn">
              CHECKOUT
            </button>

          </div>

        </div>
      `;

      document.body.appendChild(bagModal);
    }


    renderBag();

    bagModal.style.display = "flex";

    setTimeout(() => {
      bagModal.classList.add("active");
    }, 10);


    bagModal.querySelector(".bag-close").onclick = () => {

      bagModal.classList.remove("active");

      setTimeout(() => {
        bagModal.style.display = "none";
      }, 250);

    };


    function renderBag() {

      const itemsContainer =
        bagModal.querySelector(".bag-items");

      const totalElement =
        bagModal.querySelector(".bag-total");

      if (bag.length === 0) {

        itemsContainer.innerHTML = `
          <p>Your bag is empty.</p>
        `;

        totalElement.textContent = "Total: ₹0";

        return;
      }


      itemsContainer.innerHTML = "";

      let total = 0;

      bag.forEach((item, index) => {

        total += item.price * item.quantity;

        const itemElement =
          document.createElement("div");

        itemElement.className = "bag-item";

        itemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}">

          <div>
            <h3>${item.name}</h3>

            <p>Size: ${item.size}</p>

            <p>₹${item.price.toLocaleString("en-IN")}</p>

            <div class="quantity">
              <button data-minus="${index}">−</button>

              <span>${item.quantity}</span>

              <button data-plus="${index}">+</button>
            </div>

            <button data-remove="${index}">
              REMOVE
            </button>
          </div>
        `;

        itemsContainer.appendChild(itemElement);

      });


      totalElement.textContent =
        `Total: ₹${total.toLocaleString("en-IN")}`;


      /* Quantity minus */

      itemsContainer.querySelectorAll(
        "[data-minus]"
      ).forEach(button => {

        button.onclick = () => {

          const index = Number(
            button.dataset.minus
          );

          if (bag[index].quantity > 1) {
            bag[index].quantity -= 1;
          } else {
            bag.splice(index, 1);
          }

          saveBag();
          renderBag();

        };

      });


      /* Quantity plus */

      itemsContainer.querySelectorAll(
        "[data-plus]"
      ).forEach(button => {

        button.onclick = () => {

          const index = Number(
            button.dataset.plus
          );

          bag[index].quantity += 1;

          saveBag();
          renderBag();

        };

      });


      /* Remove */

      itemsContainer.querySelectorAll(
        "[data-remove]"
      ).forEach(button => {

        button.onclick = () => {

          const index = Number(
            button.dataset.remove
          );

          bag.splice(index, 1);

          saveBag();
          renderBag();

        };

      });

    }

  }


  /* ---------- CHECKOUT ---------- */

  document.addEventListener("click", e => {

    if (
      e.target.matches(".checkout-btn")
    ) {

      if (bag.length === 0) {
        alert("Your PMT bag is empty.");
        return;
      }

      alert(
        "Checkout is ready ✦\n\nThank you for shopping with PMT LUXE."
      );

    }

  });


  /* ---------- COLLECTION BUTTON ---------- */

  document.querySelectorAll(
    ".collection-btn, [data-collection], #collectionButton"
  ).forEach(button => {

    button.addEventListener("click", e => {

      e.preventDefault();

      const collection =
        document.querySelector(
          "#collection, .collection, [data-collection-section]"
        );

      if (collection) {

        collection.scrollIntoView({
          behavior: "smooth"
        });

      }

    });

  });


  /* ---------- NAVIGATION ---------- */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(link => {

    link.addEventListener("click", e => {

      const targetId =
        link.getAttribute("href");

      if (
        targetId &&
        targetId !== "#"
      ) {

        const target =
          document.querySelector(targetId);

        if (target) {

          e.preventDefault();

          target.scrollIntoView({
            behavior: "smooth"
          });

        }

      }

    });

  });


  /* ---------- ESC KEY ---------- */

  document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

      document.querySelectorAll(
        "#productModal, #bagModal, #loginModal"
      ).forEach(modal => {

        modal.classList.remove("active");
        modal.style.display = "none";

      });

    }

  });


  /* ---------- INITIALIZE ---------- */

  updateBagCount();

});
