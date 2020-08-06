import React from "react";
import "@dwolla/dwolla-components";

export const DocumentUpload = () => {
  return (
    <div>
      <h1>React Doc Upload</h1>
      <dwolla-document-upload />
    </div>
  );
};

export default {
  DocumentUpload,
};
