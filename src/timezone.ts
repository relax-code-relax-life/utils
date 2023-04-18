const dateTimeFormatCache = {} as { [timezone: string]: Intl.DateTimeFormat }
const getDateTimeFormat = (timezone) => {
    let dtf = dateTimeFormatCache[timezone]
    if (!dtf) {
        dtf = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        })
        dateTimeFormatCache[timezone] = dtf
    }
    return dtf
}

let localTimezone;
const getLocalTimezone = () => {
    if (localTimezone) return localTimezone;
    localTimezone = getDateTimeFormat('').resolvedOptions().timeZone;
    return localTimezone
}

const tzOffset = (aboutDate: Date, timezone: string) => {
    const formatResult = getDateTimeFormat(timezone).formatToParts(aboutDate)
    const filled = []
    for (let i = 0; i < formatResult.length; i += 1) {
        const {type, value} = formatResult[i]
        const pos = typeToPos[type]

        if (pos >= 0) {
            filled[pos] = parseInt(value, 10)
        }
    }
    const hour = filled[3]
    // Workaround for the same behavior in different node version
    // https://github.com/nodejs/node/issues/33027
    /* istanbul ignore next */
    const fixedHour = hour === 24 ? 0 : hour
    const utcString = `${filled[0]}-${filled[1]}-${filled[2]} ${fixedHour}:${filled[4]}:${filled[5]}:000`
    const utcTs = d.utc(utcString).valueOf()
    let asTS = +timestamp
    const over = asTS % 1000
    asTS -= over
    return (utcTs - asTS) / (60 * 1000)
}
