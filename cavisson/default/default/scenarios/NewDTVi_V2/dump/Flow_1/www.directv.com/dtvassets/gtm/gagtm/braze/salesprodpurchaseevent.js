var salesBrazeCart = window.dataLayer.filter(function(x){return x.event === 'purchase'});
var cartObj = salesBrazeCart[0].ecommerce.items;
var orderNumber = salesBrazeCart[0].ecommerce.transaction_id;
var monthlyRecurringPrice = salesBrazeCart[0].monthly_recurring_price;
window.braze.getUser().setCustomUserAttribute("cartId", orderNumber);
window.braze.getUser().setCustomUserAttribute("cartPrice", monthlyRecurringPrice);
  window.braze.logCustomEvent("Directv_Sales_Completed_Order", {
  date: new Date(),
  cartObj: cartObj,
});
window.braze.logPurchase(orderNumber, monthlyRecurringPrice, "USD", 1);
var value = true;
window.braze.getUser().setCustomUserAttribute("isDirectvCustomer", value);