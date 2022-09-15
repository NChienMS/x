
 function verify(){if (document.querySelector('#password').value === 'Chien908218'){document.querySelector('.sonblogloginwrap').classList.add('hidden');window.open("internal.html","_self");}

else{alert('Cảnh báo! Yếu thì đừng ra gió :)');password.setSelectionRange(0,password.value.length)}

return false}

  const show = () => {

  let password = document.querySelector('#password');

  let sandi = document.querySelector('.icon1');

  if (password.type === 'password') {

    password.type = 'text';

    sandi.style.color = '#16537E';

  } else {

    password.type = 'password';

    sandi.style.color = '#fff';

  }

};


 
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.characters = 'posapp16041998'
    this.x = x
    this.y = y
    this.fontSize = fontSize
    this.text = ''
    this.canvasHeight = canvasHeight
  }
  draw(ctx) {
    let colors = ['red']
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length),
    )
    ctx.fillStyle = 'red'
    ctx.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize)
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.9) {
      this.y = 0
    } else {
      this.y += 1
    }
  }
}

class Effect {
  constructor(canasWidth, canvasHeight) {
    this.canvasWidth = canasWidth
    this.canvasHeight = canvasHeight
    this.fontSize = 12
    this.columns = this.canvasWidth / this.fontSize
    this.symbols = []
    this.#initialize()
  }

  #initialize() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight)
    }
  }
}

const effect = new Effect(canvas.width, canvas.height)

function animate() {
  ctx.fillStyle = 'rgba(0,0,0,0.05)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.font = effect.fontSize + 'px monospace'
  effect.symbols.forEach((symbol) => symbol.draw(ctx))
  requestAnimationFrame(animate)
}

console.log('hir')
animate()
