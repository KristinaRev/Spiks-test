const sortByBtn = document.querySelector('.sort-by')
const sortByFilters = document.querySelector('.sort-by-list')

sortByBtn.addEventListener('click', function () {
  sortByFilters.classList.toggle('hidden')
})

document.addEventListener('DOMContentLoaded', function() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]')
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      let selectedItems = [];
      const selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked')
      selectedCheckboxes.forEach(function(selectedCheckbox) {
        selectedItems.push(selectedCheckbox.parentNode.textContent)
      });

      const selectedItemsContainer = document.getElementById('selected-items')
      selectedItemsContainer.innerHTML = ''
      selectedItems.forEach(function(item) {
        const div = document.createElement('div')
        div.classList.add('results-filter-item');
        const span = document.createElement('span')
        span.textContent = item
        const button = document.createElement('button')
        button.classList.add('close-btn');
        button.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.075 14.7095C11.8443 14.7095 14.9 11.6538 14.9 7.88448C14.9 4.11514 11.8443 1.05948 8.075 1.05948C4.30566 1.05948 1.25 4.11514 1.25 7.88448C1.25 11.6538 4.30566 14.7095 8.075 14.7095Z" fill="#58AA46" fill-opacity="0.9"/>
            <path d="M10.25 5.55948L8 7.80948M8 7.80948L5.75 10.0595M8 7.80948L5.75 5.55948M8 7.80948L10.25 10.0595M14.9 7.88448C14.9 11.6538 11.8443 14.7095 8.075 14.7095C4.30566 14.7095 1.25 11.6538 1.25 7.88448C1.25 4.11514 4.30566 1.05948 8.075 1.05948C11.8443 1.05948 14.9 4.11514 14.9 7.88448Z" stroke="white" stroke-linecap="round"/>
          </svg>
        `
        button.addEventListener('click', function() {
          div.remove();
          checkbox.checked = false
        })
        div.appendChild(span)
        div.appendChild(button)
        selectedItemsContainer.appendChild(div)
      })
    })
  })

  const sliders = document.querySelectorAll('.range-slider')
  const valueElements = document.querySelectorAll('.slider-value')

  sliders.forEach((slider, index) => {
    slider.addEventListener('input', function () {
      const value = this.value
      valueElements[index].textContent = value
      updateSliderBackground(this)
      updateSliderValuePosition(this, valueElements[index])
    });

    updateSliderBackground(slider)
    updateSliderValuePosition(slider, valueElements[index])
  });
})

function updateSliderBackground(slider) {
  const min = slider.min
  const max = slider.max
  const val = slider.value

  const percentage = ((val - min) / (max - min)) * 100

  slider.style.backgroundSize = `${percentage}% 100%`
}

function updateSliderValuePosition(slider, valueElement) {
  const thumbWidth = 20;
  const trackWidth = slider.offsetWidth - thumbWidth
  const percentage = ((slider.value - slider.min) / (slider.max - slider.min)) * 100
  const position = (percentage / 100) * trackWidth + thumbWidth / 2

  valueElement.style.left = `${position}px`
}
