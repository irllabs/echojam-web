import { useState, useRef } from 'react';
import _ from 'lodash';
import firebase from 'firebase/app';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import firebaseContext from '../../firebase/firebase';

import { makeStyles } from '@material-ui/core/styles';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { selectSignInDialogOpen, setSignInDialogOpen, setCurrentUser } from '../../features/sign-in-state/sign-in-state-slice';

const styles = makeStyles({
	title: {
		textAlign: 'center',
	},
	body: {
		padding: '1rem',
		borderTop: 'solid 1px rgba(255,255,255,0.1)',
	},
	button: {
		marginBottom: '1rem',
		textAlign: 'center',
	},
	emailForm: {
		display: 'flex',
		flexDirection: 'column',
	},
	emailFormItem: {
		marginBottom: '1rem',
		minWidth: '300px',
	},
	signUpButton: {
		fontWeight: 600,
	},
	backButton: {
		position: 'absolute',
		left: 4,
		top: 8,
	},
	error: {
		textAlign: 'center',
		marginBottom: '2rem',
		fontWeight: 600,
	},
});

const SignInDialog = () => {
	const classes = styles();

	const dispach = useAppDispatch();

	const signInDialogOpen = useAppSelector(selectSignInDialogOpen);

	const [isShowingEmailForm, setIsShowingEmailForm] = useState(false);
	const [isShowingUseAsGuestForm, setIsShowingUseAsGuestForm] = useState(false);
	const [isShowingEmailSignUpForm, setIsShowingEmailSignUpForm] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const emailAddressInput = useRef<HTMLDivElement>(null);
	const emailAddressSignUpInput = useRef<HTMLDivElement>(null);
	const passwordInput = useRef<HTMLDivElement>(null);
	const passwordSignUpInput = useRef<HTMLDivElement>(null);
	const displayNameSignUpInput = useRef<HTMLDivElement>(null);
	const displayNameGuestInput = useRef<HTMLDivElement>(null);

	const onClose = () => {
		setIsShowingEmailForm(false);
		setIsShowingEmailSignUpForm(false);
		setErrorMessage('');
		setIsShowingUseAsGuestForm(false);

		dispach(setSignInDialogOpen(false));
	};

	const onGoogleSignInClick = async () => {
		onClose();
		const provider = new firebase.auth.GoogleAuthProvider();

		const authResult = await firebaseContext.auth.signInWithPopup(provider);

		const user = {
			userName: authResult.user?.displayName || '',
			userEmail: authResult.user?.email || '',
			userProfilePictureUrl: authResult.user?.photoURL || ''
		}

		dispach(setCurrentUser(user));
	};

	const onShowEmailSignInClick = () => {
		setIsShowingEmailForm(true);
	};

	const onEmailSignInClick = async () => {
		const email = emailAddressInput.current?.querySelectorAll('input')[0].value;
		const password = passwordInput.current?.querySelectorAll('input')[0].value;

		if (!email || !password) {
			return;
		}

		try {
			const result = await firebaseContext.auth.signInWithEmailAndPassword(email, password);

			const user = {
				userName: result.user?.displayName || '',
				userEmail: result.user?.email || '',
				userProfilePictureUrl: result.user?.photoURL || ''
			}
	
			dispach(setCurrentUser(user));

			onClose();
		} catch (e) {
			setErrorMessage(e.message);
		}
	};

	const onEmailSignUpClick = async () => {
		const email = emailAddressSignUpInput.current?.querySelectorAll('input')[0].value;
		const password = passwordSignUpInput.current?.querySelectorAll('input')[0].value;
		const displayName = displayNameSignUpInput.current?.querySelectorAll('input')[0].value;

		if (!email || !password) {
			return;
		}

		if (!_.isEmpty(displayName)) {
			try {
				const authResult = await firebaseContext.auth.createUserWithEmailAndPassword(email, password);

				const user = {
					userName: authResult.user?.displayName || '',
					userEmail: authResult.user?.email || '',
					userProfilePictureUrl: authResult.user?.photoURL || ''
				}
		
				dispach(setCurrentUser(user));

				onClose();
			} catch (e) {
				setErrorMessage(e.message);
			}
		} else {
			setErrorMessage('Please enter a name');
		}
	};

	const onShowEmailSignUpClick = () => {
		setIsShowingEmailForm(false);
		setIsShowingEmailSignUpForm(true);
		setIsShowingUseAsGuestForm(false);
	};

	const onUseAsGuestClick = () => {
		setIsShowingUseAsGuestForm(true);
	};

	const onContinueAsGuestClick = async () => {
		const displayName = displayNameGuestInput.current?.querySelectorAll('input')[0].value;

		if (!_.isEmpty(displayName)) {
			try {
				await firebaseContext.auth.signInAnonymously();

				const user = {
					userName: displayName || '',
					userEmail: 'anonymous',
					userProfilePictureUrl: ''
				}
		
				dispach(setCurrentUser(user));

				onClose();
			} catch (e) {
				setErrorMessage(e.message);
			}
		} else {
			setErrorMessage('Please enter a name');
		}
	};

	const onBackClick = () => {
		setIsShowingEmailForm(false);
		setIsShowingEmailSignUpForm(false);
		setErrorMessage('');
		setIsShowingUseAsGuestForm(false);
	};

	return (
		<>
			<Dialog onClose={onClose} open={signInDialogOpen}>
				{
					!isShowingEmailForm && !isShowingEmailSignUpForm && !isShowingUseAsGuestForm
					&& (
						<>
							<DialogTitle className={classes.title} id="simple-dialog-title">

								Sign in
							</DialogTitle>
							<Box className={classes.body}>
								<Button
									className={classes.button}
									fullWidth
									color="secondary"
									variant="contained"
									disableElevation
									onClick={onGoogleSignInClick}
								>
									Continue with Google
								</Button>
								<Button
									className={classes.button}
									fullWidth
									color="secondary"
									variant="contained"
									disableElevation
									onClick={onShowEmailSignInClick}
								>
									Sign in with email
								</Button>
								<Button
									className={classes.button}
									fullWidth
									color="secondary"
									variant="contained"
									disableElevation
									onClick={onUseAsGuestClick}
								>
									Use as guest
								</Button>
								<p style={{ textAlign: 'center' }}>
									Don&apos;t have an account yet?
								</p>
								<Button className={classes.signUpButton} fullWidth disableElevation onClick={onShowEmailSignUpClick}>Sign up</Button>
							</Box>
						</>
					)
				}
				{
					isShowingEmailForm
					&& (
						<>
							<DialogTitle className={classes.title} id="simple-dialog-title">
								<IconButton aria-label="close" className={classes.backButton} onClick={onBackClick}>
									<ArrowBackIcon />
								</IconButton>
								Sign in with email
							</DialogTitle>
							<Box className={classes.body}>
								<form className={classes.emailForm} noValidate autoComplete="off">
									<TextField
										type="email"
										ref={emailAddressInput}
										className={classes.emailFormItem}
										label="Email address"
										variant="outlined"
									/>
									<TextField ref={passwordInput} className={classes.emailFormItem} label="Password" variant="outlined" type="password" />
									{
										errorMessage
										&& (
											<p className={classes.error}>{errorMessage}</p>
										)
									}
									<Button
										className={classes.button}
										fullWidth
										color="primary"
										variant="contained"
										disableElevation
										onClick={onEmailSignInClick}
									>
										<strong>Sign in</strong>
									</Button>
								</form>

							</Box>
						</>
					)
				}
				{
					isShowingUseAsGuestForm
					&& (
						<>
							<DialogTitle className={classes.title} id="simple-dialog-title">
								<IconButton aria-label="close" className={classes.backButton} onClick={onBackClick}>
									<ArrowBackIcon />
								</IconButton>
								Continue as guest
							</DialogTitle>
							<Box className={classes.body}>
								<form className={classes.emailForm} noValidate autoComplete="off">
									<TextField ref={displayNameGuestInput} className={classes.emailFormItem} label="Name" variant="outlined" />
									{
										errorMessage
										&& (
											<p className={classes.error}>{errorMessage}</p>
										)
									}
									<Button
										className={classes.button}
										fullWidth
										color="primary"
										variant="contained"
										disableElevation
										onClick={onContinueAsGuestClick}
									>
										<strong>Continue as guest</strong>
									</Button>
								</form>

							</Box>
						</>
					)
				}
				{
					isShowingEmailSignUpForm
					&& (
						<>
							<DialogTitle className={classes.title} id="simple-dialog-title">
								<IconButton aria-label="close" className={classes.backButton} onClick={onBackClick}>
									<ArrowBackIcon />
								</IconButton>
								Sign up with email
							</DialogTitle>
							<Box className={classes.body}>
								<form className={classes.emailForm} noValidate autoComplete="off">
									<TextField
										ref={displayNameSignUpInput}
										className={classes.emailFormItem}
										label="Name"
										variant="outlined"
									/>
									<TextField
										type="email"
										ref={emailAddressSignUpInput}
										className={classes.emailFormItem}
										label="Email address"
										variant="outlined"
									/>
									<TextField
										ref={passwordSignUpInput}
										className={classes.emailFormItem}
										label="Password"
										variant="outlined"
										type="password"
									/>
									{
										errorMessage
										&& (
											<p className={classes.error}>{errorMessage}</p>
										)
									}
									<Button
										className={classes.button}
										fullWidth
										color="primary"
										variant="contained"
										disableElevation
										onClick={onEmailSignUpClick}
									>
										<strong>Sign up</strong>
									</Button>
								</form>

							</Box>
						</>
					)
				}

			</Dialog>
		</>
	);
};
export default SignInDialog;