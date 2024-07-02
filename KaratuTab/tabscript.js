document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 0;
    const pages = document.querySelectorAll('.page');

    function showPage(index) {
        pages.forEach((page, i) => {
            page.style.transform = `translateX(${100 * (i - index)}%)`;
        });
    }

    document.querySelector('.prev').addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
        }
    });

    document.querySelector('.next').addEventListener('click', () => {
        if (currentPage < pages.length - 1) {
            currentPage++;
            showPage(currentPage);
        }
    });

    showPage(currentPage);
});
