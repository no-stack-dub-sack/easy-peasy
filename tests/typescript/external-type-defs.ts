import { action, Action, computed, Computed, thunk, Thunk } from 'easy-peasy';

type MyModelAction<TPayload = void> = Action<MyModel, TPayload>;
type MyModelComputed<TResult> = Computed<MyModel, TResult>;
type MyModelThunk<TPayload = undefined, TResult = any> = Thunk<
  MyModel,
  TPayload,
  any,
  {},
  Promise<TResult>
>;

type MyState = {
  value: string;
};

type MyThunkPayload = { data: string };

interface MyModel {
  myState: MyState;

  myComputed: MyModelComputed<number>;

  setMyState: MyModelAction<string>;

  myThunk: MyModelThunk<MyThunkPayload, boolean>;
}

const myModel: MyModel = {
  myState: {
    value: 'initial',
  },

  setMyState: action((state, payload) => {
    state.myState = {
      value: payload,
    };
  }),

  myComputed: computed((state) => state.myState.value.length),

  myThunk: thunk(async (actions, payload) => {
    actions.setMyState('a');
    // some kind of await
    return true;
  }),
};
