define(["paperdialoghelper","scripts/livetvcomponents","livetvcss","paper-checkbox","paper-input","paper-toggle-button"],function(e){function n(){return LiveTvHelpers.getDaysOfWeek().map(function(e){return e.value})}function i(e){for(var i=n(),t=[],r=0,o=i.length;o>r;r++){var s=i[r];$("#chk"+s,e).checked()&&t.push(s)}return t}function t(e){d(e.querySelector("#seriesFields")),e.querySelector(".btnSubmitContainer").classList.remove("hide"),e.querySelector(".supporterContainer").classList.add("hide")}function r(n){b=n,e.close(m)}function o(){Dashboard.showLoadingMsg();var e=this;return ApiClient.getNamedConfiguration("livetv").then(function(n){n.EnableRecordingEncoding=$("#chkConvertRecordings",e).checked(),ApiClient.updateNamedConfiguration("livetv",n).then(Dashboard.processServerConfigurationUpdateResult)}),ApiClient.getNewLiveTvTimerDefaults({programId:v}).then(function(n){n.PrePaddingSeconds=60*$("#txtPrePaddingMinutes",e).val(),n.PostPaddingSeconds=60*$("#txtPostPaddingMinutes",e).val(),n.RecordNewOnly=$("#chkNewOnly",e).checked(),n.RecordAnyChannel=$("#chkAllChannels",e).checked(),n.RecordAnyTime=$("#chkAnyTime",e).checked(),n.Days=i(e),$("#chkRecordSeries",e).checked()?ApiClient.createLiveTvSeriesTimer(n).then(function(){Dashboard.hideLoadingMsg(),r(!0)}):ApiClient.createLiveTvTimer(n).then(function(){Dashboard.hideLoadingMsg(),r(!0)})}),!1}function s(e){return Dashboard.showLoadingMsg(),ApiClient.getJSON(ApiClient.getUrl("LiveTv/Registration",{ProgramId:e,Feature:"seriesrecordings"})).then(function(e){return Dashboard.hideLoadingMsg(),e},function(){return Dashboard.hideLoadingMsg(),{TrialVersion:!0,IsValid:!0,IsRegistered:!1}})}function a(e){c(e.querySelector("#seriesFields")),e.querySelector(".btnSubmitContainer").classList.remove("hide"),s(v).then(function(n){n.IsValid?e.querySelector(".btnSubmitContainer").classList.remove("hide"):e.querySelector(".btnSubmitContainer").classList.add("hide"),n.IsRegistered?e.querySelector(".supporterContainer").classList.add("hide"):(e.querySelector(".supporterContainer").classList.remove("hide"),n.TrialVersion?e.querySelector(".supporterTrial").classList.remove("hide"):e.querySelector(".supporterTrial").classList.add("hide"))})}function c(e){e.classList.contains("hide")&&(e.classList.remove("hide"),e.style.overflow="hidden",requestAnimationFrame(function(){e.animate([{height:0},{height:e.offsetHeight+"px"}],{duration:400,easing:"ease"}).onfinish=function(){e.classList.remove("hide")}}))}function d(e){e.classList.contains("hide")||(e.style.overflow="hidden",requestAnimationFrame(function(){e.animate([{height:e.offsetHeight+"px"},{height:0}],{duration:400,easing:"ease"}).onfinish=function(){e.classList.add("hide")}}))}function l(e){$("#chkRecordSeries",e).on("change",function(){this.checked?a(e):t(e)}),$(".btnCancel",e).on("click",function(){r(!1)}),e.querySelector(".chkAdvanced").addEventListener("change",function(n){for(var i=e.querySelectorAll(".advancedToggle"),t=n.target.checked,r=0,o=i.length;o>r;r++)t?c(i[r]):d(i[r])}),$("form",e).off("submit",o).on("submit",o);for(var n=e.querySelectorAll(".btnSupporter"),i=0,s=n.length;s>i;i++)AppInfo.enableSupporterMembership?n[i].classList.remove("hide"):n[i].classList.add("hide");e.querySelector(".btnSupporterForConverting a").href=AppInfo.enableSupporterMembership?"https://emby.media/premiere":"#",ApiClient.getNamedConfiguration("livetv").then(function(n){$("#chkConvertRecordings",e).checked(n.EnableRecordingEncoding)})}function h(e,i){for(var t=n(),r=0,o=t.length;o>r;r++){var s=t[r];$("#chk"+s,e).checked(-1!=i.indexOf(s))}}function u(e,n,i){$(".itemName",e).html(i.Name),$(".itemEpisodeName",e).html(i.EpisodeTitle||""),$(".itemMiscInfo",e).html(LibraryBrowser.getMiscInfoHtml(i)),$(".itemMiscInfo a").each(function(){$(this).replaceWith(this.innerHTML)}),$("#chkNewOnly",e).checked(n.RecordNewOnly),$("#chkAllChannels",e).checked(n.RecordAnyChannel),$("#chkAnyTime",e).checked(n.RecordAnyTime),$("#txtPrePaddingMinutes",e).val(n.PrePaddingSeconds/60),$("#txtPostPaddingMinutes",e).val(n.PostPaddingSeconds/60),i.IsSeries?$("#eligibleForSeriesFields",e).show():$("#eligibleForSeriesFields",e).hide(),h(e,n.Days),"Emby"==i.ServiceName?(e.querySelector(".convertRecordingsContainer").classList.remove("hide"),g(e)):e.querySelector(".convertRecordingsContainer").classList.add("hide"),Dashboard.hideLoadingMsg()}function g(e){Dashboard.getPluginSecurityInfo().then(function(n){n.IsMBSupporter?e.querySelector(".btnSupporterForConverting").classList.add("hide"):e.querySelector(".btnSupporterForConverting").classList.remove("hide")},function(){e.querySelector(".btnSupporterForConverting").classList.remove("hide")})}function p(e,n){Dashboard.showLoadingMsg();var i=ApiClient.getNewLiveTvTimerDefaults({programId:n}),t=ApiClient.getLiveTvProgram(n,Dashboard.getCurrentUserId());Promise.all([i,t]).then(function(n){var i=n[0],t=n[1];u(e,i,t)})}function f(n){return new Promise(function(i,r){b=!1,v=n,Dashboard.showLoadingMsg();var o=new XMLHttpRequest;o.open("GET","components/recordingcreator/recordingcreator.template.html",!0),o.onload=function(){var o=this.response,s=e.createDialog({removeOnClose:!0,size:"small"});s.classList.add("ui-body-b"),s.classList.add("background-theme-b"),s.classList.add("formDialog");var a="";a+=Globalize.translateDocument(o),s.innerHTML=a,document.body.appendChild(s),e.open(s),m=s,s.addEventListener("iron-overlay-closed",function(){b?(Dashboard.alert(Globalize.translate("MessageRecordingScheduled")),i()):r()}),t(s),l(s),p(s,n)},o.send()})}var v,m,b=!1;return{show:f}});