import mitt from 'mitt';

export type Events = {
  'space:refresh'?: any;
  'note:refresh'?: any;
};

const emitter = mitt<Events>();

export default emitter;
