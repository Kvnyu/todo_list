const paths = {
  create: {
    href: '/create',
  },
  home: {
    href: '/',
  },
  update: {
    href: (id: string) => `/update/${id}`,
  },
  view: {
    href: (id: string) => `/view/${id}`,
  },
};

export default paths;
