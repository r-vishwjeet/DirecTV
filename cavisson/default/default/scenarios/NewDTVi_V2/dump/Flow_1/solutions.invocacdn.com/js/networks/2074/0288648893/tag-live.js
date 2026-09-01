(function(networkId) {
var automaticIntegrations = {"googleAnalytics":{"paramName":"g_cid"},"gaMeasurementId":{"paramName":"ga_measurement_id"},"gaSessionId":{"paramName":"ga_session_id"}};

var cacheLifetimeDays = 30;

var customDataWaitForConfig = [
  { on: function() { return Invoca.Client.parseCustomDataField("Account_Type", "Last", "Cookie", "ACCT_TYPE"); }, paramName: "Account_Type", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("BAN", "Last", "Cookie", "BAN"); }, paramName: "BAN", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("Call_Type", "Last", "URLParam", ""); }, paramName: "Call_Type", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("Campaign_ID", "Last", "URLParam", ""); }, paramName: "Campaign_ID", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("Cell_Code", "Last", "URLParam", ""); }, paramName: "Cell_Code", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("DIRECTVPageInterest", "Last", "JavascriptDataLayer", "localStorage.getItem(\"DIRECTVPageInterest\")"); }, paramName: "DIRECTVPageInterest", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("DIRECTVProductInterest", "Last", "JavascriptDataLayer", "localStorage.getItem(\"DIRECTVProductInterest\")"); }, paramName: "DIRECTVProductInterest", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("Evolv_UID", "Last", "JavascriptDataLayer", "localStorage.getItem(\"evolv:uid\")"); }, paramName: "Evolv_UID", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("LOB", "Last", "URLParam", ""); }, paramName: "LOB", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("OMS_Order_ID", "Last", "URLParam", ""); }, paramName: "OMS_Order_ID", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("StreamItems", "Last", "JavascriptDataLayer", "localStorage.getItem(\"cartDetails\")"); }, paramName: "StreamItems", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("StreamPackage", "Last", "JavascriptDataLayer", "localStorage.getItem(\"StreamPackage\")"); }, paramName: "StreamPackage", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("TFN_Destination", "Last", "URLParam", ""); }, paramName: "TFN_Destination", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("Tactic_ID", "Last", "URLParam", ""); }, paramName: "Tactic_ID", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("_fbc", "Last", "Cookie", "_fbc"); }, paramName: "_fbc", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("_fbp", "Last", "Cookie", "_fbp"); }, paramName: "_fbp", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("_ga", "Last", "Cookie", "_ga"); }, paramName: "_ga", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("add_on", "Last", "URLParam", ""); }, paramName: "add_on", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("agent", "Last", "URLParam", ""); }, paramName: "agent", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("article_name", "Last", "URLParam", ""); }, paramName: "article_name", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("base_package", "Last", "URLParam", ""); }, paramName: "base_package", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("call_disposition_reason", "Last", "URLParam", ""); }, paramName: "call_disposition_reason", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("call_sentiment_overall_label", "Unique", "URLParam", ""); }, paramName: "call_sentiment_overall_label", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("call_start_time", "Last", "URLParam", ""); }, paramName: "call_start_time", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("call_treatment_ab_test_path", "Last", "URLParam", ""); }, paramName: "call_treatment_ab_test_path", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("calling_page", "Last", "JavascriptDataLayer", "location.hostname + location.pathname"); }, paramName: "calling_page", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("cartDetails", "Last", "JavascriptDataLayer", "localStorage.getItem(\"cartDetails\")"); }, paramName: "cartDetails", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("consent_cookie", "Last", "URLParam", ""); }, paramName: "consent_cookie", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("conversation_languages", "Last", "URLParam", ""); }, paramName: "conversation_languages", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("current_zip_code", "Last", "Cookie", "currentZipcode"); }, paramName: "current_zip_code", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("customerFlag", "Last", "JavascriptDataLayer", "customerFlag"); }, paramName: "customerFlag", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("customerFlagTrue", "Last", "URLParam", ""); }, paramName: "customerFlagTrue", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("customer_id", "Last", "URLParam", ""); }, paramName: "customer_id", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("dap_referrer_routing", "Last", "URLParam", ""); }, paramName: "dap_referrer_routing", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("dclid", "Last", "URLParam", ""); }, paramName: "dclid", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("destination_time_zone", "Unique", "URLParam", ""); }, paramName: "destination_time_zone", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("dim_value", "Last", "JavascriptDataLayer", "dataLayer.filter(e=\u003ee.event==\"experience_impression\").pop()?.exp_variant_string"); }, paramName: "dim_value", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("disposition", "Last", "URLParam", ""); }, paramName: "disposition", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("dtv_now_osprey_selection", "Last", "URLParam", ""); }, paramName: "dtv_now_osprey_selection", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("dvc_type", "Last", "URLParam", ""); }, paramName: "dvc_type", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("errorMessage", "Last", "JavascriptDataLayer", "sessionStorage.getItem(\"errorMessage\")"); }, paramName: "errorMessage", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("error_code", "Last", "JavascriptDataLayer", "sessionStorage.getItem(\"errorCode\")"); }, paramName: "error_code", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("evaluated_by", "Unique", "URLParam", ""); }, paramName: "evaluated_by", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("experiment", "Last", "URLParam", ""); }, paramName: "experiment", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("extendedSource", "Last", "URLParam", "wtExtndSource"); }, paramName: "extendedSource", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("forced_destination", "Last", "URLParam", ""); }, paramName: "forced_destination", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("fullPageURL", "Last", "JavascriptDataLayer", "window.location.hostname + window.location.pathname + window.location.search + window.location.hash"); }, paramName: "fullPageURL", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("gclid", "Last", "URLParam", ""); }, paramName: "gclid", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("gclsrc", "Last", "URLParam", ""); }, paramName: "gclsrc", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("gcm_uid", "Last", "URLParam", ""); }, paramName: "gcm_uid", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("invoca_caller_language", "Last", "URLParam", ""); }, paramName: "invoca_caller_language", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("landing_page", "First", "JavascriptDataLayer", "location.href"); }, paramName: "landing_page", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("lead_record_type", "Last", "URLParam", ""); }, paramName: "lead_record_type", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("linkNames", "Last", "JavascriptDataLayer", "localStorage.getItem('agentContext')"); }, paramName: "linkNames", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("marketing_channel", "Last", "URLParam", ""); }, paramName: "marketing_channel", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("mcid", "Last", "URLParam", ""); }, paramName: "mcid", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("msclkid", "Last", "URLParam", ""); }, paramName: "msclkid", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("number_tvs", "Last", "URLParam", ""); }, paramName: "number_tvs", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("oem", "Last", "Cookie", "oem"); }, paramName: "oem", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("optimizelyEndUserId", "Last", "Cookie", "optimizelyEndUserId"); }, paramName: "optimizelyEndUserId", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("order_id", "Last", "URLParam", ""); }, paramName: "order_id", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("owner", "Last", "URLParam", ""); }, paramName: "owner", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("p", "Last", "JavascriptDataLayer", "window.location.pathname"); }, paramName: "p", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("page_classification", "Last", "URLParam", ""); }, paramName: "page_classification", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("pdis_status", "Last", "URLParam", ""); }, paramName: "pdis_status", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("product_purchased", "Last", "URLParam", ""); }, paramName: "product_purchased", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("product_purchased_sp", "Last", "URLParam", ""); }, paramName: "product_purchased_sp", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("product_purchased_test", "Last", "URLParam", ""); }, paramName: "product_purchased_test", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("profile_name", "Unique", "URLParam", ""); }, paramName: "profile_name", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("propensity_to_churn", "Last", "JavascriptDataLayer", "Invoca.Client.getPropensityToChurn()"); }, paramName: "propensity_to_churn", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("qm_session_id", "Last", "Cookie", "QuantumMetricSessionID"); }, paramName: "qm_session_id", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("quadroQuiz", "Last", "JavascriptDataLayer", "sessionStorage.getItem(\"quadroQuiz\")"); }, paramName: "quadroQuiz", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("queue", "Last", "URLParam", ""); }, paramName: "queue", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("rebate_offer_id", "Last", "JavascriptDataLayer", "Invoca.Client.captureOfferId()"); }, paramName: "rebate_offer_id", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("referrer", "Last", "URLParam", ""); }, paramName: "referrer", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("returnVisitorFlag", "Last", "URLParam", ""); }, paramName: "returnVisitorFlag", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("reviewed_by", "Unique", "URLParam", ""); }, paramName: "reviewed_by", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("routing_campaign", "Last", "URLParam", ""); }, paramName: "routing_campaign", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("sessLtb", "Last", "JavascriptDataLayer", "window.localStorage.getItem('sessLtb')"); }, paramName: "sessLtb", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("source_campaign", "Last", "URLParam", ""); }, paramName: "source_campaign", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("sub_cohort", "Last", "URLParam", ""); }, paramName: "sub_cohort", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("subscriber_type", "Last", "Cookie", "subscriberType"); }, paramName: "subscriber_type", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("tealium_session_id", "Last", "JavascriptDataLayer", "(c=Invoca.Tools.readCookie(\"TEAL\"))?.slice(c.indexOf(\"$s:\")+3,c.indexOf(\"%3Bexp\"))"); }, paramName: "tealium_session_id", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("tealium_visitor_id", "Last", "JavascriptDataLayer", "Invoca.Tools.readCookie(\"TEAL\").substring(2,Invoca.Tools.readCookie(\"TEAL\").indexOf(\"$\"))"); }, paramName: "tealium_visitor_id", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("tfnid", "Last", "URLParam", ""); }, paramName: "tfnid", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("ttd_id", "Last", "URLParam", ""); }, paramName: "ttd_id", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("utm_audience", "Last", "URLParam", ""); }, paramName: "utm_audience", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("utm_campaign", "Last", "URLParam", ""); }, paramName: "utm_campaign", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("utm_content", "Last", "URLParam", ""); }, paramName: "utm_content", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("utm_id", "Last", "URLParam", ""); }, paramName: "utm_id", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("utm_segment", "Last", "URLParam", ""); }, paramName: "utm_segment", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("video_account_number", "Last", "URLParam", ""); }, paramName: "video_account_number", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("video_call_disposition_sp", "Last", "URLParam", ""); }, paramName: "video_call_disposition_sp", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("zip_code", "Last", "Cookie", "edgeScapeZip"); }, paramName: "zip_code", fallbackValue: null }
];

var customDataWaitForConfigAnonymousFunctions = [
  { on: function() { return Invoca.Client.parseCustomDataField("DIRECTVPageInterest", "Last", "JavascriptDataLayer", function() { return (localStorage.getItem("DIRECTVPageInterest")); }) }, paramName: "DIRECTVPageInterest", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("DIRECTVProductInterest", "Last", "JavascriptDataLayer", function() { return (localStorage.getItem("DIRECTVProductInterest")); }) }, paramName: "DIRECTVProductInterest", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("Evolv_UID", "Last", "JavascriptDataLayer", function() { return (localStorage.getItem("evolv:uid")); }) }, paramName: "Evolv_UID", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("StreamItems", "Last", "JavascriptDataLayer", function() { return (localStorage.getItem("cartDetails")); }) }, paramName: "StreamItems", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("StreamPackage", "Last", "JavascriptDataLayer", function() { return (localStorage.getItem("StreamPackage")); }) }, paramName: "StreamPackage", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("calling_page", "Last", "JavascriptDataLayer", function() { return (location.hostname + location.pathname); }) }, paramName: "calling_page", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("cartDetails", "Last", "JavascriptDataLayer", function() { return (localStorage.getItem("cartDetails")); }) }, paramName: "cartDetails", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("customerFlag", "Last", "JavascriptDataLayer", function() { return (customerFlag); }) }, paramName: "customerFlag", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("dim_value", "Last", "JavascriptDataLayer", function() { return (dataLayer.filter(e=>e.event=="experience_impression").pop()?.exp_variant_string); }) }, paramName: "dim_value", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("errorMessage", "Last", "JavascriptDataLayer", function() { return (sessionStorage.getItem("errorMessage")); }) }, paramName: "errorMessage", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("error_code", "Last", "JavascriptDataLayer", function() { return (sessionStorage.getItem("errorCode")); }) }, paramName: "error_code", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("fullPageURL", "Last", "JavascriptDataLayer", function() { return (window.location.hostname + window.location.pathname + window.location.search + window.location.hash); }) }, paramName: "fullPageURL", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("landing_page", "First", "JavascriptDataLayer", function() { return (location.href); }) }, paramName: "landing_page", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("linkNames", "Last", "JavascriptDataLayer", function() { return (localStorage.getItem('agentContext')); }) }, paramName: "linkNames", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("p", "Last", "JavascriptDataLayer", function() { return (window.location.pathname); }) }, paramName: "p", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("propensity_to_churn", "Last", "JavascriptDataLayer", function() { return (Invoca.Client.getPropensityToChurn()); }) }, paramName: "propensity_to_churn", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("quadroQuiz", "Last", "JavascriptDataLayer", function() { return (sessionStorage.getItem("quadroQuiz")); }) }, paramName: "quadroQuiz", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("rebate_offer_id", "Last", "JavascriptDataLayer", function() { return (Invoca.Client.captureOfferId()); }) }, paramName: "rebate_offer_id", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("sessLtb", "Last", "JavascriptDataLayer", function() { return (window.localStorage.getItem('sessLtb')); }) }, paramName: "sessLtb", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("tealium_session_id", "Last", "JavascriptDataLayer", function() { return ((c=Invoca.Tools.readCookie("TEAL"))?.slice(c.indexOf("$s:")+3,c.indexOf("%3Bexp"))); }) }, paramName: "tealium_session_id", fallbackValue: null },
  { on: function() { return Invoca.Client.parseCustomDataField("tealium_visitor_id", "Last", "JavascriptDataLayer", function() { return (Invoca.Tools.readCookie("TEAL").substring(2,Invoca.Tools.readCookie("TEAL").indexOf("$"))); }) }, paramName: "tealium_visitor_id", fallbackValue: null }
];

var defaultCampaignId = "directv_default";

var destinationSettings = {
  paramName: "buy_flow_num_utm_id"
};

var formTrackingEnabled = false;

var numbersToReplace = null;

var organicSources = false;

var reRunAfter = 2000;

var requiredParams = null;

var resetCacheOn = ['gclid', 'utm_source', 'utm_medium'];

var waitFor = 0;

var customCodeIsSet = (function() {
  Invoca.Client.customCode = function(options) {
    //Used for SSA. Store data of params below under "invoca_session" cookie. 
Invoca.Tools.allowedClientSideParams([
	"invoca_id",
	"s",
	"gclid",
	"gcm_uid",
	"referrer",
	"returnVisitorFlag",
	"utm_medium",
]);

// =================== Reusable functions =========================
// To read a URL param query value.
Invoca.Client.getURLValue = function (param) {
	return Invoca.Tools.readUrl(param) || Invoca.Tools.readInvocaData(param);
};

// To verify if a current URL is one of provided pathLists.
Invoca.Client.isCurrentUrlIncludesPath = function (pathLists) { 
	return pathLists.some(function (path) {
		return current_url.includes(path);
	});
};

// To get a current URL without the protocol and query string parameters. 
Invoca.Client.getCurrentURL = function () {
    var urlWithoutQuery = window.location.href.replace(/(^\w+:|^)\/\//, '').split("?")[0];
    if (urlWithoutQuery.endsWith("/")) {
        urlWithoutQuery = urlWithoutQuery.slice(0, -1);
    };
    return urlWithoutQuery;
};

// To verify if a detected number is one of provided number list.
Invoca.Client.checkSupportNumber = function (list, detectedNumber) {
	return list.some(function (number) {
		return detectedNumber === number;
	});
};

// To verify if a current URL is one of provided URL lists.
Invoca.Client.isURLMatch = function (urlList) {
	return urlList.some(function (url) { 
		return current_url === url;
	});
};

//  To verify if a current URL contains one of provided URL lists.
Invoca.Client.isURLContains = function (substringList) {
	const lowerUrl = window.location.href.toLowerCase();
	return substringList.some(function (substring) {
		return lowerUrl.includes(substring.toLowerCase());
	});
};


// To get a last character of a passed param.
Invoca.Client.getLastCharacter = function (str) {
	return str.charAt(str.length - 1);
};

// ================== Capturing marketing data fields ======================= 

// To populate the MDF, s, by reading the query param "source" in the URL.
// "source" or "s--ource" param should be found in the URL and it has a data starting with E. 
var source = Invoca.Tools.readUrl("source") || Invoca.Tools.readUrl("s--ource");
if (source && source.charAt(0) === "E") {
	options.poolParams.s = source;
}

// To populate the mdf, returnVisitorFlag, from sessionCount in Local Storage. 
// returnVisitorFlag when it's greater than 1. 
if (localStorage.getItem("sessionCount") > 1) {
	options.poolParams.returnVisitorFlag = "Yes";
} else {
	options.poolParams.returnVisitorFlag = "No";
};

// To check a query param "gclid" and "gcm_uid",
// If "gclid" is found, no gcm_uid.
// If "gcm_uid" is found from URL or Cookie, assign its data to gcm_uid. 
function useGCM() {
	if (Invoca.Client.getURLValue("gclid")) {
		return null;
	} else {
		return Invoca.Client.getURLValue("gcm_uid") || Invoca.Tools.readCookie("gcm_uid");
	};
}
options.poolParams.gcm_uid = useGCM();

// To populate the MDF, article_Id.
// If a current URL contains "/article", it gets ID from the URL - first 8 characters.
Invoca.Client.getArticleId = function () {
    var articleId;
    var pathname = location.pathname;
    if (pathname && pathname.indexOf('article') > -1) {
        var splitArticleId = pathname.split('article/')[1];
        articleId = splitArticleId.slice(0,9);
    };
    return articleId;
};

// To populate the MDF, rebate_offer_id.
// If an HTML element with ID, #rebate-banner is found, it gets an ID from its children elements.
Invoca.Client.captureOfferId = function () {
	//check to see if there is id called rebate-banner when the tag loads
	var bannerChildNodes = [];
	var offerIdValue = '';
	var targetSelector = document.querySelector('#rebate-banner');
	if (targetSelector) {
		bannerChildNodes = targetSelector.children;
	};
	//Loop through bannerchildNodes to see if there are child id values found
	for (var i = 0; i < bannerChildNodes.length; i++) {
		if (bannerChildNodes[i].id) {
			offerIdValue = bannerChildNodes[i].id;
			return offerIdValue;
		};
	};
	return offerIdValue;
};

// A key:value map of utm_medium keywords and their values.
var MEDIUM_MATCH_MAP = {
	'paidsocial'      : 'Paid Social',
	'vanity'          : 'Vanity URL',
	'referral'        : 'Referring Domains',
	'other'           : 'Other Campaigns',
	'sms'             : 'SMS',
	'paidsearch'      : 'Paid Search',
	'display'         : 'Display',
	'affiliate'       : 'Affiliates',
	'email'           : 'Email Comms',
	'organicsocial'   : 'Organic Social',
	'audio'           : 'Audio',
	'pushnotification': 'Mobile App Push Notification',
	'video'           : 'Video',
	'direct'          : 'Direct',
	'none'            : 'No Channel',
	'promosocial'     : 'Promo Social'
};

var MEDIUM_REGEX_MAP = {
	'social'           : /^(social|social-network|social-media|sm|social network|social media)/i,
	'Paid Search'      : /^(cpc|ppc|paidsearch)/i,
	'Other Advertising': /^(cpv|cpa|cpp|content-text)/i,
	'Display'          : /^(display|cpm|banner)/i
};

var SOURCE_MATCH_MAP = {
	'A': 'Affiliate',
	'D': 'Direct Mail',
	'E': 'Email',
	'H': 'Mobile App Push Notifications',
	'L': 'Link',
	'M': 'Organic Social',
	'O': 'Online Advertising Display',
	'P': 'Paid Search',
	'S': 'Paid Social',
	'U': 'Vanity URL',
	'T': 'SMS',
	'R': 'Digital Audio',
	'V': 'Pre Roll Video (OLV)',
	'W': 'Paid Social',
};

var medium = Invoca.Client.getURLValue("utm_medium");

// To get a mapped value by a key. 
Invoca.Client.getMediumByMap = function (key, map) {
	if (!key) {
		return null;
	};
	return map[key] || null;
};

// To verify if utm_medium data has any matched values from MEDIUM_REGEX_MAP. 
// If matched key is found, return its key. 
Invoca.Client.getMediumByRegex = function () {
	for (const [key, regex] of Object.entries(MEDIUM_REGEX_MAP)) {
		if (regex.test(medium)) {
			return key;
		};
	};
	return null;
};

// To populate the matched key from utm_medium or "s(source)" in a current URL.
Invoca.Client.getMatchedValue = function () {
	// get utm_medium
	var mediumKey = medium ? medium.toLowerCase() : null;
	// get the last character of "s" from URL.
	var sourceKey = options.poolParams.s ? Invoca.Client.getLastCharacter(options.poolParams.s).toUpperCase() : null;
	var mediumSourceList = [{ key: mediumKey, map: MEDIUM_MATCH_MAP }, { key: sourceKey, map: SOURCE_MATCH_MAP }];
	var result = "";

	// verify if utm_medium has any matched key from MEDIUM_MATCH_MAP or
	// if utm_medium is not found but s(source) has any matched key from SOURCE_MATCH_MAP.
	// If any matched key is found, return its key.
	for (const obj of mediumSourceList) { 
		result = Invoca.Client.getMediumByMap(obj.key, obj.map);
		if (result) { 
			return result;
		};
	};
};

// To populate utm_medium data by reading utm_medium or "s" or checking MEDIUM_REGEX_MAP.
Invoca.Client.getUtmMedium = function () {
	return Invoca.Client.getMatchedValue() || Invoca.Client.getMediumByRegex();
};

// To populate utm_medium and utm_source following the rule above.
// If no utm_medium or utm_source is found, return 
function buildMediumSource() {
	var referralDomain = Invoca.Tools.parseDomainFromFullUrl(Invoca.referrer).slice(1);
	var currentDomain = Invoca.Tools.parseDomainFromFullUrl(location.href).slice(1);
   
	if (referralDomain !== currentDomain) {
		return Invoca.Tools.parseReferrer({
			"google.com": ["Organic Search", "google.com"],
			"bing.com"  : ["Organic Search", "bing.com"],
			"yahoo.com" : ["Organic Search", "yahoo.com"],
			"": ["Direct", "Direct"]
		}, ["Referral", referralDomain], null, "topLevelDomain");
	}
	else {
	    return [Invoca.Client.getUtmMedium(), Invoca.Client.getURLValue("utm_source")]
	};
}

// To assign utm_medium and utm_source to MDFs.
options.poolParams.utm_medium = Invoca.Client.getUtmMedium() || buildMediumSource()[0];
options.poolParams.utm_source = Invoca.Client.getURLValue("utm_source") || buildMediumSource()[1];

// To capture consent_cookie field.
const normalizeValue = (value) => {
  return value
    ? decodeURIComponent(value.replace(/\+/g, '%20'))
    : null;
};
const parseQueryString = (queryString) => {
  const strings = queryString.split('&');
  const queryStringsHash = strings.reduce((hash, pair) => {
    const [key, value] = pair.split("=");
    if (key) {
      hash[key.toLowerCase()] = normalizeValue(value);
    }
    return hash;
  }, {});
  return queryStringsHash;
};

const oneTrustKeyToName = {
  "C0001": "Functional",
  "C0002": "Statistics",
  "C0003": "Necessary",
  "C0004": "Marketing"
}
const collectSettings = (consentSettings) => {
  const groups = consentSettings.split(",");
  return JSON.stringify(groups.reduce((result, group) => {
    const [key, value] = group.split(":");
    const type = oneTrustKeyToName[key]
    if (type && ["Statistics", "Marketing"].includes(type)) {
      const groupSetting = {
        type: type,
        value: value == "1" ? "GRANTED" : "DENIED"
      };
      return result.concat(groupSetting);
    } else {
      return result;
    }
  }, []));
}
// if this method returns null or undefined, "waitForData" will continue to poll
// for data until the timeout period
const getConsentValue = () => {
  let consentCookie = Invoca.Tools.readCookie("OptanonConsent");
  if (consentCookie) {
    let cookieObject = parseQueryString(consentCookie);
    let consentSettings = cookieObject["groups"];
    return collectSettings(consentSettings);
  }
}
options.waitForData.push({
  on: getConsentValue,
  paramName: "consent_cookie",
  fallbackValue: null,
  timeout: 5000
});

// To get propensity score by reading "Customer" in the local storage.
Invoca.Client.getPropensityToChurn = function () {
    const item = localStorage.getItem('Customer');
    if (!item) return;
    const customer = JSON.parse(item);
    return customer.metrics["Model Propensity To Voluntary Churn Next Month Percentile"].toString();
}

// ======================= Constant data for campaign routing =======================
const current_path = window.location.pathname;
const current_url = Invoca.Client.getCurrentURL();
const currentFullUrl = window.location.href;

// A group of campaign Ids for routing purposes.
const campaignId = {
	service_default: "service_default",
	service_default_ban: "service_default_ban",
	business: "business",
	directv_default: "directv_default",
	service_cancel_flow: "service_cancel_flow",
	service_payment_flow: "service_payment_flow",
	service_movers: "movers",
	service_tech_support_osd_error: "tech_support_osd_error",
	service_tv_promise: "tv_promise",
	service_reconnects: "service_reconnects"
};

// A group of urls or path lists for each campaign routing.
const url_list = {
	service_default_ban: [
		"www.directv.com/support",
		"www.directv.com/support/internet",
		"www.directv.com/support/satellite",
		"www.directv.com/support/stream",
		"www.directv.com/customer-service",
		"www.directv.com/support/customer-service/1",
		"www.directv.com/support/customer-service/2"
	],
	cancel_service: [
		"www.directv.com/support/satellite/article/KM1442309",
		"www.directv.com/support/satellite/article/000092807",
		"www.directv.com/support/article/000092807",
		
	],
	service_cancel_flow: [
	    "www.directv.com/accounts/stream/cancelOrPause",
	    "www.directv.com/accounts/satellite/packages",
	    "www.directv.com/customer/cancel-help",
		"www.directv.com/support/satellite/article/KM1442309",
		"www.directv.com/support/satellite/article/000092807",
		"www.directv.com/support/article/000092807",
    ],
    service_payment_flow: [
        "www.directv.com/support/article/000080018"
    ],
	service_tv_promise : [
	    "www.directv.com/tvpromise"
    ],
	service_movers: [
		"www.directv.com/moving",
		"www.directv.com/support/article/000093538",
	],
	service_tech_support_osd_error: [
	    "www.directv.com/support/article/000080603"
    ],
	service_default: [
		"/support",
		"/article",
		"/accounts",
		"/myaccount"
	],
	for_business: ["/forbusiness"],
	service_reconnects: [
	    "www.directv.com/customer/reconnect-help",
	    "www.directv.com/support/article/000098196"
    ]
};

const url_contains = {
	service_cancel_flow: ["cancelmyservice"],
	service_movers: ["movemyservice"],
	to_exclude_dni: [
	    "forums.directv.com", 
	    "/privacy",
	    "L1=billingandaccount",
	    "L1=managemyequipment",
	    "L1=troubleshooting",
	    "accounts/satellite/packages",
	    "support/article/000080018",
	    "support/article/000074283",
	    "support/article/000069458"
    ],
};

// A group of lists of support numbers for each campaign routing.
const support_number = {
	support_default: ["+18005315000"],
	lander: ["+18005315000", "+18669835220"],
};

// List of toll-free number formats.
const tfnRegexArray = [
	/^(?!\+1800)/,
	/^(?!\+1888)/,
	/^(?!\+1877)/,
	/^(?!\+1866)/,
	/^(?!\+1855)/,
	/^(?!\+1844)/,
	/^(?!\+1833)/
];


// ================== Logics for campaign routing and number swap conditions ====================
// To get a campaign ID by a detected number or a current URL.

Invoca.Client.getServiceCampaignId = function (detectedNumber) {
	let serviceCampaignId = "";
	
	// If a detected number is one of support number, route to Service:Default campaign.
	if (Invoca.Client.checkSupportNumber(support_number.support_default, detectedNumber)) {
		serviceCampaignId = campaignId.service_default;
	};
    
    // Check if the current url is matched to any of campaign specific urls.
	const urlCampaignMappings = [
		{ check: () => Invoca.Client.isURLMatch(url_list.service_cancel_flow), id: campaignId.service_cancel_flow },
		{ check: () => Invoca.Client.isURLMatch(url_list.service_payment_flow), id: campaignId.service_payment_flow },
		{ check: () => Invoca.Client.isURLMatch(url_list.service_tv_promise), id: campaignId.service_tv_promise },
		{ check: () => Invoca.Client.isURLMatch(url_list.service_movers), id: campaignId.service_movers },
		{ check: () => Invoca.Client.isURLMatch(url_list.service_tech_support_osd_error), id: campaignId.service_tech_support_osd_error },
		{ check: () => Invoca.Client.isURLMatch(url_list.service_reconnects), id: campaignId.service_reconnects },
	    { check: () => Invoca.Client.isURLContains(url_contains.service_cancel_flow), id: campaignId.service_cancel_flow },
	    { check: () => Invoca.Client.isURLContains(url_contains.service_movers), id: campaignId.service_movers },
		{ check: () => Invoca.Client.isServiceLanderRouting(detectedNumber), id: campaignId.service_default_ban },
		{ check: () => Invoca.Client.isCurrentUrlIncludesPath(url_list.service_default), id: campaignId.service_default },
	];

	for (const mapping of urlCampaignMappings) {
		if (mapping.check()) {
			return serviceCampaignId = mapping.id;
		};
	};
	return serviceCampaignId; // Default return value if no conditions are met
};

// To verify if calls should go to Service - No Intent: Lander campaign.
Invoca.Client.isServiceLanderRouting = function (detectedNumber) {
	// It should meet ALL of following 3 conditions:
	// 1. Users are authenticated(by checking BAN). 
	// 2. If a detected number is one of targetNumList.
	// 3. If a current URL is one of url_list.service_default_ban. 
	var authenticated = Invoca.Tools.readCookie("BAN");
	var isSupportNum = Invoca.Client.checkSupportNumber(support_number.lander, detectedNumber);
	var isCallingFromSupport = Invoca.Client.isURLMatch(url_list.service_default_ban);
	return !!authenticated && isSupportNum && isCallingFromSupport;
};


// To verify if a detected number is a customer number.
Invoca.Client.isCustomerNumber = function (node) {
	var ELEMENT = 1;
	var target = node.nodeType === ELEMENT ? node : node.parentNode;;
	var ID_FOR_CUSTOMER_NUMBER = "info-phoneNumber"
	var customerNumber = false;

  // If the HTML element where the number is detected has a Id, "info-phoneMumber", it means it is a customer number.  
	if (target && target.id && target.id === ID_FOR_CUSTOMER_NUMBER) {
		customerNumber = true;
	};
	return customerNumber;
};

// To verify if it's from /forbusiness page and if className "MuiGrid-root" is found.
Invoca.Client.isClassNameFromBusinessPage = function (node) {
	var classNameFound = false;
	if (Invoca.Client.isCurrentUrlIncludesPath(url_list.for_business)) {
		var parentNode = node && node.parentNode;
		var grandParentNode = parentNode.parentNode;
		if (grandParentNode.className.indexOf("MuiGrid-root") > -1) {
			classNameFound = true;
		};
	};
	return classNameFound;
};

// To verify if a detected number is a toll-free number. 
Invoca.Client.isTollFree = function (requestId) {
	function prefixPresent(tfnRegex) {
		var regex = new RegExp(tfnRegex, "g");
		return regex.test(requestId);
	};
	var isTollFreeResult = !tfnRegexArray.every(prefixPresent);
	return isTollFreeResult;
};

// To get a campaign ID by checking a current pathname.
// If it contains /forbusiness/, it routes to ""business" campagin.	
Invoca.Client.businessCheck = function () {
	return Invoca.Client.isCurrentUrlIncludesPath(url_list.for_business)? campaignId.business : null;
};

// To get a campaign ID by checking a current pathname
// Returned data: "default_1" or "business" or Service:Default or Service:Presense, or Service:Appointment or "directv_default".
Invoca.Client.getCurrCampaignId = function (detectedNumber) {
	return Invoca.Client.businessCheck() || 
		Invoca.Client.getServiceCampaignId(detectedNumber) || // movers
		campaignId.directv_default;
};


// ===================== Logic for number swap request(swap or campaign routing) =================
// This will be executed when the Invoca tag detects phone numbers on pages.
// This code block determines 1. whether the number should swap and 2. which campaign calls should be routed.
options.onPhoneNumberFound = function (node, requestData) {
	var detectedNumber = requestData.request_id;

	// To verify if a detected number is a toll-free number and set swap condition accordingly.
	// Swap condition:
	// 1. Toll free number and
	// 2.  It's not a customer number and
	// 3. The class name is not found in a business page.
	// 4. Current URL is not one of exclude url list and
	var shouldSwap = Invoca.Client.isTollFree(detectedNumber) &&
		!Invoca.Client.isCustomerNumber(node) &&
		!Invoca.Client.isClassNameFromBusinessPage(node) &&
		!Invoca.Client.isURLContains(url_contains.to_exclude_dni);

	// If shouldSwap is false, it doesn't send a number swap request by returning false.
	if (!shouldSwap) { 
		return false;
	};

	// To get a campaign Id and assign it to number swap request.
	requestData.advertiser_campaign_id_from_network = Invoca.Client.getCurrCampaignId(detectedNumber);

	if (Invoca.Client.getURLValue("referrer")) {
		requestData.params.invoca_detected_destination = "";
	};
	return requestData;
};

// Needed for lookup table routing
options.destinationSettings.paramName = "invoca_detected_destination";

// To Enable Google Analytics
options.integrations.googleAnalytics = true;

return options;
  };

  return true;
})();

var generatedOptions = {
  active:              true,
  autoSwap:            true,
  cookieDays:          cacheLifetimeDays,
  country:             "US",
  dataSilo:            "us",
  defaultCampaignId:   defaultCampaignId,
  destinationSettings: destinationSettings,
  disableUrlParams:    ['StreamEquipment','buy_flow_dest_num','buy_flow_num_tfnid','buy_flow_num_utm_id','dtvb_base_package','dtvb_call_disposition_reason','invoca_destination_number','ipbb','page_intent','s','utm_medium','utm_source'],
  doNotSwap:           ["866-294-3464", "800-651-5111", "866-772-3140", "800-390-2782", "800-651-1111", "800-772-3140", "800-691-4388", "800-901-9878", "866-241-6567", "866-241-6568", "866-435-3264", "877-782-8870", "888-562-8662", "888-490-6096", "888-471-4576", "888-258-7115", "888-267-1317", "877-844-5584", "866-975-0050", "855-288-2727", "866-385-3193", "877-996-7017", "866-642-4170", "800-288-2020", "800-331-0500", "800-525-6285", "888-397-3742", "800-680-7289", "844-519-2939", "877-926-3906", "866-949-4504", "844-528-3430", "855-206-3140", "855-394-8587", "855-430-0964", "888-763-6709", "844-928-5011"],
  formTrackingEnabled: formTrackingEnabled,
  integrations:        automaticIntegrations,
  maxWaitFor:          waitFor,
  networkId:           networkId || null,
  numberToReplace:     numbersToReplace,
  organicSources:      organicSources,
  poolParams:          {},
  reRunAfter:          reRunAfter,
  requiredParams:      requiredParams,
  resetCacheOn:        resetCacheOn,
  waitForData:         customDataWaitForConfig,
  waitForDataAnonymousFunctions:  customDataWaitForConfigAnonymousFunctions
};

Invoca.Client.startFromWizard(generatedOptions);

})(2074);
