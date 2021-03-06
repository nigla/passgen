'use strict';

function urlparser(url) {
	var a = document.createElement('a');
	a.href = url;
	return {
		protocol: a.protocol,
		hostname: a.hostname,
		port: a.port,
		pathname: a.pathname,
		query: a.search,
		hash: a.hash,
		host: a.host
	};
}

function errorHandler(msg, url, row, col, error) {
	var err = {
		message: msg,
		url: url,
		row: row,
		col: col
	};
	console.error(err);
	this.renderError(err);
	return false;
}

function renderError(err) {
	var container = document.createElement('div');
	container.classList.add('error');
	container.textContent = '\n\t\t' + (this.urlparser(err.url).pathname || '') + ':\n\t\t' + (err.row || '') + ':\n\t\t' + (err.col || '') + ':\n\t\t' + (err.message || '');
	document.body.appendChild(container);
}

function createElement(tag, props, children) {
	var element = document.createElement(tag);

	Object.keys(props).forEach(function (key) {
		if (key.substring(0, 'data-'.length) === 'data-') {
			element.setAttribute(key, props[key]);
		} else {
			element[key] = props[key];
		}
	});

	children && children.forEach(function (child) {
		if (typeof child === 'string') {
			child = document.createTextNode(child);
		}

		element.appendChild(child);
	});

	return element;
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL2hlbHBlcnMuanMiXSwibmFtZXMiOlsidXJscGFyc2VyIiwidXJsIiwiYSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImhyZWYiLCJwcm90b2NvbCIsImhvc3RuYW1lIiwicG9ydCIsInBhdGhuYW1lIiwicXVlcnkiLCJzZWFyY2giLCJoYXNoIiwiaG9zdCIsImVycm9ySGFuZGxlciIsIm1zZyIsInJvdyIsImNvbCIsImVycm9yIiwiZXJyIiwibWVzc2FnZSIsImNvbnNvbGUiLCJyZW5kZXJFcnJvciIsImNvbnRhaW5lciIsImNsYXNzTGlzdCIsImFkZCIsInRleHRDb250ZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwidGFnIiwicHJvcHMiLCJjaGlsZHJlbiIsImVsZW1lbnQiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsInN1YnN0cmluZyIsImxlbmd0aCIsInNldEF0dHJpYnV0ZSIsImNoaWxkIiwiY3JlYXRlVGV4dE5vZGUiXSwibWFwcGluZ3MiOiI7O0FBQUEsU0FBU0EsU0FBVCxDQUFvQkMsR0FBcEIsRUFBeUI7QUFDeEIsS0FBTUMsSUFBSUMsU0FBU0MsYUFBVCxDQUF1QixHQUF2QixDQUFWO0FBQ0FGLEdBQUVHLElBQUYsR0FBU0osR0FBVDtBQUNBLFFBQU87QUFDTkssWUFBVUosRUFBRUksUUFETjtBQUVOQyxZQUFVTCxFQUFFSyxRQUZOO0FBR05DLFFBQU1OLEVBQUVNLElBSEY7QUFJTkMsWUFBVVAsRUFBRU8sUUFKTjtBQUtOQyxTQUFPUixFQUFFUyxNQUxIO0FBTU5DLFFBQU1WLEVBQUVVLElBTkY7QUFPTkMsUUFBTVgsRUFBRVc7QUFQRixFQUFQO0FBU0E7O0FBRUQsU0FBU0MsWUFBVCxDQUF1QkMsR0FBdkIsRUFBNEJkLEdBQTVCLEVBQWlDZSxHQUFqQyxFQUFzQ0MsR0FBdEMsRUFBMkNDLEtBQTNDLEVBQWtEO0FBQ2pELEtBQU1DLE1BQU07QUFDWEMsV0FBU0wsR0FERTtBQUVYZCxPQUFLQSxHQUZNO0FBR1hlLE9BQUtBLEdBSE07QUFJWEMsT0FBS0E7QUFKTSxFQUFaO0FBTUFJLFNBQVFILEtBQVIsQ0FBY0MsR0FBZDtBQUNBLE1BQUtHLFdBQUwsQ0FBaUJILEdBQWpCO0FBQ0EsUUFBTyxLQUFQO0FBQ0E7O0FBRUQsU0FBU0csV0FBVCxDQUFzQkgsR0FBdEIsRUFBMkI7QUFDMUIsS0FBTUksWUFBWXBCLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbEI7QUFDQW1CLFdBQVVDLFNBQVYsQ0FBb0JDLEdBQXBCLENBQXdCLE9BQXhCO0FBQ0FGLFdBQVVHLFdBQVYsZUFDRyxLQUFLMUIsU0FBTCxDQUFlbUIsSUFBSWxCLEdBQW5CLEVBQXdCUSxRQUF4QixJQUFvQyxFQUR2QyxpQkFFR1UsSUFBSUgsR0FBSixJQUFXLEVBRmQsaUJBR0dHLElBQUlGLEdBQUosSUFBVyxFQUhkLGlCQUlHRSxJQUFJQyxPQUFKLElBQWUsRUFKbEI7QUFLQWpCLFVBQVN3QixJQUFULENBQWNDLFdBQWQsQ0FBMEJMLFNBQTFCO0FBQ0E7O0FBRUQsU0FBU25CLGFBQVQsQ0FBdUJ5QixHQUF2QixFQUE0QkMsS0FBNUIsRUFBbUNDLFFBQW5DLEVBQTZDO0FBQ3pDLEtBQU1DLFVBQVU3QixTQUFTQyxhQUFULENBQXVCeUIsR0FBdkIsQ0FBaEI7O0FBRUFJLFFBQU9DLElBQVAsQ0FBWUosS0FBWixFQUFtQkssT0FBbkIsQ0FBMkIsVUFBU0MsR0FBVCxFQUFjO0FBQ3JDLE1BQUlBLElBQUlDLFNBQUosQ0FBYyxDQUFkLEVBQWlCLFFBQVFDLE1BQXpCLE1BQXFDLE9BQXpDLEVBQWtEO0FBQzlDTixXQUFRTyxZQUFSLENBQXFCSCxHQUFyQixFQUEwQk4sTUFBTU0sR0FBTixDQUExQjtBQUNILEdBRkQsTUFFTztBQUNISixXQUFRSSxHQUFSLElBQWVOLE1BQU1NLEdBQU4sQ0FBZjtBQUNIO0FBQ0osRUFORDs7QUFRQUwsYUFBWUEsU0FBU0ksT0FBVCxDQUFpQixVQUFTSyxLQUFULEVBQWdCO0FBQ3pDLE1BQUksT0FBT0EsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUMzQkEsV0FBUXJDLFNBQVNzQyxjQUFULENBQXdCRCxLQUF4QixDQUFSO0FBQ0g7O0FBRURSLFVBQVFKLFdBQVIsQ0FBb0JZLEtBQXBCO0FBQ0gsRUFOVyxDQUFaOztBQVFBLFFBQU9SLE9BQVA7QUFDSCIsImZpbGUiOiJqcy9oZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gdXJscGFyc2VyICh1cmwpIHtcblx0Y29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0YS5ocmVmID0gdXJsO1xuXHRyZXR1cm4ge1xuXHRcdHByb3RvY29sOiBhLnByb3RvY29sLFxuXHRcdGhvc3RuYW1lOiBhLmhvc3RuYW1lLFxuXHRcdHBvcnQ6IGEucG9ydCxcblx0XHRwYXRobmFtZTogYS5wYXRobmFtZSxcblx0XHRxdWVyeTogYS5zZWFyY2gsXG5cdFx0aGFzaDogYS5oYXNoLFxuXHRcdGhvc3Q6IGEuaG9zdFxuXHR9XG59XG5cbmZ1bmN0aW9uIGVycm9ySGFuZGxlciAobXNnLCB1cmwsIHJvdywgY29sLCBlcnJvcikge1xuXHRjb25zdCBlcnIgPSB7XG5cdFx0bWVzc2FnZTogbXNnLFxuXHRcdHVybDogdXJsLFxuXHRcdHJvdzogcm93LFxuXHRcdGNvbDogY29sXG5cdH07XG5cdGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0dGhpcy5yZW5kZXJFcnJvcihlcnIpO1xuXHRyZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckVycm9yIChlcnIpIHtcblx0Y29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0Y29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Vycm9yJyk7XG5cdGNvbnRhaW5lci50ZXh0Q29udGVudCA9IGBcblx0XHQke3RoaXMudXJscGFyc2VyKGVyci51cmwpLnBhdGhuYW1lIHx8ICcnfTpcblx0XHQke2Vyci5yb3cgfHwgJyd9OlxuXHRcdCR7ZXJyLmNvbCB8fCAnJ306XG5cdFx0JHtlcnIubWVzc2FnZSB8fCAnJ31gO1xuXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuXG4gICAgT2JqZWN0LmtleXMocHJvcHMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGlmIChrZXkuc3Vic3RyaW5nKDAsICdkYXRhLScubGVuZ3RoKSA9PT0gJ2RhdGEtJykge1xuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBwcm9wc1trZXldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnRba2V5XSA9IHByb3BzW2tleV07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNoaWxkcmVuICYmIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2hpbGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbiJdfQ==
