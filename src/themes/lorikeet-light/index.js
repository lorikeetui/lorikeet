import colors from './colors'
import alpha from 'color-alpha'

const twoDecimals = v => Math.round(v * 100) / 100

export default {
  // The general styles used by the other theme groups, or directly by the
  // components. Themes can generally only extend this group to reach a decent
  // level of customization.
  general: {
    colorBorder: colors.grey[300],
    colorAccent: colors.primary[500],
    colorFocus: colors.primary[500],

    surfaceBackground: '#F8FCFD',
    surfacePanel: '#FFFFFF',
    surfacePanelOutline: '#D1D1D1',
    surfaceFloating: alpha('#445159', 0.9),

    dropShadow: (elevation, opacity = 1) => {
      if (elevation > 0) {
        return `
          drop-shadow(
            0
            ${twoDecimals(elevation * 0.6)}px
            ${twoDecimals(Math.max(1, elevation * 0.55))}px
            rgba(0, 0, 0, ${twoDecimals(0.2 * opacity)})
          )
        `
      }
      const color = `rgba(0, 0, 0, ${twoDecimals(0.05 * opacity)})`
      return `
        drop-shadow(  0     -0.5px 0 ${color} )
        drop-shadow( -0.5px  0     0 ${color} )
        drop-shadow(  0.5px  0     0 ${color} )
        drop-shadow(  0      0.5px 0 ${color} )
      `
    },

    boxShadow: (elevation, opacity = 1) => {
      return `
        0
        ${twoDecimals(elevation * 0.6)}px
        ${twoDecimals(Math.max(1, elevation * 1.1))}px
        rgba(0, 0, 0, ${twoDecimals(0.2 * opacity)})
      `
    },

    radiusSmall: '3px',

    fontSmallSize: '14px',
    fontSmallLineHeight: '1.5',
    fontMediumSize: '16px',
    fontMediumLineHeight: '1.5',
    fontLargeSize: '20px',
    fontLargeLineHeight: '1.5',

    fontWeightNormal: '400',
    fontWeightBold: '600',
    fontWeightBolder: '800',
  },

  // Used by <Button />
  button: ({ general }) => ({
    radius: general.radiusSmall,
    fontSize: general.fontMediumSize,
    lineHeight: general.fontMediumLineHeight,

    // button mode: normal
    modeNormalColor: 'white',
    modeNormalBackground: colors.secondary[300],
    modeNormalDisabledColor: 'white',
    modeNormalDisabledBackground: colors.grey[300],

    // style interpolations when pressed
    interpolatedStyles: ({ pressProgress }) => ({
      boxShadow: pressProgress.interpolate(
        v => `0 1px 1px rgba(0, 0, 0, ${0.5 * (1 - v)})`
      ),
      top: pressProgress.interpolate(v => `${v}px`),
    }),

    // button mode: strong
    modeStrongColor: 'white',
    modeStrongBackground: colors.primary[300],
    modeStrongDisabledColor: 'white',
    modeStrongDisabledBackground: colors.grey[300],
  }),

  // Used by <TabBar />
  tabBar: ({ general }) => ({
    borderColorNormal: general.colorBorder,
    borderColorActive: general.colorAccent,
  }),

  // Used by <Slider />
  slider: ({ general }) => ({
    // handle
    handleStyles: ({ pressProgress }) => ({
      transform: pressProgress.interpolate(
        t => `translate3d(0, calc(${t}px - 50%), 0)`
      ),
      filter: pressProgress.interpolate(t => general.dropShadow(2 * (1 - t))),
      background: general.surfacePanel,
    }),

    // bar
    baseBarStyles: ({ pressProgress }) => ({
      background: colors.grey[300],
    }),
    activeBarStyles: ({ pressProgress }) => ({
      background: pressProgress.interpolate(t => colors.secondary[200]),
    }),
  }),
}
