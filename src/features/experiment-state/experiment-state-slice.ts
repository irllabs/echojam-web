import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

export enum ActiveExperiment {
	NONE = 'none',
	FIRST_EXPERIMENT = 'first-experiment',
	SECOND_EXPERIMENT = 'second-experiment',
}

interface ExperimentStateData {
	activeExperiment: ActiveExperiment;
}

const initialState: ExperimentStateData = {
	activeExperiment: ActiveExperiment.NONE
}

export const experimentStateSlice = createSlice({
	name: 'experiment-state-slice',
	initialState,
	reducers: {
		setActiveExperiment: (state, action: PayloadAction<ActiveExperiment>) => {
			state.activeExperiment = action.payload;
		},
	}
});

export const { setActiveExperiment } = experimentStateSlice.actions;

export const selectActiveExperiment = (state: RootState) => state.experimentState.activeExperiment;

export default experimentStateSlice.reducer;