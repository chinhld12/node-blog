/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-03-13 22:14:11
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-07-01 22:56:43
 */

import React, {Component} from 'react';
import {Form, Input, Button, message, Radio, Select, Upload, Modal} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import Editor from './Editor';
const Option = Select.Option;

class ArticleEditForm extends Component {
  handleUpload(e) {
    if (Array.isArray(e)) {
      return e;
    }
    let fileList = e.fileList;
    fileList = fileList.slice(-1);
    fileList = fileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    if (e.file.status === 'done') {
      message.success(`${e.file.name} file uploaded successfully`);
    } else if (e.file.status === 'error') {
      message.error(`${e.file.name} file upload failed.`);
    }
    return fileList;
  }

  render() {
    let {article, categories} = this.props;
    const {getFieldDecorator} = this.props.form;
    const category = article.category || '';
    const categoryOptions = categories && categories.map(category => <Option
        key={category.alias}>{category.name}</Option>);
    let upload = {
      name: "file",
      action: "/api/upload",
      listType: "picture",
      multiple: false,
      onRemove: () => false
    }
    let fileList = [{
      uid: -1,
      status: 'done',
      url: article.img_url,
    }];
    return (
      <Form>
        <FormItem label="标题" labelCol={{span: 3}} wrapperCol={{span: 10}}>
          {getFieldDecorator('title', {
            rules: [{required: true, message: '标题不能为空！',}],
            initialValue: article.title
          })(
            <Input type="text"/>
          )}
        </FormItem>
        <FormItem label="文章状态" labelCol={{span: 3}} wrapperCol={{span: 10}}>
          {getFieldDecorator('is_published', {
            rules: [
              {required: true, message: '请选择一个状态'},
            ],
            initialValue: article.is_published || true
          })(
            <RadioGroup>
              <Radio value={true}>发布</Radio>
              <Radio value={false}>草稿</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="分类" labelCol={{span: 3}} wrapperCol={{span: 3}}>
          {getFieldDecorator('category', {
            rules: [
              {required: true, message: '分类不能为空!'},
            ],
            initialValue: category
          })(
            <Select placeholder="请选择一个分类">
              {categoryOptions}
            </Select>
          )}
        </FormItem>
        <FormItem label="上传图片" labelCol={{span: 3}} wrapperCol={{span: 3}}>
          {getFieldDecorator('img_url', {
            initialValue: fileList,
            valuePropName: 'fileList',
            getValueFromEvent: this.handleUpload,
          })(
            <Upload {...upload}>
              <Button><i className="fa fa-arrow-up"></i>点击上传</Button>
            </Upload>
          )}
        </FormItem>
        <FormItem label="文章摘要" labelCol={{span: 3}} wrapperCol={{span: 20}}>
          {getFieldDecorator('summary', {
            initialValue: article.summary
          })(
            <Input type="textarea" rows={6}/>
          )}
        </FormItem>
        <FormItem label="文章内容" labelCol={{span: 3}} wrapperCol={{span: 20}}>
          {getFieldDecorator('content', {
            initialValue: article.content
          })(
            <Editor />
          )}
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(ArticleEditForm)
