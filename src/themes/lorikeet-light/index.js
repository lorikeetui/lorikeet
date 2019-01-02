import colors from './colors'

export default {
  // The general styles used by the other theme groups, or directly by the
  // components. Themes can generally only extend this group to reach a decent
  // level of customization.
  general: {
    // temporary color names, until we have design principles
    colorBorder: colors.grey[300],
    colorAccent: colors.primary[500],
    colorFocus: colors.primary[500],

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
}
