import Dwolla from "@dwolla/dwolla";
import DR from "@dwolla/dwolla-react";

console.log(DR);

export default function MyPage() {
  console.log(Dwolla());
  return <DR.DocumentUpload />;
}
