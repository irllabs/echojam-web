import { useAppSelector } from './app/hooks';

import { ActiveExperiment, selectActiveExperiment } from './features/experiment-state/experiment-state-slice';

import AppList from './components/app-list/app-list';
import FirstExperiment from './components/first-experiment/first-experiment';
import SecondExperiment from './components/second-experiment/second-experiment';
import SignInDialog from './components/sign-in/sign-in-dialog';
import UserProfile from './components/user-profile/user-profile';

import './app.scss';

function App() {
  const activeExperiment = useAppSelector(selectActiveExperiment);

  return (
    <>
      {activeExperiment === ActiveExperiment.NONE && <AppList />}
      {activeExperiment === ActiveExperiment.FIRST_EXPERIMENT && <FirstExperiment />}
      {activeExperiment === ActiveExperiment.SECOND_EXPERIMENT && <SecondExperiment />}
      <UserProfile />
      <SignInDialog />
    </>
  );
}

export default App;
