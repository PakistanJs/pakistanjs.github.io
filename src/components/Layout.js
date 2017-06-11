import React from 'react'
import styles from './Layout.css'

const Layout = ({ children }) => (
	<div className={styles.layout}>
    {children}
	</div>
)


Layout.Header = ({ children }) => (
  <div className={styles.header}>
    {children}
  </div>
)

Layout.Content = ({ children }) => (
  <div className={styles.content}>
    {children}
  </div>
)

Layout.RightPanel = ({ children }) => (
  <div className={styles.rightPanel}>
    {children}
  </div>
)

Layout.CenterPanel = ({ children }) => (
  <div className={styles.centerPanel}>
    {children}
  </div>
)

Layout.LeftPanel = ({ children }) => (
  <div className={styles.leftPanel}>
    {children}
  </div>
)

Layout.Footer = ({ children }) => (
  <div className={styles.footer}>
    {children}
  </div>
)

export default Layout
