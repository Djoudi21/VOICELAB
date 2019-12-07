import "bootstrap";
import { initSweetalert } from '../plugins/init_sweetalert';


initSweetalert('#toto', {
  title: "Merci",
  text: "Le contrat est validé",
  icon: "success"
});

// initSweetalert('#sweet-alert-btn-deny', {
//   title: "Désolé",
//   text: "Le contrat n'est pas validé",
//   icon: "succes"
// });
