import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import NFTDetail from '../components/NFTDetail';
import InfiniteScroll from 'react-infinite-scroll-component';
function Home() {
    var pageSize = 20;
    var _a = useState([]), collections = _a[0], setCollections = _a[1];
    var _b = useState(1), page = _b[0], setPage = _b[1];
    var _c = useState(true), hasMore = _c[0], setHasMore = _c[1];
    var params = useSearchParams()[0];
    var fetch = function () {
        axios.get("https://api.coralcube.io/v1/getCollections?offset=".concat(page * pageSize, "&page_size=").concat(pageSize, "&name=").concat(params.get('q') || ''))
            .then(function (res) {
            setCollections(collections.concat(res.data));
            setPage(page + 1);
            res.data.length < pageSize && setHasMore(false);
        })
            .catch(console.error);
    };
    useEffect(function () {
        setCollections([]);
        setPage(1);
        setHasMore(true);
        axios.get("https://api.coralcube.io/v1/getCollections?offset=0&page_size=".concat(pageSize, "&name=").concat(params.get('q') || ''))
            .then(function (res) {
            setCollections(res.data);
            res.data.length < pageSize && setHasMore(false);
        })
            .catch(console.error);
    }, [params]);
    return (React.createElement("div", { className: 'container min-h-screen pb-5 mx-auto' },
        React.createElement(InfiniteScroll, { dataLength: collections.length, next: fetch, hasMore: hasMore, className: 'grid grid-cols-5 gap-5 mt-5', loader: undefined }, collections.map(function (col, key) { return React.createElement(NFTDetail, { collection: col, key: key }); }))));
}
export default Home;
//# sourceMappingURL=Home.js.map