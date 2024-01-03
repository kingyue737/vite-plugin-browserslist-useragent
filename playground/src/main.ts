import { browsersRegex } from 'virtual:supported-browsers'

// if (browsersRegex.test(navigator.userAgent)) {
//   alert('Your browser is supported.')
// }

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    ${browsersRegex}
  </div>
`
