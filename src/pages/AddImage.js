import React, { useState } from "react";
import FormAfterUpload from "../components/FormAfterUpload";
import FormBeforeUpload from "../components/FormBeforeUpload";

const AddImage = () => {
  const [upload, setUpload] = useState(false);
  const [dataImage, setDataImage] = useState([]);

  const checkUpload = (dataImage) => {
    setDataImage(dataImage);
    setUpload(true);
  };

  console.log(dataImage);

  if (!upload) {
    return <FormBeforeUpload checkUpload={(data) => checkUpload(data)} />;
  } else {
    return <FormAfterUpload dataImage={dataImage} />;
  }
};

export default AddImage;