var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');
var ReactRedux = require('react-redux');

var Provider = ReactRedux.Provider;

var store = Redux.createStore(reducer);

function reducer(state, action) {
	if (!state) {
		return {
			'name': 'John'
		};
	}

	switch (action.type) {
		case 'name_change':
			return Object.assign({}, state, { name: action.name });

		default:
			return state;
	}
}

function do_the_do(name) {
	return Promise.resolve()
		.then(function () {
			store.dispatch({
				type: 'name_change',
				name: name
			});
		});
}

var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

function map_state_to_props(state) {
	return {
		name: state.name
	};
}

var ConnectedHelloMessage = ReactRedux.connect(map_state_to_props)(HelloMessage);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedHelloMessage />
	</Provider>,
  document.getElementById('container')
);

global.do_the_do = do_the_do;