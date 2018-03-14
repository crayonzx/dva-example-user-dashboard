import * as React from 'react';
import * as styles from './Users.css';
import UsersComponent from '../components/Users/Users';
import MainLayout from '../components/MainLayout/MainLayout';

const Users: React.SFC = () => {
  return (
    <MainLayout>
      <div className={styles.normal}>
        <UsersComponent />
      </div>
    </MainLayout>
  );
}

export default Users;
// export default Users;
