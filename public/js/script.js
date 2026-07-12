
(() => {
    "use strict";

   
    const forms = document.querySelectorAll(".needs-validation");

    
    Array.from(forms).forEach((form) => {
        form.addEventListener(
            "submit",
            (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add("was-validated");
            },
            false,
        );
    });
})();


let taxSwitchToggle = document.getElementById("flexSwitchCheckDefault");
let texSwitchToggle = () => {
    let taxInfo = document.getElementsByClassName("tax-info");
    for (info of taxInfo) {
        if (taxSwitchToggle.checked) info.style.display = "inline";
        else info.style.display = "none";
    }
};

document.querySelectorAll(".wishlist-icon").forEach((icon) => {
    icon.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        icon.classList.toggle("liked");

        if (icon.classList.contains("liked")) {
            icon.style.color = "red";
        } else {
            icon.style.color = "white";
        }
    });
});





const profileBtn = document.getElementById("profileBtn");
const profileDropdown = document.getElementById("profileDropdown");

if (profileBtn && profileDropdown) {
    profileBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        profileDropdown.classList.toggle("show");
        profileBtn.classList.toggle("active");
    });

    profileDropdown.addEventListener("click", function (e) {
        e.stopPropagation();
    });

    document.addEventListener("click", function () {
        profileDropdown.classList.remove("show");
        profileBtn.classList.remove("active");
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            profileDropdown.classList.remove("show");
            profileBtn.classList.remove("active");
        }
    });

}