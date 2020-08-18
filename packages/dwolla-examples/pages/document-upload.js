import dwolla from "@dwolla/dwolla";
import DR from "@dwolla/dwolla-react";

dwolla.configure({
  environment: "sandbox",
  fetchToken: () => Promise.resolve("MY_TOKEN"),
});

export default function MyPage() {
  return (
    <div>
      <DR.DocumentUpload />
    </div>
  );
}
