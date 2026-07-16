async function getsongs() {

    let a = await fetch("songs/songs.json")
    let response = await a.json()
    console.log(response)
    

    return response
}

async function main() {
    let currentsong = new Audio();
 let songs;
     songs = await getsongs()

    console.log(songs)

    const songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]    // this is kahali daba


    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li><img class ="invert" src="music-3-stroke-rounded.svg"> ${song}</li>`
        console.log(song)
    }





    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log("Clicked song: " + e.lastChild.textContent.trim())

            playmusic(e.lastChild.textContent.trim())

        })
    })



    function playmusic(thatsong) {
        console.log("songs/" + thatsong)
        currentsong.src = "songs/" + thatsong

        currentsong.play()
        play.src = "pause.svg"
        document.querySelector(".songinfo").innerHTML = thatsong

    }

    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "pause.svg"
        } else {
            currentsong.pause()

            play.src = "play.svg"

        }

    })









    function convert(time) {
        if(isNaN(time)){
            return "00:00"
        }
        const minutes = Math.floor(time / 60)
        const remainingseconds = Math.floor(time % 60)
        const formattedminutes = String(minutes).padStart(2, '0')
        const formattedseconds = String(remainingseconds).padStart(2, '0')
        return `${formattedminutes}:${formattedseconds}`;
    }
    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${convert(currentsong.currentTime)}/ ${convert(currentsong.duration)}`
        document.querySelector(".circle").style.left = currentsong.currentTime / currentsong.duration * 100 + "%"
    })
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = e.offsetX / e.target.getBoundingClientRect().width * 100
        document.querySelector(".circle").style.left = percent + "%"
        currentsong.currentTime = ((currentsong.duration) * percent) / 100
    })

    //play previous
    previous.addEventListener("click", () => {
        console.log("previous clicked")
        console.log(songs)
        console.log(currentsong.src)
        console.log(currentsong.src.split("/").slice(-1)[0])
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if(index > 0)
        playmusic(songs[index -1])
         console.log(songs , index)
    })

    //play next
    next.addEventListener("click", () => {
         let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
         if(index < songs.length - 1){ playmusic(songs[index +1])}
       
    })

}
main()

