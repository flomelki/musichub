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

function filterByGenre(genre)
{
    var musicList = document.getElementById('musicList');
	for(i = 0; i < musicList.children.length; i++)
	{
		if (musicList.children[i].children[0].innerHTML != genre)
		{
			musicList.children[i].style.display = "none"
		}
		else
		{
			musicList.children[i].style.display = ""
		}
	}
}