* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;

}

   

html {
    font-size: 62.5%;
    line-height: 1.625rem;
    height: 100%;
    scroll-behavior: smooth;

}
#content {
  margin-left:15%;
  width:500px;
  text-align:left;
}
#hint {
  color:#666;
  margin-left:15%;
  width:300px;
  text-align:left;
  margin-top:3em;
}

:root {
    --white-color: #fff;
    --bg-main: #FFF0F5;
    --bg-dark: #303234;
    --primary-color: #31344b;
    --text-color: #777777;
    --text-color-dark: #B0B3B8;
    --blue-color: #1877f2;
    --blue-color-2: #e9f5ff;
    --outer-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15),
        -6px -6px 10px -1px rgba(255, 255, 255, 0.7);
    --outer-shadow-o: 6px 6px 10px -1px rgba(0, 0, 0, 0.15),
        -6px -6px 10px -1px rgba(255, 255, 255, 0.7), inset 6px 6px 10px -1px rgba(0, 0, 0, 0.15),
       inset -6px -6px 10px -1px rgba(255, 255, 255, 0.7)
       ;
    --outer-shadow-dark: 6px 6px 10px -1px rgba(0, 0, 0, 0.3),
        -6px -6px 10px -1px rgba(255, 255, 255, 0.1);
    --outer-shadow-dark-o: 6px 6px 10px -1px rgba(0, 0, 0, 0.3),
        -6px -6px 10px -1px rgba(255, 255, 255, 0.1), inset 6px 6px 10px -1px rgba(0, 0, 0, 0.3),
       inset -6px -6px 10px -1px rgba(255, 255, 255, 0.1);
    --icon-fb: #4267B2;
    --icon-insta: #FB3958;
    --icon-github: #333;
    --icon-youtube: #FF0000;
    --icon-tiktok: #000;
}

#myInput{
display:none
}
#myInput2{
display:none
}

.app {
    width: 100%;
    height: 100vh;
    background-attachment: fixed;
    background: var(--bg-main);
    transition: all .3s linear;
    -moz-transition: all .3s linear;
    -webkit-transition: all .3s linear;
    -o-transition: all .3s linear;
}
.app.dark {
    background: var(--bg-dark);
}

.card {
    position: fixed;
    max-width: 350px;
    height: fit-content;
    display: flex;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 12px;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background: var(--white-color);
    border-radius: 7px;
    background: var(--bg-main);
    box-shadow: var(--outer-shadow);
    transition: all .3s linear;
    -moz-transition: all .3s linear;
    -webkit-transition: all .3s linear;
    -o-transition: all .3s linear;
}

.app.dark .card::after {
    transform: scale(1.01);
    border-radius: 7px;
}
.app.dark .card {
    background: var(--bg-dark);
    box-shadow: var(--outer-shadow-dark);
}
.card__title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.card__title--img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: var(--outer-shadow);
    border: 5px solid var(--bg-main);
    transition: all .3s linear;
    -moz-transition: all .3s linear;
    -webkit-transition: all .3s linear;
    -o-transition: all .3s linear;
}

.app.dark .card__title--img {
    border: 5px solid var(--bg-dark);
    box-shadow: var(--outer-shadow-dark);
}
.card__title--img img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}
.card__title--name {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 15px;
}
.card__title--name h1 {
    position: relative;
    color: var(--primary-color);
    font-size: 2.2rem;
    font-weight: 600;
    line-height: 2.2rem;
    text-align: center;
    
}
.app.dark .card__title--name h1 {
    color: var(--white-color);
}
.card__title--name .veri__check {
    position: absolute;
    width: 20px;
    height: 20px;
    left: 100%;
    top: 0;
    bottom: 0;
    margin: auto;
    
    
    text-align: center;
    border-radius: 50%;
    margin-left: 5px;
    cursor: pointer;
}
.veri__check .fas {
    line-height: 18px;
    font-size: 1.1rem;
}
.card__title--description {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -5px;
    font-size: 9px;
}




.card__title--description p {
    position: relative;
    text-align: center;
    font-size: 1.8rem;
    font-weight: 400;
    color: var(--text-color);
    line-height: 1.8rem;
}

.app.dark .card__title--description p {
    color: var(--text-color-dark);
}
.mt-10 {
    margin-top: 10px;
}
.mb-10 {
    margin-bottom: 10px;
}

.card__body {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.row {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-left: -5px;
    margin-right: -5px;
    justify-content: center;
}
.col {
    width: 100%;
    position: relative;
    padding-left: 5px;
    padding-right: 5px;
}
.col-lg-3 {
    display: flex;
    justify-content: center;
    flex: 0 0 25%;
    max-width: 25%;
}
.card__item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid var(--bg-main);
    width: 50px;
    height: 50px;
    background: var(--bg-main);
    box-shadow: var(--outer-shadow);
    border-radius: 50%;
    transition: all .3s ease 0s;
    -moz-transition: all .3s ease 0s;
    -webkit-transition: all .3s ease 0s;
    -o-transition: all .3s ease 0s;
    overflow: hidden;
    cursor: pointer;
}
.card__item__stk {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid var(--bg-main);
    width: 1000px;
    height: 50px;
    background: var(--bg-main);
    box-shadow: var(--outer-shadow);
    border-radius: 50%;
    transition: all .3s ease 0s;
    -moz-transition: all .3s ease 0s;
    -webkit-transition: all .3s ease 0s;
    -o-transition: all .3s ease 0s;
    overflow: hidden;
    cursor: pointer;
}

.app.dark .card__item {
    background: var(--bg-dark);
    box-shadow: var(--outer-shadow-dark);
    border: 2px solid var(--bg-dark);
}

.card__item:hover {
    box-shadow: var(--outer-shadow-dark-o);
}



.app.dark .card__item:hover {
    box-shadow: var(--outer-shadow-dark-o);
}

.card__link {
    position: relative;
    text-decoration: none;
}

.link__icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--blue-color);

}
.link__icon3 {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: red;
    font-size: 30px;
}
.link__icon2 {
    float: left;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--blue-color);

}

.link__icon .fab {
    font-size: 2.5rem;
}
.link__icon .fa-github {
    color: var(--icon-github);
}
.app.dark .link__icon .fa-tiktok,
.app.dark .link__icon .fa-github {
    color: var(--bg-main);
}

.link__icon .fa-instagram {
    background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 70%,#285AEB 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.link__icon .fa-tiktok {
    color: var(--icon-tiktok);
}
.abc{
    
}

.toggle {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    content: "";
    width: 35px;
    height: 35px;
    top: 20px;
    border-radius: 50%;
    color: var(--primary-color);
    box-shadow: var(--outer-shadow);
    border: 2px solid var(--bg-main);
    cursor: pointer;
    transition: all .3s linear;
    -moz-transition: all .3s linear;
    -webkit-transition: all .3s linear;
    -o-transition: all .3s linear;
}
.toggle__theme {
    right: 20px;
}

.app.dark .toggle {
    color: var(--bg-main);
    border: 2px solid var(--bg-dark);
}
.toggle__theme:hover, .toggle__back:hover {
    box-shadow: var(--outer-shadow-o);
}

.app.dark .toggle__theme, .app.dark .toggle__back {
    box-shadow: var(--outer-shadow-dark);
}

.app.dark .toggle__theme:hover,
.app.dark .toggle__back:hover {
    box-shadow: var(--outer-shadow-dark-o);
}

.toggle__theme .fas,
.toggle__back .fas {
    font-size: 2rem;
}
.toggle__back {
    left: 20px;
}

.button__list {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}
.button {
    width: 150px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 20px;
    text-align: center;
    background: var(--bg-main);
    box-shadow: var(--outer-shadow);
    color: var(--text-color);
    border: 2px solid var(--bg-main);
    font-size: 1.8rem;
    font-weight: 400;
    border-radius: 7px;
    transition: all .3s linear;
    -moz-transition: all .3s linear;
    -webkit-transition: all .3s linear;
    -o-transition: all .3s linear;
    cursor: pointer;
}

.app.dark .button {
    background: var(--bg-dark);
    box-shadow: var(--outer-shadow-dark);
    color: var(--text-color-dark);
    border: 2px solid var(--bg-dark);
}
.button:hover {
    box-shadow: var(--outer-shadow-o);
    color: var(--blue-color) !important;
}
.app.dark .button:hover {
    box-shadow: var(--outer-shadow-dark-o);
}
.col-lg-6 {
    flex: 0 0 50%;
    max-width: 50%;
}

.card__footer {
    position: relative;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    width: 100%;
}
.card__footer .footer__item {
    font-size: 14px;
    display: flex;
    align-content: center;
    justify-content: center;
    margin-top: 10px;
    cursor: pointer;
    
}
.card__footer .footer__item:nth-child(1), 
.card__footer .footer__item:nth-child(2) {
  
}
.footer__item span {
    font-size: 1rem;
    color: var(--text-color);
    transition: all .3s ease;
    -moz-transition: all .3s ease;
    -webkit-transition: all .3s ease;
    -o-transition: all .3s ease;
}
.app.dark .footer__item span {
    color: var(--text-color-dark);
}
.card__footer .footer__item:nth-child(1):hover span, .card__footer .footer__item:nth-child(2):hover span, .card__footer .footer__item:nth-child(3):hover span {
    color: var(--blue-color);
}

.footer__item span .fa, 
.footer__item span .fas {
    margin-right: 5px;
}
@media screen and (max-width: 370px) {
    .mg-10 {
    margin: auto 10px;
    }

}
a 
{ 
    text-decoration: none;
    color: inherit; 
} 

.popupS {
display: none;
position: fixed;
padding-top: 50px;
left: 0;
top: 0;
width: 100%;
height: 100%;
background-color: rgb(0, 0, 0);
background-color: rgba(0, 0, 0, 0.5);
}
.popup-contentS {
position: relative;
background-color: #FAFAFA;
padding: 15px;
margin: auto;
width: 70%;
}
.close-btnS {
float: right;
color: #2E2E2E;
font-size: 25px;
font-weight: 700;
}
.close-btnS:hover {
color: #D2D2D2;
}
p {
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.5px;
    color: #484848;
}
/* Button mở popup */   
.open-button{
    color:#FFF;
    background:#0066CC;
    padding:10px;
    text-decoration:none;
    border:1px solid #0157ad;
    border-radius:3px;
}
.open-button:hover{
    background:#01478e;
}

.tieude{
    padding: 10px;
    width: 100%;
    font-size: 18px;
    background-color: #F8F8FF;
    text-align: center;
    box-shadow: 0px 2px 2px #AAA;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
 

}
.text_ck{
    padding-top: 10px;
    padding-left: 5%;
    padding-bottom: 10px;
    font-size: 16px;
    color: red;
    font-weight: bold;
   
}
.button_copy{
   float: right;
   margin-top: -30px;
   margin-right: 10px;
   border-radius: 5px;
}
.card__copy{
    border-radius: 5px;
    padding: 3px;
    border-width: 1px;
}

.popup {
    z-index: 10;
    position:fixed;
    top:0px;
    left:0px;
    background:rgba(0,0,0,0.80);
    width:100%;
    height:100%;
    display:none;
}
/* Nội dung popup hello */
.popup2 {
    z-index: 1000;
    position:fixed;
    top:0px;
    left:0px;
    background:rgba(0,0,0,0.90);
    width:100%;
    height:100%;
   
}

/* Nội dung popup */
.popup-content {
    border-radius: 50px;
    width: 300px;
    margin: 0 auto;
    box-sizing: border-box;
    margin-top: 20%;
    box-shadow: 0px 2px 6px rgba(0,0,0,1);
    border-radius: 10px;
    background: #fff;
    position: relative;
    padding-bottom: 5px;
}
.popup-content2 {
    border-radius: 50px;
    width: 330px;
    height: 250px;
    margin: 0 auto;
    box-sizing: border-box;
    margin-top: 20%;
    box-shadow: 0px 2px 6px rgba(0,0,0,1);
    border-radius: 10px;
    background: #fff;
    position: relative;
    padding-bottom: 5px;
    background-size: contain;
}
/* Button đóng popup */
.close-button {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 0px;
    right: 0px;
    border-radius: 20px;
    font-size: 20px;
    text-align: center;
    color: black;
    text-decoration:none;
}
.close-button2 {
    
    border-radius: 5px;
    border-radius: 20px;
    font-size: 20px;
    text-align: center;
    color: black;
    text-decoration:none;
}
.hello_img{

    
}
.hello_text{
    margin: 10px 0 0 0;
    text-align: center;
    font-size: 14px;
    color: blue;
}

.close-button:hover {
    color: red;
}
 
@media screen and (max-width: 720px) {
.popup-content {
    width:90%;
    }   
}

.luta-tet-right{
position:fixed;
bottom: 0;
right:-20px;
z-index:100;
width:180px;/*kích thước câu đối bên phải, bạn có thể tăng hoặc giảm*/
}
/* ẩn banner khi kích thước màn hình nhỏ hơn 15 inch để tránh cho mất nội dung*/

}
/* Tuy chinh hieu ung roi*/
/*www.lutaweb.com*/
@-webkit-keyframes flowers-fall {
0% {top:-10%}
100% {top:100%}
}
@-webkit-keyframes flowers-shake {
0%,100% {-webkit-transform:translateX(0);transform:translateX(0)}
50% {-webkit-transform:translateX(80px);transform:translateX(80px)}
}
@keyframes flowers-shake {
0%,100%{ transform:translateX(0)}
50% {transform:translateX(80px)}
}
.flower {
height:auto;
width:20px;/*chinh kich thuoc hoa*/
text-shadow: 0 0 5px #000;
position:fixed;
top:-10%;
z-index:9999;

}

@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;1,500&display=swap');

span {
    font-size:20px;
    margin-right: 0px;
   
    transition:color 0.2s;
}

.change-properties{
    color:#fff;
    text-shadow:0px 0px 10px white,0px 0px 15px red,0px 0px 20px red;
}

/* menu âm nhạc/*/
.menu {height: auto;
}
.menu li{float: left; list-style: none; margin-right: 10px; padding: 10px 5px; width:80px;}
.menu li:hover .li_music{background:rgba(100,0,0,0.50);}
.menu li a{color: red; text-decoration: none}
.menu li ul li{display:none; width: auto; ;margin-top: -50px}
.menu li:hover ul li{display: block}






/*==================*/
@font-face{
    font-family:'Open Sans';
    font-style:normal;
    font-weight:400;
    src:local("Open Sans"),local("OpenSans"),url(http://themes.googleusercontent.com/static/fonts/opensans/v6/59ZRklaO5bWGqF5A9baEET8E0i7KZn-EPnyo3HZu7kw.woff) format("woff")}@font-face{font-family:'icomoon';
        src:url("fonts/icomoon.eot");
        src:url("fonts/icomoon.eot?#iefix") format("embedded-opentype"),url("fonts/icomoon.woff") format("woff"),url("fonts/icomoon.ttf") format("truetype"),url("fonts/icomoon.svg#icomoon") format("svg");
        font-weight:normal;font-style:normal}
.icon-volume-mute,.icon-play,.icon-pause,.icon-volume-high{
    color:#fff;
    font-family:'icomoon';
    speak:none;font-style:normal;
    font-weight:normal;
    font-variant:normal;
    text-transform:none;line-height:1;
    -webkit-font-smoothing:antialiased
}
.icon-volume-mute:before{content:"\e005"}
.icon-play:before{content:"\e006"}
.icon-pause:before{content:"\e007"}
.icon-volume-high:before{content:"\e002"}*,*:before,*:after{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0}


.container{max-width:60em;margin-left:auto;margin-right:auto}
nav{background-color:#288bc6;text-transform:uppercase;width:100%;font-size:0.75em;line-height:2.2em}
nav:after{content:"";display:table;clear:both}nav a{display:block;color:#fff;font-weight:700;padding:0 1em;letter-spacing:0.1em}
nav a:hover,nav a:focus{background-color:#5caede}
nav a:first-child{float:left}nav a:last-child{float:right}
.player{
    background-color:#fff;
    border:1px solid #47a3da;
    color:#fff;
    width:280px;
    height:15em;
    margin:auto;position:relative}
.player .player__loading{
    position:absolute;
    width:100%;top:0;bottom:0;text-align:center}
.player .player__loading>span{
    background-color:#71b8e3;
    display:inline-block;
    visibility:hidden;
    width:1em;
    height:100%;border-radius:3px 3px 0 0}
.player .player__loading>span.active{
    visibility:visible;
    -webkit-animation:loader 2.5s infinite;
    -o-animation:loader 2.5s infinite;
    animation:loader 2.5s infinite}
.player .player__loading>span.active:nth-child(1){
    -webkit-animation-delay:0.1s;
    -moz-animation-delay:0.1s;
    -o-animation-delay:0.1s;animation-delay:0.1s}
.player .player__loading>span.active:nth-child(2){
    -webkit-animation-delay:0.2s;
    -moz-animation-delay:0.2s;
    -o-animation-delay:0.2s;animation-delay:0.2s}
.player .player__loading>span.active:nth-child(3){
    -webkit-animation-delay:0.3s;
    -moz-animation-delay:0.3s;
    -o-animation-delay:0.3s;animation-delay:0.3s}
.player .player__loading>span.active:nth-child(4){
    -webkit-animation-delay:0.4s;
    -moz-animation-delay:0.4s;
    -o-animation-delay:0.4s;animation-delay:0.4s}
.player .player__loading>span.active:nth-child(5){
    -webkit-animation-delay:0.5s;
    -moz-animation-delay:0.5s;
    -o-animation-delay:0.5s;animation-delay:0.5s}
.player .player__loading>span.active:nth-child(6){
    -webkit-animation-delay:0.6s;
    -moz-animation-delay:0.6s;
    -o-animation-delay:0.6s;animation-delay:0.6s}
.player .player__loading>span.active:nth-child(7){-webkit-animation-delay:0.7s;-moz-animation-delay:0.7s;-o-animation-delay:0.7s;animation-delay:0.7s}
.player .player__loading>span.active:nth-child(8){-webkit-animation-delay:0.8s;-moz-animation-delay:0.8s;-o-animation-delay:0.8s;animation-delay:0.8s}
.player .player__loading>span.active:nth-child(9){-webkit-animation-delay:0.9s;-moz-animation-delay:0.9s;-o-animation-delay:0.9s;animation-delay:0.9s}
.player .player__loading>span.active:nth-child(10){-webkit-animation-delay:1s;-moz-animation-delay:1s;-o-animation-delay:1s;animation-delay:1s}
.player .player__loading>span.active:nth-child(11){-webkit-animation-delay:1.1s;-moz-animation-delay:1.1s;-o-animation-delay:1.1s;animation-delay:1.1s}
.player .player__loading>span.active:nth-child(12){-webkit-animation-delay:1.2s;-moz-animation-delay:1.2s;-o-animation-delay:1.2s;animation-delay:1.2s}
.player .player__loading>span.active:nth-child(13){-webkit-animation-delay:1.3s;-moz-animation-delay:1.3s;-o-animation-delay:1.3s;animation-delay:1.3s}
.player .player__loading>span.active:nth-child(14){-webkit-animation-delay:1.4s;-moz-animation-delay:1.4s;-o-animation-delay:1.4s;animation-delay:1.4s}
.player .player__loading>span.active:nth-child(15){-webkit-animation-delay:1.5s;-moz-animation-delay:1.5s;-o-animation-delay:1.5s;animation-delay:1.5s}
.player .player__loading>span.active:nth-child(16){-webkit-animation-delay:1.6s;-moz-animation-delay:1.6s;-o-animation-delay:1.6s;animation-delay:1.6s}
.player .player__loading>span.active:nth-child(17){-webkit-animation-delay:1.7s;-moz-animation-delay:1.7s;-o-animation-delay:1.7s;animation-delay:1.7s}
.player .player__loading>span.active:nth-child(18){-webkit-animation-delay:1.8s;-moz-animation-delay:1.8s;-o-animation-delay:1.8s;animation-delay:1.8s}
.player .player__loading>span.active:nth-child(19){-webkit-animation-delay:1.9s;-moz-animation-delay:1.9s;-o-animation-delay:1.9s;animation-delay:1.9s}
.player .player__loading>span.active:nth-child(20){-webkit-animation-delay:2s;-moz-animation-delay:2s;-o-animation-delay:2s;animation-delay:2s}
.player .player__loading>span.active:nth-child(21){-webkit-animation-delay:2.1s;-moz-animation-delay:2.1s;-o-animation-delay:2.1s;animation-delay:2.1s}
.player .player__loading>span.active:nth-child(22){-webkit-animation-delay:2.2s;-moz-animation-delay:2.2s;-o-animation-delay:2.2s;animation-delay:2.2s}
.player .player__loading>span.active:nth-child(23){-webkit-animation-delay:2.3s;-moz-animation-delay:2.3s;-o-animation-delay:2.3s;animation-delay:2.3s}
.player .player__loading>span.active:nth-child(24){-webkit-animation-delay:2.4s;-moz-animation-delay:2.4s;-o-animation-delay:2.4s;animation-delay:2.4s}
.player .player__control{background-color:#47a3da;position:absolute;width:100%;bottom:0;padding:1em}
.player .player--play{padding:0.2em;border:1px solid #fff;border-radius:50%}
.player .player--seek{
            -webkit-appearance:none;
            -moz-appearance:none;
            height:1px;width:30%;
            vertical-align:middle;display:inline-block;
            -webkit-box-shadow:0 1px 10px 0 rgba(255,255,255,0.8);
            -moz-box-shadow:0 1px 10px 0 rgba(255,255,255,0.8);
            box-shadow:0 1px 10px 0 rgba(255,255,255,0.8)
        }
.player input[type="range"]::-webkit-slider-thumb{
    -webkit-appearance:none;
    -moz-appearance:none;background-color:#fff;z-index:5;width:1em;height:1em;border-radius:50%;border:1px solid transparent;
    -webkit-box-shadow:0 1px 1px 0 rgba(255,255,255,0.8);-moz-box-shadow:0 1px 1px 0 rgba(255,255,255,0.8);box-shadow:0 1px 1px 0 rgba(255,255,255,0.8)}
.player button{background-color:transparent;border:0;vertical-align:middle;font-size:1.5em;cursor:pointer}
.player span{width:4em;text-align:center;display:inline-block;vertical-align:middle;margin:0 0.2em}
@keyframes loader{50%{height:0.5em;opacity:0.1}}
        @-webkit-keyframes loader{50%{height:0.5em;opacity:0.1}}@-moz-keyframes loader{50%{height:0.5em;opacity:0.1}}


/*loadding âm nhạ*/
#loading {

    z-index: 1;
    border-radius: 50%;
    width:60px;
    height: 60px;
    position:relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
}
.item1 {
    width:58px;
    height: 58px;
    border-radius: 50%;
    position:absolute;
    animation :ani1 10s infinite linear;
}



@keyframes ani1 {
    0%{
        transform:rotate(360deg)
    }
    100%{
        transform:rotate(0deg)
    }
    
}

@keyframes ani2 {
    0%{
        transform:rotate(0deg)
    }
    100%{
        transform:rotate(360deg)
    }
    
}

@keyframes ani3 {
    0%{
        transform:rotate(360deg)
    }
    100%{
        transform:rotate(0deg)
    }
    
}
