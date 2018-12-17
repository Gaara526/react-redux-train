/**
 * @since 2018-12-14 10:42
 * @author pengyumeng
 */

import { combineReducers } from '../lib/redux';
import changeNumber from './number';
import toggleAlert from './alert';

export default combineReducers({
    changeNumber,
    toggleAlert,
});
