import BigNumber from 'bignumber.js';

class Utils {
  formatToCommas(string) {
    let number = parseFloat(string);
    let formatted = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 8
    }).format(number);
    return formatted;
  }
  isInArray(value, array) {
    return array.indexOf(value) > -1;
  }
  // first url
  extractUrls(text) {
    let regex = /\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]/gi;

    let match = text.match(regex);
    if (match !== null) {
      return match[0];
    }
  }
  calculateTotalScore = post => {
    const initial = new BigNumber(post.int_amount);
    const arr = [];

    for (const each of post.additional_tippers) {
      const amount = new BigNumber(each.int_amount);
      arr.push(amount);
    }
    arr.push(initial);
    let sum = BigNumber.sum.apply(null, arr);
    let precision = new BigNumber(`${sum}e-8`).toPrecision();
    return this.formatToCommas(precision);
  };

  removeUrlsFromText(text) {
    let firstUrl = this.extractUrls(text);
    text = text.replace(firstUrl, '');
    return text;
  }
}
let contain = new Utils();
export default contain;
