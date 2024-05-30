'use client';

import { CredentialOptions } from './types';

class _Storage {
  get(key: string): string | null {
    const matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' +
          key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
          '=([^;]*)'
      )
    );
    return matches ? decodeURIComponent(matches[1]) : null;
  }
  getAll() {
    const cookies = document.cookie
      .split('; ')
      .map((cookString) => cookString.split('='));
    let data = {};

    cookies.forEach((cookie) => {
      data = { ...data, ...{ [cookie[0]]: cookie[1] } };
    });

    return data;
  }

  set(key: string, value: string, options: CredentialOptions = {}): void {
    let expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 7);

    options.expires = expiresDate;

    if (options && options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
    let updatedCookie = `${encodeURIComponent(key)}=${encodeURIComponent(
      value
    )}; path=/;`;

    for (let [optionKey, optionValue] of Object.entries(options)) {
      if (optionKey === 'maxAge') {
        optionKey = 'max-age';
      }

      updatedCookie += '; ' + optionKey;

      if (optionValue !== true) {
        updatedCookie += '=' + optionValue;
      }
    }

    document.cookie = updatedCookie;
  }

  delete(key: string): void {
    this.set(key, '', {
      maxAge: -1,
    });
  }

  invalidate(): void {
    const cookies = this.getAll();
    Object.keys(cookies).forEach((name) => this.delete(name));
  }
}

export const CredentialStorage = new _Storage();
