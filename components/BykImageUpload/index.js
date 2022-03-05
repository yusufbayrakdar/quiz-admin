import React, { useState, useEffect } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import path from "path";
import { firebaseStorage } from "../../firebase";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function BykImageUpload({
  imageSize = { width: 256, height: 256 },
  checkDimensions = false,
  setImageErrorMessage = () => {},
  accept = ".png, .jpg, .jpeg",
  getImage = (images) => {},
  disabled = false,
  resetForm,
  defaultImage,
}) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [isImageValid, setIsImageValid] = useState(true);

  useEffect(() => {
    if (defaultImage) {
      setFileList([
        {
          uid: 1,
          name: defaultImage.imageName,
          status: "done",
          url: defaultImage.imageUrl,
        },
      ]);
    }
  }, [defaultImage]);

  useEffect(() => {
    const [file] = fileList;
    if (file) file.status = isImageValid ? "done" : "error";
  }, [isImageValid, fileList]);

  useEffect(() => {
    if (resetForm) setFileList([]);
  }, [resetForm]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = async ({ fileList }) => {
    setFileList(fileList.slice(-1));
    const image = fileList.slice(-1)[0]?.originFileObj;
    if (!image) return null;
    let uploadTask;
    uploadTask = firebaseStorage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log("🤯 error", error);
      },
      () => {
        firebaseStorage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((imageUrl) => {
            getImage(
              isImageValid ? { imageUrl, imageName: image.name } : false
            );
          });
      }
    );
  };

  const handleRemove = (file) => {
    setImageErrorMessage("Image is missing");
    getImage(null);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Yükle</div>
    </div>
  );

  const imageMimes = ["image/jpeg", "image/jpg", "image/png"];
  const imageExt = [".png", ".jpeg", ".jpg", ".JPG"];
  const MB_TO_BITES = 1000000;
  const MAX_IMAGE_SIZE = 15 * MB_TO_BITES;

  const beforeUpload = (file) => {
    const isFileSizeValid = (file) => {
      if (
        !imageMimes.includes(file.type) ||
        !imageExt.includes(path.extname(file.name))
      ) {
        setImageErrorMessage("File is not in valid extension");
        return setIsImageValid(false);
      } else if (Number(file.size) > MAX_IMAGE_SIZE) {
        setImageErrorMessage("File size is bigger than 15 mb");
        return setIsImageValid(false);
      }
      setImageErrorMessage(undefined);
      return setIsImageValid(true);
    };

    function callback(isError) {
      if (isError && checkDimensions) {
        setImageErrorMessage(
          `Image Size should be  W:${imageSize.width}, H:${imageSize.height}`
        );
        setIsImageValid(false);
        file.status = "error";
      } else {
        isFileSizeValid(file);
      }
    }

    const hasFileValidDimensions = (file) => {
      var _URL = window.URL || window.webkitURL;
      var img = new Image();
      img.onload = function () {
        console.log(`width: ${this.width}, height: ${this.height}`);
        callback(
          imageSize.height !== this.height || imageSize.width !== this.width
        );
      };
      img.src = _URL.createObjectURL(file);
    };
    setIsImageValid(true);
    hasFileValidDimensions(file);

    return false;
  };

  return (
    <>
      <Upload
        beforeUpload={beforeUpload}
        listType="picture-card"
        onPreview={handlePreview}
        fileList={fileList}
        accept={accept}
        onRemove={handleRemove}
        disabled={disabled}
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
}

export default BykImageUpload;
