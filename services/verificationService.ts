
export interface Coordinate {
    lat: number;
    lng: number;
}

export interface VerificationResult {
    jurisdiction: 'Provinsi' | 'Nasional' | 'Lainnya';
    roadName?: string;
    distance: number; // in meters
}

/**
 * Calculates the distance between two points in meters using the Haversine formula.
 */
function getDistance(p1: Coordinate, p2: Coordinate): number {
    const R = 6371000; // Earth's radius in meters
    const dLat = (p2.lat - p1.lat) * Math.PI / 180;
    const dLng = (p2.lng - p1.lng) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * Calculates the minimum distance from a point to a line segment.
 */
function distToSegment(p: Coordinate, v: Coordinate, w: Coordinate): number {
    const l2 = Math.pow(getDistance(v, w), 2);
    if (l2 === 0) return getDistance(p, v);

    // This is a simplified version of point-to-segment distance.
    // For better accuracy on a sphere, we'd use cross-track distance, 
    // but for small distances (road buffers), planar approximation is usually fine.
    // However, since we already have getDistance, we can use a basic heuristic.

    const d1 = getDistance(p, v);
    const d2 = getDistance(p, w);
    const d3 = getDistance(v, w);

    // Heron's formula for area
    const s = (d1 + d2 + d3) / 2;
    const area = Math.sqrt(s * (s - d1) * (s - d2) * (s - d3));

    // Height of triangle (distance to line)
    const h = (2 * area) / d3;

    // Check if the projection falls onto the segment
    const isObtuseV = Math.pow(d2, 2) > Math.pow(d1, 2) + Math.pow(d3, 2);
    const isObtuseW = Math.pow(d1, 2) > Math.pow(d2, 2) + Math.pow(d3, 2);

    if (isObtuseV) return d1;
    if (isObtuseW) return d2;
    return h;
}

async function findNearestRoad(point: Coordinate, geojsonUrl: string): Promise<{ roadName?: string, distance: number }> {
    try {
        const response = await fetch(geojsonUrl);
        if (!response.ok) throw new Error(`Failed to fetch ${geojsonUrl}`);
        const data = await response.json();

        let minDistance = Infinity;
        let nearestRoad = '';

        for (const feature of data.features) {
            if (feature.geometry.type === 'LineString') {
                const coords = feature.geometry.coordinates;
                for (let i = 0; i < coords.length - 1; i++) {
                    const v = { lng: coords[i][0], lat: coords[i][1] };
                    const w = { lng: coords[i + 1][0], lat: coords[i + 1][1] };
                    const d = distToSegment(point, v, w);
                    if (d < minDistance) {
                        minDistance = d;
                        nearestRoad = feature.properties?.Nm_Ruas || feature.properties?.Nama_Jalan || 'Tanpa Nama';
                    }
                }
            } else if (feature.geometry.type === 'MultiLineString') {
                for (const line of feature.geometry.coordinates) {
                    for (let i = 0; i < line.length - 1; i++) {
                        const v = { lng: line[i][0], lat: line[i][1] };
                        const w = { lng: line[i + 1][0], lat: line[i + 1][1] };
                        const d = distToSegment(point, v, w);
                        if (d < minDistance) {
                            minDistance = d;
                            nearestRoad = feature.properties?.Nm_Ruas || feature.properties?.Nama_Jalan || 'Tanpa Nama';
                        }
                    }
                }
            }
        }

        return { roadName: nearestRoad, distance: minDistance };
    } catch (error) {
        console.error(`Error processing ${geojsonUrl}:`, error);
        return { distance: Infinity };
    }
}

export async function checkJurisdiction(lat: number, lng: number): Promise<VerificationResult> {
    const point = { lat, lng };

    // Check Provincial Roads first
    const prov = await findNearestRoad(point, '/data/jlnprov.json');

    // Check National Roads
    const nas = await findNearestRoad(point, '/data/jalan nasional.json');

    const threshold = 100; // 100 meters buffer

    if (prov.distance < threshold && prov.distance <= nas.distance) {
        return { jurisdiction: 'Provinsi', roadName: prov.roadName, distance: prov.distance };
    } else if (nas.distance < threshold) {
        return { jurisdiction: 'Nasional', roadName: nas.roadName, distance: nas.distance };
    } else {
        return { jurisdiction: 'Lainnya', distance: Math.min(prov.distance, nas.distance) };
    }
}
