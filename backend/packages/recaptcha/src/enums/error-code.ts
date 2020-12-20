export enum ErrorCode {
	MissingInputSecret = 'missing-input-secret',
	InvalidInputSecret = 'invalid-input-secret',
	MissingInputResponse = 'missing-input-response',
	InvalidInputResponse = 'invalid-input-response',
	BadRequest = 'bad-request',
	TimeoutOrDuplicate = 'invalid-or-already-seen-response',
	SiteKeyMismatch = 'sitekey-secret-mismatch',
	UnknownError = 'unknown-error'
}
