import * as React from 'react';
import { connect } from 'dva';
import { Location } from 'history';
import * as styles from './IndexPage.css';
import MainLayout from '../components/MainLayout/MainLayout';

interface IndexPageProps {
  location: Location,
}

const IndexPage : React.SFC<IndexPageProps> = ({ location }) => {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to dva!</h1>
        <div className={styles.welcome} />
        <ul className={styles.list}>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
        </ul>
      </div>
    </MainLayout>
  );
}

export default connect()(IndexPage);
// export default IndexPage;
