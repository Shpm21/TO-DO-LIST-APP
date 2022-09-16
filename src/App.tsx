import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'
import Menu from './components/Menu'
import AsignaturePage from './pages/AsignaturePage'
import AddItemPage from './pages/AddItemPage'
import AddAsignaturePage from './pages/AddAsignaturePage'
import TaskPage from './pages/TaskPage'
import Home from './pages/Home'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import './theme/iontab.css'
import AsignaturesPage from './pages/AsignaturesPage'
import ActionsPage from './pages/ActionsPage'

setupIonicReact()

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/home" component={Home} exact={true} />
            <Route path="/actions" component={ActionsPage} exact={true} />
            <Route path="/asignatures" component={AsignaturesPage} />
            <Route path="/page/:name" exact={true} component={AsignaturePage} />
            <Route path="/task/:id" exact={true} component={TaskPage} />
            <Route
              path="/"
              render={() => <Redirect to="/home" />}
              exact={true}
            />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="actions" href="/actions">
              <IonIcon name="add-circle" size="large"></IonIcon>
            </IonTabButton>
            <IonTabButton tab="/home" href="/home">
              <IonIcon name="reader" size="large"></IonIcon>
            </IonTabButton>
            <IonTabButton tab="asignatures" href="/asignatures">
              <IonIcon name="library" size="large"></IonIcon>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
