/*
 * Bug Reporter⁷ JavaScript Components
 * Version 1.0.3
 *
 * https://github.com/SniperGER/Bug-Reporter7
 *
 * © 2014 Janik Schmidt
 * All Rights reserved
 *
 * Required by Bug Reporter⁷
 * Requires Framework7 and jQuery
*/

/* General setup */
var fw7 = new Framework7({
	animateNavBackIcon: true,
	cache: false,
	cacheDuration: 1000,
	sortable: false,
	modalTitle: unescape("Bug Reporter%u2077"),
});

function isDateInRange(begin,end,current) {
	if (current >= begin && current <= end) {
		return true;
	} else {
		return false;
	}
}
function pad(n) {
	return (n < 10) ? ("0" + n) : n;
}


(function() {
	"use strict",
	window.BugReporter7 = function(params) {
		var component = this;
		this.version = "1.0.3";
		this.build = "1832";
		this.params = {
			modern : {
				enabled: false,			// Default: false
				swipeToDelete: false,	// Default: true
				swipeToDeleteLimit: 100	// Default: 100
			},
			swipeToDelete: false,
			lastSlideValue: 0,
			slideClosing: false
		}
		var progress = 0;
/* 		loginView: fw7.addView(".view-login"), */

		this.setOpenBugsCount = function() {
			var openBugsCount = 0;
			for (var i = 0; i < bugsStorage.length; i++) {
				var bugsItem = bugsStorage[i];
				if (bugsItem.status == "open") {
					openBugsCount++;
				}
			}
			$('#open-badge').html(openBugsCount);
		}
		this.login = function() {
			loginView.loadPage("frames/login/login.php?u="+$('input#username').val()+"&p="+MD5($('input#password').val()));
		};
		this.loginDemo = function() {
			fw7.showPreloader("Signing in");
			setTimeout(function() {
				fw7.hidePreloader();
				createCookie("username","Demo User",24);
			}, 2500);
			setTimeout(function() {
				fw7.closeModal(".popup-login");
				if (readCookie("username") == undefined) {
					$('#user-label').html("Login failed. Please allow Cookies on this website.");
				} else {
					$('#user-label').html(readCookie("username")).removeAttr("data-i18n");
				}
				loginView.goBack(undefined, false);
			}, 3000);
		};
		this.loginCheckCookie = function() {
			if (!readCookie("username")) {
				
			} else {
				$('#user-label').html(readCookie("username")).removeAttr("data-i18n");
			}
		};
		this.rebindUserPanel = function() {
			$('#user-label').off("click");
			$('#user-label').on("click", function() {
				var clickedLink = this;
				var buttons = [
				{
						text: 'Sign off',
						bold: true,
						onClick: function () {
							eraseCookie("username");
							$('#user-label').attr("data-i18n","NOT_SIGNED_IN").html("User is not signed in");
							/* $('body').i18n(); */
						}
				}];
				var buttons2 = [
				{
						text: 'Cancel',
						red: true,
						color: "red",
						onClick: function () {
						}
				}];
			
				if (readCookie("username")) {
					if (fw7.device.iphone) {
						fw7.actions([buttons, buttons2]);
					} else {
						fw7.popover(".popover-usercp", clickedLink);
					}
				} else {
					fw7.popup(".popup-login");
				}
			});

		};
		this.submitNewBug = function() {
			var date = new Date();
			var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
			var dateString = ("0" + date.getDate()).slice(-2) + "-" + monthNames[date.getMonth()] + "-" + date.getFullYear() + " " +  ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
			bugsStorage.push({
				title: $('[name="newBugName"]').val() + " ",
				category: $('[name="newBugCat"]').val() + " ",
				description: $('[name="newBugDesc"]').val() + " ",
				author: readCookie("username"),
				status: "open",
				id: bugsStorage.length +1,
				date: dateString
			});
			localStorage.bugsData = JSON.stringify(bugsStorage);
			fw7.showPreloader("Submitting...");
			setTimeout(function() {
				fw7.hidePreloader();
				setTimeout(function() {
					fw7.closeModal();
					br7.generateHTML("open");
					setTimeout(function() {
						$('[name="newBugName"]').val("");
						$('[name="newBugDesc"]').val("");
					}, 300);
					setTimeout(function() {
						$('.views').removeClass("popup-compose");
						component.generateHTML("open");
					}, 500);
				}, 500);
			}, 2000);
		};
		this.checkForUpdatesOnLoad = function() {
			if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
				$.getJSON("update.json", function(data) {
					var updateAccepted = false;
					var closeButtonPressed = false;
					fw7.addNotification({
						title: "Software Update",
						message: "Version "+data.en.updates[0].version+" is now available.",
						media: "<img style='width: 29px; height: 29px' src='iTunesArtwork.png' />",
						onClose: function() {
							closeButtonPressed = true;
							if (!updateAccepted) {
								fw7.alert(unescape("Updates will be installed when Bug Reporter%u2077 is restarted."));
							}
						},
						onClick: function() {
							setTimeout(function() {
								if (!closeButtonPressed) {
									updateAccepted = true;
									fw7.closeNotification("li.notification-item");
									mainView.loadPage("frames/settings/update/index.html");
								}
							}, 10); 
						} 
					});
				});
			}
		};
		this.update = function() {
			var html= "<div> \
			<div class='content-block tablet-inset'> \
				<div class='content-block-inner'> \
					<img src='iTunesArtwork.png' style='width: 60px; height: 60px; vertical-align: top; float: left;'> \
					<p style='margin: 0; margin-left: 8px;'> \
						<span style='font-weight: 500; font-size: 16px; margin-left: 8px'>Bug Reporter&#8311; {{version}}<br></span> \
						<span style='font-size: 14px; margin-left: 8px'>Sniper_GER<br></span> \
						<span style='font-size: 14px; margin-left: 8px'>Downloaded</span> \
					</p> \
					<p>{{description}}<br><br>For more information, visit:<br><a href='https://github.com/SniperGER/Bug-Reporter7' class='external' target='_blank' style='text-decoration: underline;'>https://github.com/SniperGER/Bug-Reporter7</a>{{instructions}}</p> \
				</div> \
			</div> \
			</div> \
			<div class='list-block tablet-inset'> \
				<ul> \
					<li> \
						<a href='#' class='item-link open-popup' data-popup='.popup-update-detail'> \
							<div class='item-content'> \
								<div class='item-inner'> \
									<div class='item-title'>Details</div> \
								</div> \
							</div> \
						</a> \
					</li> \
				</ul> \
			</div> \
			<div class='list-block tablet-inset'> \
				<ul> \
					<li class='center item-button'> \
						<a href='#' class='update-button'> \
							<div class='item-content'> \
								<div class='item-inner'> \
									<div class='item-title' style='width: 100%;'>Install</div> \
								</div> \
							</div> \
						</a> \
					</li> \
				</ul> \
			</div>";
			$.getJSON("update.json", function(data) {
				$('p#update-status').closest(".page-content").html(html.replace(/{{version}}/g, data.en.updates[0].version).replace(/{{description}}/g, data.en.updates[0].description).replace(/{{instructions}}/g, ""));
				$('span#content').html(data.en.updates[0].content);
				$('.update-button').on("click", function() {
					fw7.modal({
						title: "Software Update",
						text: unescape("Bug Reporter%u2077 "+data.en.updates[0].version+" will begin installing. The app will restart when installation is finished."),
						buttons: [
							{
								text: "Later",
								onClick: function() {
									fw7.closeModal(); 
								}
							},
							{
								text: "Install",
								bold: true,
								onClick: function() {
									fw7.hidePreloader();
									$('body').append("<div class=\"update-view\"><img src=\"iTunesArtwork.png\" /></div>");
									setTimeout(function() {
										$('.update-view').append("<div class=\"progress-bar\"><div class=\"inner-progress\" id=\"update-progress\"></div></div>");
										interval = setInterval(function() {
											br7.addProgressToBar("update-progress");
										}, Math.random() * 750);
									}, 1000);
								}
							}
						]
					});
				});
			});
		};
		this.changeDesign = function(key) {
			var settingsTheme = $.parseJSON(JSON.stringify(fw7.formGetData("form-theme"))) != null ? $.parseJSON(JSON.stringify(fw7.formGetData("form-theme"))) : "default";
			var settingsTint = $.parseJSON(JSON.stringify(fw7.formGetData("form-tint"))) != null ? $.parseJSON(JSON.stringify(fw7.formGetData("form-tint"))) : "blue";
			switch (key) {
				case "theme":
					$('body').removeClass("layout-dark layout-white").addClass("layout-"+settingsTheme.theme).attr("data-theme", settingsTheme.theme);
					if (settingsTheme.theme == "dark") {
						$("meta[name='apple-mobile-web-app-status-bar-style']").removeAttr("content");
					} else {
						$("meta[name='apple-mobile-web-app-status-bar-style']").attr("content","black-translucent");
					}
					break;
				case "tint":
					$('body').removeClass("theme-white theme-black theme-yellow theme-red theme-blue theme-green theme-pink theme-lightblue theme-orange theme-gray").addClass("theme-"+settingsTint.tint).attr("data-color", settingsTint.tint);
					break;
				case "init":
					$('body').removeClass("layout-dark layout-white").addClass("layout-"+settingsTheme.theme).attr("data-theme", settingsTheme.theme);
					$('body').removeClass("theme-white theme-black theme-yellow theme-red theme-blue theme-green theme-pink theme-lightblue theme-orange theme-gray").addClass("theme-"+settingsTint.tint).attr("data-color", settingsTint.tint);
					break;
				default: break;
			}
		};
		this.giveRandom = function(limit) {
			return Math.floor(Math.random() * limit) + 1;
		};
		this.addProgressToBar = function(selector, callback) {
			if (progress < 100) {
				var randomValue = component.giveRandom(30);
				if ((progress + randomValue) <= 100) {
					progress = progress + randomValue;
				} else {
					progress = 100;
				}
			} else if (progress >=100) {
				progress = 100;
				clearInterval(interval);
				interval = undefined;
				setTimeout(function() { $('.progress-bar').remove() }, 1000);
				setTimeout(function() { window.location.reload() }, 2000);
		
			}
			$('#'+selector).css("width",progress+"%");
		};
		this.generateHTML = function(page, callback) {
			$$('.swipeout').on("deleted", function() {
				$(this).closest("ul").remove();
			});
			var bugTemplate;
			switch (page) {
				case "open": bugTemplate = $$('#bug-open-template').html(); break;
				case "closed": bugTemplate = $$('#bug-closed-template').html(); break;
				case "archived": bugTemplate = $$('#bug-archived-template').html(); break;
				default: break;
			}
			var html = '';
			for (var i = 0; i < bugsStorage.length; i++) {
				var bugsItem = bugsStorage[i];
				if (bugsItem.status == page) {
					html += bugTemplate.replace(/{{title}}/g, bugsItem.title).replace(/{{category}}/g, bugsItem.category).replace(/{{description}}/g, bugsItem.description).replace(/{{author}}/g, bugsItem.author).replace(/{{status}}/g, bugsItem.status).replace(/{{id}}/g, bugsItem.id).replace(/{{date}}/g, bugsItem.date).replace(/{{internalID}}/g, i);
				}
				switch (page) {
					case "open":
						$('#bugs-open-content').html(html);
						br7.applyModernMode("closed");
						if ($('#bugs-open-content').children("div.list-block").length > 0) {
							$('.page-content.bug-bg#bugs-open-content').removeClass("bug-bg");
						}
						$$('.action1').on("click", function() {
							var issueID = parseInt($(this).closest(".list-block").attr("data-bug"));
							var bugObject = bugsStorage[issueID];
							bugObject.status = "archived";
							bugsStorage[issueID-1] = bugObject;
							localStorage.bugsData = JSON.stringify(bugsStorage);
							$$('.swipeout').on("deleted", function() {
								$(this).closest(".list-block").remove();
								if ($('#bugs-open-content').children("div.list-block").length < 1) {
									$('.page-content.bug-no-bg#bugs-open-content').addClass("bug-bg");
								}
							});
						});
						$$('.action2').on("click", function() {
							var issueID = parseInt($(this).closest(".list-block").attr("data-bug"));
							var bugObject = bugsStorage[issueID];
							bugObject.status = "closed";
							bugsStorage[issueID-1] = bugObject;
							localStorage.bugsData = JSON.stringify(bugsStorage);
							$$('.swipeout').on("deleted", function() {
								$(this).closest(".list-block").remove();
								if ($('#bugs-open-content').children("div.list-block").length < 1) {
									$('.page-content.bug-no-bg#bugs-open-content').addClass("bug-bg");
								}
							});
						});
		
						break;
					case "closed":
						br7.applyModernMode("open");
						$('#bugs-closed-content').html(html);
						if ($('#bugs-closed-content').children("div.list-block").length > 0) {
							$('.page-content.bug-bg#bugs-closed-content').removeClass("bug-bg");
						}
						$$('.action1').on("click", function() {
							var issueID = parseInt($(this).closest(".list-block").attr("data-bug"));
							var bugObject = bugsStorage[issueID];
							bugObject.status = "archived";
							bugsStorage[issueID-1] = bugObject;
							localStorage.bugsData = JSON.stringify(bugsStorage);
							$$('.swipeout').on("deleted", function() {
								$(this).closest(".list-block").remove();
								if ($('#bugs-closed-content').children("div.list-block").length < 1) {
									$('.page-content.bug-no-bg#bugs-closed-content').addClass("bug-bg");
								}
							});
						});
						$$('.action2').on("click", function() {
							var issueID = parseInt($(this).closest(".list-block").attr("data-bug"));
							var bugObject = bugsStorage[issueID];
							bugObject.status = "open";
							bugsStorage[issueID-1] = bugObject;
							localStorage.bugsData = JSON.stringify(bugsStorage);
							$$('.swipeout').on("deleted", function() {
								$(this).closest(".list-block").remove();
								if ($('#bugs-closed-content').children("div.list-block").length < 1) {
									$('.page-content.bug-no-bg#bugs-closed-content').addClass("bug-bg");
								}
							});
						});
						break;
					case "archived":
						br7.applyModernMode("deleted");
						$('#bugs-archived-content').html(html);
						if ($('#bugs-archived-content').children("div.list-block").length > 0) {
							$('.page-content.bug-bg#bugs-archived-content').removeClass("bug-bg");
						}
						$$('.action1').on("click", function() {
							var issueID = parseInt($(this).closest(".list-block").attr("data-bug"));
							var bugObject = bugsStorage[issueID];
							var index = bugsStorage.indexOf(bugObject);
							$$('.swipeout').on("deleted", function() {
								$(this).closest(".list-block").remove();
								if ($('#bugs-archived-content').children("div.list-block").length < 1) {
									$('.page-content.bug-no-bg#bugs-archived-content').addClass("bug-bg");
								}
							});
							if (index > -1) {
								bugsStorage.splice(index, 1);
								localStorage.bugsData = JSON.stringify(bugsStorage);
							}
						});
						break;
					default: break;
				}
				$('.swipeout-actions-inner').children("a").css("line-height", $('.swipeout-actions-inner').closest("li.swipeout").height()+"px");
			}

		};
		this.resetLocalStorage = function() {
			var clickedLink = $(this);
			if (fw7.device.iphone) {
				var buttons1 = [
					{
						text: "This will remove data that is used to display Bugs and Settings. Installed updates are not affected. The App will be restarted once the process is finished.",
						label: true
					},
					{
						text: "Remove Now",
						red: true,
						color: "theme-red",
						onClick: function() {
							clearInterval(timedTheme);
							localStorage.clear();
							$('body').append("<div class=\"update-view\"><img src=\"iTunesArtwork.png\" /></div>");
							setTimeout(function() {
								$('.update-view').append("<div class=\"progress-bar\"><div class=\"inner-progress\" id=\"update-progress\"></div></div>");
								interval = setInterval(function() {
									br7.addProgressToBar("update-progress");
								}, Math.random() * 750);
							}, 1000);
						}
					}
				];
				var buttons2 = [
					{
						text: "Cancel",
						bold: true
					}
				];
				var group = [buttons1, buttons2];
				fw7.actions(group);
			
			} else {
				fw7.modal({
					title: "Remove Website Data",
					text: "This will remove data that is used to display Bugs and Settings. Installed updates are not affected. The App will be restarted once the process is finished.",
					buttons: [
						{
							text: "Remove Now",
							onClick: function() {
								clearInterval(br7.timedTheme);
								localStorage.clear();
								$('body').append("<div class=\"update-view\"><img src=\"iTunesArtwork.png\" /></div>");
								setTimeout(function() {
									$('.update-view').append("<div class=\"progress-bar\"><div class=\"inner-progress\" id=\"update-progress\"></div></div>");
									interval = setInterval(function() {
										br7.addProgressToBar("update-progress");
									}, Math.random() * 750);
								}, 1000);
							}
						},
						{
							text: "Cancel"
						}
					]
				});
	
			}
		}
		this.applyModernMode = function(callback) {
			$('#modernStatus').html(component.params.modern.enabled.toString());
			$('form#switch-ios8 li#switchSwipeout.disabled').removeClass("disabled");
			var c = callback;
			if (component.params.modern.enabled) {
				$('body').addClass("ios8");
				$('.swipeout-content').css("-webkit-transform","translate3d(0,0,0)");
				$$('.swipeout').on("swipeout", function(e) {
					var elThis = $(this);
					var el = $(this).children(".swipeout-actions").children(".swipeout-actions-inner");
					if (component.params.modern.enabled) {
					if (e.detail.progress.toFixed(3) > component.params.lastSlideValue || e.detail.progress.toFixed(3) < component.params.lastSlideValue || component.params.slideClosing) {
						component.params.lastSlideValue = e.detail.progress.toFixed(3);
							//console.log(component.params.lastSlideValue);
						if (Math.round(e.detail.progress*100) < component.params.modern.swipeToDeleteLimit) {
							var matrix = elThis.children(".swipeout-content").css('-webkit-transform');
							var values = matrix.match(/-?[0-9\.]+/g);
		
							component.params.swipeToDelete = false;
							for (var i=el.children("a").length; i>0; i--) {
								el.children("a:nth-child("+i+")").css({
									"-webkit-transition": "-webkit-transform 0ms",
									"-webkit-transform": "translate3d("+ (parseInt(values[4])+(80*el.children("a").length))/el.children("a").length*((el.children("a").length+1)-i) +"px,0,0)"
								});
							}
							el.children("a:last-child").children("div").css({
								"-webkit-transform": "translate3d(0,0,0)"
							});
	
						} else if (component.params.modern.swipeToDelete) {
							component.params.swipeToDelete = true;
							var matrix = elThis.children(".swipeout-content").css('-webkit-transform');
							var values = matrix.match(/-?[0-9\.]+/g);
							el.children("a").addClass("no-transition").css({
								"-webkit-transform": "translate3d("+(parseInt(values[4])+(80*el.children("a").length))+"px,0,0)"
							});
							el.children("a:last-child").children("div").css({
								"-webkit-transform": "translate3d(-"+(el.children("a").length-1)+"00%,0,0)"
							});
						} else {
							var matrix = elThis.children(".swipeout-content").css('-webkit-transform');
							var values = matrix.match(/-?[0-9\.]+/g);
		
							component.params.swipeToDelete = false;
							for (var i=el.children("a").length; i>0; i--) {
								el.children("a:nth-child("+i+")").css({
									"-webkit-transition": "-webkit-transform 0ms",
									"-webkit-transform": "translate3d("+ (parseInt(values[4])+(80*el.children("a").length))/el.children("a").length*((el.children("a").length+1)-i) +"px,0,0)"
								});
							}
							el.children("a:last-child").children("div").css({
								"-webkit-transform": "translate3d(0,0,0)"
							});
						}
					}
					}
				});
				$$('.swipeout').on("open", function() {
					var elThis = $(this);
					var el = $(this).children(".swipeout-actions").children(".swipeout-actions-inner");
					if (component.params.modern.enabled) {
						el.children("a").removeClass("no-transition").addClass("swipeout-open").css({
							"-webkit-transition":"",
							"-webkit-transform":""
						});
						if (component.params.swipeToDelete) {
							component.params.swipeToDelete = false;
							component.params.lastSlideValue = 0;
							component.params.slideClosing = true;
							fw7.swipeoutDelete(elThis);
							if (callback == "open" || callback == "closed") {
								var issueID = parseInt($(this).closest(".swipeout").children(".swipeout-content").children(".issueID").html());
								var bugObject = bugsStorage[issueID-1];
								bugObject.status = callback;
								bugsStorage[issueID-1] = bugObject;
								localStorage.bugsData = JSON.stringify(bugsStorage);
								$$('.swipeout').on("deleted", function() {
									$(this).closest(".list-block").remove();
									if ($('.page.on-center').children("div.list-block").length < 1) {
										$('.page-content.bug-no-bg').addClass("bug-bg");
									}
								});
							} else if (callback == "deleted") {
								var issueID = parseInt($(this).closest(".swipeout").children(".swipeout-content").children(".issueID").html());
								var bugObject = bugsStorage[issueID-1];
								var index = bugsStorage.indexOf(bugObject);
								$$('.swipeout').on("deleted", function() {
									$(this).closest(".list-block").remove();
									if ($('.page.on-center').children("div.list-block").length < 1) {
										$('.page-content.bug-no-bg').addClass("bug-bg");
									}
								});
								if (index > -1) {
									bugsStorage.splice(index, 1);
									localStorage.bugsData = JSON.stringify(bugsStorage);
								}

							}
/*
							if (callback == "deleted") {
								var index = bugsStorage.indexOf(bugObject);
								if (index > -1) {
									bugsStorage.splice(index, 1);
									localStorage.bugsData = JSON.stringify(bugsStorage);
								}
							}
*/

						}
					}
				});
				$$('.swipeout').on("close", function() {
					var elThis = $(this);
					var el = $(this).children(".swipeout-actions").children(".swipeout-actions-inner");
					if (component.params.modern.enabled) {
						for (var i=el.children("a").length; i>0; i--) {
							el.children("a:nth-child("+i+")").css({
								"-webkit-transition": "",
								"-webkit-transform": "translate3d("+(100*(el.children("a").length-i)+100)+"%,0,0)"
							});
						}
						component.params.lastSlideValue = 0;
						component.slideClosing = false;
					}
				});
			}
		}
		this.removeModernMode = function() {
			this.params.modern.enabled = false;
			$('#modernStatus').html(component.params.modern.enabled.toString());
			$('form#switch-ios8 li#switchSwipeout').addClass("disabled");
			var el = $('.swipeout').children(".swipeout-actions").children(".swipeout-actions-inner");
			el.children("a").css("-webkit-transform","");
			$('body').removeClass("ios8");
		};
		this.enableDeveloper = function() {
			mainView.showToolbar();
			$('.pages').addClass("toolbar-through");
		};
		this.disableDeveloper = function() {
			mainView.hideToolbar();
			$('.toolbar').bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
				$('.pages').removeClass("toolbar-through");
			});
		};
		
		if (this.params.modern.enabled) {
			$('body').addClass("ios8");
		}

		timedTheme = setInterval(function() {
			var timedThemeSwitch = fw7.formGetData("form-theme") != undefined ? $.parseJSON(JSON.stringify(fw7.formGetData("form-theme"))).switchTimedTheme : [];
			
			var timedThemeMinHours = fw7.formGetData("timed-theme-schedule") != undefined ? parseInt($.parseJSON(JSON.stringify(fw7.formGetData("timed-theme-schedule"))).ttbegin.slice(0,2)) : 22;
			var timedThemeMinMinutes = fw7.formGetData("timed-theme-schedule") != undefined ? parseInt($.parseJSON(JSON.stringify(fw7.formGetData("timed-theme-schedule"))).ttbegin.slice(3)) : 0;
			
			var timedThemeMaxHours = fw7.formGetData("timed-theme-schedule") != undefined ? parseInt($.parseJSON(JSON.stringify(fw7.formGetData("timed-theme-schedule"))).ttend.slice(0,2)) : 7;
			var timedThemeMaxMinutes = fw7.formGetData("timed-theme-schedule") != undefined ? parseInt($.parseJSON(JSON.stringify(fw7.formGetData("timed-theme-schedule"))).ttend.slice(3)) : 0;
			
			$('li#schedule div.item-after').html(pad(timedThemeMinHours)+":"+pad(timedThemeMinMinutes)+"<br>"+pad(timedThemeMaxHours)+":"+pad(timedThemeMaxMinutes));
			
			if (timedThemeSwitch.length != 0) {
				$('ul#themes').parent().addClass("disabled");
				$('li#schedule').removeClass("disabled");
				
				var currentDate = new Date();
				var beginDate = new Date();
				beginDate.setHours(timedThemeMinHours);
				beginDate.setMinutes(timedThemeMinMinutes);
				beginDate.setSeconds(0);
					
				var endDate = new Date();
				endDate.setHours(timedThemeMaxHours);
				endDate.setMinutes(timedThemeMaxMinutes);
				endDate.setSeconds(0);
					
				if (endDate < beginDate) {
					if (currentDate < endDate) {
						beginDate.setDate(beginDate.getDate()-1);
						endDate.setDate(endDate.getDate()-1);
					}
					endDate.setDate(endDate.getDate()+1);
				}
				if (isDateInRange(beginDate,endDate,currentDate)) {
					$('body').removeClass("layout-dark layout-white").addClass("layout-dark").attr("data-theme", "dark");
					fw7.formStoreData("form-theme", {
						"theme":"dark",
						"switchTimedTheme": $.parseJSON(JSON.stringify(fw7.formGetData("form-theme"))).switchTimedTheme
					});
					fw7.formFromJSON('#form-theme', {
						"theme":"dark",
						"switchTimedTheme": $.parseJSON(JSON.stringify(fw7.formGetData("form-theme"))).switchTimedTheme
					});
				} else {
					$('body').removeClass("layout-dark").attr("data-theme", "default");
					fw7.formStoreData("form-theme", {
						"theme":"default",
						"switchTimedTheme": $.parseJSON(JSON.stringify(fw7.formGetData("form-theme"))).switchTimedTheme
					});
					fw7.formFromJSON('#form-theme', {
						"theme":"default",
						"switchTimedTheme": $.parseJSON(JSON.stringify(fw7.formGetData("form-theme"))).switchTimedTheme
					});
				}
			} else {
				$('ul#themes').parent().removeClass("disabled");
				$('li#schedule').addClass("disabled");
			}
		}, 100);
		/*var iOS8Mode = setInterval(function() {
			var iOS8Switch = fw7.formGetData("switch-ios8") != undefined ? $.parseJSON(JSON.stringify(fw7.formGetData("switch-ios8"))).switchiOS8 : [];
			
			if (iOS8Switch.length != 0) {
				component.params.modern.enabled = true;
			} else {
				component.params.modern.enabled = false;
			}
		}, 100)*/
		
		var modernData = fw7.formGetData("switch-ios8") != undefined ? fw7.formGetData("switch-ios8") : {
			"switchiOS8": [],
			"switchSwipeout": []
		}
		if (modernData.switchiOS8.length != 0) {
			component.params.modern.enabled = true;
			$('form#switch-ios8 li#switchSwipeout.disabled').removeClass("disabled");
			
			if (modernData.switchSwipeout.length != 0) {
				component.params.modern.swipeToDelete = true;
			}
		}
	}
})();

var fw7 = new Framework7();
var $$ = Dom7;
var timedTheme;
var br7 = new BugReporter7();

var bugsStorage = localStorage.bugsData ? JSON.parse(localStorage.bugsData) : [];

var mainView = fw7.addView('.view-main', {
	dynamicNavbar: true
});
var loginView = fw7.addView('.view-login', {
	dynamicNavbar: true
});
var gettingStartedView = fw7.addView('.view-getting-started', {
	swipeBackPages: false
});

window.addEventListener('load', function (e) {
	window.applicationCache.addEventListener('updateready', br7.checkForUpdatesOnLoad, false);
}, false);

$(document).ready(function() {
	$.ajaxSetup({ cache: false });
	br7.loginCheckCookie();
	br7.rebindUserPanel();
	br7.setOpenBugsCount();
	br7.changeDesign("init");
	if (!localStorage.doneTutorial) {
		fw7.popup(".popup-getting-started");
	}
});

var statusbarTheme = fw7.formGetData("form-theme") ? $.parseJSON(JSON.stringify(fw7.formGetData("form-theme"))).theme : "default";
if(window.navigator.standalone && statusbarTheme != "dark") $$("meta[name='apple-mobile-web-app-status-bar-style']")[0].remove();

/* Handlers */

fw7.onPageBeforeAnimation("index", function() {
	br7.rebindUserPanel();
	br7.loginCheckCookie();
	openBugsCount = 0;
	for (var i = 0; i < bugsStorage.length; i++) {
		var bugsItem = bugsStorage[i];
		if (bugsItem.status == "open") {
			openBugsCount++;
		}
	}
	$('#open-badge').html(openBugsCount);
/* 	$('body').i18n(); */
});

fw7.onPageAfterAnimation("register", function() {
	$$('.reg-button').on("click", function() {
		br7.loginDemo();
	});
});

fw7.onPageInit("bugs-open", function() {
	br7.generateHTML("open");
	fw7 = new Framework7();
	$('.swipeout-actions-inner').children("a").css("line-height", $('.swipeout-actions-inner').closest("li.swipeout").height()+"px");
	br7.applyModernMode("closed");
/* 	$('body').i18n(); */
});
fw7.onPageBeforeAnimation("bugs-closed", function() { 
	br7.generateHTML("closed");
	fw7 = new Framework7();
	$('.swipeout-actions-inner').children("a").css("line-height", $('.swipeout-actions-inner').closest("li.swipeout").height()+"px");
	br7.applyModernMode("open");
/* 	$('body').i18n(); */
});
fw7.onPageBeforeAnimation("bugs-archived", function() {
	br7.generateHTML("archived");
	fw7 = new Framework7();
	$('.swipeout-actions-inner').children("a").css("line-height", $('.swipeout-actions-inner').closest("li.swipeout").height()+"px");
	br7.applyModernMode("deleted");
/* 	$('body').i18n(); */
});

fw7.onPageBeforeAnimation('settings', function () {	
	$$('.save-button').on("click", function() {
		fw7.alert("Error: The SQL database could not be contacted. Form data has been saved locally.","SQL Database Error");
	});
	
	$$('.reset-local-storage').on("click", function() {
		br7.resetLocalStorage();
	});
	var modernData = fw7.formGetData("switch-ios8") != undefined ? fw7.formGetData("switch-ios8") : {
		"switchiOS8": [],
		"switchSwipeout": []
	}
	if (modernData.switchiOS8.length != 0) {
		$('form#switch-ios8 li#switchSwipeout.disabled').removeClass("disabled");
	}
});

fw7.onPageAfterAnimation('settings-theme', function() {
	$('form#form-theme li').on("click", function() {
		setTimeout(function() {
			br7.changeDesign("theme");
		}, 10);
	});
	$$('.open-schedule').on("click", function() {
		if (window.outerWidth < 630 || window.outerHeight < 630) {
			mainView.loadPage("frames/settings/design/timed-theme-schedule.html");
		} else {
			fw7.popover(".popover-about", $('li#schedule'))
		}
	});
});
fw7.onPageInit('settings-tint', function() {
	$('form#form-tint li').on("click", function() {
		setTimeout(function() {
			br7.changeDesign("tint");
		}, 10);
	});
});

fw7.onPageBeforeAnimation("about", function() {
	$('.page[data-page="about"] .page-content').html($('.page[data-page="about"] .page-content').html().replace(/{{version}}/g, br7.version).replace(/{{build}}/g, br7.build).replace(/{{fw7version}}/g, fw7.version));
});

fw7.onPageBeforeAnimation("getting-started", function() {
	$('.get-started').on("click", function() {
		console.log(fw7.device);
	});
});

fw7.onPageInit("getting-started-main", function() {
	var mySlider = fw7.slider('.slider-container-h', {
			spaceBetween: 100,
			pagination:'.slider-pagination-h',
			paginationHide: false
	});
	var vSlider = fw7.slider('.slider-container-v', {
			spaceBetween: 100,
			pagination:'.slider-pagination-v',
			paginationHide: false
	});
	$('.close-tutorial').on("click", function() {
		fw7.closeModal();
		setTimeout(function() {
			gettingStartedView.loadPage("index.html", false);
			gettingStartedView.history = ["index.html"];	
		}, 300);
		localStorage.setItem("doneTutorial","yes");
	});
});

fw7.onPageAfterAnimation("update", function() {
	if (navigator.onLine) {
		if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
		setTimeout(function() {
			br7.update();
		}, 1000);
	} else {
			setTimeout(function() {
			window.applicationCache.removeEventListener("updateready", br7.checkForUpdatesOnLoad, false);
			window.applicationCache.addEventListener("updateready", function() {
				if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
					br7.update(); 
				}
			}, false);
			window.applicationCache.update();
		}, 2000);
			setTimeout(function() {
				if (window.applicationCache.status === window.applicationCache.IDLE) { 
					$('p#update-status').html(unescape("Bug Reporter%u2077 "+br7.version+"<br>Your software is up to date."));
				} 
			}, 3000);
		}
	} else {
		fw7.alert("Software Update is not available at this time. Try again later", "Software Update Unavailable");
		$('p#update-status').html("Software Update Unavaliable.");
	}
}); 

fw7.onPageBeforeAnimation("update-detail", function() {
	$.getJSON("update.json", function(data) {
//		$('span#content').html(data.en.updates[0].content);
	});
});
fw7.onPageBeforeAnimation("update-installed", function() {
	var html = "";
	for (var i=0; i<fw7installedUpdates.length; i++) {
		html += "<li><a href=\"#\" class=\"item-link\"><div class=\"item-content\"><div class=\"item-inner\"><div class=\"item-title\">"+fw7installedUpdates[i]+"</div></div></div></a></li>";
	}
	$('.page-content#installed-updates .list-block ul').html(html);
});

$$('.signin-button').on("click", function() {
	br7.loginDemo();
});


$$('.logout-button').on("click", function() {
	eraseCookie("username");
	$('#user-label').attr("data-i18n","NOT_SIGNED_IN").html("User is not signed in");
/* 	$('body').i18n(); */
});

$$('.erase-cookies').on("click", function() {
	eraseCookie("username");
});

$('.submit-bug').on("click", function() {
	if (readCookie("username") && $('[name="newBugName"]').val() != "" && $('[name="newBugDesc"]').val() != "") {
		br7.submitNewBug();
	} else if (!readCookie("username")) {
		fw7.alert("This feature requires a valid login.","User not logged in");
	} else if ($('[name="newBugName"]').val() == "") {
		fw7.alert("Please specify a title before continuing.", "Missing fields");
	} else if ($('[name="newBugDesc"]').val() == "") {
		fw7.alert("Please enter some details before continuing.", "Missing fields");
	}
});

$$('.popup-update-detail').on("open", function() {
	$.getJSON("update.json", function(data) {
		$('span#content').html(data.en.updates[0].content + "<br><br>" + data.en.updates[0].instructions); 
	});
});