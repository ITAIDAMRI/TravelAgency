const KEY = "FLIGHT_AGENCY_USER_KEY";
export function loadState() {
	try {
		const serializedState = localStorage.getItem(KEY);
		if (!serializedState) return undefined;
		return JSON.parse(serializedState);
	} catch (e) {
		return undefined;
	}
}

export async function saveState(state: any) {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem(KEY, serializedState);
	} catch (e) {
		// Ignore
	}
}

export async function clearLocalStorage() {
	try {
		localStorage.setItem(KEY, null);
	} catch (e) {
		// Ignore
	}
}
