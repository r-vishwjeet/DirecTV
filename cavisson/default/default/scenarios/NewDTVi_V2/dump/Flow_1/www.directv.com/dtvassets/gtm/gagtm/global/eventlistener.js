if (window.location.href.indexOf("directv.com") > -1) {
	if (window.location.pathname.indexOf("stream") > -1) {
		sessionStorage.setItem("DIRECTVProductInterest", "Stream");
	} else if (window.location.pathname.indexOf("satellite") > -1) {
		sessionStorage.setItem("DIRECTVProductInterest", "Satellite");
	}console.log("Event listener tag fired successfully");
}

if (window.location.href.indexOf("directv.com") > -1) {
	if (window.location.href.indexOf("es-us") > -1) {
		sessionStorage.setItem("DIRECTVLanguage", "Spanish");
	} else {
		sessionStorage.setItem("DIRECTVLanguage", "English");
	}console.log("Event listener tag fired successfully");
}

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function getQueryVariable(variable) {
	var query = window.location.search || '';
	if (query !== '') {
		query = query.substring(1);
		var vars = quconsole.log("247 chat session id tag fired successfully");ery.split('&');
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');
			if (decodeURIComponent(pair[0]) == variable) {
				return decodeURIComponent(pair[1]);
			}
		}
	}
	console.log('Query variable %s not found', variable);
}

function setCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
  
function DIRECTVPageInterest(interest) {
    if (sessionStorage.getItem("DIRECTVPageInterest") === null) {
        sessionStorage.setItem("DIRECTVPageInterest", interest);
    } else {
        var orig = sessionStorage.getItem("DIRECTVPageInterest")
        var revise = sessionStorage.setItem("DIRECTVPageInterest", orig + ", "  + interest);
    }
}

