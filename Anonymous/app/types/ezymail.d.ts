declare module "ezymail" {
  const ezymail: {
    send: (options: {
      from: string;
      to: string;
      subject: string;
      body: string;
    }) => any;
  };

  export default ezymail;
}