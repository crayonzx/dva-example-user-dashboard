import * as React from 'react';
import { connect } from 'dva';
import { DispatchProp } from 'react-redux';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { TableProps, ColumnProps } from 'antd/lib/table';
import { routerRedux } from 'dva/router';
import * as styles from './Users.css';
import { PAGE_SIZE } from '../../constants';
import UserModal, { UserRecord, UserValues } from './UserModal';
import { AppState } from '../../models/users';

interface UsersProps extends TableProps<UserRecord>, DispatchProp<any> {
  list: UserRecord[],
  total: number,
  page: number,
}

class UserRecordTable extends Table<UserRecord> {}

const Users: React.SFC<UsersProps> = ({ dispatch, list: dataSource, loading, total, page: current }) => {
  function deleteHandler(id: string) {
    dispatch!({
      type: 'users/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page: number) {
    dispatch!(routerRedux.push({
      pathname: '/users',
      state: { page },
    }));
  }

  function editHandler(id: string, values: UserValues) {
    dispatch!({
      type: 'users/patch',
      payload: { id, values },
    });
  }

  function createHandler(values: UserValues) {
    dispatch!({
      type: 'users/create',
      payload: values,
    });
  }

  const columns: ColumnProps<UserRecord>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a href="">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text: string, record: UserRecord) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <UserModal record={{} as UserRecord} onOk={createHandler}>
            <Button type="primary">Create User</Button>
          </UserModal>
        </div>
        <UserRecordTable
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={(record: UserRecord, index: number) => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state: AppState): UsersProps {
  const { list, total, page } = state.users;
  return {
    loading: state.loading.models.users,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Users);
