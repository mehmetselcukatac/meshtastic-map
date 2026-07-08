function normalizeLocationValue(value) {
    if (value == null || value === '') {
        return null;
    }

    const normalized = Number(value);
    return Number.isFinite(normalized) ? normalized : null;
}

function extractNodeLocationFromTelemetry(telemetry) {
    if (!telemetry || typeof telemetry !== 'object') {
        return null;
    }

    const candidates = [
        telemetry,
        telemetry.position,
        telemetry.location,
        telemetry.airQualityMetrics,
        telemetry.airQualityMetrics?.position,
        telemetry.airQualityMetrics?.location,
        telemetry.deviceMetrics,
        telemetry.deviceMetrics?.position,
        telemetry.deviceMetrics?.location,
        telemetry.environmentMetrics,
        telemetry.environmentMetrics?.position,
        telemetry.environmentMetrics?.location,
        telemetry.powerMetrics,
        telemetry.powerMetrics?.position,
        telemetry.powerMetrics?.location,
    ];

    for (const candidate of candidates) {
        if (!candidate || typeof candidate !== 'object') {
            continue;
        }

        const latitude = normalizeLocationValue(
            candidate.latitudeI ?? candidate.latitude_i ?? candidate.latitude ?? candidate.lat
        );
        const longitude = normalizeLocationValue(
            candidate.longitudeI ?? candidate.longitude_i ?? candidate.longitude ?? candidate.lon
        );
        const altitude = normalizeLocationValue(candidate.altitude);

        if (latitude != null && longitude != null) {
            return {
                latitude,
                longitude,
                altitude,
            };
        }
    }

    return null;
}

module.exports = {
    extractNodeLocationFromTelemetry,
};
