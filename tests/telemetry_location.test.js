const { extractNodeLocationFromTelemetry } = require('../src/utils/telemetry_location');

describe('extractNodeLocationFromTelemetry', () => {
  test('returns latitude, longitude and altitude from position payload fields', () => {
    const telemetry = {
      position: {
        latitudeI: 123456789,
        longitudeI: 987654321,
        altitude: 42,
      },
    };

    expect(extractNodeLocationFromTelemetry(telemetry)).toEqual({
      latitude: 123456789,
      longitude: 987654321,
      altitude: 42,
    });
  });

  test('supports direct latitude/longitude fields on the telemetry object', () => {
    const telemetry = {
      latitude: 111111111,
      longitude: 222222222,
      altitude: 7,
    };

    expect(extractNodeLocationFromTelemetry(telemetry)).toEqual({
      latitude: 111111111,
      longitude: 222222222,
      altitude: 7,
    });
  });

  test('returns null when no location data is available', () => {
    expect(extractNodeLocationFromTelemetry({})).toBeNull();
  });
});
