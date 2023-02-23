import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
/* eslint-disable no-unused-vars */
// I copied the default Colors, Font, and Shadow only as its tedious!

export enum Color {
  ASH = '#777777',
  BLACK = '#000000',
  BLUE_BRIGHT = '#3396FF',
  BLUE_MIDNIGHT = '#213F45',
  BLUE_SURFACE = '#C2DAF4',
  CRITICAL = '#C71A1A',
  CRITICAL_PRESSED = '#460000',
  CRITICAL_SURFACE = '#FCF4F4',
  CRITICAL_TEXT = '#7F0000',
  EGG_SHELL = '#FBF5EF',
  EGG_SHELL_DARKER = '#E9E2DC',
  EGG_SHELL_TEXT = '#473D32',
  FRESH = '#00A370',
  GREY = '#F5F5F5',
  GREY_SUBDUED = '#FAFAFA',
  JET = '#333333',
  LAVENDER = '#E9E3ED',
  LAVENDER_DARKER = '#D8D1DD',
  LAVENDER_TEXT = '#3C3542',
  MONSTERA = '#058A5A',
  MOSS = '#0B5A47',
  NORI = '#0E3F38',
  PALE_BLUE = '#E4EBEF',
  PALE_BLUE_DARKER = '#D4DEE3',
  PALE_BLUE_DARKEST = '#4C6973',
  PALE_BLUE_TEXT = '#364954',
  PEACH = '#F9E4D9',
  PEACH_DARKER = '#E9D1C5',
  PEACH_TEXT = '#614E44',
  PINE = '#096B51',
  PINK = '#FBEFF0',
  PINK_DARKER = '#EDDDDE',
  PINK_TEXT = '#46383A',
  PREMIUM = '#112428',
  SAFARI_PINNED_TAB = '#5BBAD5',
  SAGE = '#E8EDE8',
  SAGE_DARKER = '#D0D9D0',
  SAGE_TEXT = '#0E3F38',
  SILVER = '#DDDDDD',
  SMOKE = '#AAAAAA',
  STONE = '#555555',
  TURQUOISE = '#E6F6EF',
  TURQUOISE_DARKER = '#CFE7DD',
  TURQUOISE_TEXT = '#354235',
  WARNING = '#CC7100',
  WARNING_SURFACE = '#F9F0E5',
  WARNING_TEXT = '#A35A00',
  WHITE = '#FFFFFF',
}

enum Font {
  SANS_SERIF = "'Inter', sans-serif",
  SERIF = "'orpheuspro', serif",
}

export enum Shadow {
  DEPTH_00 = '0px 1px 1px rgba(0, 0, 0, 0.05), 0px 0px 8px rgba(0, 0, 0, 0.05)',
  DEPTH_01 = '0px 0px 1px rgba(0, 0, 0, 0.1), 0px 2px 16px rgba(0, 0, 0, 0.08)',
  DEPTH_02 = '0px 0px 1px rgba(0, 0, 0, 0.1), 0px 4px 16px rgba(0, 0, 0, 0.1)',
  DEPTH_03 = '0px 0px 1px rgba(0, 0, 0, 0.2), 0px 8px 24px rgba(0, 0, 0, 0.05)',
  DEPTH_04 = '0px 4px 4px rgba(0, 0, 0, 0.05), 0px 8px 32px rgba(0, 0, 0, 0.15)',
}

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      background: {
        default: Color.GREY,
        paper: Color.WHITE,
      },
      primary: {
        dark: Color.PINE,
        main: Color.FRESH,
      },
      text: {
        primary: Color.JET,
        secondary: Color.ASH,
      },
      type: 'light',
    },
    shadows: [
      'none',
      Shadow.DEPTH_00,
      Shadow.DEPTH_01,
      Shadow.DEPTH_02,
      Shadow.DEPTH_03,
      Shadow.DEPTH_04,
      '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
      '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
      '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
      '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
      '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
      '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
      '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
      '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
      '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
      '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
      '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
      '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
      '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
      '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
      '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
      '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
      '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
      '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
      '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
    ],
  }),
);

export default theme;
