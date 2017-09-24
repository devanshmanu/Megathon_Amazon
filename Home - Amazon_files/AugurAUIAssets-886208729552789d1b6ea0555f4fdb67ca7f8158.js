(function(v){var m=window.AmazonUIPageJS||window.P,q=m._namespace||m.attributeErrors,c=q?q("AugurAUIAssets"):m;c.guardFatal?c.guardFatal(v)(c,window):c.execute(function(){v(c,window)})})(function(v,m,q){ASPP.when("ASPA","augur-utils","augur-constants").register("augur-asettings",function(c,e,b){var a={augur_close_your_account_wf:{bound:!1},workflowName:null,selected_id:null,rawData:{}},d={init:function(b){a.hasOwnProperty(b)&&(a.workflowName=b,a.selected_id=null,a.rawData=e.getRawData(b),d.getWorkflowConfiguration().bound||
d.bind())},bind:function(){var a=d.getWorkflowConfiguration();c.declarative("augur-launch-ac","click",function(a){d.showNextNode(a,"augur-launch-ac")});c.declarative("augur-start-closure","click",function(a){d.showNextNode(a,"augur-start-closure")});c.declarative("augur-launch-ad","click",function(a){d.showNextNode(a,"augur-launch-ad")});c.declarative("augur-launch-p-home","click",function(a){d.showNextNode(a,"augur-launch-p-home")});a.bound=!0},showNextNode:function(d,k){var h=e.getRawData(a.workflowName),
g=e.getEncryptedPayload(a.workflowName),n={};n.next_sub_workflow=k;c.$("#augur_AC_popover_loading").removeClass(b.CLASSES.SPAUI_HIDDEN);e.getNextNode(a.workflowName,h,g,n)},getWorkflowConfiguration:function(){return a[a.workflowName]}};return{init:d.init}});ASPP.when("ASPA","augur-listing","augur-utils","augur-constants","augur-common","augur-payments","augur-reimbursement","augur-rrc","augur-asettings").register("augur",function(c,e,b,a,d,f,k,h,g){var n=c.$,l={},u={},w={},p={init:function(a){p.hydrate(a);
u[a]&&u[a].init(l,a);d.init(a);f.init(a);g.init(a);p.renderFirstNode(a)},hydrate:function(d){u.augur_no_listing_error_wf=e;u.augur_in_reimbursements_wf=k;u.augur_rrc_wf=h;l.augur=c.$(a.SELECTORS.AUGUR_MAIN);l.spaui=c.$("#spaui");l.body=c.$(document.body);w=b.getRawData(d)},renderFirstNode:function(a){n("div[augur-wf-append-to]").each(function(){var a=n(this).attr("augur-wf-append-to");n(this).children().each(function(){null!==this.id&&""!==this.id&&n("#"+a).find("#"+this.id).remove()});n("#"+a).append(n(this).html());
n(this).remove()});b.getMetricsHandleSecure(w)("wfDisplayed",{workflowName:a})}};return{init:p.init}});ASPP.when("ASPA","augur-utils","augur-constants").register("augur-common",function(c,e,b){var a={metricsHandle:null,initialized:!1,rawData:{}},d={init:function(b){a.rawData=e.getRawData(b);a.metricsHandle=e.getMetricsHandleSecure(a.rawData);a.initialized||(a.initialized=!0,d.eventSubscribe(),c.declarative("augur_link_transition","click",function(a){var b=e.getRawData(a.data.workflowName),d=e.getEncryptedPayload(a.data.workflowName),
f={};f[a.data.outputKey]=a.data.choice;e.getNextNode(a.data.updatingDivId,b,d,f)}),d.delegateBind())},delegateBind:function(){c.$(b.SELECTORS.AUGUR_MAIN).undelegate(b.SELECTORS.PRIMARY_ACTION_BUTTON,"click");c.$(b.SELECTORS.AUGUR_MAIN).delegate(b.SELECTORS.PRIMARY_ACTION_BUTTON,"click",function(b){a.metricsHandle("mainButtonClick",d.getAdditionalDataFromEvent(b))});c.$(b.SELECTORS.AUGUR_MAIN).undelegate(b.SELECTORS.SECONDARY_ACTION_BUTTON,"click");c.$(b.SELECTORS.AUGUR_MAIN).delegate(b.SELECTORS.SECONDARY_ACTION_BUTTON,
"click",function(b){a.metricsHandle("secondaryActionClick",d.getAdditionalDataFromEvent(b))})},getAdditionalDataFromEvent:function(a){var b=c.$(a.target).parent(),d;b.hasClass("asp-declarative")&&(d=b.data("action"));return{url:a.target.href,action:d}},eventSubscribe:function(){c.on("spaui:newPage",function(){0<c.$(b.SELECTORS.AUGUR_MAIN).length&&d.delegateBind()})}};return{init:d.init,rebind:d.delegateBind}});ASPP.when("ASPA").register("augur-constants",function(c){var e=function(a){return Object.freeze!==
q?Object.freeze(a):a};c=e({AUGUR_MAIN:"#augur-ui",PRIMARY_ACTION_BUTTON:".augur-wf-primary-button",SECONDARY_ACTION_BUTTON:".augur-wf-secondary-link"});var b=e({TRANSITION_TIME:200}),e=e({DISABLED:"augur-disabled",SPAUI_HIDDEN:"asp-hidden"});return{SELECTORS:c,VALUES:b,CLASSES:e}});ASPP.when("ASPA","augur-utils").register("augur-rrc",function(c,e){var b={$dom:{},workflowName:"",metricsHandle:null,rawData:{}},a={init:function(b,f){a.hydrate(b,f);a.declaratives()},hydrate:function(a,f){b.$dom=
a;b.workflowName=f;b.rawData=e.getRawData(f);b.metricsHandle=e.getMetricsHandleSecure(b.rawData)},declaratives:function(){a.processOrderIdInput();a.checkOtherOrder()},processOrderIdInput:function(){c.declarative("augur_rrc_check_order_id","click",function(d){if(!a.isDataActionEmpty("augur_rrc_submit")){var f=$("#"+d.data.textInputId),c=f.val().trim(),h=/[A-Za-z\d]{3}-\d{7}-\d{7}/;if(""!==c&&c.match(h)){a.clearDataActionAndShowPopoverLoading("augur_rrc_submit");var f=e.getRawData(b.workflowName),h=
e.getEncryptedPayload(b.workflowName),g={};g[d.data.outputKey]=c;e.getNextNode(d.data.updatingDivId,f,h,g);b.metricsHandle("rrcOrderInput",{orderId:c})}else f.addClass("asp-form-error"),c&&$("#augur_rrc_invalid_order_id_msg_div").show()}})},checkOtherOrder:function(){c.declarative("augur_rrc_check_another_order","click",function(d){if(!a.isDataActionEmpty("augur_rrc_check_another_order_div")){a.clearDataActionAndShowPopoverLoading("augur_rrc_check_another_order_div");var f=e.getRawData(b.workflowName);
e.getNextNode(d.data.updatingDivId,f,"","");b.metricsHandle("lookOtherOrder")}})},isDataActionEmpty:function(a){return $("#"+a+" .asp-declarative").attr("data-action")?!1:!0},clearDataActionAndShowPopoverLoading:function(a){$("#"+a+" .asp-declarative").attr("data-action","");$("#augur_rrc_popover_loading").removeClass("asp-hidden")}};return{init:a.init}});ASPP.when("ASPA","augur-utils").execute(function(c,e){c.declarative("augur-fsl-increase-storage","click",function(b){$("#augur_fsl_current_usage_stats .asp-declarative").attr("data-action",
"");$("#augur_fsl_popover_loading").removeClass("asp-hidden");var a=e.getRawData(b.data.workflowName),d=e.getEncryptedPayload(b.data.workflowName),f={};f[b.data.outputKey]=b.data.storageType;e.getNextNode(b.data.updatingDivId,a,d,f);e.getMetricsHandleSecure(a)("strgIncReq",{storageType:b.data.storageType})})});ASPP.when("ASPA","augur-utils").register("augur-reimbursement",function(c,e){var b=c.$,a={$dom:{},workflowName:"",initializeAndResetFlag:!0,currentShownBlurb:1,blurbCount:0,metricsHandle:null,
rawData:{}},d=1,f=b("#augur_inr_blurb_prev_button"),k=b("#augur_inr_blurb_next_button"),h=b("#augur_inr_heading"),g={init:function(a,b){g.hydrate(a,b);g.bind();g.declaratives()},hydrate:function(b,d){a.$dom=b;a.workflowName=d;a.initializeAndResetFlag=!0;a.rawData=e.getRawData(d);a.metricsHandle=e.getMetricsHandleSecure(a.rawData)},bind:function(){a.$dom.body.undelegate("#augur_inr_blurb_prev_button","click").delegate("#augur_inr_blurb_prev_button","click",g.showPreviousBlurb);a.$dom.body.undelegate("#augur_inr_blurb_next_button",
"click").delegate("#augur_inr_blurb_next_button","click",g.showNextBlurb)},declaratives:function(){g.processOrderIdInput();g.processSelectedAsins();g.lookAnotherReturn()},processOrderIdInput:function(){c.declarative("augur_inr_process_order_id_input","click",function(d){if(!g.isDataActionEmpty("augur_inr_submit")){var f=b("#"+d.data.textInputId),c=f.val().trim(),k=/[A-Za-z\d]{3}-\d{7}-\d{7}/;if(c&&c.match(k)){g.clearDataActionAndShowPopoverLoading("augur_inr_submit");var f=e.getRawData(a.workflowName),
k=e.getEncryptedPayload(a.workflowName),h={};h[d.data.orderIdInputKeyName]=c;e.getNextNode(d.data.updatingDivId,f,k,h);a.metricsHandle("orderIdInput",{orderId:c})}else f.addClass("asp-form-error"),c&&b("#augur_inr_invalid_order_id").show()}})},processSelectedAsins:function(){c.declarative("augur_inr_process_selected_asins","click",function(d){if(!g.isDataActionEmpty("augur_inr_submit"))if(0===b("#augur-ui input[name="+d.data.checkboxInputName+"]").filter(":checked").length)b("#augur_inr_select_1_item_msg").show();
else{g.clearDataActionAndShowPopoverLoading("augur_inr_submit");var f;b("#augur-ui input[name="+d.data.checkboxInputName+"]:checked").each(function(){var a=b(this).val().split("::")[1];f=f?f+"|"+a:a});var c=e.getRawData(a.workflowName),k=e.getEncryptedPayload(a.workflowName),h={};h[d.data.pipeSeparatedAsinsKeyName]=f;e.getNextNode(d.data.updatingDivId,c,k,h);a.metricsHandle("selectedAsins",{asins:f})}})},lookAnotherReturn:function(){c.declarative("augur_inr_look_another_return","click",function(b){if(!g.isDataActionEmpty("augur_inr_look_another_return")){g.clearDataActionAndShowPopoverLoading("augur_inr_look_another_return");
var d=e.getRawData(a.workflowName);e.getNextNode(b.data.updatingDivId,d,"","");a.metricsHandle("lookOtherReturn")}})},isDataActionEmpty:function(a){return b("#"+a+" .asp-declarative").attr("data-action")?!1:!0},clearDataActionAndShowPopoverLoading:function(a){b("#"+a+" .asp-declarative").attr("data-action","");b("#augur_inr_popover_loading").removeClass("augur-hidden")},getCurrentShownBlurbElement:function(){return b("#augur_inr_item_number_"+a.currentShownBlurb)},moveFromViewToLeft:function(){var a=
g.getCurrentShownBlurbElement();a.animate({marginLeft:-1*h.outerWidth()});setTimeout(function(){a.hide()},275)},moveFromViewToRight:function(a){var b=g.getCurrentShownBlurbElement();b.animate({marginLeft:h.outerWidth()});setTimeout(function(){b.hide()},275)},moveIntoView:function(){var a=g.getCurrentShownBlurbElement();a.show();a.animate({marginLeft:"0px"})},showNextBlurb:function(){g.updateDomElements();a.initializeAndResetFlag&&g.initializeAndReset();g.moveFromViewToLeft();setTimeout(function(){a.currentShownBlurb++;
g.moveIntoView();2===a.currentShownBlurb&&g.enableButton(f);a.currentShownBlurb===d&&g.disableButton(k)},100)},showPreviousBlurb:function(){g.updateDomElements();g.moveFromViewToRight();setTimeout(function(){a.currentShownBlurb--;g.moveIntoView();1===a.currentShownBlurb&&g.disableButton(f);a.currentShownBlurb===d-1&&g.enableButton(k)},100)},enableButton:function(a){a.removeClass("asp-button-disabled");a.find("button").attr("disabled",!1)},disableButton:function(a){a.addClass("asp-button-disabled");
a.find("button").attr("disabled",!0)},initializeAndReset:function(){a.blurbCount=c.$(".augur-inr-blurb-content").length;d=a.blurbCount;a.currentShownBlurb=1;g.updateDomElements();a.initializeAndResetFlag=!1},updateDomElements:function(){f=c.$("#augur_inr_blurb_prev_button");k=c.$("#augur_inr_blurb_next_button");h=c.$("#augur_inr_heading")}};return{init:g.init}});ASPP.when("ASPA","augur-utils").register("augur-listing",function(c,e){var b=c.$,a={$dom:{},workflowName:"",initializeAndResetFlag:!0,
currentShownBlurb:1,blurbCount:0,isCaseCreatedBlurbPresent:!1,isCaseCreatedBlurbShown:!1,isHmdPollPresent:!1,metricsHandle:null,rawData:{}},d=1,f=b("#augur_nle_blurb_prev_button"),k=b("#augur_nle_blurb_next_button"),h=b("#augur_nle_heading"),g={init:function(a,b){g.hydrate(a,b);g.bind();g.declaratives()},hydrate:function(b,d){a.$dom=b;a.workflowName=d;a.initializeAndResetFlag=!0;a.rawData=e.getRawData(d);a.metricsHandle=e.getMetricsHandleSecure(a.rawData)},bind:function(){a.$dom.body.undelegate("#augur_nle_blurb_prev_button",
"click").delegate("#augur_nle_blurb_prev_button","click",g.showPreviousBlurb);a.$dom.body.undelegate("#augur_nle_blurb_next_button","click").delegate("#augur_nle_blurb_next_button","click",g.showNextBlurb);a.$dom.body.undelegate("#augur_nle_help_hmd_yes","click").delegate("#augur_nle_help_hmd_yes","click",g.hmdYes);a.$dom.body.undelegate("#augur_nle_help_hmd_no","click").delegate("#augur_nle_help_hmd_no","click",g.hmdNo)},hmdYes:function(){b("#augur_nle_help_hmd_question").slideUp();b("#augur_nle_help_hmd_yes_message").slideDown();
a.metricsHandle("hmdYes")},hmdNo:function(){b("#augur_nle_help_hmd_question").slideUp();b("#augur_nle_help_hmd_no_message").slideDown();g.createCase("hmdCaseCreate")},getCurrentWorkflowState:function(){return e.getCurrentWorkflowState(a.workflowName)},declaratives:function(){g.processMfnListingInput();g.processFbaListingInput();g.lookAnotherItem();g.processSelectedRadioOption();g.setItemDetailsIntoState();g.showListingBlurbs();g.askForCreateCase()},showListingBlurbs:function(){c.declarative("augur_nle_review_and_fix",
"click",function(b){if(!g.isDataActionEmpty("augur_nle_submit")){g.clearDataActionAndShowPopoverLoading("augur_nle_submit");var d=e.getRawData(a.workflowName),f=e.getEncryptedPayload(a.workflowName);e.getNextNode(b.data.updatingDivId,d,f,{dummy_key:"dummy_value"});a.metricsHandle("showBlurbs")}})},processMfnListingInput:function(){c.declarative("augur_nle_process_mfn_listing_input","click",function(d){if(!g.isDataActionEmpty("augur_nle_submit")){var f=b("#"+d.data.textInputId),c=f.val().trim();if(""===
c)f.addClass("asp-form-error");else{g.clearDataActionAndShowPopoverLoading("augur_nle_submit");var f=e.getRawData(a.workflowName),k=e.getEncryptedPayload(a.workflowName),h={};h[d.data.asinSkuFnskuInputKeyName]=c;h[d.data.isItemFbaKeyName]=!1;h[d.data.asinDetailsListObjectKeyName]="myi_listings_by_filter_type";e.getNextNode(d.data.updatingDivId,f,k,h);a.metricsHandle("nleMfnInput",{nleInputValue:c})}}})},processFbaListingInput:function(){c.declarative("augur_nle_process_fba_listing_input","click",
function(d){if(!g.isDataActionEmpty("augur_nle_submit")){var f=b("#"+d.data.textInputId),c=b("#augur-ui input[name="+d.data.radioOptionName+"]"),k=f.val().trim();if(""===k)f.addClass("asp-form-error");else if(0!==c.filter(":checked").length){g.clearDataActionAndShowPopoverLoading("augur_nle_submit");var f=e.getRawData(a.workflowName),h=e.getEncryptedPayload(a.workflowName),t="Fulfilled by: Amazon"===c.filter(":checked").val()?!0:!1,r="X"===k[0]?!0:!1,m={};m[d.data.asinSkuFnskuInputKeyName]=k;m[d.data.isItemFbaKeyName]=
t;m[d.data.asinDetailsListObjectKeyName]=!0===t?"afn_listings_by_filter_type":"myi_listings_by_filter_type";m[d.data.isPotentialFnskuKeyName]=r;e.getNextNode(d.data.updatingDivId,f,h,m);a.metricsHandle("nleFbaInput",{nleFbaInputValue:k+"-"+c.filter(":checked").val()})}}})},lookAnotherItem:function(){c.declarative("augur_nle_look_another_listing","click",function(b){if(!g.isDataActionEmpty("augur_nle_look_another_listing")){g.clearDataActionAndShowPopoverLoading("augur_nle_look_another_listing");var d=
e.getRawData(a.workflowName);e.getNextNode(b.data.updatingDivId,d,"","");a.metricsHandle("lookOtherItem")}})},setItemDetailsIntoState:function(){c.declarative("augur_nle_set_item_details_into_state","click",function(d){if(!g.isDataActionEmpty("augur_nle_submit")){g.clearDataActionAndShowPopoverLoading("augur_nle_submit");for(var f=e.getRawData(a.workflowName),c=e.getEncryptedPayload(a.workflowName),k={},h=b("#augur_nle_product_details_key_value").data("value").split("::")[0].split("|"),t=b("#augur_nle_product_details_key_value").data("value").split("::")[1].split("|"),
r=0;r<h.length;r++)k["augur_nle_"+h[r]]=t[r].trim();e.getNextNode(d.data.updatingDivId,f,c,k);a.metricsHandle("itemDetails",{keys:h.toString(),values:t.toString})}})},processSelectedRadioOption:function(){c.declarative("augur_nle_process_selected_radio_option","click",function(d){if(!g.isDataActionEmpty("augur_nle_submit")){var f=b("#augur-ui input[name="+d.data.radioInputName+"]");if(0!==f.filter(":checked").length){g.clearDataActionAndShowPopoverLoading("augur_nle_submit");for(var c=e.getRawData(a.workflowName),
k=e.getEncryptedPayload(a.workflowName),h={},t=f.filter(":checked").val().split("::")[0].split("|"),f=f.filter(":checked").val().split("::")[1].split("|"),r=0;r<t.length;r++)h["augur_nle_"+t[r]]=f[r].trim();e.getNextNode(d.data.updatingDivId,c,k,h);a.metricsHandle("skuRadioSelected",{keys:t.toString(),values:f.toString})}}})},isDataActionEmpty:function(a){return b("#"+a+" .asp-declarative").attr("data-action")?!1:!0},clearDataActionAndShowPopoverLoading:function(a){b("#"+a+" .asp-declarative").attr("data-action",
"");b("#augur_nle_popover_loading").removeClass("asp-hidden")},getCurrentShownBlurbElement:function(){return b("#augur_nle_blurb_num_"+a.currentShownBlurb)},moveFromViewToLeft:function(){var a=g.getCurrentShownBlurbElement();a.animate({marginLeft:-1*h.outerWidth()});setTimeout(function(){a.hide()},275)},moveFromViewToRight:function(a){var b=g.getCurrentShownBlurbElement();b.animate({marginLeft:h.outerWidth()});setTimeout(function(){b.hide()},275)},moveIntoView:function(){var a=g.getCurrentShownBlurbElement();
a.show();a.animate({marginLeft:"0px"})},askForCreateCase:function(){c.declarative("augur_nle_create_case_yes","click",function(d){g.isDataActionEmpty("augur_nle_case_create_yes")||(b("#augur_nle_case_create_yes .asp-declarative").attr("data-action",""),b("#augur_nle_get_case_id_loading").slideDown(),a.isCaseCreatedBlurbShown=!0,g.createCase("autoCaseCreate"))})},createCase:function(d){var f="",c={dummy_key:"dummy_value"},g=e.getRawData(a.workflowName),k=e.getEncryptedPayload(a.workflowName);"autoCaseCreate"===
d?(f=b("#augur_nle_case_text_input_area").val(),c.augur_nle_case_details_by_merchant=f,e.getNextNode("augur_nle_ask_for_case_creation",g,k,c)):"hmdCaseCreate"===d&&e.getNextNode("augur_nle_hmd_poll",g,k,c)},showNextBlurb:function(){g.updateDomElements();a.initializeAndResetFlag&&g.initializeAndReset();g.moveFromViewToLeft();setTimeout(function(){a.currentShownBlurb++;g.moveIntoView();a.blurbMetricSent[a.currentShownBlurb]||(g.sendBlurbMetrics(),a.currentShownBlurb===d&&a.metricsHandle("allBlurbsRead"),
a.blurbMetricSent[a.currentShownBlurb]=!0);a.currentShownBlurb===d&&a.isHmdPollPresent&&c.$("#augur_nle_hmd_poll").show();2===a.currentShownBlurb&&g.enableButton(f);a.currentShownBlurb===d&&g.disableButton(k)},100)},showPreviousBlurb:function(){g.updateDomElements();g.moveFromViewToRight();setTimeout(function(){a.currentShownBlurb--;g.moveIntoView();1===a.currentShownBlurb&&g.disableButton(f);a.currentShownBlurb===d-1&&g.enableButton(k)},100)},sendBlurbMetrics:function(){var b=g.getCurrentShownBlurbElement(),
d=b.data("issue-name"),b=b.data("issue-type");a.metricsHandle("blurbShown",{blurbNumber:a.currentShownBlurb,totalBlurbCount:a.blurbCount,issueType:b,issueName:d})},enableButton:function(a){a.removeClass("asp-button-disabled");a.find("button").attr("disabled",!1)},disableButton:function(a){a.addClass("asp-button-disabled");a.find("button").attr("disabled",!0)},initializeAndReset:function(){a.blurbCount=c.$(".augur-nle-listing-blurb-content").length;a.blurbMetricSent=[];for(var b=2;b<=a.blurbCount;b++)a.blurbMetricSent[b]=
!1;a.isCaseCreatedBlurbPresent=0<c.$("#augur_nle_auto_create_case_id").length?!0:!1;a.isHmdPollPresent=0<c.$("#augur_nle_hmd_poll").length?!0:!1;a.isCaseCreatedBlurbShown=!1;d=a.blurbCount;a.currentShownBlurb=1;g.updateDomElements();a.initializeAndResetFlag=!1},updateDomElements:function(){f=c.$("#augur_nle_blurb_prev_button");k=c.$("#augur_nle_blurb_next_button");h=c.$("#augur_nle_heading")}};return{init:g.init,createNleCase:g.createCase}});ASPP.when("ASPA","augur-utils","augur-constants").register("augur-payments",
function(c,e,b){var a={augur_why_not_paid_wf:{bound:!1,radio_declarative:"augur-payment-selection",radio_selector:"#augur-ui input[name=WNP-payment-selection]:checked",submit_declarative:"augur-submit-payment-for-investigation",submit_variable_name:"selected_payment_id",selection_error_selector:"#augur_WNP_selection_error"},augur_when_get_paid_wf:{bound:!1,radio_declarative:"augur-order-selection",radio_selector:"#augur-ui input[name=WPO-order-selection]:checked",submit_declarative:"augur-submit-order-for-investigation",
submit_variable_name:"selected_order_id",selection_error_selector:"#augur_WPO_selection_error",input_box_id_selector:"#augur-wpo-order-input",input_box_validation_message_selector:"#augur-mismatch-order",order_id_regex:"^[sScC\\d]{2}\\d-\\d{7}-\\d{7}$"},workflowName:null,selected_id:null,rawData:{}},d={init:function(b){a.hasOwnProperty(b)&&(a.workflowName=b,a.selected_id=null,a.rawData=e.getRawData(b),b=d.getWorkflowConfiguration(),b.bound||d.bind(),b.input_box_id_selector!==q&&d.bindInputBox(b))},
bind:function(){var a=d.getWorkflowConfiguration();c.declarative(a.radio_declarative,"click",function(b){d.pullIdFromRadio(b,a.radio_selector)});c.declarative(a.submit_declarative,"click",function(b){d.submitId(b,a.submit_variable_name)});a.bound=!0},pullIdFromRadio:function(a,b){var e=c.$(b);0!==e.length&&(d.setSelectedId(a.data[e.val()]),d.clearInputBox())},setSelectedId:function(b){a.selected_id=b;b=d.getErrorElement();d.hideError(b)},submitId:function(f,k){if(d.validateSelection()&&!f.$target.hasClass(b.CLASSES.DISABLED)){f.$target.addClass(b.CLASSES.DISABLED);
var h=e.getRawData(a.workflowName),g=e.getEncryptedPayload(a.workflowName),n={};n[k]=a.selected_id;c.$("#augur-popover").removeClass(b.CLASSES.SPAUI_HIDDEN);e.getNextNode(a.workflowName,h,g,n)}else h=d.getErrorElement(),d.showError(h)},validateSelection:function(){return null!==a.selected_id&&a.selected_id!==q},getErrorElement:function(){return c.$(a[a.workflowName].selection_error_selector)},showError:function(a){a.hasClass(b.CLASSES.SPAUI_HIDDEN)&&(a.hide(),a.removeClass(b.CLASSES.SPAUI_HIDDEN),
a.slideDown(b.VALUES.TRANSITION_TIME))},hideError:function(a){a.hasClass(b.CLASSES.SPAUI_HIDDEN)||a.slideUp(b.VALUES.TRANSITION_TIME,function(){a.addClass(b.CLASSES.SPAUI_HIDDEN)})},bindInputBox:function(a){c.$(b.SELECTORS.AUGUR_MAIN).delegate(a.input_box_id_selector,"keyup",function(){var b=c.$(this),e=new RegExp(a.order_id_regex),g=c.$(a.input_box_validation_message_selector);e.test(b.val())?d.hideError(g):d.showError(g);d.setSelectedId(b.val());d.clearRadioButton()})},clearInputBox:function(){var a=
d.getWorkflowConfiguration();a.input_box_id_selector!==q&&(c.$(a.input_box_id_selector).val(""),a=c.$(a.input_box_validation_message_selector),d.hideError(a))},clearRadioButton:function(){c.$(d.getWorkflowConfiguration().radio_selector).attr("checked",!1)},getWorkflowConfiguration:function(){return a[a.workflowName]}};return{init:d.init}});ASPP.when("ASPA","spaui-external-metrics").register("augur-utils",function(c,e){var b=c.$,a={getNextNode:function(d,f,e,h,g){var n=f.client,l=f.workflowAbbr;
g=f.workflowId?f.workflowId:g;var m=f.currentNodeId,q=f.directAnswerWidgetId,p;p=n&&l?a.getMetricsHandleSecure(f):!1;f=h?a.jsonStringify(h):"";c.post("/help/workflow/execute-workflow",{params:{workflowId:g,client:n,envelope:e,newAttributes:f,directAnswerWidgetId:q},success:function(a,f,c){d&&"NONE"!==d.toUpperCase()&&(f=b("<div />"),f.html(a),0!==f.find(".augur-workflow-error").length?(b("#"+d).html(a),p&&p("getNodeErr",{currentNodeId:m})):(b("#"+d).html(""),f.children().each(function(){var a=b(this).attr("augur-wf-append-to");
b(this).children().each(function(){null!==this.id&&""!==this.id&&b("#"+a).find("#"+this.id).remove()});b("#"+a).append(b(this).html());b(this).remove()}),p&&p("getNodeSucc",{currentNodeId:m})))},error:function(a,f,c){d&&"NONE"!==d.toUpperCase()&&(b("#"+d).html("<div class='asp-padding-base'><b>We are facing some technical issues as of now, please try again later.<b></div>"),p&&p("getNodeFatal",{currentNodeId:m}))},timeout:8E4})},getNextStep:function(d,f,e){var h=f.diagRunId?f.diagRunId:"",g=f.currentStepName?
f.currentStepName:"",n=f.requiredAttributes?f.requiredAttributes:"",l=f.diagnosticName?f.diagnosticName:"",m=f.client?f.client:"",q=f.workflowAbbr?f.workflowAbbr:"",p;p=m&&q?a.getMetricsHandleSecure(f):!1;f=e?a.jsonStringify(e):"";c.post("/help/workflow/execute-workflow",{params:{workflowId:l,requiredAttributes:n,currentStepName:g,newAttributes:f,diagRunId:h,client:m},success:function(a,f,c){d&&"NONE"!==d.toUpperCase()&&(f=b("<div />"),f.html(a),0!==f.find(".augur-workflow-error").length?b("#augur-paramount-ui").html(a):
b("#"+d).html(a))},error:function(a,f,c){d&&"NONE"!==d.toUpperCase()&&(b("#"+d).html("<div class='asp-padding-base'><b>We are facing some technical issues as of now, please try again later.<b></div>"),p&&p("getNodeFatal",{currentStepName:g}))},timeout:8E4})},jsonStringify:function(b){return m.JSON&&JSON.stringify?JSON.stringify(b):a.mapToString(b)},mapToString:function(b){var f="{",c=0;if(null!==b)for(var e in b)b.hasOwnProperty(e)&&(0!==c&&(f+=", "),f+='"'+e+'":"'+a.escapeJson(b[e])+'"',c++);return f+
"}"},escapeJson:function(a){var b=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,c={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};b.lastIndex=0;return a.replace(b,function(a){return c[a]?c[a]:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})},getWevObjectTypeName:function(){return"workflow_execution_variables"},setIntoState:function(a,b,c,e){for(var g=0;g<a.racerXObjects.length;g++)a.racerXObjects[g].objectType===
b&&(a.racerXObjects[g].attributes[c]=e)},regexMatches:function(a,b){var c=!0;b&&b.data.validation_pattern&&(c=(new RegExp(b.data.validation_pattern)).test(a));return c},nextClicked:function(d,c){var e={},h=a.getRawData(d),g=!1;b("#augur-paramount-ui").find(".input_items").each(function(){if("INPUT"===this.tagName&&"text"===this.type){var h=this.id,l=b(this).val().trim();""===l?(b("#"+d+"_validation_pattern_"+h).addClass("asp-hidden"),b("#"+d+"_empty_input_"+h).removeClass("asp-hidden"),g=!0):a.regexMatches(l,
c)?e[h]=l:(b("#"+d+"_empty_input_"+h).addClass("asp-hidden"),b("#"+d+"_validation_pattern_"+h).removeClass("asp-hidden"),g=!0)}"LABEL"===this.tagName&&"radio"===this.firstChild.type&&((l=b("input[name="+this.firstChild.name+"]").filter(":checked").val())?e[this.firstChild.name]=l:g=!0);"TEXTAREA"===this.tagName&&(l=b(this).val().trim(),""===l?(b("#"+d+"_empty_input_"+this.id).removeClass("asp-hidden"),g=!0):e[this.id]=l)});!1===g&&(b("#"+d+"_popover_loading").removeClass("asp-hidden"),a.getNextStep(d+
"_content_div",h,e))},yesClicked:function(d){var c={},e=a.getRawData(d);b("#"+d+"_popover_loading").removeClass("asp-hidden");b("#augur-paramount-ui").find("#yes_button").each(function(){c[this.name]=this.value});a.getNextStep(d+"_content_div",e,c)},noClicked:function(d){var c={},e=a.getRawData(d);b("#"+d+"_popover_loading").removeClass("asp-hidden");b("#augur-paramount-ui").find("#no_button").each(function(){c[this.name]=this.value});a.getNextStep(d+"_content_div",e,c)},pressedEnter:function(d,c){b("#"+
d+"_default_next_button_id").removeClass("asp-button-disabled");var e={},h=a.getRawData(d),g=!1;13===c.$event.keyCode&&(b("#augur-paramount-ui").find(".input_items").each(function(){if("INPUT"===this.tagName&&"text"===this.type){var h=this.id,l=b(this).val().trim();""===l?(b("#"+d+"_validation_pattern_"+h).addClass("asp-hidden"),b("#"+d+"_empty_input_"+h).removeClass("asp-hidden"),g=!0):a.regexMatches(l,c)?e[h]=l:(b("#"+d+"_empty_input_"+h).addClass("asp-hidden"),b("#"+d+"_validation_pattern_"+h).removeClass("asp-hidden"),
g=!0)}"TEXTAREA"===this.tagName&&(l=b(this).val().trim(),""===l?(b("#"+d+"_empty_input_"+this.id).removeClass("asp-hidden"),g=!0):e[this.id]=l)}),!1===g&&(b("#"+d+"_popover_loading").removeClass("asp-hidden"),a.getNextStep(d+"_content_div",h,e)))},emptyCurrentStepData:function(d){b("#"+d+"_popover_loading").removeClass("asp-hidden");var c={};d=a.getRawData(d);c.diagnosticName=d.diagnosticName;c.client=d.client;c.workflowAbbr=d.workflowAbbr;a.getNextStep("augur-paramount-ui",c,"")},getCurrentWorkflowState:function(a){return c.state(a+
"_state")},getWorkflowId:function(b){return a.getValueOfKeyFromState(b,"workflow_id")},getCurrentNodeId:function(b){return a.getValueOfKeyFromState(b,"current_node")},getValueOfKeyFromState:function(b,c){for(var e=0;e<b.racerXObjects.length;e++)if(b.racerXObjects[e].objectType===a.getWevObjectTypeName())return b.racerXObjects[e].attributes[c]},getMetricsHandleSecure:function(a){var b=a.client;a=a.workflowAbbr;if(b&&a)return e.register(a,b);console.error("[AugurUI] Client name or workflowAbbr cannot be null or empty.")},
waitForWorkflowToBeRead:function(b,c){setTimeout(function(){a.postMetricsIfWorkflowIsPresent(b,c)},c.timeout)},postMetricsIfWorkflowIsPresent:function(d,c){var e=c.elements_to_check.split("|"),h=!0;b.each(e,function(b,d){a.isElementPresent(d)||(h=!1)});h&&d(c.summary,c)},isElementPresent:function(d){d=b("#"+d);return 0<d.length&&d.is(":visible")&&a.isScrolledIntoView(d)?!0:!1},isScrolledIntoView:function(a){var c=b(m).scrollTop(),e=c+b(m).height(),h=a.offset().top;return h+a.height()<=e&&h>=c},getRawData:function(a){return c.state(a+
"_raw_data")},getEncryptedPayload:function(a){return c.state(a+"_encrypted_data").data},displayHoverText:function(a){var c=b("#augur_paramount_workflow_image_hover_id").position().left,c=(290<=c?-240:-c+30)+"px";b(".augur_paramount_workflow_hover_display_text").append(a.data.supplemental_info);b(".augur_paramount_workflow_hover_display_text").css({left:c,visibility:"visible"});b(".augur_paramount_workflow_tooltip").css({visibility:"visible"})},hideHoverText:function(a){b(".augur_paramount_workflow_hover_display_text").empty();
b(".augur_paramount_workflow_hover_display_text").css({visibility:"hidden"});b(".augur_paramount_workflow_tooltip").css({visibility:"hidden"})}};return{getNextNode:a.getNextNode,getWevObjectTypeName:a.getWevObjectTypeName,setIntoState:a.setIntoState,getValueOfKeyFromState:a.getValueOfKeyFromState,getWorkflowId:a.getWorkflowId,getCurrentNodeId:a.getCurrentNodeId,getCurrentWorkflowState:a.getCurrentWorkflowState,waitForWorkflowToBeRead:a.waitForWorkflowToBeRead,getMetricsHandleSecure:a.getMetricsHandleSecure,
getRawData:a.getRawData,getEncryptedPayload:a.getEncryptedPayload,getNextStep:a.getNextStep,emptyCurrentStepData:a.emptyCurrentStepData,nextClicked:a.nextClicked,pressedEnter:a.pressedEnter,yesClicked:a.yesClicked,noClicked:a.noClicked,regexMatches:a.regexMatches,displayHoverText:a.displayHoverText,hideHoverText:a.hideHoverText}});ASPP.when("ASPA","augur-utils").execute(function(c,e){c.declarative("augur_wd_check_asin_fnsku","click",function(b){$("#augur_wd_submit .asp-declarative").attr("data-action",
"");$("#augur_wd_popover_loading").removeClass("asp-hidden");var a=$("#"+b.data.textInputId).val(),a=a.trim(),c=e.getRawData(b.data.workflowName),f=e.getEncryptedPayload(b.data.workflowName),k={};k[b.data.outputKey]=a;e.getNextNode(b.data.updatingDivId,c,f,k);e.getMetricsHandleSecure(c)("asinFnskuInpt",{textInputValue:a})});c.declarative("augur_wd_check_case_details","click",function(b){$("#augur_wd_done .asp-declarative").attr("data-action","");$("#augur_wd_popover_loading").removeClass("asp-hidden");
var a=$("#"+b.data.caseDetailsInputId).val(),c=e.getRawData(b.data.workflowName),f=e.getEncryptedPayload(b.data.workflowName),k={};k[b.data.outputKey]=a;e.getNextNode(b.data.updatingDivId,c,f,k);e.getMetricsHandleSecure(c)("caseDetailsInpt",{caseDetailsInputValue:a})});c.declarative("augur_wd_radio_fnsku_selected","click",function(b){$("#augur_wd_next .asp-declarative").attr("data-action","");$("#augur_wd_popover_loading").removeClass("asp-hidden");var a=$("input[name=radioButtonSelectValue]").filter(":checked").val(),
c=e.getRawData(b.data.workflowName),f=e.getEncryptedPayload(b.data.workflowName),k={};k[b.data.outputKey]=a;e.getNextNode(b.data.updatingDivId,c,f,k);e.getMetricsHandleSecure(c)("fnskuInpt",{fnskuInputValue:a})});c.declarative("augur_wd_radio_selected","click",function(b){$("input[name=radioButtonSelectValue]").is(":checked")&&$("#augur_wd_next").removeClass("asp-hidden")});c.declarative("augur_wd_check_another_asin_fnsku","click",function(b){$("#augur_wd_popover_loading_link").removeClass("asp-hidden");
var a=c.state(b.data.workflowName+"_raw_data");e.getNextNode(b.data.updatingDivId,a,"","")})});ASPP.when("ASPA","augur-utils").execute(function(c,e){c.declarative("augur_whl_check_sku_fnsku","click",function(b){$("#augur_whl_submit .asp-declarative").attr("data-action","");$("#augur_whl_popover_loading").removeClass("asp-hidden");var a=$("#"+b.data.textInputId).val(),a=a.trim(),c=e.getRawData(b.data.workflowName),f=e.getEncryptedPayload(b.data.workflowName),k={};k[b.data.outputKey]=a;
e.getNextNode(b.data.updatingDivId,c,f,k);e.getMetricsHandleSecure(c)("skuFnskuInpt",{textInputValue:a})});c.declarative("augur_whl_radio_fnsku_selected","click",function(b){$("#augur_whl_next .asp-declarative").attr("data-action","");$("#augur_whl_popover_loading").removeClass("asp-hidden");var a=$("input[name=radioButtonSelectValue]").filter(":checked").val(),c=e.getRawData(b.data.workflowName),f=e.getEncryptedPayload(b.data.workflowName),k={};k[b.data.outputKey]=a;e.getNextNode(b.data.updatingDivId,
c,f,k);e.getMetricsHandleSecure(c)("fnskuInpt",{fnskuInputValue:a})});c.declarative("augur_whl_radio_selected","click",function(b){$("input[name=radioButtonSelectValue]").is(":checked")&&$("#augur_whl_next").removeClass("asp-hidden")})});ASPP.when("ASPA","augur-utils").execute(function(c,e){c.declarative("augur_paramount_hazmat_wf_next_clicked","click",function(b){e.nextClicked("augur_paramount_hazmat_wf")});c.declarative("augur_paramount_hazmat_wf_pressed_enter","keyup",function(b){e.pressedEnter("augur_paramount_hazmat_wf",
b)});c.declarative("augur_paramount_hazmat_wf_radio_clicked","click",function(b){$("#augur_paramount_hazmat_wf_default_next_button_id").removeClass("asp-button-disabled")});c.declarative("augur_paramount_hazmat_wf_redirect_link_button","click",function(b){$("#augur_paramount_hazmat_wf_input_button .asp-declarative").attr("data-action","");m.location.href=b.data.redirect_url});c.declarative("augur_paramount_hazmat_wf_check_another","click",function(b){e.emptyCurrentStepData("augur_paramount_hazmat_wf")})});
ASPP.when("ASPA","augur-utils").execute(function(c,e){c.declarative("augur_paramount_reserved_inventory_wf_next_clicked","click",function(b){e.nextClicked("augur_paramount_reserved_inventory_wf")});c.declarative("augur_paramount_reserved_inventory_wf_pressed_enter","keyup",function(b){e.pressedEnter("augur_paramount_reserved_inventory_wf",b)});c.declarative("augur_paramount_reserved_inventory_wf_radio_clicked","click",function(b){$("#augur_paramount_reserved_inventory_wf_default_next_button_id").removeClass("asp-button-disabled")});
c.declarative("augur_paramount_reserved_inventory_wf_check_another","click",function(b){e.emptyCurrentStepData("augur_paramount_reserved_inventory_wf")});c.declarative("augur_paramount_reserved_inventory_wf_hover_text","mouseenter",function(b){e.displayHoverText(b)});c.declarative("augur_paramount_reserved_inventory_wf_hover_text","mouseleave",function(b){e.hideHoverText(b)});c.declarative("augur_paramount_reserved_inventory_wf_create_case_link","click",function(b){b=e.getRawData("augur_paramount_reserved_inventory_wf");
$("#augur_paramount_reserved_inventory_wf_popover_loading").removeClass("asp-hidden");e.getNextStep("augur_paramount_reserved_inventory_wf_content_div",b,{create_case:"true"})})});ASPP.when("ASPA","augur-utils").execute(function(c,e){c.declarative("augur_paramount_pge_wf_next_clicked","click",function(b){e.nextClicked("augur_paramount_pge_wf",b)});c.declarative("augur_paramount_pge_wf_yes_clicked","click",function(b){e.yesClicked("augur_paramount_pge_wf")});c.declarative("augur_paramount_pge_wf_no_clicked",
"click",function(b){e.noClicked("augur_paramount_pge_wf")});c.declarative("augur_paramount_pge_wf_pressed_enter","keyup",function(b){e.pressedEnter("augur_paramount_pge_wf",b)});c.declarative("augur_paramount_pge_wf_radio_clicked","click",function(b){$("#augur_paramount_pge_wf_default_next_button_id").removeClass("asp-button-disabled")});c.declarative("augur_paramount_pge_wf_redirect_link_button","click",function(b){m.location.href=b.data.redirect_url});c.declarative("augur_paramount_pge_wf_check_another",
"click",function(b){e.emptyCurrentStepData("augur_paramount_pge_wf")});c.declarative("augur_paramount_pge_wf_hover_text","mouseenter",function(b){e.displayHoverText(b)});c.declarative("augur_paramount_pge_wf_hover_text","mouseleave",function(b){e.hideHoverText(b)})})});