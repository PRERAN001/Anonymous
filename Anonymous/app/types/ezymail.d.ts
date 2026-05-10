declare module "ezymail" {
  const ezymail: {
    send: (options: {
      from: string;
      to: string;
      subject: string;
      html: string;
    }) => any;
  };

  export default ezymail;
}