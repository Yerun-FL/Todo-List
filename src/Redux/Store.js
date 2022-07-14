import { createStore } from "redux";
import rootReducer from "./Index";

const Store = createStore(rootReducer);

export default Store;
