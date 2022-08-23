import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NFTCard from "../components/NFTCard";
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
var Collection = function () {
    var pageSize = 20;
    var symbol = useParams().symbol;
    var _a = useState({ floor_price: 0 }), collection = _a[0], setCollection = _a[1];
    var _b = useState([]), items = _b[0], setItems = _b[1];
    var _c = useState({ price_range: { currency: 'sol' }, rarity_range: {}, traits: {}, listing_status: [] }), filter = _c[0], setFilter = _c[1];
    var _d = useState({}), trait = _d[0], setTrait = _d[1];
    var _e = useState('price_asc'), order = _e[0], setOrder = _e[1];
    var _f = useState(''), attr = _f[0], setAttr = _f[1];
    var _g = useState(1), page = _g[0], setPage = _g[1];
    var _h = useState(true), hasMore = _h[0], setHasMore = _h[1];
    var onChangeAttribute = function (e) { return setAttr(e.target.value); };
    var onClickListed = function (e) {
        setFilter(function (filter) {
            var _filter = Object.assign({}, filter);
            var index = _filter.listing_status.indexOf(e.target.value);
            if (!e.target.checked && index > -1)
                _filter.listing_status.splice(index, 1);
            if (e.target.checked)
                _filter.listing_status.push(e.target.value);
            return _filter;
        });
    };
    var onChangePriceRange = function (e) {
        e.preventDefault();
        setFilter(function (filter) {
            var _filter = Object.assign({}, filter);
            e.target.min_price.value ? _filter.price_range.min_price = e.target.min_price.value : delete _filter.price_range.min_price;
            e.target.max_price.value ? _filter.price_range.max_price = e.target.max_price.value : delete _filter.price_range.max_price;
            return _filter;
        });
    };
    var onChangeRarityRange = function (e) {
        e.preventDefault();
        setFilter(function (filter) {
            var _filter = Object.assign({}, filter);
            e.target.min.value ? _filter.rarity_range.min = e.target.min.value : delete _filter.rarity_range.min;
            e.target.max.value ? _filter.rarity_range.max = e.target.max.value : delete _filter.rarity_range.max;
            return _filter;
        });
    };
    var changeTraits = function (key) {
        return function (e) {
            var _filter = Object.assign({}, filter);
            if (e.target.checked) {
                if (!_filter.traits[key])
                    _filter.traits[key] = [];
                _filter.traits[key].push(e.target.value);
            }
            else {
                var index = _filter.traits[key].indexOf(e.target.value);
                index > -1 && _filter.traits[key].splice(index, 1);
                !_filter.traits[key].length && delete _filter.traits[key];
            }
            setFilter(_filter);
        };
    };
    var onChangeOrder = function (e) { return setOrder(e.target.value); };
    var fetch = function () {
        axios.post("https://api.coralcube.io/v1/getItems?offset=".concat(page * pageSize, "&page_size=").concat(pageSize, "&ranking=").concat(order, "&symbol=").concat(symbol), filter)
            .then(function (res) {
            setItems(items.concat(res.data.items));
            setPage(page + 1);
            res.data.items.length < pageSize && setHasMore(false);
        })
            .catch(console.error);
    };
    useEffect(function () {
        axios.get("https://api.coralcube.io/v1/getCollectionAttributes?symbol=".concat(symbol))
            .then(function (res) {
            setTrait(res.data.schema.properties.traits.properties);
        })
            .catch(function () { return setTrait({}); });
    }, [symbol]);
    useEffect(function () {
        setItems([]);
        setPage(1);
        setHasMore(true);
        axios.post("https://api.coralcube.io/v1/getItems?offset=0&page_size=".concat(pageSize, "&ranking=").concat(order, "&symbol=").concat(symbol), filter)
            .then(function (res) {
            setCollection(res.data.collection);
            setItems(res.data.items);
            res.data.items.length < pageSize && setHasMore(false);
        })
            .catch(function () { return setCollection({}); });
    }, [filter, order]);
    if (!collection) {
        return React.createElement("div", { className: 'container mx-auto' }, "Loading..");
    }
    else {
        return (React.createElement("div", { className: 'container flex min-h-screen gap-5 pb-5 mx-auto mt-10' },
            React.createElement("div", { className: 'w-80' },
                React.createElement("div", { className: 'px-5 py-3 rounded-md shadow-md bg-neutral-800' },
                    React.createElement("img", { src: collection.image, className: 'w-20 h-20 rounded-md', alt: '' }),
                    React.createElement("div", { className: 'flex flex-col pt-5' },
                        React.createElement("div", { className: 'text-xl font-bold text-green-400' }, collection.name),
                        collection.website && React.createElement("a", { href: collection.website, className: 'text-blue-500 underline', target: '_blank', rel: 'noreferrer' }, collection.website),
                        React.createElement("div", null,
                            "Floor Price: ",
                            React.createElement("span", { className: 'text-xl font-bold text-green-400' }, collection.floor_price / 1000000000 || '---'),
                            " SOL"),
                        React.createElement("div", null,
                            "Listed Count: ",
                            React.createElement("span", { className: 'text-xl font-bold text-green-400' }, collection.listed_count)),
                        React.createElement("div", null,
                            "Total Count: ",
                            React.createElement("span", { className: 'text-xl font-bold text-green-400' }, collection.total_count)),
                        React.createElement("div", { className: 'pt-2 text-sm text-gray-300' }, collection.description))),
                React.createElement("div", { className: 'w-full px-5 mt-5 divide-y divide-green-400 rounded-md shadow-md bg-neutral-800' },
                    React.createElement("div", { className: 'flex py-5' },
                        React.createElement("div", { className: 'flex w-full' },
                            React.createElement("input", { onClick: onClickListed, type: 'checkbox', id: 'filter_listed', value: 'listed', className: 'hidden peer' }),
                            React.createElement("label", { htmlFor: 'filter_listed', className: 'w-full text-center border-2 cursor-pointer peer-checked:text-green-400 peer-checked:font-bold rounded-l-md peer-checked:border-green-400' }, "Listed")),
                        React.createElement("div", { className: 'flex w-full' },
                            React.createElement("input", { onClick: onClickListed, type: 'checkbox', id: 'filter_unlisted', value: 'unlisted', className: 'hidden peer' }),
                            React.createElement("label", { htmlFor: 'filter_unlisted', className: 'w-full text-center border-2 cursor-pointer peer-checked:text-green-400 peer-checked:font-bold rounded-r-md peer-checked:border-green-400' }, "Unlisted"))),
                    React.createElement("form", { onSubmit: onChangePriceRange, className: 'flex items-center justify-between py-5' },
                        React.createElement("span", { className: 'font-bold text-green-400' }, "Price:"),
                        React.createElement("div", null,
                            React.createElement("input", { type: 'number', id: 'min_price', className: 'w-16 pl-2 bg-transparent border rounded-md outline-none appearance-none focus:border-green-400' }),
                            React.createElement("span", { className: 'px-2' }, "~"),
                            React.createElement("input", { type: 'number', id: 'max_price', className: 'w-16 pl-2 bg-transparent border rounded-md outline-none appearance-none focus:border-green-400' }),
                            React.createElement("button", { className: 'px-3 ml-3 text-green-400 border border-green-400 rounded-md' }, "Find"))),
                    React.createElement("form", { onSubmit: onChangeRarityRange, className: 'flex items-center justify-between py-5' },
                        React.createElement("span", { className: 'font-bold text-green-400' }, "Rarity:"),
                        React.createElement("div", null,
                            React.createElement("input", { type: 'number', id: 'min', className: 'w-16 pl-2 bg-transparent border rounded-md outline-none appearance-none focus:border-green-400' }),
                            React.createElement("span", { className: 'px-2' }, "~"),
                            React.createElement("input", { type: 'number', id: 'max', className: 'w-16 pl-2 bg-transparent border rounded-md outline-none appearance-none focus:border-green-400' }),
                            React.createElement("button", { className: 'px-3 ml-3 text-green-400 border border-green-400 rounded-md' }, "Find"))),
                    React.createElement("div", { className: 'py-5' },
                        React.createElement("select", { defaultValue: '', onChange: onChangeAttribute, className: 'w-full px-3 border rounded-md' },
                            React.createElement("option", { value: '', className: 'hidden', disabled: true }, "Select traits"),
                            Object.keys(trait).map(function (key) { return React.createElement("option", { value: key, key: key }, key); })),
                        React.createElement("div", { className: 'flex flex-col items-start pt-3 pl-3' }, attr && Object.keys(trait[attr].trait_count).map(function (key) { return (React.createElement("label", { key: key, className: 'flex items-center gap-3' },
                            React.createElement("input", { type: 'checkbox', onChange: changeTraits(attr), value: key }),
                            React.createElement("span", null,
                                key,
                                " (",
                                trait[attr].trait_count[key],
                                ")"))); }))))),
            React.createElement("div", { className: 'flex-1' },
                React.createElement("div", { className: 'flex items-center justify-end pb-5' },
                    React.createElement("select", { value: order, onChange: onChangeOrder, className: 'px-3 py-1 border rounded-md' },
                        React.createElement("option", { value: 'price_asc' }, "Price: Low to High"),
                        React.createElement("option", { value: 'price_desc' }, "Price: High to Low"),
                        React.createElement("option", { value: 'recently_listed' }, "Recently Listed"),
                        React.createElement("option", { value: 'rarity_asc' }, "Rarity: Rare to Common"),
                        React.createElement("option", { value: 'rarity_desc' }, "Rarity: Common to Rair"))),
                React.createElement(InfiniteScroll, { dataLength: items.length, next: fetch, hasMore: hasMore, className: 'grid grid-cols-4 gap-5', loader: undefined }, items.map(function (item, key) { return React.createElement(NFTCard, { data: item, key: key }); })))));
    }
};
export default Collection;
//# sourceMappingURL=Collection.js.map