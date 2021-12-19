import mitt from 'mitt';

export type Events = {
  'space:refresh'?: any;
};

const emitter = mitt<Events>();

export default emitter;
