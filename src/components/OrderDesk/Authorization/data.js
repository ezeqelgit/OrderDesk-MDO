import Vue from "vue"
import axios from "axios";
import router from "../../../scripts/router"
import { importAllImagesFromFolder } from "../../../utils/ImportImagesFolder"

const images = importAllImagesFromFolder(require.context('./assets/svg/', false, /\.(png|jpe?g|svg)$/));

export default Vue.extend({
  data() {
    return { 
      images,
      rawNumber: "",
      password: "",
      isPasswordVisible: false,
      showError: false,
      errorMessage: "",
      apiUrl: "https://dev.moydomonline.ru/api/auth/login/",
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    async submitForm() {
      try {
        const response = await axios.post(this.apiUrl, {
          username: this.rawNumber.replace("+7", ""),
          password: this.password,
        });

        if (response.status === 200) {
          const token = response.data.key;
          localStorage.setItem('authToken', token);

          router.push('./Orders'); 
        } else {
          this.showError = true; 
          this.errorMessage = "Неправильные данные";
        }
      } catch (error) {
        this.showError = true; 
        this.errorMessage = "Неправильные данные";
      }
    },
    validateInputs() {
      return this.rawNumber.length === 18 && this.password.length > 0;
    }
  }
})