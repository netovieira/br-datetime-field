/**
 * https://flatpickr.js.org/formatting/
 *
 * NOTE: The key order is important! It has to go from longest to shortest!
 */
const flatpickrFormatMapping = {
    d: 'DD',
    D: 'ddd',
    l: 'dddd',
    j: 'D',
    J: 'Do',
    w: 'e',
    F: 'MMMM',
    m: 'MM',
    n: 'M',
    M: 'MMM',
    U: 'X',
    y: 'YY',
    Y: 'YYYY',
    Z: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
    H: 'HH',
    h: 'h',
    i: 'mm',
    S: 'ss',
    s: 's',
    K: 'A'
}

/**
 * https://momentjs.com/docs/#/displaying/format/
 *
 * NOTE: The key order is important! It has to go from longest to shortest!
 */
const momentFormatMapping = {
    dddd: 'l',
    ddd:  'D',
    DD:   'd',
    Do:   'J',
    D:    'j',
    e:    'w',
    MMMM: 'F',
    MMM:  'M',
    MM:   'm',
    M:    'n',
    X:    'U',
    YYYY: 'Y',
    YY:   'y',
    HH:   'H',
    H:    'H',
    h:    'h',
    mm:   'i',
    m:    'i',
    ss:   'S',
    s:    's',
    A:    'K'
}

/**
 * Add more delimiters if needed
 */
const delimiters = ['.', '-', '/', ':', ' ', '年', '日']

export default class DateTimeFormatConverter {
    /**
     * Convert format
     *
     * @param mapping
     * @param string
     * @returns {string}
     */
    static convertFormat(mapping, string) {
        string = string.replace(/[^ -~]+/g, '').replace(/\s+/g, ' ').trim()

        let format = ''

        while (string.length > 0) {
            let advance = false

            for (let f in mapping) {
                if (mapping.hasOwnProperty(f)) {
                    if (delimiters.indexOf(string.slice(0, 1)) > -1) {
                        // add the delimiter which is usually the next character
                        format += string.slice(0, 1)
                        // trim it away from the string
                        string = string.slice(1)

                        advance = true
                    }

                    if (string.startsWith(f)) {
                        // translate the format
                        format += mapping[f]
                        // remove the just parsed format
                        string = string.slice(f.length)

                        advance = true
                    }
                }
            }

            if (!advance) {
                break;
            }
        }

        return format.trim()
    }

    /**
     * Converts a Moment.js datetime format to a Flatpickr format
     *
     * @param string
     * @returns {string}
     */
    static momentToFlatpickr(string) {
        if (string) {
            return this.convertFormat(momentFormatMapping, string)
        } else {
            throw "Empty input string provided!"
        }
    }

    /**
     * Converts a Flatpickr datetime format to a Moment.js format
     *
     * @param string
     * @returns {string}
     */
    static flatpickrToMoment(string) {
        if (string) {
            return this.convertFormat(flatpickrFormatMapping, string)
        } else {
            throw "Empty input string provided!"
        }
    }
}