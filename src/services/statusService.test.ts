import { getCurrentStatus } from './statusService';

describe('status service', () => {
  it('get current status should be healthy', () => {
    const status = getCurrentStatus();
    expect(status.status).toBe('healthy');
  });

  it('get current version should mirror package.json', () => {
    const status = getCurrentStatus();
    const { version } = require('../../package');
    expect(status.version).toBe(version);
  });

  it('get app name should mirror package.json', () => {
    const status = getCurrentStatus();
    const { name } = require('../../package');
    expect(status.name).toBe(name);
  });
});
