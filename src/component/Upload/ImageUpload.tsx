import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

/* // 转为base64
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}; */
/* 
  beforeUpload 限制用户上传的图片格式和大小。
  beforeUpload 的返回值可以是一个 Promise 以支持异步处理，如服务端校验等
*/
const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传JPG/PNG格式的图片!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不能超过2MB!');
  }
  return isJpgOrPng && isLt2M;
};

interface IProps {
  event: (val: string, rawFile: any) => void
}
const ImageUpload: React.FC<IProps> = ({ event }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    const avatarPath = URL.createObjectURL(info.file.originFileObj as RcFile)
    event(avatarPath, info.file.originFileObj) //数据传递给父组件

    setImageUrl(avatarPath)
    // 上传中
    // if (info.file.status === 'uploading') {
    //   console.log('上传', info.file)

    //   setLoading(true);
    //   return;
    // }
    // 上传成功
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj as RcFile, (url) => {
    //     setLoading(false);
    //     setImageUrl(url);
    //   });
    // }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  return (
    <>
      <Upload
        name="avatar"//发到后台的文件参数名
        listType="picture-card"//上传列表的内建样式
        className="avatar-uploader"
        showUploadList={false}
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        action=''
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '90%' }} /> : uploadButton}
      </Upload>

    </>
  );
};

export default ImageUpload;