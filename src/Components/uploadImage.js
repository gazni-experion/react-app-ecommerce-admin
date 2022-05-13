import React, {useEffect, useState} from 'react'
import { Upload, message, Avatar } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {GetWithAuthTokenAsync, PostWithAuthTokenAsync} from '../Components/Config/api'
import {success, error} from './feedBack'

export const UploadImage = ({getUrl ,postUrl, id}) => {
    const [fileList, setFileList] = useState('');

    useEffect(()=>{
      console.log(id);
      GetWithAuthTokenAsync(`${getUrl}`)
          .then(res => {
            console.log(res.data.image);
            setFileList(res.data.image);
          })
          .catch(err => {console.log(err);});
    });

      const onChange = (info) => {
        console.log(info);
        let fileName = JSON.stringify({
          id: id,
          name:info.file.name
        });
        console.log(fileName);
        PostWithAuthTokenAsync(`${postUrl}`,fileName)
        .then(res => {
          console.log(res);
          success("Image updated successfully");
        })
        .catch(err => {
          console.log(err);
        error("Unable to update image. Please try again...!")
        });
        
      }

      const onPreview = (file) => {
        console.log(file);
      }
  return (
    <div>
        <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        
        onChange={onChange}
        onPreview={onPreview}
      >
          {fileList && fileList.length >= 1 ? 
          <Avatar src={require('../Assets/'+fileList)} shape="square" alt='Profile picture' size={100} /> 
          : ( 
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
          )}
      </Upload>
    </div>
  )
}
