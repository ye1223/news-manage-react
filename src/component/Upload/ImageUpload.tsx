import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import process from 'process';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ImageType } from '../../enums/image.enum';

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
  imageType: number //是头像图片还是产品封面
  edit?: boolean //编辑页面，展示图片
}
const ImageUpload: React.FC<IProps> = ({ event, imageType, edit }) => {
  let IMAGE: string
  switch(imageType){
    case ImageType.AVATAR:
      IMAGE = 'avatar'
      break
    case ImageType.PRODUCT:
      IMAGE = 'productCover'
      break
    case ImageType.NEWS:
      IMAGE = 'coverPath'
      break
    
    default:
      throw new Error('ImageType有问题')
  }

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const avatar = useSelector((state: RootState)=>state.userReducer.userinfo.avatarPath)

  const serverurl = process.env.REACT_APP_SERVER_URL
  
  useEffect(() => {
    // 解决一上来头像图片状态丢失问题（个人中心头像和编辑页面需要展示图片）
    (imageType === ImageType.AVATAR || edit) && setImageUrl(`${serverurl}${avatar}`)
  }, [])

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {

    // console.log('infoooooo' ,info)
    const imgPath = URL.createObjectURL(info.file.originFileObj as RcFile)

    //数据传递给父组件
    event(imgPath, info.file.originFileObj)

    setImageUrl(imgPath)
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
        name={IMAGE}//发到后台的文件参数名
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