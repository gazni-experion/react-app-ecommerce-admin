import React, { useEffect, useState } from "react";
import { Upload, Avatar } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { GetAsync, PostAsync } from "../Utils/Config/api";
import { success, error } from "./feedBack";

export const UploadImage = ({ getUrl, postUrl, id }) => {
  const [fileList, setFileList] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    GetAsync(`${getUrl + id}`) // get image from database
      .then((res) => {
        console.log(res.data.image);
        setFileList(res.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh, getUrl, id]); // refresh the image on change

  const onChange = (info) => {
    console.log(info);
    let fileName = JSON.stringify({
      id: id,
      name: info.file.name,
    });
    PostAsync(`${postUrl}`, fileName) // Update image
      .then((res) => {
        console.log(res);
        setRefresh(refresh + 1);
        if (res.status === 200) {
          success("Image updated successfully"); // show success message
        }
      })
      .catch((err) => {
        console.log(err);
        error("Unable to update image. Please try again...!"); // show error message
      });
  };

  const onPreview = (file) => {
    console.log(file); // preview image- currently not working due to bugs in antd upload
  };
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
        {fileList && fileList.length >= 1 ? (
          <Avatar
            src={require("../Assets/" + fileList)}
            shape="square"
            alt="Profile picture"
            size={100}
          />
        ) : (
          <div>
            <PlusOutlined />
            <div className="ant-upload-text">Upload</div>
          </div>
        )}
      </Upload>
    </div>
  );
};
