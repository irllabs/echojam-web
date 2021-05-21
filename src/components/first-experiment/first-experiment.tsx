import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { useAppDispatch } from "../../app/hooks";

import { ActiveExperiment, setActiveExperiment } from "../../features/experiment-state/experiment-state-slice";

const FirstExperiment = () => {
	const dispatch = useAppDispatch();

	return (
		<>
			<Typography variant='h3'>
				First Experiment
			</Typography>
			<Button variant='outlined' onClick={() => {dispatch(setActiveExperiment(ActiveExperiment.NONE))}}>
				Home
			</Button>
		</>
	)
}
export default FirstExperiment;
