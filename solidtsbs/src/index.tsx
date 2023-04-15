import { render } from 'solid-js/web'

import 'bootstrap/scss/bootstrap.scss'
import './cheatsheet.scss'

import Themes from './Themes.tsx'
import CheatSheet from './CheatSheet.tsx'

render(() => <Themes />, document.getElementById('root')!)

render(() => <CheatSheet />, document.getElementById('root')!)
