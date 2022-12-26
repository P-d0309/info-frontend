import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../_reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const loggerMiddleware = createLogger();

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware))
);


export const getDownloadedFile = (filePath, extension = "pdf") => {
  const link = document.createElement("a");
  link.download = "file."+extension;
  link.href = filePath;
  link.target = "_blank";
  link.click();
};
