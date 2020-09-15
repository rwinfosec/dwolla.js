import React from "react";
import dwolla from "@dwolla/dwolla-web";

export const DocumentUpload = () => {
  return (
    <div>
      <dwolla-document-upload customerId="12345" />
    </div>
  );
};

export default dwolla;
