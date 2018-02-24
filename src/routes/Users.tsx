import * as React from 'react';
import { connect } from 'dva';
import { DispatchProp } from 'react-redux';
import { Location } from 'history';
import * as styles from './Users.css';
import UsersComponent from '../components/Users/Users';
import MainLayout from '../components/MainLayout/MainLayout';

interface UsersProps extends DispatchProp<any> {
  location: Location,
}

const Users: React.SFC<UsersProps> = ({ location }) => {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <UsersComponent />
      </div>
    </MainLayout>
  );
}

export default connect()(Users);
// export default Users;
