"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const MUSIC_APP_STORAGE = "MUSIC_APP_STORAGE";

const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const nextBtn = $(".btn.btn-next");
const prevBtn = $(".btn.btn-prev");
const randomBtn = $(".btn.btn-random");
const repeatBtn = $(".btn.btn-repeat");
const playList = $(".playlist");

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    arrSongPlayed: [],
    config: JSON.parse(localStorage.getItem(MUSIC_APP_STORAGE)) || {},
    setConfig: function(key,value) {
        this.config[key] = value;
        localStorage.setItem(MUSIC_APP_STORAGE, JSON.stringify(this.config));
    },
    songs: [
        {
            name: "Click Pow Get Down",
            singer: "Raftaar x Fortnite",
            path: "./mp3/Anh-Da-Quen-Voi-Co-Don-Soobin-Hoang-Son.mp3",
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg",
        },
        {
            name: "Tu Phir Se Aana",
            singer: "Raftaar x Salim Merchant x Karma",
            path: "./mp3/Gui-Anh-Xa-Nho-Bich-Phuong.mp3",
            image: "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg",
        },
        {
            name: "Naachne Ka Shaunq",
            singer: "Raftaar x Brobha V",
            path: "./mp3/Nhu-Phut-Ban-Dau-Noo-Phuoc-Thinh.mp3",
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg",
        },
        {
            name: "Mantoiyat",
            singer: "Raftaar x Nawazuddin Siddiqui",
            path: "./mp3/Anh-Da-Quen-Voi-Co-Don-Soobin-Hoang-Son.mp3",
            image: "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg",
        },
        {
            name: "Aage Chal",
            singer: "Raftaar",
            path: "./mp3/Gui-Anh-Xa-Nho-Bich-Phuong.mp3",
            image: "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg",
        },
        {
            name: "Damn",
            singer: "Raftaar x kr$na",
            path: "./mp3/Anh-Da-Quen-Voi-Co-Don-Soobin-Hoang-Son.mp3",
            image: "https://pbs.twimg.com/profile_images/1647507627801456640/kOnn5wxT_400x400.jpg",
        },
        {
            name: "Feeling You",
            singer: "Raftaar x Harjas",
            path: "./mp3/Anh-Da-Quen-Voi-Co-Don-Soobin-Hoang-Son.mp3",
            image: "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp",
        },
        {
            name: "Anh đã quen với cô đơn",
            singer: "Soobin Hoàng Sơn",
            path: "./mp3/Anh-Da-Quen-Voi-Co-Don-Soobin-Hoang-Son.mp3",
            image: "https://img.freepik.com/free-photo/puppy-that-is-walking-snow_1340-37228.jpg",
        },
        {
            name: "Gửi anh xa nhớ",
            singer: "Bích Phương",
            path: "./mp3/Gui-Anh-Xa-Nho-Bich-Phuong.mp3",
            image: "https://thumbs.dreamstime.com/b/dog-listening-big-ear-27392035.jpg",
        },
        {
            name: "Click Pow Get Down",
            singer: "Raftaar x Fortnite",
            path: "./mp3/Anh-Da-Quen-Voi-Co-Don-Soobin-Hoang-Son.mp3",
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg",
        },
        {
            name: "Tu Phir Se Aana",
            singer: "Raftaar x Salim Merchant x Karma",
            path: "./mp3/Gui-Anh-Xa-Nho-Bich-Phuong.mp3",
            image: "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg",
        },
        {
            name: "Naachne Ka Shaunq",
            singer: "Raftaar x Brobha V",
            path: "./mp3/Nhu-Phut-Ban-Dau-Noo-Phuoc-Thinh.mp3",
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg",
        },
        {
            name: "Mantoiyat",
            singer: "Raftaar x Nawazuddin Siddiqui",
            path: "./mp3/Anh-Da-Quen-Voi-Co-Don-Soobin-Hoang-Son.mp3",
            image: "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg",
        },
        {
            name: "Aage Chal",
            singer: "Raftaar",
            path: "./mp3/Gui-Anh-Xa-Nho-Bich-Phuong.mp3",
            image: "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg",
        },
        {
            name: "Damn",
            singer: "Raftaar x kr$na",
            path: "./mp3/Anh-Da-Quen-Voi-Co-Don-Soobin-Hoang-Son.mp3",
            image: "https://pbs.twimg.com/profile_images/1647507627801456640/kOnn5wxT_400x400.jpg",
        },
        {
            name: "Feeling You",
            singer: "Raftaar x Harjas",
            path: "./mp3/Anh-Da-Quen-Voi-Co-Don-Soobin-Hoang-Son.mp3",
            image: "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp",
        },
        {
            name: "Anh đã quen với cô đơn",
            singer: "Soobin Hoàng Sơn",
            path: "./mp3/Anh-Da-Quen-Voi-Co-Don-Soobin-Hoang-Son.mp3",
            image: "https://img.freepik.com/free-photo/puppy-that-is-walking-snow_1340-37228.jpg",
        },
        {
            name: "Gửi anh xa nhớ",
            singer: "Bích Phương",
            path: "./mp3/Gui-Anh-Xa-Nho-Bich-Phuong.mp3",
            image: "https://thumbs.dreamstime.com/b/dog-listening-big-ear-27392035.jpg",
        },
    ],

    handleEvent: function () {
        // Event rotate thumb
        const animateThumb = cdThumb.animate(
            [
                {
                    transform: "rotate(360deg)",
                },
            ],
            {
                duration: 10000,
                iterations: Infinity,
            }
        );

        animateThumb.pause();

        // xử lý khi scroll
        const cdWidth = cd.offsetWidth;
        document.onscroll = () => {
            const scrollTop =
                window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        };

        // xử lý khi play
        playBtn.onclick = function () {
            app.isPlaying = !app.isPlaying;
            if (app.isPlaying) {
                audio.play();
            } else {
                audio.pause();
            }

            // change time-update
            audio.ontimeupdate = function () {
                if (audio.duration) {
                    const progressPercent = Math.floor(
                        (audio.currentTime / audio.duration) * 100
                    );
                    progress.value = progressPercent;
                }
            };

            // change progress
            progress.onchange = function (e) {
                const seek = (e.target.value / 100) * audio.duration;
                audio.currentTime = seek;
            };
        };

        // xu ly next song
        nextBtn.onclick = function () {
            if (app.isRandom) {
                app.randomSong();
            } else {
                app.nextSong();
                app.arrSongPlayed = [];
            }
            audio.play();
            app.isPlaying = true;
        };

        // xu ly prev song
        prevBtn.onclick = function () {
            if (app.isRandom) {
                app.randomSong();
            } else {
                app.prevSong();
                app.arrSongPlayed = [];
            }
            audio.play();
            app.isPlaying = true;
        };

        // xu ly random song
        randomBtn.onclick = function (e) {
            app.isRandom = !app.isRandom;
            app.setConfig('isRandom', app.isRandom);
            this.classList.toggle("active", app.isRandom);
        };

        // xu ly repeat bai hat
        repeatBtn.onclick = function () {
            app.isRepeat = !app.isRepeat;
            app.setConfig('isRepeat', app.isRepeat);
            this.classList.toggle("active", app.isRepeat);
        };

        // // xu ly next song when end
        audio.onended = function () {
            if (app.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        };

        audio.onplay = function () {
            animateThumb.play();
            player.classList.add("playing");
        };

        audio.onpause = function () {
            animateThumb.pause();
            player.classList.remove("playing");
        };

        playList.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)');
            if (songNode || e.target.closest('.option')) {
                if (songNode && !e.target.closest('.option')) {
                    app.currentIndex = Number(songNode.dataset.index);
                    app.activeSong();
                    app.scrollSongInToView();
                    app.loadCurrentSong();
                    audio.play();
                }

                if (e.target.closest('.option') && !songNode) {
                } 
            }
        };
    },

    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },

    // load config
    loadConfig: function () {
        this.isRepeat = this.config.isRepeat;
        this.isRandom = this.config.isRandom;
    },

    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `<div class="song"  data-index="${index}">
                        <div class="thumb" style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
                `;
        });
        playList.innerHTML = htmls.join("");
    },

    loadCurrentSong: function () {
        heading.innerHTML = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
        $$(".song")[this.currentIndex].classList.add("active");
    },

    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.activeSong();
        this.scrollSongInToView();
        this.loadCurrentSong();
    },

    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.activeSong();
        this.scrollSongInToView();
        this.loadCurrentSong();
    },

    randomSong: function (e) {
        let newIndex;
        if (this.arrSongPlayed.length === this.songs.length) {
            this.arrSongPlayed = [];
        }
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (
            newIndex === this.currentIndex ||
            this.arrSongPlayed.includes(newIndex)
        );
        this.currentIndex = newIndex;
        this.arrSongPlayed.push(newIndex);
        this.activeSong();
        this.scrollSongInToView();
        this.loadCurrentSong();
    },

    activeSong: function () {
        $(".song.active").classList.remove("active");
        $$(".song")[this.currentIndex].classList.add("active");
    },

    scrollSongInToView: function () {
        setTimeout(function () {
            $(".song.active").scrollIntoView({
                behavior: 'smooth',
                block: "end", 
                inline: "nearest" 
            });
        }, 500)
    },

    start: function () {
        this.loadConfig();
        this.defineProperties();
        this.handleEvent();
        this.render();
        this.loadCurrentSong();

        // active actions
        randomBtn.classList.toggle("active", app.isRandom);
        repeatBtn.classList.toggle("active", app.isRepeat);
    },
};

app.start();
