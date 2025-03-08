
/* makes page sound on click. script has a section for every different element that might produce the page sound. if there's more than one element that makes the sound (a whole class for example), use something like the book review page */
const pagesound = document.getElementById('pagesound');
/* GUESTBOOK */
const guestbook = document.querySelector('#guestbook');
if (guestbook) {
    const book = guestbook.querySelector('img');
    const guestlink = book.dataset.link;
    guestbook.addEventListener('click', () => {
        pagesound.play(); // Play sound on click
        pagesound.addEventListener('ended', () => {
        window.location.href = guestlink; // Navigate to the link
        });
    }); 
};

/* BOOK PAGE (?) */
const reads = document.getElementById('reads');
if (reads) {
    const readrab = reads.querySelector('img');
    const readslink = readrab.dataset.link;
    reads.addEventListener('click', () => {
        pagesound.play();
        pagesound.addEventListener('ended', () => {
            window.location.href = readslink;
        });
    });
};
/* BOOK REVIEW PAGE */
const books = document.querySelectorAll('.book');
if (books.length > 0) {
    books.forEach(book => {
        book.addEventListener('click', () => {
            pagesound.volume = 0.5; //0 no volume, 1 full volume
            pagesound.play(); // Play sound on click
        });
    });
};