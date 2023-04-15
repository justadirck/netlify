import { onCleanup, onMount } from 'solid-js'
import type { Component } from 'solid-js'
import * as bootstrap from 'bootstrap'

import cheatsheet from './cheatsheet.html.ts'

const App: Component = () => {

  function setActiveItem() {

    const { hash } = window.location
    console.log(hash)

    if (hash === '') {
      return
    }

    const link = document.querySelector(`.bd-aside a[href="${hash}"]`)

    if (!link) {
      return
    }

    const active = document.querySelector('.bd-aside .active')

    // @ts-ignore
    const parent = link.parentNode.parentNode.previousElementSibling

    link.classList.add('active')

    if (parent.classList.contains('collapsed')) {
      parent.click()
    }

    if (!active) {
      return
    }

    // @ts-ignore
    const expanded = active.parentNode.parentNode.previousElementSibling

    active.classList.remove('active')

    if (expanded && parent !== expanded) {
      expanded.click()
    }
  }

  onMount(() => {
    console.log('onmount')

    // tooltips
    window.document.querySelectorAll('.tooltip-demo')
      .forEach(tooltip => {
        new bootstrap.Tooltip(tooltip, {
          selector: '[data-bs-toggle="tooltip"]'
        })
        //console.log(tooltip)
      })

    // popovers
    window.document.querySelectorAll('[data-bs-toggle="popover"]')
      .forEach(popover => {
        new bootstrap.Popover(popover)
        //console.log(popover)
      })

    // toasts
    window.document.querySelectorAll('.toast')
      .forEach(toastNode => {
        new bootstrap.Toast(toastNode, { autohide: false }).show()
        //console.log(toastNode)
      })

    // disable empty anchors
    window.document.querySelectorAll('[href="#"], [type="submit"]')
      .forEach(link => {
        link.addEventListener('click', event => {
          event.preventDefault()
        })
      })

    window.addEventListener('hashchange', setActiveItem)

  })

  onCleanup(() => {
    console.log('oncleanup')
    window.removeEventListener('hashchange', setActiveItem)
  })

  return (
    <div id="app" innerHTML={cheatsheet} />
  )

}

export default App
