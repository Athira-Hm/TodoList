document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector('[data-dui-toggle="collapse"]');
    const navbarCollapse = document.getElementById("navbarCollapse");

    toggleButton.addEventListener("click", function () {
        const isExpanded = navbarCollapse.style.maxHeight && navbarCollapse.style.maxHeight !== "0px";
        navbarCollapse.style.maxHeight = isExpanded ? "0px" : `${navbarCollapse.scrollHeight}px`;
    });
});