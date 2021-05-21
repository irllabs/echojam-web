import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { useAppDispatch } from '../../app/hooks';

import { setActiveExperiment, ActiveExperiment } from '../../features/experiment-state/experiment-state-slice';

import './app-list.scss';

const AppList = () => {
	const dispatch = useAppDispatch();

	return (
		<div className='app-list-container'>
			<Button variant='contained' color='primary' onClick={() => {dispatch(setActiveExperiment(ActiveExperiment.SECOND_EXPERIMENT))}}>
				First Experiment
			</Button>
			<Box m={2} />
			<Button variant='contained' color='primary' onClick={() => {dispatch(setActiveExperiment(ActiveExperiment.SECOND_EXPERIMENT))}}>
				Second Experiment
			</Button>
		</div>
	);
}
export default AppList;
