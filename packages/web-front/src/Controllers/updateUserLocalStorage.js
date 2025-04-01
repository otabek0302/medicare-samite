﻿import { ADD } from './ApiControllers';
import user from './user';
export const updateUserLocalStorage = async (phoneNumber) => {
  try {
    const data = { phone: phoneNumber };
    const res = await ADD(user.token, 're_login_phone', data);

    if (res.status === true) {
      const user = { ...res.data, token: user.token };
      console.log(user);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      console.error(
        'Failed to update user data:',
        res.message || 'Unknown error'
      );
    }
  } catch (error) {
    console.error('Error updating user data:', error.message);
  }
};
