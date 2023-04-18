import React from 'react';

import './Header.scss';

export interface HeaderProps {}

const Header = ({}: HeaderProps) => (
  <header className="app-header">
    <div>Clean code register!</div>
    <nav>
      <a href="/">Home</a>
      <a href="/login">Login</a>
      <a href="/other">Other</a>
    </nav>
  </header>
);

export default Header;
