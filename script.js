async function getsongs() {

    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text()
    // console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")


    let songs = []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];


        if (element.href.endsWith("mp3")) {
            songs.push(element.href)


        }
    }

    return songs
}

async function main() {
    let currentsong = new Audio();

    let songs = await getsongs()

    console.log(songs)

    const songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]    // this is kahali daba


    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li><img class ="invert" src="music-3-stroke-rounded.svg"> ${song.replaceAll("%20", "").replaceAll("#", "%20").replaceAll("%20", "").split("songs%5C")[1]}</li>`
        console.log(song)
    }





    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.lastChild.textContent.trim())

            playmusic(e.lastChild.textContent.trim())

        })
    })



    function playmusic(thatsong) {
        console.log("/songs/" + thatsong)
        currentsong.src = "/songs/" + thatsong

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
    })

    //play next
    next.addEventListener("click", () => {
        console.log("next clicked")
    })

}
main()

