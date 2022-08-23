import React from 'react';
import Header from 'components/Header';
import Home from 'pages/Home';
import Collection from 'pages/Collection';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
    return (React.createElement(BrowserRouter, null,
        React.createElement(Header, null),
        React.createElement(Routes, null,
            React.createElement(Route, { path: '/', element: React.createElement(Home, null) }),
            React.createElement(Route, { path: '/collection/:symbol', element: React.createElement(Collection, null) }))));
}
export default App;
//# sourceMappingURL=App.js.map