import Vue from "vue"
import axios from "axios"
import { importAllImagesFromFolder } from "../../../utils/ImportImagesFolder"

const images = importAllImagesFromFolder(require.context('./assets/svg/', false, /\.(png|jpe?g|svg)$/));

export default Vue.extend({
  data() {
    return {
      images,
      isListVisible: false,
      premises: [],
      token: localStorage.getItem("authToken") || "",
      searchTerm: "",
      premiseId: ""
    }
  },
  created() {
    this.fetchPremises();
  },
  methods: {
    toggleShowList() {
      this.isListVisible = !this.isListVisible;
      if (this.isListVisible && this.premises.length === 0) {
        this.fetchPremises();
      }
    },
    async fetchPremises() {
      try {
        const response = await axios.get("https://dev.moydomonline.ru/api/geo/v2.0/user-premises/", {
          headers: {
            Authorization: `Token ${this.token}`
          },
          params: {
            search: this.searchTerm,
            premise_id: this.premiseId
          }
        });
        // console.log(response.data);
        this.premises = response.data.results;
      } catch (error) {
        console.error("Ошибка при получении списка домов", error.response ? error.response.data : error);
      }
    }
  }
})