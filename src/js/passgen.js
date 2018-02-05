; (function () {
	window.addEventListener('DOMContentLoaded', function () {
		"use strict";

		// new PasswordGeneratorWidget({
		//    length: 'length of password',
		//    id: 'id of widget container element'
		// })

		class PasswordGeneratorWidget {
			constructor(options){
				options = options || {};
				this.length = options.length || 16;
				this.minLength = this._defaults().minLength || 6;
				this.maxLength = this._defaults().maxLength || 256;
				this.id = options.id;
				if (!options.id) this.el = options.el || 'body';
				this.init();
			}

			urlparser (url) {
				let a = document.createElement('a');
				a.href = url;
				return {
					protocol: a.protocol,
					hostname: a.hostname,
					port: a.port,
					pathname: a.pathname,
					query: a.search,
					hash: a.hash,
					host: a.host
				}
			}

			errorHandler (msg, url, row, col, error) {
				let err = {
					message: msg,
					url: url,
					row: row,
					col: col
				};
				console.error(err);
				this.renderError(err);
				return false;
			}

			renderError (err) {
				let container = document.createElement('div')
				container.classList.add('password-generator__error');
				container.textContent = [
					this.urlparser(err.url).pathname || ''
					, err.row || ''
					, err.col || ''
					, err.message || ''
				].join(':');
				document.body.appendChild(container);
			}


			init () {
				window.onerror = this.errorHandler.bind(this);

				this.widget = this.generateWidgetContent(this.id);

				let button = this.widget.querySelector('.password-generator__button');
				let password = this.widget.querySelector('.password-generator__password');
				let length = this.widget.querySelector('.password-generator__length');

				button.addEventListener('click', this.buttonClickHandler.bind(this));

				//shows notification after password was copied
				this.widget.addEventListener('copy', this._onCopyEventHandler.bind(this));

				password.addEventListener('mouseup', this._passwordOnmouseupHandler.bind(this));
				length.addEventListener('change', this._lenghOnChangeHandler.bind(this));

				this.widget
					.querySelector('.password-generator__password')
					.value = this.generatePassword(this.length);
			}

			generateWidgetContent (id) {
				let widgetContainer = document.getElementById(id);
				if (!id && this.el) widgetContainer = document.querySelector(this.el);

				// <div class="password-generator">
				//   <input type="text" class="password-generator__password">password</input>
				//   <input class="password-generator__button" type="button" value="generate">
				//   <div class="password-generator__tools">
				//     <div class="password-generator__length-container">
				//       <select class="password-generator__length">
				//         <option value="6">6</option>
				//         <!-- ... -->
				//         <option value="16" selected>16</option>
				//         <!-- ... -->
				//         <option value="256">256</option>
				//       </select>
				//     </div>
				//     <div class="password-generator__charset-list">
				//       <label>
				//         <input type="checkbox" name="uppercase" value="uppercase">
				//         uppercase
				//       </label>
				//       <label>
				//         <input type="checkbox" name="lowercase" value="lowercase">
				//         lowercase
				//       </label>
				//       <label>
				//         <input type="checkbox" name="numbers" value="numbers">
				//         numbers
				//       </label>
				//     </div>
				//   </div>
				// </div>

				let widget = document.createElement('div');
				let password = document.createElement('input');
				let passwordContainer = document.createElement('div');
				let button = document.createElement('input');
				let lengthContainer = document.createElement('div');
				let length = document.createElement('select');
				let charsetList = document.createElement('div');

				widget.classList.add('password-generator');
				widget.classList.add('clearfix');
				password.classList.add('password-generator__password');
				password.type = 'text';
				password.value = 'password';
				passwordContainer.classList.add('password-generator__password-container');
				button.type = 'button';
				button.value = 'generate';
				button.classList.add('password-generator__button');
				lengthContainer.classList.add('password-generator__length-container');
				length.classList.add('password-generator__length');
				this._generateLengthElement(length);
				charsetList.classList.add('password-generator__charset-list');
				this._generateCharsetListElement(charsetList);

				passwordContainer.appendChild(password);
				widget.appendChild(passwordContainer);
				widget.appendChild(button);
				lengthContainer.appendChild(length);
				widget.appendChild(lengthContainer);
				widgetContainer.appendChild(widget);
				widget.appendChild(charsetList);

				return widget;
			}

			//copies password to clipboard
			_passwordOnmouseupHandler(e) {
				let elem = e.target;

				// selects password and copy it to clipboard
				// does not work on iOS devices
				elem.setSelectionRange(0, elem.value.length);
				document.execCommand('copy');
			}

			//shows "copied" notification
			_onCopyEventHandler (event) {
				if (document.getElementsByClassName('password-generator__tooltip').length) { return; }

				//element about which you want to draw a tooltip
				let elem = event.target;

				//creates notification message
				let elemCoords = elem.getBoundingClientRect();
				let popup = document.createElement('div');
				let timer;

				popup.classList.toggle('password-generator__tooltip');
				popup.appendChild(document.createTextNode('copied'));

				let passwordElem = document.querySelector('.password-generator__password')
				passwordElem.parentNode.insertBefore(popup, passwordElem.nextSibling)

				//sets a notification display timeout
				timer = setTimeout(function () { popup.remove(); }, 1000);

			};

			_lenghOnChangeHandler(event) {
				let elem = event.target;
				this.length = parseInt(elem.value);
			}

			static _defaults () {
				return {
					length: 16,
					minLength: 6,
					maxLength: 256
				}
			}

			_defaults() {
				let args = Array.prototype.slice.call(arguments);
				return this.constructor._defaults.apply(this, args);
			}

			static _getCharsetList() {
				let list = [];
				let selector = '.password-generator__charset-list input';
				if (this.id) {
					list = document.querySelectorAll(`#${this.id} ${selector}`)
				} else if (this.el) {
					list = this.el.querySelectorAll(selector);
				} else {
					list = list;
				}
				if (!Array.isArray(list)) {
					list = Array.prototype
						.filter.apply(list, [function(item) { return item.checked; }])
						.map(function(item) { return item.name; });
				}
				return list.slice();
			}

			_getCharsetList() {
				let args = Array.prototype.slice.call(arguments);
				return this.constructor._getCharsetList.apply(this, args);
			}

			_generateLengthElement(container) {
				for (let l = 0; l <= this.maxLength - this.minLength; l++) {
					let option = document.createElement('option');
					let val = l + this.minLength;
					option.value = val;
					option.innerHTML = val;
					if (val === this.length) { option.selected = true; }
					container.appendChild(option);
				}
			}

			_generateCharsetListElement(container) {
				let charset = this.constructor.charset();
				for (let s in charset){
					let input = document.createElement('input');
					let label = document.createElement('label');
					input.type = "checkbox";
					input.name = s;
					input.value = s;
					input.checked = true;
					label.appendChild(input);
					label.appendChild(document.createTextNode(s));
					container.appendChild(label);
				}
			}

			static charset() {
				// A-Z 65-90
				// a-z 97-122
				// 0-9 48-57

				return {
					lowercase: Math.floor(Math.random() * (122 - 97 + 1)) + 97,
					uppercase: Math.floor(Math.random() * (90 - 65 + 1)) + 65,
					numbers: Math.floor(Math.random() * (57 - 48 + 1)) + 48
				};
			}

			charset() {
				let args = Array.prototype.slice.call(arguments);
				return this.constructor.charset.apply(this, args);
			}

			static getASCIIalphanumeric (list=['numbers', 'uppercase', 'lowercase']) {
				let keys;
				if (!list.length) { keys = Object.keys(this.charset()); }
				else { keys = list; }

				return this.charset()[keys[Math.floor(Math.random() * keys.length)]];
			}

			getASCIIalphanumeric () {
				let args = Array.prototype.slice.call(arguments);
				return this.constructor.getASCIIalphanumeric.apply(this, args);
			}

			static generatePassword (len) {
				len = len || this._defaults().length;
				let password = '';
				let charsetList = this._getCharsetList();
				if (len > this._defaults().maxLength) { len = this._defaults().maxLength; }
				if (len < this._defaults().minLength) { len = this._defaults().minLength; }
				for (; len; len--) password += String.fromCharCode(this.getASCIIalphanumeric(charsetList));
				return password;
			}

			generatePassword () {
				let args = Array.prototype.slice.call(arguments);
				return this.constructor.generatePassword.apply(this, args);
			}

			buttonClickHandler (e) {
				e.preventDefault();
				let passwordOut = this.widget.querySelector('.password-generator__password');
				passwordOut.value = this.generatePassword(this.length);
			}
		}
		window.PasswordGeneratorWidget = PasswordGeneratorWidget;

	});
})();
