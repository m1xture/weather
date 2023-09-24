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
// const heroRef = document.querySelector(".hero");
// const changeImgRef = document.querySelector(".header__btn-bg");
// const imgsArr = ["../../img/bg1.jpg", "../../img/bg2.jpg"];
// changeImgRef.addEventListener("click", () => {
//   const min = 0;
//   const max = imgsArr.length - 1;
//   const idx = Math.round(Math.random() * (max - min) + min);
//   const img = imgsArr[idx];
//   heroRef.style.backgroundImage = `url(${img})`;
// });
