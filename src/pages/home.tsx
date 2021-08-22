import styles from '../App.module.css';
import {Map, MarkerDefinition} from '../components/Map';
import {FloatingButton} from '../components/FloatingButton';
import MissingEnvVarError from '../shared/MissingEnvVarError';
import {createEffect, createMemo, createSignal} from 'solid-js';
import {Tag} from '../api/Tag';
import {getFerdigClient} from '../api';
import {Collections} from '../api/Collections';
import {Link} from '@rturnq/solid-router';

export function Home() {
    const mapBoxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;
    const applicationId = import.meta.env.VITE_FERDIG_APPLICATION_ID as string;

    if (!mapBoxAccessToken) {
        throw new MissingEnvVarError('VITE_MAPBOX_ACCESS_TOKEN');
    }

    if (!applicationId) {
        throw new MissingEnvVarError('VITE_FERDIG_APPLICATION_ID');
    }

    const [tags, setTags] = createSignal<Tag[]>([]);

    createEffect(async () => {
        const client = await getFerdigClient();
        const tagsObservation = await client
            .applications
            .collections(applicationId)
            .documents<Tag>(Collections.Tags)
            .listAndObserve({
                pagination: {
                    skip: 0,
                    take: 50,
                },
                filter: null,
            });

        tagsObservation.subscribe((listResult) => {
            setTags(listResult.items);
        });
    });

    const markers = createMemo(() => {
        return tags().map((tag) => {
            return {
                lat: tag.lat,
                lng: tag.lng,
            } as MarkerDefinition;
        });
    });

    return (
        <div class={styles.App}>
            <Map mapBoxAccessToken={mapBoxAccessToken}
                 withGeoLocateControl={true}
                 withNavigationControl={true}
                 logoPosition="top-left"
                 markers={markers}
            />

            <div class="flex absolute bottom-0 left-0 right-0 m-4">
                <div class="flex-1 text-left">
                    <FloatingButton iconBefore={{name: 'menu'}}
                                    background="black"
                                    color="gray-200"
                                    ring="gray-600"
                    />
                </div>
                <div class="flex-1 text-center">
                    <FloatingButton iconBefore={{name: 'camera-plus', flipHorizontal: true}}
                                    to="/tags/new"
                    />
                </div>
                <div class="flex-1 text-right invisible">
                    <FloatingButton iconBefore={{name: 'camera-plus', flipHorizontal: true}}/>
                </div>
            </div>
        </div>
    )
}
