/**
 * cookie工具类
 */
window.ht = window.ht || {}
window.ht.cookie = {
	set: function (name, value, options) {
		options = options || {};
		var str = this.encode(name) + '=' + this.encode(value);

		if (null == value) options.maxage = -1;

		if (options.maxage) {
			options.expires = new Date(+new Date + options.maxage);
		}

		//if (options.path) str += '; path=/';
		str += '; path=/';
		if (options.domain) str += '; domain=' + options.domain;
		if (options.expires) str += '; expires=' + options.expires.toUTCString();
		if (options.secure) str += '; secure';

		document.cookie = str;
	},
	get: function (name) {
		return this.all()[name];
	},
	del: function (name) {
		 var exp = new Date();
		 exp.setTime(exp.getTime() - 1);
		 var cval = this.get(name);

		 if (cval) {
			 document.cookie = this.encode(name) +"=" + cval + "; expires=" + exp.toUTCString();
		 }
	},
	all: function () {
		var str;
		try {
			str = document.cookie;
		} catch (err) {
			if (typeof console !== 'undefined' && typeof console.error === 'function') {
				console.error(err.stack || err);
			}
			return {};
		}
		return this.parse(str);
	},
	parse: function (str) {
		var obj = {};
		var pairs = str.split(/ *; */);
		var pair;
		if ('' == pairs[0]) return obj;
		for (var i = 0; i < pairs.length; ++i) {
			pair = pairs[i].split('=');
			obj[this.decode(pair[0])] = this.decode(pair[1]);
		}
		return obj;
	},
	encode: function (value){
		try {
			return encodeURIComponent(value);
		} catch (e) {
			debug('error `encode(%o)` - %o', value, e)
		}
	},
	decode: function (value) {
		try {
			return decodeURIComponent(value);
		} catch (e) {
			debug('error `decode(%o)` - %o', value, e)
		}
	}
}
