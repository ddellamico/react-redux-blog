import { userSelectors } from '.';
import { userApi } from './user.api';
import { usersAdapter } from './user.slice';
import { UserType } from './user.type';
import { setupStore } from '@/shared/store/test';

describe('User Selector:', () => {
  let store;

  beforeEach(() => {
    store = setupStore();
  });

  it('Should return full name', async () => {
    const newData: UserType = {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'Julianne.OConner@kory.org',
      phone: '1-463-123-4447',
      website: 'ramiro.info',
    };

    // Normalize the data using usersAdapter before dispatching it
    const normalizedData = usersAdapter.setAll(usersAdapter.getInitialState(), [
      newData,
    ]);

    // Dispatch to store to add the normalized user data
    await store.dispatch(
      userApi.util.upsertQueryData('getUserList', undefined, normalizedData),
    );

    // Get the final state after dispatch
    const finalState = store.getState();

    // Select the user by ID and assert the name is correct
    const selectedUser = userSelectors.selectUserById(finalState, 4); // Pass state and user ID
    expect(selectedUser?.name).toEqual(newData.name);
  });

  it('Should return empty in case of no name', () => {
    const finalState = store.getState();

    // Try selecting a user that doesn't exist in the state
    const selectedUser = userSelectors.selectUserById(finalState, 999); // Using a non-existent ID
    expect(selectedUser).toBeUndefined();
  });
});
