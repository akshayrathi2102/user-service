import * as rTracer from 'cls-rtracer';
import { fs } from '../utility';

const getTimestamp = (): string => {
  return new Date().toISOString();
};

const info = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.info('\x1b[33m%s\x1b[0m', `[${getTimestamp()}] [INFO] [${rTracer.id() || ''}] [${namespace}] ${message}`, object);
  } else {
    console.info('\x1b[33m%s\x1b[0m', `[${getTimestamp()}] [INFO] [${rTracer.id() || ''}] [${namespace}] ${message}`);
  }
  fs.write(`[${getTimestamp()}] [INFO] [${rTracer.id() || ''}] [${namespace}] ${message} ${object ? JSON.stringify(object) : ''}\n`);
};

const warn = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.warn('\x1b[33m%s\x1b[0m', `[${getTimestamp()}] [WARN] [${rTracer.id() || ''}] [${namespace}] ${message}`, object);
  } else {
    console.warn('\x1b[33m%s\x1b[0m', `[${getTimestamp()}] [WARN] [${rTracer.id() || ''}] [${namespace}] ${message}`);
  }
  fs.write(`[${getTimestamp()}] [WARN] [${rTracer.id() || ''}] [${namespace}] ${message} ${object ? JSON.stringify(object) : ''}\n`);
};

const error = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.error('\x1b[31m%s\x1b[0m', `[${getTimestamp()}] [ERROR] [${rTracer.id() || ''}] [${namespace}] ${message}`, object);
  } else {
    console.error('\x1b[31m%s\x1b[0m', `[${getTimestamp()}] [ERROR] [${rTracer.id() || ''}] [${namespace}] ${message}`);
  }
  fs.write(`[${getTimestamp()}] [ERROR] [${rTracer.id() || ''}] [${namespace}] ${message} ${object ? JSON.stringify(object) : ''}\n`);
};

const debug = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.debug('\x1b[32m%s\x1b[0m', `[${getTimestamp()}] [DEBUG] [${rTracer.id() || ''}] [${namespace}] ${message}`, object);
  } else {
    console.debug('\x1b[32m%s\x1b[0m', `[${getTimestamp()}] [DEBUG] [${rTracer.id() || ''}] [${namespace}] ${message}`);
  }
  fs.write(`[${getTimestamp()}] [DEBUG] [${rTracer.id() || ''}] [${namespace}] ${message} ${object ? JSON.stringify(object) : ''}\n`);
};

export const logging = {
  info,
  warn,
  error,
  debug,
  rTracer
};
