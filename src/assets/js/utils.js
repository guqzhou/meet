/**
 * @author Gjf
 * @date 2021-05-17 02:31
 * 常用工具封装
*/


/**
 * @function 递归查找数据
 * @param {Array} arr 遍历的数据
 * @param {Array} children 遍历的数据的子节点
 * @param {String} key 查找的节点key
 * @param {String} value 需要查找的value
 * @param {Boolean} search 查询前将判断条件初始化
*/
let node = ''; // 节点暂存器
let parentNode = ''; // 父节点暂存器
function getNode(arr, children, key, value, search = true) {

    if (search) {
        node = '';
        parentNode = '';
    }

    for (let i = 0; i < arr.length; i++) {

        if (node) { break; }

        const item = arr[i];
        let flag = item[key] == value;

        if (flag) {
            node = item;
            break;
        } else {
            if (item[children]) {
                parentNode = item;
                getNode(item[children], children, key, value, false);
            } else {
                continue;
            }
        }
    }

    if (!node) { parentNode = ''; }

    return {
        node,
        parentNode
    };
}

/**
 * @function 反向查询直至查询到根节点
 * @param {Array} arr 遍历的数据
 * @param {Array} children 遍历的数据的子节点
 * @param {String} key 查找的节点key
 * @param {String} value 需要查找的value
 * @param {Boolean} search 查询前将判断条件初始化
*/
let resultArr = []; // 反向查询节点暂存器
function reverseGetNode(arr, children, key, value, search = true) {
    node = ''; // 每次查询重置节点暂存
    parentNode = ''; // 每次查询重置父节点暂存


    if (search) {
        resultArr = [];
    }

    const _node = getNode(arr, children, key, value, false);

    if (!_node.parentNode) {
        resultArr.unshift(_node);
        return;
    } else {
        resultArr.unshift(_node);
        reverseGetNode(arr, children, key, _node.parentNode[key], false)
    }

    return resultArr;
}

/**
 * @function 获取所有路由
 * @param {String} path 路由
 * @returns {Array} 'aaa/bbb/ccc/ddd' =>  // [aaaBbb,aaaBbbCcc,aaaBbbCccDdd, bbbCcc,bbbCccDdd, cccDdd]
*/
function getAllRouter(path) {
    let routers = [];
    const pathArr = path.split('/').filter(item => item !== '');
    const capital = pathArr.map(item => {
        return item.slice(0, 1).toUpperCase() + item.slice(1);
    });

    for (let i = 0; i < capital.length; i++) {
        let arr = [];

        for (let j = i; j < capital.length; j++) {
            let str = i == j ? capital[i] : capital[i] + capital[j];

            arr.push(str);
        }

        routers = [...routers, ...arr];
    }

    return routers;
}

/**
 * @function 数字千分位逗号分隔
 * @param {Number} num 数值
*/
function numFormat(num) {
    return num.toString().indexOf('.') !== -1 ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

export default {
    getNode,
    reverseGetNode,
    getAllRouter,
    numFormat
};
