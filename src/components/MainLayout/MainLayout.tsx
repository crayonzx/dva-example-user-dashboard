import * as React from 'react';
import * as styles from './MainLayout.css';
import Header from './Header';

interface MainLayoutProps {
  children?: React.ReactNode,
}

const MainLayout: React.SFC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.normal}>
      <Header />
      <div className={styles.content}>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
