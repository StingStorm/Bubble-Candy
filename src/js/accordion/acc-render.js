import faq from './accordion-data.json';

const accThumb = document.querySelector('.accordion-thumb');

export function renderAccordions() {
  const murkup = faq
    .map(item => {
      return `<li class="accordion-wrapper">
        <button class="accordion" type="button">
          <p>${item.question}</p>
          <svg width="24" height="24">
            <use
              class="accordion-chevron-down"
              href="/assets/sprite.svg#icon-ChevronDown"
            ></use>
          </svg>
        </button>
        <div class="panel">
          <p>${item.answer}</p>
        </div>
      </li>`;
    })
    .join('');

  accThumb.innerHTML = murkup;
}
