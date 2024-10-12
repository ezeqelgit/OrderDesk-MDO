const OrderDesk = {
  state: {
    apiPremises: "https://dev.moydomonline.ru/api/geo/v2.0/user-premises/",
    apiHomeList: "https://dev.moydomonline.ru/api/appeals/v1.0/appeals/"
  },
  getters: {
    getApiPremises: (s) => s.apiPremises,
    getApiHomeList: (s) => s.apiHomeList
  },
  mutations: {},
};

export default OrderDesk;
