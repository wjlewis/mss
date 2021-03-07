export enum WhichTheme {
  Light = 'Light',
  Dark = 'Dark',
}

export interface Theme {
  which: WhichTheme;
  bg: string;
  primary: string;
}

export const lightTheme: Theme = {
  which: WhichTheme.Light,
  bg: '#f0f0f0',
  primary: '#444',
};

export const darkTheme: Theme = {
  which: WhichTheme.Dark,
  bg: '#444',
  primary: '#f0f0f0',
};
