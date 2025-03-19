import Handlebars from "handlebars";
import moment from "moment";

// Format tiền VND
Handlebars.registerHelper("formatMoney", function (value) {
  if (value === null || value === undefined) return "";
  return new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
});

Handlebars.registerHelper("formatDate", function (dateString) {
  if (!dateString) return "";
  return moment(dateString).format("DD/MM/YYYY");
});

Handlebars.registerHelper("eq", function (v1, v2) {
  return v1 === v2;
});

export default Handlebars;
