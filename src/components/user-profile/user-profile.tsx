// External libraries
import _ from 'lodash';
import {
	useEffect,
	useRef,
	useState,
} from 'react';

// External UI Components
import {
	Avatar,
	Box,
	Button,
	ClickAwayListener,
	Divider,
	Grow,
	IconButton,
	makeStyles,
	MenuItem,
	MenuList,
	Paper,
	Popper,
	Typography,
} from '@material-ui/core';

import firebase from '../../firebase/firebase';
import { selectCurrentUser, setCurrentUser, setSignInDialogOpen } from '../../features/sign-in-state/sign-in-state-slice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const styles = makeStyles(() => {
	return {
		userProfileContainer: {
			position: 'fixed',
			right: '24px',
			top: '24px'
		},
		signInButton: {
			borderRadius: '24px',
			height: '48px',
		},
		menuListItem: {
			paddingTop: '1rem',
			paddingBottom: '1rem',
			textAlign: 'center',
		},
		avatar: (props) => {
			return {
				border: `solid 2px`,
			};
		},
		avatarInitialsOnly: (props) => {
			return {
				color: '#FFFFFF',
			};
		},
		userDisplayName: {
			marginTop: 0,
			marginBottom: '0rem',
			paddingTop: '1rem',
			marginLeft: '1rem',
			marginRight: '1rem',
		},
		userEmail: {
			marginLeft: '1rem',
			marginRight: '1rem',
			marginTop: 0,
			fontWeight: 500,
		},
	};
});
const UserProfile = () => {
	const classes = styles();

	const dispach = useAppDispatch();

	const anchorRef = useRef<HTMLButtonElement>(null);

	const [open, setOpen] = useState(false);

	const currentUser = useAppSelector(selectCurrentUser);

	useEffect(() => {
		firebase.auth.onAuthStateChanged(async (authUser) => {
			if (!_.isNil(authUser)) {
				const user = {
					userName: authUser.displayName || '',
					userEmail: authUser.email || '',
					userProfilePictureUrl: authUser.photoURL || ''
				}

				dispach(setCurrentUser(user));
			}
		});
	}, [dispach]);

	const onSignInClick = () => {
		dispach(setSignInDialogOpen(true));
	};

	const handleToggle = () => {
		setOpen((prevOpen) => {
			return !prevOpen;
		});
	};

	const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
		if (anchorRef.current && anchorRef.current?.contains(event.target as any)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		}
	}

	const onSignOutClick = () => {
		firebase.signOut();

		dispach(setCurrentUser(null));
	};

	return (
		<div className={classes.userProfileContainer}>
			{!currentUser?.userEmail && (
				<Button className={classes.signInButton} variant="contained" color="primary" disableElevation size="medium" onClick={onSignInClick}>
					<Typography variant="body2">
						Sign in
					</Typography>
				</Button>
			)}
			{currentUser?.userEmail && (
				<>
					<IconButton
						ref={anchorRef}
						aria-controls={open ? 'menu-list-grow' : undefined}
						aria-haspopup="true"
						onClick={handleToggle}
					>
						{
							!_.isNil(currentUser.userProfilePictureUrl)
							&& <Avatar className={classes.avatar} alt={currentUser.userName} src={currentUser.userProfilePictureUrl} />
						}
						{
							_.isNil(currentUser.userProfilePictureUrl)
							&& <Avatar className={classes.avatarInitialsOnly} alt={currentUser.userName} />
						}
					</IconButton>

					<Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{zIndex: 100}}>
						{({ TransitionProps, placement }) => {
							return (
								<Grow
									{...TransitionProps}
									style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
								>
									<Paper>
										<ClickAwayListener onClickAway={handleClose}>
											<Box>

												<h2 className={classes.userDisplayName}>{currentUser.userName}</h2>
												<h3 className={classes.userEmail}>{currentUser.userEmail}</h3>

												<Divider />
												<MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
													<MenuItem onClick={onSignOutClick} className={classes.menuListItem}>Sign out</MenuItem>
												</MenuList>
											</Box>
										</ClickAwayListener>
									</Paper>
								</Grow>
							);
						}}
					</Popper>
				</>
			)}
		</div>
	);
}
export default UserProfile;