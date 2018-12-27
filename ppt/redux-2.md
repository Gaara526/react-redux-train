title: redux 异步中间件
speaker: pengyumeng
theme: dark
transition: move

[slide]

# Redux 异步中间件
pengyumeng

[slide]

# <font color=#0099ff>Part 1</font>

- <font color=#0099ff>概述</font>

- <font color=#0099ff>核心概念（action、reducer、store）</font>

- <font color=#0099ff>结合 React (react-redux）</font>

- <font color=#0099ff>中间件</font>

# <font color=#0099ff>Part 2</font>

- redux-thunk

- redux-saga

[slide]

# <font color=#0099ff>Part 2</font>

- <font color=#ff9933>redux-thunk</font>

- redux-saga

[slide]

# <font color=#0099ff>redux 副作用</font>

- redux 本身遵循函数式编程的规则，action 是一个 plain object ，reducer 是一个纯函数

- 异步操作时（ajax 请求，读取文件等），就会产生副作用

![reduxsaga](../img/reduxsaga.png)

[slide]

# <font color=#0099ff>redux 异步中间件</font>

- 异步中间件的作用：处理异步操作产生的副作用，生成原始的 action ，这样 reducer 函数就能处理相应的 action ，从而改变 state ，更新 UI。

[slide]

# <font color=#0099ff>redux-thunk</font>

- 例如网络请求数据：

- （1）dispatch 出请求服务器数据的 action

- （2）等待服务器响应

- （3）dispatch 出结果 action（携带服务器返回了的数据或异常）去更新 state

- <font color=#ff9933>redux-thunk 的作用：将这三步封装到一个 action function 中，以实现打包一系列 action 动作的目的</font>

[slide]

# <font color=#0099ff>redux-thunk 原理</font>

- 常规的 action 返回一个 plain object ，但 redux-thunk 允许你的 action 返回一个 function

``` JavaScript
const thunk = (store) => (dispatch) => {
    return (action) => {
        if (typeof action === 'function') {
           return action(store.dispatch, store.getState);
        }
        return dispatch(action);
    };
}
```

[slide]

# <font color=#0099ff>异步 action 实现</font>

``` JavaScript
const asyncFetch = async(dispatch, getState) => {
    // 第一步，请求开始阶段，可以给视图添加 loading 状态
    dispatch({ type: 'REQUEST_DATA' });
    
    // 第二步，发送请求
    fetch('./api/asyncFetchData.json')
        .then((response) => response.json())
        .then((json) => {
            // 第三步，请求发送成功回调，此时更新数据并关闭 loading 状态
            dispatch({
                type: 'RECEIVE_DATA',
                payload: json.msg,
            });
        });
};

// 使用 thunk 中间件后，dispatch 可以传入一个函数，而不是 plain object ；
this.props.dispatch(asyncFetch);
```

[slide]

[例子 redux-thunk 异步中间件](http://0.0.0.0:9999/reactreduxthunk.html)

[slide]

# <font color=#0099ff>Part 2</font>

- <font color=#0099ff>redux-thunk</font>

- <font color=#ff9933>redux-saga</font>

[slide]

# <font color=#0099ff>redux-saga 原理</font>

- 所有副作用处理封装在一个 Generator 函数里处理；

- Generator 函数的作用有三个：

- （1）监听所有 dispatch 的 action ；

- （2）如果监听到匹配的 action 则开始处理副作用（异步调用）；

- （3）返回 action 原始对象以供 reducer 使用；

[slide]

# <font color=#0099ff>redux-saga 使用举例</font>

``` JavaScript
// Generator 函数
function* rootSaga() {
    while (true) {
        yield take(actions.async.REQUEST_DATA);

        yield call(delay, 1500);
        const payload = yield call(() => {
           return fetch('./api/asyncFetchData.json')
               .then((response) => response.json())
               .then((json) => {
                   return json.msg;
               });
        });

        yield put({
            type: actions.async.RECEIVE_DATA,
            payload,
        });
    }
}

// 必须事先运行这个 Generator 函数
sagaMiddleware.run(rootSaga);

// 使用 take 监听后，disaptch 相同 type 的 action 就会被监听到，并执行 take 后的代码；
this.props.dispatch({ type: actions.async.REQUEST_DATA });
```

[slide]

[例子 redux-saga 异步中间件](http://0.0.0.0:9999/reactreduxsaga.html)

[slide]

# <font color=#0099ff>redux-saga 如何实现监听？</font>

``` JavaScript
// 注册监听
const channel = () => {
    let taker;
    return {
        take: (cb) => {
            // 注册监听事件
            taker = cb;
        },
        put: (input) => {
            // 当匹配到监听事件，如果事件已经注册过，则执行相应代码
            if (taker) {
                const tempTaker = taker;
                taker = null;
                tempTaker(input);
            }
        },
    };
};
const chan = channel();

// 遇到 take 方法执行的函数；
const runTakeEffect = (cb) => {
    // 注册监听事件
    chan.take((input) => {
        cb(input);
    });
};

const take = () => ({
    type: 'TAKE',
});

// 核心：Generator 执行器
function run(iterator) {
    const iter = iterator();
    function next(args) {
        const result = iter.next(args);
        if (!result.done) {
            const effect = result.value;
            if (effect.type === 'TAKE') {
                /*
                 * 如果遇到 take 方法，则注册监听事件
                 * 此时 Generator 会暂停执行，直到监听的事件发生了才会恢复执行
                 * 即 next 执行权限交给了外部代码
                 */
                runTakeEffect(next);
            }
        }
    }
    next();
}

function* rootSaga() {
    // 第一步就是注册监听事件
    const action = yield take();
    console.log(action);
}
run(rootSaga);

$btn.addEventListener('click', () => {
    const action = 'action data';
    // 这里的 put 类似 dispatch ;
    chan.put(action);
}, false);
```

[slide]

# <font color=#0099ff>redux-thunk 和 redux-saga 比较</font>

- redux-thunk
![reduxsaga1](../img/reduxsaga1.png)

- redux-saga
![reduxsaga2](../img/reduxsaga2.png)

[slide]

# <font color=#0099ff>redux-thunk 缺点</font>

- action 的形式不统一

- 异步操作太分散，分散在了各个 action 中

[slide]

# <font color=#0099ff>redux-saga 优点</font>

- 统一的 action 的形式

- 异步的操作都在 sagas 中做统一处理，流程逻辑更清晰，模块更干净

- <font color=#ff9933>以同步的方式写异步代码，可以做一些“一个 async 函数”做不到的事情 (无阻塞并发、取消进程)</font>

- <font color=#ff9933>声明式的写法能容易地对 Generator 里所有的业务逻辑进行单元测试</font>

[slide]

# <font color=#0099ff>redux-saga 无阻塞并发</font>

- redux-saga 是通过<font color=#ff9933> fork </font>方法实现无阻塞并发；

- fork 意为分叉，一般在项目中用来创建多个并行 saga 子任务；

- 调用 fork 方法返回的是一个子任务，子任务可以作为参数传给 cancel 方法被取消；

- fork 实现的底层原理如下：

``` JavaScript
function runForkEffect(effect, cb) {
    effect.fn();
    // 执行 fork Effect 方法传入函数时并不影响执行 Generator 继续执行
    cb();
}

...
if (effect.type === 'FORK') {
    runForkEffect(effect, next);
}
...
```

[slide]

# <font color=#0099ff>redux-saga 取消进程</font>

- redux-saga 是通过<font color=#ff9933> cancel </font>方法实现取消进程；

- 原理是调用底层 Generator 对象上的 return 方法；

``` JavaScript
function runCancelEffect(effect, cb) {
    // 调用 Generator 的 return 方法，Generator 后续进程不再执行；
    effect.gen.return();
}

...
if (effect.type === 'CANCEL') {
    runCancelEffect(effect, next);
}
...
```

[slide]

[例子 redux-saga 无阻塞并发和取消进程](http://0.0.0.0:9999/reactreduxsaga2.html)

[slide]

# <font color=#0099ff>redux-saga 声明式 effects</font>

- effect 是一个 plan object ，可以使用 redux-saga/effects 提供的 api 来创建一个 effect ；

- effect 包含了一些给 Generator 执行器内部解释执行的信息；

``` JavaScript
// 例如调用 call 返回的一个 effect
{
    type: 'CALL',
    fn: Ajax.get,
    args: {
        url: 'xxx',
        params,
    },
}
```

[slide]

![reduxsaga3](../img/reduxsaga3.jpg)

[slide]

# <font color=#0099ff>redux-saga 声明式 effects 的优势</font>

- 方便单元测试

``` JavaScript
// 非声明式写法；
yield Ajax.get({
    url: 'xxx',
    params,
});

// 调用 call 声明式写法
yield call(Ajax.get, {
    url: 'xxx',
    params,
});

// Generator 一个很大优势就是可以对函数中的每一步 yeild 产生的值进行单元测试
// 那么返回的值是什么样子才是对单元测试友好的呢？
iterator.next().value

// 对于单元测试非常友好
{
    type: 'CALL',
    fn: Ajax.get,
    args: {
        url: 'xxx',
        params,
    },
}
```

[slide]

# <font color=#0099ff>redux-saga 常用生成 effect 的 API</font>

- take ：监听 dispatch 的 action

- put ：替代 dispatch 方法，通知 redux 执行 reducer 函数

- call ：阻塞式调用

- fork ：无阻塞调用

- select ：获取 store 中存储的 state

- cancel ：取消某个进程

[slide]

# <font color=#0099ff>redux-saga 高阶 API</font>

- <font color=#ff9933> takeEvery(pattern, saga, ...args) </font>：dispatch 的 action.type 匹配 pattern 时派生一个 saga 任务；

- <font color=#ff9933> takeLatest(pattern, saga, ...args) </font>：相对 takeEvery 在匹配到 pattern 会自动取消之前所有已经启动但仍在执行中的 saga 任务；

- 高阶 API 具有更好地绑定监听事件的语义，帮助我们管理 saga ； 

[例子 redux-saga 高阶 api](http://0.0.0.0:9999/reactreduxsaga3.html)

[slide]

# <font color=#0099ff>redux-saga 总结回顾</font>

- redux-saga 把异步处理封装在 Generator 函数执行，通过 Generator 实现 dispatch 监听、异步调用、将异步调用结果返回以供 reducer 使用；

- 使用 redux-saga 后，在处理异步调用时也能保持 dispatch 的 action 在形式上的统一；

- redux-saga 通过 fork 方法实现并发，一般在项目中通过 fork 创建多个并行的子 saga 任务；

- 声明式的写法更有利于单元测试；

- 高阶 API 具有更好地绑定监听事件的语义，帮助我们管理 saga ；

[slide]

# THE END

### THANK YOU
