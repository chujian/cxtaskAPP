import { applyMiddleware,createStore, compose} from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
//import devTools from 'remote-redux-devtools';

import rootReducer from '../Reducers/index';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk,logger)(createStore);
//const store = createStoreWithMiddleware(rootReducer);

export default function configureStore(initialState) {
    //const store = createStoreWithMiddleware(rootReducer, initialState);

    const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk,logger),
      //devTools()
    )
  );
    return store;
}
