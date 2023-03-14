import { ThemeConfig } from 'antd/lib/config-provider/context'

export default {
  token: {
    colorPrimary: '#2a63f6',
    // colorTextBase: '#ffffff',
    colorErrorOutline: '#ff4d4f',
    borderRadius: 2,
    sizePopupArrow: 12,
    controlOutlineWidth: 0,
  },
  components: {
    Modal: {
      modalBodyPadding: 0,
    },
    Layout: {
      colorBgHeader: '#06152e',
    },
  },
} as ThemeConfig
