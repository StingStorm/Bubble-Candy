const mybutton = document.querySelector('.float-btn-link');

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    (document.body.scrollTop > 650 ||
      document.documentElement.scrollTop > 650) &
    (window.innerWidth <= 1199)
  ) {
    mybutton.style.display = 'flex';
  } else {
    mybutton.style.display = 'none';
  }
}
