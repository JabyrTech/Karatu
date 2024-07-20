document.addEventListener('DOMContentLoaded', () => {
    const linkForm = document.getElementById('linkForm');
    const urlInput = document.getElementById('urlInput');

    linkForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let url = urlInput.value.trim();

        // Add protocol if missing
        if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + url;
        }

        // Validate URL
        try {
            new URL(url);
            window.location.href = url;
        } catch (e) {
            alert('Please enter a valid URL.');
        }
    });
});
