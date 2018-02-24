import * as React from 'react';
import { Modal, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const FormItem = Form.Item;

export interface UserValues {
  name: string,
  email: string,
  website: string,
}

export interface UserRecord extends UserValues {
  id: string,
}

export interface UserEditModalProps extends FormComponentProps {
  record: UserRecord,
  onOk: (values: UserValues) => void,
}

interface UserEditModalState {
  visible: boolean,
}

class UserEditModal extends React.Component<UserEditModalProps, UserEditModalState> {

  constructor(props: UserEditModalProps) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e: React.MouseEvent<any>) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values: UserValues) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  }

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name, email, website } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          {children}
        </span>
        <Modal
          title="Edit User"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="Name"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Email"
            >
              {
                getFieldDecorator('email', {
                  initialValue: email,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Website"
            >
              {
                getFieldDecorator('website', {
                  initialValue: website,
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserEditModal);
