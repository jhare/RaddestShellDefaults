kindling.module(function () {
	'use strict';

	var variables = null;

	function parseQueryVariables() {
		variables = {};
		var query = window.location.search.substring(1);
		var vars = query.split('&');
		var i, pair;
		for (i = 0; i < vars.length; i++) {
			pair = vars[i].split('=');
			variables[pair[0]] = decodeURIComponent(pair[1]);
		}
	}

	function getQueryVariable(variable) {
		if (!variables) {
			parseQueryVariables();
		}
		return variables[variable];
	}

	function loadAvatar() {
		var avatar = getQueryVariable('avatar');
		if (avatar && avatar !== 'undefined' && (localStorage.showAvatarsInNotifications === 'true')) {
			document.getElementById('avatar').src = avatar;
		}
	}

	function isRelative(url) {
		return url && (url.indexOf('/') === 0 || url.indexOf('chrome-extension://') === 0);
	}

	function injectCss(link) {
		var lnk = document.createElement('link');
		lnk.rel = 'stylesheet';
		lnk.href = link;
		document.head.appendChild(lnk);
	}

	return {
		init: function () {
			$('#author').html(getQueryVariable('author'));
			$('#room').html(getQueryVariable('room'));

			var baseUrl = getQueryVariable('baseUrl');

			injectCss(baseUrl + getQueryVariable('emojiUrl'));

			loadAvatar();

			var $content = $('#content');
			$content.html(location.hash.substring(1));
			$content.find('img').each(function () {
				if (isRelative(this.src)) {
					this.src = baseUrl + this.src.substring(kindling.getDomain(this.src).length);
				}
			});

			$content.find('a').each(function () {
				if (isRelative(this.href)) {
					this.href = baseUrl + this.pathname + this.search;
				}
			});
			$content.find('img').css('max-width', 226).css('max-height', 118).css('background-size', 'contain');

			if (localStorage.highlightName === 'true') {
				var usernameRegex = kindling.getUsernameRegex(getQueryVariable('user'));
				$content.highlightRegex(usernameRegex, { className: 'nameHighlight', tagType: 'mark' });
			}

			if (localStorage.autoDismiss === 'true') {
				setTimeout(function () { window.close(); }, localStorage.notificationTimeout);
			}
		}
	};
}());
