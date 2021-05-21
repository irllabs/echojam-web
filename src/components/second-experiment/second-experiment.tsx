import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { useAppDispatch } from "../../app/hooks";

import { ActiveExperiment, setActiveExperiment } from "../../features/experiment-state/experiment-state-slice";

const SecondExperiment = () => {
	const dispatch = useAppDispatch();

	return (
		<>
			<Typography variant='h3'>
				Second Experiment
			</Typography>
			<Button variant='outlined' onClick={() => {dispatch(setActiveExperiment(ActiveExperiment.NONE))}}>
				Home
			</Button>
		</>
	)
}
export default SecondExperiment;
