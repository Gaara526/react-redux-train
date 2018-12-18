title: redux 异步中间件
speaker: pengyumeng
theme: dark
transition: move

[slide]

# Redux
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

# <font color=#0099ff>异步 action</font>

- 需要异步操作时（ajax 请求，读取文件等），你需要异步 action

- action 本质是 plain object ，不存在同步异步的概念。所谓异步 action ，本质上是<font color=#ff9933>打包一系列 action 动作</font>

[slide]

# <font color=#0099ff>redux-thunk 异步中间件</font>

- 例如网络请求数据：

- （1）dispatch 出请求服务器数据的 action

- （2）等待服务器响应

- （3）dispatch 出结果 action（携带服务器返回了的数据或异常）去更新 state

- <font color=#ff9933>redux-thunk 的作用：将这三步封装到一个 function 中，以实现打包一系列 action 动作的目的</font>

[slide]

# <font color=#0099ff>redux-thunk 原理</font>

- 常规的 action 返回一个 plain object ，但 redux-thunk 允许你的 action 返回一个 function

``` JavaScript
const thunk = (store) => (dispatch) => (action) => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
    }
    return dispatch(action);
};
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

[例子 redux-saga 异步中间件](http://0.0.0.0:9999/reactreduxsaga.html)

[slide]

# THE END

### THANK YOU
