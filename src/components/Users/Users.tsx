import * as React from "react";
import { observer, inject } from "mobx-react";
import { Table, Pagination, Popconfirm, Button } from "antd";
import { TableProps, ColumnProps } from "antd/lib/table";

import UserModal, { UserRecord, UserValues } from "./UserModal";
import { UsersStore } from "../../models";
import { PAGE_SIZE } from "../../constants";
import * as styles from "./Users.css";

interface UsersProps extends TableProps<UserRecord> {
  users?: UsersStore;
}

class UserRecordTable extends Table<UserRecord> {}

class Users extends React.Component<UsersProps> {
  deleteHandler = (id: string) => {
    this.props.users!.remove(id);
  };

  pageChangeHandler = (page: number) => {
    this.props.users!.fetch(page);
  };

  editHandler = (id: string, values: UserValues) => {
    this.props.users!.patch(id, values);
  };

  createHandler = (values: UserValues) => {
    this.props.users!.create(values);
  };

  render() {
    const { usersList, total, page: current, loading } = this.props.users!;
    const dataSource = usersList.slice();

    const columns: ColumnProps<UserRecord>[] = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text: string) => <a href="">{text}</a>
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Website",
        dataIndex: "website",
        key: "website"
      },
      {
        title: "Operation",
        key: "operation",
        render: (text: string, record: UserRecord) => (
          <span className={styles.operation}>
            <UserModal
              record={record}
              onOk={this.editHandler.bind(null, record.id)}
            >
              <a>Edit</a>
            </UserModal>
            <Popconfirm
              title="Confirm to delete?"
              onConfirm={this.deleteHandler.bind(null, record.id)}
            >
              <a href="">Delete</a>
            </Popconfirm>
          </span>
        )
      }
    ];

    return (
      <div className={styles.normal}>
        <div>
          <div className={styles.create}>
            <UserModal record={{} as UserRecord} onOk={this.createHandler}>
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
            onChange={this.pageChangeHandler}
          />
        </div>
      </div>
    );
  }
}

export default inject("users")(observer(Users));
