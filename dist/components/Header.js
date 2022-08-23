import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PhantomButton } from 'wallet-connect-buttons';
import * as logo from 'assets/img/solana-logo.png';
var Header = function () {
    var navigate = useNavigate();
    var inputDom = useRef(null);
    var _a = useState(''), query = _a[0], setQuery = _a[1];
    var _b = useState(''), publicKey = _b[0], setPublicKey = _b[1];
    var onChange = function (e) { return setQuery(e.target.value); };
    var onKeyDown = function (e) {
        e.stopPropagation();
        if (e.keyCode === 13) {
            if (e.target.value.trim())
                navigate('/?q=' + e.target.value.trim());
            else
                navigate('/');
        }
    };
    function keyDownE(e) {
        var _a;
        if (e.keyCode === 191) {
            e.preventDefault();
            (_a = inputDom.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }
    useEffect(function () {
        window.addEventListener('keydown', keyDownE);
        return function () { return window.removeEventListener('keydown', keyDownE); };
    }, []);
    var componentRef = useRef(null);
    return (React.createElement("div", { className: 'container flex items-center justify-between py-2 mx-auto' },
        React.createElement(Link, { to: '/' },
            React.createElement("img", { src: logo, className: 'w-10 h-10', alt: '' })),
        React.createElement("div", { className: 'flex items-center gap-3' },
            React.createElement("div", { className: 'relative flex items-center gap-3' },
                React.createElement("div", null, "Search:"),
                React.createElement("input", { value: query, onChange: onChange, onKeyDown: onKeyDown, type: 'text', placeholder: 'Search collections..', className: 'px-3 py-1 bg-transparent border rounded-md outline-none w-96 focus:border-green-600 caret-green-600' }),
                React.createElement("span", { className: 'absolute px-2 font-bold bg-green-700 border rounded right-1' }, "/")),
            publicKey ?
                React.createElement("div", { className: 'text-lg font-bold text-green-500' },
                    publicKey.slice(0, 4),
                    "...",
                    publicKey.slice(-4)) :
                React.createElement(PhantomButton, { backgroundColor: '#262626', setPublicKey: setPublicKey }))));
};
export default Header;
//# sourceMappingURL=Header.js.map