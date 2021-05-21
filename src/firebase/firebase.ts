
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAcP6FsAKlDhIF-Hx6Fmjs_v6DDlSed3KQ",
    authDomain: "echojamjam.firebaseapp.com",
    projectId: "echojamjam",
    storageBucket: "echojamjam.appspot.com",
    messagingSenderId: "571446567355",
    appId: "1:571446567355:web:3fc876666de05bab53649e",
    measurementId: "G-0LHXXHBKKV"
};

class Firebase {
	public auth: firebase.auth.Auth;

	constructor() {
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}

		this.auth = firebase.auth();
	}

	public signOut = () => {
		this.auth.signOut();
	}
}

export default new Firebase();
