  import { Metrics, Colors, Fonts } from '../../shared/themes'

export default {
  text: {
    ...Fonts.style.h5,
    fontWeight: '600',
    color: Colors.snow,
    marginVertical: Metrics.baseMargin,
    marginLeft: 20,

  },
  button: {
    borderColor: Colors.greyDark,
    backgroundColor: Colors.greyDark,
    borderRadius: 2,
    marginTop: 5,
    marginBottom: 5,
  },
}
