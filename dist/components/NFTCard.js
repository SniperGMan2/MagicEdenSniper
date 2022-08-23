import * as React from 'react';
import ReactImageAppear from 'react-image-appear';
var NFTCard = function (_a) {
    var data = _a.data;
    var onClick = function () {
        if (data.buy_link)
            window.open(data.buy_link);
    };
    return (React.createElement("div", { className: 'flex flex-col justify-between px-3 py-2 rounded-md bg-neutral-800' },
        React.createElement("div", { className: 'flex items-center flex-1 w-full' },
            React.createElement(ReactImageAppear, { src: 'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/' + data.image, placeholderStyle: { backgroundColor: '#262626' }, className: 'w-full min-h-[100px] rounded-md' })),
        React.createElement("div", { className: 'pt-2' },
            React.createElement("div", { className: 'text-lg' }, data.name),
            React.createElement("div", { className: 'flex items-end justify-between pt-2' },
                React.createElement("button", { onClick: onClick, className: 'px-2 py-1 border rounded-md disabled:border-0', disabled: !data.price },
                    React.createElement("span", { className: 'text-green-400' }, data.price / 1000000000 || '---'),
                    " SOL"),
                React.createElement("div", { className: 'text-sm' },
                    "Rarity rank: ",
                    React.createElement("span", { className: 'text-sm text-green-400' }, data.rarity_rank))))));
};
export default NFTCard;
//# sourceMappingURL=NFTCard.js.map