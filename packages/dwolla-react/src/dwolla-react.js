import React from "react";
import "@dwolla/dwolla-components";

export const DocumentUpload = () => {
  return (
    <div>
      <dwolla-document-upload customerId="12345" />
    </div>
  );
};

export default {
  DocumentUpload,
};
