
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { tasksReducer } from './tasksReducer';
import { todolistsReducer } from './todolistsReducer';
import { thunk } from 'redux-thunk';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer
})
// непосредственно создаём store
export const store = legacy_createStore<any,any>(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
