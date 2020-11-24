import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers/root"

const logger = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storeEnhancer = composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(logger)
);

const configureStore = initialState => {
    return createStore(rootReducer, initialState, storeEnhancer);
};

export default configureStore;
