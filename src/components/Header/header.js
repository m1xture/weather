/**========================================================================
 *                           MENU BURGER
 *========================================================================**/ 
(() => {
    const refs = {
      openModalBtn: document.querySelector('[data-mobile-open]'),
      closeModalBtn: document.querySelector('[data-mobile-close]'),
      modal: document.querySelector('[data-mobile]'),
    };
  
    refs.openModalBtn.addEventListener('click', toggleModal);
    refs.closeModalBtn.addEventListener('click', toggleModal);
  
    function toggleModal() {
      document.body.classList.toggle('modal-open');
      refs.modal.classList.toggle('is-hidden');
    }
  })();
  

// Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.

// function fixedHeader() {
//     const nav = document.querySelector('.header')

    // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
    // const breakpoint = 1
//     if (window.scrollY >= breakpoint) {
//         nav.classList.add('fixed')
//     } else {
//         nav.classList.remove('fixed')
//     }
// }
// window.addEventListener('scroll', fixedHeader)
