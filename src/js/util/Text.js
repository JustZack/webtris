export default class Text {
    static padWithLeadingZeros(number, length) {
        let numStr = number.toString();
        let zerosToAdd = length - numStr.length;
        for (zerosToAdd; zerosToAdd > 0;zerosToAdd--) numStr = `0${numStr}`;
        return numStr;
    }
}