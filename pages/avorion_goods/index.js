import { css } from '@emotion/react';
import { useState } from 'react';
import xw from 'xwind';
import Layout from '../../components/layout';
import goods from './goods.json';

const fields_name = [
    {name: 'Name', display: 'Name'},
    {name: 'Volume', display: 'Volume'},
    {name: 'Avg.Price', display: 'Avg. Price'},
    {name: 'Price/Volume', display: 'Price / Volume'},
    {name: 'SoldBy', display: 'Sold By'},
    {name: 'BoughtBy', display: 'Bought By'},
    {name: 'Illegal?', display: 'Illegal ?'},
    {name: 'Dangerous?', display: 'Dangerous ?'},
]

const AvorionGoods = () => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState({field: 'Name', sort: 1});

    function isLowerGeneric(a, b) {
        if (typeof(a[sort.field]) === 'number') {
            return a[sort.field] < b[sort.field] ? -1 : 1;
        } else if (typeof(a[sort.field]) === 'string') {
            return a[sort.field].localeCompare(b[sort.field]);
        } else if (typeof(a[sort.field]) === 'array') {
            return a[sort.field] < b[sort.field] ? -1 : 1;
        }
    }

    function sortedList() {
        let newList = goods.filter((e) => search === '' ? true : e['Name'].toLowerCase().includes(search.toLowerCase()));
        newList = newList.map((e) => {
            e['Price/Volume'] = Math.round(e['Avg.Price'] / e['Volume']);
            return e;
        });
        if (sort.field !== '') {
            newList = newList.sort((a, b) => sort.sort * isLowerGeneric(a, b));
        }
        return newList;
    }

    function modifySort(field) {
        if (sort.field !== field) {
            setSort({field: field, sort: -1});
        } else {
            if (sort.sort === 1) {
                setSort({field: '', sort: 0});
            } else {
                setSort({field: field, sort: 1});
            }
        }
    }

    const goods_list = sortedList();

    return (
        <Layout title='Avorion' showPage title='Avorion Goods' description='Find and Evaluate trade goods in Avorion'>
            <div css={[xw`flex flex-row items-start justify-start mb-10`, css`width: 1280px;`]}>
                <input
                    css={xw`border-gray-400 border-solid border-2 rounded p-1`}
                    type='text'
                    placeholder='Search Name'
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div css={[xw`rounded-lg overflow-hidden border-gray-400 border-2`, css`width: 1280px`]}>
                <table css={[xw`space-y-6 p-2`]} cellPadding='10'>
                    <colgroup>
                        {fields_name.map((_, i) => (
                            <col key={i} span="1" width={`${100 / fields_name.length}%`}/>
                        ))}
                    </colgroup>
                    <thead>
                        <tr css={[xw`bg-gray-100`]}>
                            {fields_name.map(({display, name}, i) => (
                                <td
                                    key={i}
                                    css={[xw`cursor-pointer border-gray-300 border-dashed border-l-2 hover:bg-gray-200`, css`${i === 0 && 'border-left: 0;'}`]}
                                    onClick={() => modifySort(name)}
                                >
                                    {display}{sort.field === name ? (sort.sort === -1 ? ' ▼' : (sort.sort === 1 && ' ▲')) : ''}
                                </td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {goods_list.map((good, i) => (
                            <tr key={i} css={[xw`border-gray-400 border-solid border-2 even:bg-gray-100 hover:bg-gray-200`, css`border-left: 0; border-right: 0; border-bottom: 0;`]}>
                                {fields_name.map(({name}, j) => (
                                    <td key={j} css={[xw`border-gray-300 border-dotted border-l-2`, css`${j === 0 && 'border-left: 0;'}`]}>
                                        {typeof(good[name]) === "object" ? good[name].join(', ') : good[name]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default AvorionGoods;