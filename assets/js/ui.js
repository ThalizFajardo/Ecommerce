export const load = () => {
  const loader = document.getElementById("loaderScreen");

  if (loader) {
    setTimeout(() => {
      loader.style.display = "none";
    }, 3000);
  }
};

export const headerScroll = () => {
  const header = document.getElementById("header");

  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY >= 50) {
        header.classList.add("scroll-header");
      } else {
        header.classList.remove("scroll-header");
      }
    });
  }
};

export const darkTheme = () => {
  const themeButton = document.getElementById("theme-button");
  const darkTheme = "dark-theme";
  const iconTheme = "bx-sun";

  const selectedTheme = window.localStorage.getItem("selected-Theme");
  const selectedIcon = window.localStorage.getItem("selected-Icon");

  const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? "dark" : "light";
  const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

  if (selectedTheme) {
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
      darkTheme
    );
    themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
      iconTheme
    );
  }

  themeButton.addEventListener("click", () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    window.localStorage.setItem("selected-Theme", getCurrentTheme());
    window.localStorage.setItem("selected-Icon", getCurrentIcon());
  });
};

export const cartOverlay = () => {
  const cartToggle = document.getElementById("cart-shop");
  const cartLayout = document.getElementById("cart");
  const cartClose = document.getElementById("cart-close");

  if (cartToggle) {
    cartToggle.addEventListener("click", function () {
      cartLayout.classList.toggle("show-cart");
    });
  }

  if (cartClose) {
    cartClose.addEventListener("click", function () {
      cart.classList.remove("show-cart");
    });
  }
};
