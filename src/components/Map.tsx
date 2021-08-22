import {GeolocateControl, Map as MapBoxMap, MapboxOptions, Marker, NavigationControl} from 'mapbox-gl';
import {Accessor, createEffect, createSignal, onCleanup} from 'solid-js';

import Classes from './Map.module.css';

const BASE_STYLE = 'mapbox://styles/jappyjan/ckq5ecq9e1dep17pr190532wq';

export interface MarkerDefinition {
    lng: number;
    lat: number;
}

interface Props {
    mapBoxAccessToken: string;
    mapProps?: MapboxOptions;
    withGeoLocateControl?: boolean;
    withNavigationControl?: boolean;
    class?: string;
    logoPosition?: MapboxOptions['logoPosition'];
    markers?: Accessor<MarkerDefinition[]>;
}

export function Map(props: Props) {
    const {
        mapBoxAccessToken,
        mapProps,
        withGeoLocateControl,
        withNavigationControl,
        class: MapClass,
        logoPosition,
        markers: markerDefinitions,
    } = props;

    let container: HTMLDivElement;

    const [mapLoaded, setMapLoaded] = createSignal(false);
    const [mapInstance, setMapInstance] = createSignal<MapBoxMap | null>(null);

    createEffect(() => {
        const map = new MapBoxMap({
            accessToken: mapBoxAccessToken,
            style: BASE_STYLE,
            ...mapProps,
            container,
            logoPosition,
        });

        if (withGeoLocateControl) {
            const geoLocateControl = new GeolocateControl({
                showUserLocation: true,
                trackUserLocation: true,
                showUserHeading: true,
                showAccuracyCircle: true,
                positionOptions: {
                    enableHighAccuracy: true,
                },
                fitBoundsOptions: {
                    animate: true,
                },
            });
            map.addControl(geoLocateControl);

            setTimeout(() => {
                geoLocateControl.trigger();
            }, 200);
        }

        if (withNavigationControl) {
            const navigationControl = new NavigationControl({
                showCompass: true,
                showZoom: true,
                visualizePitch: true,
            });
            map.addControl(navigationControl);
        }

        setMapInstance(map);

        onCleanup(() => {
            map.remove();
        });

        map.on('load', () => {
            setMapLoaded(true);
        });

    });

    createEffect(() => {
        const map = mapInstance();

        if (!mapLoaded() || !map) {
            return;
        }

        const markers: Marker[] = [];
        markerDefinitions().forEach((definition) => {
            const marker = new Marker()
                .setLngLat({lng: definition.lng, lat: definition.lat})
                .addTo(map);

            markers.push(marker);
        });

        onCleanup(() => markers.forEach((marker) => marker.remove()));
    });

    return <div class={Classes.MapContainer + ' ' + MapClass} ref={container}/>
}
