import * as React from 'react';
import { Link } from 'react-router-dom';
import ReactImageAppear from 'react-image-appear';
// const style = 
var NFTDetail = function (_a) {
    var collection = _a.collection;
    if (!collection)
        return null;
    return (React.createElement(Link, { to: '/collection/' + collection.symbol, className: 'px-5 py-3 transition-all duration-200 rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 bg-neutral-800' },
        React.createElement("div", { className: 'flex items-center flex-1' },
            React.createElement(ReactImageAppear, { src: 'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/' + collection.image, placeholderStyle: { backgroundColor: '#262626' }, className: 'w-full rounded-md min-h-[100px]', alt: '' })),
        React.createElement("div", { className: 'flex flex-col pt-3' },
            React.createElement("div", { className: 'font-bold text-green-400', style: {
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 1
                } }, collection.name),
            React.createElement("div", { className: 'pt-2 text-sm text-gray-300' },
                "Floor price: @",
                collection.floor_price / 1000000000),
            React.createElement("div", { className: 'text-sm text-gray-300' },
                "Volume: @",
                collection.volume.toLocaleString()),
            React.createElement("div", { className: 'text-sm text-gray-300' },
                "Listed: ",
                collection.listed_count))));
};
export default NFTDetail;
//# sourceMappingURL=NFTDetail.js.map