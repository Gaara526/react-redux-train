title: redux 详解
speaker: pengyumeng
theme: dark
transition: move

[slide]

# Redux
pengyumeng

[slide]

# <font color=#0099ff>Part 1</font>

- 概述

- 核心概念（action、reducer、store）

- 结合 React (react-redux）

- 中间件

# <font color=#0099ff>Part 2</font>

- redux-thunk

- redux-saga

[slide]

# <font color=#0099ff>Part 1</font>

- <font color=#ff9933>概述</font>

- 核心概念（action、reducer、store）

- 结合 React (react-redux）

- 中间件

[slide]

# <font color=#0099ff>Why Flux？</font>

传统 MVC 框架

![initRedux](../img/mvc.jpeg)

[slide]

# <font color=#0099ff>Why Flux？</font>

最终几乎肯定失控

![initRedux](../img/mvc2.jpeg)

[slide]

# <font color=#0099ff>Why Flux？</font>

单向数据流（禁止 view 直接对话 model）

![initRedux](../img/mvc3.png)

[slide]

# <font color=#0099ff>Why Redux？</font>

Redux 是 Flux 的一种实现

替你管理难以维护的 state

让 state 的变化可控

[slide]

# <font color=#0099ff>三大原则</font>

- 单一数据源 store
- 只能通过 dispatch action 来修改 state
- 使用 reducer 纯函数来执行修改 state

[slide]

# <font color=#0099ff>Part 1</font>

- <font color=#0099ff>概述</font>

- <font color=#ff9933>核心概念（action、reducer、store）</font>

- 结合 React (react-redux）

- 中间件

[slide]

# <font color=#0099ff>什么是 action ？</font>

描述已发生事件，能携带数据的 <font color=#ff9933>plain object</font>

[slide]

# <font color=#0099ff>action 的作用</font>

- 告诉 reducer 发生了什么事
- 携带数据

[slide]

# <font color=#0099ff>典型的 action</font>

- 必须有 type 属性，用于告知 reducer 发生了什么事

``` JavaScript
// 例1
{
  type: 'ADD_TODO',
  payload: {
    text: 'Do something.'  
  }
}

// 例2
{
  type: 'ADD_TODO',
  payload: new Error(),
  error: true
}
```

[参考 Flux 标准](https://github.com/acdlite/flux-standard-action)

[slide]

# <font color=#0099ff>什么是 reducer ？</font>

reducer 是个<font color=#ff9933>纯函数</font>，执行计算，返回新的 state

[slide]

# <font color=#0099ff>reducer 的作用</font>

- 返回计算后的新的 state

- 参数：旧 state 和 action

- 返回值：新 state

```JavaScript 
(state, action) => newState
```

[slide]

# <font color=#0099ff>注意点</font>

- 首次执行 redux 时，需要给 state 一个初始值（初始化时，redux 会自动执行一次 reducer ，此时 state 是 undefined ，我们应该初始化 state ）


```JavaScript 
if (typeof state === 'undefined') {
    return initialState
}
```

[slide]

# <font color=#0099ff>什么是 store ？</font>

由 createStore 创建，提供 getState，subscribe，dispatch 方法，内部存储数据 state 的仓库

[slide]

# <font color=#0099ff>创建 store</font>

``` JavaScript
createStore(reducer, [initialState], [enhancer]);
```

- 可选参数 initialState 用于初始化 state

- 可选参数 enhancer 是一个高阶函数，用于增强 Store

``` JavaScript
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

const logger = createLogger();
const store = createStore(reducer, compose(
    applyMiddleware(logger),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f,
));
```

[slide]

# <font color=#0099ff>getState()</font>

- 获取 store 里存储的 state

``` JavaScript
store.getState().changeNumber.number
```

[slide]

# <font color=#0099ff>subscribe(listener)</font>

- 注册监听函数

``` JavaScript
const update = () => {
    // 更新 view
};

store.subscribe(update);
```

- 该方法的返回值也是一个函数对象，用以取消注册的回调函数

``` JavaScript
const update = () => {
    // 更新 view
};

const cancelUpdate = store.subscribe(update);

<Button onClick={cancelUpdate}>unsubscribe</Button>
```

[slide]

# <font color=#0099ff>dispatch(action)</font>

- 派发 action
- 通知 reducer 去更新 state
- 执行监听函数

``` JavaScript
store.dispatch(actions.number.incrementNum());
```

[slide]

# <font color=#0099ff>初始态流转图</font>

![initRedux](../img/initRedux.jpg)

[slide]

# <font color=#0099ff>更新态流转图</font>

![doRedux](../img/doRedux.jpg)

[slide]

# <font color=#0099ff>简易版 createStore</font>

``` JavaScript
export const createStore = (reducer) => {
    let state;
    const listeners = [];
    const getState = () => state;
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    };
    const subscribe = (listener) => listeners.push(listener);
    dispatch({});

    return {
        getState,
        dispatch,
        subscribe,
    };
};
```

[slide]

[例子 原始 redux](http://0.0.0.0:9999/redux.html)

[slide]

# <font color=#0099ff>业务数据太多，如何切分？</font>

- 用 combineReducers 将多个 reducer 合并成一个 reducer

```JavaScript 
combineReducers({
    myReducer1,
    myReducer2,
});
```

[slide]

# <font color=#0099ff>源代码</font>

```JavaScript 
export const combineReducers = (reducers) => {
    const reducerKeys = Object.keys(reducers);
    return (state = {}, action) => {
        const nextState = {};
        for (let i = 0; i < reducerKeys.length; i++) {
            const key = reducerKeys[i];
            const reducer = reducers[key];
            nextState[key] = reducer(state[key], action);
        }
        return {
            ...state,
            ...nextState,
        };
    };
};
```

[slide]

[例子 combineReducer](http://0.0.0.0:9999/reduxcombinereducer.html)

[slide]

# <font color=#0099ff>Part 1</font>

- <font color=#0099ff>概述</font>

- <font color=#0099ff>核心概念（action、reducer、store）</font>

- <font color=#ff9933>结合 React (react-redux）</font>

- 中间件

[slide]

# <font color=#0099ff>单独使用 redux</font>

```JavaScript 
componentDidMount() {
    store.subscribe(() => {
        const newState = store.getState();
        this.setState({
            number: newState.changeNumber.number,
            showAlert: newState.toggleAlert.showAlert,
        });
    });
}
```

[例子 react 中使用 redux](http://0.0.0.0:9999/reduxcombinereducer.html)

[slide]

# <font color=#0099ff>单独使用 redux 缺点</font>

- 使用 store 中数据都需要单独绑定监听事件，代码重复

[slide]

# <font color=#0099ff>react-redux</font>

- react-redux 一共就一个组件和一个 API：
- ```<Provider store>```
- connect

[slide]

# <font color=#0099ff>```<Provider store>```</font>

- 将入口组件包进去（被包进的组件及子组件才能访问到 store ，才能使用 connect 方法）

``` JavaScript
import { Provider } from 'react-redux';  // 引入 react-redux

……
render(
    <Provider store={store}>
        <Sample />
    </Provider>,
    document.getElementById('app'),
);
```

[slide]

# <font color=#0099ff>connect</font>

```
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
```

``` JavaScript
const mapStateToProps = (state) => ({
    number: state.changeNumber.number,
    showAlert: state.toggleAlert.showAlert,
});

export default connect(
    mapStateToProps,
)(Sample);
```

[slide]

# <font color=#0099ff>mapStateToProps</font>

- 作用是将 store 里的 state 变成组件的 props 。当 state 更新时，会同步更新组件的 props ，触发组件的 render 方法
- function 返回值是一个 key-value 的 plain object

``` JavaScript
const mapStateToProps = (state) => ({
    number: state.changeNumber.number,
    showAlert: state.toggleAlert.showAlert,
});
```
- 如果 mapStateToProps 为空（即设成()=>({})），那 store 里的任何更新就不会触发组件的 render 方法。

[slide]

# <font color=#0099ff>react-redux 的实现原理</font>

- react 里有个全局变量 context ，可用将组件间共享的数据放到 context 里

- 优点是：所有组件都可以随时访问到 context 里共享的值，免去了数据层层传递的麻烦

- 缺点是：全局变量意味着所有人都可以随意修改它，导致不可控。而且和 react 组件化设计思想不符合

[slide]

# <font color=#0099ff>context 能和 react-redux 完美结合</font>

- redux 设计思想就是单一数据源，集中维护 state。（context 天生就是唯一数据源）

- redux 设计思想就是不允许随意修改 state，这样数据存到 context 里，也无法随意修改数据

- context 成了一个可控的唯一的全局变量，完美！

[slide]

# <font color=#0099ff> Provider 组件的实现原理</font>

- 将 store 保存进 context ，让子组件可以访问到 context 里的 store

``` JavaScript
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Provider extends Component {
    static childContextTypes = {
        store: PropTypes.object,
    };

    getChildContext = () => {
        return { store: this.props.store, };
    };

    render() {
        return (<div>{this.props.children}</div>);
    }
}
```

[slide]

# <font color=#0099ff>connect 高阶组件目的</font>

- 被```<Provider store>```包裹的子组件能访问到 context 里的 store

``` JavaScript
export class myComponent extends Component {
    ...
    static contextTypes = {
        store: PropTypes.object
    }
    ...
}
```

- 但这样每个组件里都要写上述代码太麻烦了，用 HOC 高阶组件来消除重复代码

[slide]

# <font color=#0099ff>connect 高阶组件示意图</font>

<div margin="auto">
    <img src="../img/reactredux2.jpg" width="750px" height="435px" />
</div>

[slide]

# <font color=#0099ff>connect 高阶组件实现（一）</font>

- 第一步：内部封装掉了每个组件都要写的访问 context 的代码，dispatch 就是在这个地方被传入组件 props

``` JavaScript
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const connect = (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object,
        };

        render() {
            const { store } = this.context;
            const disptch = store.dispatch;
            const stateProps = store.getState();
            cosnt finalProps = {
                dispatch,
                ...stateProps,
            }
            return (<WrappedComponent {...finalProps} />);
        }
    }

    return Connect;
};

export default connect;
```

[slide]

# <font color=#0099ff>connect 高阶组件实现（二）</font>

- 第二步：参数 mapStateToProps 封装掉组件从 context 中取 store 的代码

``` JavaScript
const connect = (mapStateToProps) => (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object,
        };
        
        render() {
            const { store } = this.context;
            const disptch = store.dispatch;
            const stateProps = mapStateToProps(store.getState());
            cosnt finalProps = {
                dispatch,
                ...stateProps,
            }
            return (<WrappedComponent {...finalProps} />);
        }
    }

    return Connect;
};
```

[slide]

# <font color=#0099ff>connect 高阶组件实现（三）</font>

- 第三步：封装掉 subscribe ，当 store 变化，刷新组件的 props ，触发组件的 render 方法

``` JavaScript
export const connect = (mapStateToProps) => (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object,
        };
                
        this.state = { finalProps: {} };
        
        componentDidMount() {
            this.updateProps();
            this.context.store.subscribe(this.updateProps);
        }
        
        updateProps = () => {
            const { store } = this.context;
            const disptch = store.dispatch;
            const stateProps = mapStateToProps(store.getState());
        
            const finalProps = {
                disptch,
                ...stateProps,
                ...this.props,
            };
        
            this.setState({
                finalProps,
            });
        };
        
        render() {
            const { finalProps } = this.state;
            return (<WrappedComponent {...finalProps} />);
        }
    }
    
    return Connect;
}
```

[slide]

[例子 react-redux](http://0.0.0.0:9999/reactredux.html)

[slide]

# <font color=#0099ff>react-redux 总结</font>

- react-redux 一共就一个组件和一个 API：

- ```<Provider store>```用于在入口处包裹需要用到 redux 的组件。<font color=#ff9933>本质上是将 store 放入 context 里</font>

- connect 方法用于将组件绑定 redux。<font color=#ff9933>本质上是 HOC ，封装掉了每个组件都要写的板式代码，增加了功能。</font>

- <font color=#ff9933>react-redux 的高封装性让开发者感知不到 context 的存在，甚至感知不到 store 的 getState，subscribe 和 dispatch 的存在。只要 connect 一下，数据一变就自动刷新 react 组件，非常方便。</font>

[slide]

# <font color=#0099ff>Part 1</font>

- <font color=#0099ff>概述</font>

- <font color=#0099ff>核心概念（action、reducer、store）</font>

- <font color=#0099ff>结合 React (react-redux）</font>

- <font color=#ff9933>中间件</font>

[slide]

# <font color=#0099ff>中间件的作用</font>

- 在流程中插入功能

- 要满足两个特性：一是扩展功能，二是可以被链式调用。

[slide]

# <font color=#0099ff>例子</font>

- redux-logger 中间件

![redux-logger](../img/redux-logger.jpeg)

[slide]

# <font color=#0099ff>需求：打印 log</font>

- 需求：自动打印出 action 对象和更新前后的 state，便于调试和追踪数据变化流

``` JavaScript
console.log('current state: ', store.getState());
console.log('dispatching', action);
store.dispatch(action);
console.log('next state', store.getState());
```

- 我们需要封装打印 log 的代码，否则让程序员在每个 dispatch 的地方写 log 是不可接受的

[slide]

# <font color=#0099ff>打印 log 的中间件</font>

``` JavaScript
const preDispatch = store.dispatch;

store.dispatch = (action) => {
    console.log('current state: ', store.getState());
    console.log('action: ', action);
    preDispatch(action);
    console.log('next state: ', store.getState());
};
```

- 上述就是增强版 store.dispatch ，这就是 redux 的中间件

[slide]

# <font color=#0099ff>log 中间件为何只能封装到 dispatch 里？</font>

- ~~Action~~ （HOW？plain object）
- ~~Reducer~~ （OK...But not pure）
- dispatch
- <font color=#ff9933>redux 的中间件本质上就是增强 dispatch</font>

[slide]

# <font color=#0099ff>添加中间件 API : applyMiddleware</font>

- 前面的例子里中间件已经实现了链式调用，但用起来不够优雅

- redux 提供 applyMiddleware 方法，允许将所有中间件作为参数传递进去，我们来自己实现这个方法

``` JavaScript
const applyMiddlewarePlus = (...middlewares) => (createStore) => (reducer) => {
    const store = createStore(reducer);

    let dispatch = store.dispatch;
    middlewares.forEach((middleware) => {
        dispatch = middleware(store)(dispatch);
    });

    return {
        ...store,
        dispatch,
    };
};
```

[slide]

# <font color=#0099ff>creatStore 方法改进 </font>

- creatStore 方法需新增加一个参数 enhancer 

``` JavaScript
const createStore = (reducer, enhancer) => {
    if (typeof enhancer !== 'undefined') {
        if (typeof enhancer !== 'function') {
            throw new Error('Expected the enhancer to be a function.');
        }
        // 将 enhancer 包装一次 createStore 方法，再调用无 enhancer 的 createStore 方法
        return enhancer(createStore)(reducer);
    }
    
    ...
}
```

[slide]

# <font color=#0099ff>实现多个中间件</font>

- 例如将之前打印 logger 的中间件拆成两个

``` JavaScript
// 只打印出 action
const loggerAction = (store) => (dispatch) => (action) => {
    console.log('action: ', action);
    dispatch(action);
};

// 只打印出更新前后的 state
const loggerState = (store) => (dispatch) => (action) => {
    console.log('current state: ', store.getState());
    dispatch(action);
    console.log('next state', store.getState());
};
```

[slide]

# <font color=#0099ff>多个中间件就像洋葱圈</font>

![reduxmiddleware](../img/reduxmiddleware2.jpg)

[slide]

# <font color=#0099ff>compose</font>

- compose 允许你进一步增强 redux 

``` JavaScript
const compose = (...funcs) => {
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
};
```

[slide]

[例子 中间件](http://0.0.0.0:9999/reactreduxmiddleware.html)

[slide]

# THE END

### THANK YOU
