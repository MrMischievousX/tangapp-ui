import {tempContact} from '../../src/constants/helper';

export default {
  getAll: (fn: Function) => fn(null, tempContact),
};
