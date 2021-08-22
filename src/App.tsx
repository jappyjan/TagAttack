import {Component, Switch} from 'solid-js';
import {MatchRoute, pathIntegration, Router} from '@rturnq/solid-router';
import {Home} from './pages/home';
import {CreateTag} from './pages/create-tag';
import {TagDetails} from './pages/tag-details';

const App: Component = () => {
    return (
        <Router integration={pathIntegration()}>
            <main>
                {/* TODO: replace with proper 404 page/component */}
                <Switch fallback={<h1>404</h1>}>
                    <MatchRoute end>
                        <Home/>
                    </MatchRoute>
                    <MatchRoute path="/tags/new">
                        <CreateTag/>
                    </MatchRoute>
                    <MatchRoute path="/tags/:id">
                        {(route) => <TagDetails id={route.params.id}/>}
                    </MatchRoute>
                </Switch>
            </main>
        </Router>
    );
};

export default App;
