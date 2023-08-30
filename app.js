"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');

const app = {
    currentIndex: 0,
    isPlaying: false,
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
    ],

    handleEvent: function () {
        // Event rotate thumb
        const animateThumb = cdThumb.animate([{
            transform: 'rotate(360deg)'
        }],{
            duration: 10000,
            iterations: Infinity,
        });

        animateThumb.pause()

        // xử lý khi scroll
        const cdWidth = cd.offsetWidth;
        document.onscroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // xử lý khi play
        playBtn.onclick = function () {
            app.isPlaying = !app.isPlaying;
            if (app.isPlaying) {   
                audio.play();
            } else {
                audio.pause();
            }

            audio.onplay = function () {
                animateThumb.play();
                player.classList.add("playing");
            }

            audio.onpause = function () {
                animateThumb.pause();
                player.classList.remove("playing");
            }

            // change time-update
            audio.ontimeupdate = function(){
                if (audio.duration) {
                    const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
                }
            }

            // change progress
            progress.onchange = function(e) {
                const seek = e.target.value / 100 * audio.duration;
                console.log(seek);
                audio.currentTime = seek;
            }
           
        }
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        });
    },

    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `<div class="song">
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
        $(".playlist").innerHTML = htmls.join("");
    },

    loadCurrentSong: function() {
        heading.innerHTML = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    start: function () {
        this.defineProperties()
        this.handleEvent();
        this.render();
        this.loadCurrentSong();
    },
};

app.start();
