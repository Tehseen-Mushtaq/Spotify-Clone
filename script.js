let currFolder;

async function getsongs(folder) {
    currFolder = folder;
    let a = await fetch(`songs/${currFolder}/songs.json`)
    let response = await a.json()



    return response
}

async function main() {
    let currentsong = new Audio();
    let songs;
    songs = await getsongs("playlist1")




    //show songs in sidebar
    function rendersongs() {
        const songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]    // this is kahali daba
        songul.innerHTML = ""
        for (const song of songs) {
            songul.innerHTML = songul.innerHTML + `<li><img class ="invert" src="music-3-stroke-rounded.svg"> ${song}</li>`

        }
        //attach event listner to each song to play song
        Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
            e.addEventListener("click", element => {


                playmusic(e.lastChild.textContent.trim())
            })
        })
    }
    rendersongs()




    function playmusic(thatsong) {

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

        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if (index > 0)
            playmusic(songs[index - 1])

    })

    //play next
    next.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if (index < songs.length - 1) { playmusic(songs[index + 1]) }

    })

    // volume
    document.querySelector(".volume").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentsong.volume = parseInt(e.target.value) / 100
        if (currentsong.volume > 0) {
           document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
        }
    })

    //update album info based on info json in playlist and cover image
    async function displayAlbum() {
        let a = await fetch("playlist.json")
        let responseplaylist = await a.json()

        for (const eachlist of responseplaylist) {

            let dfolder = eachlist  //not necessary lol
            let b = await fetch(`songs/${dfolder}/info.json`)
            let response = await b.json()


            cardcontainer = document.querySelector(".cardcontainer")

            cardcontainer.innerHTML = cardcontainer.innerHTML + `  <div data-folder= ${dfolder}   class="card">
                <img src=songs/${dfolder}/cover.jpg alt="">
                <h2>${response.title}</h2>
                <p>${response.description}</p>
            </div>`

        }
        //load songs based on playlists
        Array.from(document.querySelectorAll(".card")).forEach(e => {
            e.addEventListener("click", async item => {

                songs = await getsongs(`${item.currentTarget.dataset.folder}`)
                rendersongs()
            })
        })
    }
    displayAlbum()






    // mute 
    document.querySelector(".volume>img").addEventListener("click", (e) => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            document.querySelector(".volume").getElementsByTagName("input")[0].value = 0
            currentsong.volume = 0
        } else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            document.querySelector(".volume").getElementsByTagName("input")[0].value = 10
            currentsong.volume = .10

        }
    })



}
main()

