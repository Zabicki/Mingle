import { Metrics, Colors, Fonts } from '../../shared/themes'

export default {
  text: {
    ...Fonts.style.h5,
    fontWeight: '650',
    color: Colors.greyDark,
    marginVertical: Metrics.baseMargin,
    marginLeft: 20,

  },
  button: {
    borderColor: Colors.greyDark,
    backgroundColor: Colors.grey,
    borderRadius: 2,
    marginTop: 5,
    marginBottom: 5,
  },
}
