// type ClientArgsServer = {
//   key: string;
//   secret: string;
//   environment: "sandbox" | "production";
// };

// type ClientArgsBrowser = {
//   getToken: () => Promise<string>;
// };

export default function Dwolla(
  opts /* : ClientArgsBrowser | ClientArgsServer */
) {
  return {
    async get() {
      return Promise.resolve({ body: "GOT" });
    },
  };
}
