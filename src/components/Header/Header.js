import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <h1>Fantasy Generator</h1>
    <IndexLink to='/' activeClassName='route--active'>Home</IndexLink>
    {' · '}
    <Link to='/item' activeClassName='route--active'>Magic Item Generator</Link>
    {' · '}
    <Link to='/planet' activeClassName='route--active'>Planet Generator</Link>
  </div>
)

export default Header
