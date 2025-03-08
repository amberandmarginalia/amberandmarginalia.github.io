document.addEventListener("DOMContentLoaded", function () {
    const playerimage = document.getElementById('playerimage');
    const player = document.getElementById('songtoplay');
    const songinfo = document.getElementById('songinfo');
    const playerimagepng = ''; // path to still image
    const playerimagegif = ''; // path to gif
    // toggle play/pause and switch image
    playerimage.addEventListener("click", function () {
        if (player.paused) {
            player.play();
            playerimage.src = playerimagegif;
            songinfo.style.display = 'block';
        } else {
            player.pause();
            playerimage.src = playerimagepng;
            songinfo.style.display = 'none';
        }
    })
    //reset to static image when song ends
    player.addEventListener("ended", function () {
        playerimage.src = playerimagepng;
        songinfo.style.display = 'none';
    });
});