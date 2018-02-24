import * as React from 'react';
import { Location } from 'history';
import * as styles from './MainLayout.css';
import Header from './Header';

interface MainLayoutProps {
  children?: React.ReactNode,
  location: Location,
}

const MainLayout: React.SFC<MainLayoutProps> = ({ children, location }) => {
  return (
    <div className={styles.normal}>
      <Header location={location} />
      <div className={styles.content}>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
