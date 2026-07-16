let currFolder;

async function getsongs(folder) {
    currFolder = folder;
    let a = await fetch(`songs/${folder}/songs.json`)
    let response = await a.json()
    console.log(response)


    return response
}

async function main() {
    let currentsong = new Audio();
    let songs;
    songs = await getsongs("playlist1")

    console.log(songs)


    //show songs in sidebar
    function rendersongs(){
         const songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]    // this is kahali daba
    songul.innerHTML =""
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li><img class ="invert" src="music-3-stroke-rounded.svg"> ${song}</li>`
        console.log(song)
    }
    //attach event listner to each song to play song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log("Clicked song: " + e.lastChild.textContent.trim())

            playmusic(e.lastChild.textContent.trim())
        })
    })
}
rendersongs()




    function playmusic(thatsong) {
        console.log("songs/" + thatsong)
        currentsong.src = "songs/" + `${currFolder}/` + thatsong

        currentsong.play()
        play.src = "pause.svg"
        document.querySelector(".songinfo").innerHTML = thatsong

    }


    //play button
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
        if (isNaN(time)) {
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
    //seekbar
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
        if (index > 0)
            playmusic(songs[index - 1])
        console.log(songs, index)
    })

    //play next
    next.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if (index < songs.length - 1) { playmusic(songs[index + 1]) }

    })

    // volume
    document.querySelector(".volume").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentsong.volume = parseInt(e.target.value) / 100
        console.log(e)
    })
   

    //load songs based on playlists
    Array.from(document.querySelectorAll(".card")).forEach(e => {
        e.addEventListener("click", async item => {

            songs = await getsongs(`${item.currentTarget.dataset.folder}`)
            rendersongs()
        })
    })







}
main()

