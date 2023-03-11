(function () {

  /**
   * Dark, Light, Psycodelic Mode switcher
   */

  const body = document.querySelector('body');

  document.getElementById('toggle-button2').addEventListener('click', () => {
    document.documentElement.setAttribute('data-bs-theme', 'dark')
    body.setAttribute('class', 'dark-theme');
  })

  document.getElementById('toggle-button').addEventListener('click', () => {
    document.documentElement.setAttribute('data-bs-theme', 'light')
    body.setAttribute('class', 'light-theme');
  })

  document.getElementById('toggle-button3').addEventListener('click', () => {
    document.documentElement.setAttribute('data-bs-theme', 'light')
    body.setAttribute('class', 'psycodelic-theme');
  })

})()