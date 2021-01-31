import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import reducer from "./reducer";

const initialState = {};

const reduxMiddlewares = applyMiddleware();
//    logger

export const store = createStore(reducer, initialState, reduxMiddlewares);
