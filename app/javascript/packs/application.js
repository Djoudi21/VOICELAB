import "bootstrap";


import { initSweetalert } from '../plugins/init_sweetalert';

initSweetalert('#sweet-alert-btn', {
  title: "Merci",
  text: "Vous receverez un mail de confirmation",
  icon: "success"
});
