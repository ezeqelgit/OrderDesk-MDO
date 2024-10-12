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
      searchQuery: "",
      selectedAddress: ""
    }
  },
  created() {
    this.fetchPremises();
    this.fetchAppeals();
  },
  computed: {
    filteredAppeals() {
      const searchTerm = this.searchQuery.toLowerCase();
      const selectedAddress = this.selectedAddress.toLowerCase();
      
      return this.appeals.filter(appeal => {
        const appealAddress = appeal.premise ? appeal.premise.address.toLowerCase() : '';
        const appealNumber = appeal.number ? appeal.number.toString() : '';

        return (appealAddress.includes(searchTerm) || appealNumber.includes(searchTerm)) && 
              (!this.selectedAddress || appealAddress.includes(selectedAddress));
      });
    },
    getDataPremises() {
      return this.$store.getters.getApiPremises
    },
    getDataHomeList() {
      return this.$store.getters.getApiHomeList
    }
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
        const response = await axios.get(this.getDataPremises, {
          headers: {
            Authorization: `Token ${this.token}`
          },
          params: {
            search: this.searchTerm,
            premise_id: this.premiseId
          }
        });
        this.premises = response.data.results;
      } catch (error) {
        console.error("Ошибка при получении списка домов", error.response ? error.response.data : error);
      }
    },
    async fetchAppeals() {
      try {
        const response = await axios.get(this.getDataHomeList, {
          headers: {
            Authorization: `Token ${this.token}`
          }
        });
        this.appeals = response.data.results;
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
    },
    selectAddress(address) {
      this.searchTerm = address;
      this.selectedAddress = address;
      this.isListVisible = false;
    }
  }
})