/**========================================================================
 *                           MENU BURGER
 *========================================================================**/
// (() => {
//     const refs = {
//       openModalBtn: document.querySelector('[data-mobile-open]'),
//       closeModalBtn: document.querySelector('[data-mobile-close]'),
//       modal: document.querySelector('[data-mobile]'),
//     };

//     refs.openModalBtn.addEventListener('click', toggleModal);
//     refs.closeModalBtn.addEventListener('click', toggleModal);

//     function toggleModal() {
//       document.body.classList.toggle('modal-open');
//       refs.modal.classList.toggle('is-hidden');
//     }
//   })();

// //! change bg
const heroRef = document.querySelector(".hero");
const changeImgRef = document.querySelector(".header__btn-bg");
const imgsArr = ["../../img/bg1.jpg", "../../img/bg2.jpg", "../../img/bg3.jpg"];
changeImgRef.addEventListener("click", () => {
  const min = 0;
  const max = imgsArr.length - 1;
  const idx = Math.round(Math.random() * (max - min) + min);
  const currentBgImage = heroRef.style.backgroundImage;

  const img = imgsArr[idx];
  if (currentBgImage) {
    // Якщо фонове зображення вже встановлене, видаляємо поточне зображення і встановлюємо нове
    heroRef.style.backgroundImage = `linear-gradient(
    180deg,
    rgba(8, 15, 26, 0.59) 0%,
    rgba(17, 17, 46, 0.46) 100%
  ), url(${img})`;
  } else {
    // Якщо фонового зображення ще немає, встановлюємо нове зображення
    heroRef.style.backgroundImage = `linear-gradient(
    180deg,
    rgba(8, 15, 26, 0.59) 0%,
    rgba(17, 17, 46, 0.46) 100%
  ), url(${img})`;
  }
  //   heroRef.style.backgroundImage = `linear-gradient(
  //   180deg,
  //   rgba(8, 15, 26, 0.59) 0%,
  //   rgba(17, 17, 46, 0.46) 100%
  // ), url(${img})`;
});
