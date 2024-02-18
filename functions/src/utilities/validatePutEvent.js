const TIMEZONES = require("./timezones.js");

function isValidString(str) {
  return str && str.trim().length > 0;
}

function isValidDate(date) {
  today = new Date(new Date().toISOString().substring(0, 10));
  return date && !isNaN(new Date(date).getTime()) && new Date(date) >= today;
}

function isValidStartTime(date, startTime, endTime) {
  today = new Date(new Date().toISOString().substring(0, 10));
  const startTimeRef = new Date(startTime);
  const endTimeRef = new Date(endTime);

  return (
    !isNaN(startTimeRef.getTime()) &&
    !isNaN(startTimeRef.getTime()) &&
    today < startTimeRef < endTimeRef
  );
}

function validatePutEvent(body) {
  const {
    title,
    description,
    date,
    startTime,
    endTime,
    eventImage,
    locationType,
    timezone,
    venueAddress,
    requiresApproval,
  } = body;

  if (title && !isValidString(title))
    throw {
      code: 400,
      error: new Error(
        "You provided an invalid event title please try again. E.g 'Cloud Summit'!"
      ),
    };

  if (description && !isValidString(description))
    throw {
      code: 400,
      error: new Error(
        "The event description you provided is invalid, the event description should not be empty."
      ),
    };

  if (date && !isValidDate(date))
    throw {
      code: 400,
      error: new Error(
        "Event's Date must be in the future, please enter a valid date in the format 'YYYY-MM-DD' >= to today's."
      ),
    };

  if (
    date &&
    startTime &&
    endTime &&
    !isValidStartTime(date, startTime, endTime)
  )
    throw {
      code: 400,
      error: new Error(
        "Event's startTime and endTime must be in milliSeconds in integer format for Unix Time. The condition 'date < startTime < endTime' must evaluate to True. Date will be automatically converted to milliseconds in the backend."
      ),
    };

  if (eventImage && !isValidString(eventImage))
    throw {
      code: 400,
      error: new Error(
        "The eventImage must be a valid url, it shouln't be empty"
      ),
    };

  if (locationType && !["ONLINE", "IN-PERSON"].includes(locationType))
    throw {
      code: 400,
      error: new Error(
        "Event's location type is a required field. Provide either 'ONLINE', 'IN-PERSON' to specify the Event's location type."
      ),
    };

  if (timezone && isValidString(timezone) && !(timezone in TIMEZONES))
    throw {
      code: 400,
      error: new Error(
        "Time Zone Abbreviation code must be one of the specified in the ISO 8601. E.G 'EST', 'PST'. Please refer to a full list in the following link: https://en.wikipedia.org/wiki/List_of_time_zone_abbreviations"
      ),
    };

  if (!isValidString(venueAddress))
    throw {
      code: 400,
      error: new Error(
        "In-Person Events require a valid physical address. Please provide one and try again."
      ),
    };

  if (
    requiresApproval &&
    (requiresApproval === null || requiresApproval === undefined)
  )
    throw {
      code: 400,
      error: new Error(
        "Please provide the boolean requiresApproval in your request body to create new Event."
      ),
    };
}

module.exports = validatePutEvent;
