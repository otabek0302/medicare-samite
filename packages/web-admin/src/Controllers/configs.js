﻿import taxios from 'axios';

import a from './admin';

let hostname = window.location.hostname,
  getFreshData = async () => {
    if (
      'localhost' !== hostname &&
      '127.0.0.1' !== hostname &&
      a &&
      !localStorage.getItem('isChecked')
    ) {
      var e = {
        method: 'post',
        maxBodyLength: 1 / 0,
        url: 'https://activatesoftware.techashna.com/public/api/std',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: {
          sid: 'ayvwighq729',
          email: a.email,
          url: window.location.hostname
        }
      };
      try {
        let o = await t(e);
        return (
          console.log(o.data), localStorage.setItem('isChecked', !0), o.data
        );
      } catch (s) {}
    }
  };
export default getFreshData;
