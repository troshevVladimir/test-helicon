import css from './style.css'
import reserStyle from './resetStyle.css'

async function getImg(src) {
  const img = await import(`./assets/${src}`)
  return img.default
}

function priceFormat(value) {
  return value.toLocaleString()
}


document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector('#app')
  let result = 0
  const summ = document.querySelector('#summ')
  async function createProduct({id, name, price, img}) {
    return `
    <div class="shop__product-card-wrapper">
      <article class="shop__product-card product-card">
        <header>
          <h2 class='product-card__title'>${name}</h2>
        </header>
        <section>
          <img class='product-card__img' src="${await getImg(img)}" alt="product">
          <p class='product-card__description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis rhoncus mi. Duis ultrices augue nunc, sit amet placerat ligula pretium vel. Aenean eget quam ante. Duis ipsum dui, euismod id tristique id, consectetur vitae enim. Nunc finibus consequat risus, vel tristique ex dapibus et. Proin tempus nulla quis erat blandit vehicula. Duis ipsum dui, euismod id tristique id, consectetur vitae enim. Aliquam quis rhoncus mi. </p>
          <strong class='product-card__price'>${priceFormat(price)} руб.</strong>
          <button class='product-card__btn btn' id="${id}">добавить в корзину</button>
        </section>
      </article>
    </div>
  `
  }
  const data = [
    {
        id: 1,
        name: 'Коптильня 10л',
        price: 1200,
        img: 'bravo-10.png'
    },
    {
        id: 2,
        name: 'Коптильня 20л',
        price: 1400,
        img: 'bravo-20.png'
    },
    {
        id: 3,
        name: 'Коптильня 30л',
        price: 1600,
        img: 'bravo-30.png'
    },
  ]

  Promise.all(data.map(el => {
    return createProduct(el)
  })).then(res => {
      return res.reduce((acc, cur) => {
        return acc += cur
      }, '')
    }).then(html => {
      app.innerHTML = html

      const buttons = document.querySelectorAll('.product-card__btn')
      buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          result += data.find(el => el.id === +e.target.id).price
          summ.innerHTML = priceFormat(result)
          e.target.classList.add('selected')
          e.target.textContent = 'ДОБАВЛЕНО'
        })
      })
    })
})