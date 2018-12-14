title: Redux 详解
speaker: pengyumeng
theme: dark
transition: move

[slide]

# Redux 详解
pengyumeng

[slide]

# <font color=#0099ff>Part 1</font>

- 概述

- 核心概念（action、reducer、store）

- 结合 React (react-redux）

- 中间件

# <font color=#0099ff>Part 2</font>

- redux-saga

- redux-saga 与 redux-thunk 比较

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

由 createStore 创建，提供 getState，dispatch，subscribe 方法，内部存储数据 state 的仓库

[slide]

# <font color=#0099ff>创建 Store</font>

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

[例子 originRedux](http://0.0.0.0:9999/redux.html)

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

[例子 originReduxCombineReducer](http://0.0.0.0:9999/reduxcombinereducer.html)

[slide]

# <font color=#0099ff>Part 1</font>

- <font color=#0099ff>概述</font>

- <font color=#0099ff>核心概念（action、reducer、store）</font>

- <font color=#ff9933>结合 React (react-redux）</font>

- 中间件

[slide]

# <font color=#0099ff>单独使用 redux</font>

[例子 reactReduxOrigin](http://0.0.0.0:9999/reduxcombinereducer.html)

[slide]

# <font color=#0099ff>单独使用 redux 缺点</font>

- 用到 store 中数据都需要单独绑定监听事件，繁琐

- 每次 dispatch ，所有监听事件都会执行一遍，导致不必要的更新，造成资源浪费

[slide]

# <font color=#0099ff>react-redux</font>

- ```<Provider store>```
- connect

[slide]

# <font color=#0099ff>```<Provider store>```</font>

- 将入口组件包进去（被包进的组件及子组件才能访问到Store，才能使用connect方法）

``` JavaScript
import { Provider } from 'react-redux';     // 引入 react-redux

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
const mapStateToProps = (state) => {
    return {
        number: state.changeNumber.number,
        showAlert: state.toggleAlert.showAlert,
    };
};

const mapDispatchToProps = {
    incrementNum: action.number.incrementNum,
    decrementNum: action.number.decrementNum,
    clearNum: action.number.clearNum,
    toggleAlert: action.alert.toggleAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Sample);
```

[slide]

# <font color=#0099ff>mapStateToProps</font>

- connect方法的第一个参数mapStateToProps是一个function（负责输入）
- 作用是将Store里的state变成组件的props。当state更新时，会同步更新组件的props，触发组件的render方法
- function返回值是一个key-value的plain object

``` JavaScript
const mapStateToProps = (state) => {
    return {
        number: state.changeNumber.number,
        showAlert: state.toggleAlert.showAlert,
    };
};
```
- 如果mapStateToProps为空（即设成()=>({})），那Store里的任何更新就不会触发组件的render方法。

[slide]

# <font color=#0099ff>mapDispatchToProps</font>

- connect方法的第二个参数mapDispatchToProps可以是一个object也可以是一个function（负责输出）
- 作用是将```dispatch(action)```绑定到组件的props上，这样组件就能派发Action，更新state了

[slide]

# <font color=#0099ff>object型mapDispatchToProps</font>

- 是一个key-value的plain object
- key是组件props
- value是一个Action creator

``` JavaScript
const mapDispatchToProps = {
    incrementNum: action.number.incrementNum,
    decrementNum: action.number.decrementNum,
    clearNum: action.number.clearNum,
    toggleAlert: action.alert.toggleAlert,
};
```
- 这样就能在组件中通过```this.props.incrementNum()```方式来dispatch Action出去
- 但为何不是```dispatch(this.props.incrementNum())```？？

[slide]

# <font color=#0099ff>function型mapDispatchToProps</font>

- 是一个function
- 参数是dispatch方法
- 返回值是object型mapDispatchToProps

``` JavaScript
import { bindActionCreators } from 'redux';

const mapDispatchToProps2 = (dispatch, ownProps) => {
    return {
        incrementNum: bindActionCreators(action.number.incrementNum, dispatch),
        decrementNum: bindActionCreators(action.number.decrementNum, dispatch),
        clearNum: bindActionCreators(action.number.clearNum, dispatch),
        toggleAlert: bindActionCreators(action.alert.toggleAlert, dispatch),
    };
};
```
- 解释了上一页的疑问。其实dispatch已经被封装进去了，因此你不必手动写dispatch了

[slide]

# <font color=#0099ff>mergeProps</font>

- 经过conncet的组件的props有3个来源：
- 1.由mapStateToProps将state映射成的props
- 2.由mapDispatchToProps将```dispatch(action)```映射成的props
- 3.组件自身的props。

mergeProps的参数分别对应了上面3个来源，作用是整合这些props

（例如过滤掉不需要的props，重新组织props，根据ownProps绑定不同的stateProps和dispatchProps等）

[slide]

例如过滤掉不需要的props：

``` JavaScript
const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...ownProps,
        ...stateProps,
        incrementNum: dispatchProps.incrementNum,	// 只输出incrementNum
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(Sample);
```

[slide]

例如重新组织props：

``` JavaScript
const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...ownProps,
        state: stateProps,
        actions: {
            ...dispatchProps,
            ...ownProps.actions,
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(Sample);
```

[slide]

# <font color=#0099ff>总结</font>

- react-redux一共就一个组件和一个API：

- ```<Provider store>```用于包裹React组件，被包裹的组件可以使用connect方法。

- conncet方法用于将组件绑定Redux。第一个参数负责输入，将state映射成组件props。第二个参数负责输出，将```dispatch(action)```映射成组件props。第三个参数用于整合props。第四个参数可以做一些优化，具体见官网。

[slide]

# THE END

### THANK YOU
