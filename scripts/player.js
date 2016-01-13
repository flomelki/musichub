function play(idPlayer, path, control) {
    var player = document.getElementById(idPlayer);
	player.src = path;
	player.play();
	
    /*if (player.paused) {
        player.play();
        //control.textContent = 'Pause';
    } else {
        player.pause();	
        //control.textContent = 'Play';
    }*/
}

