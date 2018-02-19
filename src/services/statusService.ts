import { StatusResponseEntity } from '../types';
import { v4 } from 'uuid';
const { name, version } = require('../../package');
const id = v4();

export function getCurrentStatus(): StatusResponseEntity {
  return {
    name,
    version,
    id,
    status: 'healthy'
  };
}
