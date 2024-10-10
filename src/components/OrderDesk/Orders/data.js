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
      premiseId: "" ,
      appeals: [],
    }
  },
  created() {
    this.fetchPremises();
    this.fetchAppeals();
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
    },
    async fetchAppeals() {
      try {
        const response = await axios.get("https://dev.moydomonline.ru/api/appeals/v1.0/appeals/", {
          headers: {
            Authorization: `Token ${this.token}`
          }
        });
        this.appeals = response.data.results;
        console.log(response.data)
      } catch (error) {
        console.error("Ошибка при получении списка обращений", error.response ? error.response.data : error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    },
    formatDateTime(dateString) {
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      const formattedTime = date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
      });
      return `${formattedDate} ${formattedTime}`;
    },
    formatAddress(premise, apartmentLabel) {
      if (premise && apartmentLabel) {
        return `${premise} ${apartmentLabel}`;
      } else if (premise) {
        return premise;
      } else if (apartmentLabel) {
        return apartmentLabel;
      }
      return '';  
    }
  }
})